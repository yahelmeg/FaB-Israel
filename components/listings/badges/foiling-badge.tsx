import {FoilingType} from "@/types/FoilingType"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface FoilingBadgeProps {
    foiling: FoilingType
}

const foilStyles: Record<FoilingType, string> = {
    "CF": "bg-slate-400 text-black border-transparent hover:bg-slate-300/90",
    "GF": "bg-yellow-400 text-black border-transparent hover:bg-yellow-300/90",
    "RF": "bg-purple-400 text-black border-transparent hover:bg-purple-300/90",
    "NF": "bg-neutral-300 text-black border-transparent hover:bg-neutral-200/90",
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
                "text-xs w-12 px-0 py-1 font-bold uppercase tracking-wider shadow-sm whitespace-nowrap text-center justify-center dark:border-white/20",
                dynamicClass
            )}
        >
            {foiling}
        </Badge>
    )
}