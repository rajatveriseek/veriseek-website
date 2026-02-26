"use client";

import { useEffect, useRef } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  @keyframes cp-fade-up {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes cp-slide-left {
    from { opacity: 0; transform: translateX(-32px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes cp-slide-right {
    from { opacity: 0; transform: translateX(32px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes cp-pulse-glow {
    0%, 100% { opacity: 0.10; }
    50%       { opacity: 0.20; }
  }

  /* ── Section ── */
  .cp-section {
    background: #011638;
    min-height: 100vh;
    padding: 88px clamp(20px, 8vw, 120px) 80px;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  /* Ambient radial glows */
  .cp-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 70% 60% at 10% 30%, rgba(30,90,200,0.18) 0%, transparent 65%),
      radial-gradient(ellipse 50% 50% at 90% 70%, rgba(245,200,66,0.06) 0%, transparent 60%);
    pointer-events: none;
  }

  /* Orbs */
  .cp-orb-1 {
    position: absolute; top: 15%; right: -80px;
    width: 340px; height: 340px;
    background: rgba(245,200,66,0.05);
    border-radius: 50%; filter: blur(70px);
    animation: cp-pulse-glow 5s ease-in-out infinite;
    pointer-events: none;
  }
  .cp-orb-2 {
    position: absolute; bottom: 10%; left: -60px;
    width: 280px; height: 280px;
    background: rgba(30,90,200,0.08);
    border-radius: 50%; filter: blur(60px);
    animation: cp-pulse-glow 5s 2s ease-in-out infinite;
    pointer-events: none;
  }

  /* ── Header ── */
  .cp-header {
    text-align: center;
    margin-bottom: 64px;
    position: relative;
    z-index: 1;
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .cp-header.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .cp-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #f5c842;
    margin-bottom: 16px;
  }

  .cp-title {
    font-size: clamp(32px, 5vw, 56px);
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -1px;
    line-height: 1.1;
    margin-bottom: 12px;
    font-family: 'DM Sans', sans-serif;
  }

  .cp-subtitle {
    font-size: clamp(14px, 1.5vw, 16px);
    color: rgba(255,255,255,0.50);
    max-width: 520px;
    margin: 0 auto;
    line-height: 1.8;
  }

  /* ── Two-column grid ── */
  .cp-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: clamp(20px, 4vw, 48px);
    position: relative;
    z-index: 1;
    align-items: start;
  }

  /* ── Left column ── */
  .cp-left {
    display: flex;
    flex-direction: column;
    gap: 16px;
    opacity: 0;
    transform: translateX(-32px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .cp-left.is-visible {
    opacity: 1;
    transform: translateX(0);
  }

  /* ── Contact card ── */
  .cp-card {
    background: rgba(255,255,255,0.97);
    border-radius: 16px;
    padding: 32px 28px;
    position: relative;
    overflow: hidden;
  }
  .cp-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 4px;
    background: #f5c842;
    border-radius: 16px 0 0 16px;
  }

  .cp-card-title {
    font-size: clamp(16px, 1.8vw, 20px);
    font-weight: 700;
    color: #011638;
    letter-spacing: -0.3px;
    margin-bottom: 24px;
    font-family: 'DM Sans', sans-serif;
  }

  .cp-card-divider {
    width: 100%;
    height: 1px;
    background: rgba(1,22,56,0.08);
    margin-bottom: 24px;
  }

  .cp-contact-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .cp-contact-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }

  .cp-icon-wrap {
    flex-shrink: 0;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: #f5c842;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #011638;
    box-shadow: 0 4px 12px rgba(245,200,66,0.30);
    margin-top: 1px;
  }

  .cp-contact-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(1,22,56,0.40);
    margin-bottom: 3px;
  }

  .cp-contact-value {
    font-size: 14px;
    font-weight: 600;
    color: #011638;
    text-decoration: none;
    transition: color 0.2s;
    letter-spacing: -0.1px;
    line-height: 1.5;
  }
  .cp-contact-value:hover {
    color: #1a4fa0;
    text-decoration: underline;
  }

  /* ── Social / Connect card ── */
  .cp-social-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(245,200,66,0.20);
    border-radius: 16px;
    padding: 28px;
    position: relative;
    overflow: hidden;
  }

  .cp-social-card-title {
    font-size: clamp(15px, 1.6vw, 18px);
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 8px;
  }

  .cp-social-card-sub {
    font-size: 13px;
    color: rgba(255,255,255,0.45);
    line-height: 1.7;
    margin-bottom: 20px;
  }

  .cp-social-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .cp-social-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 100px;
    background: rgba(245,200,66,0.10);
    border: 1.5px solid rgba(245,200,66,0.35);
    color: #f5c842;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.25s ease;
    letter-spacing: 0.3px;
  }
  .cp-social-btn:hover {
    background: rgba(245,200,66,0.18);
    border-color: #f5c842;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(245,200,66,0.15);
  }

  /* ── Right column: map ── */
  .cp-right {
    display: flex;
    flex-direction: column;
    gap: 16px;
    opacity: 0;
    transform: translateX(32px);
    transition: opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s;
  }
  .cp-right.is-visible {
    opacity: 1;
    transform: translateX(0);
  }

  .cp-map-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #f5c842;
    margin-bottom: 4px;
  }

  .cp-map-wrap {
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(245,200,66,0.20);
    box-shadow: 0 20px 60px rgba(1,22,56,0.50);
    height: 340px;
    flex-shrink: 0;
  }

  .cp-map-wrap iframe {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
  }

  /* Address card under map */
  .cp-address-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 14px;
    padding: 20px 24px;
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }

  .cp-address-icon {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(245,200,66,0.12);
    border: 1.5px solid rgba(245,200,66,0.30);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f5c842;
    margin-top: 1px;
  }

  .cp-address-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 5px;
  }

  .cp-address-text {
    font-size: 13px;
    color: rgba(255,255,255,0.70);
    line-height: 1.75;
    font-style: normal;
  }

  /* ── Blue gradient rule ── */
  .cp-rule {
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, #60a5fa, #2563eb);
    border-radius: 99px;
    margin: 10px auto 0;
  }

  /* ── Responsive ── */
  @media (max-width: 860px) {
    .cp-grid {
      grid-template-columns: 1fr;
    }
    .cp-right {
      transform: translateY(24px);
    }
    .cp-right.is-visible {
      transform: translateY(0);
    }
  }

  @media (max-width: 540px) {
    .cp-section {
      padding: 72px 18px 60px;
    }
    .cp-map-wrap {
      height: 260px;
    }
    .cp-card {
      padding: 24px 18px;
    }
    .cp-icon-wrap {
      width: 36px;
      height: 36px;
    }
    .cp-icon-wrap svg {
      width: 15px;
      height: 15px;
    }
  }

  @media (max-width: 380px) {
    .cp-section { padding: 64px 14px 48px; }
    .cp-map-wrap { height: 220px; }
  }
