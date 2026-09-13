import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

import { cards } from "@flesh-and-blood/cards";
import { readFileSync, writeFileSync, mkdirSync } from "fs";

function getImageKey(identifier: string | undefined): string | null {
    if (!identifier) {
        return null;
    }

    return `${identifier}.webp`;
}

async function main() {
    mkdirSync("data", { recursive: true });

    const manifest: string[] = JSON.parse(
        readFileSync("data/r2-manifest.json", "utf-8")
    );
    const inR2 = new Set(manifest);

    const expectedKeys = new Map<string, string>();

    cards.forEach((card) => {
        card.printings?.forEach((printing) => {
            const key = getImageKey(printing.image);
            if (key) expectedKeys.set(key, card.name);
        });
    });

    const missing = [...expectedKeys.entries()]
        .filter(([key]) => !inR2.has(key))
        .map(([key, name]) => ({ key, name }))
        .sort((a, b) => a.key.localeCompare(b.key));

    writeFileSync("data/missing-images.json", JSON.stringify(missing, null, 2));
    console.log(`Expected: ${expectedKeys.size}`);
    console.log(`In R2: ${inR2.size}`);
    console.log(`Missing: ${missing.length}`);
}

main().catch((err) => {
    console.error("Script failed:", err);
    process.exit(1);
});