
import {FoilingType} from "./FoilingType";
import {ConditionType} from "./ConditionType";

export interface Listing {
    id: string;
    price: number;
    image: string;
    condition: ConditionType;
    foiling: FoilingType;
    set: string;
    cardName: string;
    sellerName: string;
    sellerPhoneNumber: string;
    sellerDiscord: string;
}