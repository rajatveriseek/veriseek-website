"use client";

import { useEffect, useRef } from "react";

// ─── Data ──────────────────────────────────────────────────────────────────────

const INSTITUTE_LOGOS = [
  { src: "/images/wharton.png",    alt: "Wharton"   },
  { src: "/images/mit2.png",       alt: "MIT"       },
  { src: "/images/isb-logo1.webp", alt: "ISB"       },
  { src: "/images/iit.png",        alt: "IIT Delhi" },
  { src: "/schools/MICA_Logo.svg",                        alt: "MICA",  text: "MICA"  },
  { src: "/schools/iima.png",                        alt: "IIMA",  text: "IIMA"  },
];

const COMPANY_LOGOS = [
  { src: "/images/apple.png",                                            alt: "Apple"          },
  { src: "/schools/amazon.webp",                                           alt: "Amazon"         },
  { src: "/images/McKinseyCompany_logo-dark.png",                        alt: "McKinsey"       },
  { src: "/images/ey.png",                                               alt: "EY"             },
  { src: "/schools/jio-removebg-preview.png",                                                             alt: "Jio",        text: "Jio"         },
  { src: "/schools/cardekho-removebg-preview.png",                                                             alt: "CarDekho",   text: "CarDekho"    },
  { src: "/images/sixth sense.png",                                      alt: "Sixth Sense"    },
  { src: "/images/Nandan_Final_Logo_page-0001_12-removebg-preview.png", alt: "Nandan Capital" },
  { src: "/schools/revxcapital.png",                                                             alt: "RevX Capital", text: "RevX Capital" },
  { src: "/images/leenaai.png",                                          alt: "Leena AI"       },
  { src: "/images/WhatsApp Image 2026-02-22 at 4.01.38 PM.jpeg",        alt: "Himland Capital"},
];

