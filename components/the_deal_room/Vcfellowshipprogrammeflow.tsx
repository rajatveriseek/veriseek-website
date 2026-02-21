"use client";

import { useEffect, useRef, useState } from "react";

const DAYS = [
  {
    day: "DAY 1",
    title: "Building",
    titleAccent: "the Basics",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
    ),
    sessions: [
      { title: "Risk Return Trade-Off", sub: "What would you rather invest in — Tata Power vs Eternal (Zomato)?" },
      { title: "Reading the Financial Story of a Business", sub: "What do revenue, profit and cash actually tell us about business health?" },
      { title: "Valuation vs Accounting — a shift in perspective", sub: "Can you really project the future from the past?" },
      { title: "What does it take to be a Venture Capitalist?", sub: "What it takes to enter, and how to go about entering the Venture Capital industry." },
      { title: "VC vs Other Careers in Finance", sub: "Typical careers in finance and the differences among them." },
      { title: "The VC Mindset", sub: "What VCs see in a pitch deck?" },
    ],
  },
  {
    day: "DAY 2",
    title: "Venture Capital",
    titleAccent: "in Action",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
    ),
    sessions: [
      { title: "Operating & Financial Leverage at Work", sub: "Why do VC funds back loss-making companies?" },
      { title: "Evaluate the Deal — Discussion", sub: "Case studies of how to assess companies like a real investor." },
      { title: "Real Capstone Project", sub: "Shark Tank-style simulation where students are the Sharks — analyse businesses, question founders, and deliver an investment decision." },
    ],
  },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  /* ── Viewport Loading Animations ── */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
  }

  .animate-slide-in-left {
    animation: slideInLeft 0.6s ease-out forwards;
  }

  .animate-scale-in {
    animation: scaleIn 0.6s ease-out forwards;
  }

  .vcf-flow-section {
    background: #011638;
    padding: 88px clamp(20px, 8vw, 120px);
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  /* Subtle radial ambient — same as contact section */
  .vcf-flow-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 80% 20%, rgba(245,200,66,0.05) 0%, transparent 60%),
      radial-gradient(ellipse 50% 40% at 10% 80%, rgba(30,90,200,0.12) 0%, transparent 60%);
    pointer-events: none;
  }

  /* ── Centered header ── */
  .vcf-flow-header {
    text-align: center;
    margin-bottom: 72px;
    position: relative;
    z-index: 1;
  }
  .vcf-flow-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #f5c842;
    margin-bottom: 16px;
  }
  .vcf-flow-title {
    font-size: clamp(30px, 4vw, 48px);
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -1px;
    line-height: 1.1;
    margin-bottom: 12px;
  }
  .vcf-flow-subtitle {
    font-size: 15px;
    color: rgba(255,255,255,0.45);
  }

  /* ── Timeline container ── */
  .vcf-flow-timeline {
    position: relative;
    max-width: 780px;
    margin: 0 auto;
    z-index: 1;
  }

  /* Vertical line */
  .vcf-flow-line {
    position: absolute;
    left: 28px;
    top: 0;
    bottom: 0;
    width: 1.5px;
    background: linear-gradient(to bottom, #f5c842, rgba(245,200,66,0.15));
    border-radius: 99px;
  }

  /* ── Day block ── */
  .vcf-day-block {
    display: flex;
    gap: 0;
    align-items: flex-start;
    margin-bottom: 64px;
  }
  .vcf-day-block:last-child { margin-bottom: 0; }

  /* Icon node on the timeline — yellow circle */
  .vcf-day-node {
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #f5c842;
    color: #011638;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 6px rgba(245,200,66,0.12), 0 8px 24px rgba(245,200,66,0.20);
    position: relative;
    z-index: 2;
    margin-top: 0;
  }

  /* Content to the right of the node */
  .vcf-day-content {
    flex: 1;
    padding-left: 32px;
  }

  /* Day pill badge */
  .vcf-day-badge {
    display: inline-flex;
    align-items: center;
    padding: 4px 14px;
    border: 1.5px solid rgba(245,200,66,0.35);
    border-radius: 100px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2.5px;
    color: #f5c842;
    background: rgba(245,200,66,0.07);
    margin-bottom: 14px;
  }

  /* Day heading */
  .vcf-day-heading {
    font-size: clamp(28px, 3.5vw, 40px);
    font-weight: 700;
    color: #ffffff;
    line-height: 1.05;
    letter-spacing: -0.8px;
    margin-bottom: 22px;
  }
  .vcf-day-heading-accent {
    font-size: clamp(28px, 3.5vw, 40px);
    font-weight: 700;
    color: #f5c842;
    line-height: 1.05;
    letter-spacing: -0.8px;
    margin-bottom: 32px;
    display: inline;
    font-style: italic;
    font-family: 'Playfair Display', Georgia, serif;
  }

  /* Sessions */
  .vcf-sessions {
    display: flex;
    flex-direction: column;
    gap: 0;
    border-left: 1px solid rgba(255,255,255,0.07);
    padding-left: 24px;
    margin-left: 4px;
  }

  .vcf-session {
    padding: 18px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex;
    align-items: flex-start;
    gap: 16px;
    transition: transform 0.2s ease;
  }
  .vcf-session:first-child { padding-top: 0; }
  .vcf-session:last-child { border-bottom: none; padding-bottom: 0; }
  .vcf-session:hover { transform: translateX(4px); }

  /* Number bubble */
  .vcf-session-num {
    flex-shrink: 0;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: rgba(245,200,66,0.10);
    border: 1.5px solid rgba(245,200,66,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(14px, 1.4vw, 15.5px);;
    font-weight: 700;
    color: #f5c842;
    margin-top: 2px;
  }

  /* Session text — larger, matching About Fellowship body size */
  .vcf-session-title {
    font-size: clamp(14px, 1.4vw, 15.5px);;
    font-weight: 600;
    color: #ffffff;
    line-height: 1.4;
    margin-bottom: 5px;
    letter-spacing: -0.1px;
  }
  .vcf-session-sub {
    font-size: clamp(14px, 1.4vw, 15.5px);
    color: rgba(255,255,255,0.50);
    line-height: 1.70;
    font-weight: 400;
  }

  @media (max-width: 600px) {
    .vcf-flow-line { left: 22px; }
    .vcf-day-node { width: 44px; height: 44px; }
    .vcf-day-content { padding-left: 20px; }
    .vcf-sessions { padding-left: 14px; }
  }
`;

export default function VCProgrammeFlow() {
  const injected = useRef(false);
  useEffect(() => {
    if (injected.current) return;
    injected.current = true;
    const tag = document.createElement("style");
    tag.setAttribute("data-vcf-flow", "1");
    tag.textContent = CSS;
    document.head.appendChild(tag);
  }, []);

  return (
    <section className="vcf-flow-section">

      {/* Header */}
      <div className="vcf-flow-header">
        <div className="vcf-flow-eyebrow">
          <span style={{ display: "inline-block", width: 28, height: 2, background: "#f5c842", flexShrink: 0 }} />
          The Deal Room
          <span style={{ display: "inline-block", width: 28, height: 2, background: "#f5c842", flexShrink: 0 }} />
        </div>
        <h2 className="vcf-flow-title">
          Programme{" "}
          <em style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 400 }}>
            Flow
          </em>
        </h2>
        <p className="vcf-flow-subtitle">Two days of structured learning and real-world simulation</p>
      </div>

      {/* Timeline */}
      <div className="vcf-flow-timeline">

        {/* Vertical line */}
        <div className="vcf-flow-line" />

        {DAYS.map((day, di) => (
          <div key={di} className="vcf-day-block">

            {/* Node */}
            <div className="vcf-day-node">{day.icon}</div>

            {/* Content */}
            <div className="vcf-day-content">
              <div className="vcf-day-badge">{day.day}</div>
              <div className="vcf-day-heading">{day.title} <span className="vcf-day-heading-accent">{day.titleAccent}</span></div>
              

              <div className="vcf-sessions">
                {day.sessions.map((s, si) => (
                  <div key={si} className="vcf-session">
                    <span className="vcf-session-num">{si + 1}</span>
                    <div>
                      <p className="vcf-session-title">{s.title}</p>
                      <p className="vcf-session-sub">{s.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}