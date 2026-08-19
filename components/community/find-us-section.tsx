import { FaDiscord, FaWhatsapp, FaYoutube } from "react-icons/fa"
import { SocialButton } from "@/components/general/social-button"
import { WHATSAPP_URL, DISCORD_URL, YOUTUBE_CHANNEL_URL } from "@/consts/community-links"

export function FindUsSection() {
    return (
        <section className="flex flex-col gap-4 items-center text-center">

            <h2 className="page-heading-text">Join the Israel Flesh and Blood Community!</h2>
            <p className="text-muted-foreground max-w-xl">
                The Israeli FaB community lives on WhatsApp and Discord - come say hi, ask questions,
                and join us in the next armory event.
            </p>
            <p className="text-muted-foreground max-w-xl">
               Subscribe to our YouTube channel to see coverage of past events and tournaments!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                <SocialButton
                    href={WHATSAPP_URL}
                    icon={FaWhatsapp}
                    label="WhatsApp"
                    className="!bg-whatsapp hover:!bg-whatsapp-hover !text-black dark:!text-black"
                />
                <SocialButton
                    href={DISCORD_URL}
                    icon={FaDiscord}
                    label="Discord"
                    className="!bg-discord hover:!bg-discord-hover !text-white dark:!text-white"
                />
                <SocialButton
                    href={YOUTUBE_CHANNEL_URL}
                    icon={FaYoutube}
                    label="YouTube"
                    className="!bg-youtube hover:!bg-youtube-hover !text-white dark:!text-white"
                />
            </div>
        </section>
    )
}