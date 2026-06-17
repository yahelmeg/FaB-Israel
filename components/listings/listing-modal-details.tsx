import { Listing } from "@/types/Listing"
import { FoilingBadge } from "./foiling-badge"
import { ConditionBadge } from "./condition-badge"
import { formatPrice } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {WhatsappButton} from "@/components/listings/whatsapp-button";
import {DiscordButton} from "@/components/listings/discord-button";


interface ListingModalDetailsProps {
    listing: Listing
}

export function ListingModalDetails({ listing }: ListingModalDetailsProps) {
    return (
        <div className="flex flex-col gap-4 p-6 pl-0 flex-1">
            <div>
                <h2 className="text-md font-bold">{listing.cardName}</h2>
                <p className="text-2xs text-muted-foreground">{listing.set}</p>
            </div>

            <div className="flex gap-2">
                <FoilingBadge foiling={listing.foiling} />
                <ConditionBadge condition={listing.condition} />
            </div>
            <Separator />
            <div>
                <div className="text-2xl font-bold">{formatPrice(listing.price)}</div>
                <p className="text-sm text-muted-foreground mt-1">Sold by {listing.sellerName}</p>
            </div>

            <div className="flex gap-2">
                {listing.sellerPhoneNumber && (
                    <WhatsappButton phoneNumber={listing.sellerPhoneNumber} cardName={listing.cardName} />
                )}
                {listing.sellerDiscord && (
                    <DiscordButton sellerDiscord={listing.sellerDiscord} />
                )}
            </div>
            <Separator />
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    nativeButton={false}
                    render={<a href={`https://www.tcgplayer.com/search/flesh-and-blood-tcg/product?q=${encodeURIComponent(listing.cardName)}`} target="_blank" rel="noopener noreferrer" />}
                >
                    TCGPlayer
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    nativeButton={false}
                    render={<a href={`https://www.cardmarket.com/en/FleshAndBlood/Products/Search?searchString=${encodeURIComponent(listing.cardName)}`} target="_blank" rel="noopener noreferrer" />}                >
                    Cardmarket
                </Button>
            </div>
        </div>
    )
}