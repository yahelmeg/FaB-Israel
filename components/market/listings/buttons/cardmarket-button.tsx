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
            className="w-32 cursor-pointer gap-1 !bg-cardmarket hover:!bg-cardmarket-hover text-white"
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