import {MarketSearchBar} from "@/components/market/search/market-search-bar";
import {ListingGrid} from "@/components/market/listings/listing-grid";

interface MarketPageProps {
    searchParams: Promise<{ q?: string }>
}

export default async function MarketPage({ searchParams }: MarketPageProps) {
    const {q} = await searchParams
    const query = q ?? ""


    return (
        <div className="page-layout">
            <MarketSearchBar defaultValue={query}/>
            <ListingGrid/>
        </div>
    )
}