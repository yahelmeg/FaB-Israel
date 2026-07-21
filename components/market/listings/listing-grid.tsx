import { ListingGridClient } from "@/components/market/listings/listing-grid-client"
import { getVisibleListings } from "@/lib/listings/get-visible-listings"

export async function ListingGrid() {
    const {listings,error} = await getVisibleListings()

    return <ListingGridClient listings={listings} />
}