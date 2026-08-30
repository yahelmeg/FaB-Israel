import { ListingGridClient } from "@/components/market/listings/listing-grid-client"
import * as listingService from "@/lib/services/listings.service"
import {ListingSortField} from "@/types/listings/ListingSortField";
import {SortOrder} from "@/types/listings/ListingSortOption";


type ListingGridProps = {
    query?: string
    sortBy?: ListingSortField
    sortOrder?: SortOrder
    tab: "buy" | "sell"
}

async function loadListings( {query, sortBy, sortOrder, tab}: ListingGridProps) {
    try {
        const listings = await listingService.getListings({ search:query, sortBy, sortOrder }, tab )
        return { listings, error: null }
    } catch (err) {
        console.error("Failed to load listings:", err)
        return { listings: [], error: "Failed to load listings. Please try again later." }
    }
}

export async function ListingGrid({ query, sortBy, sortOrder, tab }: ListingGridProps) {
    const { listings, error } = await loadListings({query, sortBy, sortOrder, tab})

    if (error) {
        return <p role="alert">{error}</p>
    }

    return <ListingGridClient listings={listings} />
}