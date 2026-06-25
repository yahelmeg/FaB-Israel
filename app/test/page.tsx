import {ListingGrid} from "@/components/market/listings/listing-grid";
import {MOCK_LISTINGS} from "@/lib/mock-listings";


export default function getStartedPage() {
    return (
        <h2>
            <ListingGrid listings={MOCK_LISTINGS} />
        </h2>
    )
}