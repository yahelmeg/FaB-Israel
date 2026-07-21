"use server"

import {requireAdmin} from "@/lib/auth/require-admin";
import {createClient} from "@/lib/supabase/server";
import { redirect } from "next/navigation"


export type EventFormState = {
    error: string | null
}

export async function createEvent(_prevState: EventFormState, formData: FormData): Promise<EventFormState> {
    await requireAdmin()
    const supabase = await createClient()
    const title = (formData.get("title") as string).trim();
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const format = formData.get("format") as string
    const tier = formData.get("tier") as string
    const locationType = formData.get("locationType") as string
    const store = formData.get("store") as string
    const address = (formData.get("address") as string)?.trim()
    const register_url = (formData.get("register_url") as string)?.trim()

    if (!title) {
        return {
            error: "Title is required"
        }
    }
    if (!date) {
        return {
            error: "Date is required"
        }
    }
    if (!time) {
        return {
            error: "Time is required"
        }
    }
    if (!format) {
        return {
            error: "Format is required"
        }
    }
    if (!tier) {
        return {
            error: "Tier is required"
        }
    }
    if (locationType === "store" && !store) {
        return {
            error: "Store is required"
        }
    }
    if (locationType === "address" && !address) {
        return {
            error: "Address is required"
        }
    }

    const {error} = await supabase
        .from("events")
        .insert({
            title,
            date,
            time,
            format,
            tier,
            store: locationType === "store" ? store : null,
            address: locationType === "address" ? address : null,
            register_url: register_url? register_url : null,
        })

    if (error) {
        console.error("Failed to create event:", error)
        return { error: "Failed to create event. Please try again." }
    }

    redirect("/events")
}

