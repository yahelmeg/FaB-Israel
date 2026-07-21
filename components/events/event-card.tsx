import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Event } from "@/types/Event"
import { Calendar, Clock, MapPin } from "lucide-react"
import {storeAddresses} from "@/lib/store";
import {HideEventButton} from "@/components/events/hide-event-button";

interface EventCardProps {
    event: Event
    isAdmin?: boolean
}

export function EventCard({ event, isAdmin }: EventCardProps) {

    const isStore = !!event.store;
    const [year, month, day] = event.date.split("-")
    const formattedDate = `${day}/${month}/${year}`
    const [hours, minutes] = event.time.split(":")
    const formattedTime = `${hours}:${minutes}`

    return (
        <Card className="group relative rounded-2xl border bg-card text-card-foreground shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg p-5 flex flex-col justify-between h-full w-full max-w-md overflow-hidden">
            {isAdmin && <HideEventButton eventId={event.id} />}
            <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="font-medium tracking-wide text-foreground">
                        {event.tier}
                    </Badge>
                    <Badge variant="outline" className="font-medium tracking-wide text-foreground">
                        {event.format}
                    </Badge>
                </div>

                <div className="space-y-1">
                    <h3 className="font-bold text-xl text-foreground">
                        {event.title}
                    </h3>
                </div>

                <div className="grid grid-cols-1 gap-2.5 text-sm font-medium text-muted-foreground bg-muted/30 rounded-xl p-3 my-1">
                    <div className="flex items-center gap-2.5">
                        <div className="p-1 rounded-md bg-background border text-muted-foreground flex-shrink-0">
                            <Calendar size="16" />
                        </div>
                        <span className="text-foreground">{formattedDate}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <div className="p-1 rounded-md bg-background border text-muted-foreground flex-shrink-0">
                            <Clock size="16" />
                        </div>
                        <span className="text-foreground">{formattedTime}</span>
                    </div>

                    <div className={`flex gap-2.5 min-w-0 ${isStore? "items-start" : "items-center"}`}>
                        <div className="p-1 mt-0.5 rounded-md bg-background border text-muted-foreground flex-shrink-0">
                            <MapPin size="16" />
                        </div>

                        <div className={`flex flex-col min-w-0 text-left ${isStore ? "" : "h-9 justify-center"}`}>
                            {isStore ? (
                                <>
                                    <span className="truncate text-foreground font-semibold">
                                        {event.store}
                                    </span>
                                    <span className="truncate text-xs text-muted-foreground">
                                        {event.store ? storeAddresses[event.store] : ''}
                                    </span>
                                </>
                            ) : (
                                <span className="truncate text-foreground font-medium">
                                    {event.address}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}