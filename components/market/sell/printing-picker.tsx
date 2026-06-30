import { useState } from "react"
import { Button } from "@/components/ui/button"
import { searchCardPrintings } from "@/lib/fab-utils"
import type { CardPrinting } from "@/types/CardPrinting"
import { cn } from "@/lib/utils"

interface PrintingPickerProps {
    cardName: string
    onSelect: (printing: CardPrinting) => void
}

export function PrintingPicker({ cardName, onSelect }: PrintingPickerProps) {
    const printings = searchCardPrintings(cardName)
    const [selected, setSelected] = useState<CardPrinting | null>(null)

    const handleSelected = (printing: CardPrinting) => {
        setSelected(printing)
        onSelect(printing)
    }

    return (
        <div className="flex flex-col gap-1 w-full max-w-lg">
            {printings.map(printing => (
                <Button
                    key={printing.print}
                    onClick={() => handleSelected(printing)}
                    className={cn(
                        "w-full justify-start text-left px-3 py-2 rounded-md text-sm cursor-pointer transition-colors",
                        selected?.print === printing.print
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    )}
                >
                    {printing.print}
                </Button>
            ))}
        </div>
    )
}