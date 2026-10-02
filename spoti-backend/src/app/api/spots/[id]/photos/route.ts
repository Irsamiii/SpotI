import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { uploadPhoto } from "@/lib/s3";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: spotId } = await params;

  const spot = await prisma.spot.findUnique({ where: { id: spotId } });
  if (!spot) {
    return NextResponse.json({ error: "Spot not found" }, { status: 404 });
  }

  const formData = await req.formData().catch(() => null);
  const file = formData?.get("photo");

  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { error: "No photo file provided. Send multipart/form-data with a 'photo' field." },
      { status: 400 }
    );
  }

  let imageUrl: string;
  try {
    imageUrl = await uploadPhoto(file, spotId);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  const photo = await prisma.photo.create({
    data: { spotId, userId: session.user.id, imageUrl },
  });

  return NextResponse.json({ photo }, { status: 201 });
}