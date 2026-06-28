"use client"
import {NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuContent} from "@/components/ui/navigation-menu"
import { MdDarkMode, MdLightMode  } from "react-icons/md"
import {useState, useEffect} from "react";

import {Button} from "@/components/ui/button"
import {MobileNav} from "@/components/general/nav/mobile-nav";


export function Navbar() {
    const [isDark, setIsDark] = useState<boolean>( () =>
      typeof window !== "undefined" && document.documentElement.classList.contains("dark")
    );

    const toggleDark = () => {
        document.documentElement.classList.toggle("dark");
        setIsDark( prev => !prev);
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
                    <Button variant="ghost" className="cursor-pointer nav-link font-medium" >
                        Log in
                    </Button>
                </NavigationMenuItem>
                <NavigationMenuItem className="hidden md:flex">
                    <Button variant="ghost" size="icon" className="cursor-pointer hover:opacity-70 transition-none" onClick={toggleDark}>
                        {isDark ? <MdLightMode className="size-6"/> : <MdDarkMode className="size-6" />}
                    </Button>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}