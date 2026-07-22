"use client"
import { useState } from "react"
import { ListingCard } from "@/components/market/listings/listing-card"
import { Listing } from "@/types/Listing"
import { MyListingCardModal } from "@/components/my-listings/my-listing-card-modal"

interface MyListingCardProps {
    listing: Listing
    interactive: boolean
}

export function MyListingCard({ listing, interactive }: MyListingCardProps) {
    const [open, setOpen] = useState(false)

    if (!interactive) {
        return <ListingCard listing={listing} onClick={() => {}} className="cursor-default" />
    }

    return (
        <>
            <ListingCard listing={listing} onClick={() => setOpen(true)} />
            <MyListingCardModal listing={listing} open={open} onClose={() => setOpen(false)} />
        </>
    )
}