import {FoilingList} from "@/components/guide/foiling-list";


export default function ConditionsPage() {
    return (
        <div className="flex flex-col items-center gap-6 py-10 px-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Card Foiling</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    General information about the card foiling available in Flesh and Blood.
                </p>
            </div>

            <FoilingList />
        </div>
    )
}