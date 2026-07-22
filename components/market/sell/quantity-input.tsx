"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Layers } from "lucide-react";

interface QuantityInputProps {
    quantity: string;
    onQuantityChange: (value: string) => void;
}

export function QuantityInput({ quantity, onQuantityChange }: QuantityInputProps) {
    const numericQuantity = Number(quantity) || 1;

    const decrement = () => onQuantityChange(String(Math.max(1, numericQuantity - 1)));
    const increment = () => onQuantityChange(String(Math.min(99, numericQuantity + 1)));

    return (
        <div className="space-y-2">
            <Label htmlFor="quantity-input" className="sell-page-label">
                <Layers className="size-5 text-muted-foreground" />
                How many copies?
            </Label>
            <div className="flex items-center gap-2">
                <Button type="button" variant="outline" size="icon" onClick={decrement} disabled={numericQuantity <= 1}>
                    <Minus className="size-4" />
                </Button>
                <Input
                    id="quantity-input"
                    type="text"
                    inputMode="numeric"
                    value={quantity}
                    onChange={(e) => {
                        const raw = e.target.value;
                        if (/^\d{0,2}$/.test(raw)) {
                            onQuantityChange(raw === "" ? "1" : String(Math.min(99, Number(raw))));
                        }
                    }}
                    className="h-12 w-16 text-center text-xl font-semibold tabular-nums"
                />
                <Button type="button" variant="outline" size="icon" onClick={increment} disabled={numericQuantity >= 99}>
                    <Plus className="size-4" />
                </Button>

            </div>
        </div>
    );
}