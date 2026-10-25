import {
  ArrowRight,
  BookOpen,
  Check,
  Mail,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-visual">
        <div className="login-brand">
          <div className="brand-mark">S</div>
          <span className="brand-name">StudySpot</span>
        </div>

        <div className="login-visual-content">
          <p className="eyebrow">Your campus, made easier</p>

          <h1 className="login-visual-title">
            Find the right study spot, not just an available one.
          </h1>

          <p className="login-visual-description">
            Discover spaces that match your focus, group work, Wi-Fi, outlet,
            and noise preferences.
          </p>

          <div className="login-benefits">
            <div className="login-benefit">
              <div className="login-benefit-icon">
                <BookOpen size={17} />
              </div>

              <div>
                <p className="login-benefit-title">Study spaces that fit</p>
                <p className="login-benefit-text">
                  Find quiet corners, collaborative tables, and laptop-friendly
                  spaces.
                </p>
              </div>
            </div>

            <div className="login-benefit">
              <div className="login-benefit-icon">
                <ShieldCheck size={17} />
              </div>

              <div>
                <p className="login-benefit-title">Trusted by students</p>
                <p className="login-benefit-text">
                  Read current ratings and real student experiences.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="login-footer-note">
          Built for better study days.
        </p>
      </section>

      <section className="login-form-section">
        <div className="login-form-container">
          <div className="login-mobile-brand">
            <div className="brand-mark">S</div>
            <span className="brand-name">StudySpot</span>
          </div>

          <div className="login-heading">
            <p className="eyebrow">Welcome back</p>
            <h2>Sign in to your campus.</h2>
            <p>
              Use your school email to continue to your personalized study
              spaces.
            </p>
          </div>

          <form className="login-form">
            <label className="form-label" htmlFor="school-email">
              School email
            </label>

            <div className="input-wrapper">
              <Mail size={17} strokeWidth={1.8} />
              <input
                id="school-email"
                name="school-email"
                placeholder="you@university.edu"
                type="email"
              />
            </div>

            <button className="ui-button ui-button-primary login-submit" type="submit">
              Continue with email
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="login-divider">
            <span>or</span>
          </div>

          <button className="ui-button ui-button-secondary sso-button" type="button">
            <ShieldCheck size={16} />
            Continue with university SSO
          </button>

          <div className="login-info">
            <Check size={15} />
            <p>
              Your school email helps keep ratings useful and trustworthy for
              everyone.
            </p>
          </div>

          <p className="login-switch">
            New to StudySpot?{" "}
            <Link href="/discover">Explore as a guest</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
