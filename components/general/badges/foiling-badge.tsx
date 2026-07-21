import Link from "next/link"
import {FoilingTypes} from "@/types/FoilingTypes"
import {foilingStyles} from "@/consts/foilings"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface FoilingBadgeProps {
    foiling: FoilingTypes
    interactive?: boolean
}

export function FoilingBadge({ foiling, interactive=true }: FoilingBadgeProps) {
    const dynamicClass = foilingStyles[foiling]

    const badge = (
        <Badge
            variant="outline"
            className={cn(
                "badge-styling",
                dynamicClass,
                !interactive && "cursor-default"
            )}
        >
            {foiling}
        </Badge>
    )
    if (!interactive) {
        return badge
    }
    return (
        <Link href="/foilings" onClick={(e) => e.stopPropagation()}>
            {badge}
        </Link>
    )
}