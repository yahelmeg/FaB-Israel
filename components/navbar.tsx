"use client"
import {NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink} from "@/components/ui/navigation-menu"
import { MdDarkMode, MdLightMode  } from "react-icons/md"
import {useState, useEffect} from "react";

import {Button} from "@/components/ui/button"


export function Navbar() {
    const [isDark, setIsDark] = useState<boolean>( () =>
      typeof window !== "undefined" && document.documentElement.classList.contains("dark")
    );

    const toggleDark = () => {
        document.documentElement.classList.toggle("dark");
        setIsDark( prev => !prev);
    }

    return (
        <NavigationMenu className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-muted/90 backdrop-blur-sm max-w-none px-6 py-0">
            <NavigationMenuList className="w-full">
                <NavigationMenuItem>
                    <NavigationMenuLink href="/" className="hover:text-red-500">Home</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink href="/market" className="hover:text-red-500">Market</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className="flex-1" />
                <NavigationMenuItem>
                    <Button variant="ghost" className="cursor-pointer hover:text-red-500">
                        Log in
                    </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Button variant="ghost" size="icon" className="cursor-pointer hover:opacity-70 transition-none" onClick={toggleDark}>
                        {isDark ? <MdLightMode className="h-5 w-5" /> : <MdDarkMode className="h-5 w-5" />}
                    </Button>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}