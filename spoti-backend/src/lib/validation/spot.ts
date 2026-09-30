import { z } from "zod";

export const createSpotSchema = z.object({
  name: z.string().min(1).max(100),
  building: z.string().min(1).max(100),
  floor: z.string().max(20).optional(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  hours: z.string().max(100).optional(),
  capacity: z.number().int().positive().optional(),
});

export const spotQuerySchema = z.object({
  building: z.string().optional(),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
  radiusKm: z.coerce.number().positive().max(50).default(5),
  minNoiseQuiet: z.coerce.boolean().optional(),
});