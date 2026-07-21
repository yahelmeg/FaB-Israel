

export const FOILING_TYPES = ["NF" , "RF" , "CF" , "GF"] as const
export type FoilingTypes = typeof FOILING_TYPES[number];
