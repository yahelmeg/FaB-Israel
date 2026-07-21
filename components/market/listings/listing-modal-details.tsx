import { Listing } from "@/types/Listing"
import { FoilingBadge } from "@/components/general/badges/foiling-badge"
import { ConditionBadge } from "@/components/general/badges/condition-badge"
import { formatPrice } from "@/lib/format"
import { Separator } from "@/components/ui/separator"
import {WhatsappButton} from "@/components/market/listings/buttons/whatsapp-button";
import {DiscordButton} from "@/components/market/listings/buttons/discord-button";
import {CardMarketButton} from "@/components/market/listings/buttons/cardmarket-button";
import {TcgPlayerButton} from "@/components/market/listings/buttons/tcgplayer-button";
import {LanguageFlag} from "@/components/general/badges/language-flag";


interface ListingModalDetailsProps {
    listing: Listing
}

export function ListingModalDetails({ listing }: ListingModalDetailsProps) {
    return (
        <div className="flex flex-col gap-4 p-6 pl-0 flex-1">
            <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold">{listing.cardName}</h2>
                <p className="text-lg text-muted-foreground">{listing.set}</p>
            </div>

            <div className="flex gap-2 items-center">
                <FoilingBadge foiling={listing.foiling}/>
                <ConditionBadge condition={listing.condition}/>
                <LanguageFlag language={listing.language}/>
            </div>
            <Separator />
            <div>
                <div className="text-2xl font-bold">{formatPrice(listing.price)}</div>
                <p className="text-lg text-muted-foreground">Sold by {listing.sellerName}</p>
            </div>

            <div className="flex flex-wrap gap-2">
                {listing.sellerPhoneNumber && (
                    <WhatsappButton phoneNumber={listing.sellerPhoneNumber} cardName={listing.cardName}/>
                )}
                {listing.sellerDiscord && (
                    <DiscordButton sellerDiscord={listing.sellerDiscord}/>
                )}
            </div>
            <Separator/>
            <div className="flex flex-col gap-2">
                <p className="text-lg text-muted-foreground">Compare prices on:</p>
                <div className="flex flex-wrap gap-2">
                    <CardMarketButton cardName={listing.cardName}/>
                    <TcgPlayerButton cardName={listing.cardName} tcgPlayerUrl={listing.tcgplayerUrl}/>
                </div>
            </div>
        </div>
    )
}