import {Listing, ListingBase} from "@/types/Listing"
import {ConditionTypes} from "@/types/ConditionTypes";
import {FoilingTypes} from "@/types/FoilingTypes";
import {LanguageTypes} from "@/types/LanguageTypes";
import {ListingRow, ListingRowBase} from "@/lib/repositories/listings.repository"


export function toListingBase(row: ListingRowBase): ListingBase {
    return {
        id: row.id,
        price: row.price,
        image: row.image,
        condition: row.condition as ConditionTypes,
        foiling: row.foiling as FoilingTypes,
        set: row.set_code,
        cardName: row.card_name,
        language: row.language as LanguageTypes,
        tcgplayerUrl: row.tcgplayer_url ?? undefined,
        quantity: row.quantity,
        status: row.status,
    }
}

export function toListing(row: ListingRow): Listing {
    return {
        ...toListingBase(row),
        sellerName: row.seller_name,
        sellerPhoneNumber: row.seller_phone_number,
        sellerDiscord: row.seller_discord,
    }
}