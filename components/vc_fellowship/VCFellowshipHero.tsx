"use client";

import { useEffect, useRef } from "react";

// ─── Global CSS ────────────────────────────────────────────────────────────────

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes vc-fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes vc-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .vc-anim-0 { animation: vc-fadeUp 0.7s 0.05s ease both; }
  .vc-anim-1 { animation: vc-fadeUp 0.7s 0.20s ease both; }
  .vc-anim-2 { animation: vc-fadeUp 0.7s 0.34s ease both; }
  .vc-anim-3 { animation: vc-fadeUp 0.7s 0.48s ease both; }
  .vc-anim-4 { animation: vc-fadeUp 0.7s 0.60s ease both; }
  .vc-anim-5 { animation: vc-fadeUp 0.7s 0.72s ease both; }
  .vc-anim-6 { animation: vc-fadeUp 0.7s 0.84s ease both; }
  .vc-bg-anim { animation: vc-fadeIn 1.2s ease both; }

  .vc-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 28px; border-radius: 100px; font-size: 14px;
    font-weight: 600; cursor: pointer; text-decoration: none;
    transition: all 0.25s ease; letter-spacing: 0.3px;
    background: #ffffff; color: #011638; border: 2px solid #ffffff;
    font-family: 'DM Sans', sans-serif; white-space: nowrap;
  }
  .vc-btn-primary:hover { background: transparent !important; color: #fff !important; }

  .vc-btn-secondary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 28px; border-radius: 100px; font-size: 14px;
    font-weight: 600; cursor: pointer; text-decoration: none;
    transition: all 0.25s ease; letter-spacing: 0.3px;
    background: transparent; color: #ffffff;
    border: 2px solid rgba(255,255,255,0.50);
    font-family: 'DM Sans', sans-serif; white-space: nowrap;
  }
  .vc-btn-secondary:hover { border-color: #fff !important; background: rgba(255,255,255,0.10) !important; }

  .vc-college-badge {
    padding: 6px 16px; border: 1px solid rgba(255,255,255,0.30);
    border-radius: 100px; font-size: 12px; font-weight: 600;
    letter-spacing: 0.5px; color: rgba(255,255,255,0.75);
    background: rgba(255,255,255,0.08); font-family: 'DM Sans', sans-serif;
    cursor: default; transition: all 0.2s;
    backdrop-filter: blur(4px);
  }
  .vc-college-badge:hover { border-color: rgba(255,255,255,0.70) !important; color: #fff !important; background: rgba(255,255,255,0.15) !important; }

  @media (max-width: 540px) {
    .vc-hero-buttons { flex-direction: column !important; align-items: center !important; }
    .vc-btn-primary, .vc-btn-secondary { justify-content: center; width: 100%; max-width: 280px; padding: 15px 20px !important; }
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

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
    </svg>
  );
}

// ─── Props ─────────────────────────────────────────────────────────────────────

interface VCFellowshipHeroProps {
  heroImageSrc?: string;
  applyHref?: string;
  brochureHref?: string;
  onApply?: () => void;
  onBrochure?: () => void;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  description?: React.ReactNode;
  association?: string;
  colleges?: string[];
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function VCFellowshipHero({
  heroImageSrc,
  applyHref    = "https://rzp.io/rzp/IfWaHBUQ",
  brochureHref = "#brochure",
  onApply = () => { window.location.href = "https://rzp.io/rzp/IfWaHBUQ"; },
  onBrochure,
  eyebrow      = "Summer Skills Week",
  heading      = "VC Fellowship",
  subheading   = "Think Like a Venture Capitalist",
  description,
  association  = "Nandan Capital",
  colleges     = ["MIT", "Wharton", "IIT Delhi", "ISB"],
}: VCFellowshipHeroProps) {
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current) return;
    injected.current = true;
    const tag = document.createElement("style");
    tag.setAttribute("data-vc-hero", "1");
    tag.textContent = GLOBAL_CSS;
    document.head.appendChild(tag);
  }, []);

  const defaultDesc = (
    <>
      VC Fellowship is a first-of-its-kind programme in India that builds real thinking and
      investing skills for students, led by{" "}
      <strong style={{ color: "#fff", fontWeight: 600 }}>senior industry leaders and Ivy League</strong>
      {" "}alumni and culminates in a Shark Tank style VC roleplay where the students are the Sharks.
    </>
  );

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#011638",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Full-bleed Background Image */}
      {heroImageSrc && (
        <img
          src={heroImageSrc}
          alt=""
          aria-hidden="true"
          className="vc-bg-anim"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 1,
          }}
        />
      )}

      {/* Dark gradient overlay — bottom-weighted so text pops */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: heroImageSrc
            ? `linear-gradient(
                to bottom,
                rgba(1,22,56,0.55) 0%,
                rgba(1,22,56,0.62) 40%,
                rgba(1,22,56,0.80) 75%,
                rgba(1,22,56,0.92) 100%
              )`
            : `
              radial-gradient(ellipse 80% 60% at 72% 38%, rgba(30,90,200,0.22) 0%, transparent 70%),
              radial-gradient(ellipse 50% 40% at 15% 85%, rgba(245,200,66,0.07) 0%, transparent 60%)
            `,
        }}
      />

      {/* Subtle vignette for depth */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(1,22,56,0.40) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Centered Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 780,
          padding: "clamp(80px, 12vh, 140px) clamp(20px, 6vw, 60px) clamp(80px, 10vh, 120px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Eyebrow */}
        <div
          className="vc-anim-0"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#f5c842",
            marginBottom: 20,
          }}
        >
          <span style={{ display: "inline-block", width: 28, height: 2, background: "#f5c842", flexShrink: 0 }} />
          {eyebrow}
          <span style={{ display: "inline-block", width: 28, height: 2, background: "#f5c842", flexShrink: 0 }} />
        </div>

        {/* H1 */}
        <h1
          className="vc-anim-1"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(48px, 8vw, 96px)",
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: "-2px",
            color: "#ffffff",
            marginBottom: 16,
            textShadow: "0 2px 24px rgba(1,22,56,0.5)",
          }}
        >
          {heading}
        </h1>

        {/* Subheading */}
        <p
          className="vc-anim-2"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "clamp(20px, 3vw, 32px)",
            fontWeight: 400,
            color: "#f5c842",
            marginBottom: 24,
            letterSpacing: "0.2px",
            textShadow: "0 1px 12px rgba(1,22,56,0.4)",
          }}
        >
          {subheading}
        </p>

        {/* Description */}
        <p
          className="vc-anim-3"
          style={{
            fontSize: "clamp(14px, 1.5vw, 16px)",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.80)",
            marginBottom: 20,
            maxWidth: 580,
            textShadow: "0 1px 8px rgba(1,22,56,0.4)",
          }}
        >
          {description ?? defaultDesc}
        </p>

        {/* Association */}
        {association && (
          <div
            className="vc-anim-4"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              fontSize: 11,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.50)",
              marginBottom: 36,
            }}
          >
            In Association with
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 24,
                padding: "0 12px",
                border: "1px solid rgba(255,255,255,0.30)",
                borderRadius: 3,
                fontSize: 11,
                fontWeight: 600,
                color: "rgba(255,255,255,0.70)",
                letterSpacing: "1px",
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(4px)",
              }}
            >
              {association}
            </span>
          </div>
        )}

        {/* CTA Buttons */}
        <div
          className="vc-anim-5 vc-hero-buttons"
          style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 48 }}
        >
          <a href={applyHref} onClick={onApply} className="vc-btn-primary">
            Apply Now <ArrowIcon />
          </a>
          <a href={brochureHref} onClick={onBrochure} className="vc-btn-secondary">
            Download Brochure <DownloadIcon />
          </a>
        </div>

        {/* College Badges */}
        <div
          className="vc-anim-6"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 24,
            width: "100%",
            maxWidth: 520,
          }}
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.40)",
              marginBottom: 14,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Built by alumni from
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            {colleges.map((c) => (
              <span key={c} className="vc-college-badge">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}