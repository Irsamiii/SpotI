import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const spots = await Promise.all([
    prisma.spot.create({
      data: {
        name: "3rd Floor Reading Room",
        building: "Main Library",
        floor: "3",
        latitude: 40.7128,
        longitude: -74.006,
        hours: "Mon-Fri 8am-11pm, Sat-Sun 10am-8pm",
        capacity: 60,
      },
    }),
    prisma.spot.create({
      data: {
        name: "Engineering Commons",
        building: "Engineering Hall",
        floor: "1",
        latitude: 40.7135,
        longitude: -74.0055,
        hours: "24/7",
        capacity: 40,
      },
    }),
    prisma.spot.create({
      data: {
        name: "Quiet Study Nook",
        building: "Main Library",
        floor: "4",
        latitude: 40.713,
        longitude: -74.0062,
        hours: "Mon-Fri 8am-11pm",
        capacity: 15,
      },
    }),
  ]);

  const testUser = await prisma.user.create({
    data: {
      name: "Test Student",
      email: "seed-test@school.edu",
      emailVerified: true,
    },
  });

  await prisma.rating.create({
    data: {
      spotId: spots[0].id,
      userId: testUser.id,
      noiseLevel: "SILENT",
      wifiQuality: "GOOD",
      outletAvailability: "PLENTY",
      crowdingAtTime: "OPEN",
      comment: "Great spot early morning.",
    },
  });

  await prisma.rating.create({
    data: {
      spotId: spots[1].id,
      userId: testUser.id,
      noiseLevel: "MODERATE",
      wifiQuality: "EXCELLENT",
      outletAvailability: "FEW",
      crowdingAtTime: "FILLING",
      comment: "Gets loud around midday.",
    },
  });

  console.log("Seeded", spots.length, "spots and 2 ratings.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });