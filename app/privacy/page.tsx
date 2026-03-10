"use client";

import { useEffect, useRef, useCallback } from "react";

const SECTIONS = [
  {
    num: "01",
    id: "section-01",
    title: "Information We Collect",
    body: "We may collect the following types of information through registration forms and interactions on our website:",
    items: [
      "Full name of student and/or school representative",
      "School name and contact details",
      "Student's age or date of birth",
      "Parent/guardian contact information",
      "Email addresses and phone numbers",
      "Media (photos/videos) from event participation",
      "Payment-related details (processed via secure third-party services)",
    ],
  },
  {
    num: "02",
    id: "section-02",
    title: "How We Use Your Information",
    body: "We use your data for the following purposes:",
    items: [
      "To manage competition registration and logistics",
      "To contact participants or their guardians regarding event updates",
      "To verify eligibility and school representation",
      "To share results, certificates, or follow-up materials",
      "For event promotion (with consent), including use of photos or videos",
    ],
  },
  {
    num: "03",
    id: "section-03",
    title: "Media and Publicity Consent",
    body: "By registering for the competition, participants and guardians consent to:",
    items: [
      "Event photography and videography",
      "Use of media content for promotional materials, social media, and reports",
    ],
    footnote: "If you wish to opt out of media usage, please email us at team@veriseekeducation.com.",
  },
  {
    num: "04",
    id: "section-04",
    title: "Data Protection and Storage",
    body: null,
    items: [
      "All personal information is stored securely and is only accessible to authorized event organizers.",
      "We do not sell your information to third parties for marketing purposes.",
      "Payment details are handled securely by our payment processor and are never stored on our servers.",
    ],
  },
  {
    num: "05",
    id: "section-05",
    title: "Cookies and Tracking",
    body: "Our website may use cookies to:",
    items: [
      "Improve user experience",
      "Track page views and analytics",
    ],
    footnote: "You can control cookie settings via your browser.",
  },
  {
    num: "06",
    id: "section-06",
    title: "Updates to This Policy",
    body: "We may update this Privacy Policy from time to time. Changes will be posted on this page with the updated effective date.",
    items: [],
  },
];

