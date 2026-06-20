"use client"
import { useState} from "react";
import { ListingCard } from "@/components/market/listings/listing-card";
import {ListingModal} from "@/components/market/listings/listing-modal";
import {Listing} from "@/types/Listing"

interface ListingGridProps {
    listings: Listing[]
}

export function ListingGrid({listings}: ListingGridProps) {

    const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
    return (
        <>
            <div
                className="grid gap-x-3 gap-y-4"
                style={{gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))"}}
            >
                {listings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} onClick={() => setSelectedListing(listing)}/>
                ))}
            </div>
            <ListingModal listing={selectedListing} onClose={() => setSelectedListing(null)}></ListingModal>
        </>
    )
}