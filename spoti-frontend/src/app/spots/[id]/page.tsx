import {
  ArrowLeft,
  Clock3,
  ExternalLink,
  Heart,
  MapPin,
  MessageCircle,
  Navigation,
  PlugZap,
  Star,
  Users,
  Volume2,
  Wifi,
} from "lucide-react";
import Link from "next/link";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { spots } from "@/data/spots";

type SpotDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const reviews = [
  {
    name: "Maya R.",
    initials: "MR",
    date: "2 days ago",
    rating: "5.0",
    text: "Very quiet in the morning and there were plenty of outlets near the windows.",
  },
  {
    name: "Jordan K.",
    initials: "JK",
    date: "5 days ago",
    rating: "4.5",
    text: "Good Wi-Fi and comfortable desks. It becomes more crowded after 3pm.",
  },
];

export default async function SpotDetailsPage({
  params,
}: SpotDetailsPageProps) {
  const { id } = await params;
  const spot = spots.find((item) => item.id === id);

  if (!spot) {
    return (
      <main className="simple-page">
        <div className="simple-page-container">
          <Link className="back-link" href="/discover">
            <ArrowLeft size={15} />
            Back to Discover
          </Link>

          <section className="empty-state">
            <div className="empty-state-icon">
              <MapPin size={23} />
            </div>

            <h2>Study spot not found</h2>

            <p>
              This study spot may have been removed or the link may be
              incorrect.
            </p>

            <Link className="ui-button ui-button-primary" href="/discover">
              Return to Discover
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="simple-page spot-detail-page">
      <div className="simple-page-container">
        <Link className="back-link" href="/discover">
          <ArrowLeft size={15} />
          Back to Discover
        </Link>

        <section className="spot-detail-hero">
          <div className="spot-detail-gallery">
            <div className="spot-detail-main-image">
              <span className="spot-image-label">{spot.imageLabel}</span>
            </div>

            <div className="spot-detail-small-image image-two" />
            <div className="spot-detail-small-image image-three" />
          </div>

          <div className="spot-detail-summary">
            <div className="spot-detail-heading">
              <div>
                <p className="eyebrow">Study spot</p>
                <h1 className="page-title">{spot.name}</h1>

                <p className="spot-detail-location">
                  <MapPin size={15} />
                  {spot.location}
                </p>
              </div>

              <button
                className="icon-button"
                aria-label={`Save ${spot.name}`}
                type="button"
              >
                <Heart size={18} />
              </button>
            </div>

            <div className="spot-detail-rating">
              <span className="rating-star">
                <Star size={15} fill="currentColor" />
              </span>

              <strong>{spot.rating}</strong>
              <span>· 48 student ratings</span>
            </div>

            <p className="spot-detail-description">
              A student-recommended study space with a calm atmosphere,
              dependable Wi-Fi, and convenient access to power outlets.
            </p>

            <div className="spot-detail-actions">
              <button className="ui-button ui-button-primary" type="button">
                <Navigation size={15} />
                Get directions
              </button>

              <button className="ui-button ui-button-secondary" type="button">
                <MessageCircle size={15} />
                Rate this spot
              </button>
            </div>
          </div>
        </section>

        <section className="spot-detail-grid">
          <div className="spot-detail-main-column">
            <div className="detail-panel">
              <div className="detail-panel-heading">
                <div>
                  <h2>What students say</h2>
                  <p>Recent information from the StudySpot community.</p>
                </div>

                <StatusBadge
                  status={spot.crowdingClass}
                  label={spot.crowding}
                />
              </div>

              <div className="spot-attribute-grid">
                <div className="detail-attribute">
                  <div className="detail-attribute-icon">
                    <Volume2 size={17} />
                  </div>

                  <div>
                    <p>Noise level</p>
                    <strong>Quiet</strong>
                  </div>
                </div>

                <div className="detail-attribute">
                  <div className="detail-attribute-icon">
                    <Wifi size={17} />
                  </div>

                  <div>
                    <p>Wi-Fi quality</p>
                    <strong>Strong</strong>
                  </div>
                </div>

                <div className="detail-attribute">
                  <div className="detail-attribute-icon">
                    <PlugZap size={17} />
                  </div>

                  <div>
                    <p>Outlets</p>
                    <strong>Available</strong>
                  </div>
                </div>

                <div className="detail-attribute">
                  <div className="detail-attribute-icon">
                    <Users size={17} />
                  </div>

                  <div>
                    <p>Typical crowding</p>
                    <strong>Low today</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-panel">
              <div className="detail-panel-heading">
                <div>
                  <h2>Student reviews</h2>
                  <p>What students experienced recently.</p>
                </div>

                <button className="text-button" type="button">
                  See all reviews
                </button>
              </div>

              <div className="review-list">
                {reviews.map((review) => (
                  <article className="review-item" key={review.name}>
                    <div className="review-avatar">{review.initials}</div>

                    <div className="review-content">
                      <div className="review-topline">
                        <div>
                          <p className="review-name">{review.name}</p>
                          <p className="review-date">{review.date}</p>
                        </div>

                        <span className="review-rating">
                          <Star size={12} fill="currentColor" />
                          {review.rating}
                        </span>
                      </div>

                      <p className="review-text">{review.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <aside className="spot-detail-side-column">
            <div className="detail-panel">
              <div className="detail-panel-heading">
                <div>
                  <h2>Location & hours</h2>
                  <p>Plan your study session.</p>
                </div>
              </div>

              <div className="mini-location-map">
                <MapPin size={25} fill="currentColor" />
                <span>Central campus</span>
              </div>

              <div className="hours-row">
                <Clock3 size={16} />
                <div>
                  <p>Today&apos;s hours</p>
                  <strong>8:00 AM — 10:00 PM</strong>
                </div>
              </div>

              <a
                className="directions-link"
                href="https://www.google.com/maps"
                rel="noreferrer"
                target="_blank"
              >
                Open in Google Maps
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="detail-panel verification-panel">
              <div className="verification-icon">
                <Star size={17} />
              </div>

              <div>
                <h2>Last verified recently</h2>
                <p>
                  Study conditions were last confirmed by a student 2 days ago.
                </p>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
