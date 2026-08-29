"use client";
import { useActionState, useState } from "react";
import { toast } from "sonner";
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
import { createListingAction, ListingFormState } from "@/app/actions/listings.actions";
import {CardMarketButton} from "@/components/market/listings/buttons/cardmarket-button";
import {TcgPlayerButton} from "@/components/market/listings/buttons/tcgplayer-button";

const initialState: ListingFormState = { fieldErrors: null };

export function SellListingForm() {

    const [formKey, setFormKey] = useState(0);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [selectedPrinting, setSelectedPrinting] = useState<Printing | null>(null);
    const [condition, setCondition] = useState<ConditionTypes>("NM");
    const [language, setLanguage] = useState<LanguageTypes>("EN");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("1");

    const resetForm = () => {
        setSelectedCard(null);
        setSelectedPrinting(null);
        setPrice("");
        setQuantity("1");
        setFormKey((k) => k + 1);
    };

    const [state, formAction, isPending] = useActionState(
        async(prevState: ListingFormState, formData: FormData) => {
            const nextState = await createListingAction(prevState, formData)
            if (nextState.fieldErrors === null) {
                toast.success("Listing created.");
                resetForm();
            } else if (nextState.fieldErrors.db) {
                toast.error(nextState.fieldErrors.db);
            }
            return nextState;
        }
        , initialState
    );

    const handleCardSelect = (card: Card | null) => {
        setSelectedCard(card);
        setSelectedPrinting(null);
    };

    const isListingValid = !!selectedPrinting && price.trim().length > 0 && Number(price) > 0;

    return (
        <form action={formAction} className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="flex flex-col gap-2 w-full lg:max-w-xl" key={formKey}>
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
                    <div className="flex flex-wrap gap-2 pt-1">
                        <CardMarketButton cardName={selectedCard?.name ?? ""} disabled={!selectedPrinting}/>
                        <TcgPlayerButton cardName={selectedCard?.name ?? ""} tcgPlayerUrl={selectedPrinting?.tcgplayer?.url}
                                         disabled={!selectedPrinting}/>
                    </div>
                </div>

                <ListingDetailsForm
                    condition={condition}
                    language={language}
                    price={price}
                    quantity={quantity}
                    onConditionChange={setCondition}
                    onLanguageChange={setLanguage}
                    onPriceChange={setPrice}
                    onQuantityChange={setQuantity}
                />

                {state.fieldErrors && (
                    <p className="text-sm text-destructive">
                        {Object.values(state.fieldErrors)[0]}
                    </p>
                )}
            </div>

            <div className="flex flex-col items-center lg:items-stretch gap-6 lg:gap-24 lg:flex-shrink-0">
                <Image
                    src={selectedPrinting ? getImageSource(selectedPrinting.image) : getImageSource(undefined)}
                    alt={selectedPrinting ? selectedPrinting.print : "temporary"}
                    loading="eager"
                    unoptimized
                    width={300}
                    height={418}
                    className="w-[220px] h-auto sm:w-[260px] lg:w-[300px] rounded-xl shadow-lg lg:sticky lg:top-8"
                />
                <Button
                    type="submit"
                    className="cursor-pointer w-full max-w-[220px] sm:max-w-[260px] lg:max-w-none"
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
            <input type="hidden" name="quantity" value={quantity}/>

        </form>
    );
}