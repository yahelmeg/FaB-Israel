export const EVENT_TIERS = ["On Demand", "Play Anywhere", "Armory", "Skirmish", "Pro Quest", "Nationals", "World Championship Qualifiers"] as const
export type EventTier = typeof EVENT_TIERS[number]