`;

export default function ContactPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const cssInjected = useRef(false);

  useEffect(() => {
    if (!cssInjected.current) {
      cssInjected.current = true;
      const tag = document.createElement("style");
      tag.setAttribute("data-cp", "1");
      tag.textContent = CSS;
      document.head.appendChild(tag);
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const header = section.querySelector<HTMLElement>(".cp-header");
    const left   = section.querySelector<HTMLElement>(".cp-left");
    const right  = section.querySelector<HTMLElement>(".cp-right");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("is-visible");
          io.unobserve(el);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    [header, left, right].forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="cp-section" ref={sectionRef}>

      {/* Ambient orbs */}
      <div className="cp-orb-1" aria-hidden="true" />
      <div className="cp-orb-2" aria-hidden="true" />

      {/* Header */}
      <div className="cp-header">
        <div className="cp-eyebrow">
          <span style={{ display: "inline-block", width: 28, height: 2, background: "#f5c842", flexShrink: 0 }} />
          Veriseek Education
          <span style={{ display: "inline-block", width: 28, height: 2, background: "#f5c842", flexShrink: 0 }} />
        </div>
        <h1 className="cp-title">
          Contact{" "}
          <em style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 400 }}>
            Us
          </em>
        </h1>
        <div className="cp-rule" />
        <p className="cp-subtitle">
          Have questions about our programmes or the Sharkathon competition? We're here to help.
        </p>
      </div>

      {/* Two-column grid */}
      <div className="cp-grid">

        {/* Left — contact info cards */}
        <div className="cp-left">

          {/* Get in Touch card */}
          <div className="cp-card">
            <h2 className="cp-card-title">
              Get in{" "}
              <em style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 400, color: "#1a4fa0" }}>
                Touch
              </em>
            </h2>
            <div className="cp-card-divider" />
            <div className="cp-contact-list">

              {/* Email */}
              <div className="cp-contact-item">
                <div className="cp-icon-wrap">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="cp-contact-label">Email</p>
                  <a href="mailto:team@veriseekeducation.com" className="cp-contact-value">
                    team@veriseekeducation.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="cp-contact-item">
                <div className="cp-icon-wrap">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="cp-contact-label">Phone</p>
                  <a href="tel:+919953371191" className="cp-contact-value">
                    +91 9953371191
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div className="cp-contact-item">
                <div className="cp-icon-wrap">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
                <div>
                  <p className="cp-contact-label">Instagram</p>
                  <a
                    href="https://www.instagram.com/veriseekeducation?igsh=MTdjdzE1NW03bjZ0bQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cp-contact-value"
                  >
                    @veriseek_edu
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Connect With Us card */}
          <div className="cp-social-card">
            <h2 className="cp-social-card-title">
              Connect With{" "}
              <em style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 400, color: "#f5c842" }}>
                Us
              </em>
            </h2>
            <p className="cp-social-card-sub">
              Follow us to stay updated with our latest programmes, events, and Sharkathon news.
            </p>
            <div className="cp-social-row">
              <a
                href="https://www.instagram.com/veriseekeducation?igsh=MTdjdzE1NW03bjZ0bQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="cp-social-btn"
              >
                {/* Instagram icon */}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                Instagram
              </a>
            </div>
          </div>

        </div>

        {/* Right — map + address */}
        <div className="cp-right">

          <p className="cp-map-label">Find Us</p>

          {/* Map embed */}
          <div className="cp-map-wrap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.2034142780366!2d77.09073937537779!3d28.4574333975809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18e0fd4bb287%3A0x7edf0a3ab4642c2c!2sGolf%20Course%20Rd%2C%20Sector%2043%2C%20Gurugram%2C%20Haryana%20122002!5e0!3m2!1sen!2sin!4v1709829847945!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              title="Veriseek Education Office Location"
            />
          </div>

          {/* Address card */}
          <div className="cp-address-card">
            <div className="cp-address-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <p className="cp-address-label">Office Address</p>
              <address className="cp-address-text">
                AltF MPD Tower, 2nd Floor<br />
                Golf Course Road, Sector 43<br />
                Gurugram, Haryana 122002
              </address>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}