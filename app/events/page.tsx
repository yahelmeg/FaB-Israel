import {EventGrid} from "@/components/events/event-list";
import {isAdmin} from "@/lib/auth-helpers/is-admin";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default async function EventsPage() {
    const userIsAdmin = await isAdmin();
    return (
        <div className="page-layout">
            <div className="flex items-center justify-between mb-8">
                <h2 className="page-heading-text">
                    Upcoming Events
                </h2>
            </div>
            <EventGrid />
            {userIsAdmin && (
                <Button className="cursor-pointer" nativeButton={false} render={<Link href="/events/new">Create Event</Link>} />
            )}
        </div>
    )
}