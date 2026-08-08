"use client"
import { useActionState, useState, useEffect, useRef } from "react"
import { createEvent, updateEvent, EventFormState } from "@/app/actions/events.actions"
import {toast}  from "sonner";
import { useRouter } from "next/navigation"
import { Event } from "@/types/events/Event"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { EVENT_FORMATS } from "@/types/events/EventFormat"
import { EVENT_TIERS } from "@/types/events/EventTier"
import { STORES } from "@/types/Stores"
import { Button } from "@/components/ui/button"

const initialState: EventFormState = { fieldErrors: null }

interface EventFormProps {
    mode?: "create" | "edit"
    event?: Event
}

export function EventForm({ mode = "create", event }: EventFormProps) {

    const router = useRouter()

    const action =
        mode === "edit" && event
            ? updateEvent.bind(null, event.id)
            : createEvent

    const hasSubmitted = useRef(false)

    const [state, formAction, isPending] = useActionState(action, initialState)
    const [title, setTitle] = useState(event?.title ?? "")
    const [date, setDate] = useState(event?.date ?? "")
    const [time, setTime] = useState(event?.time ?? "")
    const [format, setFormat] = useState<string | null>(event?.format ?? null)
    const [tier, setTier] = useState<string | null>(event?.tier ?? null)
    const [locationType, setLocationType] = useState<"store" | "address">(
        event ? (event.store ? "store" : "address") : "store"
    )
    const [address, setAddress] = useState(event?.address ?? "")
    const [store, setStore] = useState<string | null>(event?.store ?? null)
    const [registerUrl, setRegisterUrl] = useState(event?.registerUrl ?? "")

    useEffect(() => {
        if (!hasSubmitted.current) {
            return
        }

        if (state.fieldErrors === null) {
            toast.success(mode === "edit" ? "Event updated." : "Event created.")
            router.push("/events")
        } else if (state.fieldErrors.db) {
            toast.error(state.fieldErrors.db)
        }
    }, [state, mode, router])

    const handleSubmit = (formData: FormData) => {
        hasSubmitted.current = true
        formAction(formData)
    }

    return (
        <div className="flex flex-row gap-8 w-full items-center justify-center ">
            <form action={handleSubmit} noValidate className="flex flex-col gap-4 w-full max-w-xl">
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
                    {state.fieldErrors?.title && (
                        <p className="text-sm text-destructive">{state.fieldErrors.title}</p>
                    )}
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
                        {state.fieldErrors?.date && (
                            <p className="text-sm text-destructive">{state.fieldErrors.date}</p>
                        )}
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
                        {state.fieldErrors?.time && (
                            <p className="text-sm text-destructive">{state.fieldErrors.time}</p>
                        )}
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
                        {state.fieldErrors?.format && (
                            <p className="text-sm text-destructive">{state.fieldErrors.format}</p>
                        )}
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
                        {state.fieldErrors?.tier && (
                            <p className="text-sm text-destructive">{state.fieldErrors.tier}</p>
                        )}
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
                        {state.fieldErrors?.store && (
                            <p className="text-sm text-destructive">{state.fieldErrors.store}</p>
                        )}
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
                        {state.fieldErrors?.address && (
                            <p className="text-sm text-destructive">{state.fieldErrors.address}</p>
                        )}
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
                    {state.fieldErrors?.register_url && (
                        <p className="text-sm text-destructive">{state.fieldErrors.register_url}</p>
                    )}
                </div>

                {state.fieldErrors?.db && (
                    <p className="text-sm text-destructive">{state.fieldErrors.db}</p>
                )}

                <Button
                    type="submit"
                    disabled={isPending}
                    className="cursor-pointer"
                >
                    {isPending
                        ? mode === "edit" ? "Saving..." : "Creating..."
                        : mode === "edit" ? "Save changes" : "Create event"}
                </Button>
            </form>
        </div>
    )
}