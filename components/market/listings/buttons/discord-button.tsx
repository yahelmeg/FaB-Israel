import { FaDiscord } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "sonner"


interface DiscordButtonProps {
    sellerDiscord: string
}

export function DiscordButton({ sellerDiscord }: DiscordButtonProps) {

    const handleClick = async () => {
        try {
            await navigator.clipboard.writeText(sellerDiscord)
            toast.success("Discord successfully copied!")
        } catch (error) {
            console.error("Failed to copy Discord username:", error)
            toast.error("Couldn't copy to clipboard")
        }
    }
    return (
        <Button
            size="sm"
            className={cn(
               "w-32 cursor-pointer gap-1 !bg-discord hover:!bg-discord-hover !text-white dark:!text-white"
            )}
            onClick={handleClick}
        >
            <FaDiscord size={12} />
            Discord
        </Button>
    )
}