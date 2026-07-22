import { signOut } from "@/lib/actions/signout"
import { cn } from "@/lib/utils"

interface SignoutButtonProps {
    className?: string
    onClick?: () => void
}

export function SignoutButton({ className, onClick }: SignoutButtonProps) {
    return (
        <form action={signOut}>
            <button
                type="submit"
                onClick={onClick}
                className={cn("cursor-pointer text-left w-full", className)}
            >
                Log out
            </button>
        </form>
    )
}