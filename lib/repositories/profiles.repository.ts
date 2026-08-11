import { createClient } from "@/lib/supabase/server"
import { UpdateProfileInput } from "@/lib/validators/profiles.validator"

export type ProfileRow = {
    id: string
    display_name: string | null
    phone_number: string | null
    discord_username: string | null
    onboarding_completed: boolean
}

export type UpdateProfileRepositoryInput = Partial<UpdateProfileInput>

export async function getProfiles(): Promise<ProfileRow[]> {
    const supabase = await createClient()
    const {data, error} = await supabase
        .from("profiles")
        .select("*")

    if (error) {
        throw new Error(`Failed to fetch profiles: ${error.message}`)
    }

    return data
}

export async function getProfileById(profileId: string): Promise<ProfileRow | null> {
    const supabase = await createClient()
    const {data, error} = await supabase
        .from("profiles")
        .select("*")
        .eq("id", profileId)
        .maybeSingle()

    if (error) {
        throw new Error(`Failed to fetch profile ${profileId}: ${error.message}`)
    }
    return data
}

export async function update(profileId: string, input: UpdateProfileRepositoryInput): Promise<ProfileRow> {
    const supabase = await createClient()
    const updatePayload: Record<string, unknown> = {}
    if (input.displayName !== undefined) {
        updatePayload.display_name = input.displayName
    }
    if (input.phoneNumber !== undefined) {
        updatePayload.phone_number = input.phoneNumber
    }
    if (input.discordUsername !== undefined) {
        updatePayload.discord_username = input.discordUsername
    }

    const { data, error } = await supabase
        .from("profiles")
        .update(updatePayload)
        .eq("id", profileId)
        .select()
        .single()

    if (error) {
        throw new Error(`Failed to update profile ${profileId}: ${error.message}`)
    }

    return data
}

export async function markOnboardingCompleted(profileId: string): Promise<ProfileRow> {
    const supabase = await createClient()
    const {data, error} = await supabase
        .from("profiles")
        .update({ onboarding_completed: true })
        .eq("id", profileId)
        .select()
        .single()

    if (error) {
        throw new Error(`Failed to mark onboarding completed for ${profileId}: ${error.message}`)
    }

    return data
}


