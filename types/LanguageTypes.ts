
export const LANGUAGE_TYPES = ["EN" , "DE" , "FR" , "IT" , "ES" , "JA" ] as const
export type LanguageTypes = typeof LANGUAGE_TYPES[number]