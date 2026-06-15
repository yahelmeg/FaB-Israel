"use client"
import {ListingCard} from "@/components/listings/listing-card";
import {Listing} from "@/types/Listing";


const MOCK_CARD: Listing = {
    id: "1",
    price: 125.00,
    image: "/cards/IRA001-P_EUmBrk0.width-450.webp",
    condition: "Poor",
    foiling: "Non Foil",
    set: "2018-IRA",
} as const;

export default function Example() {
    return (
        <>
            <div className="flex gap-4 p-6">
                <ListingCard listing={MOCK_CARD}/>
            </div>
            <button onClick={() => document.documentElement.classList.toggle("dark")}>
                Toggle Dark Mode
            </button>
        </>
    )
}