import {createClient} from "@/lib/supabase/server"


export type ProfileUpdatePayload = {
    displayName: string,
    phone_number: string | null,
    discord_username: string | null,
    onboarding_completed?: boolean
}


export async function  updateProfileRow(userId: string, updates: ProfileUpdatePayload){
    const supabase = await createClient()
    return supabase.from("profiles").update(updates).eq("id", userId)
}