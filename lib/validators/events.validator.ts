import {z} from "zod";

const baseEventSchema =  z.object({
    title: z.string().trim().min(1, "Title is required"),
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    format: z.string().min(1, "Format is required"),
    tier: z.string().min(1, "Tier is required"),
    locationType: z.enum(["store", "address"], {
        message: "Location type is required",
    }),
    store: z.string().trim().min(1, "Store is required").optional(),
    address: z.string().trim().min(1, "Address is required").optional(),
    register_url: z.string().trim().optional(),
})

function refineLocationFields(
    data: { locationType?: "store" | "address"; store?: string; address?: string },
    ctx: z.RefinementCtx
) {
    if (data.locationType === "store" && !data.store) {
        ctx.addIssue({ code: "custom", message: "Store is required", path: ["store"] })
    }
    if (data.locationType === "address" && !data.address) {
        ctx.addIssue({ code: "custom", message: "Address is required", path: ["address"] })
    }
}

function refineNotInPast(data: {date?: string}, ctx: z.RefinementCtx) {
    if (!data.date) {
        return
    }

    const eventDate = new Date(data.date)
    if (Number.isNaN(eventDate.getTime())) {
        return
    }

    const today =new Date()
    today.setHours(0, 0, 0, 0)

    if(eventDate < today) {
        ctx.addIssue({
            code: "custom",
            message: "Date is in the past",
            path: ["date"]
        })
    }
}

const eventFormSchema = baseEventSchema.superRefine(refineLocationFields).superRefine(refineNotInPast)

const updateEventFormSchema = baseEventSchema.partial().superRefine(refineLocationFields).superRefine(refineNotInPast)

export type CreateEventInput = {
    title: string
    date: string
    time: string
    format: string
    tier: string
    store: string | null
    address: string | null
    registerUrl: string | null
}

export type UpdateEventInput = Partial<CreateEventInput> & {
    status?: "upcoming" | "completed" | "cancelled"
}

export type EventFieldErrors = Record<string, string>

export type EventValidationResult =
    | { success: true; data: CreateEventInput }
    | { success: false; error: EventFieldErrors }

export type UpdateEventValidationResult  =
    | { success: true; data: UpdateEventInput }
    | { success: false; error: EventFieldErrors }

function collectFieldErrors (issues: z.core.$ZodIssue[]): EventFieldErrors {
    const errors: EventFieldErrors = {}
    for (const issue of issues) {
        const fieldName = issue.path[0]?.toString();
        if (fieldName && !errors[fieldName]) {
            errors[fieldName] = issue.message
        }
    }
    return errors
}

export function parseAndValidateEventForm(formData: FormData): EventValidationResult {
    const raw = Object.fromEntries(formData.entries())
    const result = eventFormSchema.safeParse(raw)

    if (!result.success) {
        return { success: false, error: collectFieldErrors(result.error.issues)}
    }

    const data = result.data
    return {
        success: true,
        data: {
            title: data.title,
            date: data.date,
            time: data.time,
            format: data.format,
            tier: data.tier,
            store: data.locationType === "store" ? data.store! : null,
            address: data.locationType === "address" ? data.address! : null,
            registerUrl: data.register_url || null,
        },
    }
}

export function parseAndValidateEventUpdateForm(formData: FormData): UpdateEventValidationResult {
    const raw = Object.fromEntries(formData.entries())
    const result = updateEventFormSchema.safeParse(raw)
    if (!result.success) {
        return { success: false, error: collectFieldErrors(result.error.issues)}
    }

    const data = result.data
    return {
        success: true,
        data: {
            ...(data.title !== undefined && { title: data.title }),
            ...(data.date !== undefined && { date: data.date }),
            ...(data.time !== undefined && { time: data.time }),
            ...(data.format !== undefined && { format: data.format }),
            ...(data.tier !== undefined && { tier: data.tier }),
            ...(data.locationType === "store" && { store: data.store }),
            ...(data.locationType === "address" && { address: data.address }),
            ...(data.register_url !== undefined && { registerUrl: data.register_url || null }),
        }
    }
}


