import { redirect } from "next/navigation"
import { requireAuth } from "@/lib/auth/require-auth"
import { getProfile } from "@/lib/services/profiles.service"

export async function requireProfile() {
    const claims = await requireAuth()

    let profile
    try {
        profile = await getProfile(claims.sub)
    } catch (error) {
        console.error("Failed to load profile:", error)
        redirect("/auth?error=profile")
    }

    if (!profile) {
        redirect("/auth?error=profile")
    }

    return profile
}