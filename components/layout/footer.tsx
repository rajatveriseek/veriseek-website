import Link from "next/link"
import Image from "next/image"
import { getImageUrl } from "@/lib/image-utils"

const Footer = () => {
  return (
    <footer className="vs-footer">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .vs-footer {
          background: #011638;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Dot grid */
        .vs-footer::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(245,200,66,0.12) 1px, transparent 1px);
          background-size: 24px 24px;
          pointer-events: none;
          z-index: 0;
        }

        /* Ambient glow */
        .vs-footer::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 80% 100%, rgba(245,200,66,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 10% 0%, rgba(30,90,200,0.10) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .vs-footer-top-bar {
          width: 100%;
          height: 3px;
          background: #f5c842;
          position: relative;
          z-index: 1;
        }

        .vs-footer-inner {
          position: relative;
          z-index: 1;
          margin: 0 auto;
          padding: 56px clamp(20px, 6vw, 80px) 40px;
        }

        .vs-footer-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1.2fr;
          gap: clamp(32px, 5vw, 72px);
        }

        /* Brand description */
        .vs-footer-desc {
          font-size: 14px;
          line-height: 1.75;
          color: rgba(255,255,255,0.52);
          margin-bottom: 28px;
          max-width: 320px;
        }

        /* Instagram pill — pure CSS hover */
        .vs-footer-ig {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 100px;
          border: 1.5px solid rgba(245,200,66,0.30);
          background: rgba(245,200,66,0.06);
          color: rgba(255,255,255,0.70);
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .vs-footer-ig:hover {
          border-color: #f5c842;
          color: #f5c842;
        }

        /* Section eyebrow label */
        .vs-footer-label {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #f5c842;
          margin-bottom: 20px;
          margin-top: 0;
        }

        /* Quick links */
        .vs-footer-links {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .vs-footer-link {
          font-size: 13.5px;
          color: rgba(255,255,255,0.52);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
        }
        .vs-footer-link:hover { color: #f5c842; }

        .vs-footer-link-dot {
          display: inline-block;
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #f5c842;
          opacity: 0.5;
          flex-shrink: 0;
        }

        /* Contact list */
        .vs-footer-contact {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .vs-footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .vs-footer-icon {
          flex-shrink: 0;
          width: 32px; height: 32px;
          border-radius: 50%;
          background: #f5c842;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1px;
        }

        .vs-footer-contact-text {
          font-size: 13px;
          color: rgba(255,255,255,0.52);
          line-height: 1.65;
          text-decoration: none;
          transition: color 0.2s;
        }
        a.vs-footer-contact-text:hover { color: #f5c842; }

        /* Bottom bar */
        .vs-footer-bottom {
          margin-top: 48px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .vs-footer-copy {
          font-size: 12px;
          color: rgba(255,255,255,0.28);
          margin: 0;
        }

        .vs-footer-wordmark {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .vs-footer-wordmark-text {
          font-size: 11px;
          color: rgba(255,255,255,0.22);
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .vs-footer-rule {
          display: inline-block;
          width: 20px; height: 2px;
          background: #f5c842;
          border-radius: 99px;
          opacity: 0.5;
        }

        @media (max-width: 860px) {
          .vs-footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .vs-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="vs-footer-top-bar" />

      <div className="vs-footer-inner">
        <div className="vs-footer-grid">

          {/* ── Col 1: Brand ── */}
          <div>
            <Link href="/" style={{ display: "inline-block", marginBottom: 20 }}>
              <Image
                src={getImageUrl("logo") || "/placeholder.svg"}
                alt="Veriseek Education Logo"
                width={180}
                height={72}
                style={{ height: 48, width: "auto" }}
              />
            </Link>
            <p className="vs-footer-desc">
              Veriseek Education bridges the gap between traditional academic learning and
              real-world professional skills through innovative programs and competitions.
            </p>
            <a
              href="https://www.instagram.com/veriseekeducation?igsh=MTdjdzE1NW03bjZ0bQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="vs-footer-ig"
            >
              <Image src="/instagram-logo.png" alt="Instagram" width={14} height={14} style={{ opacity: 0.8 }} />
              veriseek_edu
            </a>
          </div>

          {/* ── Col 2: Quick Links ── */}
          <div>
            <p className="vs-footer-label">Quick Links</p>
            <ul className="vs-footer-links">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "VC Fellowship", href : "/vc_fellowship" },
                { label: "Sharkathon", href: "/sharkathon" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms & Conditions", href: "/rules" },
                { label: "Refund Policy", href: "/refund" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="vs-footer-link">
                    <span className="vs-footer-link-dot" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Contact ── */}
          <div>
            <p className="vs-footer-label">Contact Us</p>
            <ul className="vs-footer-contact">

              <li className="vs-footer-contact-item">
                <div className="vs-footer-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#011638" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span className="vs-footer-contact-text">
                  alt.f MPD Tower, 2nd Floor<br />
                  Golf Course Road, Sector 43<br />
                  Gurugram, Haryana 122002
                </span>
              </li>

              <li className="vs-footer-contact-item" style={{ alignItems: "center" }}>
                <div className="vs-footer-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#011638" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <Link href="tel:+919953371191" className="vs-footer-contact-text">
                  +91 9953371191
                </Link>
              </li>

              <li className="vs-footer-contact-item" style={{ alignItems: "center" }}>
                <div className="vs-footer-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#011638" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <Link href="mailto:team@veriseekeducation.com" className="vs-footer-contact-text">
                  team@veriseekeducation.com
                </Link>
              </li>

            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="vs-footer-bottom">
          <p className="vs-footer-copy">
            © {new Date().getFullYear()} Veriseek Education Work Pvt Ltd. All rights reserved.
          </p>
          <div className="vs-footer-wordmark">
            <span className="vs-footer-rule" />
            <span className="vs-footer-wordmark-text">Veriseek Education</span>
            <span className="vs-footer-rule" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer