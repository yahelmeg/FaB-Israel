"use client";

import { LanguageTypes } from "@/types/LanguageTypes";
import { ConditionTypes } from "@/types/ConditionTypes";
import { PriceInput } from "@/components/market/sell/price-input";
import { ConditionPicker } from "@/components/market/sell/condition-picker";
import { LanguagePicker } from "@/components/market/sell/language-picker";
import {QuantityInput} from "@/components/market/sell/quantity-input";

interface ListingDetailsFormProps {
    condition: ConditionTypes;
    language: LanguageTypes;
    price: string;
    quantity: string;
    onConditionChange: (value: ConditionTypes) => void;
    onLanguageChange: (value: LanguageTypes) => void;
    onPriceChange: (value: string) => void;
    onQuantityChange: (value: string) => void;
}

export function ListingDetailsForm({ condition, language, price,quantity, onConditionChange, onLanguageChange, onPriceChange, onQuantityChange }: ListingDetailsFormProps) {
    return (
        <div className="space-y-6 pt-6">
            <ConditionPicker value={condition} onChange={onConditionChange} />
            <LanguagePicker value={language} onChange={onLanguageChange} />
            <div className="flex flex-row gap-6">
                <div className="flex-1">
                    <PriceInput value={price} onChange={onPriceChange}/>
                </div>
                <QuantityInput quantity={quantity} onQuantityChange={onQuantityChange}/>
            </div>
        </div>
    );
}