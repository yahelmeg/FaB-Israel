import { ProfileForm } from "@/components/auth/profile-form"
import { requireProfile } from "@/lib/auth/require-profile"
import type {Metadata} from "next";
import { noIndex } from "@/lib/metadata";


export const metadata: Metadata = {
    title: "Profile",
    description: "View your profile, listings, and activity on FaB-Israel.",
    robots: noIndex
};

export default async function ProfilePage() {
    const profile = await requireProfile()

    return (
        <div className="page-layout">
            <h2 className="page-heading-text">
                Your profile
            </h2>
            <p className="text-muted-foreground mb-8">
                Update your account information.
            </p>
            <ProfileForm
                mode="edit"
                profile={profile}
            />
        </div>
    )
}