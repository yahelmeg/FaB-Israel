import { checkIsAdmin } from "@/lib/services/admins.service"
import {getOptionalClaims} from "@/lib/auth/get-optional-claims";


export async function isAdmin() {
    const claims = await getOptionalClaims()

    if (!claims) {
        return false
    }

    return checkIsAdmin(claims.sub)

}