"use client";

import { useEffect, useRef, useState } from "react";

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; }

  @keyframes sh-fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes sh-fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes sh-pulse-glow {
    0%, 100% { opacity: 0.12; }
    50%       { opacity: 0.22; }
  }
  @keyframes shBounce {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(8px); }
  }
  @keyframes sh-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes sh-card-in {
    from { opacity: 0; transform: translateY(20px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    }
  }

  .sh-anim-0 { animation: sh-fadeUp 0.7s 0.05s ease both; }
  .sh-anim-1 { animation: sh-fadeUp 0.7s 0.18s ease both; }
  .sh-anim-2 { animation: sh-fadeUp 0.7s 0.30s ease both; }
  .sh-anim-3 { animation: sh-fadeUp 0.7s 0.42s ease both; }
  .sh-anim-4 { animation: sh-fadeUp 0.7s 0.54s ease both; }
  .sh-anim-5 { animation: sh-fadeUp 0.7s 0.66s ease both; }
  .sh-anim-6 { animation: sh-fadeUp 0.7s 0.78s ease both; }
  .sh-anim-7 { animation: sh-fadeUp 0.7s 0.90s ease both; }
  .sh-bg-anim { animation: sh-fadeIn 1s ease both; }

  /* ── Season badge ── */
  .sh-season-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 16px 6px 6px;
    background: rgba(245,200,66,0.10);
    border: 1.5px solid rgba(245,200,66,0.35);
    border-radius: 100px;
    font-size: 11px; font-weight: 700;
    letter-spacing: 2.5px; text-transform: uppercase;
    color: #f5c842; font-family: 'DM Sans', sans-serif;
    margin-bottom: 0px;
  }
  .sh-season-dot {
    width: 22px; height: 22px; border-radius: 50%;
    background: #f5c842;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 800; color: #011638;
    letter-spacing: 0; flex-shrink: 0;
  }

  /* ── CTA Buttons ── */
  .sh-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 32px; border-radius: 100px; font-size: 14px;
    font-weight: 700; cursor: pointer; text-decoration: none;
    transition: all 0.25s ease; letter-spacing: 0.5px;
    background: #f5c842; color: #011638; border: 2px solid #f5c842;
    font-family: 'DM Sans', sans-serif;
    box-shadow: 0 8px 24px rgba(245,200,66,0.30);
    text-transform: uppercase; text-align: center;
  }
  .sh-btn-primary:hover {
    background: #ffe066 !important;
    box-shadow: 0 12px 32px rgba(245,200,66,0.50) !important;
    transform: scale(1.04);
  }
  .sh-btn-secondary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 32px; border-radius: 100px; font-size: 14px;
    font-weight: 700; cursor: pointer; text-decoration: none;
    transition: all 0.25s ease; letter-spacing: 0.5px;
    background: transparent; color: #f5c842; border: 2px solid #f5c842;
    font-family: 'DM Sans', sans-serif;
    text-transform: uppercase; text-align: center;
  }
  .sh-btn-secondary:hover {
    background: rgba(245,200,66,0.12) !important;
    transform: scale(1.04);
  }

  /* ── College badges ── */
  .sh-college-badge {
    padding: 6px 14px; border: 2px solid rgba(245,200,66,0.50);
    border-radius: 10px; background: #ffffff; cursor: default;
    transition: all 0.2s; box-shadow: 0 2px 8px rgba(1,22,56,0.06);
    display: inline-flex; align-items: center; justify-content: center;
    height: 76px;
  }
  .sh-college-badge:hover {
    border-color: #f5c842 !important; transform: scale(1.05);
    box-shadow: 0 4px 16px rgba(1,22,56,0.12) !important;
  }
  .sh-college-badge img { height: 52px; width: auto; object-fit: contain; display: block; }

  /* ── Ambient orbs ── */
  .sh-orb-1 {
    position: absolute; top: 25%; left: -80px;
    width: 320px; height: 320px;
    background: rgba(245,200,66,0.06); border-radius: 50%;
    filter: blur(60px); animation: sh-pulse-glow 4s ease-in-out infinite;
    pointer-events: none;
  }
  .sh-orb-2 {
    position: absolute; bottom: 20%; right: -80px;
    width: 400px; height: 400px;
    background: rgba(56,189,248,0.05); border-radius: 50%;
    filter: blur(80px); animation: sh-pulse-glow 4s 1.5s ease-in-out infinite;
    pointer-events: none;
  }

  /* ── Association pill ── */
  .sh-assoc-pill {
    display: inline-flex; align-items: center; flex-wrap: wrap;
    padding: 8px 20px 8px 16px;
    border-left: 4px solid #f5c842;
    background: rgba(255,255,255,0.06);
    border-radius: 0 8px 8px 0; gap: 10px;
    font-family: 'DM Sans', sans-serif; max-width: 100%;
  }
  .sh-assoc-pill img {
    height: 52px; width: auto; max-width: 130px;
    object-fit: contain; display: block; flex-shrink: 0;
  }

  /* ── Shimmer chip ── */
  .sh-first-chip {
    display: inline;
    background: linear-gradient(90deg, #f5c842 0%, #ffe066 50%, #f5c842 100%);
    background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: sh-shimmer 3s linear infinite; font-weight: 700;
  }

  /* ── Decorative rings ── */
  .sh-ring { position: absolute; border-radius: 50%; pointer-events: none; }

  /* ── Hide mobile-only elements on desktop by default ── */
  .sh-mobile-video-wrap { display: none; }
  .sh-info-card-mobile  { display: none; }

  /* ── Info card (shared styles) ── */
  .sh-info-card {
    background: #eec643;
    border-radius: 16px;
    padding: 22px 24px;
    border: 2px solid rgba(255,255,255,0.20);
  }
  .sh-info-card-label {
    font-size: 9px; font-weight: 700;
    letter-spacing: 2.5px; text-transform: uppercase;
    color: rgba(1,22,56,0.50);
    font-family: 'DM Sans', sans-serif;
    margin-bottom: 14px;
  }
  .sh-info-card-rule {
    width: 100%; height: 1px;
    background: rgba(1,22,56,0.12);
    margin-bottom: 14px;
  }
  .sh-info-bullet {
    display: flex; align-items: flex-start; gap: 10px;
    margin-bottom: 12px; font-family: 'DM Sans', sans-serif;
  }
  .sh-info-bullet:last-child { margin-bottom: 0; }
  .sh-info-bullet-dot {
    flex-shrink: 0; margin-top: 6px;
    width: 7px; height: 7px; border-radius: 50%; background: #011638;
  }
  .sh-info-bullet-text {
    font-size: clamp(12px, 1.05vw, 13px);
    font-weight: 400; color: #011638; line-height: 1.5;
  }
  .sh-info-bullet-text strong {
    font-weight: 700; display: block;
    font-size: clamp(12px, 1.1vw, 13.5px); margin-bottom: 1px;
  }

  /* ── Mute button ── */
  .sh-mute-btn {
    position: absolute; bottom: 14px; right: 14px;
    z-index: 10;
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(1,22,56,0.75);
    border: 1.5px solid rgba(245,200,66,0.50);
    color: #f5c842;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
    backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  }
  .sh-mute-btn:hover {
    background: rgba(245,200,66,0.18); transform: scale(1.10);
  }

  /* ════════════════════════════════════════
     DESKTOP LAYOUT  (> 900px)
  ════════════════════════════════════════ */
  .sh-hero-section {
    position: relative;
    /* Full-bleed: escape any parent container with padding or max-width */
    width: 100vw;
    max-width: 100vw;
    left: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    min-height: 100svh;
    display: flex;
    align-items: center;
    background: #011638;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  .sh-video-panel {
    position: absolute; right: 0; top: 0;
    width: 30%; height: 100%;
    z-index: 1; overflow: hidden;
  }
  .sh-video-panel video {
    width: 100%; height: 100%; object-fit: cover; display: block;
  }
  .sh-video-panel::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(
      to right,
      #011638 0%,
      rgba(1,22,56,0.55) 28%,
      rgba(1,22,56,0.10) 60%,
      transparent 100%
    );
    pointer-events: none;
  }

  .sh-info-card-desktop {
    position: absolute;
    right: clamp(25%, 3vw, 35%);
    bottom: clamp(12%, 9vh, 24%);
    z-index: 20;
    width: clamp(220px, 20vw, 280px);
    box-shadow: 0 24px 64px rgba(1,22,56,0.45), 0 4px 16px rgba(1,22,56,0.22);
    animation: sh-card-in 0.7s 0.95s ease both;
  }

  .sh-hero-content {
    position: relative; z-index: 2;
    width: 100%;
    max-width: 70%;
    padding: 88px clamp(20px, 6vw, 80px) 100px;
  }

  /* ════════════════════════════════════════
     641px – 900px
     Text left, tall reel video right — side by side
  ════════════════════════════════════════ */
  @media (max-width: 900px) {
    .sh-video-panel       { display: none !important; }
    .sh-info-card-desktop { display: none !important; }
    .sh-scroll-hint       { display: none !important; }

    .sh-hero-section {
      flex-direction: row;
      align-items: stretch;
      min-height: 100svh;
      overflow: hidden;
    }

    /* Text fills left ~58% */
    .sh-hero-content {
      max-width: unset;
      width: 58%;
      flex-shrink: 0;
      padding: 72px 16px 52px 22px;
      order: 1;
      align-self: center;
    }

    /* Mobile video — right 42%, full viewport height sticky reel */
    .sh-mobile-video-wrap {
      order: 2;
      position: sticky;
      top: 0;     /* lets sticky work in flex; prevents section from over-stretching */
      display: block !important;
      width: 42%;
      height: auto;
      flex-shrink: 0;
      overflow: hidden;
      background: #0a2347;
    }
    .sh-mobile-video-wrap video {
      width: 100%; height: 100%; object-fit: cover; display: block;
    }
    /* Left-edge fade so video blends into dark background */
    .sh-mobile-video-wrap::before {
      content: '';
      position: absolute; inset: 0; z-index: 1;
      background: linear-gradient(
        to right,
        #011638 0%,
        rgba(1,22,56,0.25) 22%,
        transparent 55%
      );
      pointer-events: none;
    }
    .sh-mute-btn { z-index: 2; }

    /* Info card not needed — video speaks for itself */
    .sh-info-card-mobile { display: none !important; }
  }

  /* ════════════════════════════════════════
     ≤ 640px — stacked column, video centered + tall
     Fully resets the 641–900px side-by-side rules
  ════════════════════════════════════════ */
  @media (max-width: 640px) {
    .sh-hero-section {
      flex-direction: column !important;
      align-items: stretch !important;
      min-height: unset !important;
      height: auto !important;
      overflow: hidden !important;        /* clip orbs/glows but let flex children set height */
      padding-bottom: 52px;
    }

    /* Text block — full width again */
    .sh-hero-content {
      width: 100% !important;
      flex-shrink: unset !important;
      padding: 72px 22px 28px !important;
      order: 1;
      align-self: auto !important;
    }

    /* Centered tall reel — reset sticky/column sizing from 900px rule */
    .sh-mobile-video-wrap {
      order: 2;
      position: relative !important;     /* reset sticky */
      top: unset !important;
      align-self: auto !important;       /* reset flex-start from 900px rule */
      flex-shrink: unset !important;
      width: calc(100% - 40px) !important;
      max-width: 320px;
      height: 568px !important;          /* tall 9:16 reel */
      margin: 0 auto !important;         /* ← centered */
      border-radius: 18px;
      overflow: hidden;
      background: #0a2347;
      box-shadow: 0 20px 56px rgba(1,22,56,0.50);
      display: block !important;
    }
    .sh-mobile-video-wrap::before { display: none !important; }
    .sh-mobile-video-wrap video {
      width: 100%; height: 100%; object-fit: cover; display: block;
    }

    /* Info card — centered, matches video width */
    .sh-info-card-mobile {
      order: 3;
      position: static !important;
      z-index: 2;
      display: block !important;
      width: calc(100% - 40px) !important;
      max-width: 320px;
      margin: 16px auto 0 !important;
      box-shadow: 0 12px 36px rgba(1,22,56,0.25);
    }
  }

  /* ════════════════════════════════════════
     ≤ 540px — small phones
  ════════════════════════════════════════ */
  @media (max-width: 540px) {
    .sh-hero-content { padding: 64px 18px 24px !important; }

    .sh-mobile-video-wrap {
      width: calc(100% - 36px) !important;
      max-width: 300px;
      height: 520px !important;
      display: block !important;
    }
    .sh-info-card-mobile {
      width: calc(100% - 36px) !important;
      max-width: 300px;
      display: block !important;
    }

    .sh-hero-buttons {
      flex-direction: column !important;
      align-items: stretch !important;
    }
    .sh-btn-primary,
    .sh-btn-secondary {
      justify-content: center; width: 100%;
      padding: 14px 18px !important; font-size: 12px !important;
      letter-spacing: 0.3px !important;
    }
    .sh-assoc-pill {
      padding: 8px 12px 8px 10px !important;
      gap: 6px !important; flex-wrap: wrap !important;
    }
    .sh-assoc-label { width: 100% !important; margin-bottom: 2px !important; }
    .sh-assoc-pill img { height: 36px !important; max-width: 90px !important; }
    .sh-college-badge { height: 52px !important; padding: 4px 8px !important; }
    .sh-college-badge img { height: 38px !important; }
    .sh-season-badge { font-size: 10px !important; letter-spacing: 2px !important; margin-top: 24px !important; margin-bottom:4px; }
  }

  @media (max-width: 380px) {
    .sh-hero-content { padding: 56px 16px 20px !important; }
    .sh-mobile-video-wrap {
      width: calc(100% - 32px) !important;
      height: 460px !important;
      display: block !important;
    }
    .sh-info-card-mobile {
      width: calc(100% - 32px) !important;
      margin: 12px auto 0 !important;
      display: block !important;
    }
    .sh-assoc-pill img { height: 30px !important; max-width: 76px !important; }
    .sh-college-badge { height: 44px !important; }
    .sh-college-badge img { height: 30px !important; }
  }
