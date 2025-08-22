import React, { useState } from "react";
import "./contact.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const Contact = () => {
  const [status, setStatus] = useState({ sending: false, success: null });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ sending: true, success: null });

    // Simulate async submit
    setTimeout(() => {
      setStatus({ sending: false, success: true });
      e.target.reset();
    }, 1200);
  };

  return (
    <>
    <Navbar/>
    <main className="contact">
      {/* Hero */}
      <section className="contact-hero">
        <div className="container hero-wrap">
          <div className="hero-copy">
            <h1>Contact Us</h1>
            <p>
              Need help with appointments, lab tests, pharmacy orders, or your account?
              Our team is here 24×7 to assist.
            </p>
          </div>
          <div className="hero-art" aria-hidden="true">💬</div>
        </div>
      </section>

      {/* Contact channels */}
      <section className="contact-channels">
        <div className="container grid-4">
          <div className="ch-card">
            <div className="ch-ico">📞</div>
            <h3>Careline</h3>
            <p>+91-80-1234-5678</p>
            <span className="muted">24×7 helpline</span>
          </div>

          <div className="ch-card">
            <div className="ch-ico">✉️</div>
            <h3>Support</h3>
            <p>care@healthcare.plus</p>
            <span className="muted">General queries & help</span>
          </div>

          <div className="ch-card">
            <div className="ch-ico">💊</div>
            <h3>Pharmacy</h3>
            <p>rx@healthcare.plus</p>
            <span className="muted">Orders & refills</span>
          </div>

          <div className="ch-card">
            <div className="ch-ico">🏢</div>
            <h3>Corporate</h3>
            <p>partners@healthcare.plus</p>
            <span className="muted">Hospitals & partners</span>
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="contact-body">
        <div className="container grid-2">
          {/* Form */}
          <div className="card form-card">
            <h2>Send a Message</h2>
            <p className="subtitle">We typically respond within a few hours.</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="row-2">
                <div className="field">
                  <label htmlFor="name">Full Name</label>
                  <input id="name" name="name" type="text" placeholder="Your name" required />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="you@example.com" required />
                </div>
              </div>

              <div className="row-2">
                <div className="field">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" placeholder="+91 90000 00000" />
                </div>
                <div className="field">
                  <label htmlFor="topic">Topic</label>
                  <select id="topic" name="topic" defaultValue="General">
                    <option>General</option>
                    <option>Appointments</option>
                    <option>Lab Tests</option>
                    <option>Pharmacy</option>
                    <option>Billing</option>
                    <option>Technical</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="How can we help?" rows="6" required />
              </div>

              <button type="submit" className="btn-primary" disabled={status.sending}>
                {status.sending ? "Sending..." : "Send Message"}
              </button>

              {status.success && (
                <p className="form-success" role="status">Thank you! We’ll get back to you shortly.</p>
              )}
            </form>
          </div>

          {/* Info / Map */}
          <aside className="card info-card">
            <h2>Visit Us</h2>
            <p className="subtitle">Head Office</p>
            <address>
              HealthCare+ HQ<br />
              221B Wellness Ave, MediCity, 560001<br />
              India
            </address>

            <div className="meta">
              <div><span className="dot dot-online" /> Support: 24×7</div>
              <div><span className="dot" /> Clinic Hours: 8am – 8pm</div>
            </div>

            <div className="map">
              {/* Replace with your map iframe/embed if desired */}
              <div className="map-placeholder">
                <span>Map placeholder</span>
              </div>
            </div>

            <div className="quick-help">
              <h4>Quick Help</h4>
              <ul>
                <li><a href="/doctors">Book an appointment</a></li>
                <li><a href="/labs">Schedule lab test</a></li>
                <li><a href="/pharmacy">Track medicine order</a></li>
                <li><a href="/faq">FAQs</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
    <Footer/>
    </>
  );
};

export default Contact;
