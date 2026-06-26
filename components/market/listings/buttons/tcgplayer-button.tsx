import { Button } from "@/components/ui/button";
import { buildTcgPlayerUrl } from "@/lib/format";
import Link from "next/link";

interface TcgPlayerProps {
    cardName: string;
}

export function TcgPlayerButton({ cardName }: TcgPlayerProps) {
    return (
        <Button
            size="sm"
            nativeButton={false}
            className="w-32 group gap-1 cursor-pointer bg-blue-700 hover:bg-blue-600/90 text-white dark:hover:bg-blue-500/90"
            render={
                <Link
                    href={buildTcgPlayerUrl(cardName)}
                    target="_blank"
                    rel="noopener noreferrer"
                />
            }
        >
            TCGPlayer
        </Button>
    );
}