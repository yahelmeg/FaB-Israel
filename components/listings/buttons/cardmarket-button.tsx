import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiCardmarket } from "react-icons/si";
import { buildCardMarketUrl } from "@/lib/format";

interface MarketplaceButtonProps {
    cardName: string;
}

export function CardMarketButton({ cardName }: MarketplaceButtonProps) {
    return (
        <Button
            size="sm"
            nativeButton={false}
            className="cursor-pointer gap-1 bg-sky-800 hover:bg-sky-800/80 text-white dark:hover:bg-sky-600/90"
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
        </Button>
    );
}