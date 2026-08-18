import {MarketSearchBar} from "@/components/market/search/market-search-bar";
import {ListingGrid} from "@/components/market/listings/listing-grid";
import type {Metadata} from "next";
import {isListingSortField, isSortOrder} from "@/types/listings/ListingSortField";


export const metadata: Metadata = {
    title: "Marketplace",
    description: "Browse Flesh and Blood cards for sale from the Israeli community.",
};


interface MarketPageProps {
    searchParams: Promise<{ q?: string; sortBy?: string; sortOrder?: string }>
}

export default async function MarketPage({ searchParams }: MarketPageProps) {
    const {q, sortBy, sortOrder} = await searchParams
    const query = q ?? ""
    const validSortBy = isListingSortField(sortBy) ? sortBy : "created_at"
    const validSortOrder = isSortOrder(sortOrder) ? sortOrder : "asc"

    return (
        <div className="page-layout">
            <MarketSearchBar
                defaultValue={query}
                defaultSortBy={validSortBy}
                defaultSortOrder={validSortOrder}
            />
            <ListingGrid query={query} sortBy={validSortBy} sortOrder={validSortOrder} />
        </div>
    )
}