"use client";

import { Label } from "@/components/ui/label";
import { Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConditionTypes, CONDITION_TYPES } from "@/types/ConditionTypes";
import {Button} from "@/components/ui/button";

interface ConditionPickerProps {
    value: ConditionTypes;
    onChange: (value: ConditionTypes) => void;
}


const conditionMeta: Record<ConditionTypes, { name: string; dot: string; ring: string; text: string; bg: string }> = {
    MT: { name: "Mint",         dot: "bg-sky-400",    ring: "border-sky-400",    text: "text-sky-600 dark:text-sky-400",       bg: "bg-sky-400/10" },
    NM: { name: "Near Mint",    dot: "bg-green-500",  ring: "border-green-500",  text: "text-green-600 dark:text-green-400",   bg: "bg-green-500/10" },
    EX: { name: "Excellent",    dot: "bg-yellow-600", ring: "border-yellow-600", text: "text-yellow-700 dark:text-yellow-500", bg: "bg-yellow-600/10" },
    GD: { name: "Good",         dot: "bg-yellow-500", ring: "border-yellow-500", text: "text-yellow-700 dark:text-yellow-400", bg: "bg-yellow-500/10" },
    LP: { name: "Light Played", dot: "bg-orange-500", ring: "border-orange-500", text: "text-orange-600 dark:text-orange-400", bg: "bg-orange-500/10" },
    PL: { name: "Played",       dot: "bg-pink-400",   ring: "border-pink-400",   text: "text-pink-600 dark:text-pink-400",     bg: "bg-pink-400/10" },
    PO: { name: "Poor",         dot: "bg-red-500",    ring: "border-red-500",    text: "text-red-600 dark:text-red-400",       bg: "bg-red-500/10" },
};

export function ConditionPicker({ value, onChange }: ConditionPickerProps) {
    return (
        <div className="space-y-2">
            <Label className="sell-page-label">
                <Tag className="h-5 w-5 text-muted-foreground" />
                Choose the card&apos;s condition
            </Label>
            <div className="flex flex-wrap gap-2">
                {CONDITION_TYPES.map((c) => {
                    const meta = conditionMeta[c];
                    const selected = c === value;
                    return (
                        <Button
                            key={c}
                            type="button"
                            variant="outline"
                            aria-pressed={selected}
                            aria-label={meta.name}
                            onClick={() => onChange(c)}
                            className={cn(
                                "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-base font-medium transition-colors",
                                selected
                                    && cn("ring-2 ring-offset-background", meta.ring, meta.bg, meta.text)
                            )}
                        >
                            <span className={cn("h-2 w-2 rounded-full", meta.dot)} />
                            {c}
                        </Button>
                    );
                })}
            </div>
            <p className="text-sm text-muted-foreground">{conditionMeta[value].name}</p>
        </div>
    );
}