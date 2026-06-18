import { ConditionType } from "@/types/ConditionType"

export const conditionStyles: Record<ConditionType, string> = {
    "MT": "bg-sky-400 text-black border-transparent hover:bg-sky-300/80",
    "NM": "bg-green-500 text-black border-transparent hover:bg-green-400/80",
    "EX": "bg-yellow-600 text-black border-transparent hover:bg-yellow-500/90",
    "GD": "bg-yellow-500 text-black border-transparent hover:bg-yellow-400/80",
    "LP": "bg-orange-500 text-black border-transparent hover:bg-orange-400/90",
    "PL": "bg-pink-400 text-black border-transparent hover:bg-pink-300/80",
    "PO": "bg-red-500 text-black border-transparent hover:bg-red-400/90",
}

export const conditionTitles: Record<ConditionType, string> = {
    "MT": "Mint",
    "NM": "Near Mint",
    "EX": "Excellent",
    "GD": "Good",
    "LP": "Light Played",
    "PL": "Played",
    "PO": "Poor",
}

export const conditionDescriptions: Record<ConditionType, string> = {
    "MT": "Mint",
    "NM": "Near Mint",
    "EX": "Excellent",
    "GD": "Good",
    "LP": "Light Played",
    "PL": "Played",
    "PO": "Poor",
}