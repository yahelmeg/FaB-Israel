"use client"

import { useActionState, useState, useEffect, useRef } from "react"
import { updateProfile, ProfileFormState } from "@/app/actions/profiles.actions"
import {Profile} from "@/types/Profile"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Phone, MessageCircle } from "lucide-react"
import { toast } from "sonner";
import { useRouter } from "next/navigation"


interface ProfileFormProps {
    mode?: "onboarding" | "edit"
    profile?: Profile | null
}

const initialState: ProfileFormState = { fieldErrors: null }

export function ProfileForm({ mode= "edit", profile }: ProfileFormProps) {

    const router = useRouter()
    const hasSubmitted = useRef(false)
    const action = updateProfile.bind(null, mode)
    const [state, formAction, isPending] = useActionState(action, initialState)

    const [displayName, setDisplayName] = useState(profile?.displayName ?? "")
    const [phoneNumber, setPhoneNumber] = useState(profile?.phoneNumber ?? "")
    const [discordUsername, setDiscordUsername] = useState(profile?.discordUsername ?? "")

    useEffect(() => {
        if (!hasSubmitted.current) {
            return
        }

        if(state.fieldErrors === null) {
            toast.success(mode === "onboarding" ? "Profile setup complete!" : "Profile updated.")
            router.push("/")
        } else if (state.fieldErrors?.db) {
            toast.error(state.fieldErrors.db)
        }

    }, [state,mode,router])

    const handleSubmit = (formData: FormData) => {
        hasSubmitted.current = true
        formAction(formData)
    }

    return (
        <form action={handleSubmit} className="space-y-6 w-full max-w-xl">
            <div className="space-y-2">
                <Label htmlFor="displayName" className="sell-page-label">
                    <User className="h-5 w-5 text-muted-foreground" />
                    Display name
                </Label>
                <Input
                    id="displayName"
                    name="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    className="h-11"
                />
                {state.fieldErrors?.displayName && (
                    <p className="text-sm text-destructive">{state.fieldErrors.displayName}</p>
                )}
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
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="05X-XXXXXXX"
                    className="h-11"
                />
                {state.fieldErrors?.phoneNumber && (
                    <p className="text-sm text-destructive">{state.fieldErrors.phoneNumber}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="discordUsername" className="sell-page-label">
                    <MessageCircle className="h-5 w-5 text-muted-foreground" />
                    Discord username
                </Label>
                <Input
                    id="discordUsername"
                    name="discordUsername"
                    value={discordUsername}
                    onChange={(e) => setDiscordUsername(e.target.value)}
                    placeholder="username"
                    className="h-11"
                />
                {state.fieldErrors?.discordUsername && (
                    <p className="text-sm text-destructive">{state.fieldErrors.discordUsername}</p>
                )}
            </div>


            {state.fieldErrors?.db && (
                <p className="text-sm text-destructive">{state.fieldErrors.db}</p>
            )}

            <Button variant="default" type="submit" className="cursor-pointer w-full" disabled={isPending}>
                {isPending ? "Saving..." : mode === "onboarding" ? "Continue" : "Save changes"}
            </Button>
        </form>
    )
}