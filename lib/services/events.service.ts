import { requireAdmin } from "@/lib/auth/require-admin"
import * as eventsRepository from "@/lib/repositories/events.repository"
import {Event} from "@/types/events/Event"
import {CreateEventInput, UpdateEventInput} from "@/lib/validators/events.validator"
import { toEvent } from "@/lib/mappers/events.mapper"


export async function getEvents(): Promise<Event[]> {
    const rows = await eventsRepository.getUpcoming()
    return rows.map(toEvent)
}

export async function getEventById(id: string): Promise<Event | null > {
    const row = await eventsRepository.getById(id)
    return row ? toEvent(row) : null
}

export async function createEvent(input: CreateEventInput): Promise<Event> {
    await requireAdmin()
    const row = await eventsRepository.insert(input)
    return toEvent(row)
}

export async function updateEvent(id: string, input: UpdateEventInput): Promise<Event> {
    await requireAdmin()
    const existing = await eventsRepository.getById(id)
    if (!existing) {
        throw new Error(`Event ${id} not found`)
    }

    const row = await eventsRepository.update(id, input)
    return toEvent(row)
}

export async function markEventCompleted(id: string): Promise<Event> {
    await requireAdmin()
    const existing = await eventsRepository.getById(id)
    if (!existing) {
        throw new Error(`Event ${id} not found`)
    }

    const row = await eventsRepository.update(id, { status: "completed" })
    return toEvent(row)
}

export async function markEventCancelled(id: string): Promise<Event> {
    await requireAdmin()
    const existing = await eventsRepository.getById(id)
    if (!existing) {
        throw new Error(`Event ${id} not found`)
    }

    const row = await eventsRepository.update(id, { status: "cancelled" })
    return toEvent(row)
}

export async function deleteEvent(id: string): Promise<void> {
    await requireAdmin()
    const existing = await eventsRepository.getById(id)
    if (!existing) {
        throw new Error(`Event ${id} not found`)
    }

    await eventsRepository.remove(id)
}