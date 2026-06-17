import {FoilingType} from "@/types/FoilingType"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface FoilingBadgeProps {
    foiling: FoilingType
}

const foilStyles: Record<FoilingType, string> = {
    "CF": "bg-gradient-to-r from-slate-500 to-blue-400 text-black border-transparent",
    "GF": "bg-yellow-400 text-black border-transparent hover:bg-yellow-400/90",
    "RF": "bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 to-purple-500 text-black border-transparent",
    "NF": "bg-background/90 text-foreground border-neutral-300",
}

const foilTitles: Record<FoilingType, string> = {
    "CF": "Cold Foil",
    "GF": "Gold Foil",
    "RF": "Rainbow Foil",
    "NF": "Non Foil",
}

export function FoilingBadge({ foiling }: FoilingBadgeProps) {
    const dynamicClass = foilStyles[foiling]

    return (
        <Badge
            title={foilTitles[foiling]}
            variant="outline"
            className={cn(
                "text-xs w-12 px-0 py-1 font-bold uppercase tracking-wider shadow-sm whitespace-nowrap text-center justify-center dark:text-white dark:border-white/20",
                dynamicClass
            )}
        >
            {foiling}
        </Badge>
    )
}