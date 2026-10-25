import {
  Bookmark,
  Home,
  Settings,
  Star,
  UserRound,
} from "lucide-react";
import Link from "next/link";


const navigationItems = [
  {
    label: "Discover",
    icon: Home,
    active: true,
    href: "/discover",
  },
  {
    label: "Saved spots",
    icon: Bookmark,
    active: false,
    href: "/favorites",
  },
  {
    label: "My reviews",
    icon: Star,
    active: false,
    href: "/profile",
  },
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
              <Link
              className={`sidebar-link ${item.active ? "active" : ""}`}
              href={item.href}
              key={item.label}
              >

                <Icon size={17} strokeWidth={1.8} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-label">Account</p>

        <nav className="sidebar-nav" aria-label="Account navigation">
          <Link className="sidebar-link" href="/profile">
  <UserRound size={17} strokeWidth={1.8} />
  <span>Profile</span>
</Link>

<Link className="sidebar-link" href="/profile">
  <Settings size={17} strokeWidth={1.8} />
  <span>Settings</span>
</Link>

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
