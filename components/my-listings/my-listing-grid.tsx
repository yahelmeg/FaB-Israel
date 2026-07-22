"use client"
import { MyListingCard } from "./my-listing-card"
import { Listing } from "@/types/Listing"

interface MyListingsGridProps {
    listings: Listing[]
    interactive: boolean
    emptyTitle?: string
    emptyMessage?: string
}

export function MyListingsGrid({ listings, interactive, emptyTitle, emptyMessage }: MyListingsGridProps) {
    if (listings.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center gap-2 w-full">
                <p className={emptyTitle ? "text-xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-2xl" : "page-heading-text"}>
                    {emptyTitle ?? "No listings found"}
                </p>
                <p className="text-sm text-muted-foreground">{emptyMessage ?? "Please check back later."}</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {listings.map((listing) => (
                <MyListingCard key={listing.id} listing={listing} interactive={interactive} />
            ))}
        </div>
    )
}