"use client";

import { useEffect, useRef, useCallback } from "react";

const SECTIONS = [
  {
    num: "A",
    id: "section-a",
    title: "Participant-Initiated Cancellations",
    body: "No refunds will be issued in the event a participant voluntarily withdraws from the programme, regardless of the timing or reason.",
    items: [],
  },
  {
    num: "B",
    id: "section-b",
    title: "Organiser-Initiated Cancellations",
    body: "In the unlikely event that the Sharkathon programme is cancelled by the organisers, the following refund structure shall apply:",
    items: [
      { label: "Before Round 1", value: "100% refund" },
      { label: "After Round 1 but before Round 2", value: "75% refund" },
      { label: "After Round 2 but before Round 3", value: "50% refund" },
      { label: "After Round 3", value: "No refund" },
    ],
    footnote: "Refunds will be processed to the original mode of payment within 10 working days from the date of formal communication.",
  },
  {
    num: "C",
    id: "section-c",
    title: "Refund Request Process",
    body: "Eligible refund requests (in the case of organiser-led cancellations) must be submitted in writing. Please include the participant's full name, registered email ID, school name, and payment reference.",
    contact: true,
  },
];

const CSS = `
*, *::before, *::after { box-sizing: border-box; }

  @keyframes rp-pulse {
    0%, 100% { opacity: 0.10; }
    50%       { opacity: 0.20; }
  }

  /* ── Page: full viewport, no scroll ── */
  .rp-page {
    background: #011638;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }

  .rp-page::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 10% 20%, rgba(30,90,200,0.16) 0%, transparent 65%),
      radial-gradient(ellipse 50% 40% at 90% 80%, rgba(245,200,66,0.05) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  .rp-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(72px);
    pointer-events: none;
    animation: rp-pulse 5s ease-in-out infinite;
    z-index: 0;
  }
  .rp-orb-1 { width: 320px; height: 320px; top: 8%;   right: -80px; background: rgba(245,200,66,0.05); }
  .rp-orb-2 { width: 260px; height: 260px; bottom: 12%; left: -60px; background: rgba(30,90,200,0.08); animation-delay: 2s; }

  /* ── Hero ── */
  .rp-hero {
    flex-shrink: 0;
    position: relative;
    z-index: 2;
    padding: 52px clamp(20px, 8vw, 120px) 36px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }
  .rp-hero.is-visible { opacity: 1; transform: translateY(0); }

  .rp-eyebrow {
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

  .rp-hero-title {
    font-size: clamp(30px, 4.5vw, 52px);
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -1.5px;
    line-height: 1.05;
    margin-bottom: 10px;
    font-family: 'DM Sans', sans-serif;
  }

  .rp-hero-sub {
    font-size: clamp(13px, 1.2vw, 14.5px);
    color: rgba(255,255,255,0.45);
    max-width: 560px;
    line-height: 1.8;
    margin-bottom: 14px;
  }

  .rp-rule {
    width: 80px; height: 4px;
    background: linear-gradient(to right, #60a5fa, #2563eb);
    border-radius: 99px;
  }

  /* ── Two-panel body ── */
  .rp-body {
    flex: 1;
    min-height: 0;
    position: relative;
    z-index: 2;
    display: flex;
    gap: clamp(28px, 5vw, 64px);
    padding: 0 clamp(20px, 8vw, 120px);
  }

  /* ── LEFT sidebar ── */
  .rp-sidebar {
    flex-shrink: 0;
    width: 220px;
    padding: 32px 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
    overflow: hidden;
  }

  .rp-nav-item {
    all: unset;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px 9px 15px;
    border-radius: 8px;
    border-left: 3px solid transparent;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
    width: 100%;
  }
  .rp-nav-item:hover { background: rgba(245,200,66,0.05); }
  .rp-nav-item:hover .rp-nav-label { color: rgba(255,255,255,0.55); }
  .rp-nav-item:focus-visible {
    outline: 2px solid rgba(245,200,66,0.50);
    outline-offset: 2px;
  }

  .rp-nav-num {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: #f5c842;
    opacity: 0.45;
    flex-shrink: 0;
    transition: opacity 0.2s;
  }
  .rp-nav-label {
    font-size: 12px;
    font-weight: 500;
    color: rgba(255,255,255,0.28);
    line-height: 1.35;
    transition: color 0.2s;
  }
  .rp-nav-item.active {
    background: rgba(245,200,66,0.08);
    border-left-color: #f5c842;
    padding-left: 12px;
  }
  .rp-nav-item.active .rp-nav-num  { opacity: 1; }
  .rp-nav-item.active .rp-nav-label { color: rgba(255,255,255,0.88); font-weight: 600; }

  /* ── RIGHT scrollable panel ── */
  .rp-scroll-panel {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(245,200,66,0.22) transparent;
  }
  .rp-scroll-panel::-webkit-scrollbar { width: 4px; }
  .rp-scroll-panel::-webkit-scrollbar-track { background: transparent; }
  .rp-scroll-panel::-webkit-scrollbar-thumb { background: rgba(245,200,66,0.22); border-radius: 99px; }

  .rp-sections {
    padding: 32px 0 80px;
    display: flex;
    flex-direction: column;
  }

  /* ── Section blocks ── */
  .rp-section-block {
    padding: 32px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.55s ease, transform 0.55s ease;
    scroll-margin-top: 32px;
  }
  .rp-section-block.is-visible { opacity: 1; transform: translateY(0); }
  .rp-section-block:last-child { border-bottom: none; padding-bottom: 0; }

  .rp-section-badge {
    display: inline-flex;
    align-items: center;
    padding: 3px 12px;
    border: 1.5px solid rgba(245,200,66,0.30);
    border-radius: 100px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    color: #f5c842;
    background: rgba(245,200,66,0.07);
    margin-bottom: 12px;
  }

  .rp-section-title {
    font-size: clamp(17px, 1.8vw, 21px);
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.3px;
    margin-bottom: 12px;
    font-family: 'DM Sans', sans-serif;
  }

  .rp-section-body {
    font-size: clamp(13px, 1.2vw, 14.5px);
    color: rgba(255,255,255,0.55);
    line-height: 1.85;
    margin-bottom: 16px;
  }

  /* ── Refund tier table ── */
  .rp-tiers {
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin-bottom: 0;
  }

  .rp-tier {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 10px;
    padding: 12px 18px;
    transition: background 0.2s, border-color 0.2s;
    position: relative;
    overflow: hidden;
  }
  .rp-tier::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: #f5c842;
    border-radius: 10px 0 0 10px;
    opacity: 0.50;
  }
  .rp-tier:hover {
    background: rgba(245,200,66,0.05);
    border-color: rgba(245,200,66,0.15);
  }
  .rp-tier:hover::before { opacity: 1; }

  .rp-tier-label {
    font-size: clamp(12px, 1.1vw, 13.5px);
    color: rgba(255,255,255,0.60);
    line-height: 1.5;
  }

  .rp-tier-value {
    flex-shrink: 0;
    font-size: clamp(12px, 1.1vw, 14px);
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.2px;
    background: rgba(245,200,66,0.12);
    border: 1px solid rgba(245,200,66,0.25);
    border-radius: 100px;
    padding: 3px 14px;
    white-space: nowrap;
  }

  /* "No refund" tier gets a different pill colour */
  .rp-tier-value.rp-tier-none {
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.45);
  }

  /* ── Footnote / callout ── */
  .rp-footnote {
    margin-top: 14px;
    padding: 11px 16px;
    background: rgba(245,200,66,0.06);
    border-left: 3px solid rgba(245,200,66,0.45);
    border-radius: 0 8px 8px 0;
    font-size: 13px;
    color: rgba(255,255,255,0.55);
    line-height: 1.7;
  }

  /* ── Note pill (bottom of page) ── */
  .rp-note {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    background: rgba(245,200,66,0.07);
    border: 1px solid rgba(245,200,66,0.20);
    border-radius: 12px;
    padding: 14px 18px;
    margin-top: 32px;
  }
  .rp-note-icon {
    flex-shrink: 0;
    width: 28px; height: 28px;
    border-radius: 50%;
    background: #f5c842;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #011638;
    font-size: 13px;
    font-weight: 700;
    margin-top: 1px;
  }
  .rp-note-text {
    font-size: 13px;
    color: rgba(255,255,255,0.60);
    line-height: 1.7;
  }
  .rp-note-text strong { color: rgba(255,255,255,0.85); font-weight: 600; }

  /* ── Contact cards ── */
  .rp-contact-row {
    display: flex;
    gap: 10px;
    margin-top: 16px;
    flex-wrap: wrap;
  }

  .rp-contact-card {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 10px;
    padding: 12px 16px;
    flex: 1;
    min-width: 200px;
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s, transform 0.2s;
  }
  .rp-contact-card:hover {
    background: rgba(245,200,66,0.06);
    border-color: rgba(245,200,66,0.20);
    transform: translateY(-2px);
  }

  .rp-contact-icon {
    flex-shrink: 0;
    width: 36px; height: 36px;
    border-radius: 50%;
    background: #f5c842;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #011638;
    box-shadow: 0 3px 10px rgba(245,200,66,0.25);
  }

  .rp-contact-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 2px;
  }
  .rp-contact-value {
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.80);
    letter-spacing: -0.1px;
  }

  /* ── Mobile ── */
  @media (max-width: 860px) {
    .rp-page   { height: auto; overflow: visible; }
    .rp-sidebar { display: none; }
    .rp-body   { padding: 0 18px; gap: 0; }
    .rp-scroll-panel { overflow-y: visible; flex: none; width: 100%; }
    .rp-hero   { padding: 60px 18px 32px; }
    .rp-tier   { flex-direction: column; align-items: flex-start; gap: 8px; }
  }
  @media (max-width: 380px) {
    .rp-hero { padding: 52px 14px 28px; }
    .rp-body { padding: 0 14px; }
  }
`;

