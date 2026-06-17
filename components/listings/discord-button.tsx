import { FaDiscord } from "react-icons/fa";
import { Button } from "@/components/ui/button"

interface DiscordButtonProps {
    sellerDiscord: string
}

export function DiscordButton({ sellerDiscord }: DiscordButtonProps) {
    return (
        <Button
            size="sm"
            className="bg-[#5865F2] hover:bg-[#4752c4] text-white gap-1"
            onClick={() => navigator.clipboard.writeText(sellerDiscord)}
        >
            <FaDiscord size={12} />
            Copy Discord
        </Button>
    )
}