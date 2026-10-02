export const TASK_PRESETS = {
  deepFocus: {
    label: "Deep Focus",
    minNoiseScore: 3,   // LOW or SILENT
    minWifiScore: 2,    // OKAY or better
    minOutletScore: 1,  // any
  },
  groupStudy: {
    label: "Group Study",
    minNoiseScore: 1,   // any noise level ok
    minWifiScore: 2,
    minOutletScore: 2,  // FEW or PLENTY
  },
  quickSession: {
    label: "Quick Session",
    minNoiseScore: 1,
    minWifiScore: 1,
    minOutletScore: 1,
  },
  videoCall: {
    label: "Video Call",
    minNoiseScore: 3,
    minWifiScore: 3,    // GOOD or EXCELLENT
    minOutletScore: 1,
  },
} as const;

export type TaskPresetKey = keyof typeof TASK_PRESETS;

export const NOISE_SCORE = { SILENT: 4, LOW: 3, MODERATE: 2, LOUD: 1 } as const;
export const WIFI_SCORE = { EXCELLENT: 4, GOOD: 3, OKAY: 2, POOR: 1 } as const;
export const OUTLET_SCORE = { PLENTY: 3, FEW: 2, NONE: 1 } as const;