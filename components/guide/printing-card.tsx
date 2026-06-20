import { PrintingTypes } from "@/types/PrintingTypes"
import { printingTitles, printingDescriptions } from "@/lib/printings"
import { PrintingBadge } from "@/components/general/badges/printing-badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface PrintingCardProps {
    printing: PrintingTypes
}

export function PrintingCard({ printing }: PrintingCardProps) {
    return (
        <Card>
            <CardContent className="p-3 flex flex-col gap-3 flex-grow">
                <div className="flex items-center gap-4">
                    <PrintingBadge printing={printing} interactive={false} />
                    <span className="text-md font-bold">{printingTitles[printing]}</span>
                </div>
                <Separator/>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {printingDescriptions[printing]}
                </p>
            </CardContent>
        </Card>
    )
}