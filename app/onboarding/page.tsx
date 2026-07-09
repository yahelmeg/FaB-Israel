import { ProfileForm } from "@/components/auth/profile-form"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import {SellListingForm} from "@/components/market/sell/sell-listing-form";

export default async function OnboardingPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/auth")
    }

    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("display_name, phone_number, discord_username, onboarding_completed")
        .eq("id", user.id)
        .single()

    if (profile?.onboarding_completed) {
        redirect("/")
    }

    if (profileError) {
        console.error("Failed to load profile:", profileError)
        redirect("/auth?error=profile")
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