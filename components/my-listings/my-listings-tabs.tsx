"use client"

import { useState } from "react"
import { Listing } from "@/types/listings/Listing"
import { MyListingsGrid } from "@/components/my-listings/my-listing-grid"
import { CustomTabs } from "@/components/general/custom-tabs"

interface MyListingsTabsProps {
    active: Listing[]
    sold: Listing[]
    error: string | null
}

export function MyListingsTabs({ active, sold, error }: MyListingsTabsProps) {
    const [tab, setTab] = useState<"Active" | "Sold">("Active")

    if (error) {
        return <p className="text-muted-foreground text-center py-12">{error}</p>
    }

    const activeListings = tab === "Active"

    return (
        <div className="flex flex-col gap-4 w-full px-4 sm:px-0">
            <CustomTabs
                tabs={["Active", "Sold"]}
                activeTab={tab}
                onChange={setTab}
            />
            <MyListingsGrid
                listings={activeListings ? active : sold}
                interactive={activeListings}
                emptyTitle={"No listings found"}
                emptyMessage={
                    activeListings
                        ? "Create your own listings to see them here."
                        : "No cards sold yet."
                }
            />
        </div>
    )
}