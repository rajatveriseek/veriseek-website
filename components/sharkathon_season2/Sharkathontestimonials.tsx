"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { submitSharkathonEnquiry } from "@/app/actions/registration";
import Image from "next/image";


// ─── Types ─────────────────────────────────────────────────────────────────────

interface Testimonial {
  name: string;
  role: string;
  school?: string;
  logoSrc?: string;
  logoAlt?: string;
  imageSrc?: string;
  quote: string;
  italic?: string; // e.g. "The Participants"
}

interface TabGroup {
  tab: string;
  label: string; // "Hear from The Participants"
  items: Testimonial[];
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const TABS: TabGroup[] = [
  {
    tab: "participants",
    label: "Hear from",
    items: [
      
      // ── Participants ──
      {
        name: "Anushka Mittal",
        role: "Participant, Sharkathon 2025",
        school: "The Heritage School",
        logoSrc: "/schools/theheritageschool-removebg-preview.png",
        logoAlt: "The Heritage School",
        imageSrc: "/mittal.jpeg",
        quote:
          "The programme was really insightful and gave me exposure to a different way of thinking and questioning which is never taught in school. For the first time I understood how pausing and questioning everything to clarify problems and statement is super important for better decision making. Would love to be a part of it again.",
        italic: "The Participants",
      },
      {
        name: "Saanvi Aggarwal",
        role: "Student, Sharkathon 2025 Participant",
        school: "Kunskapskolan, Gurugram",
        logoSrc: "/schools/kunskapsskolan-removebg-preview.png",
        logoAlt: "Kunskapskolan",
        imageSrc: "/agarwal.jpeg",
        quote:
          "Becoming one of the sharks at this platform turned the business world from theory into reality. The unique and intriguing role reversal of judging and investing in an idea instead of pitching one changed how I analyse the opportunities around me.",
        italic: "The Participants",
      },
      {
        name: "Advik",
        role: "Student, Sharkathon 2025 Participant",
        school: "Kunskapskolan, Gurugram",
        logoSrc: "/schools/kunskapsskolan-removebg-preview.png",
        logoAlt: "Kunskapskolan",
        imageSrc: "/images/advik.jpeg",
        quote:
          "Sharkathon was fun, interesting, and full of learning. I blanked out once, but I pushed through by going back to the data, spotting a pattern, and applying that approach in later rounds. Biggest takeaway: don\u2019t just look for patterns, look for what breaks the pattern, because that\u2019s what you need to fix.",
        italic: "The Participants",
      },
      {
        name: "Rumi Iyengar",
        role: "Student, Sharkathon 2025 Participant",
        school: "Greenwood International School, Bengaluru",
        logoSrc: "/schools/greenwoodhigh-removebg-preview.png",
        logoAlt: "Greenwood International",
        imageSrc: "/images/rumi.jpeg",
        quote:
          "I flew from Bengaluru because Sharkathon\u2019s format is genuinely unique, you\u2019re not pitching, you\u2019re evaluating. It starts out intimidating, but once you get into the groove, it becomes a really memorable experience. My biggest learning was a new kind of data analysis: not just having data, but knowing what actually matters, and being able to set the right questions.",
        italic: "The Participants",
      },
      
      // ── Parents ──
      {
        name: "Avik Banerjee",
        role: "Parent, Sharkathon 2025 Participant",
        school: "Kunskapskolan, Gurugram",
        logoSrc: "/schools/kunskapsskolan-removebg-preview.png",
        logoAlt: "Kunskapskolan",
        imageSrc: "/images/avik.jpeg",
        quote:
          "Sharkathon gave my son real-world exposure that traditional education rarely offers. I was especially proud to see him confidently wrap up and package his thoughts, something I had not seen before. As a parent, the experience was simply fantastic.",
        italic: "The Parents",
      },
      {
        name: "Usha Narayan",
        role: "Parent, Sharkathon 2025 Participant",
        school: "Greenwood International School",
        logoSrc: "/schools/greenwoodhigh-removebg-preview.png",
        logoAlt: "Greenwood International",
        imageSrc: "/Iyengar.jpeg",
        quote:
          "Sharkathon 2025 was organised well and supported children on their learning journeys. It was an engaging and unique format different from the typical olympiads, based on real life cases and helps children spot value in business opportunities. I will really recommend everyone doing it.",
        italic: "The Parents",
      },
      // ── Counsellors ──
      {
        name: "Ekta Batra",
        role: "Educator, Amity International School, Pushp Vihar",
        school: "Amity International School, Pushp Vihar",
        logoSrc: "/schools/amityinternational-removebg-preview.png",
        logoAlt: "Amity International School",
        imageSrc: "/images/ekta.jpeg",
        quote:
          "Students were genuinely excited to pitch, and you could see future business leaders taking shape. Even middle-school and PCM/Humanities confidently understood business terminology and could easily answer the counter question of judges. The way they handled questioning and decision-making was truly impressive.",
        italic: "The Counsellors",
      },
      {
        name: "Jagriti",
        role: "PGT Economics, Amity International School, Gurugram",
        school: "Amity International School, Gurugram",
        logoSrc: "/schools/amityinternational-removebg-preview.png",
        logoAlt: "Amity International School",
        imageSrc: "/images/Jagriti.jpeg",
        quote:
          "Before Sharkathon, students were largely limited to bookish learning. Through the programme, they built sharp analytical thinking and real business frameworks. Their confidence in questioning and decision-making was genuinely surprising, an overall, comprehensive exposure.",
        italic: "The Counsellors",
      },
    ],
  },
  {
    tab: "parents",
    label: "Hear from",
    items: [
      {
        name: "Avik Banerjee",
        role: "Parent, Sharkathon 2025 Participant",
        school: "Kunskapskolan, Gurugram",
        logoSrc: "/schools/kunskapsskolan-removebg-preview.png",
        logoAlt: "Kunskapskolan",
        imageSrc: "",
        quote:
          "Sharkathon gave my son real-world exposure that traditional education rarely offers. I was especially proud to see him confidently wrap up and package his thoughts, something I had not seen before. As a parent, the experience was simply fantastic.",
        italic: "The Parents",
      },
      {
        name: "Usha Iyengar",
        role: "Parent, Sharkathon 2025 Participant",
        school: "Greenwood International School",
        logoSrc: "/schools/greenwoodhigh-removebg-preview.png",
        logoAlt: "Greenwood International",
        imageSrc: "/Iyengar.jpeg",
        quote:
          "Sharkathon 2025 was organised well and supported children on their learning journeys. It was an engaging and unique format different from the typical olympiads, based on real life cases and helps children spot value in business opportunities. I will really recommend everyone doing it.",
        italic: "The Parents",
      },
    ],
  },
  {
    tab: "counsellors",
    label: "Hear from",
    items: [
      {
        name: "Ekta Batra",
        role: "Educator, Amity International School, Pushp Vihar",
        school: "Amity International School, Pushp Vihar",
        logoSrc: "",
        logoAlt: "Amity International School",
        imageSrc: "",
        quote:
          "Students were genuinely excited to pitch, and you could see future business leaders taking shape. Even middle-school and PCM/Humanities confidently understood business terminology and could easily answer the counter question of judges. The way they handled questioning and decision-making was truly impressive.",
        italic: "The Counsellors",
      },
      {
        name: "Jagriti",
        role: "PGT Economics, Amity International School, Gurugram",
        school: "Amity International School, Gurugram",
        logoSrc: "",
        logoAlt: "Amity International School",
        imageSrc: "",
        quote:
          "Before Sharkathon, students were largely limited to bookish learning. Through the programme, they built sharp analytical thinking and real business frameworks. Their confidence in questioning and decision-making was genuinely surprising, an overall, comprehensive exposure.",
        italic: "The Counsellors",
      },
    ],
  },
];

// ─── Icons ─────────────────────────────────────────────────────────────────────

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
function QuoteIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="rgba(245,200,66,0.25)" aria-hidden="true">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  );
}

