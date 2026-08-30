import {MarketSearchBar} from "@/components/market/search/market-search-bar";
import {ListingGrid} from "@/components/market/listings/listing-grid";
import type {Metadata} from "next";
import {isListingSortField, isSortOrder} from "@/types/listings/ListingSortField";
import {MarketTabs} from "@/components/market/search/market-tabs";


export const metadata: Metadata = {
    title: "Marketplace",
    description: "Browse Flesh and Blood cards for sale from the Israeli community.",
};


interface MarketPageProps {
    searchParams: Promise<{ q?: string; sortBy?: string; sortOrder?: string, tab?: string}>
}

export default async function MarketPage({ searchParams }: MarketPageProps) {
    const {q, sortBy, sortOrder, tab} = await searchParams
    const query = q ?? ""
    const validSortBy = isListingSortField(sortBy) ? sortBy : "created_at"
    const validSortOrder = isSortOrder(sortOrder) ? sortOrder : "desc"
    const currentTab = tab === "buy" ? "buy" : "sell"

    return (
        <div className="page-layout">
            <MarketTabs/>
            <MarketSearchBar
                defaultValue={query}
                defaultSortBy={validSortBy}
                defaultSortOrder={validSortOrder}
            />
            <ListingGrid query={query} sortBy={validSortBy} sortOrder={validSortOrder} tab={currentTab} />
        </div>
    )
}