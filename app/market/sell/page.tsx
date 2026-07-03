"use client";
import {SellListingForm} from "@/components/market/sell/sell-listing-form";
import {Printing} from "@flesh-and-blood/types"
import {ConditionTypes} from "@/types/ConditionTypes";
import {LanguageTypes} from "@/types/LanguageTypes";
import { Separator } from "@/components/ui/separator";


export default function MarketSellPage() {

    const handleListingSubmit = (data: {
        printing: Printing;
        condition: ConditionTypes;
        language: LanguageTypes;
        price: string;
    }) => {
        console.log(data);
    };

    return (
        <div className="page-layout">
            <h2 className="page-heading-text mb-8">
                List a card for sale
            </h2>
            <SellListingForm onSubmit={handleListingSubmit}/>
        </div>

    );
}