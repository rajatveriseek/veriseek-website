"use client";

import { useEffect, useRef, useCallback } from "react";

const SECTIONS = [
  {
    num: "01",
    id: "rp-section-01",
    title: "Scope",
    body: "This policy applies to all participants who register and pay the programme fee for The Deal Room programme organised by Veriseek Education and its partners. By registering and making payment, you agree to the terms below.",
    items: [],
  },
  {
    num: "02",
    id: "rp-section-02",
    title: "Refund Eligibility",
    body: null,
    items: [
      {
        type: "text",
        content: "A participant is eligible for a full refund only if the cancellation request is received at least 7 calendar days before the programme start date.",
      },
      {
        type: "text",
        content: "No refunds will be issued if the cancellation request is received within seven calendar days of the programme start date, including non-attendance.",
      },
    ],
    footnote: "For clarity: if the programme starts on 15 March 2026, the last date to request a full refund is 8 March 2026.",
  },
  {
    num: "03",
    id: "rp-section-03",
    title: "How to Request a Refund",
    body: "To request a cancellation and refund, the participant must submit a written request by email from the registered email address used for registration. The request must include:",
    items: [
      { type: "bullet", content: "Participant full name" },
      { type: "bullet", content: "Registered mobile number" },
      { type: "bullet", content: "Payment reference or transaction identifier" },
      { type: "bullet", content: "Programme name and dates" },
    ],
    footnote: "The request will be treated as received only when acknowledged by the programme team in writing.",
  },
  {
    num: "04",
    id: "rp-section-04",
    title: "Refund Processing",
    body: null,
    items: [
      { type: "bullet", content: "Approved refunds will be processed to the original payment method." },
      { type: "bullet", content: "Processing timelines depend on the payment gateway and banks." },
      { type: "bullet", content: "Any payment gateway or transaction charges, if applicable, will be deducted from the refund amount." },
    ],
  },
  {
    num: "05",
    id: "rp-section-05",
    title: "Transfers and Substitutions",
    body: "If a participant cannot attend after the refund window:",
    items: [
      { type: "bullet", content: "A one-time transfer to another student may be permitted, subject to seat availability and verification." },
      { type: "bullet", content: "Transfer requests must be submitted before the programme start date." },
      { type: "bullet", content: "Transfers are not permitted once the programme has started." },
    ],
  },
  {
    num: "06",
    id: "rp-section-06",
    title: "Programme Cancellation or Rescheduling",
    body: null,
    items: [
      { type: "bullet", content: "If the organiser cancels the programme, participants will receive a full refund." },
      { type: "bullet", content: "If the programme is rescheduled, participants may either attend on the revised dates or request a refund. Refund requests must be submitted within seven calendar days of the reschedule announcement." },
    ],
  },
  {
    num: "07",
    id: "rp-section-07",
    title: "Travel and Personal Expenses",
    body: "Refunds do not cover travel, accommodation, or any personal expenses incurred by participants.",
    items: [],
  },
  {
    num: "08",
    id: "rp-section-08",
    title: "Policy Updates",
    body: "The organiser may update this policy for operational or legal reasons. The version applicable to a participant is the one available on the website at the time of registration.",
    items: [],
  },
  {
    num: "09",
    id: "rp-section-09",
    title: "Contact",
    body: "For cancellation and refund requests, please contact the programme team using the details below.",
    items: [],
    contact: true,
  },
];

