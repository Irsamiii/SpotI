import {
  Heart,
  Star,
  Volume2,
  Wifi,
  Zap,
} from "lucide-react";

type SpotCardProps = {
  name: string;
  location: string;
  match: string;
  imageLabel: string;
  crowding: string;
  crowdingClass: "open" | "filling" | "full";
  rating: string;
};

export function SpotCard({
  name,
  location,
  match,
  imageLabel,
  crowding,
  crowdingClass,
  rating,
}: SpotCardProps) {
  return (
    <article className="spot-card">
      <div className="spot-image">
        <span className="spot-image-label">{imageLabel}</span>
      </div>

      <div className="spot-details">
        <div className="spot-topline">
          <div>
            <h3 className="spot-name">{name}</h3>
            <p className="spot-location">{location}</p>
          </div>

          <button
            className="favorite-button"
            aria-label={`Save ${name}`}
            type="button"
          >
            <Heart size={17} strokeWidth={1.8} />
          </button>
        </div>

        <p className="spot-match">{match}</p>

        <div className="spot-attributes">
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
            {rating}
          </span>
        </div>

        <div className="crowding">
          <span className={`status-dot ${crowdingClass}`} />
          {crowding}
        </div>
      </div>
    </article>
  );
}
