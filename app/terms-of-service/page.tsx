import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/general/section";

export const metadata: Metadata = {
    title: "Terms of Service | FaB-Israel",
    description: "Terms of Service for fab-israel.com",
};

export default function TermsOfServicePage() {
    return (
        <main className="mx-auto max-w-3xl px-6 py-12 text-foreground">
            <h1 className="mb-2 text-3xl font-bold">Terms of Service</h1>
            <p className="mb-8 text-sm text-muted-foreground">Last updated: August 12, 2026</p>

            <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
                <p>
                    Welcome to fab-israel (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;), a community marketplace
                    and event hub for the Israeli Flesh and Blood TCG community, available at fab-israel.com (the
                    &quot;Service&quot;). By accessing or using the Service, you agree to be bound by these Terms of
                    Service (&quot;Terms&quot;). If you do not agree, please do not use the Service.
                </p>

                <Section title="1. Eligibility">
                    <p>You must be at least 13 years old to use the Service. By using the Service, you represent that you meet this requirement.</p>
                </Section>

                <Section title="2. Your Account">
                    <ul className="list-disc space-y-1 pl-5">
                        <li>You may sign in using Google OAuth. You are responsible for maintaining the security of your Google account and for all activity that occurs under your fab-israel account.</li>
                        <li>You agree to provide accurate information and to keep your profile information up to date.</li>
                        <li>We reserve the right to suspend or terminate accounts that violate these Terms.</li>
                    </ul>
                </Section>

                <Section title="3. The Marketplace">
                    <ul className="list-disc space-y-1 pl-5">
                        <li>fab-israel is a platform that allows users to list, browse, and arrange trades or sales of Flesh and Blood TCG cards and related items with other users.</li>
                        <li><strong>We are not a party to any transaction.</strong> fab-israel does not buy, sell, hold, ship, or take possession of any cards. All transactions, payments, and exchanges occur directly between users, at their own risk.</li>
                        <li>We do not verify the accuracy of listings, the condition of items, or the identity of users beyond basic account authentication. Users are responsible for exercising their own judgment when trading or transacting with others.</li>
                        <li>We are not responsible for disputes, fraud, non-delivery, misrepresentation, or any other issues arising between users. Any disputes must be resolved directly between the parties involved.</li>
                    </ul>
                </Section>

                <Section title="4. User Content">
                    <ul className="list-disc space-y-1 pl-5">
                        <li>You retain ownership of the content you post (listings, images, descriptions, profile information, etc.), referred to as &quot;User Content.&quot;</li>
                        <li>By posting User Content, you grant fab-israel a non-exclusive, royalty-free license to host, display, and distribute that content as necessary to operate the Service.</li>
                        <li>You are solely responsible for your User Content and confirm that you have the right to post it, and that it does not infringe on the rights of others.</li>
                        <li>We reserve the right to remove any User Content that violates these Terms or that we deem inappropriate, at our discretion.</li>
                    </ul>
                </Section>

                <Section title="5. Prohibited Conduct">
                    <p>You agree not to:</p>
                    <ul className="list-disc space-y-1 pl-5">
                        <li>Post false, misleading, or fraudulent listings</li>
                        <li>Impersonate another person or misrepresent your affiliation</li>
                        <li>Use the Service for any unlawful purpose</li>
                        <li>Upload content that is abusive, harassing, hateful, or infringes on intellectual property rights</li>
                        <li>Attempt to interfere with, disrupt, or gain unauthorized access to the Service or its infrastructure</li>
                        <li>Scrape or harvest data from the Service without permission</li>
                    </ul>
                </Section>

                <Section title="6. Events">
                    <p>
                        If the Service allows creation of or registration for community events, event organizers
                        (whether fab-israel or third-party users) are responsible for the accuracy of event details.
                        fab-israel is not responsible for the conduct of event organizers or attendees, or for any
                        issues arising at or from events.
                    </p>
                </Section>

                <Section title="7. Intellectual Property">
                    <ul className="list-disc space-y-1 pl-5">
                        <li>&quot;Flesh and Blood&quot; and related card game intellectual property belong to their respective owners (Legend Story Studios). fab-israel is an independent, unofficial community platform and is not affiliated with or endorsed by Legend Story Studios.</li>
                        <li>Card images and data displayed on the Service are used for identification and community purposes.</li>
                        <li>The fab-israel name, logo, and site design are owned by us and may not be used without permission.</li>
                    </ul>
                </Section>

                <Section title="8. Disclaimers">
                    <p>
                        THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE,&quot; WITHOUT WARRANTIES OF
                        ANY KIND, WHETHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE
                        UNINTERRUPTED, ERROR-FREE, OR SECURE.
                    </p>
                </Section>

                <Section title="9. Limitation of Liability">
                    <p>
                        TO THE MAXIMUM EXTENT PERMITTED BY LAW, FAB-ISRAEL SHALL NOT BE LIABLE FOR ANY INDIRECT,
                        INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF DATA, GOODS, TRADES,
                        OR TRANSACTIONS ARISING FROM YOUR USE OF THE SERVICE, INCLUDING TRANSACTIONS WITH OTHER
                        USERS.
                    </p>
                </Section>

                <Section title="10. Termination">
                    <p>
                        We may suspend or terminate your access to the Service at any time, with or without notice,
                        for conduct that we believe violates these Terms or is harmful to other users or the Service.
                    </p>
                </Section>

                <Section title="11. Changes to These Terms">
                    <p>
                        We may update these Terms from time to time. We will post the updated version on this page
                        and update the &quot;Last updated&quot; date above. Continued use of the Service after
                        changes constitutes acceptance of the updated Terms.
                    </p>
                </Section>

                <Section title="12. Governing Law">
                    <p>These Terms are governed by the laws of the State of Israel, without regard to conflict of law principles.</p>
                </Section>

                <Section title="13. Contact Us">
                    <p>
                        If you have questions about these Terms, contact us at:{" "}
                        <Link href="mailto:fabisraelapp@gmail.com" className="underline hover:text-foreground">
                            fabisraelapp@gmail.com
                        </Link>
                    </p>
                </Section>
            </div>
        </main>
    );
}

