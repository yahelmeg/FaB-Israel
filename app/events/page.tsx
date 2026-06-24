import {EventGrid} from "@/components/events/event-list";



export default function EventsPage() {
    return (
        <div className="page-layout">
            <h2 className="page-heading-text">
                Upcoming Events
            </h2>
            <EventGrid/>
        </div>
    )
}