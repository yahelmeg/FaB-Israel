import {PrintingList} from "@/components/guide/printing-list";


export default function ConditionsPage() {
    return (
        <div className="flex flex-col items-center gap-6 py-10 px-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Card Printings</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    General information about the card printings available in Flesh and Blood.
                </p>
            </div>

            <PrintingList />
        </div>
    )
}