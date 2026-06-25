import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Listing } from "@/types/Listing"
import { ListingCardFooter } from "./listing-card-footer"

interface ListingCardProps {
    listing: Listing;
    onClick: () => void;
}

export function ListingCard({ listing, onClick }: ListingCardProps) {
    return (
        <Card onClick={onClick} className="group relative overflow-hidden rounded-xl border shadow-sm p-0 gap-0 cursor-pointer">
            <div className="relative aspect-[3/4] w-full bg-white dark:bg-black">
                <Image
                    src={listing.image}
                    alt="Card"
                    fill
                    loading="eager"
                    sizes = "(max-width: 768px) 100vw, 450px"
                />
            </div>
            <CardContent className={`p-0`}>
            <ListingCardFooter language={listing.language} price={listing.price} foiling={listing.foiling} condition={listing.condition} />
            </CardContent>
        </Card>
    )
}