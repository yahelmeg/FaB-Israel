import {cards} from "@flesh-and-blood/cards"
import {CardPrinting} from "@/types/CardPrinting";

export function searchCardPrintings(cardName: string) : CardPrinting[] {
    const card = cards.find( c=>c.name === cardName)
    if (!card) {
        return []
    }
    return card.printings.map( p => ({
        print: p.print,
        image: p.image ?? p.identifier
    }))

}

export const PITCH_COLORS: Record<number, string> = {
    1: "text-red-500",
    2: "text-yellow-500",
    3: "text-blue-500",
}

export const PITCH_LETTER: Record<number, string> = {
    1: "(R)",
    2: "(Y)",
    3: "(B)",
}

export function getDisplayName(card: Card): string {
    return card.pitch ? `${card.name} ${PITCH_LETTER[card.pitch]}` : card.name
}

const cardsByDisplayName: Map<string, Card> = new Map(
    cards.map(card => [getDisplayName(card), card])
)

export function findCardByDisplayName(displayName: string): Card | undefined {
    return cardsByDisplayName.get(displayName)
}