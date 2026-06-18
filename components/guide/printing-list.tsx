import { PrintingTypes } from "@/types/PrintingTypes"
import { printingTitles } from "@/lib/printings"
import { PrintingCard } from "./printing-card"


const printings = Object.keys(printingTitles) as PrintingTypes[];

export function PrintingList() {
    return (
        <div className="grid gap-3"
             style={{gridTemplateColumns: "repeat(4, 200px)", gridTemplateRows: "repeat(2, 240px)"}}>
            {printings.map((printing) => (
                <PrintingCard key={printing} printing={printing}/>
            ))}
        </div>
    )
}