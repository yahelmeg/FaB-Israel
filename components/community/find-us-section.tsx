import { FaDiscord, FaWhatsapp, FaYoutube } from "react-icons/fa"
import { SocialButton } from "@/components/general/social-button"
import { WHATSAPP_URL, DISCORD_URL, YOUTUBE_CHANNEL_URL } from "@/consts/community-links"

export function FindUsSection() {
    return (
        <section className="flex flex-col gap-4 items-center text-center">
            <h2 className="text-2xl font-bold">Find us</h2>
            <p className="text-muted-foreground max-w-xl">
                The Israeli FaB community lives on WhatsApp and Discord - come say hi, ask questions,
                and join us in the next armory.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                <SocialButton
                    href={WHATSAPP_URL}
                    icon={FaWhatsapp}
                    label="WhatsApp"
                    className="!bg-lime-400 hover:!bg-lime-300/90 text-black dark:hover:!bg-lime-200/90 dark:hover:text-black"
                />
                <SocialButton
                    href={DISCORD_URL}
                    icon={FaDiscord}
                    label="Discord"
                    className="!bg-indigo-600 hover:!bg-indigo-500/90 text-white dark:hover:!bg-indigo-400/90"
                />
            </div>
            <p className="text-muted-foreground max-w-xl">
                Want more content? Subscribe to our YouTube channel to see coverage of past events and tournaments!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                <SocialButton
                    href={YOUTUBE_CHANNEL_URL}
                    icon={FaYoutube}
                    label="YouTube"
                    className="!bg-red-600 hover:!bg-red-500/90 text-white dark:hover:!bg-red-400/90"
                />
            </div>
        </section>
    )
}