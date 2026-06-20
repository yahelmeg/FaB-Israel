"use client"
import {ListingGrid} from "@/components/market/listings/listing-grid";
import {Listing} from "@/types/Listing";


const MOCK_LISTINGS: Listing[] = [
    {
        id: "1",
        price: 125.00,
        image: "/cards/IRA001-P_EUmBrk0.width-450.webp",
        condition: "MT",
        foiling: "GF",
        set: "Welcome to Rathe",
        cardName: "Ira1",
        sellerName: "Yahel",
        sellerPhoneNumber: "972543042596",
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
    {
        id: "3",
        price: 450.00,
        image: "/cards/IRA001-P_EUmBrk0.width-450.webp",
        condition: "EX",
        foiling: "RF",
        set: "Monarch",
        cardName: "Command and Conquer",
        sellerName: "Dudu",
        sellerPhoneNumber: "972522260702",
        sellerDiscord: "HolySrulink",
    },
    {
        id: "4",
        price: 450.00,
        image: "/cards/IRA001-P_EUmBrk0.width-450.webp",
        condition: "GD",
        foiling: "NF",
        set: "Monarch",
        cardName: "Command and Conquer",
        sellerName: "Dudu",
        sellerPhoneNumber: "972522260702",
        sellerDiscord: "HolySrulink",
    },
    {
        id: "5",
        price: 450.00,
        image: "/cards/IRA001-P_EUmBrk0.width-450.webp",
        condition: "LP",
        foiling: "NF",
        set: "Monarch",
        cardName: "Command and Conquer",
        sellerName: "Dudu",
        sellerPhoneNumber: "972522260702",
        sellerDiscord: "HolySrulink",
    },
    {
        id: "6",
        price: 450.00,
        image: "/cards/IRA001-P_EUmBrk0.width-450.webp",
        condition: "PL",
        foiling: "NF",
        set: "Monarch",
        cardName: "Command and Conquer",
        sellerName: "Dudu",
        sellerPhoneNumber: "972522260702",
        sellerDiscord: "HolySrulink",
    },
    {
        id: "7",
        price: 450.00,
        image: "/cards/IRA001-P_EUmBrk0.width-450.webp",
        condition: "PO",
        foiling: "NF",
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

