import { requireAuth } from "@/lib/auth/require-auth"
import { checkIsAdmin } from "@/lib/services/admins.service"
import { notFound } from "next/navigation"


export async function requireAdmin()  {

    const claims = await requireAuth()
    const isAdmin = await checkIsAdmin(claims.sub)

    if (!isAdmin) {
        notFound()
    }

    return claims

}