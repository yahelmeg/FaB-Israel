import {requireAuth} from "@/lib/auth/require-auth";
import {createClient} from "@/lib/supabase/server";
import { redirect } from "next/navigation"

export async function requireCompletedProfile() {

    const claims = await requireAuth()
    const supabase = await createClient()


    const {data: profiles} = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", claims.sub)
        .single()

    if (!profiles?.onboarding_completed) {
        redirect("/onboarding")
    }

    return claims

}