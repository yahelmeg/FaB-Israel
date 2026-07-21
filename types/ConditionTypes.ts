

export const CONDITION_TYPES = ["MT" , "NM" , "EX" , "GD" , "LP" , "PL" , "PO"] as const ;
export type ConditionTypes = typeof CONDITION_TYPES[number];

