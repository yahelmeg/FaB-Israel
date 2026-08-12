import type { Metadata } from "next";
import Link from "next/link";
import { SubHeading } from "@/components/general/sub-heading";
import { Section } from "@/components/general/section";

export const metadata: Metadata = {
    title: "Privacy Policy | FaB-Israel",
    description: "Privacy Policy for fab-israel.com",
};

export default function PrivacyPolicyPage() {
    return (
        <main className="mx-auto max-w-3xl px-6 py-12 text-foreground">
            <h1 className="mb-2 text-3xl font-bold">Privacy Policy</h1>
            <p className="mb-8 text-sm text-muted-foreground">Last updated: August 12, 2026</p>

            <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
                <p>
                    fab-israel (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates fab-israel.com (the &quot;Service&quot;),
                    a community marketplace and event hub for the Israeli Flesh and Blood TCG community. This Privacy
                    Policy explains what information we collect, how we use it, and the choices you have.
                </p>
                <p>
                    By using the Service, you agree to the collection and use of information as described in this
                    policy.
                </p>

                <Section title="1. Information We Collect">
                    <SubHeading>1.1 Information you provide directly</SubHeading>
                    <ul className="list-disc space-y-1 pl-5">
                        <li>
                            <strong>Account information:</strong> When you sign in with Google, we receive your name,
                            email address, and profile picture from Google.
                        </li>
                        <li>
                            <strong>Profile information:</strong> Display name, contact details (e.g. WhatsApp number,
                            if you choose to add one), and any other information you add to your profile.
                        </li>
                        <li>
                            <strong>Listings and content:</strong> Card listings, prices, descriptions, condition, and
                            images you upload when creating marketplace listings.
                        </li>
                        <li>
                            <strong>Event information:</strong> Event details you create or RSVP to, if the Service
                            includes an events feature.
                        </li>
                    </ul>

                    <SubHeading>1.2 Information collected automatically</SubHeading>
                    <ul className="list-disc space-y-1 pl-5">
                        <li>
                            <strong>Usage data:</strong> Pages visited, actions taken, and general interaction data
                            with the Service.
                        </li>
                        <li>
                            <strong>Device/log data:</strong> IP address, browser type, and similar technical
                            information collected automatically by our hosting providers for security and
                            diagnostics.
                        </li>
                    </ul>

                    <SubHeading>1.3 Information from third parties</SubHeading>
                    <ul className="list-disc space-y-1 pl-5">
                        <li>
                            <strong>Google Sign-In:</strong> We use Google OAuth solely to authenticate you and create
                            your account. We only request basic profile scopes (name, email, profile picture) — we do
                            not request access to your Gmail, contacts, or other Google data.
                        </li>
                    </ul>
                </Section>

                <Section title="2. How We Use Your Information">
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc space-y-1 pl-5">
                        <li>Create and manage your account</li>
                        <li>Enable you to create, browse, and manage marketplace listings</li>
                        <li>Facilitate communication between buyers and sellers (e.g. via WhatsApp, if you provide a number)</li>
                        <li>Display event information and manage registrations</li>
                        <li>Maintain the security and integrity of the Service</li>
                        <li>Improve and develop the Service</li>
                        <li>Communicate with you about your account or the Service, when necessary</li>
                    </ul>
                    <p>
                        We do <strong>not</strong> sell your personal information to third parties, and we do not use
                        your Google account data for advertising purposes.
                    </p>
                </Section>

                <Section title="3. How We Share Your Information">
                    <ul className="list-disc space-y-1 pl-5">
                        <li>
                            <strong>Other users:</strong> Your display name, profile picture, listings, and any
                            contact information you choose to add (e.g. WhatsApp number) are visible to other users of
                            the Service, since this is a marketplace intended to connect buyers and sellers.
                        </li>
                        <li>
                            <strong>Service providers:</strong> We use third-party infrastructure providers to operate
                            the Service, including Supabase (database, authentication, and hosting infrastructure),
                            Cloudflare (image hosting and content delivery via R2), Vercel (application hosting), and
                            Google (authentication via OAuth). These providers process data on our behalf and are
                            bound by their own privacy and security practices.
                        </li>
                        <li>
                            <strong>Legal requirements:</strong> We may disclose information if required by law, or to
                            protect the rights, property, or safety of fab-israel, our users, or others.
                        </li>
                    </ul>
                </Section>

                <Section title="4. Data Retention">
                    <p>
                        We retain your account and profile information for as long as your account is active. If you
                        delete your account, we will delete or anonymize your personal information within a
                        reasonable period, except where retention is required for legal or security purposes.
                    </p>
                </Section>

                <Section title="5. Your Choices and Rights">
                    <ul className="list-disc space-y-1 pl-5">
                        <li>
                            <strong>Access and correction:</strong> You can view and update most of your profile
                            information directly within the Service.
                        </li>
                        <li>
                            <strong>Deletion:</strong> You may request deletion of your account and associated data by
                            contacting us (see below).
                        </li>
                        <li>
                            <strong>Google account access:</strong> You can revoke fab-israel&apos;s access to your
                            Google account at any time via your{" "}

                            <Link href="https://myaccount.google.com/permissions"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-foreground"
                                >
                                Google Account permissions page
                            </Link>
                            .
                        </li>
                    </ul>
                </Section>

                <Section title="6. Data Security">
                    <p>
                        We take reasonable technical and organizational measures to protect your information,
                        including access controls and row-level security policies on our database. However, no method
                        of transmission or storage is 100% secure, and we cannot guarantee absolute security.
                    </p>
                </Section>

                <Section title="7. Children's Privacy">
                    <p>
                        The Service is not directed to children under 13, and we do not knowingly collect personal
                        information from children under 13. If we become aware that we have collected such
                        information, we will delete it.
                    </p>
                </Section>

                <Section title="8. Changes to This Policy">
                    <p>
                        We may update this Privacy Policy from time to time. We will post the updated version on this
                        page and update the &quot;Last updated&quot; date above. Continued use of the Service after
                        changes constitutes acceptance of the updated policy.
                    </p>
                </Section>

                <Section title="9. Contact Us">
                    <p>
                        If you have questions about this Privacy Policy or wish to exercise your rights, contact us
                        at:{" "}
                        <Link href="mailto:fabisraelapp@gmail.com" className="underline hover:text-foreground">
                            fabisraelapp@gmail.com
                        </Link>
                    </p>
                </Section>
            </div>
        </main>
    );
}

