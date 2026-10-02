import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { spotQuerySchema } from "@/lib/validation/spot";
import { TASK_PRESETS, NOISE_SCORE, WIFI_SCORE, OUTLET_SCORE } from "@/lib/presets";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const parsed = spotQuerySchema.safeParse(Object.fromEntries(searchParams));

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid query parameters", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { building, lat, lng, radiusKm, preset } = parsed.data;
  const activePreset = preset ? TASK_PRESETS[preset] : null;

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

  const enriched = spots
    .map((spot) => {
      const ratingCount = spot.ratings.length;
      const mostRecent = spot.ratings[0] ?? null;

      const distanceKm =
        lat !== undefined && lng !== undefined
          ? haversineKm(lat, lng, spot.latitude, spot.longitude)
          : null;

      const avgNoise = ratingCount
        ? avg(spot.ratings.map((r) => NOISE_SCORE[r.noiseLevel]))
        : null;
      const avgWifi = ratingCount
        ? avg(spot.ratings.map((r) => WIFI_SCORE[r.wifiQuality]))
        : null;
      const avgOutlets = ratingCount
        ? avg(spot.ratings.map((r) => OUTLET_SCORE[r.outletAvailability]))
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
        averages: ratingCount
          ? { noise: avgNoise, wifi: avgWifi, outlets: avgOutlets }
          : null,
      };
    })
    .filter((s) => (radiusKm && s.distanceKm !== null ? s.distanceKm <= radiusKm : true))
    .filter((s) => {
      if (!activePreset) return true;
      if (!s.averages) return false;
      return (
        s.averages.noise! >= activePreset.minNoiseScore &&
        s.averages.wifi! >= activePreset.minWifiScore &&
        s.averages.outlets! >= activePreset.minOutletScore
      );
    })
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

function avg(nums: number[]) {
  return Math.round((nums.reduce((a, b) => a + b, 0) / nums.length) * 10) / 10;
}