import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="page-layout flex flex-col items-center justify-center text-center gap-6 min-h-[70vh]">
            <svg
                viewBox="0 0 400 260"
                className="w-full max-w-md"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* 2nd place block */}
                <rect x="40" y="140" width="100" height="90" rx="6" className="fill-muted stroke-border" strokeWidth="2" />
                <text x="90" y="195" textAnchor="middle" className="fill-muted-foreground text-4xl font-bold" style={{ fontSize: "36px" }}>2</text>

                {/* 1st place block - empty, taller */}
                <rect x="150" y="100" width="100" height="130" rx="6" className="fill-accent stroke-border" strokeWidth="2" />
                <text x="200" y="150" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: "36px", fontWeight: "bold" }}>1</text>

                {/* 3rd place block */}
                <rect x="260" y="165" width="100" height="65" rx="6" className="fill-muted stroke-border" strokeWidth="2" />
                <text x="310" y="205" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: "36px", fontWeight: "bold" }}>3</text>

                {/* floor line */}
                <line x1="20" y1="230" x2="380" y2="230" className="stroke-border" strokeWidth="2" />
            </svg>

            <div className="space-y-2">
                <h1 className="page-heading-text text-4xl">404 — Riptide not found</h1>
            </div>

            <Button className="cursor-pointer" nativeButton={false} render={<Link href="/">Back to safety</Link>} />
        </div>
    )
}