// ─── Enquiry Modal ─────────────────────────────────────────────────────────────

function EnquiryModal({ onClose }: { onClose: () => void }) {
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
      const result = await submitSharkathonEnquiry(form);
      setStatus(result.success ? "success" : "error");
    } catch { setStatus("error"); }
  };

  return (
    <div className="enq-overlay" ref={overlayRef} onClick={handleOverlay}>
      <div className="enq-card" role="dialog" aria-modal="true">
        <button className="enq-close" onClick={onClose}><CloseIcon /></button>

        {status === "success" ? (
          <div className="enq-success">
            <CheckIcon />
            <p className="enq-success-title">We've received your enquiry!</p>
            <p className="enq-success-body">Our team will reach out to you shortly.</p>
            <button className="enq-submit" style={{ maxWidth: 160, marginTop: 20 }} onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <h2 className="enq-heading">Enquire about Sharkathon</h2>
            <p className="enq-sub">Fill in your details and we'll get back to you.</p>
            <form onSubmit={handleSubmit} noValidate>
              {[
                { id: "name",   label: "Full Name",  type: "text",  placeholder: "e.g. Arjun Sharma" },
                { id: "phone",  label: "Phone No.",  type: "tel",   placeholder: "e.g. +91 98765 43210" },
                { id: "school", label: "School",     type: "text",  placeholder: "e.g. DPS RK Puram" },
                { id: "email",  label: "Email",      type: "email", placeholder: "e.g. arjun@email.com" },
              ].map(({ id, label, type, placeholder }) => (
                <div className="enq-field" key={id}>
                  <label className="enq-label" htmlFor={`enq-${id}`}>{label}</label>
                  <input
                    id={`enq-${id}`} name={id} type={type}
                    className="enq-input" placeholder={placeholder}
                    value={(form as any)[id]} onChange={handleChange} required
                  />
                </div>
              ))}
              <button className="enq-submit" type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending…" : <><span>Submit Enquiry</span> <ArrowIcon /></>}
              </button>
              {status === "error" && <p className="enq-error">Something went wrong. Please try again.</p>}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Avatar placeholder ────────────────────────────────────────────────────────

function Avatar({ src, name }: { src?: string; name: string }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  if (src) {
    return <Image src={src} alt={name} className="tm-avatar-img" width={400} height={400} loading="lazy" />;
  }
  return (
    <div className="tm-avatar-placeholder">
      <span className="tm-avatar-initials">{initials}</span>
    </div>
  );
}

// ─── Testimonial card ──────────────────────────────────────────────────────────

function TestimonialCard({
  item, index, total, tabLabel, tabItalic,
}: {
  item: Testimonial;
  index: number;
  total: number;
  tabLabel: string;
  tabItalic: string;
}) {
  return (
    <div className="tm-card">
      {/* Card header */}
      <div className="tm-card-header">
        <h3 className="tm-card-heading">
          {tabLabel}{" "}
          <em className="tm-card-heading-italic">{tabItalic}</em>
        </h3>
      </div>

      {/* Card body — image left, content right */}
      <div className="tm-card-body">

        {/* Left: photo */}
        <div className="tm-card-photo-wrap">
          <Avatar src={item.imageSrc} name={item.name} />
        </div>

        {/* Right: content */}
        <div className="tm-card-content">
          {/* Name + school row */}
          <div className="tm-card-top">
            <div>
              <p className="tm-name">{item.name}</p>
              <p className="tm-role">{item.role}</p>
              {item.school && <p className="tm-school">{item.school}</p>}
            </div>
            {/* School logo */}
            {item.logoSrc && (
              <div className="tm-logo-wrap">
                <Image src={item.logoSrc} alt={item.logoAlt ?? ""} className="tm-logo" width={120} height={60} loading="lazy" style={{ objectFit: "contain" }} />
              </div>
            )}
            {!item.logoSrc && item.school && (
              <div className="tm-logo-placeholder">
                <span className="tm-logo-placeholder-text">Logo</span>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="tm-card-rule" />

          {/* Quote */}
          <div className="tm-quote-wrap">
            <div className="tm-quote-icon"><QuoteIcon /></div>
            <p className="tm-quote">"{item.quote}"</p>
          </div>

          {/* Footer: counter + nav */}
          <div className="tm-card-footer">
            <span className="tm-counter">{index + 1}/{total}</span>
            {/* Nav arrows shown here only on desktop; mobile nav shown outside card */}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────

interface SharkathonTestimonialsProps {
  tabs?: TabGroup[];
  applyHref?: string;
  brochureHref?: string;
}

export default function SharkathonTestimonials({
  tabs         = TABS,
  applyHref    = "https://pages.razorpay.com/pl_SLYleXmwGJkGqi/view",
}: SharkathonTestimonialsProps) {
  const [activeTab, setActiveTab]   = useState(0);
  const [activeIdx, setActiveIdx]   = useState(0);
  const [showModal, setShowModal]   = useState(false);
  const [animDir, setAnimDir]       = useState<"left" | "right" | null>(null);
  const sectionRef                  = useRef<HTMLElement>(null);

  const currentTab   = tabs[activeTab];
  const currentItems = currentTab.items;
  const total        = currentItems.length;

  const go = useCallback((dir: "prev" | "next") => {
    setAnimDir(dir === "next" ? "left" : "right");
    setTimeout(() => {
      setActiveIdx((i) => dir === "next" ? (i + 1) % total : (i - 1 + total) % total);
      setAnimDir(null);
    }, 220);
  }, [total]);

  // Reset index when tab changes
  const switchTab = (i: number) => {
    if (i === activeTab) return;
    setAnimDir("left");
    setTimeout(() => {
      setActiveTab(i);
      setActiveIdx(0);
      setAnimDir(null);
    }, 180);
  };

  // Scroll reveal
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const header = section.querySelector<HTMLElement>(".tm-header");
    const body   = section.querySelector<HTMLElement>(".tm-body-wrap");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    if (header) io.observe(header);
    if (body)   io.observe(body);
    return () => io.disconnect();
  }, []);

  const item = currentItems[activeTab === activeTab ? activeIdx : 0];

  return (
    <>
      <style>{`
/* ════════ SECTION ════════ */
        .tm-section {
          background: #eef0f2;
          padding: 80px clamp(16px, 8vw, 120px) 96px;
          font-family: 'DM Sans', sans-serif;
          position: relative;
        }

        /* ════════ HEADER ════════ */
        .tm-header {
          margin-bottom: 40px;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .tm-header.is-visible { opacity: 1; transform: translateY(0); }

        .tm-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: rgba(1,22,56,0.40);
          font-family: 'DM Sans', sans-serif; margin-bottom: 10px;
          display: flex; align-items: center; gap: 10px;
        }
        .tm-title {
          font-size: clamp(26px, 3.5vw, 40px); font-weight: 700;
          color: #011638; letter-spacing: -0.5px; line-height: 1.15;
          font-family: 'DM Sans', sans-serif;
        }
        .tm-rule {
          width: 96px; height: 4px;
          background: linear-gradient(to right, #60a5fa, #2563eb);
          border-radius: 99px; margin-top: 14px;
        }

        /* ════════ TAB ROW ════════ */
        .tm-tabs {
          display: flex; gap: 8px; flex-wrap: wrap;
          margin-bottom: 28px;
        }
        .tm-tab {
          padding: 9px 22px; border-radius: 100px;
          font-size: 13px; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          border: 2px solid rgba(1,22,56,0.15);
          background: transparent; color: rgba(1,22,56,0.55);
          cursor: pointer;
          transition: all 0.22s ease;
          white-space: nowrap;
        }
        .tm-tab:hover {
          border-color: rgba(1,22,56,0.35);
          color: #011638;
          background: rgba(1,22,56,0.04);
        }
        .tm-tab-active {
          background: #011638 !important;
          border-color: #011638 !important;
          color: #f5c842 !important;
        }

        /* ════════ BODY (card + nav + footer) ════════ */
        .tm-body-wrap {
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.55s ease 0.1s, transform 0.55s ease 0.1s;
        }
        .tm-body-wrap.is-visible { opacity: 1; transform: translateY(0); }

        /* ════════ CARD ════════ */
        .tm-card {
          background: #0f1b2d;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 16px 56px rgba(1,22,56,0.18), 0 2px 8px rgba(1,22,56,0.10);
          position: relative;
          /* slide animation */
          transition: opacity 0.22s ease, transform 0.22s ease;
        }
        .tm-card-anim-left  { opacity: 0; transform: translateX(-24px); }
        .tm-card-anim-right { opacity: 0; transform: translateX(24px);  }

        /* Card header strip */
        .tm-card-header {
          padding: 20px 28px 0;
        }
        .tm-card-heading {
          font-size: clamp(16px, 1.6vw, 20px); font-weight: 700;
          color: #ffffff; font-family: 'DM Sans', sans-serif;
          letter-spacing: -0.2px; margin: 0;
        }
        .tm-card-heading-italic {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic; font-weight: 400;
          color: #f5c842;
        }

        /* Card body: photo + content side by side */
        .tm-card-body {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 0;
          padding: 20px 28px 24px;
          align-items: start;
        }

        /* ── Photo ── */
        .tm-card-photo-wrap {
          width: 200px; height: 200px;
          border-radius: 14px; overflow: hidden;
          flex-shrink: 0;
          background: #1a2d4a;
          align-self: center;
        }
        .tm-avatar-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: top;
          display: block;
        }
        .tm-avatar-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #1a2d4a, #0a1a30);
        }
        .tm-avatar-initials {
          font-size: 52px; font-weight: 700; color: rgba(245,200,66,0.35);
          font-family: 'DM Sans', sans-serif; letter-spacing: -2px;
        }

        /* ── Content side ── */
        .tm-card-content {
          padding-left: 28px;
          display: flex; flex-direction: column; gap: 0;
        }

        /* Name block + logo */
        .tm-card-top {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 12px;
          margin-bottom: 14px;
        }
        .tm-name {
          font-size: clamp(15px, 1.4vw, 18px); font-weight: 700;
          color: #f5c842; font-family: 'DM Sans', sans-serif;
          letter-spacing: -0.2px; margin-bottom: 3px;
        }
        .tm-role {
          font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.55);
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 2px;
        }
        .tm-school {
          font-size: 12px; font-weight: 500;
          color: rgba(255,255,255,0.35);
          font-family: 'DM Sans', sans-serif;
        }

        /* Logo */
        .tm-logo-wrap {
          flex-shrink: 0;
          background: #ffffff;
          border-radius: 10px;
          padding: 6px 10px;
          border: 1px solid rgba(245,200,66,0.20);
        }
        .tm-logo { height: 32px; width: auto; display: block; }

        .tm-logo-placeholder {
          flex-shrink: 0;
          background: rgba(255,255,255,0.06);
          border: 1.5px dashed rgba(255,255,255,0.18);
          border-radius: 10px;
          padding: 6px 14px;
          display: flex; align-items: center; justify-content: center;
        }
        .tm-logo-placeholder-text {
          font-size: 10px; font-weight: 700;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: rgba(255,255,255,0.30);
          font-family: 'DM Sans', sans-serif;
        }

        /* Divider */
        .tm-card-rule {
          width: 100%; height: 1px;
          background: rgba(255,255,255,0.08);
          margin-bottom: 16px;
        }

        /* Quote */
        .tm-quote-wrap {
          position: relative; flex: 1;
        }
        .tm-quote-icon {
          position: absolute; top: -4px; left: -4px;
          pointer-events: none;
        }
        .tm-quote {
          font-size: clamp(13px, 1.1vw, 14px); line-height: 1.78;
          color: rgba(255,255,255,0.65);
          font-family: 'DM Sans', sans-serif; font-weight: 400;
          padding-left: 8px;
          margin: 0;
        }

        /* Card footer: counter left, nav right */
        .tm-card-footer {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-top: 20px;
        }
        .tm-counter {
          font-size: 13px; font-weight: 600;
          color: rgba(255,255,255,0.35);
          font-family: 'DM Sans', sans-serif;
        }

        /* Nav arrows */
        .tm-nav {
          display: flex; gap: 10px;
        }
        .tm-nav-btn {
          width: 38px; height: 38px; border-radius: 50%;
          border: 1.5px solid rgba(245,200,66,0.35);
          background: transparent; color: rgba(255,255,255,0.70);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.22s ease;
        }
        .tm-nav-btn:hover {
          background: rgba(245,200,66,0.12);
          border-color: #f5c842;
          color: #f5c842;
        }
        .tm-nav-btn:disabled {
          opacity: 0.25; cursor: default;
          pointer-events: none;
        }

        /* ════════ CTA ROW ════════ */
        .tm-cta-row {
          display: flex; gap: 12px; flex-wrap: wrap;
          margin-top: 28px;
          justify-content: flex-end;
        }
        .tm-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 100px;
          font-size: 13px; font-weight: 700; letter-spacing: 0.5px;
          text-transform: uppercase; font-family: 'DM Sans', sans-serif;
          text-decoration: none; cursor: pointer;
          transition: all 0.22s ease; white-space: nowrap;
          border: 2px solid #011638;
        }
        .tm-btn-primary {
          background: #011638; color: #f5c842;
          box-shadow: 0 6px 20px rgba(1,22,56,0.18);
        }
        .tm-btn-primary:hover {
          background: transparent; color: #011638; box-shadow: none;
          transform: scale(1.04);
        }
        .tm-btn-outline {
          background: transparent; color: #011638;
        }
        .tm-btn-outline:hover {
          background: rgba(1,22,56,0.06); transform: scale(1.04);
        }

        /* ════════ ENQUIRY MODAL ════════ */
        @keyframes enq-overlay-in { from { opacity:0; } to { opacity:1; } }
        @keyframes enq-card-in {
          from { opacity:0; transform:translateY(24px) scale(0.97); }
          to   { opacity:1; transform:translateY(0)    scale(1);    }
        }
        .enq-overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(1,22,56,0.72);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          animation: enq-overlay-in 0.22s ease both;
          backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
        }
        .enq-card {
          background: #ffffff; border-radius: 20px;
          padding: 36px 36px 32px; width: 100%; max-width: 460px;
          position: relative;
          box-shadow: 0 32px 80px rgba(1,22,56,0.35), 0 4px 16px rgba(1,22,56,0.15);
          animation: enq-card-in 0.32s cubic-bezier(0.34,1.4,0.64,1) both;
          font-family: 'DM Sans', sans-serif;
        }
        .enq-close {
          position: absolute; top: 16px; right: 16px;
          width: 34px; height: 34px; border-radius: 50%;
          background: #eef0f2; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #011638; transition: background 0.2s, transform 0.2s;
        }
        .enq-close:hover { background: #dde0e4; transform: scale(1.08); }
        .enq-heading {
          font-size: 22px; font-weight: 700; color: #011638;
          margin-bottom: 4px; letter-spacing: -0.3px;
          font-family: 'DM Sans', sans-serif; padding-right: 32px;
        }
        .enq-sub {
          font-size: 13px; color: rgba(1,22,56,0.50);
          margin-bottom: 24px; font-family: 'DM Sans', sans-serif;
        }
        .enq-field { margin-bottom: 14px; }
        .enq-label {
          display: block; font-size: 11px; font-weight: 700;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: rgba(1,22,56,0.45); margin-bottom: 5px;
          font-family: 'DM Sans', sans-serif;
        }
        .enq-input {
          width: 100%; padding: 11px 14px;
          border: 1.5px solid rgba(1,22,56,0.15); border-radius: 10px;
          font-size: 14px; font-weight: 500; color: #011638;
          font-family: 'DM Sans', sans-serif; background: #f8f9fb;
          transition: border-color 0.2s, box-shadow 0.2s; outline: none;
          box-sizing: border-box;
        }
        .enq-input:focus {
          border-color: #f5c842;
          box-shadow: 0 0 0 3px rgba(245,200,66,0.18); background: #ffffff;
        }
        .enq-input::placeholder { color: rgba(1,22,56,0.25); }
        .enq-submit {
          width: 100%; margin-top: 6px; padding: 14px 28px;
          border-radius: 100px; background: #011638; color: #f5c842;
          font-size: 13px; font-weight: 700; letter-spacing: 1.2px;
          text-transform: uppercase; font-family: 'DM Sans', sans-serif;
          border: 2px solid #011638; cursor: pointer;
          transition: all 0.25s ease;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .enq-submit:hover:not(:disabled) { background: transparent; color: #011638; }
        .enq-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .enq-success {
          display: flex; flex-direction: column;
          align-items: center; text-align: center; gap: 10px; padding: 16px 0 8px;
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
          margin-top: 8px; font-size: 13px; color: #c0392b;
          font-family: 'DM Sans', sans-serif; text-align: center;
        }

        /* ════════ RESPONSIVE ════════ */
        @media (max-width: 720px) {
          .tm-card-body {
            grid-template-columns: 1fr;
          }
          .tm-card-photo-wrap {
            width: 100%; height: 200px;
            border-radius: 12px;
            margin-bottom: 0;
          }
          .tm-card-content {
            padding-left: 0;
            padding-top: 18px;
          }
          .tm-cta-row { justify-content: stretch; }
          .tm-btn { flex: 1; justify-content: center; }
        }

        @media (max-width: 480px) {
          .tm-section { padding: 56px 16px 72px; }
          .tm-tabs { gap: 6px; }
          .tm-tab { padding: 7px 14px; font-size: 12px; }
          .tm-card-header { padding: 16px 18px 0; }
          .tm-card-body { padding: 16px 18px 20px; }
          .tm-card-content { padding-top: 14px; }
          .tm-cta-row { flex-direction: column; }
          .tm-btn { width: 100%; }
          .enq-card { padding: 24px 18px 20px; }
          .enq-heading { font-size: 18px; }
        }
      `}</style>

      {showModal && <EnquiryModal onClose={() => setShowModal(false)} />}

      <section className="tm-section" ref={sectionRef}>

        {/* ── Header ── */}
        <div className="tm-header">
          <p className="tm-eyebrow">
            <span style={{ display:"inline-block", width:24, height:2, background:"#011638", opacity:0.30 }} />
            Sharkathon Season 2
            <span style={{ display:"inline-block", width:24, height:2, background:"#011638", opacity:0.30 }} />
          </p>
          <h2 className="tm-title">
            Reviews of {" "}
            <em style={{ fontFamily:"'Playfair Display',Georgia,serif", fontStyle:"italic", fontWeight:400 }}>
              Sharkathon Season 1
            </em>
          </h2>
          <div className="tm-rule" />
        </div>

        <div className="tm-body-wrap">

          {/* ── Tab switcher ── */}
          {/* <div className="tm-tabs" role="tablist">
            {tabs.map((t, i) => (
              <button
                key={t.tab}
                role="tab"
                aria-selected={i === activeTab}
                className={`tm-tab ${i === activeTab ? "tm-tab-active" : ""}`}
                onClick={() => switchTab(i)}
              >
                {t.italic}
              </button>
            ))}
          </div> */}

          {/* ── Testimonial card ── */}
          <div
            className={`tm-card ${
              animDir === "left"  ? "tm-card-anim-left"  :
              animDir === "right" ? "tm-card-anim-right" : ""
            }`}
          >
            <div className="tm-card-header">
              <h3 className="tm-card-heading">
                {currentTab.label}{" "}
                <em className="tm-card-heading-italic">{item.italic}</em>
              </h3>
            </div>

            <div className="tm-card-body">
              {/* Photo */}
              <div className="tm-card-photo-wrap">
                <Avatar src={item.imageSrc} name={item.name} />
              </div>

              {/* Content */}
              <div className="tm-card-content">
                {/* Name + logo */}
                <div className="tm-card-top">
                  <div>
                    <p className="tm-name">{item.name}</p>
                    <p className="tm-role">{item.role}</p>
                    {item.school && <p className="tm-school">{item.school}</p>}
                  </div>
                  {item.logoSrc ? (
                    <div className="tm-logo-wrap">
                      <Image src={item.logoSrc} alt={item.logoAlt ?? ""} className="tm-logo" width={120} height={60} loading="lazy" style={{ objectFit: "contain" }} />
                    </div>
                  ) : item.school ? (
                    <div className="tm-logo-placeholder">
                      <span className="tm-logo-placeholder-text">Logo</span>
                    </div>
                  ) : null}
                </div>

                {/* Divider */}
                <div className="tm-card-rule" />

                {/* Quote */}
                <div className="tm-quote-wrap">
                  <p className="tm-quote">"{item.quote}"</p>
                </div>

                {/* Counter + Nav */}
                <div className="tm-card-footer">
                  <span className="tm-counter">{activeIdx + 1}/{total}</span>
                  <div className="tm-nav">
                    <button
                      className="tm-nav-btn"
                      onClick={() => go("prev")}
                      disabled={total <= 1}
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft />
                    </button>
                    <button
                      className="tm-nav-btn"
                      onClick={() => go("next")}
                      disabled={total <= 1}
                      aria-label="Next testimonial"
                    >
                      <ChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── CTAs ── */}
          <div className="tm-cta-row">
            <a href={applyHref} className="tm-btn tm-btn-primary">
              Register Now <ArrowIcon />
            </a>
            <button
              className="tm-btn tm-btn-outline"
              onClick={() => setShowModal(true)}
              type="button"
            >
              Enquire More <ArrowIcon />
            </button>
          </div>

        </div>
      </section>
    </>
  );
}