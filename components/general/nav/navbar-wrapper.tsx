import {Navbar} from "@/components/general/nav/navbar";
import { getProfileIfLoggedIn } from "@/lib/auth/get-profile-if-logged-in"


export async function NavbarWrapper() {

    const profile = await getProfileIfLoggedIn();

    return <Navbar isLoggedIn={!!profile} displayName={profile?.display_name} />
}