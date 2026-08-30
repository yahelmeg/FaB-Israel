"use client"

import { useState } from "react"
import { CustomTabs } from "@/components/general/custom-tabs"

export function MarketTabs() {
    const [tab, setTab] = useState<"Sell Listings" | "Buy Listings">("Sell Listings")

    return (
        <div className="flex flex-col gap-4 w-full px-4 sm:px-0">
            <CustomTabs
                tabs={["Sell Listings", "Buy Listings"]}
                activeTab={tab}
                onChange={setTab}
            />
        </div>
    )
}