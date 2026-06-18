import Link from "next/link"
import {ConditionType} from "@/types/ConditionType"
import {conditionStyles, conditionTitles} from "@/lib/conditions"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"


interface ConditionBadgeProps {
    condition: ConditionType
}


export function ConditionBadge({ condition }: ConditionBadgeProps) {
    const dynamicClass = conditionStyles[condition] ||
        "bg-background/90 text-foreground border-neutral-300 dark:border-white/40 backdrop-blur-xs";

    return (
        <Link href={"/conditions"}  onClick={(e) => e.stopPropagation()} >
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
        </Link>
    );
}