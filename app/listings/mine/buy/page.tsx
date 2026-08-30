import * as listingService from "@/lib/services/listings.service"
import { MyListingsTabs } from "@/components/my-listings/my-listings-tabs"
import type {Metadata} from "next";
import { noIndex } from "@/lib/metadata";
import { Listing } from "@/types/listings/Listing"


export const metadata: Metadata = {
    title: "My Buy Listings",
    description: "Manage your Buy Listings on FaB-Israel.",
    robots: noIndex
};

async function loadMyListings(): Promise<{ active: Listing[]; sold: Listing[]; error: string | null }> {
    try {
        const [active, sold] = await Promise.all([
            listingService.getMyListings("active", "buy"),
            listingService.getMyListings("fulfilled", "buy"),
        ])
        return { active, sold, error: null }
    } catch (err) {
        console.error("Failed to load my listings:", err)
        return { active: [], sold: [], error: "Failed to load your listings. Please try again later." }
    }
}


export default async function MyBuyListingsPage() {
    const { active, sold, error } = await loadMyListings()

    return (
        <div className="page-layout">
            <h1 className="page-heading-text">My Buy Listings</h1>
            <MyListingsTabs active={active} sold={sold} error={error} mode={"buy"} />
        </div>
    )
}