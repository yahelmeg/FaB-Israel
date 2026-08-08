"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import * as eventsActions from "@/app/actions/events.actions"
import { Button } from "@/components/ui/button"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { MoreVertical, CheckCircle, XCircle, Trash2 } from "lucide-react"

interface EventActionsMenuProps {
    eventId: string
}

export function EventActionsMenu({ eventId }: EventActionsMenuProps) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleMarkCompleted = () => {
        startTransition(async () => {
            const result = await eventsActions.markEventCompleted(eventId)
            if (result.fieldErrors) {
                toast.error(result.fieldErrors.db ?? "Failed to update event.")
            } else {
                toast.success("Event marked as completed.")
                router.refresh()
            }
        })
    }

    const handleMarkCancelled = () => {
        startTransition(async () => {
            const result = await eventsActions.markEventCancelled(eventId)
            if (result.fieldErrors) {
                toast.error(result.fieldErrors.db ?? "Failed to cancel event.")
            } else {
                toast.success("Event marked as cancelled.")
                router.refresh()
            }
        })
    }

    const handleDelete = () => {
        if (!confirm("Delete this event permanently? This can't be undone.")) return
        startTransition(async () => {
            const result = await eventsActions.deleteEvent(eventId)
            if (result.fieldErrors) {
                toast.error(result.fieldErrors.db ?? "Failed to delete event.")
            } else {
                toast.success("Event deleted.")
                router.refresh()
            }
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={isPending}
                        className="h-8 w-8"
                    >
                        <MoreVertical size="16" />
                    </Button>
                }
            />
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleMarkCompleted}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as completed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleMarkCancelled}>
                    <XCircle className="mr-2 h-4 w-4" />
                    Mark as cancelled
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete permanently
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}