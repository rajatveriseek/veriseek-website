"use client";

import { useEffect, useRef } from "react";

// ─── Global CSS ────────────────────────────────────────────────────────────────

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; }

  @keyframes vs-fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes vs-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes vs-pulse-glow {
    0%, 100% { opacity: 0.12; }
    50%       { opacity: 0.22; }
  }
  @keyframes vsBounce {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(8px); }
  }
  @keyframes vs-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }

  .vs-anim-0 { animation: vs-fadeUp 0.7s 0.05s ease both; }
  .vs-anim-1 { animation: vs-fadeUp 0.7s 0.18s ease both; }
  .vs-anim-2 { animation: vs-fadeUp 0.7s 0.30s ease both; }
  .vs-anim-3 { animation: vs-fadeUp 0.7s 0.42s ease both; }
  .vs-anim-4 { animation: vs-fadeUp 0.7s 0.54s ease both; }
  .vs-anim-5 { animation: vs-fadeUp 0.7s 0.66s ease both; }
  .vs-anim-6 { animation: vs-fadeUp 0.7s 0.78s ease both; }
  .vs-bg-anim { animation: vs-fadeIn 1s ease both; }

  /* ── Buttons ── */
  .vs-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 32px; border-radius: 100px; font-size: 14px;
    font-weight: 700; cursor: pointer; text-decoration: none;
    transition: all 0.25s ease; letter-spacing: 0.5px;
    background: #f5c842; color: #011638;
    border: 2px solid #f5c842;
    font-family: 'DM Sans', sans-serif; white-space: normal;
    box-shadow: 0 8px 24px rgba(245,200,66,0.30);
    text-transform: uppercase; text-align: center;
  }
  .vs-btn-primary:hover {
    background: #ffe066 !important;
    box-shadow: 0 12px 32px rgba(245,200,66,0.50) !important;
    transform: scale(1.04);
  }
  .vs-btn-secondary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 32px; border-radius: 100px; font-size: 14px;
    font-weight: 700; cursor: pointer; text-decoration: none;
    transition: all 0.25s ease; letter-spacing: 0.5px;
    background: transparent; color: #f5c842;
    border: 2px solid #f5c842;
    font-family: 'DM Sans', sans-serif; white-space: normal;
    text-transform: uppercase; text-align: center;
  }
  .vs-btn-secondary:hover {
    background: rgba(245,200,66,0.12) !important;
    transform: scale(1.04);
  }

  /* ── College / logo badges ── */
  .vs-college-badge {
    padding: 6px 14px;
    border: 2px solid rgba(245,200,66,0.50);
    border-radius: 10px;
    background: #ffffff;
    cursor: default;
    transition: all 0.2s;
    box-shadow: 0 2px 8px rgba(1,22,56,0.06);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 76px;
  }
  .vs-college-badge:hover {
    border-color: #f5c842 !important;
    transform: scale(1.05);
    box-shadow: 0 4px 16px rgba(1,22,56,0.12) !important;
  }
  .vs-college-badge img {
    height: 52px; width: auto;
    object-fit: contain; display: block;
  }

  /* ── Eyebrow pill ── */
  .vs-season-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 16px 6px 6px;
    background: rgba(245,200,66,0.10);
    border: 1.5px solid rgba(245,200,66,0.35);
    border-radius: 100px;
    font-size: 11px; font-weight: 700;
    letter-spacing: 2.5px; text-transform: uppercase;
    color: #f5c842; font-family: 'DM Sans', sans-serif;
    margin-bottom: 0;
  }
  .vs-season-dot {
    width: 22px; height: 22px; border-radius: 50%;
    background: #f5c842;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 800; color: #011638;
    letter-spacing: 0; flex-shrink: 0;
  }

  /* ── Shimmer chip ── */
  .vs-first-chip {
    display: inline;
    background: linear-gradient(90deg, #f5c842 0%, #ffe066 50%, #f5c842 100%);
    background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: vs-shimmer 3s linear infinite; font-weight: 700;
  }

  /* ── Orbs ── */
  .vs-orb-1 {
    position: absolute; top: 25%; left: -80px;
    width: 320px; height: 320px;
    background: rgba(245,200,66,0.06); border-radius: 50%;
    filter: blur(60px);
    animation: vs-pulse-glow 4s ease-in-out infinite;
    pointer-events: none;
  }
  .vs-orb-2 {
    position: absolute; bottom: 20%; right: -80px;
    width: 400px; height: 400px;
    background: rgba(56,189,248,0.05); border-radius: 50%;
    filter: blur(80px);
    animation: vs-pulse-glow 4s 1.5s ease-in-out infinite;
    pointer-events: none;
  }

  /* ── Tablet: hide right image, expand content ── */
  @media (max-width: 900px) {
    .vs-hero-image   { display: none !important; }
    .vs-hero-content { max-width: 100% !important; }
  }

  /* ── Mobile ── */
  @media (max-width: 540px) {
    .vs-hero-content  { padding: 80px 18px 60px !important; }
    .vs-hero-buttons  { flex-direction: column !important; align-items: stretch !important; }
    .vs-btn-primary,
    .vs-btn-secondary {
      justify-content: center; width: 100%;
      padding: 14px 18px !important; font-size: 12px !important;
      letter-spacing: 0.3px !important;
    }
    .vs-college-badge  { height: 56px !important; padding: 4px 8px !important; }
    .vs-college-badge img { height: 40px !important; }
  }

  @media (max-width: 380px) {
    .vs-hero-content  { padding: 72px 16px 48px !important; }
    .vs-college-badge  { height: 48px !important; padding: 3px 7px !important; }
    .vs-college-badge img { height: 32px !important; }
    .vs-btn-primary,
    .vs-btn-secondary { font-size: 11px !important; padding: 13px 14px !important; }
  }
`;

// ─── Icons ─────────────────────────────────────────────────────────────────────

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

function ExploreIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

// ─── Props ─────────────────────────────────────────────────────────────────────

interface VeriseekHeroProps {
  heroImageSrc?: string;
  primaryHref?: string;
  secondaryHref?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  colleges?: Array<{ src: string; alt: string }>;
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function VeriseekHero({
  heroImageSrc,
  primaryHref   = "#contact",
  secondaryHref = "#programmes",
  onPrimary,
  onSecondary,
  colleges = [
    { src: "/images/wharton.png",                   alt: "Wharton"  },
    { src: "/images/McKinseyCompany_logo-dark.png", alt: "McKinsey" },
  ],
}: VeriseekHeroProps) {
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current) return;
    injected.current = true;
    const tag = document.createElement("style");
    tag.setAttribute("data-vs-hero", "1");
    tag.textContent = GLOBAL_CSS;
    document.head.appendChild(tag);
  }, []);

  return (
    <section style={{
      position: "relative",
      width: "100%",
      minHeight: "100svh",
      display: "flex",
      alignItems: "center",
      background: "#011638",
      overflow: "hidden",
      fontFamily: "'DM Sans', sans-serif",
    }}>

      {/* ── Ambient orbs ── */}
      <div className="vs-orb-1" />
      <div className="vs-orb-2" />

      {/* ── Background radial glow ── */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 80% 60% at 72% 38%, rgba(30,90,200,0.22) 0%, transparent 70%),
          radial-gradient(ellipse 50% 40% at 15% 85%, rgba(245,200,66,0.07) 0%, transparent 60%)
        `,
      }} />

      {/* ── Grid overlay ── */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse at 65% 40%, black 20%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse at 65% 40%, black 20%, transparent 70%)",
      }} />

      {/* ── Decorative rings ── */}
      {[
        { size: 440, top: "6%",    right: "3%",  color: "rgba(255,255,255,0.04)" },
        { size: 270, bottom: "10%",right: "16%", color: "rgba(245,200,66,0.07)" },
        { size: 165, top: "54%",   right: "7%",  color: "rgba(30,90,200,0.11)"  },
      ].map((ring, i) => (
        <div key={i} aria-hidden="true" style={{
          position: "absolute",
          width: ring.size, height: ring.size,
          borderRadius: "50%",
          border: `1px solid ${ring.color}`,
          top: (ring as any).top,
          bottom: (ring as any).bottom,
          right: ring.right,
          pointerEvents: "none",
        }} />
      ))}

      {/* ── Right-side hero image — hidden on tablet/mobile ── */}
      {heroImageSrc && (
        <img
          src={heroImageSrc}
          alt=""
          aria-hidden="true"
          className="vs-hero-image vs-bg-anim"
          style={{
            position: "absolute", right: 0, top: 0,
            width: "52%", height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
            opacity: 0.9,
            maskImage: "linear-gradient(to left, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 75%, transparent 92%)",
            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 75%, transparent 92%)",
          }}
        />
      )}

      {/* ── Main content ── */}
      <div
        className="vs-hero-content"
        style={{
          position: "relative", zIndex: 2,
          width: "100%",
          maxWidth: "62%",
          padding: "88px clamp(20px, 6vw, 80px) 100px",
        }}
      >

        {/* Eyebrow pill */}
        <div className="vs-anim-0">
          <span className="vs-season-badge">
            <span className="vs-season-dot">V</span>
            Practitioner-Led Learning
          </span>
        </div>

        {/* H1 */}
        <h1 className="vs-anim-1" style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(44px, 7vw, 92px)",
          fontWeight: 700,
          lineHeight: 1.0,
          letterSpacing: "-2px",
          color: "#ffffff",
          textShadow: "0 2px 32px rgba(1,22,56,0.45)",
          marginTop: 24,
          marginBottom: 0,
        }}>
          Veri<span style={{ color: "#f5c842" }}>seek</span>{" "}
          <em style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "0.82em",
            letterSpacing: "-1px",
          }}>
            Education
          </em>
        </h1>

        {/* Subheading */}
        <p className="vs-anim-2" style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontSize: "clamp(15px, 2.2vw, 26px)",
          fontWeight: 400,
          color: "rgba(255,255,255,0.80)",
          marginTop: 16,
          marginBottom: 28,
          letterSpacing: "0.2px",
          textShadow: "0 1px 16px rgba(1,22,56,0.40)",
        }}>
          Designed to build the skills we wish school had taught.
        </p>

        {/* Description */}
        <p className="vs-anim-3" style={{
          fontSize: "clamp(14px, 1.5vw, 16px)",
          lineHeight: 1.85,
          color: "rgba(255,255,255,0.72)",
          marginBottom: 32,
          maxWidth: 600,
        }}>
          Veriseek is India's{" "}
          <span className="vs-first-chip">FIRST</span>{" "}
          practitioner-led programme that puts students in the shoes of a{" "}
          <strong style={{ color: "#ffffff", fontWeight: 700 }}>
            CEO, consultant, and investor
          </strong>
          , led by senior industry leaders and Ivy League alumni.
        </p>

        {/* Built by logos */}
        <div className="vs-anim-4" style={{ marginBottom: 32 }}>
          <p style={{
            fontSize: 10, letterSpacing: "2.5px", textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)", marginBottom: 14,
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
          }}>
            Built by alumni from
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {colleges.map((c) => (
              <span key={c.src} className="vs-college-badge">
                <img src={c.src} alt={c.alt} />
              </span>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="vs-anim-5 vs-hero-buttons" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a href={primaryHref} onClick={onPrimary} className="vs-btn-primary">
            Request an Institutional Call <ArrowIcon />
          </a>
          <a href={secondaryHref} onClick={onSecondary} className="vs-btn-secondary">
            Explore Programme <ExploreIcon />
          </a>
        </div>

      </div>

      {/* ── Scroll hint ── */}
      <div className="vs-anim-6" style={{
        position: "absolute", bottom: 32, left: "50%",
        transform: "translateX(-50%)", zIndex: 2,
      }} aria-hidden="true">
        <div style={{ opacity: 0.60, animation: "vsBounce 1.2s ease-in-out infinite" }}>
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none" stroke="#fff" strokeWidth="2">
            <path d="M1 1l10 10L21 1" />
          </svg>
        </div>
      </div>

    </section>
  );
}