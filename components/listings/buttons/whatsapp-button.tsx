
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
            nativeButton={false}
            className={cn(
                "cursor-pointer gap-1 bg-lime-400 hover:bg-lime-300/90 text-black dark:hover:bg-lime-200/90"
            )}
            render={
                <a
                    href={buildWhatsAppUrl(phoneNumber, cardName)}
                    target="_blank"
                    rel="noopener noreferrer"
                />
            }
        >
            <FaWhatsapp size={12} />
            WhatsApp
        </Button>
    )
}

