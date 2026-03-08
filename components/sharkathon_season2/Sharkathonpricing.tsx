"use client";

import { useEffect, useRef, useState } from "react";

// ─── Icons ─────────────────────────────────────────────────────────────────────

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f5c842" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

// ─── Google Sheets config ───────────────────────────────────────────────────────
// Replace SHEET_WEBHOOK_URL with your Google Apps Script Web App deployment URL.
// Apps Script code (deploy as Web App, execute as Me, access Anyone):
//
//   function doPost(e) {
//     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//     const data  = JSON.parse(e.postData.contents);
//     sheet.appendRow([new Date(), data.name, data.phone, data.school, data.email]);
//     return ContentService.createTextOutput("ok");
//   }

const SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";

// ─── Enquiry Modal ─────────────────────────────────────────────────────────────

function EnquiryModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", phone: "", school: "", email: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll while modal open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      // Google Sheets: no-cors fetch so we don't get blocked by CORS preflight
      await fetch(SHEET_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, timestamp: new Date().toISOString() }),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <style>{`
        @keyframes enq-overlay-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes enq-card-in {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }

        .enq-overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(1,22,56,0.70);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          animation: enq-overlay-in 0.25s ease both;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        .enq-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 36px 36px 32px;
          width: 100%;
          max-width: 460px;
          position: relative;
          box-shadow: 0 32px 80px rgba(1,22,56,0.35), 0 4px 16px rgba(1,22,56,0.15);
          animation: enq-card-in 0.35s cubic-bezier(0.34,1.40,0.64,1) both;
          font-family: 'DM Sans', sans-serif;
        }

        .enq-close {
          position: absolute; top: 16px; right: 16px;
          width: 34px; height: 34px; border-radius: 50%;
          background: #eef0f2; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #011638;
          transition: background 0.2s, transform 0.2s;
        }
        .enq-close:hover { background: #dde0e4; transform: scale(1.08); }

        .enq-heading {
          font-size: 22px; font-weight: 700; color: #011638;
          margin-bottom: 4px; letter-spacing: -0.3px;
          font-family: 'DM Sans', sans-serif;
          padding-right: 32px;
        }
        .enq-sub {
          font-size: 13px; color: rgba(1,22,56,0.50);
          margin-bottom: 28px;
          font-family: 'DM Sans', sans-serif;
        }

        .enq-field {
          margin-bottom: 16px;
        }
        .enq-label {
          display: block;
          font-size: 11px; font-weight: 700;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: rgba(1,22,56,0.45);
          margin-bottom: 6px;
          font-family: 'DM Sans', sans-serif;
        }
        .enq-input {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid rgba(1,22,56,0.15);
          border-radius: 10px;
          font-size: 14px; font-weight: 500; color: #011638;
          font-family: 'DM Sans', sans-serif;
          background: #f8f9fb;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .enq-input:focus {
          border-color: #f5c842;
          box-shadow: 0 0 0 3px rgba(245,200,66,0.18);
          background: #ffffff;
        }
        .enq-input::placeholder { color: rgba(1,22,56,0.25); }

        .enq-submit {
          width: 100%; margin-top: 8px;
          padding: 14px 28px;
          border-radius: 100px;
          background: #011638; color: #f5c842;
          font-size: 13px; font-weight: 700;
          letter-spacing: 1.5px; text-transform: uppercase;
          font-family: 'DM Sans', sans-serif;
          border: 2px solid #011638; cursor: pointer;
          transition: all 0.25s ease;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .enq-submit:hover:not(:disabled) {
          background: transparent; color: #011638;
        }
        .enq-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        .enq-success {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 12px; padding: 20px 0 8px;
          text-align: center;
        }
        .enq-success-title {
          font-size: 20px; font-weight: 700; color: #011638;
          font-family: 'DM Sans', sans-serif;
        }
        .enq-success-body {
          font-size: 14px; color: rgba(1,22,56,0.55);
          font-family: 'DM Sans', sans-serif; line-height: 1.6;
        }
        .enq-error {
          margin-top: 8px;
          font-size: 13px; color: #c0392b;
          font-family: 'DM Sans', sans-serif; text-align: center;
        }

        @media (max-width: 480px) {
          .enq-card { padding: 28px 20px 24px; }
          .enq-heading { font-size: 18px; }
        }
      `}</style>

      <div className="enq-overlay" ref={overlayRef} onClick={handleOverlayClick}>
        <div className="enq-card" role="dialog" aria-modal="true" aria-label="Enquiry form">

          <button className="enq-close" onClick={onClose} aria-label="Close"><CloseIcon /></button>

          {status === "success" ? (
            <div className="enq-success">
              <CheckIcon />
              <p className="enq-success-title">We've received your enquiry!</p>
              <p className="enq-success-body">
                Our team will reach out to you shortly.<br />
                Keep an eye on your inbox.
              </p>
              <button
                className="enq-submit"
                style={{ marginTop: 20, maxWidth: 200 }}
                onClick={onClose}
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <h2 className="enq-heading">Enquire about Sharkathon</h2>
              <p className="enq-sub">Fill in your details and we'll get back to you.</p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="enq-field">
                  <label className="enq-label" htmlFor="enq-name">Full Name</label>
                  <input
                    id="enq-name" name="name" type="text"
                    className="enq-input" placeholder="e.g. Arjun Sharma"
                    value={form.name} onChange={handleChange} required
                  />
                </div>
                <div className="enq-field">
                  <label className="enq-label" htmlFor="enq-phone">Phone No.</label>
                  <input
                    id="enq-phone" name="phone" type="tel"
                    className="enq-input" placeholder="e.g. +91 98765 43210"
                    value={form.phone} onChange={handleChange} required
                  />
                </div>
                <div className="enq-field">
                  <label className="enq-label" htmlFor="enq-school">School</label>
                  <input
                    id="enq-school" name="school" type="text"
                    className="enq-input" placeholder="e.g. DPS RK Puram"
                    value={form.school} onChange={handleChange} required
                  />
                </div>
                <div className="enq-field">
                  <label className="enq-label" htmlFor="enq-email">Email</label>
                  <input
                    id="enq-email" name="email" type="email"
                    className="enq-input" placeholder="e.g. arjun@email.com"
                    value={form.email} onChange={handleChange} required
                  />
                </div>

                <button
                  className="enq-submit"
                  type="submit"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending…" : <>Submit Enquiry <ArrowIcon /></>}
                </button>

                {status === "error" && (
                  <p className="enq-error">Something went wrong. Please try again or email us directly.</p>
                )}
              </form>
            </>
          )}

        </div>
      </div>
    </>
  );
}

