import { z } from "zod";

export type FieldErrors = Record<string, string>

export function collectFieldErrors(issues: z.core.$ZodIssue[]): FieldErrors {
    const errors: FieldErrors = {}
    for (const issue of issues) {
        const fieldName = issue.path[0]?.toString();
        if (fieldName && !errors[fieldName]) {
            errors[fieldName] = issue.message
        }
    }
    return errors
}