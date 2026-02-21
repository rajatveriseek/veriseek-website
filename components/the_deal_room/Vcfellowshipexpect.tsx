"use client";

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
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        /* ── Section ── */
        .vcfe-section {
          background: #eef0f2;
          padding: 60px clamp(20px, 8vw, 120px);
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }

        /* ── Header ── */
        .vcfe-header {
          text-align: left;
          margin-bottom: 20px;
          flex-shrink: 0;
        }

        .vcfe-title {
          font-size: clamp(22px, 2.8vw, 36px);
          font-weight: 700;
          color: #011638;
          letter-spacing: -0.5px;
          line-height: 1.2;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 0;
        }

        .vcfe-rule {
          width: 96px;
          height: 4px;
          background: linear-gradient(to right, #60a5fa, #2563eb);
          border-radius: 99px;
          margin: 12px 0 0;
        }

        /* ── Two-column grid ── */
        .vcfe-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 6vw, 80px);
          align-items: stretch;
          flex: 1;
        }

        /* Left col */
        .vcfe-list-col {
          display: flex;
          flex-direction: column;
        }

        /* ── Expectation items ── */
        .vcfe-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .vcfe-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          background: #011638;
          border-radius: 12px;
          padding: 12px 16px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .vcfe-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(1,22,56,0.22);
        }

        .vcfe-item::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: #f5c842;
          border-radius: 12px 0 0 12px;
        }

        .vcfe-icon {
          flex-shrink: 0;
          width: 34px;
          height: 34px;
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
          font-size: clamp(12px, 1.1vw, 15px);
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 2px;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.1px;
        }

        .vcfe-item-body {
          font-size: clamp(11px, 0.9vw, 13px);
          font-weight: 400;
          color: rgba(255,255,255,0.62);
          line-height: 1.5;
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
          border: 2px solid rgba(245,200,66,0.30);
          box-shadow: 0 20px 56px rgba(1,22,56,0.14);
          background: rgba(1,22,56,0.06);
          position: relative;
          min-height: 400px;
        }

        .vcfe-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .vcfe-img-placeholder {
          width: 100%;
          height: 100%;
          min-height: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .vcfe-img-placeholder span {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(1,22,56,0.30);
        }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .vcfe-grid {
            grid-template-columns: 1fr !important;
          }
          .vcfe-img-wrap {
            aspect-ratio: 16 / 9;
            min-height: unset;
            order: 2;
          }
          .vcfe-list-col {
            order: 1;
          }
        }
      `}</style>

      <section className="vcfe-section">

        {/* Two-column grid */}
        <div className="vcfe-grid">

          {/* Left: expectation list */}
          <div className="vcfe-list-col">

            <div className="vcfe-header">
              <h2 className="vcfe-title">
                What to Expect from{" "}
                <em style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 400 }}>
                  The Deal Room?
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
              <img src={imageSrc} alt="The Deal Room participants" />
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