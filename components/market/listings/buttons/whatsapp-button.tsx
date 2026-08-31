
import { FaWhatsapp } from "react-icons/fa"
import { buildWhatsAppUrl } from "@/lib/format"
import Link from "next/link";
import {SharedMarketButton} from "@/components/market/listings/buttons/shared-marketplace-button";

interface WhatsappButtonProps {
    phoneNumber: string
    cardName: string
    mode: "buy" | "sell"
}

export function WhatsappButton({ phoneNumber, cardName, mode }: WhatsappButtonProps) {
    return (
        <SharedMarketButton
            className="!bg-whatsapp hover:!bg-whatsapp-hover !text-black dark:!text-black"
            render={
                <Link
                    href={buildWhatsAppUrl(phoneNumber, cardName, mode)}
                    target="_blank"
                    rel="noopener noreferrer"
                />
            }
        >
            <FaWhatsapp size={12}  />
            WhatsApp
        </SharedMarketButton>
    )
}

