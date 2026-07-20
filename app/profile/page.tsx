import { ProfileForm } from "@/components/auth/profile-form"
import { requireProfile } from "@/lib/auth-helpers/require-profile"

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
                defaultDisplayName={profile?.display_name ?? ""}
                defaultPhoneNumber={profile?.phone_number ?? ""}
                defaultDiscordUsername={profile?.discord_username ?? ""}
            />
        </div>
    )
}