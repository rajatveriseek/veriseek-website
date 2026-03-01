"use client";

import { useEffect, useRef, useCallback } from "react";

const PART_A = [
  {
    num: "A1",
    id: "tnc-a1",
    title: "Acceptance of Terms",
    body: "By accessing and using this website (the \"Site\"), you agree to be bound by these Terms and Conditions (\"Terms\") and our Privacy Policy. If you do not agree with any part of the Terms, you must not use the Site.",
    items: [],
  },
  {
    num: "A2",
    id: "tnc-a2",
    title: "Use of the Site",
    body: "You agree to use the Site only for lawful purposes and in a way that does not infringe the rights of others, or restrict or inhibit anyone else's use of the Site. You must not:",
    items: [
      "Use the Site in any way that causes, or may cause, damage to the Site or impairment of its availability.",
      "Copy, duplicate, or reuse any content without express written permission.",
    ],
  },
  {
    num: "A3",
    id: "tnc-a3",
    title: "Intellectual Property",
    body: "All content, trademarks, logos, and data on this Site are the intellectual property of the website owner or licensed to the owner, and are protected by copyright and trademark laws. You may not reproduce or redistribute any material without written consent.",
    items: [],
  },
  {
    num: "A4",
    id: "tnc-a4",
    title: "Third-Party Links",
    body: "The Site may contain links to third-party websites. We are not responsible for the content or privacy practices of such websites.",
    items: [],
  },
  {
    num: "A5",
    id: "tnc-a5",
    title: "Disclaimer of Warranties",
    body: 'This Site is provided "as is." We make no warranties, expressed or implied, and hereby disclaim all warranties including, without limitation, implied warranties of merchantability and fitness for a particular purpose.',
    items: [],
  },
  {
    num: "A6",
    id: "tnc-a6",
    title: "Limitation of Liability",
    body: "In no event shall the Site or its owners be liable for any indirect, special, incidental, or consequential damages arising out of the use or inability to use the Site or the content on it.",
    items: [],
  },
  {
    num: "A7",
    id: "tnc-a7",
    title: "Changes to Terms",
    body: "We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on the Site. Your continued use of the Site signifies your acceptance of any updated Terms.",
    items: [],
  },
  {
    num: "A8",
    id: "tnc-a8",
    title: "Governing Law",
    body: "These Terms shall be governed by and construed in accordance with the laws of India.",
    items: [],
  },
];

const PART_B = [
  {
    num: "B1",
    id: "tnc-b1",
    title: "Eligibility",
    body: null,
    items: [
      "Open to students across India and overseas.",
      "Class categories must be adhered to (Class 9 to Class 12).",
      "There could be multiple participants per school.",
      "Participants must have consent from their guardians and school authorities.",
    ],
  },
  {
    num: "B2",
    id: "tnc-b2",
    title: "Registration",
    body: null,
    items: [
      "Registration can be done online on the website, or through the school.",
      "Every participant shall present a school ID card or a letter from the school at the time of the competition as proof of identity.",
      "The Registration fee must be paid on the website or through the school in the designated manner at the time of registration.",
    ],
  },
  {
    num: "B3",
    id: "tnc-b3",
    title: "Competition Format",
    body: "The event will be conducted in two phases:",
    items: [
      "Online: Conducted via various online test taking platforms.",
      "Offline Finals: Held in NCR / Gurugram, though online participation is also allowed.",
    ],
    subSections: [
      {
        title: "Online Phase",
        items: [
          "All participants must have a stable internet connection, a working webcam, and microphone.",
          "Identity verification will be done before the competition starts.",
          "Any technical issues on the participant's side are their own responsibility.",
        ],
      },
      {
        title: "Offline Phase",
        items: [
          "Only shortlisted finalists from the online phase will be invited.",
          "Travel and accommodation arrangements are the responsibility of the school or parents.",
          "ID proof and school verification letter are mandatory for onsite entry.",
        ],
      },
    ],
  },
  {
    num: "B4",
    id: "tnc-b4",
    title: "Code of Conduct",
    body: null,
    items: [
      "Any form of malpractice or dishonesty will result in disqualification.",
      "Participants must behave respectfully with judges, organizers, and other contestants.",
      "Offensive language, gestures, or disruptive behaviour will not be tolerated.",
    ],
  },
  {
    num: "B5",
    id: "tnc-b5",
    title: "Judging & Scoring",
    body: null,
    items: [
      "Judging criteria will be communicated before each event.",
      "The decision of the judges is final and binding.",
      "Scores will not be disclosed beyond winners, unless otherwise stated.",
    ],
  },
  {
    num: "B6",
    id: "tnc-b6",
    title: "Awards & Prizes",
    body: null,
    items: [
      "Prizes will be awarded in each category. Special recognitions may be awarded for creativity, sportsmanship, or innovation.",
      "Certificates of Participation will be given to all verified participants.",
    ],
  },
  {
    num: "B7",
    id: "tnc-b7",
    title: "Media & Consent",
    body: null,
    items: [
      "The event will be recorded for promotional and archival purposes.",
      "By participating, students and schools agree to allow the use of their names, photos, and videos for marketing and reporting.",
    ],
  },
  {
    num: "B8",
    id: "tnc-b8",
    title: "Health & Safety (Offline Events)",
    body: null,
    items: [
      "All participants must adhere to health and safety guidelines issued by local authorities.",
      "In case of an emergency, parents or guardians will be contacted immediately.",
    ],
  },
  {
    num: "B9",
    id: "tnc-b9",
    title: "Changes & Cancellations",
    body: null,
    items: [
      "The organizers reserve the right to modify the event structure or cancel specific categories based on registration numbers or unforeseen circumstances.",
      "In case of event cancellation, a partial or full refund may be issued as per the refund policy.",
    ],
  },
  {
    num: "B10",
    id: "tnc-b10",
    title: "No Legal Liability",
    body: null,
    items: [
      "The organizers, sponsors, partners, and associated personnel shall not be held legally responsible for any loss, injury, damage, or mishap arising during or as a result of participation in the competition.",
      "Participants and their guardians acknowledge and accept that participation is voluntary and at their own risk.",
    ],
  },
];

