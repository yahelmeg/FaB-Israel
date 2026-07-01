"use client"
import { useState } from "react"
import {CardPicker} from "@/components/market/sell/card-picker";
import {PrintingPicker} from "@/components/market/sell/printing-picker";
import {Button} from "@/components/ui/button";
import {Card} from "@/types/Card";
import {Printing} from "@flesh-and-blood/types";
import Image from "next/image";
import {getImageSource} from "@/lib/fab-utils";

interface CardSearchStepProps {
    onNext: (printing: Printing) => void
}

export function CardSearchStep( {onNext }: CardSearchStepProps) {

    const [selectedCard, setSelectedCard] = useState<Card | null >(null)
    const [selectedPrinting, setSelectedPrinting] = useState<Printing | null>(null)

    const handleCardNameSelect = (card: Card | null) => {
        setSelectedCard(card)
        setSelectedPrinting(null)
    }

    const handleNextClick = () => {
        if (selectedCard && selectedPrinting) {
            onNext(selectedPrinting)
        }
    }

    return (
        <div className="flex flex-row items-start gap-6 w-full">
            <div className="flex flex-col gap-6 flex-1">
                <CardPicker onSelectCard={handleCardNameSelect}/>

                {selectedCard && (
                    <PrintingPicker card={selectedCard} onSelect={setSelectedPrinting}/>
                )}
            </div>

            {selectedPrinting && (
                <div className="flex-shrink-0">
                    <Image
                        src={getImageSource(selectedPrinting.image)}
                        alt={selectedPrinting.print}
                        width={300}
                        height={418}
                        className="rounded-xl shadow-lg" //
                    />
                    {selectedPrinting && (
                        <div className="flex justify-end pt-4 items-start">
                            <Button className="cursor-pointer" onClick={handleNextClick}>
                                Confirm Selection
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}