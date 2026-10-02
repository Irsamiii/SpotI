import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const NOISE_SCORE = { SILENT: 4, LOW: 3, MODERATE: 2, LOUD: 1 };
const WIFI_SCORE = { EXCELLENT: 4, GOOD: 3, OKAY: 2, POOR: 1 };
const OUTLET_SCORE = { PLENTY: 3, FEW: 2, NONE: 1 };

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const spot = await prisma.spot.findUnique({
    where: { id },
    include: {
      ratings: {
        orderBy: { createdAt: "desc" },
        include: { user: { select: { id: true, name: true } } },
      },
      photos: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
      _count: { select: { favorites: true } },
    },
  });

  if (!spot) {
    return NextResponse.json({ error: "Spot not found" }, { status: 404 });
  }

  const ratingCount = spot.ratings.length;

  const averages =
    ratingCount > 0
      ? {
          noise: avg(spot.ratings.map((r) => NOISE_SCORE[r.noiseLevel])),
          wifi: avg(spot.ratings.map((r) => WIFI_SCORE[r.wifiQuality])),
          outlets: avg(spot.ratings.map((r) => OUTLET_SCORE[r.outletAvailability])),
        }
      : null;

  const currentCrowding = spot.ratings[0]?.crowdingAtTime ?? null;

  return NextResponse.json({
    id: spot.id,
    name: spot.name,
    building: spot.building,
    floor: spot.floor,
    latitude: spot.latitude,
    longitude: spot.longitude,
    hours: spot.hours,
    capacity: spot.capacity,
    favoriteCount: spot._count.favorites,
    ratingCount,
    averages,
    currentCrowding,
    photos: spot.photos.map((p) => ({ id: p.id, imageUrl: p.imageUrl, createdAt: p.createdAt })),
    recentRatings: spot.ratings.slice(0, 5).map((r) => ({
      id: r.id,
      noiseLevel: r.noiseLevel,
      wifiQuality: r.wifiQuality,
      outletAvailability: r.outletAvailability,
      crowdingAtTime: r.crowdingAtTime,
      comment: r.comment,
      createdAt: r.createdAt,
      userName: r.user.name,
    })),
  });
}

function avg(nums: number[]) {
  return Math.round((nums.reduce((a, b) => a + b, 0) / nums.length) * 10) / 10;
}