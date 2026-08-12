import {requireAdmin} from "@/lib/auth/require-admin";
import {EventForm} from "@/components/events/event-form"
import {Metadata} from "next";
import {noIndex} from "@/lib/metadata";

export const metadata: Metadata = {
    title: "Create Event",
    description: "Create a new event on FaB-Israel.",
    robots: noIndex
};

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