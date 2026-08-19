import { buildTcgPlayerUrl } from "@/lib/format";
import Link from "next/link";
import {SharedMarketButton} from "@/components/market/listings/buttons/shared-marketplace-button";

interface TcgPlayerProps {
    cardName: string;
    tcgPlayerUrl: string | undefined;
}

export function TcgPlayerButton({ cardName, tcgPlayerUrl }: TcgPlayerProps) {
    const href = tcgPlayerUrl ?? buildTcgPlayerUrl(cardName)
    return (
        <SharedMarketButton
            className="!bg-tcgplayer hover:!bg-tcgplayer-hover text-white"
            render={
                <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                />
            }
        >
            TCGPlayer
        </SharedMarketButton>
    );
}