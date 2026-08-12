"use server"

import { revalidatePath } from "next/cache"
import {parseAndValidateProfileForm} from "@/lib/validators/profiles.validator";
import * as profileServices from "@/lib/services/profiles.service";


export type ProfileFormState = {
    fieldErrors: Record<string, string> | null
}

export async function updateProfile(mode: "onboarding" | "edit", _prevState: ProfileFormState, formData: FormData): Promise<ProfileFormState> {
    const validation = parseAndValidateProfileForm(formData);
    if (!validation.success) {
        return { fieldErrors: validation.error }
    }

    try {
        if (mode === "onboarding") {
            await profileServices.completeOnboarding(validation.data)
        } else {
            await profileServices.updateProfile(validation.data)
        }
    } catch (err) {
        console.error("Failed to update profile:", err)
        return { fieldErrors: { db: "Failed to save profile. Please try again." } }
    }

    revalidatePath("/")
    return { fieldErrors: null }
}