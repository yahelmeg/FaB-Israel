import { createClient } from "@/lib/supabase/server"


export async function isAdmin() {
    const supabase = await createClient()
    const { data } = await supabase.auth.getClaims()
    const claims = data?.claims


    if (!claims) {
        return false
    }

    const { data: adminRow } = await supabase
        .from("admins")
        .select("user_id")
        .eq("user_id", claims.sub)
        .single()


    return !!adminRow
}