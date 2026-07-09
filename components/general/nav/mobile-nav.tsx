"use client"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { CiMenuBurger } from "react-icons/ci";
import Link from "next/link"

export function MobileNav() {

    const [open, setOpen] = useState<boolean>(false)

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
                    <Link href="/announcements" className="nav-link" onClick={() => setOpen(false)}>Announcements</Link>
                    <Link href="/get-started" className="nav-link" onClick={() => setOpen(false)}>Get Started</Link>
                    <Link href="/auth" className="nav-link" onClick={() => setOpen(false)}>Sign in</Link>
                </nav>
            </SheetContent>
       </Sheet>
    )
}