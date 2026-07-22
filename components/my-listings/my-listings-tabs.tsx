"use client"
import { useState } from "react"
import { Listing } from "@/types/Listing"
import { ListingGridClient } from "@/components/market/listings/listing-grid-client"
import { Button } from "@/components/ui/button"

interface MyListingsTabsProps {
    active: Listing[]
    sold: Listing[]
    error: string | null
}

export function MyListingsTabs({ active, sold, error }: MyListingsTabsProps) {
    const [tab, setTab] = useState<"active" | "sold">("active")

    if (error) {
        return <p className="text-muted-foreground text-center py-12">{error}</p>
    }

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex w-full gap-2 items-center justify-center">
                <Button
                    size="lg"
                    variant="outline"
                    className={`w-64 min-w-0 cursor-pointer ${
                        tab === "active"
                            ? "bg-blue-700 dark:bg-blue-500 text-white border-blue-700 dark:border-blue-500 hover:bg-blue-700 dark:hover:bg-blue-500 hover:text-white"
                            : "hover:bg-transparent hover:text-inherit"
                    }`}
                    onClick={() => setTab("active")}
                >
                    Active
                </Button>
                <Button
                    size="lg"
                    variant="outline"
                    className={`w-64 min-w-0 cursor-pointer ${
                        tab === "sold"
                            ? "bg-blue-700 dark:bg-blue-500 text-white border-blue-700 dark:border-blue-500 hover:bg-blue-700 dark:hover:bg-blue-500 hover:text-white"
                            : "hover:bg-transparent hover:text-inherit"
                    }`}
                    onClick={() => setTab("sold")}
                >
                    Sold
                </Button>
            </div>
            <ListingGridClient
                listings={tab === "active" ? active : sold}
                emptyTitle={"No listings found"}
                emptyMessage={
                    tab === "active"
                        ? "Create your own listings to see them here."
                        : "No cards sold yet."
                }
            />
        </div>
    )
}