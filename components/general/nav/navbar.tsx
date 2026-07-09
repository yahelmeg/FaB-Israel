"use client"
import {NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuContent} from "@/components/ui/navigation-menu"
import { MdDarkMode, MdLightMode  } from "react-icons/md"
import {Button} from "@/components/ui/button"
import {MobileNav} from "@/components/general/nav/mobile-nav";
import Link from "next/link";


export function Navbar() {

    const toggleDark = () => {
        const isDark = document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }

    return (
        <NavigationMenu className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-muted/90 backdrop-blur-sm max-w-none px-6 py-2">
            <NavigationMenuList className="w-full">
                <NavigationMenuItem className="md:hidden">
                    <MobileNav />
                </NavigationMenuItem>
                <NavigationMenuItem className="hidden md:flex">
                    <NavigationMenuLink href="/" className="nav-link">Home</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className="hidden md:flex">
                    <NavigationMenuTrigger className="nav-link">Market</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="w-48 p-1">
                            <li>
                                <NavigationMenuLink href="/market" className="block rounded-md px-3 py-2 text-md hover:bg-accent">
                                    Search Cards
                                </NavigationMenuLink>
                            </li>
                            <li>
                                <NavigationMenuLink href="/market/sell" className="block rounded-md px-3 py-2 text-md hover:bg-accent">
                                    Sell Cards
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem >
                <NavigationMenuItem className="hidden md:flex">
                    <NavigationMenuLink href="/events" className="nav-link">Events</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className="hidden md:flex">
                    <NavigationMenuLink href="/announcements" className="nav-link">Announcements</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className="flex-1"/>
                <NavigationMenuItem className="hidden md:flex">
                    <NavigationMenuLink href="/get-started" className="nav-link">Get started </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className="hidden md:flex">
                    <Button variant="ghost" className="cursor-pointer nav-link font-medium" nativeButton={false} render={ <Link href="/auth">Sign in</Link>} />
                </NavigationMenuItem>
                <NavigationMenuItem className="hidden md:flex">
                    <Button variant="ghost" size="icon" className="cursor-pointer hover:opacity-70 transition-none" onClick={toggleDark}>
                        <MdDarkMode className="block dark:hidden size-6" />
                        <MdLightMode className="hidden dark:block size-6" />
                    </Button>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}