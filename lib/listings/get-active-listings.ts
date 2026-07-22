"use server"

import { createClient } from "@/lib/supabase/server"
import { Listing } from "@/types/Listing"

export async function getActiveListings(): Promise<{ listings: Listing[] | null; error: string | null }> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("listings")
        .select(`
            id,
            price,
            image,
            condition,
            foiling,
            set_code,
            card_name,
            language,
            tcgplayer_url,
            quantity,
            profiles (
                display_name,
                phone_number,
                discord_username
            )
        `)
        .eq("status", "active")

    if (error) {
        return {
            listings: null, error: "Couldn't load listings. Please try again later."
        }
    }

    const listings: Listing[] = data.map((row) => {
        const profile = Array.isArray(row.profiles) ? row.profiles[0] : row.profiles
        return {
            id: row.id,
            price: row.price,
            image: row.image,
            condition: row.condition,
            foiling: row.foiling,
            set: row.set_code,
            cardName: row.card_name,
            language: row.language,
            sellerName: profile?.display_name ?? "",
            sellerPhoneNumber: profile?.phone_number ?? "",
            sellerDiscord: profile?.discord_username ?? "",
            tcgplayerUrl: row.tcgplayer_url ?? undefined,
            quantity: row.quantity

        }
    })

    return { listings, error: null }
}