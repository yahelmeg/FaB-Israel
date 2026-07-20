"use client";
import { useState } from "react";
import { CardPicker } from "@/components/market/sell/card-picker";
import { PrintingPicker } from "@/components/market/sell/printing-picker";
import { ListingDetailsForm } from "@/components/market/sell/listing-details-form";
import { Button } from "@/components/ui/button";
import { Card } from "@flesh-and-blood/types";
import { Printing } from "@flesh-and-blood/types";
import { ConditionTypes } from "@/types/ConditionTypes";
import { LanguageTypes } from "@/types/LanguageTypes";
import Image from "next/image";
import { getImageSource } from "@/lib/fab-utils";
import { Search, Layers } from "lucide-react";
import { Label } from "@/components/ui/label";


export function SellListingForm() {

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

    const handleCreateListing = () => {
        if (!selectedPrinting || !isListingValid)  {
            return;
        }
        // TODO: replace with a Server Action to create the listing in Supabase
        console.log({ printing: selectedPrinting, condition, language, price });
    };

    return (
        <div className="flex flex-row gap-8">
            <div className="flex flex-col gap-2 w-full max-w-xl">
                <Label className="sell-page-label">
                    <Search className="h-5 w-5 text-muted-foreground"/>
                    Search for your card
                </Label>
                <CardPicker onSelectCard={handleCardSelect} />
                <div className="space-y-1">
                    <Label className="sell-page-label">
                        <Layers className="h-5 w-5 text-muted-foreground" />
                        Choose your card&apos;s printing
                    </Label>
                    <PrintingPicker card={selectedCard} onSelect={setSelectedPrinting} />
                </div>

                <ListingDetailsForm
                    condition={condition}
                    language={language}
                    price={price}
                    onConditionChange={setCondition}
                    onLanguageChange={setLanguage}
                    onPriceChange={setPrice}
                />
            </div>

            <div className="flex flex-col gap-10 flex-shrink-0">
                <Image
                    src={selectedPrinting ? getImageSource(selectedPrinting.image) : getImageSource(undefined)}
                    alt={selectedPrinting ? selectedPrinting.print : "temporary"}
                    width={300}
                    height={418}
                    className="rounded-xl shadow-lg sticky top-8"
                />
                <Button
                    type="button"
                    className="cursor-pointer w-full"
                    disabled={!isListingValid}
                    onClick={handleCreateListing}
                >
                    Create listing
                </Button>
            </div>

        </div>
    );
}