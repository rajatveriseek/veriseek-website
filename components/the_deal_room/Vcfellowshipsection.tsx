"use client";

import { useEffect, useRef } from "react";

const SECTION_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  @keyframes vcf-slide-in-left {
    from { opacity: 0; transform: translateX(-48px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes vcf-slide-in-right {
    from { opacity: 0; transform: translateX(48px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .vcf-section-wrap {
    width: 100%;
    background: #eec643;
    padding: clamp(40px, 8vw, 80px) clamp(20px, 6vw, 80px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
  }

  .vcf-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(24px, 4vw, 56px);
    align-items: center;
    width: 100%;
  }

  /* ── Left: image slot ── */
  .vcf-img-wrap {
    border-radius: 16px;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    background: rgba(1,22,56,0.10);
    border: 2px solid rgba(1,22,56,0.15);
    box-shadow: 0 20px 56px rgba(1,22,56,0.18);
    position: relative;
    opacity: 0;
    transform: translateX(-48px);
  }
  .vcf-img-wrap.vcf-animate {
    animation: vcf-slide-in-left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  .vcf-img-wrap img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
  }
  /* Placeholder when no image supplied */
  .vcf-img-placeholder {
    width: 100%; height: 100%; min-height: 280px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 12px;
    background: rgba(1,22,56,0.06);
  }
  .vcf-img-placeholder span {
    font-size: 11px; letter-spacing: 2px;
    text-transform: uppercase; color: rgba(1,22,56,0.35);
  }

  /* ── Right: card ── */
  .vcf-card {
    background: #ffffff;
    border-radius: 16px;
    padding: clamp(28px, 4vw, 48px) clamp(24px, 3vw, 40px);
    box-shadow: 0 20px 56px rgba(1,22,56,0.14);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    opacity: 0;
    transform: translateX(48px);
  }
  .vcf-card.vcf-animate {
    animation: vcf-slide-in-right 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s forwards;
  }

  .vcf-card-heading {
    font-family: 'Playfair Display', serif;
    font-size: clamp(22px, 3vw, 32px);
    font-weight: 700;
    color: #011638;
    margin-bottom: 16px;
    line-height: 1.15;
  }
  .vcf-card-heading em {
    font-style: italic;
    color: #011638;
  }

  .vcf-card-body {
    font-size: clamp(14px, 1.4vw, 15.5px);
    line-height: 1.80;
    color: rgba(1,22,56,0.68);
    margin-bottom: 24px;
  }
  .vcf-card-body strong {
    color: #011638;
    font-weight: 700;
  }

  /* Meta rows — Date / Mode — matching screenshot style */
  .vcf-meta {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 28px;
  }
  .vcf-meta-row {
    font-size: 14px;
    font-weight: 600;
    color: #011638;
    font-family: 'DM Sans', sans-serif;
  }
  .vcf-meta-row span {
    font-weight: 400;
    color: rgba(1,22,56,0.65);
  }

  /* Divider */
  .vcf-divider {
    width: 100%;
    height: 1px;
    background: rgba(1,22,56,0.08);
    margin-bottom: 28px;
  }

  /* CTA button — navy pill matching Sharkathon's dark CTA */
  .vcf-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 13px 28px;
    border-radius: 100px;
    background: #011638;
    color: #ffffff;
    font-size: 14px; font-weight: 700;
    letter-spacing: 0.4px; text-transform: uppercase;
    font-family: 'DM Sans', sans-serif;
    text-decoration: none; cursor: pointer;
    border: 2px solid #011638;
    transition: all 0.25s ease;
    white-space: nowrap;
  }
  .vcf-btn:hover {
    background: transparent !important;
    color: #011638 !important;
    transform: scale(1.04);
  }
  .vcf-btn:hover svg {
    stroke: #011638;
  }

  /* Responsive: stack on mobile */
  @media (max-width: 720px) {
    .vcf-inner {
      grid-template-columns: 1fr !important;
    }
    .vcf-img-wrap {
      aspect-ratio: 16 / 9;
    }
  }
`;

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" aria-hidden="true">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

interface VCFellowshipSectionProps {
  imageSrc?: string;
  applyHref?: string;
  onApply?: () => void;
}

export default function VCFellowshipSection({
  imageSrc,
  applyHref = "https://rzp.io/rzp/IfWaHBUQ",
  onApply = () => { window.location.href = "https://rzp.io/rzp/IfWaHBUQ"; },
}: VCFellowshipSectionProps) {
  const injected = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (injected.current) return;
    injected.current = true;
    const tag = document.createElement("style");
    tag.setAttribute("data-vcf-section", "1");
    tag.textContent = SECTION_CSS;
    document.head.appendChild(tag);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imgWrap = entry.target.querySelector('.vcf-img-wrap');
            const card = entry.target.querySelector('.vcf-card');
            if (imgWrap) imgWrap.classList.add('vcf-animate');
            if (card) card.classList.add('vcf-animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="vcf-section-wrap" ref={sectionRef}>
      <div className="vcf-inner">

        {/* ── Left: image ── */}
        <div className="vcf-img-wrap">
          {imageSrc ? (
            <img src={imageSrc} alt="The Deal Room programme" />
          ) : (
            <div className="vcf-img-placeholder">
              {/* <div style={{ width: 48, height: 3, background: "#011638", borderRadius: 99, opacity: 0.25 }} />
              <span>Add imageSrc prop</span> */}
                <img src="/images/P1101636.JPG" alt="" />
            </div>
          )}
        </div>

        {/* ── Right: info card ── */}
        <div className="vcf-card">
          <h2 className="vcf-card-heading">
            About <em>The Deal Room</em>
          </h2>

          <p className="vcf-card-body">
            The Deal Room is a 2 day immersion for students to understand how real investment
            decisions are made. Designed and taught by{" "}
            <strong>current or former venture capitalists / investors</strong>, the programme builds
            core skills around how to assess a company from a venture investment perspective. It
            culminates in a Shark-style investor simulation where students become the Sharks, and{" "}
            <strong>analyse businesses, question founders, and present a clear investment decision</strong>.
          </p>

          <div className="vcf-divider" />

          <div className="vcf-meta">
            <div className="vcf-meta-row">
              Duration: <span>2 Days</span>
            </div>
            <div className="vcf-meta-row">
              Mode: <span>Shiv Nadar University, Greater Noida</span>
            </div>
          </div>

          <a href={applyHref} onClick={onApply} className="vcf-btn">
            Apply Now <ArrowIcon />
          </a>
        </div>

      </div>
    </section>
  );
}