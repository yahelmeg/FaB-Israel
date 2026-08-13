import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"


const PROTECTED_PATHS = ["/onboarding", "/market/sell", "/profile", "/listings/mine"]
const ADMIN_PATHS = ["/admin"]

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({ request })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    )
                    supabaseResponse = NextResponse.next({ request })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const {data} = await supabase.auth.getClaims()
    const claims = data?.claims

    const pathname = request.nextUrl.pathname
    const isProtectedPath = PROTECTED_PATHS.some((path) => pathname.startsWith(path))
    const isAdminPath = ADMIN_PATHS.some((path) => pathname.startsWith(path))

    if (isAdminPath && (!claims || !claims?.is_admin)) {
        return NextResponse.rewrite(new URL("/404", request.url))
    }

    if (isProtectedPath && !claims) {
        const url = request.nextUrl.clone()
        url.pathname = "/auth"
        url.searchParams.set("redirect", pathname)
        url.searchParams.set("message", "auth_required")
        return NextResponse.redirect(url)
    }

    return supabaseResponse
}