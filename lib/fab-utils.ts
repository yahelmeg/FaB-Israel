import {cards} from "@flesh-and-blood/cards"
import {CardPrinting} from "@/types/CardPrinting";
import {Card} from "@/types/Card";


export function findCardPrintings(card: Card) : CardPrinting[] {
    if (!card) {
        return []
    }
    return card.printings.map( p => ({
        print: p.print,
        image: p.image ?? p.identifier
    }))
        .sort((a,b) => a.print.localeCompare(b.print))
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

export function getImageSource(printing: CardPrinting): string {
    let setCode = printing.image[0] === "U"
        ? printing.image.slice(0, 5)
        : printing.image.slice(0, 3);

    if (setCode.toUpperCase() === "CON") {
        setCode = "CONV";
    }
    return `/cards/webp/${setCode}/${printing.image}.webp`;
}

const cardLookupMap = new Map<string, Card>();

for (const card of cards) {
    cardLookupMap.set(getDisplayName(card), card);
}

export function getCardFromName(Identifier: string): Card | undefined {
    return cardLookupMap.get(Identifier);
}