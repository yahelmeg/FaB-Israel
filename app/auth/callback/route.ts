import { NextResponse } from "next/server";
import {createClient} from "@/lib/supabase/server"


export async function GET(request: Request) {
    const {searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");

    if (code) {
        const supabase = await createClient()

        const {data: {user}, error} = await supabase.auth.exchangeCodeForSession(code)

        //TODO: handle auth-errors
        if(error || !user) {
            return NextResponse.redirect(new URL("/auth?error=auth", origin));
        }

        const {data: profile} = await supabase
            .from("profiles")
            .select("onboarding_completed")
            .eq("id", user.id)
            .single()

        if(!profile?.onboarding_completed) {
            return NextResponse.redirect(new URL("/onboarding", origin));
        }

        return NextResponse.redirect(new URL("/", origin));

    }

    return NextResponse.redirect(new URL("/onboarding", origin));
}