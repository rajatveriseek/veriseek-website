"use client";

import { useEffect, useRef } from "react";

// ─── Global CSS ────────────────────────────────────────────────────────────────

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes vc-fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes vc-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes vc-pulse-glow {
    0%, 100% { opacity: 0.12; }
    50%       { opacity: 0.22; }
  }

  .vc-anim-0 { animation: vc-fadeUp 0.7s 0.05s ease both; }
  .vc-anim-1 { animation: vc-fadeUp 0.7s 0.20s ease both; }
  .vc-anim-2 { animation: vc-fadeUp 0.7s 0.34s ease both; }
  .vc-anim-3 { animation: vc-fadeUp 0.7s 0.48s ease both; }
  .vc-anim-4 { animation: vc-fadeUp 0.7s 0.60s ease both; }
  .vc-bg-anim { animation: vc-fadeIn 1.2s ease both; }

  /* Animated background orbs matching Sharkathon's BackgroundDecorations */
  .vc-orb-1 {
    position: absolute; top: 25%; left: -80px;
    width: 320px; height: 320px;
    background: rgba(245,200,66,0.06);
    border-radius: 50%; filter: blur(60px);
    animation: vc-pulse-glow 4s ease-in-out infinite;
    pointer-events: none;
  }
  .vc-orb-2 {
    position: absolute; bottom: 20%; right: -80px;
    width: 400px; height: 400px;
    background: rgba(56,189,248,0.05);
    border-radius: 50%; filter: blur(80px);
    animation: vc-pulse-glow 4s 1.5s ease-in-out infinite;
    pointer-events: none;
  }

  /* Primary CTA — yellow fill like Sharkathon's "SIGN UP NOW" button */
  .vc-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 32px; border-radius: 100px; font-size: 14px;
    font-weight: 700; cursor: pointer; text-decoration: none;
    transition: all 0.25s ease; letter-spacing: 0.5px;
    background: #f5c842; color: #011638;
    border: 2px solid #f5c842;
    font-family: 'DM Sans', sans-serif; white-space: nowrap;
    box-shadow: 0 8px 24px rgba(245,200,66,0.30);
    text-transform: uppercase;
  }
  .vc-btn-primary:hover {
    background: #ffe066 !important;
    box-shadow: 0 12px 32px rgba(245,200,66,0.50) !important;
    transform: scale(1.04);
  }

  /* Secondary CTA — outline yellow, matches Sharkathon "KNOW MORE" */
  .vc-btn-secondary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 32px; border-radius: 100px; font-size: 14px;
    font-weight: 700; cursor: pointer; text-decoration: none;
    transition: all 0.25s ease; letter-spacing: 0.5px;
    background: transparent; color: #f5c842;
    border: 2px solid #f5c842;
    font-family: 'DM Sans', sans-serif; white-space: nowrap;
    text-transform: uppercase;
  }
  .vc-btn-secondary:hover {
    background: rgba(245,200,66,0.12) !important;
    transform: scale(1.04);
  }

  /* College badges — match Sharkathon's logo container style */
  .vc-college-badge {
    padding: 6px 20px;
    border: 2px solid rgba(245,200,66,0.50);
    border-radius: 10px;
    font-size: 12px; font-weight: 700;
    letter-spacing: 0.5px; color: #011638;
    background: #ffffff;
    font-family: 'DM Sans', sans-serif;
    cursor: default;
    transition: all 0.2s;
    box-shadow: 0 2px 8px rgba(1,22,56,0.06);
  }
  .vc-college-badge:hover {
    border-color: #f5c842 !important;
    transform: scale(1.05);
    box-shadow: 0 4px 16px rgba(1,22,56,0.12) !important;
  }

  /* Info strip gradient underline rule — matches Sharkathon's
     "w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600" section dividers */
  .vc-section-rule {
    width: 96px; height: 4px;
    background: linear-gradient(to right, #60a5fa, #2563eb);
    border-radius: 99px;
    margin: 0 auto 12px;
  }

  /* Association pill — echoes Sharkathon's "Expert Judging Panel" callout
     with navy left-border accent */
  .vc-association-pill {
    display: inline-flex; align-items: center;
    padding: 8px 20px 8px 16px;
    border-left: 4px solid #f5c842;
    background: rgba(1,22,56,0.05);
    border-radius: 0 8px 8px 0;
    gap: 10px;
    font-family: 'DM Sans', sans-serif;
  }

  /* Info strip itself — white card feeling like Sharkathon's bg-white sections */
  .vc-info-strip {
    background: #eef0f2;
    padding: 64px clamp(20px, 6vw, 80px) 72px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-family: 'DM Sans', sans-serif;
    position: relative;
  }
  /* Subtle top border accent line matching Sharkathon's section rhythm */
  .vc-info-strip::before {
    content: '';
    position: absolute;
    top: 0; left: 50%; transform: translateX(-50%);
    width: 80px; height: 4px;
    background: linear-gradient(to right, #f5c842, #f5c842);
    border-radius: 0 0 4px 4px;
  }

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
  infoImageSrc?: string;
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
  infoImageSrc,
  applyHref    = "#apply",
  brochureHref = "#brochure",
  onApply,
  onBrochure,
  eyebrow      = "IN ASSOCIATION WITH NANDAN CAPITAL",
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
      <strong style={{ color: "#011638", fontWeight: 700 }}>senior industry leaders and Ivy League</strong>
      {" "}alumni and culminates in a Shark Tank style VC roleplay where the students are the Sharks.
    </>
  );

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#011638",
          overflow: "hidden",
        }}
      >
        {/* Sharkathon-style ambient orbs */}
        <div className="vc-orb-1" />
        <div className="vc-orb-2" />

        {/* Full-bleed background image */}
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
              objectPosition: "center 30%",
            }}
          />
        )}

        {/* Dark overlay — same depth as Sharkathon hero */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: heroImageSrc
              ? `linear-gradient(
                  to bottom,
                  rgba(1,22,56,0.72) 0%,
                  rgba(1,22,56,0.48) 30%,
                  rgba(1,22,56,0.52) 60%,
                  rgba(1,22,56,0.78) 100%
                )`
              : "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(30,90,200,0.22) 0%, transparent 70%)",
          }}
        />

        {/* Edge vignette */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 110% 100% at 50% 50%, transparent 45%, rgba(1,22,56,0.50) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Hero text */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "0 clamp(20px, 6vw, 80px)",
            width: "100%",
            maxWidth: 860,
          }}
        >
          {/* Eyebrow — yellow flanking lines, same pattern as Sharkathon section dividers */}
          <div
            className="vc-anim-0"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#f5c842",
              marginBottom: 18,
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
              fontSize: "clamp(52px, 9vw, 110px)",
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: "-2.5px",
              color: "#ffffff",
              marginBottom: 18,
              textShadow: "0 2px 32px rgba(1,22,56,0.45)",
            }}
          >
            {heading}
          </h1>

          {/* Italic subheading — yellow-gold matching "BECOME THE NEXT BIG SHARK" */}
          <p
            className="vc-anim-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "clamp(20px, 3.2vw, 36px)",
              fontWeight: 400,
              color: "#f5c842",
              marginBottom: 44,
              letterSpacing: "0.2px",
              textShadow: "0 1px 16px rgba(1,22,56,0.40)",
            }}
          >
            {subheading}
          </p>

          {/* CTA Buttons */}
          <div
            className="vc-anim-3 vc-hero-buttons"
            style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}
          >
            <a href={applyHref} onClick={onApply} className="vc-btn-primary">
              Apply Now <ArrowIcon />
            </a>
            <a href={brochureHref} onClick={onBrochure} className="vc-btn-secondary">
              Download Brochure <DownloadIcon />
            </a>
          </div>
        </div>

        {/* Scroll-hint chevron */}
        <div
          className="vc-anim-4"
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            opacity: 0.40,
          }}
          aria-hidden="true"
        >
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none" stroke="#fff" strokeWidth="2">
            <path d="M1 1l10 10L21 1" />
          </svg>
        </div>
      </section>

      {/* ── INFO STRIP ───────────────────────────────────────────────────── */}
      <section className="vc-info-strip" style={{ textAlign: "left", alignItems: "stretch" }}>

        {/* Two-column grid: text left, image right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(32px, 6vw, 80px)",
            alignItems: "center",
            width: "100%",
            maxWidth: 1100,
            margin: "0 auto",
          }}
          className="vc-info-grid"
        >

          {/* ── LEFT: text column ── */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>

            {/* Section rule + heading */}
            <div className="vc-section-rule" style={{ margin: "0 0 12px 0" }} />
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(22px, 3vw, 30px)",
                fontWeight: 700,
                color: "#011638",
                marginBottom: 20,
                letterSpacing: "-0.5px",
              }}
            >
              About the Programme
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: "clamp(15px, 1.5vw, 17px)",
                lineHeight: 1.85,
                color: "rgba(1,22,56,0.68)",
                marginBottom: 36,
              }}
            >
              {description ?? defaultDesc}
            </p>

            {/* Association — yellow left-border callout */}
            {association && (
              <div className="vc-association-pill" style={{ marginBottom: 44 }}>
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "rgba(1,22,56,0.45)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  In Association with
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#011638",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  {association}
                </span>
              </div>
            )}

            {/* Thin rule */}
            <div style={{ width: 48, height: 1, background: "rgba(1,22,56,0.10)", marginBottom: 28 }} />

            {/* "Built by alumni from" label */}
            <p
              style={{
                fontSize: 10,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "rgba(1,22,56,0.40)",
                marginBottom: 16,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
              }}
            >
              Built by alumni from
            </p>

            {/* Badges */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {colleges.map((c) => (
                <span key={c} className="vc-college-badge">{c}</span>
              ))}
            </div>
          </div>

          {/* ── RIGHT: image column ── */}
          <div
            style={{
              display: "flex",
              borderRadius: 16,
              overflow: "hidden",
              border: "2px solid rgba(245,200,66,0.30)",
              boxShadow: "0 16px 48px rgba(1,22,56,0.12)",
              background: "rgba(1,22,56,0.06)",
              position: "relative",
            }}
          >
            {infoImageSrc ? (
              <img
                src={infoImageSrc}
                alt="Programme overview"
                style={{ width: "100%", height: "100%", objectFit: "fill", display: "block" }}
              />
            ) : (
              /* Placeholder when no image is passed — yellow-accent branded block */
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, rgba(1,22,56,0.04) 0%, rgba(245,200,66,0.08) 100%)",
                  gap: 12,
                }}
              >
                {/* <div style={{ width: 56, height: 4, background: "#f5c842", borderRadius: 99 }} />
                <span style={{ fontSize: 12, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(1,22,56,0.30)", fontFamily: "'DM Sans', sans-serif" }}>
                  Add infoImageSrc
                </span> */}
                <img src="/images/students-session.JPG" alt="" />
              </div>
            )}
          </div>

        </div>

        {/* Responsive: stack on mobile */}
        <style>{`
          @media (max-width: 720px) {
            .vc-info-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

    </div>
  );
}