const CSS = `
*, *::before, *::after { box-sizing: border-box; }

  @keyframes drp-pulse {
    0%, 100% { opacity: 0.10; }
    50%       { opacity: 0.20; }
  }

  /* ── Page shell ── */
  .drp-page {
    background: #011638;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }

  .drp-page::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 10% 20%, rgba(30,90,200,0.16) 0%, transparent 65%),
      radial-gradient(ellipse 50% 40% at 90% 80%, rgba(245,200,66,0.05) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  .drp-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(72px);
    pointer-events: none;
    animation: drp-pulse 5s ease-in-out infinite;
    z-index: 0;
  }
  .drp-orb-1 { width: 320px; height: 320px; top: 8%;   right: -80px; background: rgba(245,200,66,0.05); }
  .drp-orb-2 { width: 260px; height: 260px; bottom: 12%; left: -60px; background: rgba(30,90,200,0.08); animation-delay: 2s; }

  /* ── Hero ── */
  .drp-hero {
    flex-shrink: 0;
    position: relative;
    z-index: 2;
    padding: 52px clamp(20px, 8vw, 120px) 36px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }
  .drp-hero.is-visible { opacity: 1; transform: translateY(0); }

  .drp-eyebrow {
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

  .drp-hero-title {
    font-size: clamp(30px, 4.5vw, 52px);
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -1.5px;
    line-height: 1.05;
    margin-bottom: 10px;
    font-family: 'DM Sans', sans-serif;
  }

  .drp-hero-sub {
    font-size: clamp(13px, 1.2vw, 14.5px);
    color: rgba(255,255,255,0.45);
    max-width: 580px;
    line-height: 1.8;
    margin-bottom: 14px;
  }

  .drp-rule {
    width: 80px; height: 4px;
    background: linear-gradient(to right, #60a5fa, #2563eb);
    border-radius: 99px;
  }

  /* ── Two-panel body ── */
  .drp-body {
    flex: 1;
    min-height: 0;
    position: relative;
    z-index: 2;
    display: flex;
    gap: clamp(28px, 5vw, 64px);
    padding: 0 clamp(20px, 8vw, 120px);
  }

  /* ── LEFT sidebar ── */
  .drp-sidebar {
    flex-shrink: 0;
    width: 220px;
    padding: 28px 0;
    display: flex;
    flex-direction: column;
    gap: 1px;
    overflow-y: auto;
    scrollbar-width: none;
  }
  .drp-sidebar::-webkit-scrollbar { display: none; }

  .drp-nav-item {
    all: unset;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px 8px 15px;
    border-radius: 8px;
    border-left: 3px solid transparent;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
    width: 100%;
  }
  .drp-nav-item:hover { background: rgba(245,200,66,0.05); }
  .drp-nav-item:hover .drp-nav-label { color: rgba(255,255,255,0.55); }
  .drp-nav-item:focus-visible {
    outline: 2px solid rgba(245,200,66,0.50);
    outline-offset: 2px;
  }

  .drp-nav-num {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: #f5c842;
    opacity: 0.40;
    flex-shrink: 0;
    transition: opacity 0.2s;
    font-family: 'DM Sans', sans-serif;
  }
  .drp-nav-label {
    font-size: 12px;
    font-weight: 500;
    color: rgba(255,255,255,0.25);
    line-height: 1.35;
    transition: color 0.2s;
  }
  .drp-nav-item.active {
    background: rgba(245,200,66,0.08);
    border-left-color: #f5c842;
    padding-left: 12px;
  }
  .drp-nav-item.active .drp-nav-num  { opacity: 1; }
  .drp-nav-item.active .drp-nav-label { color: rgba(255,255,255,0.88); font-weight: 600; }

  /* ── RIGHT scrollable panel ── */
  .drp-scroll-panel {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(245,200,66,0.22) transparent;
  }
  .drp-scroll-panel::-webkit-scrollbar { width: 4px; }
  .drp-scroll-panel::-webkit-scrollbar-track { background: transparent; }
  .drp-scroll-panel::-webkit-scrollbar-thumb { background: rgba(245,200,66,0.22); border-radius: 99px; }

  .drp-sections {
    padding: 32px 0 80px;
    display: flex;
    flex-direction: column;
  }

  /* ── Section blocks ── */
  .drp-section-block {
    padding: 32px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.55s ease, transform 0.55s ease;
    scroll-margin-top: 32px;
  }
  .drp-section-block.is-visible { opacity: 1; transform: translateY(0); }
  .drp-section-block:last-child { border-bottom: none; padding-bottom: 0; }

  .drp-section-badge {
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
    text-transform: uppercase;
  }

  .drp-section-title {
    font-size: clamp(17px, 1.8vw, 21px);
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.3px;
    margin-bottom: 12px;
    font-family: 'DM Sans', sans-serif;
  }

  .drp-section-body {
    font-size: clamp(13px, 1.2vw, 14.5px);
    color: rgba(255,255,255,0.55);
    line-height: 1.85;
    margin-bottom: 14px;
  }

  /* ── Items: bullet list style ── */
  .drp-items {
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin-top: 4px;
  }

  .drp-item {
    display: flex;
    align-items: flex-start;
    gap: 13px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px;
    padding: 11px 15px;
    transition: background 0.2s, border-color 0.2s;
  }
  .drp-item:hover {
    background: rgba(245,200,66,0.04);
    border-color: rgba(245,200,66,0.13);
  }

  .drp-item-dot {
    flex-shrink: 0;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #f5c842;
    margin-top: 7px;
    opacity: 0.75;
  }

  .drp-item-text {
    font-size: clamp(12px, 1.1vw, 14px);
    color: rgba(255,255,255,0.62);
    line-height: 1.72;
  }

  /* ── Footnote callout ── */
  .drp-footnote {
    margin-top: 14px;
    padding: 11px 16px;
    background: rgba(245,200,66,0.06);
    border-left: 3px solid rgba(245,200,66,0.45);
    border-radius: 0 8px 8px 0;
    font-size: 13px;
    color: rgba(255,255,255,0.52);
    line-height: 1.72;
  }

  /* ── Contact cards ── */
  .drp-contact-row {
    display: flex;
    gap: 10px;
    margin-top: 16px;
    flex-wrap: wrap;
  }

  .drp-contact-card {
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
  .drp-contact-card:hover {
    background: rgba(245,200,66,0.06);
    border-color: rgba(245,200,66,0.20);
    transform: translateY(-2px);
  }

  .drp-contact-icon {
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

  .drp-contact-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 2px;
  }
  .drp-contact-value {
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.78);
  }

  /* ── Bottom note ── */
  .drp-note {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    background: rgba(245,200,66,0.07);
    border: 1px solid rgba(245,200,66,0.18);
    border-radius: 12px;
    padding: 14px 18px;
    margin-top: 32px;
  }
  .drp-note-icon {
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
  .drp-note-text {
    font-size: 13px;
    color: rgba(255,255,255,0.58);
    line-height: 1.72;
  }
  .drp-note-text strong { color: rgba(255,255,255,0.85); font-weight: 600; }

  /* ── Mobile ── */
  @media (max-width: 860px) {
    .drp-page    { height: auto; overflow: visible; }
    .drp-sidebar { display: none; }
    .drp-body    { padding: 0 18px; gap: 0; }
    .drp-scroll-panel { overflow-y: visible; flex: none; width: 100%; }
    .drp-hero    { padding: 60px 18px 32px; }
  }
  @media (max-width: 380px) {
    .drp-hero { padding: 52px 14px 28px; }
    .drp-body { padding: 0 14px; }
  }
`;

