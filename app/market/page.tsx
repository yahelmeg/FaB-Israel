import {MarketSearchBar} from "@/components/market/search/market-search-bar";
import {ListingGrid} from "@/components/market/listings/listing-grid";

interface MarketPageProps {
    searchParams: Promise<{ q?: string }>
}

export default async function MarketPage({ searchParams }: MarketPageProps) {
    const {q} = await searchParams
    const query = q ?? ""
    const hasSearched = q !== undefined


    return (
        <div className="page-layout">
            {!hasSearched && (
                <h2 className="page-heading-text mb-8">
                    Search for Cards
                </h2>
            )}
            <MarketSearchBar defaultValue={query}/>
            {hasSearched && <ListingGrid/>}
        </div>
    )
}