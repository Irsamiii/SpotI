import { Search, SlidersHorizontal } from "lucide-react";

import { TaskChips } from "@/components/filters/TaskChips";
import { Sidebar } from "@/components/navigation/Sidebar";
import { MapPlaceholder } from "@/components/spots/MapPlaceholder";
import { SpotCard } from "@/components/spots/SpotCard";

const spots = [
  {
    name: "Main Library — 3rd Floor",
    location: "Central Library · 3rd Floor",
    match: "Best match for Deep Focus",
    imageLabel: "Quiet zone",
    crowding: "Open now",
    crowdingClass: "open" as const,
    rating: "4.8",
  },
  {
    name: "Innovation Hub",
    location: "Student Center · North Wing",
    match: "Great for focused laptop work",
    imageLabel: "Collaborative",
    crowding: "Filling up",
    crowdingClass: "filling" as const,
    rating: "4.6",
  },
  {
    name: "Garden Study Lounge",
    location: "Arts Building · Ground Floor",
    match: "Quiet with natural light",
    imageLabel: "Lounge",
    crowding: "Open now",
    crowdingClass: "open" as const,
    rating: "4.5",
  },
];

export default function HomePage() {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <div className="page-container">
          <header className="topbar">
            <div>
              <p className="eyebrow">Thursday, October 22</p>

              <h1 className="page-title">Find your study spot.</h1>

              <p className="page-subtitle">
                Tell us what you need today and we&apos;ll find the right space
                for you.
              </p>
            </div>

            <div className="topbar-actions">
              <button className="icon-button" aria-label="Search" type="button">
                <Search size={18} strokeWidth={1.8} />
              </button>

              <button
                className="icon-button"
                aria-label="Adjust filters"
                type="button"
              >
                <SlidersHorizontal size={18} strokeWidth={1.8} />
              </button>
            </div>
          </header>

          <TaskChips />

          <section className="content-grid">
            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2 className="panel-title">Recommended for you</h2>

                  <p className="page-subtitle">
                    Based on your Deep Focus preferences
                  </p>
                </div>

                <a className="panel-link" href="#">
                  View all
                </a>
              </div>

              <div className="spot-list">
                {spots.map((spot) => (
                  <SpotCard key={spot.name} {...spot} />
                ))}
              </div>
            </div>

            <MapPlaceholder />
          </section>
        </div>
      </main>
    </div>
  );
}
