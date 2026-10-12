import { EventAttendee } from "@/types/events/EventAttendee"
import * as eventAttendeesRepository from "@/lib/repositories/event-attendees.repository"
import * as eventsService from "@/lib/services/events.service"
import { toEventAttendee } from "@/lib/mappers/event-attendees.mapper"
import { requireProfile } from "@/lib/auth/require-profile"
import { requireAdmin } from "@/lib/auth/require-admin"
import { getOptionalClaims } from "@/lib/auth/get-optional-claims"


function todayInIsrael(): string {
    return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Jerusalem" })
}

export async function joinEvent(eventId: string): Promise<void> {
    const { id: userId } = await requireProfile()

    const event = await eventsService.getEventById(eventId)
    if (!event) {
        throw new Error("Event not found")
    }
    if (event.date < todayInIsrael()) {
        throw new Error("This event has already passed")
    }

    await eventAttendeesRepository.insert(eventId, userId)
}

export async function leaveEvent(eventId: string): Promise<void> {
    const { id: userId } = await requireProfile()
    await eventAttendeesRepository.remove(eventId, userId)
}

export async function getIsAttending(eventId: string): Promise<boolean> {
    const claims = await getOptionalClaims() // logged-out visitors are allowed
    if (!claims) {
        return false
    }
    const row = await eventAttendeesRepository.getByEventAndUser(eventId, claims.sub) // adjust
    return row !== null
}

export async function getAttendeeCount(eventId: string): Promise<number> {
    return eventAttendeesRepository.getCountByEvent(eventId)
}

export async function getAttendeeCounts(eventIds: string[]): Promise<Record<string, number>> {
    return eventAttendeesRepository.getCountsByEvents(eventIds)
}

export async function getAttendees(eventId: string): Promise<EventAttendee[]> {
    await requireAdmin()
    const rows = await eventAttendeesRepository.getByEvent(eventId)
    return rows
        .map(toEventAttendee)
        .sort((a, b) => a.displayName.localeCompare(b.displayName))
}