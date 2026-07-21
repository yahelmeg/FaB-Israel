import {requireAuth} from "@/lib/auth/require-auth";
import {redirect} from "next/navigation"
import {createClient} from "@/lib/supabase/server";


export async function requireAdmin()  {

    const claims = await requireAuth()
    const supabase = await createClient()
    const {data: adminRow} = await supabase
        .from("admins")
        .select("user_id")
        .eq("user_id", claims.sub)
        .single()

    if(!adminRow) {
        redirect("/")
    }

    return claims
}