"use server"

import {createClient} from "@/lib/supabase/server"
import { requireAuth } from "@/lib/auth/require-auth"
import { revalidatePath } from "next/cache"
import type { SupabaseClient } from "@supabase/supabase-js"

async function updateListingStatus(listingId: string, claims: { sub: string }, supabase: SupabaseClient, status: "fulfilled" | "removed") {
    const { error } = await supabase
        .from("listings")
        .update({ status })
        .eq("id", listingId)
        .eq("seller_id", claims.sub)

    if (error) {
        return {
            error: `Failed to update listing. Please try again.`
        }
    }

    revalidatePath("/market")
    revalidatePath("/user/listings")
    return { error: null }
}

export async function removeMyListing(listingId: string) {
    const claims = await requireAuth()
    const supabase = await createClient()
    return updateListingStatus(listingId, claims, supabase, "removed")
}

export async function markMyListingFulfilled(listingId: string) {
    const claims = await requireAuth()
    const supabase = await createClient()
    return updateListingStatus(listingId, claims, supabase, "fulfilled")
}