import {EventFormat} from "@/types/EventFormat";
import {EventTier} from "@/types/EventTier";
import {Store} from "@/types/Store";

export interface Event {
    id: string
    title: string
    date: string
    time: string
    address?: string
    store?: Store
    format: EventFormat
    tier: EventTier
    register_url?: string
}