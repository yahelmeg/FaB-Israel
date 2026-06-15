import { FoilingBadge } from "./foiling-badge"
import { ConditionBadge } from "./condition-badge"
import { Listing } from "@/types/Listing"

interface ListingCardFooterProps {
    price: Listing["price"]
    foiling: Listing["foiling"]
    condition: Listing["condition"]
}

export function ListingCardFooter({ price, foiling, condition }: ListingCardFooterProps) {
    return (
        <div className="flex items-center w-full p-2 gap-2">
            <div className="font-bold text-foreground text-sm whitespace-nowrap shrink-0">
                {price}₪
            </div>
            <div className="flex flex-row items-center gap-1 justify-end flex-1">
                <FoilingBadge foiling={foiling}/>
                <ConditionBadge condition={condition}/>
            </div>
        </div>
    )
}