import { LANGUAGE_COUNTRY_MAP } from "@/consts/languages"
import type { LanguageTypes } from "@/types/LanguageTypes"

import US from "country-flag-icons/react/3x2/US"
import DE from "country-flag-icons/react/3x2/DE"
import FR from "country-flag-icons/react/3x2/FR"
import IT from "country-flag-icons/react/3x2/IT"
import ES from "country-flag-icons/react/3x2/ES"
import JP from "country-flag-icons/react/3x2/JP"

const FLAG_COMPONENTS = { US, DE, FR, IT, ES, JP }

interface LanguageFlagProps {
    language: LanguageTypes
}

export function LanguageFlag({ language }: LanguageFlagProps) {
    const countryCode = LANGUAGE_COUNTRY_MAP[language]
    const Flag = FLAG_COMPONENTS[countryCode as keyof typeof FLAG_COMPONENTS]

    if (!Flag) {
        return null
    }

    return (
        <div className="w-6 rounded-sm overflow-hidden" >
            <Flag title={language} className="block w-full"/>
        </div>
    )
}