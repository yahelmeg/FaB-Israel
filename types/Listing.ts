
import {PrintingType} from "./PrintingType";
import {ConditionType} from "./ConditionType";

export interface Listing {
    id: string;
    price: number;
    image: string;
    condition: ConditionType;
    foiling: PrintingType;
    set: string;
    cardName: string;
    sellerName: string;
    sellerPhoneNumber: string;
    sellerDiscord: string;
}