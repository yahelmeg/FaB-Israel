import { createClient } from "@/lib/supabase/server"
import { requireAuth } from "@/lib/auth/require-auth"
import { Listing } from "@/types/Listing"
import type { SupabaseClient } from "@supabase/supabase-js"

async function getMyListingsByStatus(
    claims: { sub: string },
    supabase: SupabaseClient,
    status: "active" | "fulfilled"
): Promise<{ listings: Listing[] | null; error: string | null }> {
    const { data, error } = await supabase
        .from("listings")
        .select(`id, price, image, condition, foiling, set_code, card_name, language, tcgplayer_url`)
        .eq("seller_id", claims.sub)
        .eq("status", status)

    if (error) {
        console.error(`Failed to load ${status} listings:`, error)
        return { listings: null, error: "Couldn't load your listings. Please try again later." }
    }

    const listings: Listing[] = data.map((row) => ({
        id: row.id,
        price: row.price,
        image: row.image,
        condition: row.condition,
        foiling: row.foiling,
        set: row.set_code,
        cardName: row.card_name,
        language: row.language,
        tcgplayerUrl: row.tcgplayer_url ?? undefined,
        sellerName: "",
        sellerPhoneNumber: "",
        sellerDiscord: "",
    }))

    return { listings, error: null }
}

export async function getMyActiveListings() {
    const claims = await requireAuth()
    const supabase = await createClient()
    return getMyListingsByStatus(claims, supabase, "active")
}

export async function getMySoldListings() {
    const claims = await requireAuth()
    const supabase = await createClient()
    return getMyListingsByStatus(claims, supabase, "fulfilled")
}