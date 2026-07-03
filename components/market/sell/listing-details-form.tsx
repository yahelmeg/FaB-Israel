"use client";

import { LanguageTypes } from "@/types/LanguageTypes";
import { ConditionTypes } from "@/types/ConditionTypes";
import { PriceInput } from "@/components/market/sell/price-input";
import { ConditionPicker } from "@/components/market/sell/condition-picker";
import { LanguagePicker } from "@/components/market/sell/language-picker";

interface ListingDetailsFormProps {
    condition: ConditionTypes;
    language: LanguageTypes;
    price: string;
    onConditionChange: (value: ConditionTypes) => void;
    onLanguageChange: (value: LanguageTypes) => void;
    onPriceChange: (value: string) => void;
}

export function ListingDetailsForm({ condition, language, price, onConditionChange, onLanguageChange, onPriceChange }: ListingDetailsFormProps) {
    return (
        <div className="space-y-6 pt-6">
            <ConditionPicker value={condition} onChange={onConditionChange} />
            <LanguagePicker value={language} onChange={onLanguageChange} />
            <PriceInput value={price} onChange={onPriceChange} />
        </div>
    );
}