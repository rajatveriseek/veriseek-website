"use client";

import { useEffect, useRef } from "react";

// ─── Data ──────────────────────────────────────────────────────────────────────

const PHASES = [
  {
    id: "learning",
    num: "1",
    label: "Learning",
    sublabel: "through study material",
    color: "#011638",
    arrowDir: "up" as const,
    items: [
      "Critical Thinking (Online)",
      "Problem Solving (Online)",
      "Decision Making (Online)",
      "Investing Skills (Online)",
      "Effective Communication (Online)",
    ],
  },
  {
    id: "application",
    num: "2",
    label: "Learning ",
    sublabel: "through Competition",
    color: "#011638",
    arrowDir: "down" as const,
    items: [
      "Access to curated course content and books by CXOs",
    ],
  },
  {
    id: "accomplishment",
    num: "3",
    label: "Competitive Phase",
    sublabel: "through 3 rounds of business case competitions",
    color: "#011638",
    arrowDir: "down" as const,
    items: [
      "The CEO Round  (21st July 2026)",
      "The Consultant Round (28th July 2026)",
      "The Investor Round  (5th August 2026)",
    ],
  },
];

// ─── Arrow SVG ────────────────────────────────────────────────────────────────

function Arrow({ dir, color = "#011638" }: { dir: "up" | "down"; color?: string }) {
  const points = dir === "up" ? "12,2 22,22 2,22" : "12,22 22,2 2,2";
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
      <polygon points={points} />
    </svg>
  );
}

// ─── Phase Card ───────────────────────────────────────────────────────────────

