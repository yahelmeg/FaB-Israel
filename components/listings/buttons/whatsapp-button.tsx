
import { Button } from "@/components/ui/button"
import { FaWhatsapp } from "react-icons/fa"
import { buildWhatsAppUrl } from "@/lib/format"
import { cn } from "@/lib/utils"

interface WhatsappButtonProps {
    phoneNumber: string
    cardName: string
}

export function WhatsappButton({ phoneNumber, cardName }: WhatsappButtonProps) {
    return (
        <Button
            size="sm"
            className={cn(
                "cursor-pointer gap-1 bg-lime-400 hover:bg-lime-300/90 text-black"
            )}
            onClick={() => window.open(buildWhatsAppUrl(phoneNumber, cardName), "_blank")}
        >
            <FaWhatsapp size={12} />
            WhatsApp
        </Button>
    )
}

