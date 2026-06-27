import {SearchBar} from "@/components/market/search/search-bar";
import {ListingGrid} from "@/components/market/listings/listing-grid";
import {MOCK_LISTINGS} from "@/lib/mock-listings";

interface MarketPageProps {
    searchParams: Promise<{ q?: string }>
}

export default async function MarketPage({ searchParams }: MarketPageProps) {
    const {q} = await searchParams
    const query = q ?? ""
    const hasSearched = q !== undefined

    const filteredListings = MOCK_LISTINGS.filter(
        listing => listing.cardName.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <div className="page-layout">
            {!hasSearched && (
                <h2 className="page-heading-text mb-8">
                    Buy and Sell cards
                </h2>
            )}
            <SearchBar defaultValue={query}/>
            {hasSearched && <ListingGrid listings={filteredListings}/>}
        </div>
    )
}