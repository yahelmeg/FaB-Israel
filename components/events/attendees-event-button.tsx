import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"

interface AttendeesEventButtonProps {
    eventId: string
}

export function AttendeesEventButton({ eventId }: AttendeesEventButtonProps) {
    return (
        <Button
            render={<Link href={`/events/${eventId}/attendees`}/>}
            nativeButton={false}
            variant="outline"
            size="icon"
            className="h-8 w-8"
        >
            <Users size="16" />
        </Button>
    )
}