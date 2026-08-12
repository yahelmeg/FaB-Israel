import { getMySoldListings, getMyActiveListings } from "@/lib/listings/get-my-listings"
import { MyListingsTabs } from "@/components/my-listings/my-listings-tabs"
import type {Metadata} from "next";
import { noIndex } from "@/lib/metadata";

export const metadata: Metadata = {
    title: "My Listings",
    description: "Manage the cards you're currently selling on FaB-Israel.",
    robots: noIndex
};

export default async function MyListingsPage() {
    const [{ listings: active, error: activeError }, { listings: sold, error: fulfilledError }] =
        await Promise.all([getMyActiveListings(), getMySoldListings()])

    return (
        <div className="page-layout">
            <h1 className="page-heading-text">My Listings</h1>
            <MyListingsTabs
                active={active ?? []}
                sold={sold ?? []}
                error={activeError ?? fulfilledError}
            />
        </div>
    )
}