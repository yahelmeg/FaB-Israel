import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode, ReactElement } from "react";

interface SharedMarketButtonProps {
    children: ReactNode;
    className?: string;
    render?: ReactElement;
    onClick?: () => void;
}

export function SharedMarketButton({children, className, render, onClick}: SharedMarketButtonProps) {
    const isNative = render === undefined;
    return (
        <Button
            size="sm"
            nativeButton={isNative}
            onClick={onClick}
            className={cn("w-32 cursor-pointer gap-1 text-white", className)}
            render={render}
        >
            {children}
        </Button>
    );
}