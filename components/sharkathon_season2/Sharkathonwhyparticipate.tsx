"use client";

import { useEffect, useRef, useState } from "react";
import { submitSharkathonEnquiry } from "@/app/actions/registration";
import Image from "next/image";

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

const BENEFITS = [
  {
    id: "cert",
    title: "Certification & Letter of Recommendation",
    body: "Merit-based LORs and certificates from Ivy League alumni and CXOs, for top performers.",
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" /></svg>),
    accent: "#f5c842",
  },
  {
    id: "industry",
    title: "Industry Connect",
    body: "Interact with investors and senior industry leaders from across the ecosystem.",
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>),
    accent: "#60a5fa",
  },
  {
    id: "exposure",
    title: "Exposure Day",
    body: "Top performers get a chance to visit and observe how a real investment fund works.",
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>),
    accent: "#34d399",
  },
  {
    id: "career",
    title: "College & Career Readiness",
    body: "Boost your profile with real business experience that stands out on college applications.",
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>),
    accent: "#f472b6",
  },
];

function EnquiryModal({ onClose, brochureHref, submitAction }: { onClose: () => void; brochureHref: string; submitAction?: (data: { name: string; phone: string; school: string; email: string }) => Promise<{ success: boolean; message: string }> }) {
  const [form, setForm] = useState({ name: "", phone: "", school: "", email: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent) => { if (e.target === overlayRef.current) onClose(); };

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

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
        @keyframes enq-overlay-in{from{opacity:0}to{opacity:1}}
        @keyframes enq-card-in{from{opacity:0;transform:translateY(24px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        .enq-overlay{position:fixed;inset:0;z-index:99999;background:rgba(1,22,56,0.72);display:flex;align-items:center;justify-content:center;padding:20px;animation:enq-overlay-in 0.25s ease both;backdrop-filter:blur(4px);}
        .enq-card{background:#fff;border-radius:20px;padding:36px 36px 32px;width:100%;max-width:460px;position:relative;box-shadow:0 32px 80px rgba(1,22,56,0.35);animation:enq-card-in 0.35s cubic-bezier(0.34,1.40,0.64,1) both;font-family:'DM Sans',sans-serif;}
        .enq-close{position:absolute;top:16px;right:16px;width:34px;height:34px;border-radius:50%;background:#eef0f2;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#011638;transition:background 0.2s,transform 0.2s;}
        .enq-close:hover{background:#dde0e4;transform:scale(1.08)}
        .enq-heading{font-size:22px;font-weight:700;color:#011638;margin-bottom:4px;letter-spacing:-0.3px;padding-right:32px;}
        .enq-sub{font-size:13px;color:rgba(1,22,56,0.50);margin-bottom:28px;}
        .enq-field{margin-bottom:16px;}
        .enq-label{display:block;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:rgba(1,22,56,0.45);margin-bottom:6px;}
        .enq-input{width:100%;padding:12px 16px;border:1.5px solid rgba(1,22,56,0.15);border-radius:10px;font-size:14px;color:#011638;background:#f8f9fb;transition:border-color 0.2s,box-shadow 0.2s;outline:none;}
        .enq-input:focus{border-color:#f5c842;box-shadow:0 0 0 3px rgba(245,200,66,0.18);background:#fff;}
        .enq-input::placeholder{color:rgba(1,22,56,0.25);}
        .enq-submit{width:100%;margin-top:8px;padding:14px 28px;border-radius:100px;background:#011638;color:#f5c842;font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;border:2px solid #011638;cursor:pointer;transition:all 0.25s ease;display:flex;align-items:center;justify-content:center;gap:8px;}
        .enq-submit:hover:not(:disabled){background:transparent;color:#011638;}
        .enq-submit:disabled{opacity:0.6;cursor:not-allowed;}
        .enq-success{display:flex;flex-direction:column;align-items:center;gap:12px;padding:20px 0 8px;text-align:center;}
        .enq-success-title{font-size:20px;font-weight:700;color:#011638;}
        .enq-success-body{font-size:14px;color:rgba(1,22,56,0.55);line-height:1.6;}
        .enq-error{margin-top:8px;font-size:13px;color:#c0392b;text-align:center;}
        @media (max-width: 767px), (max-height: 700px) {
          .enq-overlay {
            align-items: flex-start;
            padding-top: calc(var(--navbar-h, 80px) + 8px);
            padding-bottom: calc(var(--cta-btn-h, 72px) + 8px);
            padding-left: 16px;
            padding-right: 16px;
            overflow-y: auto;
          }
        }
        @media (max-width: 480px) {
          .enq-card { padding: 28px 20px 24px; }
          .enq-heading { font-size: 18px; }
          .enq-field { margin-bottom: 12px; }
          .enq-sub { margin-bottom: 20px; }
        }
      `}</style>
      <div className="enq-overlay" ref={overlayRef} onClick={handleOverlayClick}>
        <div className="enq-card" role="dialog" aria-modal="true">
          <button className="enq-close" onClick={onClose} aria-label="Close"><CloseIcon /></button>
          {status === "success" ? (
            <div className="enq-success">
              <CheckIcon />
              <p className="enq-success-title">Query submitted successfully!</p>
              <p className="enq-success-body">Our team will reach out to you shortly. The brochure for Sharkathon will be sent to your email inbox — please check there.</p>
              <button className="enq-submit" style={{ marginTop:20, maxWidth:200 }} onClick={onClose}>Done</button>
            </div>
          ) : (
            <>
              <h2 className="enq-heading">Enquire about Sharkathon</h2>
              <p className="enq-sub">Fill in your details and we'll get back to you.</p>
              <form onSubmit={handleSubmit} noValidate>
                <div className="enq-field"><label className="enq-label" htmlFor="eq-name">Full Name</label><input id="eq-name" name="name" type="text" className="enq-input" placeholder="e.g. Arjun Sharma" value={form.name} onChange={handleChange} required /></div>
                <div className="enq-field"><label className="enq-label" htmlFor="eq-phone">Phone No.</label><input id="eq-phone" name="phone" type="tel" className="enq-input" placeholder="e.g. +91 98765 43210" value={form.phone} onChange={handleChange} required /></div>
                <div className="enq-field"><label className="enq-label" htmlFor="eq-school">School</label><input id="eq-school" name="school" type="text" className="enq-input" placeholder="e.g. DPS RK Puram" value={form.school} onChange={handleChange} required /></div>
                <div className="enq-field"><label className="enq-label" htmlFor="eq-email">Email</label><input id="eq-email" name="email" type="email" className="enq-input" placeholder="e.g. arjun@email.com" value={form.email} onChange={handleChange} required /></div>
                <button className="enq-submit" type="submit" disabled={status === "submitting"}>
                  {status === "submitting" ? "Sending…" : <>Submit Query <ArrowIcon /></>}
                </button>
                {status === "error" && <p className="enq-error">Something went wrong. Please try again.</p>}
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

interface SharkathonWhyProps {
  applyHref?: string;
  brochureHref?: string;
  imageSrc?: string;
  submitAction?: (data: { name: string; phone: string; school: string; email: string }) => Promise<{ success: boolean; message: string }>;
}

export default function SharkathonWhyParticipate({ applyHref = "https://pages.razorpay.com/pl_SLYleXmwGJkGqi/view", brochureHref="/Sharkathon Season2.pdf", imageSrc, submitAction }: SharkathonWhyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const header  = section.querySelector<HTMLElement>(".wyp-header");
    const cards   = Array.from(section.querySelectorAll<HTMLElement>(".wyp-card"));
    const cta     = section.querySelector<HTMLElement>(".wyp-cta");
    const imgWrap = section.querySelector<HTMLElement>(".wyp-image-wrap");

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          if (el === header) el.classList.add("is-visible");
          else if (el === cta) setTimeout(() => el.classList.add("is-visible"), 200);
          else if (el === imgWrap) setTimeout(() => el.classList.add("is-visible"), 80);
          else { const idx = cards.indexOf(el); setTimeout(() => el.classList.add("is-visible"), 80 + idx * 110); }
        } else {
          el.classList.remove("is-visible");
        }
      });
    }, { threshold: 0.08 });

    [header, ...cards, cta, imgWrap].forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{`
/* ── Section ── */
        .wyp-section {
          background: #011638;
          padding: 88px clamp(20px, 7vw, 100px) 96px;
          font-family: 'DM Sans', sans-serif;
          position: relative; overflow: hidden;
        }
        .wyp-section::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 55% 55% at 80% 20%, rgba(245,200,66,0.06) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 5% 90%,  rgba(30,90,200,0.14)  0%, transparent 60%);
        }

        /* ── Grid ── */
        .wyp-inner {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 72px);
          align-items: center;
          max-width: 1200px; margin: 0 auto;
        }

        /* ── Header ── */
        .wyp-header {
          margin-bottom: 36px;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .wyp-header.is-visible { opacity: 1; transform: translateY(0); }

        .wyp-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: #f5c842; margin-bottom: 12px;
        }
        .wyp-title {
          font-size: clamp(26px, 3.4vw, 42px); font-weight: 700;
          color: #ffffff; letter-spacing: -0.8px; line-height: 1.1;
          font-family: 'DM Sans', sans-serif;
        }
        .wyp-title em {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic; font-weight: 400;
        }
        .wyp-rule {
          width: 88px; height: 4px;
          background: linear-gradient(to right, #f5c842, #ffe066);
          border-radius: 99px; margin-top: 16px;
        }

        /* ── Cards ── */
        .wyp-cards { display: flex; flex-direction: column; gap: 12px; }

        .wyp-card {
          display: flex; align-items: flex-start; gap: 16px;
          padding: 16px 20px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          position: relative; overflow: hidden;
          opacity: 0; transform: translateX(-20px);
          transition: opacity 0.5s ease, transform 0.5s ease, background 0.3s ease, border-color 0.3s ease;
        }
        .wyp-card.is-visible { opacity: 1; transform: translateX(0); }
        .wyp-card.is-visible:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(245,200,66,0.25);
          transform: translateX(4px);
        }
        .wyp-card-accent {
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 3px; border-radius: 14px 0 0 14px;
        }
        .wyp-icon {
          flex-shrink: 0; width: 44px; height: 44px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.3s ease;
        }
        .wyp-card:hover .wyp-icon { transform: scale(1.10) rotate(-4deg); }
        .wyp-card-text { flex: 1; min-width: 0; }
        .wyp-card-title {
          font-size: 14px; font-weight: 700; color: #ffffff;
          line-height: 1.3; margin-bottom: 2px; font-family: 'DM Sans', sans-serif;
        }
        .wyp-card-body {
          font-size: 13px; line-height: 1.7;
          color: rgba(255,255,255,0.50);
          font-family: 'DM Sans', sans-serif; font-weight: 400; margin: 0;
        }

        /* ── CTAs ── */
        .wyp-cta {
          display: flex; gap: 12px; flex-wrap: wrap; margin-top: 32px;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s;
        }
        .wyp-cta.is-visible { opacity: 1; transform: translateY(0); }

        .wyp-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 100px;
          font-size: 13px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; font-family: 'DM Sans', sans-serif;
          text-decoration: none; cursor: pointer;
          transition: all 0.25s ease;
          border: 2px solid #f5c842;
          text-align: center;
        }
        .wyp-btn-label {
          display: flex; flex-direction: column; align-items: center; gap: 2px;
        }
        .wyp-btn-sub {
          font-size: 10px; font-weight: 500; letter-spacing: 0.3px;
          text-transform: none; opacity: 0.80; line-height: 1;
        }
        .wyp-btn-primary {
          background: #f5c842; color: #011638;
          box-shadow: 0 8px 24px rgba(245,200,66,0.28);
        }
        .wyp-btn-primary:hover { background: #ffe066; transform: scale(1.04); }
        .wyp-btn-outline { background: transparent; color: #f5c842; }
        .wyp-btn-outline:hover { background: rgba(245,200,66,0.10); transform: scale(1.04); }

        /* ══════════════════════════════════════════
           IMAGE WRAP — desktop
           overflow:hidden clips img to border-radius
           position:relative anchors floating overlays
        ══════════════════════════════════════════ */
        .wyp-image-outer{
          position: relative; width: 100%; padding-top: 100%; /* 1:1 aspect ratio */
        }
        .wyp-image-wrap {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          border-radius: 20px;
          overflow: hidden;
          aspect-ratio: 5 / 5;
          opacity: 0; transform: translateX(28px);
          transition: opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.34,1.20,0.64,1) 0.1s;
          box-shadow: 0 32px 80px rgba(1,22,56,0.55), 0 4px 16px rgba(1,22,56,0.30);
        }
        .wyp-image-wrap.is-visible { opacity: 1; transform: translateX(0); }
        .wyp-image-wrap img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.6s ease;
        }
        .wyp-image-wrap:hover img { transform: scale(1.04); }
        .wyp-image-wrap::after {
          content: ''; position: absolute; inset: 0;
          box-shadow: inset 0 0 0 2px rgba(245,200,66,0.20);
          border-radius: 20px; z-index: 2; pointer-events: none;
        }

        /* ── Floating cards — desktop only ── */
        .wyp-stat-card {
          position: absolute; bottom: 24px; left: -28px; z-index: 3;
          background: #f5c842; border-radius: 14px; padding: 16px 22px;
          box-shadow: 0 16px 48px rgba(1,22,56,0.40); min-width: 170px;
        }
        .wyp-stat-num {
          font-size: 28px; font-weight: 800; color: #011638;
          letter-spacing: -1px; font-family: 'DM Sans', sans-serif; line-height: 1;
        }
        .wyp-stat-label {
          font-size: 11px; font-weight: 600; color: rgba(1,22,56,0.65);
          letter-spacing: 0.5px; margin-top: 4px; font-family: 'DM Sans', sans-serif;
        }
        .wyp-pill-card {
          position: absolute; top: 24px; right: -20px; z-index: 3;
          background: #011638; border: 1.5px solid rgba(245,200,66,0.40);
          border-radius: 100px; padding: 8px 18px;
          display: flex; align-items: center; gap: 8px;
          box-shadow: 0 8px 28px rgba(1,22,56,0.50);
        }
        .wyp-pill-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #34d399;
          box-shadow: 0 0 0 3px rgba(52,211,153,0.22); flex-shrink: 0;
        }
        .wyp-pill-text {
          font-size: 12px; font-weight: 700; color: #ffffff;
          letter-spacing: 0.3px; font-family: 'DM Sans', sans-serif; white-space: nowrap;
        }

        /* Placeholder */
        .wyp-img-placeholder {
          width: 100%; height: 100%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 12px;
          background: linear-gradient(135deg, #0a2347 0%, #011638 100%);
        }
        .wyp-img-placeholder span {
          font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
          color: rgba(255,255,255,0.18); font-family: 'DM Sans', sans-serif;
        }

        /* ══════════════════════════════════════════
           MOBILE STAT STRIP
           Replaces floating cards on mobile — hidden on desktop
        ══════════════════════════════════════════ */
        .wyp-stat-strip {
          display: none; /* shown on mobile */
          margin-top: 14px;
          border-radius: 12px; overflow: hidden;
          border: 1px solid rgba(245,200,66,0.18);
        }
        .wyp-stat-strip-inner { display: flex; }
        .wyp-strip-item {
          flex: 1; padding: 14px 10px;
          background: rgba(255,255,255,0.04);
          text-align: center;
          border-right: 1px solid rgba(245,200,66,0.12);
        }
        .wyp-strip-item:last-child { border-right: none; }
        .wyp-strip-num {
          font-size: 20px; font-weight: 800; color: #f5c842;
          letter-spacing: -0.5px; font-family: 'DM Sans', sans-serif; line-height: 1;
        }
        .wyp-strip-label {
          font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.42);
          letter-spacing: 0.2px; margin-top: 4px; font-family: 'DM Sans', sans-serif;
        }

        /* ══════════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════════ */
        @media (max-width: 900px) {
          .wyp-section  { padding: 64px clamp(18px, 5vw, 40px) 72px; }
          .wyp-inner    { grid-template-columns: 1fr; gap: 28px; }

          /* Text on top */
          .wyp-left     { order: 1; }
          /* Image column on bottom */
          .wyp-right-col { order: 2; }

          /* Image: landscape ratio, clean clip */
          .wyp-image-wrap {
            aspect-ratio: 16 / 9;
            border-radius: 16px;
            /* Reset to vertical enter animation */
            transform: translateY(20px);
            /* overflow:hidden already set — keeps clip, blocks floating card overflow */
          }
          .wyp-image-wrap.is-visible { transform: translateY(0); }

          /* Floating overlays overflow the container edge on mobile — hide them */
          .wyp-stat-card { display: none !important; }
          .wyp-pill-card { display: none !important; }

          /* Show strip instead */
          .wyp-stat-strip { display: block; }
        }

        @media (max-width: 540px) {
          .wyp-section   { padding: 52px 18px 60px; }
          .wyp-image-wrap { aspect-ratio: 4 / 3; border-radius: 14px; }
          .wyp-cta       { flex-direction: column; }
          .wyp-btn       { justify-content: center; width: 100%; }
          .wyp-card      { padding: 14px 16px; gap: 12px; }
          .wyp-icon      { width: 38px; height: 38px; }
          .wyp-card-title { font-size: 14px; }
        }

        @media (max-width: 380px) {
          .wyp-section    { padding: 44px 16px 52px; }
          .wyp-image-wrap { aspect-ratio: 4 / 3; }
          .wyp-card-body  { font-size: 12.5px; }
          .wyp-strip-num  { font-size: 17px; }
        }
      `}</style>

      {showModal && <EnquiryModal onClose={() => setShowModal(false)} brochureHref={brochureHref} submitAction={submitAction} />}

      <section className="wyp-section" ref={sectionRef}>
        <div className="wyp-inner">

          {/* ── LEFT / TOP: text ── */}
          <div className="wyp-left">
            <div className="wyp-header">
              <div className="wyp-eyebrow">
                <span style={{ display:"inline-block", width:24, height:2, background:"#f5c842", flexShrink:0 }} />
                Sharkathon Season 2
                <span style={{ display:"inline-block", width:24, height:2, background:"#f5c842", flexShrink:0 }} />
              </div>
              <h2 className="wyp-title">
                Why Should <em>You</em><br />Participate?
              </h2>
              <div className="wyp-rule" />
            </div>

            <div className="wyp-cards">
              {BENEFITS.map((b) => (
                <div className="wyp-card" key={b.id}>
                  <div className="wyp-card-accent" style={{ background: b.accent }} />
                  <div className="wyp-icon" style={{ background:`${b.accent}18`, border:`1.5px solid ${b.accent}40`, color:b.accent }}>
                    {b.icon}
                  </div>
                  <div className="wyp-card-text">
                    <p className="wyp-card-title">{b.title}</p>
                    <p className="wyp-card-body">{b.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="wyp-cta">
              <a href={applyHref} className="wyp-btn wyp-btn-primary">Register Now <ArrowIcon /></a>
              <button className="wyp-btn wyp-btn-outline" onClick={() => setShowModal(true)} type="button">
                Enquire Now <ArrowIcon />
              </button>
            </div>
          </div>

          {/* ── RIGHT / BOTTOM: image + floating overlays (desktop) / stat strip (mobile) ── */}
          <div className="wyp-right-col">
            <div className="wyp-image-outer">
              <div className="wyp-image-wrap">
                {imageSrc ? (
                    <Image src={imageSrc} alt="Students participating in Sharkathon" fill style={{ objectFit: "cover" }} loading="lazy" sizes="(max-width: 860px) 100vw, 45vw" />
                ) : (
                    <div className="wyp-img-placeholder">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(245,200,66,0.25)" strokeWidth="1.2" strokeLinecap="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span>Add imageSrc prop</span>
                    </div>
                )}
              </div>
              

              {/* Desktop-only overlays — CSS hides on mobile */}
              
              <div className="wyp-pill-card">
                <div className="wyp-pill-dot" />
                <span className="wyp-pill-text">Applications Open</span>
              </div>
            </div>

            {/* Mobile-only stat strip — CSS hides on desktop */}
            <div className="wyp-stat-strip">
              <div className="wyp-stat-strip-inner">
                <div className="wyp-strip-item">
                  <div className="wyp-strip-num">3</div>
                  <div className="wyp-strip-label">Rounds</div>
                </div>
                <div className="wyp-strip-item">
                  <div className="wyp-strip-num">20+</div>
                  <div className="wyp-strip-label">Schools</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
} 