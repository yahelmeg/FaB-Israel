import { FoilingTypes } from "@/types/FoilingTypes"
import { foilingTitles, foilingDescriptions } from "@/lib/foilings"
import { FoilingBadge } from "@/components/general/badges/foiling-badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface FoilingCardProps {
    foiling: FoilingTypes
}

export function FoilingCard({ foiling }: FoilingCardProps) {
    return (
        <Card>
            <CardContent className="p-3 flex flex-col gap-3 flex-grow">
                <div className="flex items-center gap-4">
                    <FoilingBadge foiling={foiling} interactive={false} />
                    <span className="text-md font-bold">{foilingTitles[foiling]}</span>
                </div>
                <Separator/>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {foilingDescriptions[foiling]}
                </p>
            </CardContent>
        </Card>
    )
}