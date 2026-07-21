import { ConditionTypes } from "@/types/ConditionTypes"
import { conditionTitles } from "@/consts/conditions"
import { ConditionCard } from "./condition-card"


const conditions = Object.keys(conditionTitles) as ConditionTypes[];

export function ConditionList() {
    return (
        <div className="grid gap-3"
             style={{gridTemplateColumns: "repeat(4, 200px)", gridTemplateRows: "repeat(2, 240px)"}}>
            {conditions.map((condition) => (
                <ConditionCard key={condition} condition={condition}/>
            ))}
        </div>
    )
}