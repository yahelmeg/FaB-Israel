import {ConditionList} from "@/components/guide/condition-list";


export default function ConditionsPage() {
    return (
        <div className="flex flex-col items-center gap-6 py-10 px-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Card Conditions</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    General explanation about Card Condition tags used around the website.
                </p>
            </div>

            <ConditionList />
        </div>
    )
}