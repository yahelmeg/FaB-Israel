import { EventCard } from "@/components/events/event-card"
import { getVisibleEvents } from "@/lib/events/get-visible-events"
import {isAdmin} from "@/lib/auth/is-admin";

export async function EventGrid() {
    const [{ events, error }, userIsAdmin] = await Promise.all([
        getVisibleEvents(),
        isAdmin(),
    ])

    if (error) {
        return <p className="text-muted-foreground text-center py-8">{error}</p>
    }

    if (!events || events.length === 0) {
        return <p className="text-muted-foreground text-center py-8">No upcoming events yet.</p>
    }

    return (
        <div className="flex flex-row flex-wrap gap-6 justify-center items-stretch w-full max-w-7xl mx-auto px-4 py-8">
            {events.map((event) => (
                <EventCard key={event.id} event={event} isAdmin={userIsAdmin}/>
            ))}
        </div>
    )
}