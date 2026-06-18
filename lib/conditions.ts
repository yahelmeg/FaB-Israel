import { ConditionTypes } from "@/types/ConditionTypes"

export const conditionStyles: Record<ConditionTypes, string> = {
    "MT": "bg-sky-400 text-black border-transparent hover:bg-sky-300/80",
    "NM": "bg-green-500 text-black border-transparent hover:bg-green-400/80",
    "EX": "bg-yellow-600 text-black border-transparent hover:bg-yellow-500/90",
    "GD": "bg-yellow-500 text-black border-transparent hover:bg-yellow-400/80",
    "LP": "bg-orange-500 text-black border-transparent hover:bg-orange-400/90",
    "PL": "bg-pink-400 text-black border-transparent hover:bg-pink-300/80",
    "PO": "bg-red-500 text-black border-transparent hover:bg-red-400/90",
}

export const conditionTitles: Record<ConditionTypes, string> = {
    "MT": "Mint",
    "NM": "Near Mint",
    "EX": "Excellent",
    "GD": "Good",
    "LP": "Light Played",
    "PL": "Played",
    "PO": "Poor",
}

export const conditionDescriptions: Record<ConditionTypes, string> = {
    "MT": "Perfect condition, virtually no raw cards qualify. Usually reserved for graded cards.",
    "NM": "Pack fresh card that looks like it never been played without sleeves, generally shows no wear.",
    "EX": "Light wear visible only on close inspection. Minor edge whitening or a tiny corner ding allowed.",
    "GD": "Clear signs of play wear across multiple areas. Edge whitening, some corner softness, possibly minor surface marks.",
    "LP": "Meaningfully played. Noticeable whitening on edges and borders, possible scratches.",
    "PL": "Substantial wear. May include heavy surface scratches, creases, or corner damage.",
    "PO": "Severe damage. Heavily worn, bent with whitened areas.",
}