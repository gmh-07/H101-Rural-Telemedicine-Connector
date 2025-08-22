import { Link } from "react-router-dom";
import "./HowItWorks.css";

const steps = [
  {
    key: "01",
    title: "Create Account",
    desc:
      "Sign up with your basic information and medical history. Quick and secure registration process.",
    emoji: "👤➕", // swap with SVG if desired
  },
  {
    key: "02",
    title: "Schedule Appointment",
    desc:
      "Choose your preferred doctor and time slot. Same-day appointments often available.",
    emoji: "📅",
  },
  {
    key: "03",
    title: "Video Consultation",
    desc:
      "Connect with your doctor via secure video call. Discuss symptoms and receive professional care.",
    emoji: "📹",
  },
  {
    key: "04",
    title: "Follow-up Care",
    desc:
      "Receive prescriptions, care plans, and follow-up instructions. Access your records anytime.",
    emoji: "🧾",
  },
];

export default function HowItWorks() {
  return (
    <section className="howit" aria-labelledby="howit-heading">
      <div className="howit__container">
        <header className="howit__header">
          <h2 id="howit-heading" className="howit__title">How It Works</h2>
          <p className="howit__subtitle">
            Getting healthcare has never been easier. Start your consultation in just 4 simple steps.
          </p>
        </header>

        <div className="howit__grid" role="list">
          {steps.map((s, i) => (
            <article key={s.key} className="howit-card" role="listitem">
              <div className="howit-card__icon" aria-hidden="true">
                <span className="howit-card__iconGrad" />
                <span className="howit-card__iconGlyph" role="img" aria-label={s.title}>
                  {s.emoji}
                </span>
              </div>

              <div className="howit-card__badge" aria-hidden="true">
                {s.key}
              </div>

              <h3 className="howit-card__title">{s.title}</h3>
              <p className="howit-card__desc">{s.desc}</p>

              {/* Divider line to next card on large screens (hide after last) */}
              {i < steps.length - 1 && <span className="howit-card__divider" aria-hidden="true" />}
            </article>
          ))}
        </div>

        <div className="howit__ctaWrap">
          <Link to="/get-started" className="howit-btn howit-btn--primary">
            Get Started Today
          </Link>
        </div>
      </div>
    </section>
  );
}
