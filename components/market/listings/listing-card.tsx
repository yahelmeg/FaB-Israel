import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Listing } from "@/types/Listing"
import { ListingCardFooter } from "./listing-card-footer"
import { getImageSource } from "@/lib/fab-utils";
import { cn } from "@/lib/utils"

interface ListingCardProps {
    listing: Listing;
    onClick: () => void;
    className?: string;
}

export function ListingCard({ listing, onClick, className }: ListingCardProps) {
    return (
        <Card onClick={onClick} className={cn("group relative overflow-hidden rounded-xl border shadow-sm p-0 gap-0 cursor-pointer", className)}>
            <div className="relative aspect-[3/4] w-full bg-white dark:bg-black">
                <Image
                    src={getImageSource(listing.image)}
                    alt="Card"
                    fill
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, 450px"
                />
            </div>
            <CardContent className={`p-0`}>
                <ListingCardFooter language={listing.language} price={listing.price} foiling={listing.foiling} condition={listing.condition} />
            </CardContent>
        </Card>
    )
}