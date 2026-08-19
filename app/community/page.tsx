import type { Metadata } from "next";
import { FindUsSection } from "@/components/community/find-us-section";

export const metadata: Metadata = {
    title: "Community",
    description: "Connect with Israeli Flesh and Blood players, find local groups, and stay up to date with the community.",
};

export default function CommunityPage() {
    return (
        <div className="page-layout max-w-4xl mx-auto flex flex-col gap-16">
            <FindUsSection />
        </div>
    )
}