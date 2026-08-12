import {createClient} from "@/lib/supabase/server";


export async function getAuthClaims() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getClaims()

    if (error || !data?.claims) {
        throw new Error("Not authenticated")
    }

    return data.claims
}