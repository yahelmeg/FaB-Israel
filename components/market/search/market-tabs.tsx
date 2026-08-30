"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { CustomTabs } from "@/components/general/custom-tabs"

export function MarketTabs() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentTab = searchParams.get("tab") === "buy" ? "Buy Listings" : "Sell Listings"

    const handleTabChange = (tab: "Sell Listings" | "Buy Listings") => {
        const params = new URLSearchParams(searchParams.toString())

        if (tab === "Buy Listings") {
            params.set("tab", "buy")
        } else {
            params.set("tab", "sell")
        }

        router.push(`?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="flex flex-col gap-4 w-full px-4 sm:px-0">
            <CustomTabs
                tabs={["Sell Listings", "Buy Listings"]}
                activeTab={currentTab}
                onChange={handleTabChange}
            />
        </div>
    )
}