"use client";

interface VCContactProps {
  email?: string;
  mobile?: string;
  imageSrc?: string;
}

export default function VCFellowshipContact({
  email = "team@veriseekeducation.com",
  mobile = "+91 9953371191",
  imageSrc,
}: VCContactProps) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .vc-contact-section {
          background: #011638;
          padding: 40px clamp(20px, 8vw, 120px);
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: clamp(20px, 4vw, 48px);
          align-items: start;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Radial glow */
        .vc-contact-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 80% at 10% 50%, rgba(30,90,200,0.18) 0%, transparent 65%),
            radial-gradient(ellipse 50% 60% at 90% 50%, rgba(245,200,66,0.06) 0%, transparent 60%);
          pointer-events: none;
        }

        /* Card — natural height, no stretch */
        .vc-contact-card {
          background: rgba(255,255,255,0.97);
          border-radius: 16px;
          padding: 32px 36px;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
        }

        .vc-contact-heading {
          font-size: clamp(20px, 2.2vw, 28px);
          font-weight: 700;
          color: #0a0a0a;
          line-height: 1.2;
          margin-bottom: 20px;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: -0.4px;
          white-space: nowrap;
        }

        .vc-contact-divider {
          width: 100%;
          height: 1px;
          background: rgba(0,0,0,0.08);
          margin-bottom: 20px;
        }

        /* Side-by-side contact items */
        .vc-contact-details {
          display: flex;
          flex-direction: row;
          gap: 24px;
          align-items: center;
        }

        .vc-contact-item {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
          flex: 1;
        }

        /* Yellow circle icon — matches Sharkathon's yellow icon circles */
        .vc-contact-icon-wrap {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #f5c842;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #011638;
          box-shadow: 0 2px 8px rgba(245,200,66,0.30);
        }

        .vc-contact-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(0,0,0,0.38);
          margin-bottom: 3px;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
        }

        /* Value — nowrap so email & phone never break */
        .vc-contact-value {
          font-size: 15px;
          font-weight: 700;
          color: #011638;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          transition: color 0.2s;
          white-space: normal;
          letter-spacing: -0.2px;
        }
        .vc-contact-value:hover {
          color: #1a4fa0;
          text-decoration: underline;
        }

        /* Image — same height as card by matching grid row */
        .vc-contact-image {
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          z-index: 1;
          align-self: stretch;
          height: 180px;
        }

        .vc-contact-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .vc-contact-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
        }

        .vc-contact-placeholder span {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.20);
          font-family: 'DM Sans', sans-serif;
        }

        @media (max-width: 700px) {
          .vc-contact-section { grid-template-columns: 1fr !important; }
          .vc-contact-image { min-height: 220px !important; }
          .vc-contact-card { padding: 32px 24px !important; }
          .vc-contact-details { flex-direction: column !important; gap: 16px !important; }
          .vc-contact-value { white-space: normal !important; word-break: break-all; }
        }
      `}</style>

      <section className="vc-contact-section">

        {/* Left — contact card */}
        <div className="vc-contact-card">
          <h2 className="vc-contact-heading">
            Reach out to the{" "}
            <em style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 400 }}>
              Support Team
            </em>
          </h2>

          <div className="vc-contact-divider" />

          <div className="vc-contact-details">

            {/* Email */}
            <div className="vc-contact-item">
              <div className="vc-contact-icon-wrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div style={{ minWidth: 0}}>
                <p className="vc-contact-label">Email ID</p>
                <a href={`mailto:${email}`} className="vc-contact-value">{email}</a>
              </div>
            </div>

            {/* Vertical divider */}
            <div style={{ width: 1, alignSelf: "stretch", background: "rgba(0,0,0,0.10)", flexShrink: 0 }} />

            {/* Mobile */}
            <div className="vc-contact-item">
              <div className="vc-contact-icon-wrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div style={{ minWidth: 0, overflow: "hidden" }}>
                <p className="vc-contact-label">Mobile No.</p>
                <a href={`tel:${mobile.replace(/\s/g, "")}`} className="vc-contact-value">{mobile}</a>
              </div>
            </div>

          </div>
        </div>

        {/* Right — image fills full row height */}
        <div className="vc-contact-image">
          {imageSrc ? (
            <img src={imageSrc} alt="VC Fellowship team" />
          ) : (
            <div className="vc-contact-placeholder">
              <div style={{ width: 48, height: 3, background: "#f5c842", borderRadius: 99, opacity: 0.30 }} />
              <span>Add imageSrc prop</span>
            </div>
          )}
        </div>

      </section>
    </>
  );
}