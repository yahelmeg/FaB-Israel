"use client"
import { useState} from "react";
import { ListingCard } from "@/components/market/listings/listing-card";
import {ListingModal} from "@/components/market/listings/listing-modal";
import {Listing} from "@/types/Listing"


interface ListingGridClientProps {
    listings: Listing[] | null;
}

export function ListingGridClient({listings}: ListingGridClientProps) {

    const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

    if (!listings || listings.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center gap-2">
                <p className="page-heading-text">No listings found</p>
                <p className="text-muted-foreground">Please check back later.</p>
            </div>
        )
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                {listings && listings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} onClick={() => setSelectedListing(listing)}/>
                ))}
            </div>
            <ListingModal listing={selectedListing} onClose={() => setSelectedListing(null)}></ListingModal>
        </>
    )
}