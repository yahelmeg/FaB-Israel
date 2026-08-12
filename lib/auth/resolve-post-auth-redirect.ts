import {getProfile} from "@/lib/services/profiles.service"

export async function resolvePostAuthRedirect(userId: string): Promise<string> {

    let profile
    try {
        profile = await getProfile(userId);
    } catch (error) {
        console.error("Failed to load profile after auth callback:", error)
        return "/auth?error=profile"
    }

    return profile?.onboardingCompleted ? "/" : "/onboarding"
}