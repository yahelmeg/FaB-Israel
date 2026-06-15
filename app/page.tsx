"use client"
import {ListingGrid} from "@/components/listings/listing-grid";
import {Listing} from "@/types/Listing";


const MOCK_LISTINGS: Listing[] = [
    {
        id: "1",
        price: 125.00,
        image: "/cards/IRA001-P_EUmBrk0.width-450.webp",
        condition: "Poor",
        foiling: "GF",
        set: "Welcome to Rathe",
    },
    {
        id: "2",
        price: 450.00,
        image: "/cards/IRA001-P_EUmBrk0.width-450.webp",
        condition: "NM",
        foiling: "CF",
        set: "Monarch",
    },
    {
        id: "3",
        price: 15.50,
        image: "/cards/IRA001-P_EUmBrk0.width-450.webp",
        condition: "LP",
        foiling: "RF",
        set: "Tales of Aria",
    },
    {
        id: "4",
        price: 89.99,
        image: "/cards/IRA001-P_EUmBrk0.width-450.webp",
        condition: "Poor",
        foiling: "NF",
        set: "Uprising",
    },
    {
        id: "5",
        price: 1200.00,
        image: "/cards/IRA001-P_EUmBrk0.width-450.webp",
        condition: "NM",
        foiling: "CF",
        set: "History Pack 1",
    },
    {
        id: "6",
        price: 3.25,
        image: "/cards/IRA001-P_EUmBrk0.width-450.webp",
        condition: "NM",
        foiling: "NF",
        set: "Heavy Hitters",
    }
];

export default function Example() {
    return (
        <>
            <ListingGrid listings={MOCK_LISTINGS} />
            <button onClick={() => document.documentElement.classList.toggle("dark")}>
                Toggle Dark Mode
            </button>
        </>
    )
}

