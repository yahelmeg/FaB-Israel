import { formatPrice } from "@/lib/format"
import { FoilingBadge } from "./foiling-badge"
import { ConditionBadge } from "./condition-badge"
import {FoilingType} from "@/types/FoilingType";
import {ConditionType} from "@/types/ConditionType";

interface ListingCardFooterProps {
    price: number
    foiling: FoilingType
    condition: ConditionType
}

export function ListingCardFooter({ price, foiling, condition }: ListingCardFooterProps) {
    return (
        <div className="flex items-center w-full p-2 gap-2">
            <div className="font-bold text-foreground text-sm whitespace-nowrap shrink-0">
                {formatPrice(price)}
            </div>
            <div className="flex flex-row items-center gap-1 justify-end flex-1">
                <FoilingBadge foiling={foiling}/>
                <ConditionBadge condition={condition}/>
            </div>
        </div>
    )
}