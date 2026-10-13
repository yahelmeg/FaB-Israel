import { EventAttendee } from "@/types/events/EventAttendee"
import * as eventAttendeesRepository from "@/lib/repositories/event-attendees.repository"
import * as eventsService from "@/lib/services/events.service"
import * as profileService from "@/lib/services/profiles.service"
import { toEventAttendee } from "@/lib/mappers/event-attendees.mapper"
import { requireProfile } from "@/lib/auth/require-profile"
import { requireAdmin } from "@/lib/auth/require-admin"
import {getOptionalClaims} from "@/lib/auth/get-optional-claims";

function todayInIsrael(): string {
    return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Jerusalem" })
}

export async function joinEvent(eventId: string, gemId?: string): Promise<void> {
    const profile = await requireProfile()

    const event = await eventsService.getEventById(eventId)
    if (!event) {
        throw new Error("Event not found")
    }
    if (event.date < todayInIsrael()) {
        throw new Error("This event has already passed")
    }

    if (!profile.gemId) {
        if (!gemId) {
            throw new Error("A GEM id is required to join an event")
        }
        await profileService.updateGemId(profile.id, gemId)
    }

    await eventAttendeesRepository.insert(eventId, profile.id)
}

export async function leaveEvent(eventId: string): Promise<void> {
    const { id: userId } = await requireProfile()
    await eventAttendeesRepository.remove(eventId, userId)
}


export async function getAttendees(eventId: string): Promise<EventAttendee[]> {
    await requireAdmin()
    const rows = await eventAttendeesRepository.getByEvent(eventId)
    return rows
        .map(toEventAttendee)
        .sort((a, b) => a.displayName.localeCompare(b.displayName))
}

export async function getAttendeeCounts(eventIds: string[]): Promise<Record<string, number>> {
    return eventAttendeesRepository.getCountsByEvents(eventIds)
}

export async function getMyJoinedEventIds(): Promise<string[] | null> {
    const claims = await getOptionalClaims()
    if (!claims) {
        return null
    }
    return eventAttendeesRepository.getEventIdsByUser(claims.sub)
}