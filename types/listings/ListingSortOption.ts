import {ListingSortField} from "@/types/listings/ListingSortField";

export type SortOrder = "asc" | "desc"

export type ListingSortOption = {
    sortBy: ListingSortField
    label: string
}

export const LISTING_SORT_OPTIONS: ListingSortOption[] = [
    { sortBy: "created_at", label: "Date Listed" },
    { sortBy: "price", label: "Price" },
    { sortBy: "card_name", label: "Card Name" },
]