"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Banknote } from "lucide-react";

interface PriceInputProps {
    value: string;
    onChange: (value: string) => void;
}

export function PriceInput({ value, onChange }: PriceInputProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor="price-input" className="sell-page-label">
                <Banknote className="5 w-5 text-muted-foreground" />
                Choose your selling price
            </Label>
            <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-muted-foreground">
                    ₪
                </span>
                <Input
                    id="price-input"
                    type="text"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={value}
                    onChange={(e) => {
                        const raw = e.target.value;
                        if (raw.length <= 6 && /^\d*\.?\d{0,2}$/.test(raw)) {
                            onChange(raw);
                        }
                    }}
                    className="h-11 pl-11 text-3xl font-mono font-semibold tabular-nums"
                />
            </div>
        </div>
    );
}