import { z } from "zod";

export const createRatingSchema = z.object({
  noiseLevel: z.enum(["SILENT", "LOW", "MODERATE", "LOUD"]),
  wifiQuality: z.enum(["POOR", "OKAY", "GOOD", "EXCELLENT"]),
  outletAvailability: z.enum(["NONE", "FEW", "PLENTY"]),
  crowdingAtTime: z.enum(["OPEN", "FILLING", "FULL"]),
  comment: z.string().max(500).optional(),
});