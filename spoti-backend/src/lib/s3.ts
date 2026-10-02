import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

const s3 = new S3Client({
  region: process.env.S3_REGION!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.S3_BUCKET!;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export async function uploadPhoto(file: File, spotId: string) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Unsupported file type. Use JPEG, PNG, or WebP.");
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error("File too large. Max 5MB.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = file.type.split("/")[1];
  const key = `spots/${spotId}/${randomUUID()}.${ext}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    })
  );

  return `https://${BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`;
}