"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { submitSharkathonEnquiry } from "@/app/actions/registration";

// ─── Round data (3 dark cards) ─────────────────────────────────────────────────

const ROUNDS = [
  {
    number: "01",
    label: "Round One",
    heading: "The CEO Round",
    mode: "Online",
    timeline: "19th July, 2026",
    imageSrc: "/images/P1101586.JPG",
    imageAlt: "The CEO Round",
    body: "An applied business decision-making challenge designed to test how you think, not what you know. You will face real-world scenarios similar to what CEOs handle, making choices with limited time, incomplete information, and competing priorities. Your goal is to identify what matters, structure the problem, and take the best decision with clear reasoning.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    number: "02",
    label: "Round Two",
    heading: "The Consultant Round",
    mode: "Online",
    timeline: "26th July, 2026",
    imageSrc: "/images/P1101581.JPG",
    imageAlt: "The Consultant Round",
    body: "In this round, you step into the role of a management consultant. You will study a company's numbers and story, identify the core problem, and submit a clear recommendation on what the company should do next. It tests your ability to separate signals from noise, structure your thinking, and justify decisions with logic and data.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    number: "03",
    label: "Round Three",
    heading: "The Investor Round",
    mode: "Online / Offline (Optional)",
    timeline: "2nd August, 2026",
    imageSrc: "/images/P1101583.JPG",
    imageAlt: "The Investor Round",
    body: "Step into the role of a Shark. You will break down startup pitches, question founders, and decide whether you would invest or not. Then, you will present your verdict to a jury of real investors and VCs, backed by clear reasoning, business fundamentals, and conviction.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

// ─── Icons ─────────────────────────────────────────────────────────────────────

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

// ─── Enquiry + Brochure Modal ─────────────────────────────────────────────────
function EnquiryBrochureModal({ brochureHref, onClose, submitAction }: { brochureHref: string; onClose: () => void; submitAction?: (data: { name: string; phone: string; school: string; email: string }) => Promise<{ success: boolean; message: string }> }) {
  const [form, setForm]     = useState({ name: "", phone: "", school: "", email: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const overlayRef          = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose]);

  const handleOverlay = (e: React.MouseEvent) => { if (e.target === overlayRef.current) onClose(); };
  const handleChange  = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const result = await (submitAction ?? submitSharkathonEnquiry)(form);
      if (result.success) {
        setStatus("success");
      } else { setStatus("error"); }
    } catch { setStatus("error"); }
  };

  return (
    <>
    <style>{`
      @media (max-width: 767px), (max-height: 700px) {
        .sh-enq-dark-overlay {
          align-items: flex-start !important;
          padding-top: calc(var(--navbar-h, 80px) + 8px) !important;
          padding-bottom: calc(var(--cta-btn-h, 72px) + 8px) !important;
          padding-left: 16px !important;
          padding-right: 16px !important;
          overflow-y: auto !important;
        }
      }
    `}</style>
    <div ref={overlayRef} onClick={handleOverlay} className="sh-enq-dark-overlay" style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "rgba(1,22,56,0.72)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px", backdropFilter: "blur(6px)",
    }}>
      <div role="dialog" aria-modal="true" style={{
        background: "#011638",
        border: "1.5px solid rgba(245,200,66,0.30)",
        borderRadius: 20, padding: "36px 32px",
        width: "100%", maxWidth: 420,
        position: "relative",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 14, right: 14,
          background: "none", border: "none", cursor: "pointer",
          color: "rgba(255,255,255,0.55)", padding: 6,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f5c842" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 16px" }}>
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <p style={{ color: "#ffffff", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Query submitted successfully!</p>
            <p style={{ color: "rgba(255,255,255,0.60)", fontSize: 14, marginBottom: 24 }}>Our team will reach out to you shortly. The brochure for Sharkathon will be sent to your email inbox — please check there.</p>
            <button onClick={onClose} style={{
              background: "#f5c842", color: "#011638",
              border: "none", borderRadius: 100, padding: "12px 32px",
              fontWeight: 700, fontSize: 14, cursor: "pointer",
            }}>Done</button>
          </div>
        ) : (
          <>
            <h2 style={{ color: "#f5c842", fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Enquire About Sharkathon</h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, marginBottom: 24 }}>Fill in your details and we&apos;ll get back to you.</p>
            <form onSubmit={handleSubmit} noValidate>
              {[
                { id: "name",   label: "Full Name",  type: "text",  placeholder: "e.g. Arjun Sharma" },
                { id: "phone",  label: "Phone No.",  type: "tel",   placeholder: "e.g. +91 98765 43210" },
                { id: "school", label: "School",     type: "text",  placeholder: "e.g. DPS RK Puram" },
                { id: "email",  label: "Email",      type: "email", placeholder: "e.g. arjun@email.com" },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id} style={{ marginBottom: 16 }}>
                  <label htmlFor={`rnd-${id}`} style={{
                    display: "block", color: "rgba(255,255,255,0.70)",
                    fontSize: 12, fontWeight: 600, marginBottom: 6,
                    letterSpacing: "0.8px", textTransform: "uppercase",
                  }}>{label}</label>
                  <input
                    id={`rnd-${id}`} name={id} type={type}
                    placeholder={placeholder}
                    value={(form as any)[id]} onChange={handleChange} required
                    style={{
                      width: "100%", background: "rgba(255,255,255,0.07)",
                      border: "1.5px solid rgba(255,255,255,0.15)",
                      borderRadius: 10, padding: "11px 14px",
                      color: "#ffffff", fontSize: 14,
                      outline: "none", fontFamily: "'DM Sans', sans-serif",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
              <button type="submit" disabled={status === "submitting"} style={{
                width: "100%", background: "#f5c842", color: "#011638",
                border: "none", borderRadius: 100, padding: "14px",
                fontWeight: 700, fontSize: 14, cursor: status === "submitting" ? "not-allowed" : "pointer",
                opacity: status === "submitting" ? 0.7 : 1,
                marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}>
                {status === "submitting" ? "Sending\u2026" : "Submit Query"}
              </button>
              {status === "error" && <p style={{ color: "#f87171", fontSize: 13, marginTop: 10, textAlign: "center" }}>Something went wrong. Please try again.</p>}
            </form>
          </>
        )}
      </div>
    </div>
    </>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
    </svg>
  );
}

// Shark-fin icon matching the screenshot
function SharkFin({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M6 38 C6 38 10 24 20 20 C26 18 30 20 34 18 C38 16 42 10 44 6 C44 6 40 14 36 16 C32 18 28 16 24 18 C16 20 10 28 8 38 Z"
        fill="#011638"
      />
      <path
        d="M8 38 C10 32 16 26 24 24 C30 22 36 24 40 28"
        stroke="#011638" strokeWidth="2" strokeLinecap="round" fill="none"
      />
      <circle cx="16" cy="26" r="2.5" fill="#011638" />
      <path
        d="M6 38 L42 38"
        stroke="#011638" strokeWidth="2" strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Single dark round card ─────────────────────────────────────────────────────

interface RoundCardProps {
  number: string;
  label: string;
  heading: string;
  mode: string;
  timeline: string;
  imageSrc: string;
  imageAlt: string;
  body: string;
  icon: React.ReactNode;
  index: number;
}

function RoundCard({ number, label, heading, mode, timeline, imageSrc, imageAlt, body, icon }: RoundCardProps) {
  return (
    <article className="sr-card">

      {/* Image */}
      <div className="sr-card-img-wrap">
        {imageSrc ? (
          <Image src={imageSrc} alt={imageAlt} className="sr-card-img" width={400} height={200} loading="lazy" sizes="(max-width: 768px) 100vw, 33vw" />
        ) : (
          <div className="sr-card-img-placeholder">
            <div className="sr-card-img-icon">{icon}</div>
            <span className="sr-card-img-placeholder-label">{heading}</span>
          </div>
        )}

        {/* Badge */}
        <div className="sr-round-badge">
          <span className="sr-round-badge-num">{number}</span>
          <span className="sr-round-badge-label">{label}</span>
        </div>
      </div>

      {/* Body */}
      <div className="sr-card-body">
        <div className="sr-card-heading-row">
          <span className="sr-card-icon">{icon}</span>
          <h3 className="sr-card-heading">{heading}</h3>
        </div>
        <div className="sr-mode-pill">
          <span className="sr-mode-dot" />
          <span className="sr-mode-text">{mode}</span>
        </div>
        <div className="sr-card-rule" />
        <p className="sr-card-copy">{body}</p>

        {/* Timeline pill — bottom of card */}
        <div className="sr-timeline-pill">
          <span className="sr-timeline-icon"><CalendarIcon /></span>
          <span className="sr-timeline-text">{timeline}</span>
        </div>
      </div>
    </article>
  );
}

// ─── Main section ──────────────────────────────────────────────────────────────

interface SharkathonRoundsProps {
  rounds?: typeof ROUNDS;
  applyHref?: string;
  brochureHref?: string;
  submitAction?: (data: { name: string; phone: string; school: string; email: string }) => Promise<{ success: boolean; message: string }>;
}

export default function SharkathonRounds({
  rounds = ROUNDS,
  applyHref    = "https://pages.razorpay.com/pl_SLYleXmwGJkGqi/view",
  brochureHref = "/Sharkathon Season2.pdf",
  submitAction,
}: SharkathonRoundsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const header  = section.querySelector<HTMLElement>(".sr-header");
    const cards   = Array.from(section.querySelectorAll<HTMLElement>(".sr-card"));
    const banner  = section.querySelector<HTMLElement>(".sr-judging-banner");
    const footer  = section.querySelector<HTMLElement>(".sr-footer");
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
            } else if (el === banner || el === footer) {
              const t = setTimeout(() => el.classList.add("is-visible"), 120);
              timeouts.set(el, t);
            } else {
              const idx = cards.indexOf(el);
              const t = setTimeout(() => el.classList.add("is-visible"), 80 + idx * 110);
              timeouts.set(el, t);
            }
          } else {
            const existing = timeouts.get(el);
            if (existing) clearTimeout(existing);
            el.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.08 }
    );

    [header, ...cards, banner, footer].forEach((el) => el && io.observe(el));
    return () => { io.disconnect(); timeouts.forEach(clearTimeout); };
  }, []);

  return (
    <>
      <style>{`
/* ── Section ── */
        .sr-section {
          background: #eef0f2;
          padding: 80px clamp(20px, 8vw, 120px) 100px;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Header ── */
        .sr-header {
          text-align: center; margin-bottom: 56px;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .sr-header.is-visible { opacity: 1; transform: translateY(0); }

        .sr-eyebrow {
          display: inline-flex; align-items: center; gap: 12px;
          font-size: 11px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: #011638; opacity: 0.45;
          margin-bottom: 14px; font-family: 'DM Sans', sans-serif;
        }
        .sr-title {
          font-size: clamp(26px, 3.5vw, 40px); font-weight: 700;
          color: #011638; letter-spacing: -0.5px; line-height: 1.15;
          font-family: 'DM Sans', sans-serif; margin-bottom: 0;
        }
        .sr-rule {
          width: 96px; height: 4px;
          background: linear-gradient(to right, #60a5fa, #2563eb);
          border-radius: 99px; margin: 14px auto 0;
        }
        .sr-subtitle {
          margin-top: 14px; font-size: 15px;
          color: rgba(1,22,56,0.50); font-family: 'DM Sans', sans-serif;
        }

        /* ── 3-column cards grid ── */
        .sr-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 2.5vw, 28px);
          max-width: 1200px;
          margin: 0 auto 32px;
        }

        /* ── Dark card ── */
        .sr-card {
          background: #011638;
          border-radius: 20px;
          overflow: hidden;
          display: flex; flex-direction: column;
          box-shadow: 0 8px 32px rgba(1,22,56,0.14), 0 2px 8px rgba(1,22,56,0.08);
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.55s ease, transform 0.55s ease, box-shadow 0.3s ease;
          position: relative;
        }
        .sr-card.is-visible { opacity: 1; transform: translateY(0); }
        .sr-card.is-visible:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 56px rgba(1,22,56,0.22), 0 4px 16px rgba(1,22,56,0.12);
        }
        /* Yellow left accent bar */
        .sr-card::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0;
          width: 3px; background: #f5c842; border-radius: 20px 0 0 20px;
        }

        /* ── Image ── */
        .sr-card-img-wrap {
          position: relative; width: 100%;
          aspect-ratio: 16 / 9; overflow: hidden;
          background: #0a2347; flex-shrink: 0;
        }
        .sr-card-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          filter: grayscale(20%);
          transition: filter 0.4s ease, transform 0.4s ease;
        }
        .sr-card:hover .sr-card-img { filter: grayscale(0%); transform: scale(1.03); }

        .sr-card-img-placeholder {
          width: 100%; height: 100%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 10px;
          background: linear-gradient(135deg, #0a2347 0%, #011638 100%);
        }
        .sr-card-img-icon {
          width: 52px; height: 52px; border-radius: 50%;
          background: rgba(245,200,66,0.12);
          border: 1.5px solid rgba(245,200,66,0.25);
          display: flex; align-items: center; justify-content: center;
          color: #f5c842;
        }
        .sr-card-img-placeholder-label {
          font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
          color: rgba(255,255,255,0.20); font-family: 'DM Sans', sans-serif;
        }

        /* ── Round badge ── */
        .sr-round-badge {
          position: absolute; top: 14px; left: 14px;
          display: flex; align-items: center; gap: 7px;
          padding: 5px 12px 5px 8px;
          background: rgba(1,22,56,0.82);
          border: 1px solid rgba(245,200,66,0.35);
          border-radius: 100px;
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
        }
        .sr-round-badge-num {
          font-size: 12px; font-weight: 800; color: #f5c842;
          line-height: 1; font-family: 'DM Sans', sans-serif;
        }
        .sr-round-badge-label {
          font-size: 9px; font-weight: 600; letter-spacing: 1.5px;
          text-transform: uppercase; color: rgba(255,255,255,0.65);
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Card body ── */
        .sr-card-body {
          padding: 22px 24px 24px;
          display: flex; flex-direction: column; flex: 1;
        }
        .sr-card-heading-row {
          display: flex; align-items: center; gap: 12px; margin-bottom: 14px;
        }
        .sr-card-icon {
          flex-shrink: 0; width: 38px; height: 38px; border-radius: 50%;
          background: #f5c842;
          display: flex; align-items: center; justify-content: center;
          color: #011638; box-shadow: 0 4px 12px rgba(245,200,66,0.30);
        }
        .sr-card-heading {
          font-size: clamp(15px, 1.4vw, 18px); font-weight: 700;
          color: #ffffff; line-height: 1.2; letter-spacing: -0.2px;
          font-family: 'DM Sans', sans-serif; margin: 0;
        }
        .sr-card-rule {
          width: 100%; height: 1px;
          background: rgba(255,255,255,0.07);
          margin-bottom: 14px; flex-shrink: 0;
        }
        .sr-card-copy {
          font-size: clamp(13px, 1.05vw, 14px); line-height: 1.80;
          color: rgba(255,255,255,0.58); font-family: 'DM Sans', sans-serif;
          font-weight: 400; flex: 1; margin-bottom: 20px;
        }
        .sr-timeline-pill {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 7px 14px;
          background: rgba(245,200,66,0.10);
          border: 1.5px solid rgba(245,200,66,0.28);
          border-radius: 100px; align-self: flex-start; margin-top: auto;
        }
        .sr-timeline-icon { color: #f5c842; display: flex; align-items: center; }
        .sr-timeline-text {
          font-size: 12px; font-weight: 700; color: #f5c842;
          letter-spacing: 0.3px; font-family: 'DM Sans', sans-serif;
        }

        /* Mode pill */
        .sr-mode-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 12px;
          background: rgba(245,200,66,0.10);
          border: 1px solid #f5c842;
          border-radius: 100px;
          margin-bottom: 14px;
          width: fit-content;
        }
        .sr-mode-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #f5c842; flex-shrink: 0;
        }
        .sr-mode-text {
          font-size: 11px; font-weight: 700;
          color: #f5c842; letter-spacing: 0.4px;
          font-family: 'DM Sans', sans-serif;
        }

        /* ══════════════════════════════════════════
           JUDGING BANNER — full-width yellow strip
        ══════════════════════════════════════════ */
        .sr-judging-banner {
          max-width: 1200px;
          margin: 0 auto 40px;
          background: #f5c842;
          border-radius: 16px;
          padding: 22px 28px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 8px 32px rgba(1,22,56,0.12);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .sr-judging-banner.is-visible { opacity: 1; transform: translateY(0); }

        .sr-judging-icon-wrap {
          flex-shrink: 0;
          width: 56px; height: 56px;
          display: flex; align-items: center; justify-content: center;
        }

        .sr-judging-text { flex: 1; min-width: 0; }

        .sr-judging-top {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 6px; flex-wrap: wrap;
        }

        .sr-judging-heading {
          font-size: clamp(15px, 1.5vw, 17px); font-weight: 700;
          color: #011638; font-family: 'DM Sans', sans-serif;
          letter-spacing: -0.2px; margin: 0;
        }

        .sr-judging-date-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 12px;
          background: rgba(1,22,56,0.10);
          border: 1px solid rgba(1,22,56,0.18);
          border-radius: 100px;
        }
        .sr-judging-date-pill span {
          font-size: 11px; font-weight: 700; color: #011638;
          letter-spacing: 0.3px; font-family: 'DM Sans', sans-serif;
        }
        .sr-judging-date-icon { color: #011638; opacity: 0.65; display: flex; align-items: center; }

        .sr-judging-copy {
          font-size: clamp(13px, 1.1vw, 14px); line-height: 1.70;
          color: rgba(1,22,56,0.72); font-family: 'DM Sans', sans-serif;
          font-weight: 400; margin: 0;
        }
        .sr-judging-copy strong { color: #011638; font-weight: 700; }

        /* ══════════════════════════════════════════
           FOOTER — note + CTA buttons
        ══════════════════════════════════════════ */
        .sr-footer {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.55s ease 0.15s, transform 0.55s ease 0.15s;
        }
        .sr-footer.is-visible { opacity: 1; transform: translateY(0); }

        .sr-footer-note {
          font-size: 13px; line-height: 1.65;
          color: rgba(1,22,56,0.55); font-family: 'DM Sans', sans-serif;
          max-width: 560px;
        }
        .sr-footer-note strong { color: #011638; font-weight: 700; }

        .sr-footer-btns {
          display: flex; gap: 12px; flex-wrap: wrap; flex-shrink: 0;
        }

        .sr-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 100px;
          font-size: 13px; font-weight: 700; letter-spacing: 0.6px;
          text-transform: uppercase; font-family: 'DM Sans', sans-serif;
          text-decoration: none; cursor: pointer;
          transition: all 0.22s ease;
          border: 2px solid #011638;
          text-align: center;
        }
        .sr-btn-label {
          display: flex; flex-direction: column; align-items: center; gap: 2px;
        }
        .sr-btn-sub {
          font-size: 10px; font-weight: 500; letter-spacing: 0.3px;
          text-transform: none; opacity: 0.75; line-height: 1;
        }
        .sr-btn-primary {
          background: #011638; color: #f5c842;
          box-shadow: 0 6px 20px rgba(1,22,56,0.20);
        }
        .sr-btn-primary:hover {
          background: transparent; color: #011638;
          box-shadow: none; transform: scale(1.04);
        }
        .sr-btn-secondary {
          background: transparent; color: #011638;
        }
        .sr-btn-secondary:hover {
          background: rgba(1,22,56,0.07); transform: scale(1.04);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .sr-grid { grid-template-columns: repeat(2, 1fr); }
          .sr-grid .sr-card:last-child {
            grid-column: 1 / -1; max-width: 560px;
            margin-left: auto; margin-right: auto; width: 100%;
          }
        }
        @media (max-width: 640px) {
          .sr-judging-banner { flex-direction: column; align-items: flex-start; gap: 12px; }
          .sr-footer { flex-direction: column; align-items: flex-start; }
          .sr-footer-btns { width: 100%; }
          .sr-btn { flex: 1; justify-content: center; }
        }
        @media (max-width: 600px) {
          .sr-section { padding: 56px 16px 72px; }
          .sr-grid { grid-template-columns: 1fr; }
          .sr-grid .sr-card:last-child { grid-column: unset; max-width: unset; }
          .sr-card-body { padding: 18px 18px 20px; }
        }
        @media (max-width: 380px) {
          .sr-section { padding: 44px 14px 60px; }
          .sr-card-icon { width: 32px; height: 32px; }
          .sr-card-icon svg { width: 16px; height: 16px; }
        }
      `}</style>

      <section className="sr-section" ref={sectionRef}>

        {/* ── Header ── */}
        <div className="sr-header">
          <div className="sr-eyebrow">
            <span style={{ display: "inline-block", width: 28, height: 2, background: "#011638", opacity: 0.35, flexShrink: 0 }} />
            Sharkathon Season 2
            <span style={{ display: "inline-block", width: 28, height: 2, background: "#011638", opacity: 0.35, flexShrink: 0 }} />
          </div>
          <h2 className="sr-title">
            Sharkathon{" "}
            <em style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 400 }}>
              Rounds
            </em>
          </h2>
          <div className="sr-rule" />
          <p className="sr-subtitle">Three rounds. Three roles.</p>
        </div>

        {/* ── 3 dark cards ── */}
        <div className="sr-grid">
          {rounds.map((round, i) => (
            <RoundCard key={round.number} {...round} index={i} />
          ))}
        </div>

        {/* ── Expert Judging Panel banner ── */}
        <div className="sr-judging-banner">
          <div className="sr-judging-icon-wrap">
            <SharkFin size={48} />
          </div>

          <div className="sr-judging-text">
            <div className="sr-judging-top">
              <h3 className="sr-judging-heading">Expert Judging Panel</h3>
              <div className="sr-judging-date-pill">
                <span className="sr-judging-date-icon"><CalendarIcon /></span>
                <span>2nd August, 2026</span>
              </div>
            </div>
            <p className="sr-judging-copy">
              Evaluation by eminent venture capital, debt firms, and leading CXOs from startups and MNCs, ensuring high-level scrutiny and real-world relevance.
            </p>
          </div>
        </div>

        {/* ── Footer: note + shared CTAs ── */}
        <div className="sr-footer">
          <p className="sr-footer-note">
            Ready to think like a <strong>CEO, Consultant, and Investor</strong>? Applications are open for
            Sharkathon Season 2. Seats are limited — secure yours now.
          </p>
          <div className="sr-footer-btns">
            <a href={applyHref} className="sr-btn sr-btn-primary">
              Register Now <ArrowIcon />
            </a>
            <button onClick={() => setShowModal(true)} className="sr-btn sr-btn-secondary" type="button">
              Enquire Now <ArrowIcon />
            </button>
          </div>
        </div>
      </section>
      {showModal && <EnquiryBrochureModal brochureHref={brochureHref} onClose={() => setShowModal(false)} submitAction={submitAction} />}
    </>
  );
}