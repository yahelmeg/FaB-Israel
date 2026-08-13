"use server"

import * as listingService from "@/lib/services/listings.service"
import {parseAndValidateListingForm, parseAndValidatePriceUpdate, parseAndValidateQuantityUpdate} from "@/lib/validators/listings.validator"
import { revalidatePath } from "next/cache"

export type ListingFormState  = {
    fieldErrors: Record<string, string> | null
}
export async function createListingAction(_prevState:ListingFormState, formData: FormData): Promise<ListingFormState> {
    const validation = parseAndValidateListingForm(formData)
    if (!validation.success) {
        return { fieldErrors: validation.error }
    }

    try {
        await listingService.createListing(validation.data)
    } catch (err) {
        console.error("Failed to create listing:", err)
        return { fieldErrors: { db: "Failed to create listing. Please try again later." } }
    }

    revalidatePath("/market")
    return { fieldErrors: null }
}

export async function updatePriceAction(id: string, price: number): Promise<ListingFormState> {
    const validation = parseAndValidatePriceUpdate({ price })
    if (!validation.success) {
        return { fieldErrors: validation.error }
    }

    try {
        await listingService.updatePrice(id, validation.data.price)
    } catch (err) {
        console.error("Failed to update price:", err)
        return { fieldErrors: { db: "Failed to update price. Please try again later." } }
    }

    revalidatePath("/listings/mine")
    return { fieldErrors: null }
}

export async function updateQuantityAction(id: string, quantity: number): Promise<ListingFormState> {
    const validation = parseAndValidateQuantityUpdate({ quantity })
    if (!validation.success) {
        return { fieldErrors: validation.error }
    }

    try {
        await listingService.updateQuantity(id, validation.data.quantity)
    } catch (err) {
        console.error("Failed to update quantity:", err)
        return { fieldErrors: { db: "Failed to update quantity. Please try again later." } }
    }

    revalidatePath("/listings/mine")
    return { fieldErrors: null }
}

export async function markFulfilledAction(id: string): Promise<ListingFormState> {
    try {
        await listingService.markFulfilled(id)
    } catch (err) {
        console.error("Failed to mark as fulfilled:", err)
        return { fieldErrors: { db: "Failed to mark as fulfilled. Please try again later." } }
    }

    revalidatePath("/listings/mine")
    return { fieldErrors: null }
}

export async function deleteListingAction(id: string): Promise<ListingFormState> {
    try {
        await listingService.deleteListing(id)
    } catch (err) {
        console.error("Failed to delete listing:", err)
        return { fieldErrors: { db: "Failed to delete listing. Please try again later." } }
    }

    revalidatePath("/listings/mine")
    return { fieldErrors: null }
}