"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { TaskChips } from "@/components/filters/TaskChips";
import { Sidebar } from "@/components/navigation/Sidebar";
import { MapPlaceholder } from "@/components/spots/MapPlaceholder";
import { SpotCard } from "@/components/spots/SpotCard";
import { spots } from "@/data/spots";
import type { TaskType } from "@/types/spot";

const taskLabels: Record<TaskType, string> = {
  "deep-focus": "Deep Focus",
  "group-project": "Group Project",
  "quick-laptop": "Quick Laptop Session",
  "online-meeting": "Online Meeting",
};

export default function HomePage() {
  const [selectedTask, setSelectedTask] =
    useState<TaskType>("deep-focus");

  const selectedTaskLabel = taskLabels[selectedTask];

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <div className="page-container">
          <header className="topbar">
            <div>
              <p className="eyebrow">Thursday, October 22</p>

              <h1 className="page-title">
                Find your study spot.
              </h1>

              <p className="page-subtitle">
                Tell us what you need today and we&apos;ll find the
                right space for you.
              </p>
            </div>

            <div className="topbar-actions">
              <button
                className="icon-button"
                aria-label="Search"
                type="button"
              >
                <Search size={18} strokeWidth={1.8} />
              </button>

              <button
                className="icon-button"
                aria-label="Adjust filters"
                type="button"
              >
                <SlidersHorizontal
                  size={18}
                  strokeWidth={1.8}
                />
              </button>
            </div>
          </header>

          <TaskChips
            selectedTask={selectedTask}
            onTaskChange={setSelectedTask}
          />

          <section className="content-grid">
            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2 className="panel-title">
                    Recommended for you
                  </h2>

                  <p className="page-subtitle">
                    Based on your {selectedTaskLabel} preferences
                  </p>
                </div>

                <a className="panel-link" href="#">
                  View all
                </a>
              </div>

              <div className="spot-list">
                {spots.map((spot) => (
                  <SpotCard
                    key={spot.id}
                    spot={spot}
                    selectedTask={selectedTask}
                  />
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
