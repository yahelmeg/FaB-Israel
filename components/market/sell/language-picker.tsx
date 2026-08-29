"use client";

import { Label } from "@/components/ui/label";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageTypes } from "@/types/LanguageTypes";
import { LanguageFlag } from "@/components/general/badges/language-flag";
import {LANGUAGE_COUNTRY_MAP, languageLabels} from "@/consts/languages";
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
            <div className="flex flex-nowrap sm:flex-wrap gap-1 sm:gap-2 overflow-x-auto sm:overflow-visible pt-1.5 pb-1 sm:pt-0 sm:pb-0 -mx-1 px-1 sm:mx-0 sm:px-0">
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
                                "flex items-center gap-1 sm:gap-1.5 rounded-lg border px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium transition-colors shrink-0",
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