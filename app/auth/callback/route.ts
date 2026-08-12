import { NextResponse } from "next/server";
import {createClient} from "@/lib/supabase/server"
import {resolvePostAuthRedirect} from "@/lib/auth/resolve-post-auth-redirect";


export async function GET(request: Request) {
    const {searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
        return NextResponse.redirect(new URL("/auth?error=auth", origin))
    }

    const supabase = await createClient()
    const { data: {user}, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error || !user) {
        return NextResponse.redirect(new URL("/auth?error=auth", origin))
    }

    const redirectPath =  await resolvePostAuthRedirect(user.id)
    const url = new URL(redirectPath, origin)
    url.searchParams.set("success", "true")
    return NextResponse.redirect(url)

}