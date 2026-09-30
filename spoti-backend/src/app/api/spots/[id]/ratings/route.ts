import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { createRatingSchema } from "@/lib/validation/rating";

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

  const body = await req.json().catch(() => null);
  const parsed = createRatingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid rating data", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // Rate limit: 1 rating per user per spot per day
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const recentRating = await prisma.rating.findFirst({
    where: {
      spotId,
      userId: session.user.id,
      createdAt: { gte: oneDayAgo },
    },
  });

  if (recentRating) {
    return NextResponse.json(
      { error: "You've already rated this spot in the last 24 hours." },
      { status: 429 }
    );
  }

  const rating = await prisma.rating.create({
    data: {
      spotId,
      userId: session.user.id,
      ...parsed.data,
    },
  });

  return NextResponse.json({ rating }, { status: 201 });
}