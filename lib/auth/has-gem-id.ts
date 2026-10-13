import {getProfileIfLoggedIn} from "@/lib/auth/get-profile-if-logged-in";


export async function hasGemId() {
    const profile = await getProfileIfLoggedIn()

    if (!profile) {
        return false
    }

    return !!profile.gemId

}