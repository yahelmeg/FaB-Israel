import Link from "next/link"
import {PrintingTypes} from "@/types/PrintingTypes"
import {printingStyles, printingTitles} from "@/lib/printings"
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
            title={printingTitles[printing]}
            variant="outline"
            className={cn(
                "text-xs w-12 px-0 py-1 font-bold uppercase tracking-wider shadow-sm whitespace-nowrap text-center justify-center dark:border-white/20 cursor-pointer",
                dynamicClass
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