import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
    return (
        <div className={cn("flex flex-col items-center justify-center gap-3 sm:gap-4 py-12 sm:py-16 md:py-24 px-4", className)}>
            <div className="flex items-center gap-3 sm:gap-4">
        <span className="flex h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 items-center justify-center rounded-xl sm:rounded-2xl rotate-45 bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/20 shrink-0">
          <span className="-rotate-45 text-lg sm:text-xl md:text-3xl font-black text-white">F</span>
        </span>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-foreground">
                    FaB<span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">-Israel</span>
                </h1>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-center max-w-xs sm:max-w-md md:max-w-2xl">
                The home for Flesh and Blood TCG players in Israel — buy, sell, trade, find events, and connect with the community
            </p>
        </div>
    );
}