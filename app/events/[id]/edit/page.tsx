import { notFound } from "next/navigation"
import * as eventsService from "@/lib/services/events.service"
import { EventForm } from "@/components/events/event-form"

interface EditEventPageProps {
    params: Promise<{ id: string }>
}

export default async function EditEventPage({ params }: EditEventPageProps) {
    const { id } = await params
    const event = await eventsService.getEventById(id)

    if (!event) {
        notFound()
    }

    return (
        <div className="page-layout">
            <h1 className="page-heading-text">
                Edit event
            </h1>
            <EventForm mode="edit" event={event} />
        </div>
    )
}