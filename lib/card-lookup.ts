import {cards} from "@flesh-and-blood/cards"
import {Card} from "@flesh-and-blood/types"
import {getDisplayName} from "@/lib/fab-utils";

let cardLookupMap : Map<string, Card> | null = null

function getCardMap(): Map<string, Card> {

    if(!cardLookupMap) {
        cardLookupMap = new Map<string, Card>();
        for(const card of cards) {
            cardLookupMap.set(getDisplayName(card), card)
        }
    }

    return cardLookupMap
}

export function getCardFromName(identifier: string): Card | undefined {
    return getCardMap().get(identifier)
}