"use client"
import {useActionState, useState} from "react"
import {createEvent, EventFormState} from "@/lib/actions/create-event";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { EVENT_FORMATS } from "@/types/events/EventFormat"
import { EVENT_TIERS } from "@/types/events/EventTier"
import { STORES } from "@/types/Stores"
import {Button} from "@/components/ui/button"

const initialState: EventFormState = { error: null }

export function EventForm() {

    const [state, formAction, isPending] = useActionState(createEvent, initialState)
    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [format, setFormat] = useState<string | null >("")
    const [tier, setTier] = useState<string | null >("")
    const [locationType, setLocationType] = useState<"store" | "address">("store")
    const [address, setAddress] = useState("")
    const [store, setStore] = useState<string | null>("")
    const [registerUrl, setRegisterUrl] = useState("")

    return (
        <div className="flex flex-row gap-8 w-full items-center justify-center ">
            <form action={formAction} className="flex flex-col gap-4 w-full max-w-xl">
                <div className="space-y-1 flex-1">
                    <Label className="text-base font-medium pb-2 ">
                        Event&apos;s title
                    </Label>
                    <Input
                        name="title"
                        placeholder="Weekly silver age armory that yalon will win"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-lg h-12"
                    />
                </div>
                <div className="flex gap-3">
                    <div className="space-y-1 flex-1">
                        <Label className="text-base font-medium pb-2">
                            Event&apos;s date
                        </Label>
                        <Input
                            name="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="text-center text-lg h-12"
                        />
                    </div>
                    <div className="space-y-1 flex-1">
                        <Label className="text-base font-medium pb-2">
                            Event&apos;s time
                        </Label>
                        <Input
                            name="time"
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="text-center text-lg h-12"
                        />
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="space-y-1 flex-1">
                        <Label className="text-base font-medium pb-2">
                            Event&apos;s format
                        </Label>
                        <Select name="format" value={format} onValueChange={setFormat}>
                            <SelectTrigger className="!h-12 text-center text-md w-full">
                                <SelectValue placeholder="Select a format"/>
                            </SelectTrigger>
                            <SelectContent alignItemWithTrigger={false}>
                                {EVENT_FORMATS.map((f) => (
                                    <SelectItem key={f} value={f}>{f}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1 flex-1">
                        <Label className="text-base font-sm pb-2">
                            Event&apos;s tier
                        </Label>
                        <Select name="tier" value={tier} onValueChange={setTier}>
                            <SelectTrigger className="!h-12 text-center text-md w-full">
                                <SelectValue placeholder="Select a tier"/>
                            </SelectTrigger>
                            <SelectContent alignItemWithTrigger={false}>
                                {EVENT_TIERS.map((f) => (
                                    <SelectItem key={f} value={f}>{f}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-1">
                    <Label className="text-base font-medium pb-2">
                        Event&apos;s location
                    </Label>
                    <div className="flex gap-3">
                        <Button
                            type="button"
                            variant={locationType === "store" ? "default" : "outline"}
                            className="cursor-pointer flex-1"
                            onClick={() => setLocationType("store")}
                        >
                            Card Store
                        </Button>
                        <Button
                            type="button"
                            variant={locationType === "address" ? "default" : "outline"}
                            className="cursor-pointer flex-1"
                            onClick={() => setLocationType("address")}
                        >
                            Custom address
                        </Button>
                    </div>
                    <input type="hidden" name="locationType" value={locationType}/>
                </div>

                {locationType === "store" ? (
                    <div className="space-y-1">
                        <Label className="text-base font-medium pb-2">
                            Store
                        </Label>
                        <Select name="store" value={store} onValueChange={setStore}>
                            <SelectTrigger className="!h-12 text-center text-lg w-full">
                                <SelectValue placeholder="Select a store"/>
                            </SelectTrigger>
                            <SelectContent alignItemWithTrigger={false}>
                                {STORES.map((s) => (
                                    <SelectItem key={s} value={s}>{s}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                ) : (
                    <div className="space-y-1">
                        <Label className="text-base font-medium pb-2">
                            Address
                        </Label>
                        <Input
                            name="address"
                            placeholder="Alon's house, caramel popcorn included"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="text-lg h-12"
                        />
                    </div>
                )}

                <div className="space-y-1">
                    <Label className="text-base font-medium pb-2">
                        Registration link <span className="text-muted-foreground font-normal">(optional)</span>
                    </Label>
                    <Input
                        name="register_url"
                        type="url"
                        placeholder="https://gem.fabtcg.com/gem/join/?query=..."
                        value={registerUrl}
                        onChange={(e) => setRegisterUrl(e.target.value)}
                        className="text-lg h-12"
                    />
                </div>

                {state.error && (
                    <p className="text-sm text-destructive">{state.error}</p>
                )}

                <Button
                    type="submit"
                    disabled={isPending}
                    className="cursor-pointer"
                >
                    {isPending ? "Creating..." : "Create event"}
                </Button>

            </form>
        </div>
    )

}