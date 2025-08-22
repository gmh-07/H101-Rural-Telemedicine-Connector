import React, { useEffect, useState } from "react";
import "./navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`hc-nav ${elevated ? "is-elevated" : ""}`}>
      <div className="hc-nav__inner">
        {/* Brand */}
        <a href="/" className="hc-brand" onClick={closeMenu} aria-label="HealthCare+ Home">
          <div className="hc-brand__logo" aria-hidden="true">🏥</div>
          <span className="hc-brand__text">HealthCare+</span>
        </a>

        {/* Center links (desktop) */}
        <ul className="hc-links">
          <li><a href="/" className="hc-link active" onClick={closeMenu}>Home</a></li>
          <li><a href="/advanced-features" className="hc-link" onClick={closeMenu}>Advanced-Tools</a></li>
          <li><a href="/doctors" className="hc-link" onClick={closeMenu}>Doctors</a></li>
          <li><a href="/about" className="hc-link" onClick={closeMenu}>About</a></li>
          <li><a href="/contact" className="hc-link" onClick={closeMenu}>Contact</a></li>
          <li className="ai-btn"><a href="/aifeature" className="hc-link" onClick={closeMenu}>Nearby Doctors</a></li>
          

        </ul>
        {/* Actions (desktop) */}
        <div className="hc-actions">
          <a href="/login" className="hc-link hc-link--muted" onClick={closeMenu}>Login</a>
          <a  href="/signup" className="hc-btn" onClick={closeMenu}>Sign Up</a>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className={`hc-burger ${open ? "is-active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="hc-mobile"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Hairline divider */}
      <div className="hc-nav__divider" />

      {/* Mobile panel */}
      <div id="hc-mobile" className={`hc-mobile ${open ? "open" : ""}`}>
        <nav className="hc-mobile__panel" aria-label="Mobile">
          <a href="/" className="hc-mobile__link active" onClick={closeMenu}>Home</a>
          <a href="/services" className="hc-mobile__link" onClick={closeMenu}>Services</a>
          <a href="/doctors" className="hc-mobile__link" onClick={closeMenu}>Doctors</a>
          <a href="/about" className="hc-mobile__link" onClick={closeMenu}>About</a>
          <a href="/contact" className="hc-mobile__link" onClick={closeMenu}>Contact</a>
          <a href="/aifeature" className="hc-mobile__link">Explore AI</a>
          <div className="hc-mobile__actions">
            <a href="/login" className="hc-link hc-link--muted" onClick={closeMenu}>Login</a>
            <a href="/signup" className="hc-btn" onClick={closeMenu}>Sign Up</a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
