import { Map, MapPin } from "lucide-react";

export function MapPlaceholder() {
  return (
    <div className="panel map-panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">Around campus</h2>
          <p className="page-subtitle">3 spots match your needs</p>
        </div>

        <button className="icon-button" aria-label="Open map view" type="button">
          <Map size={18} strokeWidth={1.8} />
        </button>
      </div>

      <div className="map-placeholder">
        <div className="map-road one" />
        <div className="map-road two" />
        <div className="map-road three" />

        <span className="map-label library">Central Library</span>
        <span className="map-label student-center">Student Center</span>

        <div className="map-pin green pin-one">
          <MapPin size={16} fill="currentColor" />
        </div>

        <div className="map-pin yellow pin-two">
          <MapPin size={16} fill="currentColor" />
        </div>

        <div className="map-pin green pin-three">
          <MapPin size={16} fill="currentColor" />
        </div>

        <div className="map-legend">
          <div className="legend-item">
            <span className="status-dot open" />
            Open
          </div>

          <div className="legend-item">
            <span className="status-dot filling" />
            Filling up
          </div>

          <div className="legend-item">
            <span className="status-dot full" />
            Busy
          </div>
        </div>
      </div>
    </div>
  );
}
