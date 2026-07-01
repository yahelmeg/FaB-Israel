import { useState } from "react"
import { Button } from "@/components/ui/button"
import { findCardPrintings } from "@/lib/fab-utils"
import type { CardPrinting } from "@/types/CardPrinting"
import { cn } from "@/lib/utils"
import {Card} from "@/types/Card"

interface PrintingPickerProps {
    card: Card
    onSelect: (printing: CardPrinting) => void
}

export function PrintingPicker({ card, onSelect }: PrintingPickerProps) {
    const printings = findCardPrintings(card)
    const [selected, setSelected] = useState<CardPrinting | null>(null)

    const handleSelected = (printing: CardPrinting) => {
        setSelected(printing)
        onSelect(printing)
    }

    return (
        <div className="flex flex-col gap-2 w-full max-w-lg">
            {printings.map(printing => {
                const isSelected = selected?.print === printing.print

                return (
                    <Button
                        key={printing.print}
                        variant={isSelected ? "default" : "outline"}
                        onClick={() => handleSelected(printing)}
                        className={cn(
                            "w-full justify-start text-left px-4 py-2 h-auto transition-colors",
                            !isSelected && "text-foreground hover:bg-muted/60 border-border/50"
                        )}
                    >
                        {printing.print}
                    </Button>
                )
            })}
        </div>
    )
}