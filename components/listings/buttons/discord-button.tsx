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
               "cursor-pointer gap-1 bg-[#7289da] hover:bg-[#8499e3] text-black"
            )}
            onClick={() => navigator.clipboard.writeText(sellerDiscord)}
        >
            <FaDiscord size={12} />
            Discord
        </Button>
    )
}