export default function RefundPolicyPage() {
  const pageRef     = useRef<HTMLDivElement>(null);
  const heroRef     = useRef<HTMLDivElement>(null);
  const panelRef    = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef   = useRef(0);
  const cssInjected = useRef(false);

  useEffect(() => {
    if (cssInjected.current) return;
    cssInjected.current = true;
    const tag = document.createElement("style");
    tag.setAttribute("data-rp", "1");
    tag.textContent = CSS;
    document.head.appendChild(tag);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { hero.classList.add("is-visible"); io.disconnect(); }
    }, { threshold: 0.1 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const blocks = sectionRefs.current.filter(Boolean) as HTMLDivElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLDivElement;
          const idx = blocks.indexOf(el);
          setTimeout(() => el.classList.add("is-visible"), Math.max(0, idx) * 80);
          io.unobserve(el);
        });
      },
      { root: panel, threshold: 0.06 }
    );
    blocks.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    const page  = pageRef.current;
    if (!panel || !page) return;

    const getNavItems = () =>
      Array.from(page.querySelectorAll<HTMLElement>(".rp-nav-item"));

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
        if (top < panelBB.height * 0.4) active = i;
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
    panel.scrollTo({ top: panel.scrollTop + (targetTop - panelTop) - 32, behavior: "smooth" });
  }, []);

  return (
    <div className="rp-page mt-12" ref={pageRef}>

      <div className="rp-orb rp-orb-1" aria-hidden="true" />
      <div className="rp-orb rp-orb-2" aria-hidden="true" />

      {/* Hero */}
      <div className="rp-hero" ref={heroRef}>
        <div className="rp-eyebrow">
          <span style={{ display:"inline-block", width:28, height:2, background:"#f5c842", flexShrink:0 }} />
          Sharkathon
          <span style={{ display:"inline-block", width:28, height:2, background:"#f5c842", flexShrink:0 }} />
        </div>
        <h1 className="rp-hero-title">
          Refund{" "}
          <em style={{ fontFamily:"'Playfair Display', Georgia, serif", fontStyle:"italic", fontWeight:400 }}>
            Policy
          </em>
        </h1>
        <p className="rp-hero-sub">
          To maintain transparency and fairness, the following refund terms apply to all participants of the Sharkathon programme.
        </p>
        <div className="rp-rule" />
      </div>

      {/* Two-panel body */}
      <div className="rp-body">

        {/* Sidebar */}
        <nav className="rp-sidebar" aria-label="Policy sections">
          {SECTIONS.map((s, i) => (
            <button
              key={i}
              className={`rp-nav-item${i === 0 ? " active" : ""}`}
              onClick={() => scrollTo(i)}
              aria-label={`Jump to section ${s.num}: ${s.title}`}
            >
              <span className="rp-nav-num">{s.num}</span>
              <span className="rp-nav-label">{s.title}</span>
            </button>
          ))}
        </nav>

        {/* Scrollable content */}
        <div className="rp-scroll-panel" ref={panelRef}>
          <div className="rp-sections">

            {SECTIONS.map((s, i) => (
              <div
                key={i}
                id={s.id}
                className="rp-section-block"
                ref={(el) => { sectionRefs.current[i] = el; }}
              >
                <div className="rp-section-badge">Section {s.num}</div>
                <h2 className="rp-section-title">{s.title}</h2>
                <p className="rp-section-body">{s.body}</p>

                {/* Refund tiers (Section B) */}
                {"items" in s && Array.isArray(s.items) && s.items.length > 0 && (
                  <div className="rp-tiers">
                    {(s.items as { label: string; value: string }[]).map((tier, j) => (
                      <div key={j} className="rp-tier">
                        <span className="rp-tier-label">{tier.label}</span>
                        <span className={`rp-tier-value${tier.value === "No refund" ? " rp-tier-none" : ""}`}>
                          {tier.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {"footnote" in s && s.footnote && (
                  <div className="rp-footnote">{s.footnote as string}</div>
                )}

                {/* Contact cards (Section C) */}
                {"contact" in s && s.contact && (
                  <div className="rp-contact-row">
                    <a href="mailto:team@veriseekeducation.com" className="rp-contact-card">
                      <div className="rp-contact-icon">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                          <polyline points="22,6 12,13 2,6"/>
                        </svg>
                      </div>
                      <div>
                        <p className="rp-contact-label">Email</p>
                        <p className="rp-contact-value">team@veriseekeducation.com</p>
                      </div>
                    </a>
                    <a href="tel:+919953371191" className="rp-contact-card">
                      <div className="rp-contact-icon">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="rp-contact-label">Phone</p>
                        <p className="rp-contact-value">+91 9953371191</p>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            ))}

            {/* Sticky note at the bottom */}
            <div className="rp-note">
              <div className="rp-note-icon">!</div>
              <p className="rp-note-text">
                <strong>Note:</strong> Transaction fees and applicable GST will be deducted from the refund amount.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}