const ALL_SECTIONS = [...PART_A];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  @keyframes tnc-pulse {
    0%, 100% { opacity: 0.10; }
    50%       { opacity: 0.20; }
  }

  /* ── Page shell ── */
  .tnc-page {
    background: #011638;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }
  .tnc-page::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 10% 20%, rgba(30,90,200,0.16) 0%, transparent 65%),
      radial-gradient(ellipse 50% 40% at 90% 80%, rgba(245,200,66,0.05) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }
  .tnc-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(72px);
    pointer-events: none;
    animation: tnc-pulse 5s ease-in-out infinite;
    z-index: 0;
  }
  .tnc-orb-1 { width: 320px; height: 320px; top: 8%;    right: -80px; background: rgba(245,200,66,0.05); }
  .tnc-orb-2 { width: 260px; height: 260px; bottom: 12%; left: -60px;  background: rgba(30,90,200,0.08); animation-delay: 2s; }

  /* ── Hero ── */
  .tnc-hero {
    flex-shrink: 0;
    position: relative;
    z-index: 2;
    padding: 52px clamp(20px, 8vw, 120px) 36px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }
  .tnc-hero.is-visible { opacity: 1; transform: translateY(0); }

  .tnc-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #f5c842;
    margin-bottom: 14px;
  }
  .tnc-hero-title {
    font-size: clamp(28px, 4vw, 50px);
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -1.5px;
    line-height: 1.05;
    margin-bottom: 10px;
    font-family: 'DM Sans', sans-serif;
  }
  .tnc-hero-sub {
    font-size: clamp(13px, 1.2vw, 14.5px);
    color: rgba(255,255,255,0.45);
    max-width: 600px;
    line-height: 1.8;
    margin-bottom: 14px;
  }
  .tnc-hero-meta {
    display: inline-flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }
  .tnc-meta-pill {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 5px 14px;
    border: 1.5px solid rgba(245,200,66,0.30);
    border-radius: 100px;
    font-size: 11px;
    font-weight: 600;
    color: rgba(255,255,255,0.55);
    background: rgba(245,200,66,0.06);
    letter-spacing: 0.3px;
  }
  .tnc-meta-pill span { color: #f5c842; }
  .tnc-rule {
    width: 80px; height: 4px;
    background: linear-gradient(to right, #60a5fa, #2563eb);
    border-radius: 99px;
  }

  /* ── Two-panel body ── */
  .tnc-body {
    flex: 1;
    min-height: 0;
    position: relative;
    z-index: 2;
    display: flex;
    gap: clamp(24px, 4vw, 56px);
    padding: 0 clamp(20px, 8vw, 120px);
  }

  /* ── Sidebar ── */
  .tnc-sidebar {
    flex-shrink: 0;
    width: 220px;
    padding: 24px 0;
    display: flex;
    flex-direction: column;
    gap: 0;
    overflow-y: auto;
    scrollbar-width: none;
  }
  .tnc-sidebar::-webkit-scrollbar { display: none; }

  /* Part headers inside sidebar */
  .tnc-sidebar-part {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.20);
    padding: 14px 15px 6px;
  }
  .tnc-sidebar-part:first-child { padding-top: 4px; }

  .tnc-nav-item {
    all: unset;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 7px 12px 7px 15px;
    border-radius: 7px;
    border-left: 3px solid transparent;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
    width: 100%;
  }
  .tnc-nav-item:hover { background: rgba(245,200,66,0.05); }
  .tnc-nav-item:hover .tnc-nav-label { color: rgba(255,255,255,0.55); }
  .tnc-nav-item:focus-visible {
    outline: 2px solid rgba(245,200,66,0.50);
    outline-offset: 2px;
  }

  .tnc-nav-num {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: #f5c842;
    opacity: 0.40;
    flex-shrink: 0;
    transition: opacity 0.2s;
    min-width: 22px;
  }
  .tnc-nav-label {
    font-size: 11.5px;
    font-weight: 500;
    color: rgba(255,255,255,0.25);
    line-height: 1.35;
    transition: color 0.2s;
  }
  .tnc-nav-item.active {
    background: rgba(245,200,66,0.08);
    border-left-color: #f5c842;
    padding-left: 12px;
  }
  .tnc-nav-item.active .tnc-nav-num  { opacity: 1; }
  .tnc-nav-item.active .tnc-nav-label { color: rgba(255,255,255,0.88); font-weight: 600; }

  /* ── Scrollable content panel ── */
  .tnc-scroll-panel {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(245,200,66,0.22) transparent;
  }
  .tnc-scroll-panel::-webkit-scrollbar { width: 4px; }
  .tnc-scroll-panel::-webkit-scrollbar-track { background: transparent; }
  .tnc-scroll-panel::-webkit-scrollbar-thumb { background: rgba(245,200,66,0.22); border-radius: 99px; }

  .tnc-sections { padding: 28px 0 80px; }

  /* ── Part dividers inside content ── */
  .tnc-part-header {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 28px 0 20px;
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .tnc-part-header.is-visible { opacity: 1; transform: translateY(0); }
  .tnc-part-header:first-child { padding-top: 0; }

  .tnc-part-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #f5c842;
    white-space: nowrap;
    opacity: 0.80;
  }
  .tnc-part-title {
    font-size: clamp(18px, 2vw, 22px);
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.4px;
    line-height: 1.1;
  }
  .tnc-part-line {
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.07);
  }
  .tnc-part-sub {
    font-size: 12px;
    color: rgba(255,255,255,0.35);
    margin-top: 3px;
  }

  /* ── Section blocks ── */
  .tnc-section-block {
    padding: 24px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.50s ease, transform 0.50s ease;
    scroll-margin-top: 28px;
  }
  .tnc-section-block.is-visible { opacity: 1; transform: translateY(0); }
  .tnc-section-block:last-child { border-bottom: none; }

  .tnc-section-badge {
    display: inline-flex;
    align-items: center;
    padding: 2px 11px;
    border: 1.5px solid rgba(245,200,66,0.28);
    border-radius: 100px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 2px;
    color: #f5c842;
    background: rgba(245,200,66,0.06);
    margin-bottom: 10px;
    text-transform: uppercase;
  }
  .tnc-section-title {
    font-size: clamp(15px, 1.6vw, 18px);
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.2px;
    margin-bottom: 10px;
    font-family: 'DM Sans', sans-serif;
  }
  .tnc-section-body {
    font-size: clamp(12px, 1.1vw, 13.5px);
    color: rgba(255,255,255,0.52);
    line-height: 1.85;
    margin-bottom: 12px;
  }

  .tnc-items {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .tnc-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.055);
    border-radius: 9px;
    padding: 10px 14px;
    transition: background 0.2s, border-color 0.2s;
  }
  .tnc-item:hover {
    background: rgba(245,200,66,0.04);
    border-color: rgba(245,200,66,0.12);
  }
  .tnc-item-dot {
    flex-shrink: 0;
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #f5c842;
    margin-top: 7px;
    opacity: 0.70;
  }
  .tnc-item-text {
    font-size: clamp(12px, 1.05vw, 13.5px);
    color: rgba(255,255,255,0.60);
    line-height: 1.70;
  }

  /* Sub-sections (Online Phase / Offline Phase) */
  .tnc-subsection {
    margin-top: 14px;
    padding-left: 16px;
    border-left: 2px solid rgba(245,200,66,0.20);
  }
  .tnc-subsection-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 8px;
  }

  /* ── Mobile ── */
  @media (max-width: 860px) {
    .tnc-page    { height: auto; overflow: visible; }
    .tnc-sidebar { display: none; }
    .tnc-body    { padding: 0 18px; gap: 0; }
    .tnc-scroll-panel { overflow-y: visible; flex: none; width: 100%; }
    .tnc-hero    { padding: 60px 18px 32px; }
    .tnc-part-header { flex-wrap: wrap; gap: 10px; }
  }
  @media (max-width: 380px) {
    .tnc-hero { padding: 52px 14px 28px; }
    .tnc-body { padding: 0 14px; }
  }
