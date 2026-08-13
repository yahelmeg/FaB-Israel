import {MarketSearchBar} from "@/components/market/search/market-search-bar";
import {ListingGrid} from "@/components/market/listings/listing-grid";
import type {Metadata} from "next";


export const metadata: Metadata = {
    title: "Marketplace",
    description: "Browse Flesh and Blood cards for sale from the Israeli community.",
};


interface MarketPageProps {
    searchParams: Promise<{ q?: string }>
}

export default async function MarketPage({ searchParams }: MarketPageProps) {
    const {q} = await searchParams
    const query = q ?? ""


    return (
        <div className="page-layout">
            <MarketSearchBar defaultValue={query}/>
            <ListingGrid search={query}/>
        </div>
    )
}