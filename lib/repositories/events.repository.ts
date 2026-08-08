import {createClient} from "@/lib/supabase/server"
import {CreateEventInput, UpdateEventInput} from "@/lib/validators/events.validator"

export type EventRow = {
    id: string
    title: string
    date: string
    time: string
    format: string
    tier: string
    store: string | null
    address: string | null
    register_url: string | null
}


export async function getUpcoming(): Promise<EventRow[]> {
    const supabase = await createClient()
    const {data, error} = await supabase
        .from("events")
        .select("*")
        .eq("status", "upcoming")
        .order("date", {ascending: true})

    if (error) {
        throw new Error(`Failed to fetch events: ${error.message}`)
    }

    return data
}

export async function getById(id: string): Promise<EventRow | null> {
    const supabase = await createClient()
    const {data, error} = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .maybeSingle()

    if (error) {
        throw new Error(`Failed to fetch event ${id}: ${error.message}`)
    }

    return data
}

export async function insert(input: CreateEventInput): Promise<EventRow> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("events")
        .insert({
            title: input.title,
            date: input.date,
            time: input.time,
            format: input.format,
            tier: input.tier,
            store: input.store,
            address: input.address,
            register_url: input.registerUrl,
            status: "upcoming",
        })
        .select()
        .single()

    if (error) {
        throw new Error(`Failed to insert event: ${error.message}`)
    }

    return data
}

export async function update(id: string, input: UpdateEventInput): Promise<EventRow> {
    const supabase = await createClient()
    const updatePayload: Record<string, unknown> = {}
    if (input.title !== undefined) {
        updatePayload.title = input.title
    }
    if (input.date !== undefined) {
        updatePayload.date = input.date
    }
    if (input.time !== undefined) {
        updatePayload.time = input.time
    }
    if (input.format !== undefined) {
        updatePayload.format = input.format
    }
    if (input.tier !== undefined) {
        updatePayload.tier = input.tier
    }
    if (input.store !== undefined) {
        updatePayload.store = input.store
    }
    if (input.address !== undefined) {
        updatePayload.address = input.address
    }
    if (input.registerUrl !== undefined) {
        updatePayload.register_url = input.registerUrl
    }
    if (input.status !== undefined) {
        updatePayload.status = input.status
    }

    const { data, error } = await supabase
        .from("events")
        .update(updatePayload)
        .eq("id", id)
        .select()
        .maybeSingle()

    if (error) {
        throw new Error(`Failed to update event ${id}: ${error.message}`)
    }

    return data
}

export async function remove(id: string): Promise<void> {
    const supabase = await createClient()
    const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", id)

    if (error) {
        throw new Error(`Failed to delete event ${id}: ${error.message}`)
    }
}