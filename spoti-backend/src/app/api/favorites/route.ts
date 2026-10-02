import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

const favoriteBodySchema = z.object({
  spotId: z.string().min(1),
});

// GET /api/favorites — list the current user's favorited spots
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    include: { spot: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    favorites: favorites.map((f) => ({
      favoritedAt: f.createdAt,
      spot: f.spot,
    })),
  });
}

// POST /api/favorites — add a spot to favorites
export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = favoriteBodySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request body", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { spotId } = parsed.data;

  const spot = await prisma.spot.findUnique({ where: { id: spotId } });
  if (!spot) {
    return NextResponse.json({ error: "Spot not found" }, { status: 404 });
  }

  try {
    const favorite = await prisma.favorite.create({
      data: { userId: session.user.id, spotId },
    });
    return NextResponse.json({ favorite }, { status: 201 });
  } catch (err: any) {
    // Prisma unique constraint violation = already favorited
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "Spot is already in your favorites" },
        { status: 409 }
      );
    }
    throw err;
  }
}

// DELETE /api/favorites — remove a spot from favorites
export async function DELETE(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = favoriteBodySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request body", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { spotId } = parsed.data;

  const deleted = await prisma.favorite.deleteMany({
    where: { userId: session.user.id, spotId },
  });

  if (deleted.count === 0) {
    return NextResponse.json(
      { error: "Favorite not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}