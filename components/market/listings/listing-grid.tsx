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
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                {listings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} onClick={() => setSelectedListing(listing)}/>
                ))}
            </div>
            <ListingModal listing={selectedListing} onClose={() => setSelectedListing(null)}></ListingModal>
        </>
    )
}