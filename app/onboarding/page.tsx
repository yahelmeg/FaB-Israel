import { ProfileForm } from "@/components/auth/profile-form"
import { requireProfile } from "@/lib/auth/require-profile"
import { redirect } from "next/navigation"

export default async function OnboardingPage() {
    const profile = await requireProfile()

    if (profile?.onboarding_completed) {
        redirect("/")
    }

    return (
        <div className="page-layout">
            <h2 className="page-heading-text">
                Complete your registration
            </h2>
            <p className="text-muted-foreground mb-8">
                Add a phone number or Discord username so buyers can reach you about your listings — at least one is
                required.
            </p>
            <ProfileForm
                mode="onboarding"
                defaultDisplayName={profile?.display_name ?? ""}
                defaultPhoneNumber={profile?.phone_number ?? ""}
                defaultDiscordUsername={profile?.discord_username ?? ""}
            />
        </div>
    )
}