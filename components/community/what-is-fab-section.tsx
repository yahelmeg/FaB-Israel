import { VideoEmbed } from "@/components/general/video-embed"
import { HOW_TO_PLAY_EMBED } from "@/consts/community-links"

export function WhatIsFabSection() {
    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">What is Flesh and Blood?</h2>
            <div className="flex flex-col gap-4">
                <p className="text-muted-foreground leading-relaxed">
                    Flesh and Blood (FaB) is a competitive trading card game developed by Legend Story Studios.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                    In Flesh and Blood you take the role of a single hero and get into a battle to the death against
                    your opponent’s hero,
                    where each decision can make the difference between victory and defeat.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                    Unlike traditional card games, In Flesh and Blood there’s no such thing as a dead card. Every
                    card in your hand is a
                    potential attack, defence, fuel for your next big play, or a card worth holding for the perfect
                    moment.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                    At the end of each turn you draw up to your hero’s intellect ( usually 4 ).
                    This constant cycle ensures that every single turn has meaningful decisions which will affect the outcome of the game.
                </p>
            </div>
            <p className="text-muted-foreground leading-relaxed">
                In a nutshell, Flesh and Blood is a combination of a fighting game,
                a tabletop RPG and a Card Game which creates a unique gameplay experience among TCGs.
            </p>

            <VideoEmbed src={HOW_TO_PLAY_EMBED} title="How to play Flesh and Blood" />
        </section>
    )
}