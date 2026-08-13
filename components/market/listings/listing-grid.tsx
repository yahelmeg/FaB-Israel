import { ListingGridClient } from "@/components/market/listings/listing-grid-client"
import * as listingService from "@/lib/services/listings.service"
import { Listing } from "@/types/Listing"

type ListingGridProps = {
    search?: string
}

async function loadListings(search?: string): Promise<{ listings: Listing[]; error: string | null }> {
    try {
        const listings = await listingService.getListings({ search })
        return { listings, error: null }
    } catch (err) {
        console.error("Failed to load listings:", err)
        return { listings: [], error: "Failed to load listings. Please try again later." }
    }
}

export async function ListingGrid({ search }: ListingGridProps) {
    const { listings, error } = await loadListings(search)

    if (error) {
        return <p role="alert">{error}</p>
    }

    return <ListingGridClient listings={listings} />
}