
import {PrintingTypes} from "./PrintingTypes";
import {ConditionTypes} from "./ConditionTypes";
import {LanguageTypes} from "@/types/LanguageTypes";

export interface Listing {
    id: string;
    price: number;
    image: string;
    condition: ConditionTypes;
    foiling: PrintingTypes;
    set: string;
    cardName: string;
    language: LanguageTypes;
    sellerName: string;
    sellerPhoneNumber: string;
    sellerDiscord: string;
}