"use client"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Field} from "@/components/ui/field"
import React, { useState } from "react";
import { useRouter } from "next/navigation"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import {  LISTING_SORT_OPTIONS} from "@/types/listings/ListingSortOption"
import { FiSearch, FiArrowUp, FiArrowDown } from "react-icons/fi"
import {SortOrder} from "@/types/listings/ListingSortOption"

interface SearchBarProps {
    defaultValue?: string
    defaultSortBy?: string
    defaultSortOrder?: SortOrder
}

const DEFAULT_SORT_BY = "created_at"
const DEFAULT_SORT_ORDER = "asc"

export function MarketSearchBar( {defaultValue = "" , defaultSortBy=DEFAULT_SORT_BY, defaultSortOrder= DEFAULT_SORT_ORDER} : SearchBarProps ) {

    const [query, setQuery] = useState(defaultValue);
    const [sortBy, setSortBy] = useState(defaultSortBy)
    const [sortOrder, setSortOrder] = useState(defaultSortOrder)

    const router = useRouter()

    const selectedLabel = LISTING_SORT_OPTIONS.find((option) => option.sortBy === sortBy)?.label

    const pushParams = (updates: Record<string, string | undefined>) => {
        const params = new URLSearchParams(window.location.search)
        for ( const [key,value] of Object.entries(updates)) {
            if (value) {
                params.set(key,value)
            } else {
                params.delete(key)
            }
        }
        router.push(`?${params.toString()}`)
    }

    const handleSubmit = (e: React.SubmitEvent ) => {
        e.preventDefault()
        pushParams({ q: query })
    }

    const handleSortByChange = (value: string | null) => {
        const next = value ?? DEFAULT_SORT_BY
        setSortBy(next)
        pushParams({ sortBy: next})
    }

    const handleSortOrderChange =  () => {
        const next: SortOrder = sortOrder === "asc" ? "desc" : "asc"
        setSortOrder(next)
        pushParams({ sortOrder: next})
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-3xl flex gap-2">
            <Field orientation="horizontal" className="bg-muted rounded-lg" >
                <Input type="search"
                       placeholder="Search Flesh and Blood cards..."
                       value={query}
                       onChange={(e) => setQuery(e.target.value)}
                       className="h-10 text-xs md:text-lg"
                />
            </Field>
            <Button type="submit" variant="outline" aria-label="Search" className="cursor-pointer bg-muted h-10 w-10">
                <FiSearch />
            </Button>
            <Select value={sortBy} onValueChange={handleSortByChange}>
                <SelectTrigger className="!h-10 !w-48 overflow-hidden">
                    <SelectValue placeholder="Sort by"> {selectedLabel} </SelectValue>
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                    {LISTING_SORT_OPTIONS.map((option) => (
                        <SelectItem key={option.sortBy} value={option.sortBy}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button
                type="button"
                variant="outline"
                aria-label={sortOrder === "asc" ? "Sort ascending" : "Sort descending"}
                onClick={handleSortOrderChange}
                className="cursor-pointer bg-muted h-10 w-10"
            >
                {sortOrder === "asc" ? <FiArrowUp /> : <FiArrowDown />}
            </Button>
        </form>
    )
}


