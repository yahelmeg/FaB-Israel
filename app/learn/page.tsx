import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { WhatIsFabSection } from "@/components/community/what-is-fab-section";
import { ChooseYourHeroSection } from "@/components/community/choose-your-hero-section";

export const metadata: Metadata = {
    title: "Learn",
    description: "New to Flesh and Blood? Learn the basics, how the game works, and how to choose your hero.",
};

export default function LearnPage() {
    return (
        <div className="page-layout max-w-4xl mx-auto flex flex-col gap-16">
            <WhatIsFabSection />
            <Separator />
            <ChooseYourHeroSection />
        </div>
    )
}