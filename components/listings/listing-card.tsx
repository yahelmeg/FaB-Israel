import {Card, CardContent} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Listing } from "@/types/Listing"
import { FoilingBadge } from "./foiling-badge"
import {ConditionBadge} from "./condition-badge"

interface ListingCardProps {
    listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
    return (
        <Card className="p-0 gap-0 group relative w-[400px] overflow-hidden rounded-xl border shadow-sm dark:ring-2 dark:ring-white/20 cursor-pointer">
            <div className="relative aspect-[3/4] w-full bg-muted">
                <img
                    src={listing.image}
                    alt="Flesh and Blood Card"
                    className="h-full w-full object-cover"
                    loading="lazy"
                />
            </div>
            <CardContent className="flex items-center justify-between p-2">
                <div className="text-xl font-bold text-foreground pl-2">
                    {listing.price}₪
                </div>
                <div className="flex flex-row items-center gap-1">
                    <FoilingBadge foiling={listing.foiling} />
                    <ConditionBadge condition={listing.condition} />
                </div>
            </CardContent>
        </Card>
    )
}