const CSS = `
*, *::before, *::after { box-sizing: border-box; }

  @keyframes pp-pulse {
    0%, 100% { opacity: 0.10; }
    50%       { opacity: 0.20; }
  }

  /* ── Page shell: full-viewport height, no overflow ── */
  .pp-page {
    background: #011638;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }

  /* Ambient glows fixed to viewport */
  .pp-page::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 10% 20%, rgba(30,90,200,0.16) 0%, transparent 65%),
      radial-gradient(ellipse 50% 40% at 90% 80%, rgba(245,200,66,0.05) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }
  .pp-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(72px);
    pointer-events: none;
    animation: pp-pulse 5s ease-in-out infinite;
    z-index: 0;
  }
  .pp-orb-1 { width: 320px; height: 320px; top: 8%;  right: -80px; background: rgba(245,200,66,0.05); }
  .pp-orb-2 { width: 260px; height: 260px; bottom: 12%; left: -60px; background: rgba(30,90,200,0.08); animation-delay: 2s; }

  /* ── Hero (full-width strip, does not scroll) ── */
  .pp-hero {
    flex-shrink: 0;
    position: relative;
    z-index: 2;
    padding: 52px clamp(20px, 8vw, 120px) 36px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }
  .pp-hero.is-visible { opacity: 1; transform: translateY(0); }

  .pp-eyebrow {
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
  .pp-hero-title {
    font-size: clamp(30px, 4.5vw, 52px);
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -1.5px;
    line-height: 1.05;
    margin-bottom: 10px;
    font-family: 'DM Sans', sans-serif;
  }
  .pp-hero-sub {
    font-size: clamp(13px, 1.2vw, 14.5px);
    color: rgba(255,255,255,0.45);
    max-width: 520px;
    line-height: 1.8;
    margin-bottom: 14px;
  }
  .pp-rule {
    width: 80px; height: 4px;
    background: linear-gradient(to right, #60a5fa, #2563eb);
    border-radius: 99px;
  }

  /* ── Two-panel body: fills remaining height ── */
  .pp-body {
    flex: 1;
    min-height: 0; /* critical: lets flex children honour parent height */
    position: relative;
    z-index: 2;
    display: flex;
    gap: clamp(28px, 5vw, 64px);
    padding: 0 clamp(20px, 8vw, 120px);
  }

  /* ── LEFT: sidebar — does NOT scroll ── */
  .pp-sidebar {
    flex-shrink: 0;
    width: 220px;
    padding: 32px 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
    /* sidebar stays anchored; only the right panel scrolls */
    overflow: hidden;
  }

  /* Sidebar nav buttons */
  .pp-nav-item {
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
  .pp-nav-item:hover {
    background: rgba(245,200,66,0.05);
  }
  .pp-nav-item:hover .pp-nav-label {
    color: rgba(255,255,255,0.55);
  }
  .pp-nav-item:focus-visible {
    outline: 2px solid rgba(245,200,66,0.50);
    outline-offset: 2px;
  }

  .pp-nav-num {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: #f5c842;
    opacity: 0.45;
    flex-shrink: 0;
    font-family: 'DM Sans', sans-serif;
    transition: opacity 0.2s;
  }
  .pp-nav-label {
    font-size: 12px;
    font-weight: 500;
    color: rgba(255,255,255,0.28);
    line-height: 1.35;
    transition: color 0.2s;
  }

  /* Active */
  .pp-nav-item.active {
    background: rgba(245,200,66,0.08);
    border-left-color: #f5c842;
    padding-left: 12px;
  }
  .pp-nav-item.active .pp-nav-num  { opacity: 1; }
  .pp-nav-item.active .pp-nav-label { color: rgba(255,255,255,0.88); font-weight: 600; }

  /* ── RIGHT: scrollable content panel ── */
  .pp-scroll-panel {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    /* thin custom scrollbar */
    scrollbar-width: thin;
    scrollbar-color: rgba(245,200,66,0.22) transparent;
  }
  .pp-scroll-panel::-webkit-scrollbar { width: 4px; }
  .pp-scroll-panel::-webkit-scrollbar-track { background: transparent; }
  .pp-scroll-panel::-webkit-scrollbar-thumb { background: rgba(245,200,66,0.22); border-radius: 99px; }

  /* Inner wrapper gives padding within the scroll area */
  .pp-sections {
    padding: 32px 0 80px;
    display: flex;
    flex-direction: column;
  }

  /* ── Section blocks ── */
  .pp-section-block {
    padding: 32px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.55s ease, transform 0.55s ease;
    scroll-margin-top: 32px;
  }
  .pp-section-block.is-visible { opacity: 1; transform: translateY(0); }
  .pp-section-block:last-child { border-bottom: none; padding-bottom: 0; }

  .pp-section-num {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #f5c842;
    margin-bottom: 10px;
    opacity: 0.70;
  }
  .pp-section-title {
    font-size: clamp(17px, 1.8vw, 21px);
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.3px;
    margin-bottom: 12px;
    font-family: 'DM Sans', sans-serif;
  }
  .pp-section-body {
    font-size: clamp(13px, 1.2vw, 14.5px);
    color: rgba(255,255,255,0.55);
    line-height: 1.85;
    margin-bottom: 14px;
  }

  .pp-items {
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin-top: 4px;
  }
  .pp-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px;
    padding: 11px 15px;
    transition: background 0.2s, border-color 0.2s;
  }
  .pp-item:hover {
    background: rgba(245,200,66,0.05);
    border-color: rgba(245,200,66,0.15);
  }
  .pp-item-dot {
    flex-shrink: 0;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #f5c842;
    margin-top: 7px;
    opacity: 0.80;
  }
  .pp-item-text {
    font-size: clamp(12px, 1.1vw, 14px);
    color: rgba(255,255,255,0.65);
    line-height: 1.7;
  }

  .pp-footnote {
    margin-top: 14px;
    padding: 11px 16px;
    background: rgba(245,200,66,0.06);
    border-left: 3px solid rgba(245,200,66,0.45);
    border-radius: 0 8px 8px 0;
    font-size: 13px;
    color: rgba(255,255,255,0.55);
    line-height: 1.7;
  }
  .pp-footnote a { color: #f5c842; text-decoration: none; font-weight: 600; }
  .pp-footnote a:hover { text-decoration: underline; }

  /* ── Mobile: revert to normal page scroll ── */
  @media (max-width: 860px) {
    .pp-page {
      height: auto;
      overflow: visible;
    }
    .pp-sidebar { display: none; }
    .pp-body {
      padding: 0 18px;
      gap: 0;
    }
    .pp-scroll-panel {
      overflow-y: visible;
      flex: none;
      width: 100%;
    }
    .pp-hero { padding: 60px 18px 32px; }
  }

  @media (max-width: 380px) {
    .pp-hero { padding: 52px 14px 28px; }
    .pp-body  { padding: 0 14px; }
  }
`;

