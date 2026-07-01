import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { cards } from "@flesh-and-blood/cards";
import { useState, useMemo } from "react"
import { PITCH_COLORS, getDisplayName, getCardFromName } from "@/lib/fab-utils"
import {Card} from "@/types/Card"


interface CardPickerProps {
    onSelectCard: (card: Card | null) => void
}

const maxDisplayAmount = 50

export function CardPicker({ onSelectCard }: CardPickerProps) {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [searchTerm, setSearchTerm] = useState("")

    // TODO: filteredCards is running in O(n) complexit per keystroke (searching for substring through all the cards array).
    // Works fine for now, but consider a prefix index/trie/search library if typing gets laggy
    const filteredCards = useMemo(() => {
        if (!searchTerm) {
            return cards.slice(0, maxDisplayAmount)
        }

        const lower = searchTerm.toLowerCase()
        return cards.filter(card => card.name.toLowerCase().includes(lower))
            .slice(0, maxDisplayAmount)
    }, [searchTerm])


    const handleValueChange = (newValue: string | null) => {
        if (!newValue) {
            setSelectedCard(null)
            onSelectCard(null)
            return
        }
        const card = getCardFromName(newValue) || null;


        setSelectedCard(card);
        onSelectCard(card)
    }

        return (
            <Combobox value={selectedCard ? getDisplayName(selectedCard) : ""} onValueChange={handleValueChange}>
                <ComboboxInput
                    placeholder="Search for your card..."
                    showClear={!!selectedCard}
                    className={`w-full max-w-lg font-medium ${
                        selectedCard?.pitch ? PITCH_COLORS[selectedCard.pitch] : ""
                    }`}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <ComboboxContent>
                    <ComboboxList>
                        {filteredCards.length === 0 ? (
                            <ComboboxEmpty>No cards found.</ComboboxEmpty>
                        ) : (
                            filteredCards.map(card => (
                                <ComboboxItem key={card.cardIdentifier} value={getDisplayName(card)}>
                                    <div className="flex items-center w-full">
                                        <span className={`font-medium ${card.pitch ? PITCH_COLORS[card.pitch] : "text-foreground"}`}>
                                            {getDisplayName(card)}
                                        </span>
                                    </div>
                                </ComboboxItem>
                            ))
                        )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
        )
}