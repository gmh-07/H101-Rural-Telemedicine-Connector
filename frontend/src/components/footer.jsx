import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="hc-footer hc-footer--compact">
      {/* Divider to separate from above content */}
      <div className="hc-footer__divider" />

      {/* Top trust badges (condensed) */}
      <section className="hc-footer__topbar">
        <div className="hc-topbar__item">
          <span className="hc-ico">🩺</span>
          <div>
            <h4>Trusted Care</h4>
            <p>Verified doctors, secure records</p>
          </div>
        </div>
        <div className="hc-topbar__item">
          <span className="hc-ico">🚚</span>
          <div>
            <h4>Fast Delivery</h4>
            <p>Medicines in 24–48 hours</p>
          </div>
        </div>
        <div className="hc-topbar__item">
          <span className="hc-ico">🔒</span>
          <div>
            <h4>Data Privacy</h4>
            <p>HIPAA/GDPR aligned</p>
          </div>
        </div>
        <div className="hc-topbar__item">
          <span className="hc-ico">📞</span>
          <div>
            <h4>24x7 Support</h4>
            <p>Chat, email, helpline</p>
          </div>
        </div>
      </section>

      {/* Main grid (compact) */}
      <section className="hc-footer__grid">
        <div className="hc-col hc-col--brand">
          <div className="hc-brand">
            <div className="hc-logo">🏥</div>
            <div>
              <h3>HealthCare+</h3>
              <p className="hc-tagline">Modern care, delivered.</p>
            </div>
          </div>

          <p className="hc-desc">
            One platform for appointments, lab tests, e‑pharmacy, and digital records.
          </p>

          <div className="hc-subscribe">
            <form onSubmit={(e) => e.preventDefault()} className="hc-subscribe__form">
              <input type="email" placeholder="Email for wellness tips" aria-label="Email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>

          <div className="hc-social">
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="Twitter / X">🐦</a>
            <a href="#" aria-label="LinkedIn">💼</a>
            <a href="#" aria-label="YouTube">▶️</a>
          </div>
        </div>

        <div className="hc-col">
          <h4>Shop</h4>
          <ul>
            <li><a href="#">OTC Medicines</a></li>
            <li><a href="#">Refills</a></li>
            <li><a href="#">Vitamins</a></li>
            <li><a href="#">Diabetes</a></li>
          </ul>

          <h4>Care</h4>
          <ul>
            <li><a href="#">Online Consult</a></li>
            <li><a href="#">Book Lab Tests</a></li>
            <li><a href="#">Home Sample</a></li>
            <li><a href="#">Mental Health</a></li>
          </ul>
        </div>

        <div className="hc-col">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Orders & Returns</a></li>
            <li><a href="#">Payments</a></li>
            <li><a href="#">Accessibility</a></li>
          </ul>

          <h4>Providers</h4>
          <ul>
            <li><a href="#">Join as Doctor</a></li>
            <li><a href="#">Partner Labs</a></li>
          </ul>
        </div>

        <div className="hc-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Newsroom</a></li>
          </ul>

          <h4>Policies</h4>
          <ul>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Refunds</a></li>
          </ul>
        </div>
      </section>

      {/* Legal bar (compact) */}
      <section className="hc-footer__legal">
        <p>© {new Date().getFullYear()} HealthCare+. All rights reserved.</p>
        <div className="hc-legal__links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Sitemap</a>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
