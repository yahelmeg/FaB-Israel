import {EventGrid} from "@/components/events/event-list";
import {isAdmin} from "@/lib/auth/is-admin";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Events",
    description: "Find upcoming Flesh and Blood tournaments, meetups, and events in Israel.",
};

export default async function EventsPage() {
    const userIsAdmin = await isAdmin();
    return (
        <div className="page-layout">
            <div className="flex items-center justify-between">
                <h2 className="page-heading-text">
                    Upcoming Events
                </h2>
            </div>
            <EventGrid />
            {userIsAdmin && (
                <Button className="cursor-pointer" nativeButton={false} render={<Link href="/events/new">Add new Event</Link>} />
            )}
        </div>
    )
}