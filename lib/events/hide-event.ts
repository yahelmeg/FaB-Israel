"use server"
import {createClient} from "@/lib/supabase/server"
import {requireAdmin} from "@/lib/auth-helpers/require-admin"
import { revalidatePath } from "next/cache"

export async function hideEvent(eventId: string):  Promise<{ error: string | null }> {

    await requireAdmin();
    const supabase = await createClient();

    const {error} = await supabase
        .from("events")
        .update( {is_visible: false})
        .eq("id", eventId)

    if (error) {
        console.error("Failed to hide event:", error)
        return { error: "Failed to hide event. Please try again." }
    }

    revalidatePath("/events")
    return { error: null }
}