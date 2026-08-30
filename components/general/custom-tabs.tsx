"use client"

import { Button } from "@/components/ui/button"

interface CustomTabsProps<T extends string> {
    tabs: T[]
    activeTab: T
    onChange: (tab: T) => void
}

export function CustomTabs<T extends string>({ tabs, activeTab, onChange }: CustomTabsProps<T>) {
    return (
        <div className="flex flex-col sm:flex-row w-full gap-2 items-center justify-center">
            {tabs.map((tab) => {
                const isActive = activeTab === tab
                return (
                    <Button
                        key={tab}
                        size="lg"
                        variant="outline"
                        className={`w-full sm:w-64 min-w-0 cursor-pointer transition-colors ${
                            isActive
                                ? "bg-blue-700 dark:bg-blue-500 text-white border-blue-700 dark:border-blue-500 hover:bg-blue-700 dark:hover:bg-blue-500 hover:text-white"
                                : "hover:bg-transparent hover:text-inherit"
                        }`}
                        onClick={() => onChange(tab)}
                    >
                        {tab}
                    </Button>
                )
            })}
        </div>
    )
}