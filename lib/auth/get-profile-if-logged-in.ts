import {getOptionalClaims} from "@/lib/auth/get-optional-claims"
import {getProfile} from "@/lib/services/profiles.service";

export async function getProfileIfLoggedIn() {
    const claims = await getOptionalClaims()
    return claims? getProfile(claims.sub) : null

}