import { Card, CardContent } from "@/components/ui/card"
import { Listing } from "@/types/Listing"
import { ListingCardFooter } from "./listing-card-footer"

interface ListingCardProps {
    listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
    return (
        <Card className="group relative overflow-hidden rounded-xl border shadow-sm p-0 gap-0 cursor-pointer">
            <div className="relative aspect-[3/4] w-full bg-muted">
                <img src={listing.image} alt="Card" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <CardContent className={`p-0 text-[8px] @card-xs:text-[9px] @card-sm:text-[10px] @card-md:text-[11px] @card-lg:text-[13px]`}>
                <ListingCardFooter price={listing.price} foiling={listing.foiling} condition={listing.condition} />
            </CardContent>
        </Card>
    )
}