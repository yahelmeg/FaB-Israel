"use server"

import { createClient } from "@/lib/supabase/server"
import { requireAuth } from "@/lib/auth/require-auth"
import { redirect } from "next/navigation"

export type ListingFormState = {
    error: string | null
}

export async function createListing(_prevState: ListingFormState, formData: FormData) {

    const claims = await requireAuth()
    const supabase = await createClient()

    const cardName = (formData.get("cardName") as string)?.trim()
    const setCode = (formData.get("setCode") as string)?.trim()
    const image = (formData.get("image") as string)?.trim()
    const price = formData.get("price") as string
    const condition = formData.get("condition") as string
    const foiling = formData.get("foiling") as string
    const language = formData.get("language") as string
    const tcgplayerUrl = (formData.get("tcgplayerUrl") as string)?.trim()


    if (!cardName) {
        return {
            error: "Card is required"
        }
    }
    if (!setCode) {
        return {
            error: "Printing is required"
        }
    }
    if (!price || Number(price) <= 0) {
        return {
            error: "Enter a valid price"
        }
    }
    if (!condition) {
        return {
            error: "Condition is required"
        }
    }
    if (!foiling) {
        return {
            error: "Foiling is required"
        }
    }
    if (!language) {
        return {
            error: "Language is required"
        }
    }

    const { error } = await supabase.from("listings").insert({
        seller_id: claims.sub,
        card_name: cardName,
        set_code: setCode,
        image,
        price: Number(price),
        condition,
        foiling,
        language,
        tcgplayer_url: tcgplayerUrl || null,
        status: "active",
    })

    if (error) {
        return {
            error: "Failed to create listing. Please try again."
        }
    }

    redirect("/market")

}