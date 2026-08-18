import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { IconType } from "react-icons"

interface SocialButtonProps {
    href: string
    icon: IconType
    label: string
    className?: string
}

export function SocialButton({ href, icon: Icon, label, className }: SocialButtonProps) {
    return (
        <Button
            nativeButton={false}
            size="lg"
            variant="outline"
            className={cn("w-32 cursor-pointer gap-1", className)}
            render={<Link href={href} target="_blank" rel="noopener noreferrer" />}
        >
            <Icon className="size-5" />
            {label}
        </Button>
    )
}