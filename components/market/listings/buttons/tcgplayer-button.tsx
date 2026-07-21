import { Button } from "@/components/ui/button";
import { buildTcgPlayerUrl } from "@/lib/format";
import Link from "next/link";

interface TcgPlayerProps {
    cardName: string;
    tcgPlayerUrl: string | undefined;
}

export function TcgPlayerButton({ cardName, tcgPlayerUrl }: TcgPlayerProps) {
    const href = tcgPlayerUrl ?? buildTcgPlayerUrl(cardName)
    return (
        <Button
            size="sm"
            nativeButton={false}
            className="w-32 group gap-1 cursor-pointer bg-blue-700 hover:bg-blue-600/90 text-white dark:hover:bg-blue-500/90"
            render={
                <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                />
            }
        >
            TCGPlayer
        </Button>
    );
}