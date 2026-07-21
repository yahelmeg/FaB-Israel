import { createClient } from "@/lib/supabase/server"
import {redirect} from "next/navigation"
import {requireAuth} from "@/lib/auth/require-auth";

export async function requireProfile() {
    const supabase = await createClient()
    const claims = await requireAuth()

    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("display_name, phone_number, discord_username, onboarding_completed")
        .eq("id", claims.sub)
        .single()

    if (profileError) {
        console.error("Failed to load profile:", profileError)
        redirect("/auth?error=profile")
    }

    return profile
}