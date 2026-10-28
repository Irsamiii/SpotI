export type TaskType =
  | "deep-focus"
  | "group-project"
  | "quick-laptop"
  | "online-meeting";

export type CrowdingStatus = "open" | "filling" | "full";

export type Spot = {
  id: string;
  name: string;
  location: string;
  imageLabel: string;
  crowding: string;
  crowdingClass: CrowdingStatus;
  rating: string;
  attributes: string[];
  matches: Record<TaskType, string>;
};
