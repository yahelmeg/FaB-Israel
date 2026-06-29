import { formatPrice } from "@/lib/format"
import { FoilingBadge } from "@/components/general/badges/foiling-badge"
import { ConditionBadge } from "@/components/general/badges/condition-badge"
import {FoilingTypes} from "@/types/FoilingTypes";
import {ConditionTypes} from "@/types/ConditionTypes";
import {LanguageFlag} from "@/components/general/badges/language-flag";
import {LanguageTypes} from "@/types/LanguageTypes";

interface ListingCardFooterProps {
    price: number
    foiling: FoilingTypes
    condition: ConditionTypes
    language: LanguageTypes
}

export function ListingCardFooter({ price, foiling, condition, language }: ListingCardFooterProps) {
    return (
        <div className="flex items-center w-full p-2 gap-2">
            <div className="font-bold text-foreground text-lg whitespace-nowrap shrink-0">
                {formatPrice(price)}
            </div>
            <div className="flex flex-row items-center gap-1 justify-end flex-1">
                <LanguageFlag language={language} />
                <FoilingBadge foiling={foiling} />
                <ConditionBadge condition={condition} />
            </div>
        </div>
    )
}