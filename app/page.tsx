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
        cardName: "Ira1",
        sellerName: "Yahel",
        sellerPhoneNumber: "972504277103",
        sellerDiscord: "Dusk",
    },
    {
        id: "2",
        price: 450.00,
        image: "/cards/IRA001-P_EUmBrk0.width-450.webp",
        condition: "NM",
        foiling: "CF",
        set: "Monarch",
        cardName: "Command and Conquer",
        sellerName: "Dudu",
        sellerPhoneNumber: "972522260702",
        sellerDiscord: "HolySrulink",
    },

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

