"use client"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { CiMenuBurger } from "react-icons/ci";
import { MdDarkMode, MdLightMode } from "react-icons/md"
import Link from "next/link"
import { SignoutButton } from "@/components/auth/signout-button";

interface MobileNavProps {
    isLoggedIn: boolean
    displayName?: string
}

export function MobileNav({ isLoggedIn, displayName }: MobileNavProps) {

    const [open, setOpen] = useState<boolean>(false)

    const toggleDark = () => {
        const isDark = document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={
                <Button variant="ghost" className="md:hidden cursor-pointer">
                    <CiMenuBurger className="size-6" />
                </Button>
            } />
            <SheetContent side="left">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <nav className="flex flex-col gap-4 mt-8 ml-8">
                    <Link href="/" className="nav-link" onClick={() => setOpen(false)}>Home</Link>
                    <Accordion>
                        <AccordionItem value="market" className="border-none">
                            <AccordionTrigger className="nav-link cursor-pointer hover:no-underline py-0">
                                Market
                            </AccordionTrigger>
                            <AccordionContent className="no-underline">
                                <div className="flex flex-col gap-3 ml-4 border-l border-border pl-4">
                                    <Link href="/market" className="nav-link" onClick={() => setOpen(false)}>Search Cards</Link>
                                    <Link href="/market/sell" className="nav-link" onClick={() => setOpen(false)}>Sell a Card</Link>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Link href="/events" className="nav-link" onClick={() => setOpen(false)}>Events</Link>
                    <Link href="/community" className="nav-link" onClick={() => setOpen(false)}>Get Started</Link>

                    {isLoggedIn ? (
                        <Accordion>
                            <AccordionItem value="account" className="border-none">
                                <AccordionTrigger className="nav-link cursor-pointer hover:no-underline py-0">
                                    {displayName ?? "Account"}
                                </AccordionTrigger>
                                <AccordionContent className="no-underline">
                                    <div className="flex flex-col gap-3 ml-4 border-l border-border pl-4">
                                        <Link href="/profile" className="nav-link" onClick={() => setOpen(false)}>Profile</Link>
                                        <Link href="/my-listings" className="nav-link" onClick={() => setOpen(false)}>My Listings</Link>
                                        <SignoutButton onClick={() => setOpen(false)} className="nav-link" />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ) : (
                        <Link href="/auth" className="nav-link" onClick={() => setOpen(false)}>Sign in</Link>
                    )}

                    <Button variant="ghost" size="icon" className="cursor-pointer hover:opacity-70 transition-none self-start" onClick={toggleDark}>
                        <MdDarkMode className="block dark:hidden size-6" />
                        <MdLightMode className="hidden dark:block size-6" />
                    </Button>
                </nav>
            </SheetContent>
        </Sheet>
    )
}