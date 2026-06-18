
import {PrintingTypes} from "./PrintingTypes";
import {ConditionTypes} from "./ConditionTypes";

export interface Listing {
    id: string;
    price: number;
    image: string;
    condition: ConditionTypes;
    foiling: PrintingTypes;
    set: string;
    cardName: string;
    sellerName: string;
    sellerPhoneNumber: string;
    sellerDiscord: string;
}