export default function DealRoomRefundPolicy() {
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
    tag.setAttribute("data-drp", "1");
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
          setTimeout(() => el.classList.add("is-visible"), Math.max(0, idx) * 60);
          io.unobserve(el);
        });
      },
      { root: panel, threshold: 0.05 }
    );
    blocks.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    const page  = pageRef.current;
    if (!panel || !page) return;

    const getNavItems = () =>
      Array.from(page.querySelectorAll<HTMLElement>(".drp-nav-item"));

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
    <div className="drp-page" ref={pageRef}>

      <div className="drp-orb drp-orb-1" aria-hidden="true" />
      <div className="drp-orb drp-orb-2" aria-hidden="true" />

      {/* Hero */}
      <div className="drp-hero" ref={heroRef}>
        <div className="drp-eyebrow">
          <span style={{ display:"inline-block", width:28, height:2, background:"#f5c842", flexShrink:0 }} />
          The Deal Room
          <span style={{ display:"inline-block", width:28, height:2, background:"#f5c842", flexShrink:0 }} />
        </div>
        <h1 className="drp-hero-title">
          Refund{" "}
          <em style={{ fontFamily:"'Playfair Display', Georgia, serif", fontStyle:"italic", fontWeight:400 }}>
            Policy
          </em>
        </h1>
        <p className="drp-hero-sub">
          This policy applies to registrations for The Deal Room programme organised by Veriseek Education and its partners. By registering and making payment, you agree to the terms below.
        </p>
        <div className="drp-rule" />
      </div>

      {/* Two-panel body */}
      <div className="drp-body">

        {/* Sidebar */}
        <nav className="drp-sidebar" aria-label="Refund policy sections">
          {SECTIONS.map((s, i) => (
            <button
              key={i}
              className={`drp-nav-item${i === 0 ? " active" : ""}`}
              onClick={() => scrollTo(i)}
              aria-label={`Jump to section ${s.num}: ${s.title}`}
            >
              <span className="drp-nav-num">{s.num}</span>
              <span className="drp-nav-label">{s.title}</span>
            </button>
          ))}
        </nav>

        {/* Scrollable content */}
        <div className="drp-scroll-panel" ref={panelRef}>
          <div className="drp-sections">

            {SECTIONS.map((s, i) => (
              <div
                key={i}
                id={s.id}
                className="drp-section-block"
                ref={(el) => { sectionRefs.current[i] = el; }}
              >
                <div className="drp-section-badge">Section {s.num}</div>
                <h2 className="drp-section-title">{s.title}</h2>

                {s.body && <p className="drp-section-body">{s.body}</p>}

                {s.items && s.items.length > 0 && (
                  <div className="drp-items">
                    {(s.items as { type: string; content: string }[]).map((item, j) => (
                      <div key={j} className="drp-item">
                        <span className="drp-item-dot" aria-hidden="true" />
                        <span className="drp-item-text">{item.content}</span>
                      </div>
                    ))}
                  </div>
                )}

                {"footnote" in s && s.footnote && (
                  <div className="drp-footnote">{s.footnote as string}</div>
                )}

                {"contact" in s && s.contact && (
                  <div className="drp-contact-row">
                    <a href="mailto:team@veriseekeducation.com" className="drp-contact-card">
                      <div className="drp-contact-icon">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                          <polyline points="22,6 12,13 2,6"/>
                        </svg>
                      </div>
                      <div>
                        <p className="drp-contact-label">Email</p>
                        <p className="drp-contact-value">team@veriseekeducation.com</p>
                      </div>
                    </a>
                    <a href="tel:+919953371191" className="drp-contact-card">
                      <div className="drp-contact-icon">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="drp-contact-label">Phone</p>
                        <p className="drp-contact-value">+91 9953371191</p>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            ))}

            {/* Bottom note */}
            <div className="drp-note">
              <div className="drp-note-icon">!</div>
              <p className="drp-note-text">
                <strong>Note:</strong> Transaction fees and applicable GST will be deducted from any refund amount. Processing timelines depend on the payment gateway and your bank.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}