"use client"

import React, { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { joinEventAction, leaveEventAction } from "@/app/actions/event-attendees.actions"

interface EventJoinButtonProps {
    eventId: string
    joined: boolean
    loggedIn: boolean
    userHasGemId: boolean
}

export function EventJoinButton({ eventId, joined, loggedIn, userHasGemId }: EventJoinButtonProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [gemId, setGemId] = useState("")
    const [gemIdError, setGemIdError] = useState<string | null>(null)

    const run = (gemIdValue?: string) => {
        startTransition(async () => {
            const result = joined
                ? await leaveEventAction(eventId)
                : await joinEventAction(eventId, gemIdValue)

            if (result.fieldErrors?.gemId) {
                setGemIdError(result.fieldErrors.gemId)
                return
            }
            if (result.fieldErrors?.db) {
                toast.error(result.fieldErrors.db)
                return
            }

            setDialogOpen(false)
            toast.success(joined ? "You left the event." : "You're in!")
            router.refresh()
        })
    }

    const handleClick = () => {
        if (!loggedIn) {
            router.push("/auth?next=/events")
            return
        }
        if (!joined && !userHasGemId) {
            setDialogOpen(true)
            return
        }
        run()
    }

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        setGemIdError(null)
        run(gemId)
    }

    return (
        <>
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

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <DialogHeader>
                            <DialogTitle>GEM id required</DialogTitle>
                            <DialogDescription>
                                Please enter your GEM id to join the event.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-1">
                            <Input
                                id="gem-id"
                                value={gemId}
                                onChange={(e) => setGemId(e.target.value)}
                                autoComplete="off"
                                className="h-10 text-lg"
                            />
                            {gemIdError && <p className="text-sm text-destructive">{gemIdError}</p>}
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={isPending} className="h-8 w-full cursor-pointer sm:w-auto">
                                {isPending ? "Joining..." : "Save and join"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}