import { FaDiscord } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"


interface DiscordButtonProps {
    sellerDiscord: string
}

export function DiscordButton({ sellerDiscord }: DiscordButtonProps) {
    return (
        <Button
            size="sm"
            className={cn(
               "w-32 cursor-pointer gap-1 bg-indigo-600 hover:bg-indigo-500/90 text-white dark:hover:bg-indigo-400/90"
            )}
            onClick={() => navigator.clipboard.writeText(sellerDiscord)}
        >
            <FaDiscord size={12} />
            Discord
        </Button>
    )
}