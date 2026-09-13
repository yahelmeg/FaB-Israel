import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readdirSync, readFileSync, writeFileSync } from "fs";

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

const UPLOAD_DIR = "images_to_upload";

const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
});

async function uploadFile(filename: string): Promise<boolean> {
    const filePath = resolve(UPLOAD_DIR, filename);
    const body = readFileSync(filePath);

    try {
        await s3.send(
            new PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME!,
                Key: filename,
                Body: body,
                ContentType: "image/webp",
            })
        );
        console.log(`Uploaded: ${filename}`);
        return true;
    } catch (err) {
        console.error(`FAILED to upload ${filename}:`, err);
        return false;
    }
}

async function main() {
    const files = readdirSync(UPLOAD_DIR).filter((f) => f.endsWith(".webp"));

    if (files.length === 0) {
        console.log(`No .webp files found in ${UPLOAD_DIR}/`);
        return;
    }

    console.log(`Uploading ${files.length} file(s) to bucket ${process.env.R2_BUCKET_NAME}...`);

    let uploaded = 0;
    const failures: string[] = [];

    for (const filename of files) {
        const ok = await uploadFile(filename);
        if (ok) uploaded++;
        else failures.push(filename);
    }

    if (failures.length) {
        writeFileSync("data/upload-failures.json", JSON.stringify(failures, null, 2));
    }

    console.log(`\nUploaded: ${uploaded}`);
    console.log(`Failed: ${failures.length}${failures.length ? " (see data/upload-failures.json)" : ""}`);
}

main().catch((err) => {
    console.error("Script failed:", err);
    process.exit(1);
});