// components/events/edit-event-button.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"

interface EditEventButtonProps {
    eventId: string
}

export function EditEventButton({ eventId }: EditEventButtonProps) {
    return (
        <Button
            render={<Link href={`/events/${eventId}/edit`}/>}
            nativeButton={false}
            variant="outline"
            size="icon"
            className="h-8 w-8"
        >
            <Pencil size="16" />
        </Button>
    )
}