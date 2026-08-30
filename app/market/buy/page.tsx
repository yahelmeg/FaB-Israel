import {ListingForm} from "@/components/market/sell/listing-form";
import {requireCompletedProfile} from "@/lib/auth/require-completed-profile";
import type {Metadata} from "next";
import {noIndex} from "@/lib/metadata";


export const metadata: Metadata = {
    title: "Post a Buy Listing",
    description: "Post a listing for Flesh and Blood cards you are looking to buy on FaB-Israel.",
    robots: noIndex
};

export default async function MarketBuyPage() {

    await requireCompletedProfile()

    return (
        <div className="flex flex-col gap-6 items-stretch sm:items-center px-4 py-12">
            <h2 className="page-heading-text mb-8 text-center">
                Post a Buy Listing
            </h2>
            <ListingForm mode={"buy"}/>
        </div>
    );
}