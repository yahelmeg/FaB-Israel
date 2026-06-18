import { Button } from "@/components/ui/button";
import { buildTcgPlayerUrl } from "@/lib/format";
import Image from "next/image";

interface TcgPlayerProps {
    cardName: string;
}

export function TcgPlayerButton({ cardName }: TcgPlayerProps) {
    return (
        <Button
            size="sm"
            nativeButton={false}
            className="group gap-1 cursor-pointer bg-blue-700 hover:bg-blue-600/90 text-white"
            render={
                <a
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