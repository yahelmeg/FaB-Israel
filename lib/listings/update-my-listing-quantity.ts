"use server"

import {createClient} from "@/lib/supabase/server"
import { requireAuth } from "@/lib/auth/require-auth"
import { revalidatePath } from "next/cache"

export async function updateMyListingQuantity(listingId: string, quantity: number) {

    const claims = await requireAuth()
    const supabase = await createClient()

    const { error } = await supabase
        .from("listings")
        .update({ quantity })
        .eq("id", listingId)
        .eq("seller_id", claims.sub)

    if (error) {
        return {
            error: `Failed to update listing's quantity. Please try again.`
        }
    }

    revalidatePath("/market")
    revalidatePath("/user/my-listings")
    return { error: null }

}

