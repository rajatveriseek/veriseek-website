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

  /* ── Hero title — single-line image + text layout ── */
  .sh-hero-title {
    display: flex; align-items: center; gap: 0.18em;
    flex-wrap: nowrap; white-space: nowrap;
  }
  .sh-hero-logo {
    height: 1em; width: auto;
    display: block; flex-shrink: 0;
    object-fit: contain;
  }

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

  /* ── Hero image — Deal Room style: absolute img with mask-image fade ── */
  .sh-hero-img {
    position: absolute;
    right: 0; top: 0;
    width: 52%; height: 100%;
    object-fit: cover;
    object-position: center 30%;
    opacity: 0.9;
    z-index: 1;
    -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 55%, transparent 80%);
    mask-image:         linear-gradient(to left, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 55%, transparent 80%);
    pointer-events: none;
  }

  .sh-info-card-desktop {
    position: absolute;
    bottom: clamp(136px, 4.5vh, 144px);
    right: clamp(20px, 6vw, 80px);
    z-index: 20;
    width: clamp(480px, 46vw, 680px);
    box-shadow: 0 24px 64px rgba(1,22,56,0.45), 0 4px 16px rgba(1,22,56,0.22);
    animation: sh-card-in 0.7s 0.95s ease both;
  }
  /* horizontal 3-col stat layout inside the card */
  .sh-info-card { padding: 18px 24px; }
  .sh-stat-row {
    display: flex; align-items: stretch;
  }
  .sh-stat-col {
    flex: 1; padding: 4px 20px; text-align: center;
  }
  .sh-stat-col:first-child { padding-left: 4px; text-align: left; }
  .sh-stat-col:last-child  { padding-right: 4px; text-align: right; }
  .sh-stat-divider {
    width: 1px; background: rgba(1,22,56,0.18); flex-shrink: 0; align-self: stretch; margin: 2px 0;
  }
  .sh-stat-label {
    font-size: 9px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: rgba(1,22,56,0.45);
    font-family: 'DM Sans', sans-serif; margin: 0 0 5px;
  }
  .sh-stat-value {
    font-size: 12.5px; font-weight: 700; color: #011638;
    font-family: 'DM Sans', sans-serif; margin: 0;
    line-height: 1.3;
  }
  /* ════════════════════════════════════════
     DESKTOP LAYOUT  (> 900px)
  ════════════════════════════════════════ */
  .sh-hero-section {
    position: relative;
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

  .sh-hero-content {
    position: relative; z-index: 2;
    width: 100%;
    /* Content stays in left ~55%, image bleeds naturally over the right */
    max-width: 68%;
    padding: 88px clamp(20px, 6vw, 80px) 100px;
  }

  /* ════════════════════════════════════════
     <= 900px — hide hero img, full-width content
  ════════════════════════════════════════ */
  @media (max-width: 900px) {
    .sh-hero-img          { display: none !important; }
    .sh-info-card-desktop { display: none !important; }
    .sh-scroll-hint       { display: none !important; }

    .sh-hero-content {
      max-width: 100%;
      width: 100%;
      padding: 72px clamp(20px, 5vw, 48px) 52px;
    }
  }



  /* ════════════════════════════════════════
     <= 640px — small screens
  ════════════════════════════════════════ */
  @media (max-width: 640px) {
    .sh-hero-section {
      min-height: unset !important;
      height: auto !important;
    }
    .sh-hero-content {
      padding: 72px 22px 52px !important;
    }
  }

  /* ════════════════════════════════════════
     <= 540px — small phones
  ════════════════════════════════════════ */
  @media (max-width: 540px) {
    .sh-hero-content { padding: 64px 18px 40px !important; }

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
    .sh-hero-title { flex-wrap: wrap !important; white-space: normal !important; }
    .sh-hero-logo  { height: 0.9em !important; }
  }

  @media (max-width: 380px) {
    .sh-hero-content { padding: 56px 16px 32px !important; }
    .sh-assoc-pill img { height: 30px !important; max-width: 76px !important; }
    .sh-college-badge { height: 44px !important; }
    .sh-college-badge img { height: 30px !important; }
  }

  /* ════════════════════════════════════════
     WHAT IS SHARKATHON SECTION
  ════════════════════════════════════════ */
  .sh-what-section {
    position: relative;
    width: 100vw;
    max-width: 100vw;
    left: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    /* Seamless continuation of hero navy */
    background: #011638;
    padding: 96px clamp(20px, 8vw, 120px) 112px;
    font-family: 'DM Sans', sans-serif;
    overflow: hidden;
  }

  /* Subtle ambient gradients matching hero orbs */
  .sh-what-section::before {
    content: '';
    position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 60% 50% at 50% 0%,   rgba(30,90,200,0.18) 0%, transparent 65%),
      radial-gradient(ellipse 45% 40% at 10% 100%, rgba(245,200,66,0.05) 0%, transparent 55%),
      radial-gradient(ellipse 40% 35% at 90% 80%,  rgba(56,189,248,0.06) 0%, transparent 55%);
  }

  /* Subtle grid overlay matching hero */
  .sh-what-section::after {
    content: '';
    position: absolute; inset: 0; pointer-events: none;
    backgroundImage:
      linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%);
    -webkit-mask-image: radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%);
  }

  /* Column layout — heading centred above video */
  .sh-what-inner {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: clamp(32px, 4vw, 52px);
    align-items: center;
    position: relative;
    z-index: 1;
  }

  .sh-what-text {
    text-align: center;
  }

  .sh-what-label {
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #f5c842;
    font-weight: 700;
    font-family: 'DM Sans', sans-serif;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .sh-what-label::before,
  .sh-what-label::after {
    content: '';
    display: inline-block;
    width: 28px; height: 2px;
    background: #f5c842;
    opacity: 0.70;
  }

  .sh-what-heading {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 4.5vw, 58px);
    font-weight: 700;
    color: #ffffff;
    line-height: 1.08;
    letter-spacing: -1.5px;
    margin: 0;
    text-shadow: 0 2px 24px rgba(1,22,56,0.40);
  }
  .sh-what-heading em {
    font-style: italic;
    color: #f5c842;
  }

  /* Thin rule below heading — same as hero's sj-rule pattern */
  .sh-what-rule {
    width: 80px; height: 3px;
    background: linear-gradient(to right, #f5c842, rgba(245,200,66,0.40));
    border-radius: 99px;
    margin: 16px auto 0;
  }

  /* YouTube embed wrapper */
  .sh-yt-wrap {
    position: relative;
    width: 100%;
    border-radius: 20px;
    overflow: hidden;
    box-shadow:
      0 40px 96px rgba(1,22,56,0.60),
      0 8px 24px rgba(1,22,56,0.40),
      0 0 0 1px rgba(255,255,255,0.06);
    aspect-ratio: 16 / 9;
    background: #0a2347;
  }

  .sh-yt-wrap iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }

  /* Decorative accent border — yellow, matching hero ring style */
  .sh-yt-accent {
    position: absolute;
    bottom: -14px;
    right: -14px;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    border: 2px solid rgba(245,200,66,0.22);
    pointer-events: none;
    z-index: 0;
  }

  .sh-yt-container {
    position: relative;
    z-index: 1;
    width: 100%;
  }

  @media (max-width: 860px) {
    .sh-what-section {
      padding: 72px clamp(20px, 6vw, 48px) 88px;
    }
  }

  @media (max-width: 540px) {
    .sh-what-section {
      padding: 60px 20px 72px;
    }
    .sh-what-heading {
      letter-spacing: -0.5px;
    }
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
    <div className="sh-stat-row">
      <div className="sh-stat-col">
        <p className="sh-stat-label">Eligible</p>
        <p className="sh-stat-value">Class 9th to 12th students</p>
      </div>
      <div className="sh-stat-divider" />
      <div className="sh-stat-col">
        <p className="sh-stat-label">Mode</p>
        <p className="sh-stat-value">Online / Offline</p>
      </div>
      <div className="sh-stat-divider" />
      <div className="sh-stat-col">
        <p className="sh-stat-label">Starts from</p>
        <p className="sh-stat-value">19th July, 2026</p>
      </div>
    </div>
  );
}

