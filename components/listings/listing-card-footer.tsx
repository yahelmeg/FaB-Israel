import { formatPrice } from "@/lib/format"
import { PrintingBadge } from "./badges/printing-badge"
import { ConditionBadge } from "./badges/condition-badge"
import {PrintingTypes} from "@/types/PrintingTypes";
import {ConditionTypes} from "@/types/ConditionTypes";

interface ListingCardFooterProps {
    price: number
    foiling: PrintingTypes
    condition: ConditionTypes
}

export function ListingCardFooter({ price, foiling, condition }: ListingCardFooterProps) {
    return (
        <div className="flex items-center w-full p-2 gap-2">
            <div className="font-bold text-foreground text-sm whitespace-nowrap shrink-0">
                {formatPrice(price)}
            </div>
            <div className="flex flex-row items-center gap-1 justify-end flex-1">
                <PrintingBadge printing={foiling} />
                <ConditionBadge condition={condition} />
            </div>
        </div>
    )
}