import { signOut } from "@/lib/actions/signout"

export function SignoutButton() {
    return (
        <form action={signOut}>
            <button
                type="submit"
                className="block w-full rounded-md px-3 py-2 text-md text-left hover:bg-accent cursor-pointer"
            >
                Log out
            </button>
        </form>
    )
}