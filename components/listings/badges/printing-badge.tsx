import Link from "next/link"
import {PrintingType} from "@/types/PrintingType"
import {printingStyles, printingTitles} from "@/lib/printings"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface FoilingBadgeProps {
    foiling: PrintingType
}

export function PrintingBadge({ foiling }: FoilingBadgeProps) {
    const dynamicClass = printingStyles[foiling]

    return (
        <Link href="/foilings" onClick={(e) => e.stopPropagation()}>
            <Badge
                title={printingTitles[foiling]}
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