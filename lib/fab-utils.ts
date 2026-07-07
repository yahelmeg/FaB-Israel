import {cards} from "@flesh-and-blood/cards"
import {Card} from "@flesh-and-blood/types";
import {Printing} from "@flesh-and-blood/types";


export function findCardPrintings(card: Card) : Printing[] {
    if (!card) {
        return []
    }
    return card.printings.sort((a,b) => a.print.localeCompare(b.print))
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

export function getImageSource(image: string | undefined): string {
    if (!image) {
        return "/cards/webp/placeholder.webp";
    }

    let setCode = image[0] === "U"
        ? image.slice(0, 5)
        : image.slice(0, 3);

    if (setCode.toUpperCase() === "CON") {
        setCode = "CONV";
    }

    return `/cards/webp/${setCode}/${image}.webp`;
}

// TODO (Optimization): Moving this global Map population loop into an app startup singleton
const cardLookupMap = new Map<string, Card>();

for (const card of cards) {
    cardLookupMap.set(getDisplayName(card), card);
}

export function getCardFromName(Identifier: string): Card | undefined {
    return cardLookupMap.get(Identifier);
}