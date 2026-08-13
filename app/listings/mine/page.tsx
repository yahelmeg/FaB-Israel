import * as listingService from "@/lib/services/listings.service"
import { MyListingsTabs } from "@/components/my-listings/my-listings-tabs"
import type {Metadata} from "next";
import { noIndex } from "@/lib/metadata";
import { Listing } from "@/types/Listing"


export const metadata: Metadata = {
    title: "My Listings",
    description: "Manage the cards you're currently selling on FaB-Israel.",
    robots: noIndex
};

async function loadMyListings(): Promise<{ active: Listing[]; sold: Listing[]; error: string | null }> {
    try {
        const [active, sold] = await Promise.all([
            listingService.getMyListings("active"),
            listingService.getMyListings("fulfilled"),
        ])
        return { active, sold, error: null }
    } catch (err) {
        console.error("Failed to load my listings:", err)
        return { active: [], sold: [], error: "Failed to load your listings. Please try again later." }
    }
}


export default async function MyListingsPage() {
    const { active, sold, error } = await loadMyListings()

    return (
        <div className="page-layout">
            <h1 className="page-heading-text">My Listings</h1>
            <MyListingsTabs active={active} sold={sold} error={error} />
        </div>
    )
}