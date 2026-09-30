import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { spotQuerySchema } from "@/lib/validation/spot";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const parsed = spotQuerySchema.safeParse(Object.fromEntries(searchParams));

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid query parameters", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { building, lat, lng, radiusKm } = parsed.data;

  // Base filter: building match, if provided
  const where = building
    ? { building: { equals: building, mode: "insensitive" as const } }
    : {};

  const spots = await prisma.spot.findMany({
    where,
    include: {
      ratings: {
        select: {
          noiseLevel: true,
          wifiQuality: true,
          outletAvailability: true,
          crowdingAtTime: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      },
      _count: { select: { favorites: true } },
    },
  });

  // Compute aggregates + distance in application code
  const enriched = spots
    .map((spot) => {
      const ratingCount = spot.ratings.length;
      const mostRecent = spot.ratings[0] ?? null;

      const distanceKm =
        lat !== undefined && lng !== undefined
          ? haversineKm(lat, lng, spot.latitude, spot.longitude)
          : null;

      return {
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
        currentCrowding: mostRecent?.crowdingAtTime ?? null,
        distanceKm,
      };
    })
    .filter((s) => (radiusKm && s.distanceKm !== null ? s.distanceKm <= radiusKm : true))
    .sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity));

  return NextResponse.json({ spots: enriched });
}

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}