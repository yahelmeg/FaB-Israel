import {ProfileRow} from "@/lib/repositories/profiles.repository";
import {Profile } from "@/types/Profile"

export function toProfile(row: ProfileRow): Profile {
    return {
        id: row.id,
        displayName: row.display_name ?? "",
        phoneNumber: row.phone_number ?? undefined,
        discordUsername: row.discord_username ?? undefined,
        onboardingCompleted: row.onboarding_completed,
    }
}