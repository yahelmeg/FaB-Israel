import { EventCard } from "@/components/events/event-card";
import { Event } from "@/types/Event"


const dummyEvents: Event[] = [
    {
        id: "1",
        title: "Weekly Armory Night",
        date: "2025-08-31",
        time: "18:00",
        store: "Sirolynia",
        format: "Blitz",
        tier: "Armory",
    },
    {
        id: "2",
        title: "Summer Skirmish",
        date: "2026-07-05",
        time: "14:00",
        address: "David Saharov 19, Rishon LeZion",
        format: "Classic Constructed",
        tier: "Skirmish",
    },

]


export function EventGrid() {
    const sortedEvents = dummyEvents.sort((a,b) => {
        const dateCompare = a.date.localeCompare(b.date);
        if(dateCompare !== 0 ) return dateCompare;
        return a.time.localeCompare(b.time);
    })
    return (
        <div className="flex flex-row flex-wrap gap-6 justify-center items-stretch w-full max-w-7xl mx-auto px-4 py-8">
            {sortedEvents.map((dummyEvent) => (
                <EventCard key={dummyEvent.id} event={dummyEvent} />
            ))}
        </div>
    )
}