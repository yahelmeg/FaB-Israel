import { getMySoldListings, getMyActiveListings } from "@/lib/listings/get-my-listings"
import { MyListingsTabs } from "@/components/my-listings/my-listings-tabs"

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