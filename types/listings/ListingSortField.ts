import { LISTING_SORT_OPTIONS } from "@/types/listings/ListingSortOption"
import {SortOrder} from "@/types/listings/ListingSortOption"

export type ListingSortField = "created_at" | "price" | "card_name"

export function isListingSortField(value: string | undefined): value is ListingSortField {
    return LISTING_SORT_OPTIONS.some((option) => option.sortBy === value)
}

export function isSortOrder(value: string | undefined): value is SortOrder {
    return value === "asc" || value === "desc"
}