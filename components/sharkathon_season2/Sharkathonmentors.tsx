"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const MENTORS = [
  {
    name: "Mr. Rajat Kumar",
    role: "Managing Partner Nandan Capital,\nEx-McKinsey and Wharton Alum",
    labels: ["Wharton", "McKinsey", "Nandan Capital", "EY"],
    tags: [
      "/images/wharton.png",
      "/images/McKinseyCompany_logo-dark.png",
      "/images/Nandan_Final_Logo_page-0001_12-removebg-preview.png",
      "/images/ey.png",
    ],
    logoHrefs: [undefined, undefined, "https://nandancapital.com/", undefined],
    initials: "RK",
    image: "/images/vem1-removebg-preview.png",
    linkedin: "https://www.linkedin.com/in/rajat-kumar-004533/",
  },
  {
    name: "Mr. Mayank Kapoor",
    role: "VP Leena AI,\nAlum IIT Delhi & MIT",
    labels: ["MIT", "IIT Delhi", "Leena AI", "Apple"],
    tags: [
      "/images/mit2.png",
      "/images/iit.png",
      "/images/leenaai.png",
      "/images/apple.png",
    ],
    logoHrefs: [undefined, undefined, undefined, undefined],
    initials: "MK",
    image: "/images/vem2-removebg-preview.png",
    linkedin: "https://www.linkedin.com/in/mayankkapoor/",
  },
  {
    name: "Mr. Siddhant Gupta",
    role: "Founder Himland Capital,\nEx-VP Sixth Sense Ventures",
    labels: ["Himland Capital", "Sixth Sense", "ISB", "Deloitte"],
    tags: [
      "/images/WhatsApp Image 2026-02-22 at 4.01.38 PM.jpeg",
      "/images/sixth sense.png",
      "/images/isb-logo1_1.jpg",
      "/images/deloitte.png",
    ],
    logoHrefs: ["https://www.linkedin.com/company/himlandcapitaladvisors", undefined, undefined, undefined],
    initials: "SG",
    image: "/images/vem3-removebg-preview.png",
    linkedin: "https://www.linkedin.com/in/siddhant-gupta-/",
  },
];

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function LogoBadge({ src, alt, href }: { src: string; alt: string; href?: string }) {
  const inner = (
    <span className="vm-logo-badge">
      <Image src={src} alt={alt} width={100} height={40} className="vm-logo-img" loading="lazy" style={{ objectFit: "contain" }} />
    </span>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "inline-block" }}>
      {inner}
    </a>
  ) : inner;
}

