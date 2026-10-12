import { z } from "zod"

export const eventIdSchema = z.uuid()

export type EventIdValidationResult =
    | { success: true; data: string }
    | { success: false; error: string }

export function parseAndValidateEventId(value: string): EventIdValidationResult {
    const result = eventIdSchema.safeParse(value)
    if(!result.success) {
        return { success: false, error: "Event not found." }
    }
    return { success: true, data: result.data }
}