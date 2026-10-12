"use server"

import * as eventAttendeesService from "@/lib/services/event-attendees.service"
import { revalidatePath } from "next/cache"

export type EventAttendanceState = {
    fieldErrors: Record<string, string> | null
}

export async function joinEventAction(eventId: string): Promise<EventAttendanceState> {
    try {
        await eventAttendeesService.joinEvent(eventId)
    } catch (err) {
        console.error("Failed to join event:", err)
        return { fieldErrors: { db: "Failed to join event. Please try again later." } }
    }

    revalidatePath("/events")
    revalidatePath(`/events/${eventId}/join`)
    revalidatePath(`/events/${eventId}/attendees`)
    return { fieldErrors: null }
}

export async function leaveEventAction(eventId: string): Promise<EventAttendanceState> {
    try {
        await eventAttendeesService.leaveEvent(eventId)
    } catch (err) {
        console.error("Failed to leave event:", err)
        return { fieldErrors: { db: "Failed to leave event. Please try again later." } }
    }

    revalidatePath("/events")
    revalidatePath(`/events/${eventId}/join`)
    revalidatePath(`/events/${eventId}/attendees`)
    return { fieldErrors: null }
}