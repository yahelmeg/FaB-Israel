
import { Button } from "@/components/ui/button"
import { FaWhatsapp } from "react-icons/fa"
import { buildWhatsAppUrl } from "@/lib/format"


interface WhatsappButtonProps {
    phoneNumber: string
    cardName: string
}

export function WhatsappButton({ phoneNumber, cardName }: WhatsappButtonProps) {
    return (
        <Button
            size="sm"
            className="bg-green-500 hover:bg-green-600 text-black gap-1 dark: text-white"
            onClick={() => window.open(buildWhatsAppUrl(phoneNumber, cardName), "_blank")}
        >
            <FaWhatsapp size={12} />
            WhatsApp
        </Button>
    )
}

