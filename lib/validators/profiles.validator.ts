import {z} from "zod"
import {collectFieldErrors, FieldErrors} from "@/lib/validators/collect-field-errors";

const ISRAELI_PHONE_REGEX = /^0(5[0-9])\d{7}$/

const profileFormSchema = z.object({
    displayName: z.string().trim().min(1, "Display name is required"),
    phoneNumber: z.string().trim().regex(ISRAELI_PHONE_REGEX, "Enter a valid Israeli phone number").optional().or(z.literal("")),
    discordUsername: z.string().optional(),
}).superRefine((data,ctx) => {
    if (!data.phoneNumber && !data.discordUsername) {
        ctx.addIssue({
            code: "custom",
            message: "Provide a phone number or Discord username",
            path: ["phoneNumber"],
        })
    }
})

export type UpdateProfileInput = {
    displayName: string
    phoneNumber: string | null
    discordUsername: string | null
}

export type ProfileFieldErrors = FieldErrors

export type ProfileValidationResult =
    | { success: true; data: UpdateProfileInput }
    | { success: false; error: ProfileFieldErrors }

export function parseAndValidateProfileForm(formData: FormData): ProfileValidationResult {
    const raw = Object.fromEntries(formData.entries())
    const result = profileFormSchema.safeParse(raw)

    if(!result.success) {
        return {success: false, error: collectFieldErrors(result.error.issues)}
    }

    const data = result.data

    return {
        success: true,
        data: {
            displayName: data.displayName,
            phoneNumber: data.phoneNumber || null,
            discordUsername: data.discordUsername || null,
        }
    }
}


