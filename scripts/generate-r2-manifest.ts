import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { writeFileSync, mkdirSync } from "fs";

const requiredEnvVars = [
    "R2_ACCOUNT_ID",
    "R2_ACCESS_KEY_ID",
    "R2_SECRET_ACCESS_KEY",
    "R2_BUCKET_NAME",
] as const;

for (const key of requiredEnvVars) {
    if (!process.env[key]) {
        console.error(`Missing required env var: ${key}. Check .env.local.`);
        process.exit(1);
    }
}

const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
});

async function listAllKeys(bucket: string): Promise<string[]> {
    const keys: string[] = [];
    let continuationToken: string | undefined;

    do {
        const res = await s3.send(
            new ListObjectsV2Command({
                Bucket: bucket,
                ContinuationToken: continuationToken,
            })
        );
        res.Contents?.forEach((obj) => obj.Key && keys.push(obj.Key));
        continuationToken = res.NextContinuationToken;
    } while (continuationToken);

    return keys;
}

async function main() {
    mkdirSync("data", { recursive: true });

    const keys = await listAllKeys(process.env.R2_BUCKET_NAME!);
    writeFileSync("data/r2-manifest.json", JSON.stringify(keys, null, 2));
    console.log(`Wrote ${keys.length} keys to data/r2-manifest.json`);
}

main().catch((err) => {
    console.error("Script failed:", err);
    process.exit(1);
});