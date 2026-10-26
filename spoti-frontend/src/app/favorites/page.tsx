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

const savedSpots = [
  {
    name: "Main Library — 3rd Floor",
    location: "Central Library · 3rd Floor",
    description: "A quiet space with reliable outlets and strong Wi-Fi.",
    status: "Open now",
    statusClass: "open",
    rating: "4.8",
  },
  {
    name: "Garden Study Lounge",
    location: "Arts Building · Ground Floor",
    description: "Natural light, comfortable seating, and a calm atmosphere.",
    status: "Open now",
    statusClass: "open",
    rating: "4.5",
  },
];

export default function FavoritesPage() {
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

          <Link className="ui-button ui-button-secondary" href="/discover">
            Discover spots
            <ArrowRight size={15} />
          </Link>
        </header>

        {savedSpots.length > 0 ? (
          <section className="saved-spots-grid">
            {savedSpots.map((spot) => (
              <article className="saved-spot-card" key={spot.name}>
                <div className="saved-spot-image">
                  <Bookmark size={24} />
                </div>

                <div className="saved-spot-content">
                  <div className="saved-spot-heading">
                    <div>
                      <p className="spot-name">{spot.name}</p>

                      <p className="spot-location">
                        <MapPin size={12} />
                        {spot.location}
                      </p>
                    </div>

                    <button
                      className="favorite-button saved-heart"
                      aria-label={`Remove ${spot.name} from saved spots`}
                      type="button"
                    >
                      <Heart size={17} fill="currentColor" />
                    </button>
                  </div>

                  <p className="saved-spot-description">
                    {spot.description}
                  </p>

                  <div className="spot-attributes saved-spot-attributes">
                    <span className="attribute">
                      <Volume2 size={13} />
                      Quiet
                    </span>

                    <span className="attribute">
                      <Wifi size={13} />
                      Strong Wi-Fi
                    </span>

                    <span className="attribute">
                      <Zap size={13} />
                      Outlets
                    </span>

                    <span className="attribute">
                      <Star size={13} />
                      {spot.rating}
                    </span>
                  </div>

                  <div className="saved-spot-footer">
                    <span className={`saved-status ${spot.statusClass}`}>
                      <span className="status-dot" />
                      {spot.status}
                    </span>

                    <button className="text-button" type="button">
                      View details
                      <ArrowRight size={14} />
                    </button>
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
              Save a study spot from the Discover page and it will appear here.
            </p>

            <Link className="ui-button ui-button-primary" href="/discover">
              Find a study spot
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
