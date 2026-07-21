import {requireAdmin} from "@/lib/auth-helpers/require-admin";
import {EventForm} from "@/components/events/event-form"

export default async function NewEventPage() {

    await requireAdmin()
    return (
        <div className="page-layout">
            <div className="page-heading-text">
                Create a new event
            </div>
            <EventForm />
        </div>
    )
}