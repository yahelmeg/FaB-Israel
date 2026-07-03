"use client";

import { Label } from "@/components/ui/label";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageTypes } from "@/types/LanguageTypes";
import { LanguageFlag } from "@/components/general/badges/language-flag";
import {LANGUAGE_COUNTRY_MAP, languageLabels} from "@/lib/languages";
import {Button} from "@/components/ui/button";

interface LanguagePickerProps {
    value: LanguageTypes;
    onChange: (value: LanguageTypes) => void;
}

const languages = Object.keys(LANGUAGE_COUNTRY_MAP) as LanguageTypes[];


export function LanguagePicker({ value, onChange }: LanguagePickerProps) {
    return (
        <div className="space-y-2">
            <Label className="sell-page-label">
                <Globe className="h-5 w-5 text-muted-foreground" />
                Choose the card&apos;s language
            </Label>
            <div className="flex flex-wrap gap-2">
                {languages.map((l) => {
                    const selected = l === value;
                    return (
                        <Button
                            key={l}
                            type="button"
                            variant="outline"
                            aria-pressed={selected}
                            aria-label={languageLabels[l]}
                            onClick={() => onChange(l)}
                            className={cn(
                                "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
                                selected
                                && "ring-2 ring-offset-background ring-primary"
                            )}
                        >
                            <LanguageFlag language={l} />
                            {l}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}