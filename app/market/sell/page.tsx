import {SellListingForm} from "@/components/market/sell/sell-listing-form";
import {requireCompletedProfile} from "@/lib/auth/require-completed-profile";
import type {Metadata} from "next";
import {noIndex} from "@/lib/metadata";


export const metadata: Metadata = {
    title: "Sell a Card",
    description: "List your Flesh and Blood cards for sale on FaB-Israel.",
    robots: noIndex
};

export default async function MarketSellPage() {

    await requireCompletedProfile()

    return (
        <div className="flex flex-col gap-6 items-stretch px-4 py-12">
            <h2 className="page-heading-text mb-8 text-center">
                List a card for sale
            </h2>
            <SellListingForm/>
        </div>
    );
}