export const EVENT_FORMATS = [
    "Classic Constructed", "Silver Age", "Draft", "Sealed", "Crack Shuffle Play",
    "Living Legend", "Blitz", "Ultimate Pit Fight", "Learn to Play",
    "Team Classic Constructed", "Team Silver Age", "Team Sealed"
] as const
export type EventFormat = typeof EVENT_FORMATS[number]