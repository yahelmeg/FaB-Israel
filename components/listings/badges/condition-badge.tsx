import Link from "next/link"
import {ConditionTypes} from "@/types/ConditionTypes"
import {conditionStyles, conditionTitles} from "@/lib/conditions"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"


interface ConditionBadgeProps {
    condition: ConditionTypes
    interactive?: boolean
}


export function ConditionBadge({ condition, interactive=true }: ConditionBadgeProps) {
    const dynamicClass = conditionStyles[condition] ||
        "bg-background/90 text-foreground border-neutral-300 dark:border-white/40 backdrop-blur-xs";

    const badge = (
        <Badge
            title={conditionTitles[condition]}
            variant="outline"
            className={cn(
                "text-xs w-12 px-0 py-1 font-bold uppercase tracking-wider shadow-sm whitespace-nowrap text-center justify-center dark:border-white/20",
                dynamicClass
            )}
        >
            {condition}
        </Badge>
    )

    if(!interactive) {
        return badge
    }

    return (
        <Link href={"/conditions"}  onClick={(e) => e.stopPropagation()} >
            {badge}
        </Link>
    );
}