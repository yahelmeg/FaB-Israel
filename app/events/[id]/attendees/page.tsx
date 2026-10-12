import { notFound } from "next/navigation"
import { isAdmin } from "@/lib/auth/is-admin"
import * as eventsService from "@/lib/services/events.service"
import * as eventAttendeesService from "@/lib/services/event-attendees.service"

interface AttendeesPageProps {
    params: Promise<{ id: string }>
}

export default async function AttendeesPage({ params }: AttendeesPageProps) {
    const { id } = await params

    if (!(await isAdmin())) {
        notFound()
    }

    const event = await eventsService.getEventById(id)
    if (!event) {
        notFound()
    }

    const attendees = await eventAttendeesService.getAttendees(id)

    return (
        <div className="page-layout">
            <h1 className="page-heading-text">
                {event.title}
            </h1>

            <p className="text-muted-foreground text-lg font-medium">
                {attendees.length} {attendees.length === 1 ? 'Participant' : 'Participants'}
            </p>

            {attendees.length === 0 ? (
                <p className="text-muted-foreground">Nobody has joined yet.</p>
            ) : (
                <ul className="flex flex-col gap-2 text-lg">
                    {attendees.map((a) => (
                        <li key={a.userId}>{a.displayName}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}