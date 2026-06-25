import Link from "next/link"
import {PrintingTypes} from "@/types/PrintingTypes"
import {printingStyles} from "@/lib/printings"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface PrintingBadgeProps {
    printing: PrintingTypes
    interactive?: boolean
}

export function PrintingBadge({ printing, interactive=true }: PrintingBadgeProps) {
    const dynamicClass = printingStyles[printing]

    const badge = (
        <Badge
            variant="outline"
            className={cn(
                "badge-styling",
                dynamicClass,
                !interactive && "cursor-default"
            )}
        >
            {printing}
        </Badge>
    )
    if (!interactive) {
        return badge
    }
    return (
        <Link href="/printings" onClick={(e) => e.stopPropagation()}>
            {badge}
        </Link>
    )
}