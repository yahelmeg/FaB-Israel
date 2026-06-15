import { Listing } from "@/types/Listing"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface FoilingBadgeProps {
    foiling: Listing["foiling"]
}

const foilStyles: Record<string, string> = {
    "Cold Foil": "bg-gradient-to-r from-slate-500 to-blue-400 text-white border-transparent",
    "Gold Foil": "bg-yellow-400 text-black font-black border-transparent hover:bg-yellow-400/90",
    "Rainbow Foil": "bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 to-purple-500 text-white font-black border-transparent",
}

export function FoilingBadge({ foiling }: FoilingBadgeProps) {
    const dynamicClass = foilStyles[foiling] ||
        "bg-background/90 text-foreground border-neutral-300 dark:border-white/40 backdrop-blur-xs";

    return (
        <Badge
            variant="outline"
            className={cn(
                "text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 shadow-sm",
                dynamicClass
            )}
        >
            {foiling}
        </Badge>
    )
}