import { createClient } from "@/lib/supabase/server"
import { Event } from "@/types/events/Event"

export async function getVisibleEvents(): Promise<{ events: Event[] | null; error: string | null }> {
    const supabase = await createClient()
    const today = new Date().toISOString().split("T")[0]
    const { data: events, error } = await supabase
        .from("events")
        .select("*")
        .eq("is_visible", true)
        .gte("date", today)
        .order("date", { ascending: true })
        .order("time", { ascending: true })

    if (error) {
        console.error("Failed to load events:", error)
        return { events: null, error: "Couldn't load events. Please try again later." }
    }

    return { events, error: null }
}