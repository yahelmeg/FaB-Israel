"use client"

import { useActionState } from "react"
import { updateProfile } from "@/lib/actions/update-profile"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Phone, MessageCircle } from "lucide-react"

type ProfileFormProps = {
    mode: "onboarding" | "edit"
    defaultDisplayName?: string
    defaultPhoneNumber?: string
    defaultDiscordUsername?: string
}

type ProfileFormState = {
    error: string | null
}

export function ProfileForm({ mode, defaultDisplayName = "", defaultPhoneNumber = "", defaultDiscordUsername = "" }: ProfileFormProps) {
    const [state, formAction, isPending] = useActionState(
        (prevState: ProfileFormState, formData: FormData) => updateProfile(mode, prevState, formData),
        { error: null }
    )

    return (
        <form action={formAction} className="space-y-6 w-full max-w-xl">
            <div className="space-y-2">
                <Label htmlFor="displayName" className="sell-page-label">
                    <User className="h-5 w-5 text-muted-foreground" />
                    Display name
                </Label>
                <Input
                    id="displayName"
                    name="displayName"
                    defaultValue={defaultDisplayName}
                    required
                    className="h-11"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="sell-page-label">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    Phone number
                </Label>
                <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    defaultValue={defaultPhoneNumber}
                    placeholder="05X-XXXXXXX"
                    className="h-11"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="discordUsername" className="sell-page-label">
                    <MessageCircle className="h-5 w-5 text-muted-foreground" />
                    Discord username
                </Label>
                <Input
                    id="discordUsername"
                    name="discordUsername"
                    defaultValue={defaultDiscordUsername}
                    placeholder="username"
                    className="h-11"
                />
            </div>

            {state.error && (
                <p className="text-sm text-destructive">{state.error}</p>
            )}

            <Button variant="default" type="submit" className="cursor-pointer w-full" disabled={isPending}>
                {isPending ? "Saving..." : mode === "onboarding" ? "Continue" : "Save changes"}
            </Button>
        </form>
    )
}