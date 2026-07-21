"use server"
import {createClient} from "@/lib/supabase/server"
import {requireAdmin} from "@/lib/auth/require-admin"
import { revalidatePath } from "next/cache"

export async function hideListings(listingId: string):  Promise<{ error: string | null }> {

    await requireAdmin();
    const supabase = await createClient();

    const {error} = await supabase
        .from("listings")
        .update( {is_visible: false})
        .eq("id", listingId)

    if (error) {
        console.error("Failed to hide event:", error)
        return { error: "Failed to hide event. Please try again." }
    }

    revalidatePath("/market")
    return { error: null }
}