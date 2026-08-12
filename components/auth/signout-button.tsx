"use client"

import { signOut } from "@/app/actions/auth.actions"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface SignoutButtonProps {
    className?: string
    onClick?: () => void
}

export function SignoutButton({ className, onClick }: SignoutButtonProps) {

    const router = useRouter()

    const handleSignOut = async () => {
        const result = await signOut()
        if (result?.error) {
            toast.error(result.error)
        } else {
            toast.success("Logged out successfully")
            router.push("/")
            router.refresh()
        }
    }
    return (
        <form action={handleSignOut}>
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