// ─── Pricing Section ────────────────────────────────────────────────────────────

interface SharkathonPricingProps {
  fee?: string;
  applyHref?: string;
  onApply?: () => void;
}

export default function SharkathonPricing({
  fee       = "INR 5000",
  applyHref = "https://pages.razorpay.com/pl_SLYleXmwGJkGqi/view",
  onApply,
}: SharkathonPricingProps) {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelector(".vcp-header")?.classList.add("vcp-animate");
            entry.target.querySelector(".vcp-left")?.classList.add("vcp-animate");
            entry.target.querySelector(".vcp-right")?.classList.add("vcp-animate");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes vcp-header-fade {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes vcp-left-slide {
          from { opacity: 0; transform: translateX(-32px) rotate(-1deg); }
          to   { opacity: 1; transform: translateX(0)     rotate(-1deg); }
        }
        @keyframes vcp-right-slide {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0);    }
        }

        /* ── Section ── */
        .vcp-section {
          background: #f5c842;
          padding: 80px clamp(20px, 8vw, 120px);
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Header ── */
        .vcp-header {
          text-align: center;
          margin-bottom: 56px;
          opacity: 0;
          transform: translateY(-16px);
        }
        .vcp-header.vcp-animate {
          animation: vcp-header-fade 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .vcp-title {
          font-size: clamp(26px, 3.5vw, 38px);
          font-weight: 700; color: #011638;
          letter-spacing: -0.5px; line-height: 1.2;
          font-family: 'DM Sans', sans-serif;
        }
        .vcp-rule {
          width: 96px; height: 4px;
          background: #011638; border-radius: 99px;
          margin: 14px auto 0; opacity: 0.20;
        }

        /* ── Stack container ── */
        .vcp-stack {
          position: relative;
          max-width: 980px;
          margin: 0 auto;
          /* enough breathing room for the tilted white card's shadow */
          padding: 20px 0 20px 0;
          /* let children set their own heights — stack will be as tall as the blue card */
          display: flex;
          align-items: stretch;
        }

        /* ── WHITE card (behind, slightly rotated) ── */
        .vcp-left {
          background: #eef0f2;
          border-radius: 20px;
          /* wider so it peeks out nicely from behind the blue card */
          width: 46%;
          /* content padding; no explicit min-height — it will grow with content */
          padding: 40px 36px 40px 36px;
          position: relative;
          z-index: 1;
          /* slight CCW tilt for depth */
          transform: rotate(-1deg);
          transform-origin: left center;
          box-shadow:
            0 8px 32px rgba(1,22,56,0.14),
            0 2px 8px rgba(1,22,56,0.08);
          opacity: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 20px;
          /* align-self: stretch means it fills the container height */
          align-self: stretch;
        }
        .vcp-left.vcp-animate {
          animation: vcp-left-slide 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }

        /* ── Bullet rows inside white card ── */
        .vcp-bullet {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          font-size: 14px;
          line-height: 1.65;
          color: #011638;
          padding-right: 20px;
        }
        .vcp-bullet strong { color: #011638; font-weight: 700; }
        .vcp-plus {
          flex-shrink: 0;
          margin-top: 2px;
          width: 26px; height: 26px;
          border-radius: 50%;
          background: #f5c842; color: #011638;
          font-size: 18px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          line-height: 1;
        }

        /* ── BLUE card (on top, overlapping right portion of white) ── */
        .vcp-right {
          background: #011638;
          border-radius: 20px;
          /* tight vertical padding — key fix */
          padding: 28px 36px 28px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0;
          position: absolute;
          /* overlap: start at 30% so ≈30% of white card peeks out on the left */
          left: 40%;
          top: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          overflow: hidden;
          box-shadow:
            0 24px 64px rgba(1,22,56,0.40),
            0 4px 16px rgba(1,22,56,0.20),
            -8px 0 24px rgba(1,22,56,0.12);
          opacity: 0;
        }
        .vcp-right.vcp-animate {
          animation: vcp-right-slide 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.12s forwards;
        }
        /* Decorative glow orb in top-right corner */
        .vcp-right::after {
          content: '';
          position: absolute; top: -60px; right: -60px;
          width: 200px; height: 200px;
          background: rgba(245,200,66,0.06);
          border-radius: 50%; filter: blur(60px);
          pointer-events: none;
        }

        /* ── Fee label ── */
        .vcp-fee-label {
          font-size: 10px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase;
          color: #f5c842; margin-bottom: 8px;
          position: relative; z-index: 1;
        }

        /* ── Fee amount row ── */
        .vcp-fee-row {
          display: flex; align-items: baseline; gap: 10px;
          margin-bottom: 20px;
          position: relative; z-index: 1;
          flex-wrap: wrap;
        }
        .vcp-fee-amount {
          font-size: clamp(30px, 4vw, 42px);
          font-weight: 700; color: #ffffff;
          letter-spacing: -2px; line-height: 1;
          font-family: 'DM Sans', sans-serif;
        }
        .vcp-fee-suffix {
          font-size: 13px; font-weight: 600;
          color: rgba(255,255,255,0.40);
          letter-spacing: 1px;
          align-self: flex-end; margin-bottom: 3px;
        }

        /* ── Divider ── */
        .vcp-divider {
          width: 100%; height: 1px;
          background: rgba(255,255,255,0.08);
          margin-bottom: 20px;
          position: relative; z-index: 1;
        }

        /* ── Buttons row ── */
        .vcp-btn-row {
          display: flex; gap: 12px; flex-wrap: wrap;
          position: relative; z-index: 1;
        }

        .vcp-btn {
          flex: 1; min-width: 140px;
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 14px 20px;
          border-radius: 100px;
          background: #f5c842; color: #011638;
          font-size: 12px; font-weight: 700;
          letter-spacing: 1.2px; text-transform: uppercase;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none; cursor: pointer;
          border: 2px solid #f5c842;
          transition: all 0.25s ease;
          box-shadow: 0 4px 20px rgba(245,200,66,0.20);
          white-space: nowrap;
        }
        .vcp-btn:hover {
          background: transparent; color: #f5c842;
          box-shadow: none;
        }
        .vcp-btn-outline {
          background: transparent; color: #f5c842;
          box-shadow: none;
        }
        .vcp-btn-outline:hover {
          background: rgba(245,200,66,0.12) !important;
          color: #f5c842 !important;
        }

        /* ── Mobile stacking ── */
        @media (max-width: 700px) {
          .vcp-stack {
            flex-direction: column;
            padding: 0;
            align-items: unset;
          }
          .vcp-left {
            width: 100%;
            transform: rotate(0deg);
            position: static;
            align-self: auto;
            padding: 28px 24px;
          }
          .vcp-right {
            position: static;
            left: unset; top: unset; right: unset; bottom: unset;
            margin-top: -20px;
            padding: 28px 24px;
          }
          .vcp-btn { flex: unset; width: 100%; }
          .vcp-btn-row { flex-direction: column; }
        }
      `}</style>

      {showModal && <EnquiryModal onClose={() => setShowModal(false)} />}

      <section className="vcp-section" ref={sectionRef}>

        {/* Header */}
        <div className="vcp-header">
          <h2 className="vcp-title">
            Programme{" "}
            <em style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 400 }}>
              Pricing & Details
            </em>
          </h2>
          <div className="vcp-rule" />
        </div>

        <div className="vcp-stack">

          {/* ── WHITE card — behind ── */}
          <div className="vcp-left">
            <div className="vcp-bullet">
              <span className="vcp-plus">+</span>
              <span>
                <strong>Hybrid Format: </strong>
                Students attend the first two rounds online. The final round can be attended online or offline (optional).
              </span>
            </div>
            <div className="vcp-bullet">
              <span className="vcp-plus">+</span>
              <span>
                <strong>Inclusions: </strong>
                Learning resources, competition access, and hospitality provisions are all included.
              </span>
            </div>
          </div>

          {/* ── BLUE card — on top ── */}
          <div className="vcp-right">
            <p className="vcp-fee-label">Programme Fee</p>

            <div className="vcp-fee-row">
              <span className="vcp-fee-amount">{fee}</span>
              <span className="vcp-fee-suffix">(INCLUSIVE OF GST)</span>
            </div>

            <div className="vcp-divider" />

            <div className="vcp-btn-row">
              {/* Register Now — primary filled */}
              <a href={applyHref} onClick={onApply} className="vcp-btn">
                Register Now <ArrowIcon />
              </a>
              {/* Enquire More — outline, opens modal */}
              <button
                className="vcp-btn vcp-btn-outline"
                onClick={() => setShowModal(true)}
                type="button"
              >
                Enquire More <ArrowIcon />
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}