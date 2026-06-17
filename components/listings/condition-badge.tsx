import {ConditionType} from "@/types/ConditionType"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ConditionBadgeProps {
    condition: ConditionType
}

const conditionStyles: Record< ConditionType, string> = {
    "NM": "bg-green-500 text-black border-transparent hover:bg-green-500/90 ",
    "LP": "bg-orange-300 text-black border-transparent hover:bg-orange-300/90",
    "Poor": "bg-red-500 text-black border-transparent hover:bg-red-500/90",
};

const conditionTitles: Record<ConditionType, string> = {
    "NM": "Near Mint",
    "LP": "Light Played",
    "Poor": "Poor",
};

export function ConditionBadge({ condition }: ConditionBadgeProps) {
    const dynamicClass = conditionStyles[condition] ||
        "bg-background/90 text-foreground border-neutral-300 dark:border-white/40 backdrop-blur-xs";

    return (
        <Badge
            title={conditionTitles[condition]}
            variant="outline"
            className={cn(
                "text-xs w-12 px-0 py-1 font-bold uppercase tracking-wider shadow-sm whitespace-nowrap text-center justify-center dark:text-white dark:border-white/20",
                dynamicClass
            )}
        >
            {condition}
        </Badge>
    );
}