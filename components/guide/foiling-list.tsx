import { FoilingTypes } from "@/types/FoilingTypes"
import { foilingTitles } from "@/lib/foilings"
import { FoilingCard } from "./foiling-card"


const foilings = Object.keys(foilingTitles) as FoilingTypes[];

export function FoilingList() {
    return (
        <div className="grid gap-3"
             style={{gridTemplateColumns: "repeat(4, 200px)", gridTemplateRows: "repeat(2, 240px)"}}>
            {foilings.map((foiling) => (
                <FoilingCard key={foiling} foiling={foiling}/>
            ))}
        </div>
    )
}