const PARTNER_SCHOOLS = [
  { src: "/schools/dpskolarroad-removebg-preview.png",       alt: "DPS RK Puram"          },
  { src: "/schools/kunskapsskolan-removebg-preview.png",    alt: "Kunskapskolan"         },
  { src: "/schools/greenwoodhigh-removebg-preview.png",     alt: "Greenwood Int'l"       },
  { src: "/schools/thedoonschool-removebg-preview.png",     alt: "The Doon School"       },
  { src: "/schools/amityinternational-removebg-preview.png",alt: "Amity Int'l"           },
  { src: "/schools/jbcnlogo-removebg-preview.png",          alt: "JBCN"                 },
  { src: "/schools/theheritageschool-removebg-preview.png", alt: "The Heritage School"   },
  { src: "/schools/centrepointschool-removebg-preview.png", alt: "Centrepoint School"    },
  { src: "/schools/THEMANTHANSCHOOL-removebg-preview.png",  alt: "The Manthan School"   },
  { src: "/schools/vidyashilpacadamy-removebg-preview.png", alt: "Vidyashilp Academy"    },
  { src: "/schools/oakridge.png",                           alt: "Oakridge"             },
  { src: "/schools/emeraldinternational-removebg-preview.png", alt: "Emerald Int'l"     },
  { src: "/schools/abhinavschool-removebg-preview.png",     alt: "Abhinav School"       },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function LogoBadge({ src, alt, text }: { src?: string; alt: string; text?: string }) {
  if (src) {
    return (
      <span className="vw-badge">
        <img src={src} alt={alt} className="vw-badge-img" />
      </span>
    );
  }
  return (
    <span className="vw-badge vw-badge-text-only">
      <span className="vw-badge-label">{text ?? alt}</span>
    </span>
  );
}

function MarqueeRow() {
  const doubled = [...COMPANY_LOGOS, ...COMPANY_LOGOS];
  return (
    <div className="vw-marquee-wrap">
      <div className="vw-marquee-track">
        {doubled.map((l, i) => (
          <LogoBadge key={`${l.alt}-${i}`} {...l} />
        ))}
      </div>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function VeriseekWhySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const header = section.querySelector<HTMLElement>(".vw-header");
    const cards  = Array.from(section.querySelectorAll<HTMLElement>(".vw-anim-item"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            if (el === header) {
              el.classList.add("is-visible");
            } else {
              const idx = cards.indexOf(el);
              setTimeout(() => el.classList.add("is-visible"), 80 + idx * 110);
            }
          } else {
            el.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.08 }
    );

    if (header) io.observe(header);
    cards.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        /* ══════════════════════════════════════════
           SECTION — matches .sj-section / .sr-section navy base
        ══════════════════════════════════════════ */
        .vw-section {
          background: #011638;
          padding: 80px clamp(20px, 8vw, 120px) 100px;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Ambient radial glows — same pattern as SharkathonJourney */
        .vw-section::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 50% at 50% 0%,   rgba(245,200,66,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 10% 80%,  rgba(30,90,200,0.12)  0%, transparent 60%),
            radial-gradient(ellipse 35% 40% at 92% 70%,  rgba(30,90,200,0.07)  0%, transparent 55%);
        }

        /* ══════════════════════════════════════════
           HEADER — identical pattern to .sj-header / .sr-header
        ══════════════════════════════════════════ */
        .vw-header {
          text-align: center;
          margin-bottom: 56px;
          position: relative; z-index: 1;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .vw-header.is-visible { opacity: 1; transform: translateY(0); }

        .vw-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: #f5c842;
          margin-bottom: 12px; font-family: 'DM Sans', sans-serif;
        }
        .vw-title {
          font-size: clamp(26px, 3.8vw, 44px);
          font-weight: 700; color: #ffffff;
          letter-spacing: -0.8px; line-height: 1.1;
          font-family: 'DM Sans', sans-serif;
        }
        .vw-title em {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic; font-weight: 400;
        }
        /* Blue gradient rule — same as .sj-rule */
        .vw-rule-header {
          width: 96px; height: 4px;
          background: linear-gradient(to right, #f5c842, #ffe066);
          border-radius: 99px; margin: 14px auto 0;
        }
        .vw-subtitle {
          margin-top: 12px; font-size: 15px;
          color: rgba(255,255,255,0.40);
          font-family: 'DM Sans', sans-serif;
        }

        /* ══════════════════════════════════════════
           SCROLL ANIMATION BASE — same as .sj-anim-item
        ══════════════════════════════════════════ */
        .vw-anim-item {
          opacity: 0; transform: translateY(18px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .vw-anim-item.is-visible { opacity: 1; transform: translateY(0); }

        /* ══════════════════════════════════════════
           BENTO GRID
        ══════════════════════════════════════════ */
        .vw-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr 1.3fr;
          grid-template-rows: auto auto;
          gap: 14px;
          max-width: 1200px;
          margin: 0 auto;
          position: relative; z-index: 1;
        }

        /* ══════════════════════════════════════════
           BASE CARD — same language as .sr-card / .vm-card
        ══════════════════════════════════════════ */
        .vw-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: clamp(20px, 2vw, 28px);
          position: relative; overflow: hidden;
          display: flex; flex-direction: column;
          box-shadow: 0 4px 20px rgba(1,22,56,0.20);
          transition: background 0.3s ease, border-color 0.3s ease,
                      transform 0.3s ease, box-shadow 0.3s ease;
        }
        .vw-card.is-visible:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(245,200,66,0.22);
          transform: translateY(-5px);
          box-shadow: 0 20px 56px rgba(1,22,56,0.40), 0 4px 16px rgba(1,22,56,0.20);
        }
        /* Yellow left accent bar — same as .sr-card::before */
        .vw-card::before {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 3px; background: #f5c842;
          border-radius: 20px 0 0 20px;
          opacity: 0; transition: opacity 0.3s ease;
        }
        .vw-card.is-visible:hover::before { opacity: 1; }

        /* Grid placement */
        .vw-card-stats   { grid-column: 1; grid-row: 1 / 3; }
        .vw-card-mentors { grid-column: 2; grid-row: 1; }
        .vw-card-schools { grid-column: 3; grid-row: 1; }
        .vw-card-marquee { grid-column: 2 / 4; grid-row: 2; }

        /* ══════════════════════════════════════════
           SHARED CARD TEXT — same as .sr-card-body / .vm-role
        ══════════════════════════════════════════ */
        .vw-card-eyebrow {
          font-size: 9px; font-weight: 700;
          letter-spacing: 2.8px; text-transform: uppercase;
          color: rgba(245,200,66,0.55);
          font-family: 'DM Sans', sans-serif; margin-bottom: 8px;
        }
        .vw-card-title {
          font-size: clamp(13px, 1.2vw, 15px); font-weight: 700;
          color: #ffffff; font-family: 'DM Sans', sans-serif;
          letter-spacing: -0.2px; line-height: 1.3; margin-bottom: 4px;
        }
        .vw-card-body {
          font-size: clamp(11px, 0.95vw, 13px);
          color: rgba(255,255,255,0.45);
          font-family: 'DM Sans', sans-serif;
          line-height: 1.6; margin-bottom: 16px;
        }
        .vw-card-rule {
          width: 100%; height: 1px;
          background: rgba(255,255,255,0.07);
          margin-bottom: 16px; flex-shrink: 0;
        }

        /* ══════════════════════════════════════════
           STATS CARD
        ══════════════════════════════════════════ */
        .vw-stats-col {
          display: flex; flex-direction: column; height: 100%; gap: 0; flex: 1;
        }
        .vw-stat-block {
          flex: 1; display: flex; flex-direction: column; justify-content: center;
          padding: clamp(10px, 1.8vh, 20px) 0;
        }
        .vw-stat-block + .vw-stat-block {
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .vw-stat-num {
          font-size: clamp(48px, 5vw, 72px);
          font-weight: 800; color: #ffffff;
          letter-spacing: -4px; line-height: 0.9;
          font-family: 'DM Sans', sans-serif; margin-bottom: 10px;
        }
        .vw-stat-num span { color: #f5c842; }
        .vw-stat-name {
          font-size: clamp(13px, 1.2vw, 15px); font-weight: 700;
          color: #ffffff; font-family: 'DM Sans', sans-serif;
          margin-bottom: 4px; letter-spacing: -0.2px;
        }
        .vw-stat-desc {
          font-size: clamp(11px, 0.9vw, 13px);
          color: rgba(255,255,255,0.40);
          font-family: 'DM Sans', sans-serif;
          line-height: 1.5; margin-bottom: 14px;
        }

        /* School pills — same style as .sj-phase-pill */
        .vw-school-pills {
          display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px;
        }
        .vw-school-pill {
          display: inline-flex; align-items: center;
          padding: 4px 11px;
          background: rgba(245,200,66,0.07);
          border: 1px solid rgba(245,200,66,0.18);
          border-radius: 100px;
          font-size: 10px; font-weight: 600;
          color: rgba(255,255,255,0.50);
          font-family: 'DM Sans', sans-serif; white-space: nowrap;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .vw-school-pill:hover {
          background: rgba(245,200,66,0.14);
          border-color: rgba(245,200,66,0.40);
          color: #f5c842;
        }

        /* ══════════════════════════════════════════
           LOGO BADGES — same as .sh-college-badge / .vm-logo-badge
        ══════════════════════════════════════════ */
        .vw-logo-grid {
          display: flex; flex-wrap: wrap; gap: 8px;
          flex: 1; align-content: flex-start;
        }
        .vw-badge {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 6px 14px;
          background: #ffffff;
          border: 1.5px solid rgba(245,200,66,0.35);
          border-radius: 12px;
          height: clamp(52px, 5.5vh, 72px);
          box-shadow: 0 2px 8px rgba(1,22,56,0.14);
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
          flex-shrink: 0;
        }
        .vw-badge:hover {
          border-color: #f5c842; transform: scale(1.06);
          box-shadow: 0 4px 16px rgba(1,22,56,0.22);
        }
        .vw-badge-img {
          height: clamp(32px, 3.8vh, 52px);
          max-width: 120px; width: auto; object-fit: contain; display: block;
        }
        .vw-badge-text-only {
          background: rgba(255,255,255,0.04);
          border-color: rgba(245,200,66,0.22);
          padding: 0 18px;
        }
        .vw-badge-text-only:hover { background: rgba(245,200,66,0.08); }
        .vw-badge-label {
          font-size: 13px; font-weight: 700; color: #f5c842;
          letter-spacing: 0.3px; font-family: 'DM Sans', sans-serif; white-space: nowrap;
        }

        /* ══════════════════════════════════════════
           PARTNER SCHOOLS GRID — same as .wyp-card tiles
        ══════════════════════════════════════════ */
        .vw-schools-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 8px; flex: 1; align-content: stretch;
        }
        .vw-school-tile {
          display: flex; align-items: center; justify-content: center;
          text-align: center;
          padding: clamp(10px, 1.4vh, 16px) 10px;
          background: rgba(245,200,66,0.04);
          border: 1px solid rgba(245,200,66,0.10);
          border-radius: 12px;
          font-size: clamp(10px, 0.9vw, 12px); font-weight: 600;
          color: rgba(255,255,255,0.50);
          font-family: 'DM Sans', sans-serif; line-height: 1.3;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          cursor: default;
        }
        .vw-school-tile:hover {
          background: rgba(245,200,66,0.10);
          border-color: rgba(245,200,66,0.30);
          color: #f5c842;
        }

        /* ══════════════════════════════════════════
           MARQUEE CARD — same mask+scroll as existing
        ══════════════════════════════════════════ */
        .vw-marquee-card-inner {
          display: flex; gap: 0; align-items: center; height: 100%;
        }
        .vw-marquee-card-left {
          flex-shrink: 0; width: clamp(160px, 14vw, 220px);
          padding-right: clamp(20px, 2vw, 32px);
          border-right: 1px solid rgba(255,255,255,0.07);
          display: flex; flex-direction: column; justify-content: center;
        }
        .vw-marquee-card-right {
          flex: 1; min-width: 0;
          padding-left: clamp(20px, 2vw, 32px);
          display: flex; flex-direction: column; justify-content: center; gap: 10px;
        }

        @keyframes vw-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .vw-marquee-wrap {
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
        }
        .vw-marquee-track {
          display: flex; gap: 8px; width: max-content;
          animation: vw-scroll 30s linear infinite;
        }
        .vw-marquee-track:hover { animation-play-state: paused; }
        /* Equal-size company logo badges in marquee */
        .vw-marquee-track .vw-badge {
          width: 110px; height: 42px;
          flex-shrink: 0; padding: 6px 10px;
        }
        .vw-marquee-track .vw-badge-img {
          width: 100%; height: 100%;
          object-fit: contain; max-width: none;
        }
        .vw-marquee-track .vw-badge-label { font-size: 11px; }

        /* ── School strip ── */
        @keyframes vw-school-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .vw-school-strip-wrap {
          overflow: hidden; flex: 1;
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          display: flex; align-items: center;
        }
        .vw-school-strip-track {
          display: flex; gap: 10px; width: max-content;
          animation: vw-school-scroll 22s linear infinite;
        }
        .vw-school-strip-track:hover { animation-play-state: paused; }
        .vw-school-strip-badge {
          display: inline-flex; align-items: center; justify-content: center;
          width: 120px; height: 68px; flex-shrink: 0;
          background: #ffffff;
          border: 1.5px solid rgba(245,200,66,0.30);
          border-radius: 12px;
          padding: 8px 12px;
          box-shadow: 0 2px 8px rgba(1,22,56,0.10);
          transition: border-color 0.2s, transform 0.2s;
        }
        .vw-school-strip-badge:hover {
          border-color: #f5c842; transform: scale(1.05);
        }
        .vw-school-strip-img {
          width: 100%; height: 100%;
          object-fit: contain; display: block;
        }

        /* ══════════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════════ */
        @media (max-width: 1100px) {
          .vw-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto auto;
          }
          .vw-card-stats   { grid-column: 1; grid-row: 1; }
          .vw-card-mentors { grid-column: 2; grid-row: 1; }
          .vw-card-schools { grid-column: 1 / 3; grid-row: 2; }
          .vw-card-marquee { grid-column: 1 / 3; grid-row: 3; }
          .vw-schools-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 720px) {
          .vw-grid { grid-template-columns: 1fr; }
          .vw-card-stats, .vw-card-mentors,
          .vw-card-schools, .vw-card-marquee { grid-column: 1; grid-row: auto; }
          .vw-stats-col { flex-direction: row; gap: 0; }
          .vw-stat-block + .vw-stat-block {
            border-top: none;
            border-left: 1px solid rgba(255,255,255,0.07);
            padding-left: clamp(14px, 3vw, 22px);
            margin-left: clamp(14px, 3vw, 22px);
          }
          .vw-marquee-card-inner { flex-direction: column; gap: 16px; }
          .vw-marquee-card-left {
            width: 100%; padding-right: 0;
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.07);
            padding-bottom: 14px;
          }
          .vw-marquee-card-right { padding-left: 0; }
          .vw-schools-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 540px) {
          .vw-section { padding: 60px 20px 72px; }
          .vw-stats-col { flex-direction: column; }
          .vw-stat-block + .vw-stat-block {
            border-left: none; border-top: 1px solid rgba(255,255,255,0.07);
            padding-left: 0; margin-left: 0;
          }
          .vw-stat-num { font-size: 52px; letter-spacing: -2px; }
          .vw-schools-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 380px) {
          .vw-section { padding: 48px 16px 60px; }
        }
        /* ─────────────────────────────────────
   PREMIUM PARTNER SCHOOL LOGO FIX
───────────────────────────────────── */

/* ---------- STATS CARD PILLS ---------- */

.vw-school-pill {
background: rgba(255,255,255);
  height: 34px;
  padding: 6px 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vw-school-pill img {
  max-height: 20px;
  max-width: 90px;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
}

/* ---------- PARTNER SCHOOLS GRID ---------- */

.vw-school-tile {
  height: 88px;
  padding: 18px 22px;
  background: rgba(255,255,255);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.25s ease;
}

.vw-school-tile img {
        
  max-height: 44px;
  max-width: 160px;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
  transition: all 0.25s ease;
}

/* Hover effect — premium feel */
.vw-school-tile:hover {
  background: rgba(255,255,255);
  border-color: rgba(245,200,66,0.35);
  transform: translateY(-4px);
}

.vw-school-tile:hover img {
  opacity: 1;
  transform: scale(1.05);
}
  .vw-school-tile img {
  max-height: 52px;
}
      `}</style>

      <section className="vw-section" ref={sectionRef}>

        {/* ── Header — matches .sj-header / .sr-header pattern ── */}
        <div className="vw-header">
          <div className="vw-eyebrow">
            <span style={{ display:"inline-block", width:24, height:2, background:"#f5c842", flexShrink:0 }} />
            About Veriseek Education
            <span style={{ display:"inline-block", width:24, height:2, background:"#f5c842", flexShrink:0 }} />
          </div>
          <h2 className="vw-title">
            Why{" "}
            <em>Veriseek?</em>
          </h2>
          <div className="vw-rule-header" />
          <p className="vw-subtitle">A practitioner-led approach to real-world learning.</p>
        </div>

        {/* ── Bento grid ── */}
        <div className="vw-grid">

          {/* ── Stats card ── */}
          <div className="vw-card vw-card-stats vw-anim-item">
            <div className="vw-stats-col">
              <div className="vw-stat-block">
                <p className="vw-card-eyebrow">Reach</p>
                <div className="vw-stat-num">500<span>+</span></div>
                <p className="vw-stat-name">Students Trained</p>
                <p className="vw-stat-desc">Across schools and colleges</p>
              </div>
              <div className="vw-stat-block">
                <p className="vw-card-eyebrow">Network</p>
                <div className="vw-stat-num">25<span>+</span></div>
                <p className="vw-stat-name">Schools &amp; Universities</p>
                <p className="vw-stat-desc">Students from 25+ schools and universities have participated</p>
                {/* <div className="vw-school-pills">
                  {PARTNER_SCHOOLS.map((s) => (
                    <span key={s.alt} className="vw-school-pill"><img src={s.src} alt={s.alt} /></span>
                  ))}
                </div> */}
              </div>
            </div>
          </div>

          {/* ── Mentor institutions card ── */}
          <div className="vw-card vw-card-mentors vw-anim-item">
            <p className="vw-card-eyebrow">Mentors From</p>
            <p className="vw-card-title">Alumni of the world's most prestigious schools</p>
            <div className="vw-card-rule" />
            <div className="vw-logo-grid">
              {INSTITUTE_LOGOS.map((l) => (
                <LogoBadge key={l.alt} {...l} />
              ))}
            </div>
          </div>

          {/* ── Partner schools card — strip format ── */}
          <div className="vw-card vw-card-schools vw-anim-item">
            <p className="vw-card-eyebrow">Partner Schools</p>
            <p className="vw-card-title" style={{ marginBottom: 16 }}>Where we've trained students</p>
            <div className="vw-school-strip-wrap">
              <div className="vw-school-strip-track">
                {[...PARTNER_SCHOOLS, ...PARTNER_SCHOOLS].map((s, i) => (
                  <span key={`${s.alt}-${i}`} className="vw-school-strip-badge">
                    <img src={s.src} alt={s.alt} className="vw-school-strip-img" />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Marquee card ── */}
          <div className="vw-card vw-card-marquee vw-anim-item">
            <div className="vw-marquee-card-inner">
              <div className="vw-marquee-card-left">
                <p className="vw-card-eyebrow">Who You Learn From</p>
                <p className="vw-card-title" style={{ marginBottom: 6 }}>Industry Practitioners</p>
                <p className="vw-card-body" style={{ margin: 0 }}>
                  Investors, founders &amp; senior leaders from the world's top firms.
                </p>
              </div>
              <div className="vw-marquee-card-right">
                <p className="vw-card-eyebrow">Mentors Associated From</p>
                <MarqueeRow />
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}