import {EventFormat} from "@/types/EventFormat";
import {EventTier} from "@/types/EventTier";

export interface Event {
    id: string
    title: string
    date: string
    time: string
    location: string
    store: string
    format: EventFormat
    tier: EventTier
    register_url?: string
}