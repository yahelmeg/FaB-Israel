import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

import { readFileSync, mkdirSync, existsSync, readdirSync, writeFileSync } from "fs";

const BASE_URL = "https://content.fabrary.net/cards/";
const OUTPUT_DIR = "images_to_upload";
const DELAY_MS = 150;

interface MissingImage {
    key: string;
    name: string;
}

function sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
}

async function downloadImage(key: string): Promise<"downloaded" | "failed"> {
    const url = BASE_URL + key;
    const destPath = resolve(OUTPUT_DIR, key);

    try {
        const res = await fetch(url);
        if (!res.ok) {
            console.error(`FAILED (${res.status}): ${key}`);
            return "failed";
        }
        const buffer = Buffer.from(await res.arrayBuffer());
        writeFileSync(destPath, buffer);
        console.log(`Downloaded: ${key}`);
        return "downloaded";
    } catch (err) {
        console.error(`ERROR downloading ${key}:`, err);
        return "failed";
    }
}

async function main() {
    mkdirSync(OUTPUT_DIR, { recursive: true });

    const missing: MissingImage[] = JSON.parse(
        readFileSync("data/missing-images.json", "utf-8")
    );

    const alreadyDownloaded = new Set(
        existsSync(OUTPUT_DIR) ? readdirSync(OUTPUT_DIR) : []
    );

    let downloaded = 0;
    let skipped = 0;
    const failures: MissingImage[] = [];

    for (const item of missing) {
        if (alreadyDownloaded.has(item.key)) {
            skipped++;
            continue;
        }

        const result = await downloadImage(item.key);
        if (result === "downloaded") {
            downloaded++;
        } else {
            failures.push(item);
        }

        await sleep(DELAY_MS);
    }

    if (failures.length) {
        writeFileSync("data/download-failures.json", JSON.stringify(failures, null, 2));
    }

    console.log(`\nDownloaded: ${downloaded}`);
    console.log(`Skipped (already in ${OUTPUT_DIR}): ${skipped}`);
    console.log(`Failed: ${failures.length}${failures.length ? " (see data/download-failures.json)" : ""}`);
}

main().catch((err) => {
    console.error("Script failed:", err);
    process.exit(1);
});