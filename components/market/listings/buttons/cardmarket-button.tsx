import Link from "next/link";
import { SiCardmarket } from "react-icons/si";
import { buildCardMarketUrl } from "@/lib/format";
import {SharedMarketButton} from "@/components/market/listings/buttons/shared-marketplace-button";

interface MarketplaceButtonProps {
    cardName: string;
    disabled?: boolean;
}

export function CardMarketButton({ cardName, disabled }: MarketplaceButtonProps) {
    return (
        <SharedMarketButton
            disabled={disabled}
            className="!bg-cardmarket hover:!bg-cardmarket-hover text-white"
            render={
                <Link
                    href={buildCardMarketUrl(cardName)}
                    target="_blank"
                    rel="noopener noreferrer"
                />
            }
        >
            <SiCardmarket size={12} />
            CardMarket
        </SharedMarketButton>
    );
}