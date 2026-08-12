import { ProfileForm } from "@/components/auth/profile-form"
import { requireProfile } from "@/lib/auth/require-profile"
import { redirect } from "next/navigation"
import {LoginSuccessToast} from "@/components/auth/login-success-toast";
import type {Metadata} from "next";
import { noIndex } from "@/lib/metadata";


export const metadata: Metadata = {
    title: "Complete Your Profile",
    description: "Finish setting up your FaB-Israel account.",
    robots: noIndex
};

export default async function OnboardingPage() {
    const profile = await requireProfile()

    if (profile?.onboardingCompleted) {
        redirect("/")
    }

    return (
        <>
            <LoginSuccessToast />
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
                    profile={profile}
                />
            </div>
        </>

    )
}