import Link from "next/link";


export function Footer() {
    return (
        <footer className="border-t border-border bg-muted/50 px-6 py-6 text-center text-sm text-muted-foreground">
            <p>
                FaB-Israel is in no way affiliated with{" "}
                <Link href="https://legendstory.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                    Legend Story Studios
                </Link>
                ®.{" "}
                <Link href="https://fabtcg.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                    Flesh and Blood
                </Link>
                ™ is a registered trademark of Legend Story Studios. Flesh and Blood™ and all
                associated images are copyright © Legend Story Studios. All rights reserved.
            </p>
        </footer>
    )
}