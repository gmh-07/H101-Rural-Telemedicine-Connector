import { Link } from "react-router-dom";
import "./Doctors.css";

const doctorsData = [
  {
    initials: "DSJ",
    name: "Dr. Sarah Johnson",
    specialty: "Family Medicine",
    rating: 4.9,
    reviews: 324,
    experience: "15+ years experience",
    licensed: "Licensed in 12 states",
    availability: "Available today",
    availabilityType: "now", // now | time
    nextTime: null,
    education: "Johns Hopkins University",
    languages: ["English", "Spanish"],
    bookTo: "/book/sarah-johnson",
    profileTo: "/doctors/sarah-johnson",
  },
  {
    initials: "DMC",
    name: "Dr. Michael Chen",
    specialty: "Internal Medicine",
    rating: 4.8,
    reviews: 267,
    experience: "12+ years experience",
    licensed: "Licensed in 8 states",
    availability: "Next available: 2:30 PM",
    availabilityType: "time",
    nextTime: "2:30 PM",
    education: "Harvard Medical School",
    languages: ["English", "Mandarin"],
    bookTo: "/book/michael-chen",
    profileTo: "/doctors/michael-chen",
  },
  {
    initials: "DER",
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    rating: 4.9,
    reviews: 198,
    experience: "10+ years experience",
    licensed: "Licensed in 15 states",
    availability: "Available today",
    availabilityType: "now",
    nextTime: null,
    education: "Stanford University",
    languages: ["English", "Spanish", "Portuguese"],
    bookTo: "/book/emily-rodriguez",
    profileTo: "/doctors/emily-rodriguez",
  },
];

export default function Doctors() {
  return (
    <section className="doctors" aria-labelledby="doctors-heading">
      <div className="doctors__bg" aria-hidden="true" />
      <div className="doctors__container">
        <header className="doctors__header">
          <h2 id="doctors-heading" className="doctors__title">
            Meet Our Expert Doctors
          </h2>
          <p className="doctors__subtitle">
            Board-certified physicians from top medical schools, ready to provide you with excellent care.
          </p>
        </header>

        <div className="doctors__grid">
          {doctorsData.map((d, idx) => (
            <article key={idx} className="doctors-card">
              {/* Avatar */}
              <div className="doctors-card__avatar" aria-hidden="true">
                <span className="doctors-card__avatarGrad" />
                <span className="doctors-card__avatarTxt">{d.initials}</span>
              </div>

              {/* Name */}
              <h3 className="doctors-card__name">{d.name}</h3>

              {/* Specialty */}
              <Link to={`/specialty/${encodeURIComponent(d.specialty.toLowerCase())}`} className="doctors-card__spec">
                {d.specialty}
              </Link>

              {/* Rating */}
              <div className="doctors-card__rating" aria-label={`Rating ${d.rating} out of 5`}>
                <span className="doctors-card__star" aria-hidden="true">★</span>
                <span className="doctors-card__ratingNum">{d.rating.toFixed(1)}</span>
                <span className="doctors-card__reviews">({d.reviews} reviews)</span>
              </div>

              {/* Facts list */}
              <ul className="doctors-card__facts">
                <li className="doctors-card__fact">
                  <span className="doctors-card__icon" aria-hidden="true">🎓</span>
                  <span>{d.experience}</span>
                </li>
                <li className="doctors-card__fact">
                  <span className="doctors-card__icon" aria-hidden="true">🛡️</span>
                  <span>{d.licensed}</span>
                </li>
                <li
                  className={`doctors-card__fact ${d.availabilityType === "now" ? "is-available" : "is-next"}`}
                >
                  <span className="doctors-card__icon" aria-hidden="true">⏰</span>
                  <span>{d.availability}</span>
                </li>
              </ul>

              {/* Education */}
              <div className="doctors-card__edu">
                <span className="doctors-card__eduLabel">Education:</span>{" "}
                <span className="doctors-card__eduVal">{d.education}</span>
              </div>

              {/* Languages */}
              <div className="doctors-card__langs">
                {d.languages.map((lang) => (
                  <span key={lang} className="doctors-chip">{lang}</span>
                ))}
              </div>

              {/* CTAs */}
              <div className="doctors-card__ctas">
                <Link to={d.bookTo} className="doctors-btn doctors-btn--primary">Book Now</Link>
                <Link to={d.profileTo} className="doctors-btn doctors-btn--ghost">View Profile</Link>
              </div>
            </article>
          ))}
        </div>

        <div className="doctors__footer">
          <Link to="/doctors" className="doctors-btn doctors-btn--soft">View All Doctors</Link>
        </div>
      </div>
    </section>
  );
}
