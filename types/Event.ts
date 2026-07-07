import {EventFormat} from "@/types/EventFormat";
import {EventTier} from "@/types/EventTier";
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