"use client";

import {
  ArrowRight,
  Bookmark,
  Heart,
  MapPin,
  Star,
  Volume2,
  Wifi,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { useFavorites } from "@/components/layout/FavoritesProvider";
import { spots } from "@/data/spots";

export default function FavoritesPage() {
  const { favoriteIds, toggleFavorite } = useFavorites();

  const savedSpots = spots.filter((spot) =>
    favoriteIds.includes(spot.id),
  );

  return (
    <main className="simple-page">
      <div className="simple-page-container">
        <header className="simple-page-header">
          <div>
            <p className="eyebrow">Your collection</p>
            <h1 className="page-title">Saved spots</h1>
            <p className="page-subtitle">
              Keep your favorite study spaces close by.
            </p>
          </div>

          <Link
            className="ui-button ui-button-secondary"
            href="/discover"
          >
            Discover spots
            <ArrowRight size={15} />
          </Link>
        </header>

        {savedSpots.length > 0 ? (
          <section className="saved-spots-grid">
            {savedSpots.map((spot) => (
              <article
                className="saved-spot-card"
                key={spot.id}
              >
                <div className="saved-spot-image">
                  <Bookmark size={24} />
                </div>

                <div className="saved-spot-content">
                  <div className="saved-spot-heading">
                    <div>
                      <Link
                        className="spot-card-link"
                        href={`/spots/${spot.id}`}
                      >
                        <p className="spot-name">
                          {spot.name}
                        </p>

                        <p className="spot-location">
                          <MapPin size={12} />
                          {spot.location}
                        </p>
                      </Link>
                    </div>

                    <button
                      className="favorite-button saved-heart"
                      aria-label={`Remove ${spot.name} from saved spots`}
                      aria-pressed="true"
                      onClick={() => toggleFavorite(spot.id)}
                      type="button"
                    >
                      <Heart
                        size={17}
                        fill="currentColor"
                      />
                    </button>
                  </div>

                  <p className="saved-spot-description">
                    A student-recommended study space with useful
                    facilities for your next session.
                  </p>

                  <div className="spot-attributes saved-spot-attributes">
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

                  <div className="saved-spot-footer">
                    <span
                      className={`saved-status ${spot.crowdingClass}`}
                    >
                      <span className="status-dot" />
                      {spot.crowding}
                    </span>

                    <Link
                      className="text-button"
                      href={`/spots/${spot.id}`}
                    >
                      View details
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="empty-state">
            <div className="empty-state-icon">
              <Bookmark size={23} />
            </div>

            <h2>No saved spots yet</h2>

            <p>
              Save a study spot from the Discover page and it will
              appear here.
            </p>

            <Link
              className="ui-button ui-button-primary"
              href="/discover"
            >
              Find a study spot
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
