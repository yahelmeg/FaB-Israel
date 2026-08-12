import {requireAuth} from "@/lib/auth/require-auth";
import { checkIsAdmin } from "@/lib/services/admins.service"


export async function isAdmin() {
    const claims = await requireAuth()

    if (!claims) {
        return false
    }

    return checkIsAdmin(claims.sub)

}