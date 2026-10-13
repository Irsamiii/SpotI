import { z } from "zod";

export const preferencesSchema = z.strictObject({
  defaultPreset: z
    .enum(["deepFocus", "groupStudy", "quickSession", "videoCall"])
    .nullable()
    .default(null),
  preferredBuildings: z.array(z.string().min(1).max(100)).max(10).default([]),
  defaultRadiusKm: z.number().positive().max(50).default(5),
});

export type Preferences = z.infer<typeof preferencesSchema>;