import { ListingGridClient } from "@/components/market/listings/listing-grid-client"
import { getActiveListings } from "@/lib/listings/get-active-listings"

export async function ListingGrid() {
    const {listings,error} = await getActiveListings()

    return <ListingGridClient listings={listings} />
}