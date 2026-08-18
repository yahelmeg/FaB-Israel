import { VideoEmbed } from "@/components/general/video-embed"
import { HERO_CHOICE_EMBED } from "@/consts/community-links"

export function ChooseYourHeroSection() {
    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Choose your hero</h2>
            <div className="flex flex-col gap-4">
                <p className="text-muted-foreground leading-relaxed">
                    Flesh and Blood revolves around its playable heroes. Each hero belongs to a class such as
                    Warriors,
                    Ninjas, Wizards, Illusionists, Necromancers and many more.
                    Your hero choice will define your entire playstyle and deckbuilding options.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                    Your deck is built around your hero, filled with cards and equipment that synergize with their unique abilities and strengths.
                    No two heroes play alike, and every player can find a hero that fits their unique playstyle.
                </p>
            </div>

            <VideoEmbed src={HERO_CHOICE_EMBED} title="Which hero should you choose in Flesh and Blood" />
        </section>
    )
}