`;

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

function VolumeOnIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

function VolumeOffIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function InfoBullet({ label, value }: { label: string; value: string }) {
  return (
    <div className="sh-info-bullet">
      <span className="sh-info-bullet-dot" />
      <p className="sh-info-bullet-text">
        <strong>{label}</strong>
        {value}
      </p>
    </div>
  );
}

function InfoCardBody() {
  return (
    <>
      <p className="sh-info-card-label">Programme Details</p>
      <div className="sh-info-card-rule" />
      <InfoBullet label="Eligible"    value="Class 9th to 12th students" />
      <InfoBullet label="Mode"        value="Online / Offline" />
      <InfoBullet label="Starts from" value="19th July, 2026" />
    </>
  );
}

interface SharkathonHeroProps {
  videoSrc?: string;
  applyHref?: string;
  brochureHref?: string;
  onApply?: () => void;
  onBrochure?: () => void;
  colleges?: Array<{ src: string; alt: string }>;
}

export default function SharkathonHero({
  videoSrc,
  applyHref    = "#apply",
  brochureHref = "/brochure/sharkathon-season-2.pdf",
  onApply,
  onBrochure,
  colleges = [
    { src: "/images/mit2.png",       alt: "MIT"      },
    { src: "/images/wharton.png",    alt: "Wharton"  },
    { src: "/images/iit.png",        alt: "IIT Delhi"},
    { src: "/images/isb-logo1.webp", alt: "ISB"      },
  ],
}: SharkathonHeroProps) {
  const injected    = useRef(false);
  const desktopVid  = useRef<HTMLVideoElement>(null);
  const mobileVid   = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (injected.current) return;
    injected.current = true;
    const tag = document.createElement("style");
    tag.setAttribute("data-sh-hero", "1");
    tag.textContent = GLOBAL_CSS;
    document.head.appendChild(tag);
  }, []);

  useEffect(() => {
    if (desktopVid.current) desktopVid.current.muted = muted;
    if (mobileVid.current)  mobileVid.current.muted  = muted;
  }, [muted]);

  const toggleMute = () => setMuted((m) => !m);

  return (
    <section className="sh-hero-section">

      {/* Ambient orbs */}
      <div className="sh-orb-1" />
      <div className="sh-orb-2" />

      {/* Radial glow */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 80% 60% at 72% 38%, rgba(30,90,200,0.22) 0%, transparent 70%),
          radial-gradient(ellipse 50% 40% at 15% 85%, rgba(245,200,66,0.07) 0%, transparent 60%)
        `,
      }} />

      {/* Grid overlay */}
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
        { size: 440, top: "6%",    right: "3%",  color: "rgba(255,255,255,0.04)" },
        { size: 270, bottom: "10%",right: "16%", color: "rgba(245,200,66,0.07)" },
        { size: 165, top: "54%",   right: "7%",  color: "rgba(30,90,200,0.11)"  },
      ].map((ring, i) => (
        <div key={i} aria-hidden="true" className="sh-ring" style={{
          width: ring.size, height: ring.size,
          border: `1px solid ${ring.color}`,
          top: (ring as any).top, bottom: (ring as any).bottom, right: ring.right,
        }} />
      ))}

      {/* ── DESKTOP: video panel ── */}
      {videoSrc && (
        <div className="sh-video-panel sh-bg-anim">
          <video ref={desktopVid} src={videoSrc} autoPlay loop muted playsInline aria-hidden="true" />
          <button className="sh-mute-btn" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
            {muted ? <VolumeOffIcon /> : <VolumeOnIcon />}
          </button>
        </div>
      )}

      {/* ── DESKTOP: floating info card ── */}
      {videoSrc && (
        <div className="sh-info-card sh-info-card-desktop">
          <InfoCardBody />
        </div>
      )}

      {/* TEXT CONTENT */}
      <div className="sh-hero-content">

        <div className="sh-anim-0">
          <span className="sh-season-badge">
            <span className="sh-season-dot">S2</span>
            Season 2 — Now Open
          </span>
        </div>

        <h1 className="sh-anim-1" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(40px, 7vw, 92px)",
          fontWeight: 700,
          lineHeight: 1.0,
          letterSpacing: "-2px",
          color: "#ffffff",
          textShadow: "0 2px 32px rgba(1,22,56,0.45)",
          marginTop: 0,
          marginBottom: 0,
        }}>
          Sharkathon{" "}
          <span style={{ color: "#f5c842" }}>Season 2</span>
        </h1>

        <p className="sh-anim-2" style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontSize: "clamp(14px, 2.2vw, 26px)",
          fontWeight: 400,
          color: "rgba(255,255,255,0.80)",
          marginTop: 16,
          marginBottom: 20,
          letterSpacing: "3px",
          textTransform: "uppercase",
          textShadow: "0 1px 16px rgba(1,22,56,0.40)",
        }}>
          Become the Next Big Shark
        </p>

        <p className="sh-anim-3" style={{
          fontSize: "clamp(14px, 1.5vw, 16px)",
          lineHeight: 1.85,
          color: "rgba(255,255,255,0.72)",
          marginBottom: 24,
          maxWidth: 600,
        }}>
          Sharkathon is India's{" "}
          <span className="sh-first-chip">FIRST</span>{" "}
          programme that brings real thinking skills to school students, and then puts them in
          the shoes of a{" "}
          <strong style={{ color: "#ffffff", fontWeight: 700 }}>
            CEO, consultant and investor (Shark)
          </strong>
          , where students are the Sharks!
        </p>

        <div className="sh-anim-4" style={{ marginBottom: 24 }}>
          <div className="sh-assoc-pill">
            <span className="sh-assoc-label" style={{
              fontSize: 10, letterSpacing: "2px", textTransform: "uppercase",
              color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap",
            }}>
              In Association with
            </span>
            <a href="https://nandancapital.com/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block" }}>
              <img
                src="/images/Nandan_Final_Logo_page-0001_12-removebg-preview.png"
                alt="Nandan Capital"
                style={{ background: "white", borderRadius: 4, padding: "2px 4px", height: 56, cursor: "pointer" }}
              />
            </a>
            <a href="https://www.linkedin.com/company/himlandcapitaladvisors" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block" }}>
              <img
                src="/images/WhatsApp Image 2026-02-22 at 4.01.38 PM.jpeg"
                alt="Himland Capital"
                style={{ background: "white", borderRadius: 4, padding: "2px 4px", height: 56, cursor: "pointer" }}
              />
            </a>
          </div>
        </div>

        <div className="sh-anim-5 sh-hero-buttons" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 28 }}>
          <a href={applyHref} onClick={onApply} className="sh-btn-primary">
            Register Now <ArrowIcon />
          </a>
          <a href={brochureHref} download target="_blank" rel="noopener noreferrer" onClick={onBrochure} className="sh-btn-secondary">
            Download Brochure <DownloadIcon />
          </a>
        </div>

        <div className="sh-anim-6">
          <p style={{
            fontSize: 10, letterSpacing: "2.5px", textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)", marginBottom: 14,
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
          }}>
            Built by alumni from
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {colleges.map((c) => (
              <span key={c.src} className="sh-college-badge">
                <img src={c.src} alt={c.alt} />
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* MOBILE VIDEO
          641–900px → sticky right column, full height
          ≤ 640px   → centered tall reel below text     */}
      {videoSrc && (
        <div className="sh-mobile-video-wrap">
          <video
            ref={mobileVid}
            src={videoSrc}
            autoPlay loop muted playsInline
            aria-hidden="true"
          />
          <button className="sh-mute-btn" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
            {muted ? <VolumeOffIcon /> : <VolumeOnIcon />}
          </button>
        </div>
      )}

      {/* MOBILE INFO CARD — ≤ 640px only */}
      {videoSrc && (
        <div className="sh-info-card sh-info-card-mobile">
          <InfoCardBody />
        </div>
      )}

      {/* Scroll hint — desktop only */}
      <div className="sh-scroll-hint sh-anim-6" style={{
        position: "absolute", bottom: 32, left: "50%",
        transform: "translateX(-50%)", zIndex: 2,
      }} aria-hidden="true">
        <div style={{ opacity: 0.60, animation: "shBounce 1.2s ease-in-out infinite" }}>
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none" stroke="#fff" strokeWidth="2">
            <path d="M1 1l10 10L21 1" />
          </svg>
        </div>
      </div>

    </section>
  );
}