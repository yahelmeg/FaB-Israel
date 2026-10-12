import { createClient } from "@/lib/supabase/server"

export type EventAttendeeRowBase = {
    event_id: string
    user_id: string
    created_at: string
}

export type EventAttendeeRow = EventAttendeeRowBase & {
    display_name: string
}

type AttendeeProfile = {
    display_name: string
}

type EventAttendeeRowWithProfileJoin = EventAttendeeRowBase & {
    profiles: AttendeeProfile | AttendeeProfile[] | null
}

function mapRowWithProfile({ profiles, ...baseRow }: EventAttendeeRowWithProfileJoin): EventAttendeeRow {
    const profile = Array.isArray(profiles) ? profiles[0] : profiles

    return {
        ...baseRow,
        display_name: profile?.display_name ?? "",
    }
}

const ATTENDEE_WITH_PROFILE_SELECT = `*, profiles (display_name)`

export async function getByEvent(eventId: string): Promise<EventAttendeeRow[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("event_attendees")
        .select(ATTENDEE_WITH_PROFILE_SELECT)
        .eq("event_id", eventId)
        .order("created_at", { ascending: true })

    if (error) {
        throw new Error(`Failed to fetch attendees for event ${eventId}: ${error.message}`)
    }

    return data.map(mapRowWithProfile)
}

// Returns the user's own row, or null if they haven't joined
export async function getByEventAndUser(eventId: string, userId: string): Promise<EventAttendeeRowBase | null> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("event_attendees")
        .select()
        .eq("event_id", eventId)
        .eq("user_id", userId)
        .maybeSingle()

    if (error) {
        throw new Error(`Failed to fetch attendance for event ${eventId}: ${error.message}`)
    }

    return data
}

export async function getCountByEvent(eventId: string): Promise<number> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("event_attendee_counts")
        .select("attendee_count")
        .eq("event_id", eventId)
        .maybeSingle()

    if (error) {
        throw new Error(`Failed to fetch attendee count for event ${eventId}: ${error.message}`)
    }

    return data?.attendee_count ?? 0
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