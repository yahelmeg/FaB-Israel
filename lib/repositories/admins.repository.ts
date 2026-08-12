import { createClient } from "@/lib/supabase/server"

export async function isUserAdmin(userId: string): Promise<boolean> {
    const supabase = await createClient()
    const {data}  = await supabase
        .from("admins")
        .select("user_id")
        .eq("user_id", userId)
        .single()

    return !!data
}