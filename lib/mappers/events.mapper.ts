import { Event } from "@/types/events/Event"
import { EventRow } from "@/lib/repositories/events.repository"
import { EventFormat } from "@/types/events/EventFormat"
import { EventTier } from "@/types/events/EventTier"
import { Stores } from "@/types/Stores"

export function toEvent(row: EventRow): Event {
    return {
        id: row.id,
        title: row.title,
        date: row.date,
        time: row.time,
        format: row.format as EventFormat,
        tier: row.tier as EventTier,
        store: (row.store ?? undefined) as Stores | undefined,
        address: row.address ?? undefined,
        registerUrl: row.register_url ?? undefined,
    }
}