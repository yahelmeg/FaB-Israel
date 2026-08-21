import { FaDiscord } from "react-icons/fa";
import { toast } from "sonner"
import {SharedMarketButton} from "@/components/market/listings/buttons/shared-marketplace-button";


interface DiscordButtonProps {
    sellerDiscord: string
}

export function DiscordButton({ sellerDiscord }: DiscordButtonProps) {

    const handleClick = async () => {
        try {
            await navigator.clipboard.writeText(sellerDiscord)
            toast.success("Discord username successfully copied!")
        } catch (error) {
            console.error("Failed to copy Discord username:", error)
            toast.error("Couldn't copy to clipboard")
        }
    }
    return (
        <SharedMarketButton
            className="!bg-discord hover:!bg-discord-hover !text-white dark:!text-white"
            onClick={handleClick}
        >
            <FaDiscord size={12} />
            Discord
        </SharedMarketButton>
    )
}