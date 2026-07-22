import {Listing} from "@/types/Listing";
import { createClient } from "@/lib/supabase/server"
import { requireAuth } from "@/lib/auth/require-auth"

export async function getMyFulfilledListings(): Promise<{ listings: Listing[] | null; error: string | null }> {

    const claims = await requireAuth()
    const supabase = await createClient()

    const {data, error} = await supabase
        .from("listings")
        .select(`id, price, image, condition, foiling, set_code, card_name, language, tcgplayer_url`)
        .eq("seller_id", claims)
        .eq("status", "fulfilled")

    if (error) {
        return {
            listings: null, error: "Couldn't load your listings. Please try again later."
        }
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
