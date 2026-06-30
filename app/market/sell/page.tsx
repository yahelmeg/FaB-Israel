"use client"
import { useState } from "react"
import Image from "next/image"
import type { Release } from "@flesh-and-blood/types"
import { CardSearchStep } from "@/components/market/sell/card-search-step"
import {StepIndicator} from "@/components/market/sell/step-indicator";
import {Separator} from "@/components/ui/separator"

interface SelectedCard {
    cardName: string
    set: Release
    image: string
    print: string
}

export default function MarketSellPage() {
    const [chosenCard, setChosenCard] = useState<SelectedCard | null>(null)

    const handleCardConfirmed = (card: SelectedCard) => {
        setChosenCard(card)
    }

    return (
        <div className="p-8 max-w-5xl mx-auto flex flex-col gap-8">
            <div className="flex flex-row justify-between">
                <h1 className="text-3xl font-bold tracking-tight">List a card for sale</h1>
                <StepIndicator currentStep={1} totalSteps={2}/>
            </div>
            {!chosenCard && (
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold pb-2">Choose the printing that matches the card you want to sell</h2>
                    <Separator/>
                    <CardSearchStep onNext={handleCardConfirmed} />
                </div>
            )}
        </div>
    )
}