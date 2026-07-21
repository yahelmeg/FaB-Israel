import {Card} from "@flesh-and-blood/types";
import {Printing} from "@flesh-and-blood/types";
import {PITCH_LETTER} from "@/consts/pitch"
import { Foiling } from "@flesh-and-blood/types"
import { FoilingTypes } from "@/types/FoilingTypes"

export function findCardPrintings(card: Card) : Printing[] {
    if (!card) {
        return []
    }
    return card.printings.sort((a,b) => a.print.localeCompare(b.print))
}

export function getDisplayName(card: Card): string {
    return card.pitch ? `${card.name} ${PITCH_LETTER[card.pitch]}` : card.name
}

export function getImageSource(image: string | undefined): string {
    const r2PublicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "";

    if (!image) {
        return `${r2PublicUrl}/placeholder.webp`;
    }

    let setCode = image[0] === "U"
        ? image.slice(0, 5)
        : image.slice(0, 3);

    if (setCode.toUpperCase() === "CON") {
        setCode = "CONV";
    }

    return `${r2PublicUrl}/${setCode}/${image}.webp`;
}

export function toFoilingType(foiling: Foiling | undefined): FoilingTypes {
    switch (foiling) {
        case Foiling.Rainbow: return "RF"
        case Foiling.Cold: return "CF"
        case Foiling.Gold: return "GF"
        default: return "NF"
    }
}