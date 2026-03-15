"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

// ─── Icons ─────────────────────────────────────────────────────────────────────

const FormatIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const EligibilityIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const DurationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const DeadlineIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);

// ─── Main Component ────────────────────────────────────────────────────────────

export default function VeriseekProgrammes() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const els = Array.from(section.querySelectorAll<HTMLElement>(".ep-reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            setTimeout(
              () => el.classList.add("ep-in"),
              parseInt(el.dataset.delay ?? "0")
            );
          } else {
            el.classList.remove("ep-in");
          }
        });
      },
      { threshold: 0.06 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ══════════════════════════════════════
           SECTION
        ══════════════════════════════════════ */
        .ep-section {
          background: #011638;
          padding: 72px clamp(20px, 6vw, 88px) 88px;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .ep-section::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 50% at 50% 0%,   rgba(245,200,66,0.04) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at  5% 80%,  rgba(30,90,200,0.10)  0%, transparent 60%),
            radial-gradient(ellipse 35% 35% at 95% 70%,  rgba(30,90,200,0.07)  0%, transparent 55%);
        }

        /* ══════════════════════════════════════
           REVEAL
        ══════════════════════════════════════ */
        .ep-reveal {
          opacity: 0; transform: translateY(22px);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .ep-reveal.ep-in { opacity: 1; transform: translateY(0); }

        /* ══════════════════════════════════════
           HEADER
        ══════════════════════════════════════ */
        .ep-header {
          margin-bottom: 44px;
          position: relative; z-index: 1;
        }
        .ep-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: rgba(255,255,255,0.30);
          margin-bottom: 12px; font-family: 'DM Sans', sans-serif;
        }
        .ep-heading {
          font-size: clamp(26px, 3.5vw, 42px);
          font-weight: 700; color: #ffffff;
          letter-spacing: -0.8px; line-height: 1.05;
          font-family: 'DM Sans', sans-serif; margin: 0;
        }
        .ep-heading em {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic; font-weight: 400; color: #f5c842;
        }
        .ep-heading-rule {
          width: 64px; height: 3px; margin-top: 14px;
          background: linear-gradient(to right, #f5c842, rgba(245,200,66,0.25));
          border-radius: 99px;
        }

        /* ══════════════════════════════════════
           CARDS GRID
        ══════════════════════════════════════ */
        .ep-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(14px, 2vw, 24px);
          max-width: 1240px;
          margin: 0 auto;
          position: relative; z-index: 1;
        }

        /* ══════════════════════════════════════
           CARD
        ══════════════════════════════════════ */
        .ep-card {
          background: #111c2d;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(255,255,255,0.06);
          position: relative;
          transition: box-shadow 0.35s ease, transform 0.35s ease, border-color 0.35s ease;
        }
        .ep-card.ep-in:hover {
          box-shadow: 0 20px 60px rgba(1,22,56,0.55), 0 4px 16px rgba(1,22,56,0.25);
          border-color: rgba(245,200,66,0.18);
        }

        /* ══════════════════════════════════════
           MEDIA
        ══════════════════════════════════════ */
        .ep-media {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 8.5;
          overflow: hidden;
          background: #0a1930;
          flex-shrink: 0;
        }
        .ep-media-img,
        .ep-media-video {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center 30%;
          display: block;
          transition: transform 0.5s ease;
        }
        .ep-card.ep-in:hover .ep-media-img,
        .ep-card.ep-in:hover .ep-media-video {
          transform: scale(1.04);
        }

        /* Gradient fade bottom of media into card body */
        .ep-media::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 60%;
          background: linear-gradient(to top, #111c2d 0%, rgba(17,28,45,0.4) 60%, transparent 100%);
          pointer-events: none; z-index: 1;
        }

        /* Play button */
        .ep-play {
          position: absolute; inset: 0; z-index: 2;
          display: flex; align-items: center; justify-content: center;
          pointer-events: none;
        }
        .ep-play-btn {
          width: 54px; height: 54px; border-radius: 50%;
          background: rgba(255,255,255,0.15);
          border: 2px solid rgba(255,255,255,0.55);
          backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          transition: background 0.25s, border-color 0.25s, transform 0.25s;
        }
        .ep-card.ep-in:hover .ep-play-btn {
          background: rgba(245,200,66,0.30);
          border-color: #f5c842;
          color: #f5c842;
          transform: scale(1.12);
        }

        /* Programme tag */
        .ep-tag {
          position: absolute; top: 14px; left: 14px; z-index: 3;
          display: inline-flex; align-items: center;
          padding: 5px 13px;
          border: 1.5px solid;
          border-radius: 100px;
          font-size: 10px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          font-family: 'DM Sans', sans-serif;
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          white-space: nowrap;
        }

        /* ══════════════════════════════════════
           CARD BODY
        ══════════════════════════════════════ */
        .ep-body {
          padding: clamp(20px, 2.2vw, 28px) clamp(20px, 2.2vw, 28px) clamp(24px, 2.5vw, 30px);
          display: flex; flex-direction: column;
          flex: 1; gap: 0;
        }

        .ep-card-title {
          font-size: clamp(17px, 1.7vw, 21px);
          font-weight: 700; color: #ffffff;
          letter-spacing: -0.3px; line-height: 1.25;
          font-family: 'DM Sans', sans-serif;
          margin: 0 0 10px;
        }
        .ep-card-desc {
          font-size: clamp(12.5px, 1.05vw, 13.5px);
          line-height: 1.75;
          color: rgba(255,255,255,0.48);
          font-family: 'DM Sans', sans-serif;
          font-weight: 400; margin: 0 0 20px;
        }

        .ep-divider {
          width: 100%; height: 1px;
          background: rgba(255,255,255,0.07);
          margin-bottom: 20px; flex-shrink: 0;
        }

        /* ── Meta grid ── */
        .ep-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px 12px;
          margin-bottom: 26px;
        }
        .ep-meta-item {
          display: flex; align-items: flex-start; gap: 10px;
        }
        .ep-meta-icon {
          flex-shrink: 0;
          width: 34px; height: 34px; border-radius: 50%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.55);
          margin-top: 1px;
        }
        .ep-meta-texts { display: flex; flex-direction: column; gap: 2px; }
        .ep-meta-label {
          font-size: 10px; font-weight: 700;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: rgba(255,255,255,0.30);
          font-family: 'DM Sans', sans-serif;
        }
        .ep-meta-value {
          font-size: clamp(12px, 1vw, 13px);
          font-weight: 500; color: rgba(255,255,255,0.80);
          font-family: 'DM Sans', sans-serif;
          line-height: 1.40;
        }

        /* ── CTAs ── */
        .ep-ctas {
          display: flex; align-items: center;
          gap: 20px; flex-wrap: wrap;
          margin-top: auto; padding-top: 4px;
        }
        .ep-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 26px; border-radius: 100px;
          font-size: 12.5px; font-weight: 700;
          letter-spacing: 0.7px; text-transform: uppercase;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          background: #f5c842; color: #011638;
          border: 2px solid #f5c842;
          box-shadow: 0 6px 20px rgba(245,200,66,0.20);
          transition: all 0.25s ease; white-space: nowrap;
        }
        .ep-btn-primary:hover {
          background: #ffe066;
          box-shadow: 0 10px 28px rgba(245,200,66,0.38);
          transform: scale(1.04);
        }
        .ep-btn-link {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 12px; font-weight: 600;
          color: rgba(255,255,255,0.32);
          font-family: 'DM Sans', sans-serif;
          text-decoration: none; letter-spacing: 0.2px;
          transition: color 0.2s; white-space: nowrap;
          background: none; border: none; cursor: pointer; padding: 0;
        }
        .ep-btn-link:hover { color: rgba(255,255,255,0.70); }

        /* ══════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════ */
        @media (max-width: 860px) {
          .ep-grid { grid-template-columns: 1fr; max-width: 580px; }
          .ep-section { padding: 60px clamp(16px, 5vw, 40px) 72px; }
        }
        @media (max-width: 480px) {
          .ep-meta { grid-template-columns: 1fr; gap: 14px; }
          .ep-ctas { flex-direction: column; align-items: stretch; }
          .ep-btn-primary { justify-content: center; }
        }
      `}</style>

      <section className="ep-section" ref={sectionRef} id="programmes">

        {/* ── Header ── */}
        <header className="ep-header ep-reveal" data-delay="0">
          <div className="ep-eyebrow">
            <span style={{ display:"inline-block", width:22, height:2, background:"rgba(255,255,255,0.20)", flexShrink:0 }} />
            Veriseek Education
            <span style={{ display:"inline-block", width:22, height:2, background:"rgba(255,255,255,0.20)", flexShrink:0 }} />
          </div>
          <h2 className="ep-heading">
            Explore{" "}
            <em>Programmes</em>
          </h2>
          <div className="ep-heading-rule" />
        </header>

        {/* ── Cards ── */}
        <div className="ep-grid">

          {/* ────────────────────────────────
              CARD 1 — The Deal Room / VC Fellowship
          ──────────────────────────────── */}
          <article className="ep-card ep-reveal" data-delay="120">

            <div className="ep-media">
              {/* Replace src with Card 2 image path */}
              <Image
                src="/images/P1101630.JPG"
                alt="VC Fellowship"
                className="ep-media-img"
                width={620}
                height={330}
                loading="lazy"
                sizes="(max-width: 860px) 100vw, 50vw"
              />
              {/* <div className="ep-play">
                <div className="ep-play-btn"><PlayIcon /></div>
              </div> */}
              <span
                className="ep-tag"
                style={{ color: "#f5c842", borderColor: "rgba(245,200,66,0.40", background: "rgba(245,200,66,0.10)" }}
              >
                College Programme
              </span>
            </div>

            <div className="ep-body">
              <h3 className="ep-card-title">The Deal Room</h3>
              <p className="ep-card-desc">
                The Deal Room is a first of its kind programme in India that builds real thinking
                and investing skills for students, led by senior industry leaders and Ivy League
                alumni and culminates in a Shark Tank style VC roleplay where the students are the Sharks.
              </p>

              <div className="ep-divider" />

              <div className="ep-meta">
                <div className="ep-meta-item">
                  <span className="ep-meta-icon"><FormatIcon /></span>
                  <div className="ep-meta-texts">
                    <span className="ep-meta-label">Format</span>
                    <span className="ep-meta-value">On campus, case-based sessions + investor simulation</span>
                  </div>
                </div>
                <div className="ep-meta-item">
                  <span className="ep-meta-icon"><EligibilityIcon /></span>
                  <div className="ep-meta-texts">
                    <span className="ep-meta-label">Eligibility</span>
                    <span className="ep-meta-value">Undergraduate students (all streams)</span>
                  </div>
                </div>
                <div className="ep-meta-item">
                  <span className="ep-meta-icon"><DurationIcon /></span>
                  <div className="ep-meta-texts">
                    <span className="ep-meta-label">Duration</span>
                    <span className="ep-meta-value">Two days</span>
                  </div>
                </div>
              </div>

              <div className="ep-ctas">
                <a href="/thedealroom" className="ep-btn-primary">
                  Explore Programme <ArrowIcon />
                </a>
                <button
                  type="button"
                  className="ep-btn-link"
                  onClick={() => window.dispatchEvent(new CustomEvent('openPartnershipForm'))}
                >
                  Request Institutional Partnership <ArrowIcon />
                </button>
              </div>
            </div>
          </article>

          {/* ────────────────────────────────
              CARD 2 — Sharkathon
          ──────────────────────────────── */}
          <article className="ep-card ep-reveal" data-delay="240">

            <div className="ep-media">
              {/* Auto-playing muted video — replace src with actual video path */}
              <Image
                src="/images/P1101636.JPG"
                alt="VC Fellowship"
                className="ep-media-img"
                width={620}
                height={330}
                loading="lazy"
                sizes="(max-width: 860px) 100vw, 50vw"
              />
              {/* <div className="ep-play">
                <div className="ep-play-btn"><PlayIcon /></div>
              </div> */}
              <span
                className="ep-tag"
                style={{ color: "#f5c842", borderColor: "rgba(245,200,66,0.40)", background: "rgba(245,200,66,0.10)" }}
              >
                School Programme
              </span>
            </div>

            <div className="ep-body">
              <h3 className="ep-card-title">Sharkathon Season 2</h3>
              <p className="ep-card-desc">
                Sharkathon is India's first programme and competition that brings real thinking
                skills to school students, and then puts them in the shoes of a CEO, consultant
                and investor (Shark), where students are the sharks!
              </p>

              <div className="ep-divider" />

              <div className="ep-meta">
                <div className="ep-meta-item">
                  <span className="ep-meta-icon"><FormatIcon /></span>
                  <div className="ep-meta-texts">
                    <span className="ep-meta-label">Format</span>
                    <span className="ep-meta-value">Hybrid</span>
                  </div>
                </div>
                <div className="ep-meta-item">
                  <span className="ep-meta-icon"><EligibilityIcon /></span>
                  <div className="ep-meta-texts">
                    <span className="ep-meta-label">Eligibility</span>
                    <span className="ep-meta-value">Grades 9th - 12th (and recent passouts)</span>
                  </div>
                </div>
                <div className="ep-meta-item">
                  <span className="ep-meta-icon"><DeadlineIcon /></span>
                  <div className="ep-meta-texts">
                    <span className="ep-meta-label">Deadline</span>
                    <span className="ep-meta-value">Registrations close on a rolling basis</span>
                  </div>
                </div>
              </div>

              <div className="ep-ctas">
                <a href="/sharkathon" className="ep-btn-primary">
                  Explore Programme <ArrowIcon />
                </a>
                <button
                  type="button"
                  className="ep-btn-link"
                  onClick={() => window.dispatchEvent(new CustomEvent('openPartnershipForm'))}
                >
                  Request Institutional Partnership <ArrowIcon />
                </button>
              </div>
            </div>
          </article>

        </div>
      </section>
    </>
  );
}