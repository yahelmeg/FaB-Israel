

import type { LanguageTypes } from "@/types/LanguageTypes"
import GB from "country-flag-icons/react/3x2/GB";
import DE from "country-flag-icons/react/3x2/DE";
import FR from "country-flag-icons/react/3x2/FR";
import IT from "country-flag-icons/react/3x2/IT";
import ES from "country-flag-icons/react/3x2/ES";
import JP from "country-flag-icons/react/3x2/JP";

export const LANGUAGE_COUNTRY_MAP: Record<LanguageTypes, string> = {
    EN: "GB",
    DE: "DE",
    FR: "FR",
    IT: "IT",
    ES: "ES",
    JA: "JP",
}

export const languageLabels: Record<LanguageTypes, string> = {
    EN: "English",
    DE: "German",
    FR: "French",
    IT: "Italian",
    ES: "Spanish",
    JA: "Japanese",
};

