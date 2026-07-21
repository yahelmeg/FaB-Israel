"use server"

import {createClient} from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import {requireAuth} from "@/lib/auth/require-auth";

type ProfileFormState = {
    error: string | null
}

const ISRAELI_PHONE_REGEX = /^0(5[0-9])\d{7}$/


export async function updateProfile( mode: "onboarding" | "edit", _prevState : ProfileFormState, formData: FormData ): Promise<ProfileFormState> {
    const supabase = await createClient()
    const claims = await requireAuth()

    const displayName = formData.get("displayName") as string
    if (!displayName?.trim())  {
        return {error: "Display name is required"};
    }
    const phoneNumber = (formData.get("phoneNumber") as string)?.trim() || null
    const discordUsername = (formData.get("discordUsername") as string)?.trim() || null

    if (!phoneNumber && !discordUsername) {
        return { error: "Contact method is required" }
    }

    if (phoneNumber && !ISRAELI_PHONE_REGEX.test(phoneNumber)) {
        return { error: "Enter a valid Israeli phone number (e.g. 050-1234567)" }
    }

    const { error } = await supabase
        .from("profiles")
        .update({
            display_name: displayName.trim(),
            phone_number: phoneNumber,
            discord_username: discordUsername,
            ...(mode === "onboarding" ? { onboarding_completed: true } : {}),
        })
        .eq("id", claims.sub)

    if (error) {
        return { error: "Failed to save profile. Please try again." }
    }

    redirect(mode === "onboarding" ? "/" : "/profile")

}