"use client"
import type { Release} from "@flesh-and-blood/types";
import { useState } from "react"
import {CardPrinting} from "@/types/CardPrinting";
import {CardPicker} from "@/components/market/sell/card-picker";
import {PrintingPicker} from "@/components/market/sell/printing-picker";
import {Button} from "@/components/ui/button";

interface SelectedCard {
    cardName: string
    set: Release
    image: string
    print: string
}


interface CardSearchStepProps {
    onNext: (card: SelectedCard) => void
}


export function CardSearchStep( {onNext }: CardSearchStepProps) {

    const [selectedName, setSelectedName] = useState<string | null >(null)
    const [selectedPrinting, setSelectedPrinting] = useState<CardPrinting | null>(null)

    const handleCardNameSelect = (name: string | null) => {
        setSelectedName(name)
        setSelectedPrinting(null)
    }

    const handleNextClick = () => {
        if (selectedName && selectedPrinting) {
            const card: SelectedCard = {
                cardName: selectedName,
                set: selectedPrinting.print as Release,
                image: selectedPrinting.image,
                print: selectedPrinting.print
            }

            onNext(card)
        }
    }

    return (
        <div className="flex flex-col items-start gap-6 w-full">
            <CardPicker onSelectName={handleCardNameSelect}/>
            {selectedName && (
                <PrintingPicker cardName={selectedName} onSelect={setSelectedPrinting}/>
            )}
            <div className="flex justify-end pt-4">
                {selectedPrinting && (
                    <Button className="cursor-pointer" onClick={handleNextClick}>
                        Confirm Selection
                    </Button>
                )}
            </div>
        </div>
    )
}