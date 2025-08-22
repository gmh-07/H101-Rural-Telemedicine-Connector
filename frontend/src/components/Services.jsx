import { Link } from "react-router-dom";
import "./services.css";

const servicesData = [
  {
    key: "video",
    title: "Video Consultations",
    desc: "Face-to-face consultations with licensed doctors from the comfort of your home.",
    points: ["HD video quality", "Screen sharing", "Medical record access"],
    emoji: "📹",
    to: "/services/video",
  },
  {
    key: "chat",
    title: "Secure Chat",
    desc: "Instant messaging with healthcare providers for quick questions and follow-ups.",
    points: ["HIPAA compliant", "File sharing", "Message history"],
    emoji: "💬",
    to: "/services/chat",
  },
  {
    key: "appointments",
    title: "Appointment Scheduling",
    desc: "Easy online booking system with flexible scheduling options.",
    points: ["Calendar integration", "Reminder notifications", "Rescheduling options"],
    emoji: "🗓️",
    to: "/services/appointments",
  },
  {
    key: "symptoms",
    title: "Symptom Checker",
    desc: "AI-powered initial assessment to help guide your healthcare decisions.",
    points: ["Guided questionnaires", "Risk assessment", "Doctor recommendations"],
    emoji: "🩺",
    to: "/services/symptom-checker",
  },
];

export default function Services() {
  return (
    <section aria-labelledby="services-heading" className="services">
      <div className="services__bg" aria-hidden="true" />
      <div className="services__container">
        <header className="services__header">
          <h2 id="services-heading" className="services__title">
            Comprehensive Telemedicine Services
          </h2>
          <p className="services__subtitle">
            Everything needed for remote healthcare, designed for rural communities.
          </p>
        </header>

        <div className="services__grid">
          {servicesData.map((s) => (
            <article key={s.key} className="services-card">
              <div className="services-card__icon" aria-hidden="true">
                <span role="img" aria-label={`${s.title} icon`}>{s.emoji}</span>
              </div>

              <h3 className="services-card__title">
                <Link
                  to={s.to}
                  aria-label={`Learn more about ${s.title}`}
                  className="services-card__titleLink"
                />
                {s.title}
              </h3>

              <p className="services-card__desc">{s.desc}</p>

              <ul className="services-card__list">
                {s.points.map((pt, i) => (
                  <li key={i} className="services-card__listItem">
                    <span className="services-card__dot" aria-hidden="true" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="services-card__cta">
                <Link to={s.to} className="services-btn services-btn--ghost">
                  Learn More <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