function PhaseCard({ phase, position }: { phase: typeof PHASES[number]; position: "top" | "bottom" }) {
  return (
    <div className={`sj2-card sj2-card-${position}`}>
      {position === "bottom" && (
        <div className="sj2-arrow-wrap">
          <Arrow dir={phase.arrowDir} />
        </div>
      )}
      <div className="sj2-card-inner">
        <h3 className="sj2-card-title">
          <span className="sj2-card-num">{phase.num}.</span>{" "}
          {phase.label} -{" "}
          <span className="sj2-card-sublabel">{phase.sublabel}</span>
        </h3>
        <ul className="sj2-card-list">
          {phase.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      {position === "top" && (
        <div className="sj2-arrow-wrap sj2-arrow-below">
          <Arrow dir={phase.arrowDir} />
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        /* ── Section ── */
        .sj2-section {
          background: #eef0f2;
          padding: 80px clamp(20px, 8vw, 120px) 100px;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Subtle dot grid bg */
        .sj2-section::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(1,22,56,0.05) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* ── Header ── */
        .sj2-header {
          text-align: center;
          margin-bottom: 52px;
          position: relative; z-index: 1;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .sj2-header.is-visible { opacity: 1; transform: translateY(0); }

        .sj2-eyebrow {
          display: inline-flex; align-items: center; gap: 12px;
          font-size: 11px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: #011638; opacity: 0.45;
          margin-bottom: 14px; font-family: 'DM Sans', sans-serif;
        }
        .sj2-h-title {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(26px, 3.5vw, 40px);
          font-weight: 700;
          color: #011638;
          letter-spacing: -0.5px;
          line-height: 1.15;
          margin: 0;
        }
        .sj2-h-title em {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-weight: 400;
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
           ROAD SCENE  (desktop)
        ══════════════════════════════════ */
        .sj2-road-scene {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          z-index: 1;
          min-height: 420px;
          border: 2px solid rgba(1,22,56,0.12);
          border-radius: 20px;
          padding: 32px;
          background: rgba(255,255,255,0.45);
        }

        /* SVG road sits in the middle vertically */
        .sj2-road-svg-wrap {
          position: absolute;
          left: 0; right: 0;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }

        /* ── Cards layout ── */
        .sj2-cards-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0 24px;
          position: relative;
        }

        /* Card base */
        .sj2-card {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .sj2-card-top {
          /* sits in upper half */
          padding-top: 0;
          padding-bottom: 0;
          justify-content: flex-end;
          align-items: center;
        }

        .sj2-card-bottom {
          /* sits in lower half */
          padding-top: 0;
          justify-content: flex-start;
          align-items: center;
        }

        .sj2-card-inner {
          background: #fff;
          border: 2px solid #011638;
          border-radius: 12px;
          padding: 16px 18px;
          box-shadow: 0 4px 16px rgba(1,22,56,0.08);
          width: 100%;
        }

        .sj2-card-title {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(15px, 1.4vw, 18px);
          font-weight: 700;
          color: #011638;
          letter-spacing: -0.2px;
          margin-bottom: 8px;
          line-height: 1.2;
        }
        .sj2-card-num { color: #011638; }
        .sj2-card-sublabel {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: clamp(12px, 1.1vw, 14px);
          color: rgba(1,22,56,0.55);
          letter-spacing: 0;
        }

        .sj2-card-list {
          margin: 0; padding: 0 0 0 14px;
          list-style: disc;
        }
        .sj2-card-list li {
          font-size: clamp(13px, 1.05vw, 14px);
          color: #011638;
          line-height: 1.80;
          margin-bottom: 3px;
          font-weight: 400;
          font-family: 'DM Sans', sans-serif;
        }

        /* Arrow connector between card and road */
        .sj2-arrow-wrap {
          display: flex;
          justify-content: center;
          padding: 4px 0;
        }
        .sj2-arrow-below { order: 1; }

        /* ── The road SVG ── */
        .sj2-road-svg {
          width: 100%;
          height: auto;
          display: block;
        }

        /* ══════════════════════════════════
           DESKTOP LAYOUT: top / bottom grid
        ══════════════════════════════════ */
        .sj2-top-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0 24px;
          margin-bottom: 0;
          position: relative; z-index: 2;
        }
        .sj2-bottom-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0 24px;
          margin-top: 0;
          position: relative; z-index: 2;
        }

        /* col 1 top, col 2 bottom, col 3 bottom */
        .sj2-col-spacer { visibility: hidden; pointer-events: none; }

        /* ══════════════════════════════════
           MOBILE
        ══════════════════════════════════ */
        .sj2-mobile-stack {
          display: none;
          flex-direction: column;
          gap: 20px;
          position: relative; z-index: 1;
        }
        .sj2-mobile-stack .sj2-card-inner {
          width: 100%;
        }
        .sj2-mobile-phase-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px; height: 32px;
          background: #011638;
          color: #f5c842;
          border-radius: 50%;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700; font-size: 14px;
          margin-right: 10px;
          flex-shrink: 0;
        }
        .sj2-mobile-card-head {
          display: flex; align-items: center;
          margin-bottom: 10px;
        }

        /* Road connector for mobile */
        .sj2-mobile-connector {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }
        .sj2-mobile-road-strip {
          width: 48px; height: 40px;
          background: #011638;
          border-radius: 0;
          position: relative;
          display: flex; align-items: center; justify-content: center;
        }
        .sj2-mobile-road-strip::before, .sj2-mobile-road-strip::after {
          content: '';
          position: absolute;
          left: 50%; transform: translateX(-50%);
          width: 6px; height: 10px;
          background: #f5c842;
          border-radius: 2px;
        }
        .sj2-mobile-road-strip::before { top: 5px; }
        .sj2-mobile-road-strip::after  { bottom: 5px; }

        @media (max-width: 640px) {
          .sj2-road-scene { display: none; }
          .sj2-mobile-stack { display: flex; }
          .sj2-section { padding: 48px 16px 64px; }
        }
      `}</style>

      <section className="sj2-section" ref={sectionRef}>

        {/* ── Header ── */}
        <div className="sj2-header sj2-anim" data-delay="0">
          <p className="sj2-eyebrow">
            <span style={{ display: "inline-block", width: 24, height: 2, background: "#011638", opacity: 0.30 }} />
            Sharkathon Season 2
            <span style={{ display: "inline-block", width: 24, height: 2, background: "#011638", opacity: 0.30 }} />
          </p>
          <h2 className="sj2-h-title">
            Sharkathon <em>Journey</em>
          </h2>
          <div className="sj2-h-rule" />
        </div>

        {/* ════════════════════════════════
            DESKTOP: Road Scene
        ════════════════════════════════ */}
        <div className="sj2-road-scene">

          {/* Top row — only col 1 has content (Learning) */}
          <div className="sj2-top-row">
            {/* Col 1 – Learning (top) */}
            <div className="sj2-anim" data-delay="100">
              <div className="sj2-card sj2-card-top">
                <div className="sj2-card-inner">
                  <h3 className="sj2-card-title">
                    <span className="sj2-card-num">1.</span> Learning -{" "}
                    <span className="sj2-card-sublabel">through study material</span>
                  </h3>
                  <ul className="sj2-card-list">
                    <li>Critical Thinking (Online)</li>
                    <li>Problem Solving (Online)</li>
                    <li>Decision Making (Online)</li>
                    <li>Investing Skills (Online)</li>
                    <li>Effective Communication (Online)</li>
                  </ul>
                </div>
                <div className="sj2-arrow-wrap">
                  <Arrow dir="down" />
                </div>
              </div>
            </div>
            {/* Col 2 – empty */}
            <div className="sj2-col-spacer" />
            {/* Col 3 – empty */}
            <div className="sj2-col-spacer" />
          </div>

          {/* ── ROAD SVG ── */}
          <div className="sj2-anim" data-delay="50" style={{ position: "relative", zIndex: 1 }}>
            <svg
              className="sj2-road-svg"
              viewBox="0 0 1000 160"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              {/* Road body */}
              <path
                d="M0,110 C150,110 200,50 350,50 C500,50 550,110 700,110 C850,110 880,60 1000,60"
                fill="none"
                stroke="#011638"
                strokeWidth="52"
                strokeLinecap="butt"
              />
              {/* Road center dashes */}
              <path
                d="M0,110 C150,110 200,50 350,50 C500,50 550,110 700,110 C850,110 880,60 1000,60"
                fill="none"
                stroke="#f5c842"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="28 20"
              />
              {/* Road edge highlights */}
              <path
                d="M0,110 C150,110 200,50 350,50 C500,50 550,110 700,110 C850,110 880,60 1000,60"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="2"
                strokeLinecap="butt"
              />
              {/* Stop dots at each phase */}
              {/* Dot 1 – far left on road (Learning) */}
              <circle cx="60" cy="110" r="14" fill="#f5c842" stroke="#011638" strokeWidth="3" />
              <text x="60" y="115" textAnchor="middle" fontSize="12" fontWeight="700" fill="#011638" fontFamily="DM Sans, sans-serif">1</text>
              {/* Dot 2 – middle dip (Application) */}
              <circle cx="500" cy="53" r="14" fill="#f5c842" stroke="#011638" strokeWidth="3" />
              <text x="500" y="58" textAnchor="middle" fontSize="12" fontWeight="700" fill="#011638" fontFamily="DM Sans, sans-serif">2</text>
              {/* Dot 3 – far right (Accomplishment) */}
              <circle cx="940" cy="62" r="14" fill="#f5c842" stroke="#011638" strokeWidth="3" />
              <text x="940" y="67" textAnchor="middle" fontSize="12" fontWeight="700" fill="#011638" fontFamily="DM Sans, sans-serif">3</text>
            </svg>
          </div>

          {/* Bottom row — cols 2 & 3 have content */}
          <div className="sj2-bottom-row">
            {/* Col 1 – empty */}
            <div className="sj2-col-spacer" />
            {/* Col 2 – Application */}
            <div className="sj2-anim" data-delay="200">
              <div className="sj2-card sj2-card-bottom">
                <div className="sj2-arrow-wrap">
                  <Arrow dir="down" />
                </div>
                <div className="sj2-card-inner">
                  <h3 className="sj2-card-title">
                    <span className="sj2-card-num">2.</span> Learning –{" "}
                    <span className="sj2-card-sublabel">through curated content</span>
                  </h3>
                  <ul className="sj2-card-list">
                    <li>Access to curated course content and books by CXOs</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Col 3 – Accomplishment */}
            <div className="sj2-anim" data-delay="300">
              <div className="sj2-card sj2-card-bottom">
                <div className="sj2-arrow-wrap">
                  <Arrow dir="down" />
                </div>
                <div className="sj2-card-inner">
                  <h3 className="sj2-card-title">
                    <span className="sj2-card-num">3.</span> Accomplishment –{" "}
                    <span className="sj2-card-sublabel">continuous and long-term</span>
                  </h3>
                  <ul className="sj2-card-list">
                    <li>The CEO Round  (19th July 2026)</li>
                    <li>The Consultant Round (26th July 2026)</li>
                    <li>The Investor Round  (2nd August 2026) </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════
            MOBILE: Stacked cards
        ════════════════════════════════ */}
        <div className="sj2-mobile-stack">
          {PHASES.map((phase, i) => (
            <div key={phase.id}>
              <div className="sj2-card-inner sj2-anim" data-delay={i * 120}>
                <div className="sj2-mobile-card-head">
                  <span className="sj2-mobile-phase-num">{phase.num}</span>
                  <h3 className="sj2-card-title" style={{ marginBottom: 0 }}>
                    {phase.label} –{" "}
                    <span className="sj2-card-sublabel">{phase.sublabel}</span>
                  </h3>
                </div>
                <ul className="sj2-card-list">
                  {phase.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              {i < PHASES.length - 1 && (
                <div className="sj2-mobile-connector">
                  <div className="sj2-mobile-road-strip" />
                </div>
              )}
            </div>
          ))}
        </div>

      </section>
    </>
  );
}
