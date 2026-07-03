import { useState} from "react"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { findCardPrintings } from "@/lib/fab-utils"
import { Card } from "@/types/Card"
import { Printing } from "@flesh-and-blood/types"

interface PrintingPickerProps {
    card: Card | null
    onSelect: (printing: Printing) => void
}

export function PrintingPicker({ card, onSelect }: PrintingPickerProps) {
    const printings = card ? findCardPrintings(card) : []
    const [prevCard, setPrevCard] = useState(card)
    const [selected, setSelected] = useState<Printing | null>(null)

    if (prevCard !== card) {
        setPrevCard(card)
        setSelected(null)
    }

    const handleValueChange = (value: string | null) => {
        const printing = printings.find(p => p.print === value)
        if (printing) {
            setSelected(printing)
            onSelect(printing)
        }
    }

    return (
        <div className="w-full max-w-lg">
            <Select
                value={selected?.print ?? ""}
                onValueChange={handleValueChange}
                disabled={!card}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a printing..." />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false} sideOffset={4}>
                    {printings.map(printing => (
                        <SelectItem
                            key={printing.print}
                            value={printing.print}
                        >
                            {printing.print}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}