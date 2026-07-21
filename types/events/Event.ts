import {EventFormat} from "@/types/events/EventFormat";
import {EventTier} from "@/types/events/EventTier";
import {Stores} from "@/types/Stores";

export interface Event {
    id: string
    title: string
    date: string
    time: string
    address?: string
    store?: Stores
    format: EventFormat
    tier: EventTier
    register_url?: string
}