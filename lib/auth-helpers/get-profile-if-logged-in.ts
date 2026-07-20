import { createClient } from "@/lib/supabase/server"


export async function getProfileIfLoggedIn() {
    const supabase = await createClient()
    const {data} = await supabase.auth.getClaims()
    const claims = data?.claims

    if (!claims) {
        return null
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("display_name, phone_number, discord_username, onboarding_completed")
        .eq("id", claims.sub)
        .single()

    return profile

}