`;

type Section = {
  num: string;
  id: string;
  title: string;
  body?: string | null;
  items?: string[];
  subSections?: { title: string; items: string[] }[];
};

export default function RulesPage() {
  const pageRef     = useRef<HTMLDivElement>(null);
  const heroRef     = useRef<HTMLDivElement>(null);
  const panelRef    = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const partARef    = useRef<HTMLDivElement>(null);
  const partBRef    = useRef<HTMLDivElement>(null);
  const activeRef   = useRef(0);
  const cssInjected = useRef(false);

  useEffect(() => {
    if (cssInjected.current) return;
    cssInjected.current = true;
    const tag = document.createElement("style");
    tag.setAttribute("data-tnc", "1");
    tag.textContent = CSS;
    document.head.appendChild(tag);
  }, []);

  // Animate hero
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { hero.classList.add("is-visible"); io.disconnect(); }
    }, { threshold: 0.1 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  // Animate part headers + section blocks via panel root
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const blocks = sectionRefs.current.filter(Boolean) as HTMLDivElement[];
    const partHeaders = [partARef.current, partBRef.current].filter(Boolean) as HTMLDivElement[];

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLDivElement;
          const idx = blocks.indexOf(el);
          const delay = idx >= 0 ? Math.max(0, (idx % 10)) * 50 : 0;
          setTimeout(() => el.classList.add("is-visible"), delay);
          io.unobserve(el);
        });
      },
      { root: panel, threshold: 0.05 }
    );

    [...partHeaders, ...blocks].forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);

  // Active sidebar tracking
  useEffect(() => {
    const panel = panelRef.current;
    const page  = pageRef.current;
    if (!panel || !page) return;

    const getNavItems = () =>
      Array.from(page.querySelectorAll<HTMLElement>(".tnc-nav-item"));

    const setActive = (idx: number) => {
      if (activeRef.current === idx) return;
      activeRef.current = idx;
      getNavItems().forEach((nav, i) => nav.classList.toggle("active", i === idx));
    };

    const onScroll = () => {
      const blocks  = sectionRefs.current.filter(Boolean) as HTMLDivElement[];
      const panelBB = panel.getBoundingClientRect();
      let active = 0;
      blocks.forEach((block, i) => {
        const top = block.getBoundingClientRect().top - panelBB.top;
        if (top < panelBB.height * 0.38) active = i;
      });
      setActive(active);
    };

    panel.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => panel.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((idx: number) => {
    const panel  = panelRef.current;
    const target = sectionRefs.current[idx];
    if (!panel || !target) return;
    const panelTop  = panel.getBoundingClientRect().top;
    const targetTop = target.getBoundingClientRect().top;
    panel.scrollTo({ top: panel.scrollTop + (targetTop - panelTop) - 28, behavior: "smooth" });
  }, []);

  const renderItems = (items: string[]) => (
    <div className="tnc-items">
      {items.map((item, j) => (
        <div key={j} className="tnc-item">
          <span className="tnc-item-dot" aria-hidden="true" />
          <span className="tnc-item-text">{item}</span>
        </div>
      ))}
    </div>
  );

  const renderSection = (s: Section, globalIdx: number) => (
    <div
      key={s.id}
      id={s.id}
      className="tnc-section-block"
      ref={(el) => { sectionRefs.current[globalIdx] = el; }}
    >
      <div className="tnc-section-badge">{s.num}</div>
      <h3 className="tnc-section-title">{s.title}</h3>
      {s.body && <p className="tnc-section-body">{s.body}</p>}
      {s.items && s.items.length > 0 && renderItems(s.items)}
      {s.subSections && s.subSections.map((sub, si) => (
        <div key={si} className="tnc-subsection">
          <p className="tnc-subsection-title">{sub.title}</p>
          {renderItems(sub.items)}
        </div>
      ))}
    </div>
  );

  return (
    <div className="tnc-page" ref={pageRef}>

      <div className="tnc-orb tnc-orb-1" aria-hidden="true" />
      <div className="tnc-orb tnc-orb-2" aria-hidden="true" />

      {/* Hero */}
      <div className="tnc-hero" ref={heroRef}>
        <div className="tnc-eyebrow">
          <span style={{ display:"inline-block", width:28, height:2, background:"#f5c842", flexShrink:0 }} />
          Veriseek Education
          <span style={{ display:"inline-block", width:28, height:2, background:"#f5c842", flexShrink:0 }} />
        </div>
        <h1 className="tnc-hero-title">
          Rules &{" "}
          <em style={{ fontFamily:"'Playfair Display', Georgia, serif", fontStyle:"italic", fontWeight:400 }}>
            Regulations - Sharkathon
          </em>
        </h1>
        <div className="tnc-hero-meta">
          <span className="tnc-meta-pill">
            <span>Format:</span> Hybrid (Online & Offline)
          </span>
          <span className="tnc-meta-pill">
            <span>Participants:</span> Class 9 – Class 12
          </span>
        </div>
        <div className="tnc-rule" />
      </div>

      {/* Two-panel body */}
      <div className="tnc-body">

        {/* Sidebar */}
        <nav className="tnc-sidebar" aria-label="Rules sections">
          <div className="tnc-sidebar-part">Part A — General Terms</div>
          {PART_A.map((s, i) => (
            <button
              key={s.id}
              className={`tnc-nav-item${i === 0 ? " active" : ""}`}
              onClick={() => scrollTo(i)}
              aria-label={`Jump to ${s.num}: ${s.title}`}
            >
              <span className="tnc-nav-num">{s.num}</span>
              <span className="tnc-nav-label">{s.title}</span>
            </button>
          ))}
          {/* <div className="tnc-sidebar-part">Part B — Competition Rules</div> */}
          {/* {PART_B.map((s, i) => (
            <button
              key={s.id}
              className="tnc-nav-item"
              onClick={() => scrollTo(PART_A.length + i)}
              aria-label={`Jump to ${s.num}: ${s.title}`}
            >
              <span className="tnc-nav-num">{s.num}</span>
              <span className="tnc-nav-label">{s.title}</span>
            </button>
          ))} */}
        </nav>

        {/* Scrollable content */}
        <div className="tnc-scroll-panel" ref={panelRef}>
          <div className="tnc-sections">

            {/* Part A */}
            <div className="tnc-part-header" ref={partARef}>
              <div>
                <p className="tnc-part-label">Part A</p>
                <h2 className="tnc-part-title">General Terms & Conditions</h2>
              </div>
              <div className="tnc-part-line" />
            </div>
            {PART_A.map((s, i) => renderSection(s as Section, i))}

            {/* Part B */}
            {/* <div className="tnc-part-header" ref={partBRef} style={{ marginTop: 16 }}>
              <div>
                <p className="tnc-part-label">Part B</p>
                <h2 className="tnc-part-title">Inter-School Competition Rules</h2>
                <p className="tnc-part-sub">Format: Hybrid (Online & Offline) · Students representing registered schools</p>
              </div>
              <div className="tnc-part-line" />
            </div> */}
            {/* {PART_B.map((s, i) => renderSection(s as Section, PART_A.length + i))} */}

          </div>
        </div>
      </div>
    </div>
  );
}