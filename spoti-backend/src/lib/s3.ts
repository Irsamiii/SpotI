import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

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
  const fileName = `${randomUUID()}.${ext}`;

  const dir = path.join(process.cwd(), "public", "uploads", "spots", spotId);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, fileName), buffer);

  // Served by Next.js from /public, e.g. http://localhost:3000/uploads/spots/<id>/<file>
  return `/uploads/spots/${spotId}/${fileName}`;
}