export default function PrivacyPolicy() {
  const pageRef     = useRef<HTMLDivElement>(null);
  const heroRef     = useRef<HTMLDivElement>(null);
  const panelRef    = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef   = useRef(0);
  const cssInjected = useRef(false);

  // Inject CSS once
  useEffect(() => {
    if (cssInjected.current) return;
    cssInjected.current = true;
    const tag = document.createElement("style");
    tag.setAttribute("data-pp", "1");
    tag.textContent = CSS;
    document.head.appendChild(tag);
  }, []);

  // Animate hero on mount
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { hero.classList.add("is-visible"); io.disconnect(); }
    }, { threshold: 0.1 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  // Animate section blocks as they scroll into view inside the right panel
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
      { root: panel, threshold: 0.06 }
    );
    blocks.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);

  // Keep sidebar active indicator in sync with scroll position
  useEffect(() => {
    const panel = panelRef.current;
    const page  = pageRef.current;
    if (!panel || !page) return;

    const getNavItems = () =>
      Array.from(page.querySelectorAll<HTMLElement>(".pp-nav-item"));

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

  // Smooth-scroll the right panel to the chosen section
  const scrollTo = useCallback((idx: number) => {
    const panel  = panelRef.current;
    const target = sectionRefs.current[idx];
    if (!panel || !target) return;

    const panelTop  = panel.getBoundingClientRect().top;
    const targetTop = target.getBoundingClientRect().top;
    const newScroll = panel.scrollTop + (targetTop - panelTop) - 32;

    panel.scrollTo({ top: newScroll, behavior: "smooth" });
  }, []);

  return (
    <div className="pp-page" ref={pageRef}>

      {/* Fixed ambient orbs */}
      <div className="pp-orb pp-orb-1" aria-hidden="true" />
      <div className="pp-orb pp-orb-2" aria-hidden="true" />

      {/* Full-width hero — does not scroll */}
      <div className="pp-hero" ref={heroRef}>
        <div className="pp-eyebrow">
          <span style={{ display:"inline-block", width:28, height:2, background:"#f5c842", flexShrink:0 }} />
          Veriseek Education
          <span style={{ display:"inline-block", width:28, height:2, background:"#f5c842", flexShrink:0 }} />
        </div>
        <h1 className="pp-hero-title">
          Privacy{" "}
          <em style={{ fontFamily:"'Playfair Display', Georgia, serif", fontStyle:"italic", fontWeight:400 }}>
            Policy
          </em>
        </h1>
        <p className="pp-hero-sub">
          This Privacy Policy explains how we collect, use, and safeguard your information when you interact with our website and programmes.
        </p>
        <div className="pp-rule" />
      </div>

      {/* Two-panel body */}
      <div className="pp-body">

        {/* LEFT — static sidebar */}
        <nav className="pp-sidebar" aria-label="Policy sections">
          {SECTIONS.map((s, i) => (
            <button
              key={i}
              className={`pp-nav-item${i === 0 ? " active" : ""}`}
              onClick={() => scrollTo(i)}
              aria-label={`Jump to section ${s.num}: ${s.title}`}
            >
              <span className="pp-nav-num">{s.num}</span>
              <span className="pp-nav-label">{s.title}</span>
            </button>
          ))}
        </nav>

        {/* RIGHT — only this panel scrolls */}
        <div className="pp-scroll-panel" ref={panelRef}>
          <div className="pp-sections">
            {SECTIONS.map((s, i) => (
              <div
                key={i}
                id={s.id}
                className="pp-section-block"
                ref={(el) => { sectionRefs.current[i] = el; }}
              >
                <p className="pp-section-num">Section {s.num}</p>
                <h2 className="pp-section-title">{s.title}</h2>

                {s.body && <p className="pp-section-body">{s.body}</p>}

                {s.items && s.items.length > 0 && (
                  <div className="pp-items">
                    {s.items.map((item, j) => (
                      <div key={j} className="pp-item">
                        <span className="pp-item-dot" aria-hidden="true" />
                        <span className="pp-item-text">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {s.footnote && (
                  <div className="pp-footnote">
                    {s.footnote.includes("team@veriseekeducation.com") ? (
                      <>
                        If you wish to opt out of media usage, please email us at{" "}
                        <a href="mailto:team@veriseekeducation.com">team@veriseekeducation.com</a>.
                      </>
                    ) : (
                      s.footnote
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}