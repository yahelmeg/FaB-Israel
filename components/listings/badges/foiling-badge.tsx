import Link from "next/link"
import {FoilingType} from "@/types/FoilingType"
import {foilStyles, foilTitles} from "@/lib/foilings"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface FoilingBadgeProps {
    foiling: FoilingType
}

export function FoilingBadge({ foiling }: FoilingBadgeProps) {
    const dynamicClass = foilStyles[foiling]

    return (
        <Link href="/foilings" onClick={(e) => e.stopPropagation()}>
            <Badge
                title={foilTitles[foiling]}
                variant="outline"
                className={cn(
                    "text-xs w-12 px-0 py-1 font-bold uppercase tracking-wider shadow-sm whitespace-nowrap text-center justify-center dark:border-white/20 cursor-pointer",
                    dynamicClass
                )}
            >
                {foiling}
            </Badge>
        </Link>
    )
}