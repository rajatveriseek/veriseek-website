"use client";

import { useEffect, useRef } from "react";

// --- Data ----------------------------------------------------------------------

const JOURNEY = [
  {
    type: "learning",
    date: "14th June 2026",
    title: "Critical Thinking",
    body: "How do CEOs separate signal from noise and facts from opinions?",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    type: "learning",
    date: "21st June 2026",
    title: "Data Sufficiency",
    body: "How do leaders know when they have enough data to decide?",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
  },
  {
    type: "learning",
    date: "28th June 2026",
    title: "Business Maths",
    body: "Can you do CEO-style maths in minutes?",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 7h6M9 12h6M9 17h4"/>
      </svg>
    ),
  },
  {
    type: "learning",
    date: "05th July 2026",
    title: "Structured Thinking",
    body: "How do consultants turn a messy problem into a clean structure?",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    type: "learning",
    date: "14th July 2026",
    title: "Financial Terms & Business Metrics",
    body: "How do Sharks decode a business using its numbers and metrics?",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    type: "round",
    date: "19th July 2026",
    title: "The CEO Round",
    body: "Apply your decision-making under real CEO-style pressure.",
    roundNum: "01",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
  },
  {
    type: "round",
    date: "26th July 2026",
    title: "The Consultant Round",
    body: "Present your structured recommendation like a top-tier consultant.",
    roundNum: "02",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    type: "round",
    date: "2nd August 2026",
    title: "The Investor Round",
    body: "Become the Shark. Pitch, question, decide, and defend your investment call.",
    roundNum: "03",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
];

function CalendarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}

// --- Card content - shared between both layouts --------------------------------

function CardContent({ item }: { item: typeof JOURNEY[number] }) {
  const isRound = item.type === "round";
  return (
    <div className={`sj-card-box ${isRound ? "sj-card-box-round" : ""}`}>
      <div className="sj-date">
        <CalendarIcon />
        {item.date}
      </div>
      {isRound && "roundNum" in item && (
        <p className="sj-round-num">Round {(item as any).roundNum}</p>
      )}
      <p className={`sj-card-title ${isRound ? "sj-card-title-round" : ""}`}>{item.title}</p>
      <p className="sj-card-body-text">{item.body}</p>
    </div>
  );
}

// --- Phase pill ----------------------------------------------------------------

function PhasePill({ label, isRound = false }: { label: string; isRound?: boolean }) {
  return (
    <div className={`sj-phase-pill ${isRound ? "sj-phase-pill-round" : ""}`}>
      {label}
    </div>
  );
}

// --- Main component ------------------------------------------------------------

