import { createClient } from "@/lib/supabase/server"

export type EventAttendeeRow = {
    event_id: string
    user_id: string
    display_name: string
    gem_id: string
}

type RawAttendeeRow = {
    event_id: string
    user_id: string
    profiles: { display_name: string | null; gem_id: string | null } | { display_name: string | null; gem_id: string | null }[] | null
}

function mapRowWithProfile(row: RawAttendeeRow): EventAttendeeRow {
    const profile = Array.isArray(row.profiles) ? row.profiles[0] : row.profiles

    return {
        event_id: row.event_id,
        user_id: row.user_id,
        display_name: profile?.display_name ?? "",
        gem_id: profile?.gem_id ?? ""
    }
}

export async function getByEvent(eventId: string): Promise<EventAttendeeRow[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("event_attendees")
        .select("*, profiles (display_name, gem_id)")
        .eq("event_id", eventId)

    if (error) {
        throw new Error(`Failed to fetch attendees for event ${eventId}: ${error.message}`)
    }

    return data.map(mapRowWithProfile)
}

export async function getEventIdsByUser(userId: string): Promise<string[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("event_attendees")
        .select("event_id")
        .eq("user_id", userId)

    if (error) {
        throw new Error(`Failed to fetch joined events for user ${userId}: ${error.message}`)
    }

    return data.map((row) => row.event_id)
}

export async function getCountsByEvents(eventIds: string[]): Promise<Record<string, number>> {
    if (eventIds.length === 0) {
        return {}
    }

    const supabase = await createClient()
    const { data, error } = await supabase
        .from("event_attendee_counts")
        .select("event_id, attendee_count")
        .in("event_id", eventIds)

    if (error) {
        throw new Error(`Failed to fetch attendee counts: ${error.message}`)
    }

    return Object.fromEntries(data.map((row) => [row.event_id, row.attendee_count]))
}

export async function insert(eventId: string, userId: string): Promise<void> {
    const supabase = await createClient()
    const { error } = await supabase
        .from("event_attendees")
        .upsert(
            { event_id: eventId, user_id: userId },
            { onConflict: "event_id,user_id", ignoreDuplicates: true }
        )

    if (error) {
        throw new Error(`Failed to join event ${eventId}: ${error.message}`)
    }
}

export async function remove(eventId: string, userId: string): Promise<void> {
    const supabase = await createClient()
    const { error } = await supabase
        .from("event_attendees")
        .delete()
        .eq("event_id", eventId)
        .eq("user_id", userId)

    if (error) {
        throw new Error(`Failed to leave event ${eventId}: ${error.message}`)
    }
}