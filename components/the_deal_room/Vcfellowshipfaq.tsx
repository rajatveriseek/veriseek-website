"use client";

import { useEffect, useRef, useState } from "react";

const FAQS = [
  {
    q: "Who is The Deal Room for?",
    a: "The Deal Room is designed for undergraduate students from any stream who want to learn how investment decisions are made and how to evaluate businesses.",
  },
  {
    q: "Do I need a finance or commerce background?",
    a: "No. The programme starts from first principles and builds up using practical examples. Curiosity and participation matter more than prior knowledge.",
  },
  {
    q: "What is the format of the programme?",
    a: "It is a two-day, classroom-based immersion with case discussions, practitioner-led sessions, and a Shark-style investor simulation where students become the Sharks — analysing businesses, questioning founders, and presenting a clear investment decision.",
  },
  {
    q: "What is the investor simulation?",
    a: "Students analyse a business, ask questions, and present an \"invest or do not invest\" decision with full reasoning — just like a real VC would.",
  },
];

export default function VCFellowshipFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const header = section.querySelector<HTMLElement>(".vcfaq-header");
    const items = Array.from(section.querySelectorAll<HTMLElement>(".vcfaq-item"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          if (el === header) {
            setHeaderVisible(true);
          } else {
            const idx = items.indexOf(el);
            setTimeout(() => setVisibleItems((prev) => new Set([...prev, idx])), idx * 100);
          }
          io.unobserve(el);
        });
      },
      { threshold: 0.1 }
    );

    if (header) io.observe(header);
    items.forEach((item) => io.observe(item));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{`
@keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-8px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Section — white bg, matches Sharkathon FAQ section */
        .vcfaq-section {
          background: #ffffff;
          padding: 80px clamp(20px, 8vw, 120px);
          font-family: 'DM Sans', sans-serif;
        }

        /* Centered header — animation base */
        .vcfaq-header {
          text-align: center;
          margin-bottom: 52px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .vcfaq-header.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .vcfaq-eyebrow {
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

        .vcfaq-title {
          font-size: clamp(26px, 3.5vw, 38px);
          font-weight: 700;
          color: #011638;
          letter-spacing: -0.5px;
          line-height: 1.2;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 10px;
        }

        /* Blue gradient rule — Sharkathon universal divider */
        .vcfaq-rule {
          width: 96px;
          height: 4px;
          background: linear-gradient(to right, #60a5fa, #2563eb);
          border-radius: 99px;
          margin: 12px auto 0;
        }

        .vcfaq-subtitle {
          margin-top: 12px;
          font-size: 15px;
          color: rgba(1,22,56,0.50);
          font-family: 'DM Sans', sans-serif;
        }

        /* FAQ list container — constrained width, centered */
        .vcfaq-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 0 auto;
        }

        /* Staggered entrance animation for items — triggered by IntersectionObserver */
        .vcfaq-item {
          background: #011638;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease;
        }
        .vcfaq-item.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .vcfaq-item.is-visible:hover {
          box-shadow: 0 8px 28px rgba(1,22,56,0.20);
          transform: translateY(-2px);
        }

        /* Yellow left-border when open — Sharkathon callout accent */
        .vcfaq-item-open {
          box-shadow: 0 8px 28px rgba(1,22,56,0.18);
        }
        .vcfaq-item-open::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: #f5c842;
          border-radius: 12px 0 0 12px;
          animation: slideIn 0.3s ease-out;
        }

        /* Button row */
        .vcfaq-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 26px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          gap: 16px;
        }

        .vcfaq-question {
          font-size: 15px;
          font-weight: 600;
          color: #ffffff;
          font-family: 'DM Sans', sans-serif;
          line-height: 1.4;
        }

        /* Icon circle — yellow when open (matches yellow-400 avatar/icon style) */
        .vcfaq-icon {
          flex-shrink: 0;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease, border 0.3s ease, transform 0.3s ease;
        }
        .vcfaq-icon-open {
          background: #f5c842;
          border: none;
          color: #011638;
          transform: rotate(90deg);
        }
        .vcfaq-icon-closed {
          background: transparent;
          border: 1.5px solid rgba(245,200,66,0.35);
          color: #f5c842;
          transform: rotate(0deg);
        }

        /* Answer reveal */
        .vcfaq-answer-wrap {
          overflow: hidden;
          transition: max-height 0.4s ease;
        }

        .vcfaq-answer {
          font-size: 14px;
          line-height: 1.78;
          color: rgba(255,255,255,0.60);
          padding: 0 26px 22px 26px;
          font-family: 'DM Sans', sans-serif;
          animation: fadeInUp 0.4s ease-out 0.1s both;
        }
      `}</style>

      <section className="vcfaq-section" ref={sectionRef}>

        {/* Header */}
        <div className={`vcfaq-header${headerVisible ? " is-visible" : ""}`}>
          {/* <div className="vcfaq-eyebrow">
            <span style={{ display: "inline-block", width: 28, height: 2, background: "#f5c842", flexShrink: 0 }} />
            The Deal Room
            <span style={{ display: "inline-block", width: 28, height: 2, background: "#f5c842", flexShrink: 0 }} />
          </div> */}
          <h2 className="vcfaq-title">
            Frequently Asked{" "}
            <em style={{  fontStyle: "italic", fontWeight: 400 }}>
              Questions
            </em>
          </h2>
          <div className="vcfaq-rule" />
          <p className="vcfaq-subtitle">Find answers to common questions about The Deal Room</p>
        </div>

        {/* FAQ Items */}
        <div className="vcfaq-list">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`vcfaq-item${visibleItems.has(i) ? " is-visible" : ""}${isOpen ? " vcfaq-item-open" : ""}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="vcfaq-btn"
                >
                  <span className="vcfaq-question">{faq.q}</span>

                  {/* Icon — yellow fill when open, yellow outline when closed */}
                  <span className={`vcfaq-icon ${isOpen ? "vcfaq-icon-open" : "vcfaq-icon-closed"}`}>
                    {isOpen ? (
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4">
                        <path d="M1 1l10 10M11 1L1 11" />
                      </svg>
                    ) : (
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4">
                        <path d="M6 1v10M1 6h10" />
                      </svg>
                    )}
                  </span>
                </button>

                <div
                  className="vcfaq-answer-wrap"
                  style={{ maxHeight: isOpen ? 300 : 0 }}
                >
                  <p className="vcfaq-answer">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>

      </section>
    </>
  );
}