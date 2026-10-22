import {
  Bookmark,
  Home,
  Settings,
  Star,
  UserRound,
} from "lucide-react";

const navigationItems = [
  { label: "Discover", icon: Home, active: true },
  { label: "Saved spots", icon: Bookmark, active: false },
  { label: "My reviews", icon: Star, active: false },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">S</div>
        <span className="brand-name">StudySpot</span>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-label">Workspace</p>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <a
                className={`sidebar-link ${item.active ? "active" : ""}`}
                href="#"
                key={item.label}
              >
                <Icon size={17} strokeWidth={1.8} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-label">Account</p>

        <nav className="sidebar-nav" aria-label="Account navigation">
          <a className="sidebar-link" href="#">
            <UserRound size={17} strokeWidth={1.8} />
            <span>Profile</span>
          </a>

          <a className="sidebar-link" href="#">
            <Settings size={17} strokeWidth={1.8} />
            <span>Settings</span>
          </a>
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="profile-summary">
          <div className="avatar">AM</div>

          <div>
            <p className="profile-name">Alex Morgan</p>
            <p className="profile-school">Westbridge University</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
