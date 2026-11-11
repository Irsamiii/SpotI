"use client";

import {
  Heart,
  Star,
  Volume2,
  Wifi,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { useFavorites } from "@/components/layout/FavoritesProvider";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Spot, TaskType } from "@/types/spot";

type SpotCardProps = {
  spot: Spot;
  selectedTask: TaskType;
};

export function SpotCard({
  spot,
  selectedTask,
}: SpotCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(spot.id);

  return (
    <article className="spot-card">
      <div className="spot-image">
        <span className="spot-image-label">
          {spot.imageLabel}
        </span>
      </div>

      <div className="spot-details">
        <div className="spot-topline">
          <div>
            <Link
              className="spot-card-link"
              href={`/spots/${spot.id}`}
            >
              <h3 className="spot-name">{spot.name}</h3>

              <p className="spot-location">
                {spot.location}
              </p>
            </Link>
          </div>

          <button
            className={`favorite-button ${
              saved ? "saved" : ""
            }`}
            aria-label={
              saved
                ? `Remove ${spot.name} from saved spots`
                : `Save ${spot.name}`
            }
            aria-pressed={saved}
            onClick={() => toggleFavorite(spot.id)}
            type="button"
          >
            <Heart
              size={17}
              fill={saved ? "currentColor" : "none"}
              strokeWidth={1.8}
            />
          </button>
        </div>

        <p className="spot-match">
          {spot.matches[selectedTask]}
        </p>

        <div className="spot-attributes">
          <span className="attribute">
            <Volume2 size={13} />
            {spot.attributes[0]}
          </span>

          <span className="attribute">
            <Wifi size={13} />
            {spot.attributes[1]}
          </span>

          <span className="attribute">
            <Zap size={13} />
            {spot.attributes[2]}
          </span>

          <span className="attribute">
            <Star size={13} />
            {spot.rating}
          </span>
        </div>

        <div className="spot-status-row">
          <StatusBadge
            status={spot.crowdingClass}
            label={spot.crowding}
          />
        </div>
      </div>
    </article>
  );
}
