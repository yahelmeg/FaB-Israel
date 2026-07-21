"use client";
import { useActionState, useState } from "react";
import { CardPicker } from "@/components/market/sell/card-picker";
import { PrintingPicker } from "@/components/market/sell/printing-picker";
import { ListingDetailsForm } from "@/components/market/sell/listing-details-form";
import { Button } from "@/components/ui/button";
import { Card } from "@flesh-and-blood/types";
import { Printing } from "@flesh-and-blood/types";
import { ConditionTypes } from "@/types/ConditionTypes";
import { LanguageTypes } from "@/types/LanguageTypes";
import Image from "next/image";
import {getImageSource, toFoilingType} from "@/lib/fab-utils";
import { Search, Layers } from "lucide-react";
import { Label } from "@/components/ui/label";
import { createListing, ListingFormState } from "@/lib/actions/listings";

const initialState: ListingFormState = { error: null };

export function SellListingForm() {
    const [state, formAction, isPending] = useActionState(createListing, initialState)

    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [selectedPrinting, setSelectedPrinting] = useState<Printing | null>(null);
    const [condition, setCondition] = useState<ConditionTypes>("NM");
    const [language, setLanguage] = useState<LanguageTypes>("EN");
    const [price, setPrice] = useState("");

    const handleCardSelect = (card: Card | null) => {
        setSelectedCard(card);
        setSelectedPrinting(null);
    };

    const isListingValid = !!selectedPrinting && price.trim().length > 0 && Number(price) > 0;

    return (
        <form action={formAction} className="flex flex-row gap-8">
            <div className="flex flex-col gap-2 w-full max-w-xl">
                <Label className="sell-page-label">
                    <Search className="h-5 w-5 text-muted-foreground"/>
                    Search for your card
                </Label>
                <CardPicker onSelectCard={handleCardSelect}/>
                <div className="space-y-1">
                    <Label className="sell-page-label">
                        <Layers className="h-5 w-5 text-muted-foreground"/>
                        Choose your card&apos;s printing
                    </Label>
                    <PrintingPicker card={selectedCard} onSelect={setSelectedPrinting}/>
                </div>

                <ListingDetailsForm
                    condition={condition}
                    language={language}
                    price={price}
                    onConditionChange={setCondition}
                    onLanguageChange={setLanguage}
                    onPriceChange={setPrice}
                />

                {state.error && (
                    <p className="text-sm text-destructive">{state.error}</p>
                )}
            </div>

            <div className="flex flex-col gap-18 flex-shrink-0">
                <Image
                    src={selectedPrinting ? getImageSource(selectedPrinting.image) : getImageSource(undefined)}
                    alt={selectedPrinting ? selectedPrinting.print : "temporary"}
                    width={300}
                    height={418}
                    className="rounded-xl shadow-lg sticky top-8"
                />
                <Button
                    type="submit"
                    className="cursor-pointer w-full"
                    disabled={!isListingValid || isPending}
                >
                    {isPending ? "Creating..." : "Create listing"}
                </Button>
            </div>

            <input type="hidden" name="cardName" value={selectedCard?.name ?? ""}/>
            <input type="hidden" name="setCode" value={selectedPrinting ? selectedPrinting.identifier : ""}/>
            <input type="hidden" name="image" value={selectedPrinting?.image ?? ""}/>
            <input type="hidden" name="price" value={price}/>
            <input type="hidden" name="condition" value={condition}/>
            <input type="hidden" name="foiling" value={selectedPrinting ? toFoilingType(selectedPrinting.foiling) : ""}/>
            <input type="hidden" name="language" value={language}/>
            <input type="hidden" name="tcgplayerUrl" value={selectedPrinting?.tcgplayer?.url ?? ""}/>
        </form>
    );
}