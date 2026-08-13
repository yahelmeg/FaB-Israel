import { z } from "zod";
import { CONDITION_TYPES } from "@/types/ConditionTypes";
import { FOILING_TYPES } from "@/types/FoilingTypes";
import { LANGUAGE_TYPES } from "@/types/LanguageTypes";
import {collectFieldErrors, FieldErrors} from "@/lib/validators/collect-field-errors";

const listingCreateFormSchema = z.object({
    cardName: z.string().trim().min(1, "Card is required"),
    setCode: z.string().trim().min(1, "Printing is required"),
    image: z.string().trim().min(1, "Image is required"),
    price: z
        .string()
        .refine((val) => val !== "" && !isNaN(Number(val)) && Number(val) > 0, "Enter a valid price")
        .refine((val) => val.length <= 6, "Price can be at most 6 characters")
        .transform(Number),
    condition: z.enum(CONDITION_TYPES, { message: "Condition is required" }),
    foiling: z.enum(FOILING_TYPES, { message: "Foiling is required" }),
    language: z.enum(LANGUAGE_TYPES, { message: "Language is required" }),
    tcgplayerUrl: z.string().trim().optional(),
    quantity: z
        .string()
        .refine((val) => val !== "" && Number.isInteger(Number(val)) && Number(val) >= 1, "Enter a valid quantity")
        .refine((val) => Number(val) <= 99, "Quantity can be at most 99")
        .transform(Number),
})

const listingPriceUpdateSchema = z.object({
    price: z.number().positive("Enter a valid price")
        .refine((val) => val.toString().length <= 6, "Price can be at most 6 characters"),
})

const listingQuantityUpdateSchema = z.object({
    quantity: z.number().int("Enter a valid quantity")
        .min(1, "Enter a valid quantity")
        .max(99, "Quantity can be at most 99"),
})

export type CreateListingInput = {
    cardName: string
    setCode: string
    image: string
    price: number
    condition: typeof CONDITION_TYPES[number]
    foiling: typeof FOILING_TYPES[number]
    language: typeof LANGUAGE_TYPES[number]
    tcgplayerUrl: string | null
    quantity: number
}

export type ListingFieldErrors = FieldErrors

export type ListingValidationResult =
    | { success: true; data: CreateListingInput }
    | { success: false; error: ListingFieldErrors }

export type PriceUpdateValidationResult =
    | { success: true; data: { price: number } }
    | { success: false; error: ListingFieldErrors }

export type QuantityUpdateValidationResult =
    | { success: true; data: { quantity: number } }
    | { success: false; error: ListingFieldErrors }

export type StatusUpdateValidationResult =
    | { success: true; data: { status: "fulfilled" } }
    | { success: false; error: ListingFieldErrors }

export type UpdateListingInput = Partial<{
    price: number
    quantity: number
    status: "fulfilled"
}>

export function parseAndValidateListingForm(formData: FormData): ListingValidationResult {
    const raw = Object.fromEntries(formData.entries())
    const result = listingCreateFormSchema.safeParse(raw)

    if (!result.success) {
        return { success: false, error: collectFieldErrors(result.error.issues) }
    }

    const data = result.data
    return {
        success: true,
        data: {
            cardName: data.cardName,
            setCode: data.setCode,
            image: data.image,
            price: data.price,
            condition: data.condition,
            foiling: data.foiling,
            language: data.language,
            tcgplayerUrl: data.tcgplayerUrl || null,
            quantity: data.quantity,
        },
    }
}

export function parseAndValidatePriceUpdate(input: { price: number }): PriceUpdateValidationResult {
    const result = listingPriceUpdateSchema.safeParse(input)
    if (!result.success) {
        return { success: false, error: collectFieldErrors(result.error.issues) }
    }
    return { success: true, data: result.data }
}

export function parseAndValidateQuantityUpdate(input: { quantity: number }): QuantityUpdateValidationResult {
    const result = listingQuantityUpdateSchema.safeParse(input)
    if (!result.success) {
        return { success: false, error: collectFieldErrors(result.error.issues) }
    }
    return { success: true, data: result.data }
}