interface SharkathonHeroProps {
  imageSrc?: string;
  applyHref?: string;
  brochureHref?: string;
  onApply?: () => void;
  onBrochure?: () => void;
  colleges?: Array<{ src: string; alt: string }>;
}

export default function SharkathonHero({
  imageSrc,
  applyHref    = "https://pages.razorpay.com/pl_SLYleXmwGJkGqi/view",
  brochureHref = "/brochure/sharkathon-season-2.pdf",
  onApply,
  onBrochure,
  colleges = [
    { src: "/mit.png",       alt: "MIT"      },
    { src: "/images/wharton.png",    alt: "Wharton"  },
    { src: "/images/iit.png",        alt: "IIT Delhi"},
    { src: "/images/isb-logo1.webp", alt: "ISB"      },
  ],
}: SharkathonHeroProps) {
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current) return;
    injected.current = true;
    const tag = document.createElement("style");
    tag.setAttribute("data-sh-hero", "1");
    tag.textContent = GLOBAL_CSS;
    document.head.appendChild(tag);
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
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


        {/* Hero image — full right side with mask-image fade, same as Deal Room */}
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Sharkathon Season 2"
            aria-hidden="true"
            className="sh-hero-img sh-bg-anim"
          />
        )}

        {/* Floating info card — desktop only */}
        {imageSrc && (
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

          <h1 className="sh-anim-1 sh-hero-title" style={{
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
            <img src="/images/11.png" alt="" className="sh-hero-logo" />
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

      {/* ══════════════════════════════════════
          WHAT IS SHARKATHON SECTION
      ══════════════════════════════════════ */}
      <section className="sh-what-section">
        <div className="sh-what-inner">

          {/* Heading — centred above video */}
          <div className="sh-what-text">
            <p className="sh-what-label">About the Programme</p>
            <h2 className="sh-what-heading">
              What is <em>Sharkathon?</em>
            </h2>
            <div className="sh-what-rule" />
          </div>

          {/* YouTube embed — full width below heading */}
          <div className="sh-yt-container">
            <div className="sh-yt-accent" aria-hidden="true" />
            <div className="sh-yt-wrap">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/lrMrYxct3Tk?si=euP34w3aDIkD48SL" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}