export default function SharkathonJourney() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const header = section.querySelector<HTMLElement>(".sj-header");
    const items  = Array.from(section.querySelectorAll<HTMLElement>(".sj-anim-item"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          if (el === header) {
            el.classList.add("is-visible");
          } else {
            const idx = items.indexOf(el);
            setTimeout(() => el.classList.add("is-visible"), idx * 100);
          }
          io.unobserve(el);
        });
      },
      { threshold: 0.05 }
    );

    if (header) io.observe(header);
    items.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const learningItems = JOURNEY.filter((j) => j.type === "learning");
  const roundItems    = JOURNEY.filter((j) => j.type === "round");

  return (
    <>
      <style>{`
/* ---------------------------------------
           SECTION
        --------------------------------------- */
        .sj-section {
          background: #011638;
          padding: 80px clamp(16px, 7vw, 100px) 100px;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .sj-section::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 50% at 50% 0%, rgba(245,200,66,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 10% 80%, rgba(30,90,200,0.12) 0%, transparent 60%);
        }

        /* ---------------------------------------
           HEADER
        --------------------------------------- */
        .sj-header {
          text-align: center; margin-bottom: 64px;
          position: relative; z-index: 1;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .sj-header.is-visible { opacity: 1; transform: translateY(0); }

        .sj-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: #f5c842;
          margin-bottom: 12px; font-family: 'DM Sans', sans-serif;
        }
        .sj-title {
          font-size: clamp(26px, 3.8vw, 44px); font-weight: 700;
          color: #ffffff; letter-spacing: -0.8px; line-height: 1.1;
          font-family: 'DM Sans', sans-serif;
        }
        .sj-rule {
          width: 96px; height: 4px;
          background: linear-gradient(to right, #f5c842, #ffe066);
          border-radius: 99px; margin: 14px auto 0;
        }
        .sj-subtitle {
          margin-top: 12px; font-size: 15px;
          color: rgba(255,255,255,0.40); font-family: 'DM Sans', sans-serif;
        }

        /* ---------------------------------------
           ANIMATION BASE
        --------------------------------------- */
        .sj-anim-item {
          opacity: 0; transform: translateY(18px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .sj-anim-item.is-visible { opacity: 1; transform: translateY(0); }

        /* ---------------------------------------
           PHASE PILL
        --------------------------------------- */
        .sj-phase-pill {
          display: inline-flex; align-items: center;
          padding: 6px 18px;
          background: rgba(245,200,66,0.10);
          border: 1.5px solid rgba(245,200,66,0.30);
          border-radius: 100px;
          font-size: 10px; font-weight: 700;
          letter-spacing: 2.5px; text-transform: uppercase;
          color: #f5c842; font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
        }
        .sj-phase-pill-round {
          background: rgba(245,200,66,0.15);
          border-color: rgba(245,200,66,0.50);
        }

        .sj-learning-wrapper,
        .sj-rounds-wrapper {
          position: relative;
        }

        /* ---------------------------------------
           CARD BOX
        --------------------------------------- */
        .sj-card-box {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 16px 18px;
          transition: background 0.25s ease, border-color 0.25s ease;
        }
        .sj-card-box:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(245,200,66,0.22);
        }
        .sj-card-box-round {
          background: rgba(245,200,66,0.07) !important;
          border-color: rgba(245,200,66,0.25) !important;
        }
        .sj-card-box-round:hover {
          background: rgba(245,200,66,0.12) !important;
          border-color: rgba(245,200,66,0.42) !important;
        }
        .sj-date {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 10px; font-weight: 700; letter-spacing: 1.2px;
          text-transform: uppercase; color: rgba(245,200,66,0.65);
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 6px;
        }
        .sj-round-num {
          font-size: 10px; font-weight: 800; letter-spacing: 1.5px;
          color: rgba(245,200,66,0.55); text-transform: uppercase;
          font-family: 'DM Sans', sans-serif; margin-bottom: 4px;
        }
        .sj-card-title {
          font-size: clamp(13px, 1.2vw, 15px); font-weight: 700;
          color: #ffffff; line-height: 1.3; letter-spacing: -0.1px;
          font-family: 'DM Sans', sans-serif; margin-bottom: 6px;
        }
        .sj-card-title-round { color: #f5c842; }
        .sj-card-body-text {
          font-size: clamp(12px, 1vw, 13px); line-height: 1.65;
          color: rgba(255,255,255,0.50); font-family: 'DM Sans', sans-serif;
          font-weight: 400; margin: 0;
        }

        /* ---------------------------------------
           DOT STYLES
        --------------------------------------- */
        .sj-dot {
          width: 40px; height: 40px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }
        .sj-dot:hover { transform: scale(1.12); }
        .sj-dot-learning {
          background: rgba(245,200,66,0.10);
          border: 2px solid rgba(245,200,66,0.35);
          color: #f5c842;
        }
        .sj-dot-round {
          background: #f5c842; border: 2px solid #f5c842; color: #011638;
          box-shadow: 0 0 0 5px rgba(245,200,66,0.12), 0 4px 16px rgba(245,200,66,0.28);
        }

        /* ---------------------------------------
           VERTICAL CONNECTOR SEGMENT
        --------------------------------------- */
        .sj-connector {
          display: flex; justify-content: center;
        }
        .sj-connector-line {
          width: 2px;
          background: rgba(245,200,66,0.28);
          border-radius: 1px;
        }
        .sj-connector-line-bright {
          background: rgba(245,200,66,0.45);
        }

        /* ---------------------------------------
           ....  DESKTOP  ....
           Zigzag: left-centre-right grid
        --------------------------------------- */
        .sj-river-desktop {
          display: block;
          position: relative;
          max-width: 860px;
          margin: 0 auto;
          z-index: 1;
        }

        /* Continuous background line - desktop only */
        // .sj-river-bg-line {
        //   position: absolute;
        //   left: 50%; top: 0; bottom: 0;
        //   width: 2px; transform: translateX(-50%);
        //   background: linear-gradient(
        //     to bottom,
        //     transparent 0%,
        //     rgba(245,200,66,0.22) 4%,
        //     rgba(245,200,66,0.40) 12%,
        //     rgba(245,200,66,0.40) 88%,
        //     rgba(245,200,66,0.22) 96%,
        //     transparent 100%
        //   );
        //   pointer-events: none; z-index: 0;
        // }

        .sj-river-bg-line.learning-only {
          position: absolute;
          left: 50%;
          top: 0;
          height: 100%; /* adjust until it stops before rounds */
          width: 2px;
          transform: translateX(-50%);
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(245,200,66,0.22) 4%,
            rgba(245,200,66,0.40) 12%,
            rgba(245,200,66,0.40) 100%
          );
        }

        .sj-river-bg-line.rounds-only {
          position: absolute;
          left: 50%;
          top: 60%;   /* Start BELOW learning line */
          bottom: 0;
          width: 2px;
          transform: translateX(-50%);
          background: linear-gradient(
            to bottom,
            rgba(245,200,66,0.35),
            rgba(245,200,66,0.45)
          );
        }

        /* Flowing dot animation on the bg line */
        .sj-river-bg-line::after {
          content: '';
          position: absolute; left: 50%; transform: translateX(-50%);
          width: 6px; height: 6px; border-radius: 50%;
          background: #f5c842; opacity: 0;
          animation: sj-flow 3.5s ease-in-out infinite;
        }
        @keyframes sj-flow {
          0%   { top: 2%;  opacity: 0; }
          8%   { opacity: 0.55; }
          92%  { opacity: 0.55; }
          100% { top: 98%; opacity: 0; }
        }

        /* Row: 3-column grid used for every node row + connectors */
        .sj-row {
          display: grid;
          grid-template-columns: 1fr 40px 1fr;
          align-items: center;
          position: relative; z-index: 1;
        }
        .sj-row-centre {
          display: flex; justify-content: center; align-items: center;
        }
        .sj-row-left  { padding-right: 20px; display: flex; justify-content: flex-end; }
        .sj-row-right { padding-left: 20px;  display: flex; justify-content: flex-start; }
        .sj-row-empty { /* intentionally empty */ }

        /* Phase divider row */
        .sj-phase-row {
          display: grid;
          grid-template-columns: 1fr 40px 1fr;
          align-items: center;
          position: relative; z-index: 1;
          margin: 8px 0;
        }
        .sj-phase-row-line {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(245,200,66,0.22));
        }
        .sj-phase-row-line-rev {
          background: linear-gradient(to left, transparent, rgba(245,200,66,0.22));
        }

        /* Connector row heights */
        .sj-conn-row {
          display: grid;
          grid-template-columns: 1fr 40px 1fr;
          position: relative; z-index: 1;
        }
        .sj-conn-row-centre {
          display: flex; justify-content: center;
        }

        /* Terminal dot at bottom */
        .sj-terminal {
          display: flex; justify-content: center;
          padding: 8px 0 0;
          position: relative; z-index: 1;
        }
        .sj-terminal-dot {
          width: 14px; height: 14px; border-radius: 50%;
          background: #f5c842;
          box-shadow: 0 0 0 5px rgba(245,200,66,0.15), 0 0 20px rgba(245,200,66,0.30);
        }

        /* ---------------------------------------
           ....  MOBILE  ....
           Single left-aligned column
        --------------------------------------- */
        .sj-river-mobile {
          display: none;
          position: relative;
          z-index: 1;
          /* The river line is a left border on the container */
          padding-left: 52px;
        }
        /* River line */
        .sj-river-mobile::before {
          content: '';
          position: absolute;
          left: 19px; top: 0; bottom: 0;
          width: 2px;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(245,200,66,0.30) 3%,
            rgba(245,200,66,0.45) 10%,
            rgba(245,200,66,0.45) 90%,
            rgba(245,200,66,0.30) 97%,
            transparent 100%
          );
          border-radius: 1px;
        }

        /* Mobile phase label row */
        .sj-m-phase {
          display: flex; align-items: center;
          margin-bottom: 4px;
          position: relative;
        }
        /* Dot for phase label on the line */
        .sj-m-phase::before {
          content: '';
          position: absolute;
          left: -40px;
          width: 10px; height: 10px; border-radius: 50%;
          background: rgba(245,200,66,0.30);
          border: 1.5px solid rgba(245,200,66,0.60);
          transform: translateX(-50%);
        }

        /* Mobile node row */
        .sj-m-node {
          display: flex; align-items: flex-start; gap: 14px;
          margin-bottom: 0;
          position: relative;
        }
        /* The dot sits on the river line */
        .sj-m-dot-wrap {
          position: absolute;
          left: -52px;
          top: 12px;
          display: flex; align-items: center; justify-content: center;
          width: 40px;
        }

        /* Spacer between mobile nodes */
        .sj-m-spacer {
          height: 20px;
          position: relative;
        }

        /* Mobile card fills remaining width */
        .sj-m-card { width: 100%; padding-bottom: 4px; }

        /* Mobile terminal */
        .sj-m-terminal {
          position: absolute;
          left: -33px;
          bottom: -16px;
          width: 14px; height: 14px; border-radius: 50%;
          background: #f5c842;
          box-shadow: 0 0 0 4px rgba(245,200,66,0.15), 0 0 16px rgba(245,200,66,0.28);
        }

        /* --- BREAKPOINTS --- */
        @media (max-width: 640px) {
          .sj-river-desktop { display: none !important; }
          .sj-river-mobile  { display: block !important; }
          .sj-section { padding: 60px 20px 80px; }
          .sj-header { margin-bottom: 48px; }
          .sj-subtitle { font-size: 13px; }
        }

        @media (max-width: 400px) {
          .sj-section { padding: 48px 16px 72px; }
          .sj-river-mobile { padding-left: 44px; }
          .sj-river-mobile::before { left: 15px; }
          .sj-m-dot-wrap { left: -44px; }
          .sj-m-phase::before { left: -33px; }
          .sj-m-terminal { left: -28px; }
          .sj-dot { width: 34px; height: 34px; }
          .sj-card-box { padding: 12px 14px; }
        }
      `}</style>

      <section className="sj-section" ref={sectionRef}>

        {/* -- Header -- */}
        <div className="sj-header">
          <div className="sj-eyebrow">
            <span style={{ display:"inline-block", width:24, height:2, background:"#f5c842", flexShrink:0 }} />
            Sharkathon Season 2
            <span style={{ display:"inline-block", width:24, height:2, background:"#f5c842", flexShrink:0 }} />
          </div>
          <h2 className="sj-title">
            Student{" "}
            <em style={{ fontFamily:"'Playfair Display', Georgia, serif", fontStyle:"italic", fontWeight:400 }}>
              Journey
            </em>
          </h2>
          <div className="sj-rule" />
          <p className="sj-subtitle">From first principles to your final pitch - every step mapped out.</p>
        </div>

        {/* --------------------------------
            DESKTOP ZIGZAG RIVER
        -------------------------------- */}
        <div className="sj-river-desktop">
          <div className="sj-learning-wrapper">
            <div className="sj-river-bg-line learning-only" />

            {/* -- Learning phase pill -- */}
            <div className="sj-row sj-anim-item" style={{ marginBottom: 12 }}>
              <div className="sj-row-empty" />
              <div className="sj-row-centre">
                <PhasePill label="Learning Phase" />
              </div>
              <div className="sj-row-empty" />
            </div>

            {/* -- Learning nodes -- */}
            {learningItems.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={item.title}>
                  {/* Connector */}
                  {/* <div className="sj-conn-row">
                    <div />
                    <div className="sj-conn-row-centre">
                      <div className="sj-connector-line" style={{ height: 28 }} />
                    </div>
                    <div />
                  </div> */}
                  {/* Node row */}
                  <div className="sj-row sj-anim-item">
                    <div className={isLeft ? "sj-row-left" : "sj-row-empty"}>
                      {isLeft && <CardContent item={item} />}
                    </div>
                    <div className="sj-row-centre">
                      <div className="sj-dot sj-dot-learning">{item.icon}</div>
                    </div>
                    <div className={!isLeft ? "sj-row-right" : "sj-row-empty"}>
                      {!isLeft && <CardContent item={item} />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* -- Connector before rounds phase pill -- */}
          {/* <div className="sj-conn-row">
            <div />
            <div className="sj-conn-row-centre">
              <div className="sj-connector-line" style={{ height: 36 }} />
            </div>
            <div />
          </div> */}

          {/* -- Competition rounds phase pill -- */}
          <div className="sj-phase-row sj-anim-item"  style={{ margin: "20px 0px" }}>
            <div />
            <div style={{ display:"flex", justifyContent:"center" }}>
              <PhasePill label="Competition Rounds" isRound />
            </div>
            <div />
          </div>
          
          <div className="sj-learning-wrapper"></div>
            <div className="sj-river-bg-line rounds-only" />

            {/* -- Round nodes -- */}
            {roundItems.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={item.title}>
                  {/* <div className="sj-conn-row">
                    <div />
                    <div className="sj-conn-row-centre">
                      <div className="sj-connector-line sj-connector-line-bright" style={{ height: 28 }} />
                    </div>
                    <div />
                  </div> */}
                  <div className="sj-row sj-anim-item">
                    <div className={isLeft ? "sj-row-left" : "sj-row-empty"}>
                      {isLeft && <CardContent item={item} />}
                    </div>
                    <div className="sj-row-centre">
                      <div className="sj-dot sj-dot-round">{item.icon}</div>
                    </div>
                    <div className={!isLeft ? "sj-row-right" : "sj-row-empty"}>
                      {!isLeft && <CardContent item={item} />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* -- Terminal dot -- */}
          <div className="sj-conn-row">
            <div />
            <div className="sj-conn-row-centre">
              <div className="sj-connector-line sj-connector-line-bright" style={{ height: 24 }} />
            </div>
            <div />
          </div>
          <div className="sj-terminal sj-anim-item">
            <div className="sj-terminal-dot" />
          </div>

        {/* --------------------------------
            MOBILE SINGLE-COLUMN RIVER
        -------------------------------- */}
        <div className="sj-river-mobile">

          {/* -- Learning phase pill -- */}
          <div className="sj-m-phase sj-anim-item" style={{ marginBottom: 20 }}>
            <PhasePill label="Learning Phase" />
          </div>

          {/* -- Learning nodes -- */}
          {learningItems.map((item, i) => (
            <div key={item.title}>
              <div className="sj-m-node sj-anim-item">
                <div className="sj-m-dot-wrap">
                  <div className="sj-dot sj-dot-learning">{item.icon}</div>
                </div>
                <div className="sj-m-card">
                  <CardContent item={item} />
                </div>
              </div>
              {i < learningItems.length - 1 && <div className="sj-m-spacer" />}
            </div>
          ))}

          {/* -- Rounds phase pill -- */}
          <div className="sj-m-spacer" style={{ height: 32 }} />
          <div className="sj-m-phase sj-anim-item" style={{ marginBottom: 20 }}>
            <PhasePill label="Competition Rounds" isRound />
          </div>

          {/* -- Round nodes -- */}
          {roundItems.map((item, i) => (
            <div key={item.title}>
              <div className="sj-m-node sj-anim-item">
                <div className="sj-m-dot-wrap">
                  <div className="sj-dot sj-dot-round">{item.icon}</div>
                </div>
                <div className="sj-m-card">
                  <CardContent item={item} />
                </div>
              </div>
              {i < roundItems.length - 1 && <div className="sj-m-spacer" />}
            </div>
          ))}

          {/* Terminal */}
          <div style={{ height: 32, position:"relative" }}>
            <div className="sj-m-terminal" />
          </div>
        </div>

      </section>
    </>
  );
}