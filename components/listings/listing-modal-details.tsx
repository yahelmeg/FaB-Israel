import { Listing } from "@/types/Listing"
import { PrintingBadge } from "./badges/printing-badge"
import { ConditionBadge } from "./badges/condition-badge"
import { formatPrice } from "@/lib/format"
import { Separator } from "@/components/ui/separator"
import {WhatsappButton} from "@/components/listings/buttons/whatsapp-button";
import {DiscordButton} from "@/components/listings/buttons/discord-button";
import {CardMarketButton} from "@/components/listings/buttons/cardmarket-button";
import {TcgPlayerButton} from "@/components/listings/buttons/tcgplayer-button";


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
                <PrintingBadge printing={listing.foiling}/>
                <ConditionBadge condition={listing.condition}/>
            </div>
            <Separator />
            <div>
                <div className="text-2xl font-bold">{formatPrice(listing.price)}</div>
                <p className="text-sm text-muted-foreground mt-1">Sold by {listing.sellerName}</p>
            </div>

            <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                    {listing.sellerPhoneNumber && (
                        <WhatsappButton phoneNumber={listing.sellerPhoneNumber} cardName={listing.cardName}/>
                    )}
                    {listing.sellerDiscord && (
                        <DiscordButton sellerDiscord={listing.sellerDiscord}/>
                    )}
                </div>
            </div>
            <Separator/>
            <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">Compare prices on:</span>
                <div className="grid grid-cols-2 gap-2">
                    <CardMarketButton cardName={listing.cardName}/>
                    <TcgPlayerButton cardName={listing.cardName}/>
                </div>
            </div>
        </div>
    )
}