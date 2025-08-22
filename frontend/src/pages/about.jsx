import React from "react";
import "./about.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const About = () => {
  return (
    <>
    <Navbar/>
    <main className="about">
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1>About HealthCare+</h1>
            <p>
              Modern healthcare for everyone—connecting patients, doctors, labs,
              and pharmacies on one secure platform.
            </p>
          </div>
          <div className="hero-media">
            <img
              src="https://cdn.prod.website-files.com/650c1bee516c4e723b11b29a/65206264927e177f8bd65950_651f6a5b0bcc2eb5956182ea_Top%252050%2520Healthcare%2520Companies%2520and%2520Their%2520Impact%2520on%2520the%2520Industry.webp"
              alt="Healthcare professionals collaborating"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="about-block">
        <div className="container grid-3">
          <div className="card">
            <h3>Our Mission</h3>
            <p>
              To deliver compassionate, data‑driven care—anytime, anywhere—by
              simplifying access to clinicians, diagnostics, and medicines.
            </p>
          </div>
          <div className="card">
            <h3>Our Vision</h3>
            <p>
              A world where every individual can navigate their health journey
              confidently with seamless digital and in‑person care.
            </p>
          </div>
          <div className="card">
            <h3>Our Values</h3>
            <ul className="values">
              <li>Patient-first</li>
              <li>Privacy & trust</li>
              <li>Clinical excellence</li>
              <li>Accessibility</li>
              <li>Continuous improvement</li>
            </ul>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="about-block">
        <div className="container grid-2">
          <div>
            <h2>What We Do</h2>
            <p>
              HealthCare+ unifies appointments, e‑consults, lab booking, pharmacy
              orders, and electronic medical records. From preventive care to
              chronic condition management, we streamline every step with clear
              communication and secure data.
            </p>
            <ul className="checklist">
              <li>Online and in‑clinic appointments</li>
              <li>At‑home lab sample collection</li>
              <li>Medicine delivery and refills</li>
              <li>EMR with encrypted storage</li>
              <li>Care programs for diabetes, cardiac and more</li>
              <li>Mental health and wellness coaching</li>
            </ul>
          </div>
          <div className="feature-card">
            <h4>Why patients choose us</h4>
            <ul className="bullets">
              <li>Fast access to verified doctors</li>
              <li>Transparent pricing and clear instructions</li>
              <li>24×7 support and emergency guidance</li>
              <li>Privacy by design and strict compliance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="container grid-4">
          <div className="stat">
            <span className="num">1M+</span>
            <span className="label">Patients served</span>
          </div>
          <div className="stat">
            <span className="num">10k+</span>
            <span className="label">Doctors & specialists</span>
          </div>
          <div className="stat">
            <span className="num">2k+</span>
            <span className="label">Partner labs & hospitals</span>
          </div>
          <div className="stat">
            <span className="num">24×7</span>
            <span className="label">Care & support</span>
          </div>
        </div>
      </section>

      {/* Team highlight */}
      <section className="about-block">
        <div className="container grid-2">
          <div className="team-media">
            <img
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop"
              alt="Medical team"
              loading="lazy"
            />
          </div>
          <div>
            <h2>Our Clinical Network</h2>
            <p>
              We partner with experienced clinicians across specialties—general
              medicine, pediatrics, gynecology, cardiology, dermatology,
              orthopedics, psychiatry and more—to provide timely, quality care.
            </p>
            <p>
              Our medical advisory council continuously reviews protocols to
              ensure safety, effectiveness, and empathy at every touchpoint.
            </p>
          </div>
        </div>
      </section>

      {/* Trust & compliance */}
      <section className="about-trust">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <div className="ico">🔒</div>
              <div>
                <h4>Privacy & Security</h4>
                <p>End‑to‑end encryption, least‑privilege access, audit logs.</p>
              </div>
            </div>
            <div className="trust-item">
              <div className="ico">🧪</div>
              <div>
                <h4>Quality Diagnostics</h4>
                <p>NABL‑aligned labs and standardized sample handling.</p>
              </div>
            </div>
            <div className="trust-item">
              <div className="ico">👩‍⚕️</div>
              <div>
                <h4>Verified Doctors</h4>
                <p>Credential checks, peer review, and patient feedback.</p>
              </div>
            </div>
            <div className="trust-item">
              <div className="ico">⚖️</div>
              <div>
                <h4>Compliance</h4>
                <p>HIPAA/GDPR-ready processes and data lifecycle controls.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container cta-card">
          <div>
            <h2>Ready to start your care journey?</h2>
            <p>Book an appointment or consult online with a certified doctor.</p>
          </div>
          <div className="cta-actions">
            <a className="btn btn-primary" href="/doctors">Find a Doctor</a>
            <a className="btn btn-outline" href="/signup">Create Account</a>
          </div>
        </div>
      </section>
    </main>
    <Footer/>
    </>
  );
};

export default About;
