"use client";

import { Italic } from "lucide-react";
import { useEffect, useRef } from "react";

// ─── Global CSS (keyframes + hover states + responsive breakpoints) ────────────

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  @keyframes vc-fadeUp {
    from { opacity: 0; transform: translateY(28px); }
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
  @keyframes vcBounce {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(8px); }
  }

  .vc-anim-0 { animation: vc-fadeUp 0.7s 0.05s ease both; }
  .vc-anim-1 { animation: vc-fadeUp 0.7s 0.18s ease both; }
  .vc-anim-2 { animation: vc-fadeUp 0.7s 0.30s ease both; }
  .vc-anim-3 { animation: vc-fadeUp 0.7s 0.42s ease both; }
  .vc-anim-4 { animation: vc-fadeUp 0.7s 0.54s ease both; }
  .vc-anim-5 { animation: vc-fadeUp 0.7s 0.66s ease both; }
  .vc-anim-6 { animation: vc-fadeUp 0.7s 0.78s ease both; }
  .vc-bg-anim { animation: vc-fadeIn 1s ease both; }

  /* ── Buttons ── */
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

  /* ── College badges ── */
  .vc-college-badge {
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
  .vc-college-badge:hover {
    border-color: #f5c842 !important;
    transform: scale(1.05);
    box-shadow: 0 4px 16px rgba(1,22,56,0.12) !important;
  }
  .vc-college-badge img {
    height: 52px;
    width: auto;
    object-fit: contain;
    display: block;
  }

  /* ── Orbs ── */
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

  /* ── Association pill ── */
  .vc-assoc-pill {
    display: inline-flex; align-items: center; flex-wrap: wrap;
    padding: 8px 20px 8px 16px;
    border-left: 4px solid #f5c842;
    background: rgba(255,255,255,0.06);
    border-radius: 0 8px 8px 0;
    gap: 12px;
    font-family: 'DM Sans', sans-serif;
  }
  .vc-assoc-pill img {
    height: 60px;
    width: auto;
    max-width: 150px;
    object-fit: contain;
    display: block;
  }

  /* ── Tablet: hide right image, expand content ── */
  @media (max-width: 900px) {
    .vc-hero-image   { display: none !important; }
    .vc-hero-content { max-width: 100% !important; }
  }

  /* ── Mobile: tighten padding, stack buttons ── */
  @media (max-width: 540px) {
    .vc-hero-content { padding: 72px 20px 64px !important; }
    .vc-hero-buttons { flex-direction: column !important; align-items: center !important; }
    .vc-btn-primary,
    .vc-btn-secondary { justify-content: center; width: 100%; max-width: 300px; padding: 15px 20px !important; }
    .vc-assoc-row    { flex-wrap: wrap !important; }
    .vc-college-badge { height: 60px !important; padding: 4px 10px !important; }
    .vc-college-badge img { height: 44px !important; }
  }

  @media (max-width: 380px) {
    .vc-college-badge { height: 52px !important; }
    .vc-college-badge img { height: 36px !important; }
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

interface TheDealRoomHeroProps {
  heroImageSrc?: string;
  applyHref?: string;
  brochureHref?: string;
  onApply?: () => void;
  onBrochure?: () => void;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  description?: React.ReactNode;
  colleges?: string[];
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function TheDealRoomHero({
  heroImageSrc,
  applyHref    = "https://rzp.io/rzp/IfWaHBUQ",
  brochureHref = "/images/The_Deal_Room.pdf",
  onApply      = () => { window.location.href = "https://rzp.io/rzp/IfWaHBUQ"; },
  onBrochure,
  eyebrow      = "IN ASSOCIATION WITH",
  heading      = "The Deal Room",
  subheading   = "Make your First Deal.",
  description,
  colleges     = ["/images/WhatsApp Image 2026-02-22 at 4.01.41 PM.jpeg", "/images/wharton.png", "/images/iit.png", "/images/isb-logo1.webp"],
}: TheDealRoomHeroProps) {
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
      The Deal Room is a first-of-its-kind programme in India that builds real thinking and
      investing skills for students, led by{" "}
      <strong style={{ color: "#ffffff", fontWeight: 700 }}>senior industry leaders and Ivy League</strong>
      {" "}alumni and culminates in a <strong style={{ color: "#ffffff", fontWeight: 700 }}>Shark Tank style VC roleplay</strong> where the students are the Sharks.
    </>
  );

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

      {/* Ambient orbs */}
      <div className="vc-orb-1" />
      <div className="vc-orb-2" />

      {/* Background radial glow */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 80% 60% at 72% 38%, rgba(30,90,200,0.22) 0%, transparent 70%),
          radial-gradient(ellipse 50% 40% at 15% 85%, rgba(245,200,66,0.07) 0%, transparent 60%)
        `,
      }} />

      {/* Subtle grid */}
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

      {/* Decorative rings */}
      {[
        { size: 440, top: "6%",  right: "3%",  color: "rgba(255,255,255,0.04)"  },
        { size: 270, bottom: "10%", right: "16%", color: "rgba(245,200,66,0.07)" },
        { size: 165, top: "54%", right: "7%",  color: "rgba(30,90,200,0.11)"   },
      ].map((ring, i) => (
        <div key={i} aria-hidden="true" style={{
          position: "absolute",
          width: ring.size, height: ring.size,
          borderRadius: "50%", border: `1px solid ${ring.color}`,
          top: ring.top, bottom: (ring as any).bottom, right: ring.right,
          pointerEvents: "none",
        }} />
      ))}

      {/* Right-side hero image — hidden on tablet/mobile */}
      {heroImageSrc && (
        <img
          src={heroImageSrc}
          alt=""
          aria-hidden="true"
          className="vc-hero-image vc-bg-anim"
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

      {/* ── Content ── */}
      <div
        className="vc-hero-content"
        style={{
          position: "relative", zIndex: 2,
          width: "100%",
          padding: "88px clamp(20px, 6vw, 80px) 100px",
        }}
      >

        {/* Eyebrow: label + association logos */}
        <div className="vc-anim-0" style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 12,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "#f5c842",
          marginBottom: 0,
        }}>
          {/* <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ display: "inline-block", width: 28, height: 2, background: "#f5c842", flexShrink: 0 }} />
            {eyebrow}
          </div> */}
          {/* Partner logos */}
          {/* <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <img
              src="/images/Nandan_Final_Logo_page-0001_12-removebg-preview.png"
              alt="Nandan Capital"
              style={{ height: 52, width: "auto", maxWidth: 76, objectFit: "contain", background: "white", borderRadius: 4, padding: "2px 4px" }}
            />
            <img
              src="/images/himlandcapitaladvisors_logo-removebg-preview.png"
              alt="Himland Capital Advisors"
              style={{ height: 52, width: "auto", maxWidth: 76, objectFit: "contain", background: "white", borderRadius: 4, padding: "2px 4px" }}
            />
          </div> */}
        </div>

        {/* H1 */}
        <h1 className="vc-anim-1" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(44px, 7vw, 92px)",
          fontWeight: 700, lineHeight: 0.8,
          letterSpacing: "-2px", color: "#ffffff",
          textShadow: "0 2px 32px rgba(1,22,56,0.45)", marginTop: 24,
        }}>
          {/* <span style={{ fontStyle: "italic" }}>The </span> Deal Room */}
          <span>The </span> Deal Room

        </h1>

        {/* Subheading */}
        <p className="vc-anim-2" style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontSize: "clamp(18px, 2.6vw, 30px)",
          fontWeight: 400, color: "#f5c842", marginBottom: 28, letterSpacing: "0.2px",
          textShadow: "0 1px 16px rgba(1,22,56,0.40)",
        }}>
          {subheading}
        </p>

        {/* Description */}
        <p className="vc-anim-3" style={{
          fontSize: "clamp(14px, 1.5vw, 16px)",
          lineHeight: 1.85, color: "rgba(255,255,255,0.72)",
          marginBottom: 32, maxWidth: 640,
        }}>
          {description ?? defaultDesc}
        </p>

        {/* Association pill */}
        <div className="vc-anim-4 vc-assoc-row" style={{ marginBottom: 28 }}>
          <div className="vc-assoc-pill">
            <span style={{
              fontSize: 10, letterSpacing: "2px", textTransform: "uppercase",
              color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap",
            }}>
              In Association with
            </span>
            <a href="https://nandancapital.com/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block" }}>
              <img src="/images/Nandan_Final_Logo_page-0001_12-removebg-preview.png" alt="Nandan Capital" style={{ background: "white", borderRadius: 4, padding: "2px 4px", height: 64, cursor: "pointer" }} />
            </a>
            <a href="https://www.linkedin.com/company/himlandcapitaladvisors" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block" }}>
              <img src="/images/WhatsApp Image 2026-02-22 at 4.01.38 PM.jpeg"    alt="Himland Capital" style={{ background: "white", borderRadius: 4, padding: "2px 4px", height: 64, cursor: "pointer" }} />
            </a>
            <img src="/images/IMG_5883.PNG"                                         alt="" style={{ background: "white", borderRadius: 4, padding: "2px 8px", height: 64 }} />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="vc-anim-5 vc-hero-buttons" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 28 }}>
          <a href={applyHref} onClick={onApply} className="vc-btn-primary">
            14th - 15th March | Apply Now <ArrowIcon />
          </a>
          <a
            href={brochureHref}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="vc-btn-secondary"
          >
            Download Brochure <DownloadIcon />
          </a>
        </div>

        {/* College badges */}
        <div className="vc-anim-6">
          <p style={{
            fontSize: 10, letterSpacing: "2.5px", textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)", marginBottom: 16,
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
          }}>
            Built by alumni from
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {colleges.map((c) => (
              <span key={c} className="vc-college-badge">
                <img src={c} alt="" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="vc-anim-6" style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 2,
      }} aria-hidden="true">
        <div style={{ opacity: 0.60, animation: "vcBounce 1.2s ease-in-out infinite" }}>
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none" stroke="#fff" strokeWidth="2">
            <path d="M1 1l10 10L21 1" />
          </svg>
        </div>
      </div>

    </section>
  );
}