export default function SharkathonMentors() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const header = section.querySelector<HTMLElement>(".vm-header");
    const cards  = Array.from(section.querySelectorAll<HTMLElement>(".vm-card"));
    const timeouts = new Map<HTMLElement, ReturnType<typeof setTimeout>>();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            const existing = timeouts.get(el);
            if (existing) clearTimeout(existing);
            if (el === header) {
              el.classList.add("is-visible");
            } else {
              const idx = cards.indexOf(el);
              const t = setTimeout(() => el.classList.add("is-visible"), 80 + idx * 130);
              timeouts.set(el, t);
            }
          } else {
            const existing = timeouts.get(el);
            if (existing) clearTimeout(existing);
            el.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.10 }
    );

    if (header) io.observe(header);
    cards.forEach((c) => io.observe(c));
    return () => { io.disconnect(); timeouts.forEach(clearTimeout); };
  }, []);

  return (
    <>
      <style>{`
/* ── Section ── */
        .vm-section {
          background: #f5c842;
          padding: 80px clamp(20px, 7vw, 100px) 88px;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Subtle texture overlay */
        .vm-section::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 50% at 50% 0%,   rgba(1,22,56,0.06) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 10% 100%, rgba(1,22,56,0.05) 0%, transparent 55%);
        }

        /* ── Header ── */
        .vm-header {
          text-align: center;
          margin-bottom: 24px;
          position: relative; z-index: 1;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .vm-header.is-visible { opacity: 1; transform: translateY(0); }

        .vm-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: rgba(1,22,56,0.55);
          margin-bottom: 12px; font-family: 'DM Sans', sans-serif;
        }
        .vm-title {
          font-size: clamp(26px, 3.6vw, 42px);
          font-weight: 700; color: #011638;
          letter-spacing: -0.6px; line-height: 1.1;
          font-family: 'DM Sans', sans-serif;
          margin: 0 0 0;
        }
        .vm-title em {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic; font-weight: 400;
        }
        .vm-rule {
          width: 80px; height: 4px;
          background: #011638;
          border-radius: 99px;
          margin: 14px auto 0;
          opacity: 0.18;
        }
        .vm-subtitle {
          margin-top: 12px;
          font-size: 15px; color: rgba(1,22,56,0.65);
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Grid ── */
        .vm-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 2.5vw, 28px);
          max-width: 1100px;
          margin: 0 auto;
          position: relative; z-index: 1;
        }

        /* ── Card ── */
        .vm-card {
          background: #011638;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow:
            0 16px 48px rgba(1,22,56,0.28),
            0 2px 8px rgba(1,22,56,0.14);
          opacity: 0; transform: translateY(28px);
          transition:
            opacity 0.55s ease,
            transform 0.55s ease,
            box-shadow 0.3s ease;
          position: relative;
        }
        /* Yellow left accent bar */
        .vm-card::before {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 3px; background: #f5c842;
          border-radius: 20px 0 0 20px;
        }
        .vm-card.is-visible { opacity: 1; transform: translateY(0); }
        .vm-card.is-visible:hover {
          transform: translateY(-6px);
          box-shadow: 0 28px 64px rgba(1,22,56,0.36), 0 4px 16px rgba(1,22,56,0.18);
        }

        /* ── Photo wrap ── */
        .vm-photo-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 2.6;
          overflow: hidden;
          background: #0a2347;
          flex-shrink: 0;
        }
        .vm-photo-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: filter 0.4s ease, transform 0.4s ease;
        }
        .vm-card:hover .vm-photo-wrap img {
          transform: scale(1.04);
        }

        /* Yellow-tinted gradient overlay at bottom of photo */
        .vm-photo-wrap::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 50%;
          background: linear-gradient(to top, rgba(1,22,56,0.72) 0%, transparent 100%);
          pointer-events: none;
        }

        /* Fallback initials */
        .vm-initials {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-size: 52px; font-weight: 700;
          color: #f5c842; background: #011638;
        }

        /* LinkedIn badge — bottom-right of photo */
        .vm-linkedin {
          position: absolute; bottom: 14px; right: 14px;
          width: 34px; height: 34px;
          background: #0077b5; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: #fff; text-decoration: none;
          box-shadow: 0 2px 12px rgba(0,0,0,0.32);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          z-index: 3;
        }
        .vm-linkedin:hover {
          transform: scale(1.14);
          box-shadow: 0 4px 18px rgba(0,0,0,0.38);
        }

        /* ── Card body ── */
        .vm-body {
          padding: clamp(16px, 2vw, 22px);
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex: 1;
        }

        .vm-name {
          font-size: clamp(15px, 1.3vw, 17px);
          font-weight: 700; color: #ffffff;
          letter-spacing: -0.2px; line-height: 1.25;
          margin: 0;
          font-family: 'DM Sans', sans-serif;
        }
        .vm-role {
          font-size: clamp(11.5px, 1vw, 13px);
          font-weight: 400; color: rgba(255,255,255,0.55);
          line-height: 1.6; margin: 0;
          white-space: pre-line;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Logo row ── */
        .vm-logos {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,0.08);
          margin-top: auto;
        }

        .vm-logo-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 5px 6px;
          border: 1.5px solid rgba(245,200,66,0.40);
          border-radius: 9px;
          background: #ffffff;
          height: 40px;
          box-shadow: 0 1px 4px rgba(1,22,56,0.12);
          transition: border-color 0.2s, transform 0.2s;
        }
        .vm-logo-badge:hover {
          border-color: #f5c842;
          transform: scale(1.06);
        }
        .vm-logo-img {
          height: 26px;
          max-width: 60px;
          width: auto;
          object-fit: contain;
          display: block;
        }

        /* ── Tablet: 2 col ── */
        @media (max-width: 860px) {
          .vm-grid {
            grid-template-columns: repeat(2, 1fr);
            max-width: 660px;
          }
          .vm-grid .vm-card:last-child {
            grid-column: 1 / -1;
            max-width: 320px;
            margin: 0 auto;
            width: 100%;
          }
        }

        /* ── Mobile: horizontal card ── */
        @media (max-width: 540px) {
          .vm-section { padding: 56px 16px 64px; }
          .vm-grid {
            grid-template-columns: 1fr;
            max-width: 100%;
          }
          .vm-grid .vm-card:last-child {
            grid-column: unset;
            max-width: unset;
          }
          .vm-card {
            flex-direction: row;
            border-radius: 16px;
          }
          .vm-photo-wrap {
            width: 108px; min-width: 108px;
            aspect-ratio: unset; height: auto;
            align-self: stretch;
          }
          .vm-photo-wrap::after { height: 30%; }
          .vm-linkedin {
            bottom: 8px; right: 8px;
            width: 26px; height: 26px;
          }
          .vm-linkedin svg { width: 12px; height: 12px; }
          .vm-body { padding: 14px 14px 14px 12px; gap: 10px; }
          .vm-name { font-size: 13px; }
          .vm-role { font-size: 11px; }
          .vm-logo-badge { height: 30px; padding: 3px 6px; }
          .vm-logo-img { height: 18px; max-width: 44px; }
        }

        @media (max-width: 360px) {
          .vm-photo-wrap { width: 88px; min-width: 88px; }
          .vm-logo-badge { height: 26px; padding: 2px 4px; }
          .vm-logo-img { height: 15px; max-width: 36px; }
        }
      `}</style>

      <section className="vm-section" ref={sectionRef}>

        {/* Header */}
        <div className="vm-header">
          <div className="vm-eyebrow">
            <span style={{ display:"inline-block", width:24, height:2, background:"rgba(1,22,56,0.40)", flexShrink:0 }} />
            Sharkathon Season 2
            <span style={{ display:"inline-block", width:24, height:2, background:"rgba(1,22,56,0.40)", flexShrink:0 }} />
          </div>
          <h2 className="vm-title">
            The Minds{" "}
            <em>Behind the Programme</em>
          </h2>
          <div className="vm-rule" />
          <p className="vm-subtitle">
            Learn from leaders who've built, invested in, and advised real businesses.
          </p>
        </div>

        {/* Cards */}
        <div className="vm-grid">
          {MENTORS.map((mentor) => (
            <div key={mentor.name} className="vm-card">

              {/* Photo */}
              <div className="vm-photo-wrap">
                <img
                  src={mentor.image.trim()}
                  alt={mentor.name}
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.style.display = "none";
                    const fb = el.nextElementSibling as HTMLElement;
                    if (fb) fb.style.display = "flex";
                  }}
                />
                <div className="vm-initials" style={{ display: "none" }}>
                  {mentor.initials}
                </div>
                <a
                  href={mentor.linkedin}
                  className="vm-linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${mentor.name} on LinkedIn`}
                >
                  <LinkedInIcon />
                </a>
              </div>

              {/* Body */}
              <div className="vm-body">
                <div>
                  <p className="vm-name">{mentor.name}</p>
                  <p className="vm-role">{mentor.role}</p>
                </div>
                <div className="vm-logos">
                  {mentor.tags.map((src, i) => (
                    <LogoBadge
                      key={src}
                      src={src}
                      alt={mentor.labels[i]}
                      href={mentor.logoHrefs[i]}
                    />
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>
    </>
  );
}