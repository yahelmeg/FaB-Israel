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
    variant?: "grid" | "carousel"

}

export function ListingCardFooter({ price, foiling, condition, language, variant }: ListingCardFooterProps) {
    const digitCount = Math.floor(Math.abs(price)).toString().length
    const isCarousel = variant === "carousel"
    const priceSize = isCarousel
        ? (digitCount > 5 ? "text-xs sm:text-sm" : "text-sm sm:text-lg")
        : (digitCount > 5 ? "text-sm" : "text-lg")

    return (
        <div className="flex items-center w-full min-w-0 p-2 gap-2">
            <div className={`font-bold text-foreground whitespace-nowrap shrink-0 max-w-[45%] truncate ${priceSize}`}>
                {formatPrice(price)}
            </div>
            <div className="flex flex-row items-center gap-1 justify-end flex-1 min-w-0">
                <LanguageFlag language={language}/>
                <FoilingBadge
                    foiling={foiling}
                    className={variant === "carousel" ? "hidden sm:flex" : undefined}
                />
                <ConditionBadge
                    condition={condition}
                    className={variant === "carousel" ? "hidden sm:flex" : undefined}
                />
            </div>
        </div>
    )
}