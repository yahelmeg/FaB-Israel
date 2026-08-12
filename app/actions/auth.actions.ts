"use server"

import { createClient } from "@/lib/supabase/server"

export async function signOut() {

    const supabase = await createClient()
    const {error} = await supabase.auth.signOut()

    if (error) {
        console.error("Sign out failed:", error)
        return { error: "Failed to sign out. Please try again." }
    }

    return { success: true }
}