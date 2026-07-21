import { ConditionTypes } from "@/types/ConditionTypes"
import { conditionTitles, conditionDescriptions } from "@/consts/conditions"
import { ConditionBadge } from "@/components/general/badges/condition-badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface ConditionCardProps {
    condition: ConditionTypes
}

export function ConditionCard({ condition }: ConditionCardProps) {
    return (
        <Card>
            <CardContent className="p-3 flex flex-col gap-3 flex-grow">
                <div className="flex items-center gap-4">
                    <ConditionBadge condition={condition} interactive={false} />
                    <span className="text-md font-bold">{conditionTitles[condition]}</span>
                </div>
                <Separator/>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {conditionDescriptions[condition]}
                </p>
            </CardContent>
        </Card>
    )
}