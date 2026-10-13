import { notFound } from "next/navigation"
import { isAdmin } from "@/lib/auth/is-admin"
import * as eventsService from "@/lib/services/events.service"
import * as eventAttendeesService from "@/lib/services/event-attendees.service"

interface AttendeesPageProps {
    params: Promise<{ id: string }>
}

export default async function AttendeesPage({ params }: AttendeesPageProps) {
    const { id } = await params

    if (!(await isAdmin())) {
        notFound()
    }

    const event = await eventsService.getEventById(id)
    if (!event) {
        notFound()
    }

    const attendees = await eventAttendeesService.getAttendees(id)

    return (
        <div className="page-layout space-y-6">
            <h1 className="page-heading-text">
                {event.title}
            </h1>

            <p className="text-muted-foreground text-lg font-medium">
                {attendees.length} {attendees.length === 1 ? 'Participant' : 'Participants'}
            </p>

            {attendees.length === 0 ? (
                <p className="text-muted-foreground">Nobody has joined yet.</p>
            ) : (
                <div className="border rounded-md overflow-hidden bg-card">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-muted/50 border-b text-muted-foreground text-sm">
                        <tr>
                            <th className="py-3 px-4 font-medium">Display Name</th>
                            <th className="py-3 px-4 font-medium">Gem ID</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y">
                        {attendees.map((a) => (
                            <tr key={a.userId} className="hover:bg-muted/50 transition-colors">
                                <td className="py-3 px-4 font-medium">{a.displayName}</td>
                                <td className="py-3 px-4 font-mono">
                                    {a.gemId || "—"}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}