"use client";

import { useEffect, useRef } from "react";

// --- Data ----------------------------------------------------------------------

const PHASES = [
  {
    id: "masterclasses",
    num: "01",
    heading: "Live Masterclasses by Industry Experts",
    items: [
      "Critical Thinking (online)",
      "Data Sufficiency (online)",
      "Business Maths (online)",
      "Structured Thinking (online)",
      "Financial Terms & Business Metrics (online)",
    ],
  },
  {
    id: "learning",
    num: "02",
    heading: "Learning through Curated Content",
    items: [
      "Access to curated course content and books by CXOs",
    ],
  },
  {
    id: "competition",
    num: "03",
    heading: "Competition Phase — Rounds",
    items: [
      "The CEO Round (19th July 2026)",
      "The Consultant Round (26th July 2026)",
      "The Investor Round (2nd August 2026)",
    ],
  },
];

// --- Main component -----------------------------------------------------------

export default function SharkathonJourneyCopy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const els = section.querySelectorAll<HTMLElement>(".sj2-anim");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const delay = Number(el.dataset.delay ?? 0);
          setTimeout(() => el.classList.add("is-visible"), delay);
          io.unobserve(el);
        });
      },
      { threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── Section ── */
        .sj2-section {
          background: #011638;
          padding: 80px clamp(20px, 8vw, 120px) 100px;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* ── Header ── */
        .sj2-header {
          text-align: center;
          margin-bottom: 60px;
          position: relative; z-index: 1;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .sj2-header.is-visible { opacity: 1; transform: translateY(0); }

        .sj2-eyebrow {
          display: inline-flex; align-items: center; gap: 12px;
          font-size: 11px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: rgba(255,255,255,0.40);
          margin-bottom: 14px;
        }
        .sj2-h-title {
          font-size: clamp(26px, 3.5vw, 40px);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.5px;
          line-height: 1.15;
          margin: 0;
        }
        .sj2-h-title em {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          color: #f5c842;
        }
        .sj2-h-rule {
          width: 96px; height: 4px;
          background: #f5c842;
          border-radius: 99px;
          margin: 14px auto 0;
        }

        /* ── Animation base ── */
        .sj2-anim {
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .sj2-anim.is-visible { opacity: 1; transform: translateY(0); }

        /* ══════════════════════════════════
           DESKTOP: Journey Scene
        ══════════════════════════════════ */
        .sj2-scene {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          z-index: 1;
        }

        /* ── Top row: card 1 left ── */
        .sj2-top-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0 32px;
          margin-bottom: 0;
          position: relative; z-index: 2;
        }

        /* ── Bottom row: card 2 center, card 3 right ── */
        .sj2-bottom-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0 32px;
          margin-top: 0;
          position: relative; z-index: 2;
        }

        .sj2-col-spacer { visibility: hidden; pointer-events: none; }

        /* ── Card ── */
        .sj2-card-inner {
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(255,255,255,0.12);
          border-radius: 16px;
          padding: 20px 22px;
          backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
          transition: border-color 0.3s ease, background 0.3s ease;
          width: 100%;
        }
        .sj2-card-inner:hover {
          border-color: rgba(245,200,66,0.30);
          background: rgba(255,255,255,0.09);
        }

        /* Number pill */
        .sj2-card-num {
          display: inline-flex; align-items: center; justify-content: center;
          width: 32px; height: 32px;
          border-radius: 50%;
          background: #f5c842;
          color: #011638;
          font-size: 13px; font-weight: 800;
          margin-bottom: 12px;
          flex-shrink: 0;
        }

        .sj2-card-heading {
          font-size: clamp(15px, 1.4vw, 17px);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.3;
          margin: 0 0 12px;
          letter-spacing: -0.2px;
        }

        .sj2-card-list {
          margin: 0; padding: 0 0 0 16px;
          list-style: none;
        }
        .sj2-card-list li {
          font-size: clamp(13px, 1.05vw, 14px);
          color: rgba(255,255,255,0.55);
          line-height: 1.80;
          margin-bottom: 2px;
          font-weight: 400;
          position: relative;
          padding-left: 4px;
        }
        .sj2-card-list li::before {
          content: '';
          position: absolute;
          left: -14px; top: 10px;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #f5c842;
          opacity: 0.60;
        }

        /* ── Connector dot below/above card ── */
        .sj2-connector {
          display: flex;
          justify-content: center;
          padding: 8px 0;
        }
        .sj2-connector-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #f5c842;
          box-shadow: 0 0 12px rgba(245,200,66,0.35);
        }

        /* ── SVG curved dotted path ── */
        .sj2-path-wrap {
          position: relative; z-index: 1;
          margin: -4px 0;
        }
        .sj2-path-svg {
          width: 100%;
          height: auto;
          display: block;
        }

        /* ══════════════════════════════════
           MOBILE: Stacked + vertical line
        ══════════════════════════════════ */
        .sj2-mobile-stack {
          display: none;
          flex-direction: column;
          gap: 0;
          position: relative;
          z-index: 1;
          max-width: 480px;
          margin: 0 auto;
        }

        /* Vertical dotted line */
        .sj2-mobile-stack::before {
          content: '';
          position: absolute;
          left: 23px; top: 16px; bottom: 16px;
          width: 2px;
          background: repeating-linear-gradient(
            to bottom,
            rgba(255,255,255,0.30) 0px,
            rgba(255,255,255,0.30) 6px,
            transparent 6px,
            transparent 12px
          );
        }

        .sj2-mobile-item {
          display: flex;
          gap: 16px;
          padding: 16px 0;
          position: relative;
        }

        .sj2-mobile-num {
          flex-shrink: 0;
          width: 46px; height: 46px;
          border-radius: 50%;
          background: #f5c842;
          color: #011638;
          font-size: 15px; font-weight: 800;
          display: flex; align-items: center; justify-content: center;
          position: relative; z-index: 2;
          box-shadow: 0 0 16px rgba(245,200,66,0.25);
        }

        .sj2-mobile-content {
          flex: 1;
          min-width: 0;
        }

        .sj2-mobile-heading {
          font-size: 15px; font-weight: 700;
          color: #ffffff;
          margin: 0 0 8px;
          line-height: 1.3;
        }

        .sj2-mobile-list {
          margin: 0; padding: 0;
          list-style: none;
        }
        .sj2-mobile-list li {
          font-size: 13px;
          color: rgba(255,255,255,0.50);
          line-height: 1.75;
          padding-left: 14px;
          position: relative;
        }
        .sj2-mobile-list li::before {
          content: '';
          position: absolute;
          left: 0; top: 9px;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #f5c842;
          opacity: 0.50;
        }

        /* ── Responsive ── */
        @media (max-width: 760px) {
          .sj2-scene { display: none; }
          .sj2-mobile-stack { display: flex; }
          .sj2-section { padding: 56px 20px 72px; }
        }
        @media (max-width: 400px) {
          .sj2-section { padding: 44px 16px 60px; }
          .sj2-mobile-num { width: 38px; height: 38px; font-size: 13px; }
          .sj2-mobile-stack::before { left: 19px; }
        }
      `}</style>

      <section className="sj2-section" ref={sectionRef}>

        {/* ── Header ── */}
        <div className="sj2-header sj2-anim" data-delay="0">
          <p className="sj2-eyebrow">
            <span style={{ display: "inline-block", width: 24, height: 2, background: "#f5c842", opacity: 0.50 }} />
            Sharkathon Season 2
            <span style={{ display: "inline-block", width: 24, height: 2, background: "#f5c842", opacity: 0.50 }} />
          </p>
          <h2 className="sj2-h-title">
            Student <em>Journey</em>
          </h2>
          <div className="sj2-h-rule" />
        </div>

        {/* ═══════════════════════════════
            DESKTOP: Cards + curved path
        ═══════════════════════════════ */}
        <div className="sj2-scene">

          {/* Top row — only col 1 has content */}
          <div className="sj2-top-row">
            <div className="sj2-anim" data-delay="100">
              <div className="sj2-card-inner">
                <span className="sj2-card-num">01</span>
                <h3 className="sj2-card-heading">Live Masterclasses by Industry Experts</h3>
                <ul className="sj2-card-list">
                  <li>Critical Thinking (online)</li>
                  <li>Data Sufficiency (online)</li>
                  <li>Business Maths (online)</li>
                  <li>Structured Thinking (online)</li>
                  <li>Financial Terms & Business Metrics (online)</li>
                </ul>
              </div>
              <div className="sj2-connector"><div className="sj2-connector-dot" /></div>
            </div>
            <div className="sj2-col-spacer" />
            <div className="sj2-anim card-03" data-delay="100">
              <div className="sj2-card-inner">
                <span className="sj2-card-num">03</span>
                <h3 className="sj2-card-heading">Competition Phase — Rounds</h3>
                <ul className="sj2-card-list">
                  <li>The CEO Round (19th July 2026)</li>
                  <li>The Consultant Round (26th July 2026)</li>
                  <li>The Investor Round (2nd August 2026)</li>
                </ul>
              </div>
              <div className="sj2-connector"><div className="sj2-connector-dot" /></div>
            </div>
          </div>

          {/* ── Curved dotted path SVG ── */}
          <div className="sj2-path-wrap sj2-anim" data-delay="50">
            <svg
              className="sj2-path-svg"
              viewBox="0 0 1000 120"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M80,10 C200,10 220,110 400,110 C580,110 600,10 780,10 C880,10 920,60 960,60"
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="8 10"
              />
              {/* Phase dots on the path */}
              <circle cx="155" cy="25" r="6" fill="#f5c842" />
              <circle cx="498" cy="98" r="6" fill="#f5c842" />
              <circle cx="840" cy="20" r="6" fill="#f5c842" />
            </svg>
          </div>

          {/* Bottom row — cols 2 & 3 have content */}
          <div className="sj2-bottom-row">
            <div className="sj2-col-spacer" />
            <div className="sj2-anim" data-delay="200">
              <div className="sj2-connector"><div className="sj2-connector-dot" /></div>
              <div className="sj2-card-inner">
                <span className="sj2-card-num">02</span>
                <h3 className="sj2-card-heading">Learning through Curated Content</h3>
                <ul className="sj2-card-list">
                  <li>Access to curated course content and books by CXOs</li>
                </ul>
              </div>
            </div>
            <div className="sj2-anim" data-delay="300">
              
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════
            MOBILE: Vertical stacked
        ═══════════════════════════════ */}
        <div className="sj2-mobile-stack">
          {PHASES.map((phase, i) => (
            <div key={phase.id} className="sj2-mobile-item sj2-anim" data-delay={i * 120}>
              <span className="sj2-mobile-num">{phase.num}</span>
              <div className="sj2-mobile-content">
                <h3 className="sj2-mobile-heading">{phase.heading}</h3>
                <ul className="sj2-mobile-list">
                  {phase.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </section>
    </>
  );
}
