"use client"

import { useState } from "react"
import { Listing } from "@/types/listings/Listing"
import { MyListingsGrid } from "@/components/my-listings/my-listing-grid"
import { CustomTabs } from "@/components/general/custom-tabs"

interface MyListingsTabsProps {
    active: Listing[]
    sold: Listing[]
    error: string | null
    mode: "buy" | "sell"
}

export function MyListingsTabs({ active, sold, error, mode }: MyListingsTabsProps) {
    const isBuying = mode === "buy"
    const tabNames = isBuying ? ["Active", "Bought"] as const : ["Active", "Sold"] as const
    const [tab, setTab] = useState<typeof tabNames[number]>("Active")

    if (error) {
        return <p className="text-muted-foreground text-center py-12">{error}</p>
    }

    const isActiveTab = tab === "Active"

    return (
        <div className="flex flex-col gap-4 w-full px-4 sm:px-0">
            <CustomTabs
                tabs={[...tabNames]}
                activeTab={tab}
                onChange={setTab}
            />
            <MyListingsGrid
                listings={isActiveTab ? active : sold}
                interactive={isActiveTab}
                emptyTitle={"No listings found"}
                emptyMessage={
                    isActiveTab
                        ? (isBuying ? "No active Buy Listings found." : "No active Sell Listings found.")
                        : (isBuying ? "No cards bought yet." : "No cards sold yet.")
                }
                mode={mode}
            />
        </div>
    )
}