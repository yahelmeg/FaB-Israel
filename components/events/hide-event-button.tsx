"use client"

import { useState, useTransition } from "react"
import { hideEvent } from "@/lib/events/hide-event"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface HideEventButtonProps {
    eventId: string
}

export function HideEventButton({ eventId }: HideEventButtonProps) {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)

    const handleClick = () => {
        startTransition(async () => {
            const result = await hideEvent(eventId)
            setError(result.error)
        })
    }

    return (
        <Button
            type="button"
            variant="destructive"
            size="icon"
            disabled={isPending}
            className="absolute top-4 right-4 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            onClick={handleClick}
            title={error ?? undefined}
        >
            <Trash2 size="16" />
        </Button>
    )
}