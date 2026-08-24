import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode, ReactElement } from "react";

interface SharedMarketButtonProps {
    children: ReactNode;
    className?: string;
    render?: ReactElement;
    onClick?: () => void;
    disabled?: boolean;
}

export function SharedMarketButton({children, className, render, onClick, disabled}: SharedMarketButtonProps) {
    const isNative = render === undefined;
    return (
        <Button
            size="sm"
            nativeButton={isNative}
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "w-32 gap-1 text-white",
                disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
                className
            )}
            render={render}
        >
            {children}
        </Button>
    );
}