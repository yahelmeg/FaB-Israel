import { createClient } from "@/lib/supabase/server"


export async function getOptionalClaims() {
    const supabase = await createClient()
    const {data} = await supabase.auth.getClaims()
    return data?.claims ?? null
}