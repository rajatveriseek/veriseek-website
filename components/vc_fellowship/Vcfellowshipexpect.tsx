"use client";

import { useEffect, useRef } from "react";

const EXPECTATIONS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Industry Connect",
    body: <>Meet and interact with <strong>investors and senior industry leaders</strong></>,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Industry-Relevant Learning",
    body: <>Learn how real <strong>investment decisions are made</strong>, using practical cases and clear frameworks</>,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Job-Ready Skills",
    body: <>Build skills that translate across roles: <strong>structured thinking, business analysis, communication,</strong> and decision-making</>,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: "Letters of Recommendation",
    body: <><strong>Merit-based letters of recommendation</strong> for top performers, based on their performance in the programme</>,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Spend a Day with a VC Fund",
    body: <>Top performers get a chance to <strong>visit and observe how a fund works</strong></>,
  },
];

export default function VCFellowshipExpect({ imageSrc }: { imageSrc?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const header = entry.target.querySelector('.vcfe-header');
            const items = entry.target.querySelectorAll('.vcfe-item');
            const image = entry.target.querySelector('.vcfe-img-wrap');
            
            if (header) header.classList.add('vcfe-animate');
            if (image) image.classList.add('vcfe-animate');
            
            items.forEach((item) => {
              item.classList.add('vcfe-animate');
            });
            
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes vcfe-header-fade {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes vcfe-item-slide {
          from { opacity: 0; transform: translateX(-24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes vcfe-image-slide-in {
          from { opacity: 0; transform: translateX(24px); }
          to { opacity: 1; transform: translateX(0); }
        }

        /* ── Section ── */
        .vcfe-section {
          background: #eef0f2;
          padding: 80px clamp(20px, 8vw, 120px);
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Centered header block — same as mentors / ProfileCards ── */
        .vcfe-header {
          text-align: left;
          margin-bottom: 56px;
          opacity: 0;
          transform: translateY(-16px);
        }
        .vcfe-header.vcfe-animate {
          animation: vcfe-header-fade 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .vcfe-eyebrow {
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

        .vcfe-title {
          font-size: clamp(26px, 3.5vw, 38px);
          font-weight: 700;
          color: #011638;
          letter-spacing: -0.5px;
          line-height: 1.2;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 0;
        }

        /* Blue gradient underline — consistent Sharkathon section divider */
        .vcfe-rule {
          width: 96px;
          height: 4px;
          background: linear-gradient(to right, #60a5fa, #2563eb);
          border-radius: 99px;
          margin: 14px 0;
        }

        /* ── Two-column grid ── */
        .vcfe-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 6vw, 80px);
          align-items: center;
          margin: 0 auto;
        }

        /* ── Expectation items ── */
        .vcfe-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Each row — navy card matching SimulationProcess step cards */
        .vcfe-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          background: #011638;
          border-radius: 12px;
          padding: 18px 20px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateX(-24px);
        }
        .vcfe-item.vcfe-animate {
          animation: vcfe-item-slide 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .vcfe-item:nth-child(1).vcfe-animate {
          animation-delay: 0.1s;
        }
        .vcfe-item:nth-child(2).vcfe-animate {
          animation-delay: 0.2s;
        }
        .vcfe-item:nth-child(3).vcfe-animate {
          animation-delay: 0.3s;
        }
        .vcfe-item:nth-child(4).vcfe-animate {
          animation-delay: 0.4s;
        }
        .vcfe-item:nth-child(5).vcfe-animate {
          animation-delay: 0.5s;
        }

        .vcfe-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(1,22,56,0.22);
        }

        /* Yellow left-border accent — Sharkathon callout card pattern */
        .vcfe-item::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: #f5c842;
          border-radius: 12px 0 0 12px;
        }

        /* Icon circle — yellow fill, navy icon */
        .vcfe-icon {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #f5c842;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #011638;
          box-shadow: 0 4px 12px rgba(245,200,66,0.30);
          margin-top: 1px;
        }

        .vcfe-item-title {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 3px;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.1px;
        }

        .vcfe-item-body {
          font-size:  clamp(14px, 1.4vw, 15.5px);
          font-weight: 400;
          color: rgba(255,255,255,0.62);
          line-height: 1.65;
          font-family: 'DM Sans', sans-serif;
        }

        .vcfe-item-body strong {
          color: rgba(255,255,255,0.88);
          font-weight: 600;
        }

        /* ── Right: image ── */
        .vcfe-img-wrap {
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 3 / 4;
          border: 2px solid rgba(245,200,66,0.30);
          box-shadow: 0 20px 56px rgba(1,22,56,0.14);
          background: rgba(1,22,56,0.06);
          position: relative;
          opacity: 0;
          transform: translateX(24px);
        }
        .vcfe-img-wrap.vcfe-animate {
          animation: vcfe-image-slide-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .vcfe-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }

        .vcfe-img-placeholder {
          width: 100%; height: 100%; min-height: 360px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 12px;
        }

        .vcfe-img-placeholder span {
          font-size: 11px; letter-spacing: 2px;
          text-transform: uppercase; color: rgba(1,22,56,0.30);
        }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .vcfe-grid {
            grid-template-columns: 1fr !important;
          }
          /* On mobile: image goes below the list */
          .vcfe-img-wrap {
            aspect-ratio: 16 / 9 !important;
            order: 2;
          }
          .vcfe-list-col {
            order: 1;
          }
        }
      `}</style>

      <section className="vcfe-section" ref={sectionRef} style={{
            display: "flex",
            alignItems: "stretch", // VERY IMPORTANT
            gap: "40px",
        }}>

        {/* Two-column grid */}
        <div className="vcfe-grid">

          {/* Left: expectation list */}
          <div className="vcfe-list-col">
            
            <div className="vcfe-header">
                {/* <div className="vcfe-eyebrow">
                    <span style={{ display: "inline-block", width: 28, height: 2, background: "#f5c842", flexShrink: 0 }} />
                    VC Fellowship
                    <span style={{ display: "inline-block", width: 28, height: 2, background: "#f5c842", flexShrink: 0 }} />
                </div> */}
                <h2 className="vcfe-title">
                    What to Expect from{" "}
                    <em style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 400 }}>
                    VC Fellowship?
                    </em>
                </h2>
                <div className="vcfe-rule" />
            </div>
            <div className="vcfe-list">
              {EXPECTATIONS.map((item, i) => (
                <div key={i} className="vcfe-item">
                  <div className="vcfe-icon">{item.icon}</div>
                  <div>
                    <p className="vcfe-item-title">{item.title}</p>
                    <p className="vcfe-item-body">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image */}
          <div className="vcfe-img-wrap">
            {imageSrc ? (
              <img src={imageSrc} alt="VC Fellowship participants" />
            ) : (
              <div className="vcfe-img-placeholder">
                <div style={{ width: 48, height: 3, background: "#011638", borderRadius: 99, opacity: 0.15 }} />
                <span>Add imageSrc prop</span>
              </div>
            )}
          </div>

        </div>
      </section>
    </>
  );
}