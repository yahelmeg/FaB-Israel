"use client"
import { ListingCard } from "@/components/listings/listing-card";
import {Listing} from "@/types/Listing"

interface ListingGridProps {
    listings: Listing[]
}

export function ListingGrid({listings}: ListingGridProps) {
    return (
        <div
            className="grid gap-x-3 gap-y-4"
            style={{gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))"}}
        >
            {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing}/>
            ))}
        </div>
    )
}