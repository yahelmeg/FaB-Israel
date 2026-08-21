import Image from "next/image";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-border bg-muted/50 px-6 py-6 text-sm text-muted-foreground">
            <p className="text-center">
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
            <div className="mt-3 flex flex-col sm:flex-row items-center sm:justify-between gap-3 max-w-screen-xl mx-auto">
                <p>
                    <Link href="/privacy-policy" className="underline hover:text-foreground">
                        Privacy Policy
                    </Link>
                    {" · "}
                    <Link href="/terms-of-service" className="underline hover:text-foreground">
                        Terms of Service
                    </Link>
                </p>
                <Link href="https://ko-fi.com/fabisrael" target="_blank" rel="noopener noreferrer">
                    <div className="relative w-[180px] h-[36px] dark:hidden">
                        <Image
                            src="https://storage.ko-fi.com/cdn/brandasset/v2/support_me_on_kofi_dark.png"
                            alt="Support us on Ko-fi"
                            fill
                            className="object-contain"
                            unoptimized
                        />
                    </div>
                    <div className="relative hidden w-[180px] h-[36px] dark:block">
                        <Image
                            src="https://storage.ko-fi.com/cdn/brandasset/v2/support_me_on_kofi_beige.png"
                            alt="Support us on Ko-fi"
                            fill
                            className="object-contain"
                            unoptimized
                        />
                    </div>
                </Link>
            </div>
        </footer>
    );
}