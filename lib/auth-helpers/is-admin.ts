import { createClient } from "@/lib/supabase/server"


export async function isAdmin() {
    const supabase = await createClient()
    const { data } = await supabase.auth.getClaims()
    const claims = data?.claims

    console.log("claims.sub:", claims?.sub)

    if (!claims) {
        return false
    }

    const { data: adminRow, error } = await supabase
        .from("admins")
        .select("user_id")
        .eq("user_id", claims.sub)
        .single()

    console.log("adminRow:", adminRow, "error:", error)

    return !!adminRow
}