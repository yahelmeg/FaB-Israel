import type { EventAttendeeRow } from "@/lib/repositories/event-attendees.repository"
import type { EventAttendee } from "@/types/events/EventAttendee"

export function toEventAttendee(row: EventAttendeeRow): EventAttendee {
    return {
        userId: row.user_id,
        displayName: row.display_name || "Unknown player",
        gemId: row.gem_id || "Gem Id Missing"
    }
}