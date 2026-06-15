import { Listing } from "@/types/Listing"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ConditionBadgeProps {
    condition: Listing["condition"];
}

const conditionStyles: Record<string, string> = {
    "Near Mint": "bg-green-500 text-black border-transparent hover:bg-green-500/90",
    "Light Played": "bg-orange-300 text-black border-transparent hover:bg-orange-300/90",
    "Poor": "bg-red-500 text-black border-transparent hover:bg-red-500/90",
};

export function ConditionBadge({ condition }: ConditionBadgeProps) {
    const dynamicClass = conditionStyles[condition] ||
        "bg-background/90 text-foreground border-neutral-300 dark:border-white/40 backdrop-blur-xs";

    return (
        <Badge
            variant="outline"
            className={cn(
                "text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 shadow-sm",
                dynamicClass
            )}
        >
            {condition}
        </Badge>
    );
}