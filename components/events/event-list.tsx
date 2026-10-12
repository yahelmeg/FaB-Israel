import { EventCard } from "@/components/events/event-card"
import * as eventsService from "@/lib/services/events.service"
import { isAdmin } from "@/lib/auth/is-admin"
import * as eventAttendeesService from "@/lib/services/event-attendees.service"

export async function EventGrid() {
    const [userIsAdmin, events] = await Promise.all([
        isAdmin(),
        eventsService.getEvents().catch(() => null),
    ])

    if (events === null) {
        return <p className="text-muted-foreground text-center py-8">Couldn&apos;t load events. Please try again later.</p>
    }

    if (events.length === 0) {
        return <p className="text-muted-foreground text-center py-8">No upcoming events yet.</p>
    }

    const [counts, joinedIds] = await Promise.all([
        eventAttendeesService
            .getAttendeeCounts(events.map((e) => e.id))
            .catch(() => ({} as Record<string, number>)),
        eventAttendeesService.getMyJoinedEventIds(),
    ])

    const joinedSet = new Set(joinedIds ?? [])
    const loggedIn = joinedIds !== null

    return (
        <div className="flex flex-row flex-wrap gap-6 justify-center items-stretch w-full max-w-7xl mx-auto px-4 py-8">
            {events.map((event) => (
                <EventCard
                    key={event.id}
                    event={event}
                    isAdmin={userIsAdmin}
                    attendeeCount={counts[event.id] ?? 0}
                    joined={joinedSet.has(event.id)}
                    loggedIn={loggedIn}
                />
            ))}
        </div>
    )
}