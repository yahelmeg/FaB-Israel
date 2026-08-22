export const EVENT_TIERS = ["On Demand", "Play Anywhere", "Armory", "Pre-Release", "Skirmish", "Nationals", "World Championship Qualifiers"] as const
export type EventTier = typeof EVENT_TIERS[number]