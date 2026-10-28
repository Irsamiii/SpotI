import type { Spot } from "@/types/spot";

export const spots: Spot[] = [
  {
    id: "main-library-third-floor",
    name: "Main Library — 3rd Floor",
    location: "Central Library · 3rd Floor",
    imageLabel: "Quiet zone",
    crowding: "Open now",
    crowdingClass: "open",
    rating: "4.8",
    attributes: ["Quiet", "Strong Wi-Fi", "Outlets"],
    matches: {
      "deep-focus": "Best match for Deep Focus",
      "group-project": "Good for a quiet group session",
      "quick-laptop": "Reliable Wi-Fi and available outlets",
      "online-meeting": "Quiet enough for video calls",
    },
  },
  {
    id: "innovation-hub",
    name: "Innovation Hub",
    location: "Student Center · North Wing",
    imageLabel: "Collaborative",
    crowding: "Filling up",
    crowdingClass: "filling",
    rating: "4.6",
    attributes: ["Moderate noise", "Strong Wi-Fi", "Large tables"],
    matches: {
      "deep-focus": "Good when you need a change of scenery",
      "group-project": "Best match for Group Project",
      "quick-laptop": "Great for focused laptop work",
      "online-meeting": "Good background noise for calls",
    },
  },
  {
    id: "garden-study-lounge",
    name: "Garden Study Lounge",
    location: "Arts Building · Ground Floor",
    imageLabel: "Lounge",
    crowding: "Open now",
    crowdingClass: "open",
    rating: "4.5",
    attributes: ["Quiet", "Natural light", "Outlets"],
    matches: {
      "deep-focus": "Quiet with natural light",
      "group-project": "Comfortable for small group work",
      "quick-laptop": "Calm spot for a quick session",
      "online-meeting": "Peaceful space for online meetings",
    },
  },
];
