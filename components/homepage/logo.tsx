import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
    return (
        <div className={cn("flex flex-col items-center justify-center gap-4 py-24", className)}>
            <div className="flex items-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl rotate-45 bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/20">
          <span className="-rotate-45 text-3xl font-black text-white">F</span>
        </span>
                <h1 className="text-6xl font-black tracking-tight text-foreground">
                    FaB<span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">-Israel</span>
                </h1>
            </div>
            <p className="text-lg text-muted-foreground">
                The home for Flesh and Blood TCG players in Israel - buy, sell, trade, find events, and connect with the community
            </p>
        </div>
    );
}