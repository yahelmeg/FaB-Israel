import {EventGrid} from "@/components/events/event-list";


export default function EventsPage() {
    return (
        <div className="flex flex-col gap-4 items-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Upcoming Events
            </h2>
            <EventGrid/>
        </div>
    )
}