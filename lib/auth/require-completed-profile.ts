import {requireAuth} from "@/lib/auth/require-auth";
import { redirect } from "next/navigation"
import {getProfile} from "@/lib/services/profiles.service";


export async function requireCompletedProfile() {

    const claims = await requireAuth()
    const profile = await getProfile(claims.sub)

    if (!profile?.onboardingCompleted) {
        redirect("/onboarding")
    }

    return claims

}