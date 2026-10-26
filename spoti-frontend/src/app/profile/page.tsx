import {
  ArrowLeft,
  Bell,
  Check,
  ChevronRight,
  Mail,
  MapPin,
  Pencil,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <main className="simple-page">
      <div className="simple-page-container">
        <header className="simple-page-header">
          <div>
            <p className="eyebrow">Your account</p>
            <h1 className="page-title">Profile & settings</h1>
            <p className="page-subtitle">
              Manage your account and study preferences.
            </p>
          </div>

          <Link className="back-link" href="/discover">
            <ArrowLeft size={15} />
            Back to Discover
          </Link>
        </header>

        <section className="profile-grid">
          <article className="profile-card profile-overview">
            <div className="large-avatar">AM</div>

            <div className="profile-overview-content">
              <div className="profile-card-heading">
                <div>
                  <h2>Alex Morgan</h2>
                  <p>Westbridge University</p>
                </div>

                <button className="icon-button" aria-label="Edit profile" type="button">
                  <Pencil size={16} />
                </button>
              </div>

              <div className="profile-detail">
                <Mail size={15} />
                <span>alex.morgan@westbridge.edu</span>
              </div>

              <div className="profile-detail">
                <MapPin size={15} />
                <span>Westbridge University campus</span>
              </div>

              <div className="verified-label">
                <ShieldCheck size={14} />
                Verified student account
              </div>
            </div>
          </article>

          <article className="profile-card">
            <div className="profile-section-heading">
              <div className="profile-section-icon">
                <UserRound size={17} />
              </div>

              <div>
                <h2>Study preferences</h2>
                <p>Used to personalize your recommendations.</p>
              </div>
            </div>

            <div className="preference-list">
              <div className="preference-row">
                <div>
                  <p className="preference-title">Usual study task</p>
                  <p className="preference-value">Deep focus</p>
                </div>

                <ChevronRight size={17} />
              </div>

              <div className="preference-row">
                <div>
                  <p className="preference-title">Preferred noise level</p>
                  <p className="preference-value">Quiet or silent</p>
                </div>

                <ChevronRight size={17} />
              </div>

              <div className="preference-row">
                <div>
                  <p className="preference-title">Outlet requirement</p>
                  <p className="preference-value">Prefer available outlets</p>
                </div>

                <ChevronRight size={17} />
              </div>
            </div>
          </article>

          <article className="profile-card">
            <div className="profile-section-heading">
              <div className="profile-section-icon">
                <Bell size={17} />
              </div>

              <div>
                <h2>Notifications</h2>
                <p>Choose what updates you would like to receive.</p>
              </div>
            </div>

            <div className="preference-list">
              <div className="preference-row">
                <div>
                  <p className="preference-title">Favorite spot updates</p>
                  <p className="preference-value">When a saved spot is less crowded</p>
                </div>

                <span className="toggle toggle-on">
                  <span />
                </span>
              </div>

              <div className="preference-row">
                <div>
                  <p className="preference-title">Review reminders</p>
                  <p className="preference-value">After visiting a study spot</p>
                </div>

                <span className="toggle">
                  <span />
                </span>
              </div>
            </div>
          </article>

          <article className="profile-card account-status-card">
            <div className="account-status-icon">
              <Check size={18} />
            </div>

            <div>
              <h2>Your account is ready</h2>
              <p>
                Your preferences will help StudySpot recommend better spaces
                for your next study session.
              </p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
