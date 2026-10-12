"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { joinEventAction, leaveEventAction } from "@/app/actions/event-attendees.actions"

interface EventJoinButtonProps {
    eventId: string
    joined: boolean
    loggedIn: boolean
}

export function EventJoinButton({ eventId, joined, loggedIn }: EventJoinButtonProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleClick = () => {
        if (!loggedIn) {
            router.push("/auth?next=/events")
            return
        }

        startTransition(async () => {
            const result = joined
                ? await leaveEventAction(eventId)
                : await joinEventAction(eventId)

            if (result.fieldErrors?.db) {
                toast.error(result.fieldErrors.db)
                return
            }

            toast.success(joined ? "You left the event." : "You're in!")
            router.refresh()
        })
    }

    return (
        <Button
            onClick={handleClick}
            disabled={isPending}
            variant={joined ? "outline" : "default"}
            className="cursor-pointer"
        >
            {isPending
                ? joined ? "Leaving..." : "Joining..."
                : joined ? "Leave event" : "Join event"}
        </Button>
    )
}