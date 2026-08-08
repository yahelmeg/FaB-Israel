"use server"

import { revalidatePath } from 'next/cache';
import {parseAndValidateEventForm, parseAndValidateEventUpdateForm} from "@/lib/validators/events.validator";
import * as eventsService from "@/lib/services/events.service"

export type EventFormState  = {
    fieldErrors: Record<string, string> | null
}

export async function createEvent(_prevState: EventFormState, formData: FormData): Promise<EventFormState> {
    const validation = parseAndValidateEventForm(formData)
    if (!validation.success) {
        return { fieldErrors: validation.error }
    }

    try {
        await eventsService.createEvent(validation.data)
    } catch (err) {
        console.error("Failed to create event:", err)
        return { fieldErrors: { db: "Failed to create event. Please try again later." }}
    }

    revalidatePath("/events")
    return { fieldErrors: null }
}

export async function updateEvent(id:string, _prevState: EventFormState, formData: FormData): Promise<EventFormState> {
    const validation = parseAndValidateEventUpdateForm(formData)
    if (!validation.success) {
        return { fieldErrors: validation.error }
    }

    try {
        await eventsService.updateEvent(id, validation.data)
    } catch (err) {
        console.error("Failed to update event:", err)
        return { fieldErrors: { db: "Failed to update event. Please try again later." }}
    }

    revalidatePath("/events")
    return { fieldErrors: null }
}

export async function markEventCompleted(id: string): Promise<EventFormState> {
    try {
        await eventsService.markEventCompleted(id)
    } catch (err) {
        console.error("Failed to mark event completed:", err)
        return { fieldErrors: { db: "Failed to update event. Please try again." } }
    }

    revalidatePath("/events")
    return { fieldErrors: null }
}

export async function markEventCancelled(id: string): Promise<EventFormState> {
    try {
        await eventsService.markEventCancelled(id)
    } catch (err) {
        console.error("Failed to cancel event:", err)
        return { fieldErrors: { db: "Failed to cancel event. Please try again." } }
    }

    revalidatePath("/events")
    return { fieldErrors: null }
}

export async function deleteEvent(id: string): Promise<EventFormState> {
    try {
        await eventsService.deleteEvent(id)
    } catch (err) {
        console.error("Failed to delete event:", err)
        return { fieldErrors: { db: "Failed to delete event. Please try again." } }
    }

    revalidatePath("/events")
    return { fieldErrors: null }
}