"use client";

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

interface VCPricingProps {
  fee?: string;
  dates?: string;
  venue?: string;
  applyHref?: string;
  onApply?: () => void;
}

export default function VCFellowshipPricing({
  fee       = "INR 15,000",
  dates     = "15–16 March 2026",
  venue     = "Shiv Nadar University, Greater Noida",
  applyHref = "https://rzp.io/rzp/IfWaHBUQ",
  onApply   = () => { window.location.href = "https://rzp.io/rzp/IfWaHBUQ"; },
}: VCPricingProps) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .vcp-section {
          background: #f5c842;
          padding: 80px clamp(20px, 8vw, 120px);
          font-family: 'DM Sans', sans-serif;
        }

        .vcp-header {
          text-align: center;
          margin-bottom: 52px;
        }
        .vcp-title {
          font-size: clamp(26px, 3.5vw, 38px);
          font-weight: 700;
          color: #011638;
          letter-spacing: -0.5px;
          line-height: 1.2;
          font-family: 'DM Sans', sans-serif;
        }
        .vcp-rule {
          width: 96px; height: 4px;
          background: #011638;
          border-radius: 99px;
          margin: 14px auto 0;
          opacity: 0.20;
        }

        /* 2fr:3fr — left gets less room to suit its single bullet */
        .vcp-block {
          display: grid;
          grid-template-columns: 2fr 3fr;
          margin: 0 auto;
          max-width: 960px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(1,22,56,0.28);
        }

        .vcp-left {
          background: #eef0f2;
          padding: 44px 36px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .vcp-left-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #011638;
          opacity: 0.55;
          margin-bottom: 24px;
        }

        .vcp-bullet {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          font-size: 14px;
          line-height: 1.65;
          color: #011638;
        }
        .vcp-bullet strong { color: #011638; font-weight: 700; }

        .vcp-plus {
          flex-shrink: 0;
          width: 26px; height: 26px;
          border-radius: 50%;
          background: #f5c842;
          color: #011638;
          font-size: 18px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          margin-top: 1px;
        }

        .vcp-right {
          background: #011638;
          padding: 44px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .vcp-right::after {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 200px; height: 200px;
          background: rgba(245,200,66,0.06);
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }

        .vcp-fee-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #f5c842;
          margin-bottom: 12px;
          position: relative;
          z-index: 1;
        }

        .vcp-fee-row {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 28px;
          position: relative;
          z-index: 1;
        }
        .vcp-fee-amount {
          font-size: clamp(36px, 5vw, 44px);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -2px;
          line-height: 1;
          font-family: 'DM Sans', sans-serif;
        }
        .vcp-fee-gst {
          font-size: 16px;
          font-weight: 600;
          color: rgba(255,255,255,0.40);
          letter-spacing: 1px;
          align-self: flex-end;
          margin-bottom: 4px;
        }

        .vcp-divider {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.08);
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }

        .vcp-meta {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
        }
        .vcp-meta-row {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 15px;
          font-weight: 500;
          color: rgba(255,255,255,0.88);
        }
        .vcp-meta-icon {
          flex-shrink: 0;
          color: #f5c842;
          opacity: 0.80;
        }

        .vcp-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 16px 28px;
          border-radius: 100px;
          background: #f5c842;
          color: #011638;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          cursor: pointer;
          border: 2px solid #f5c842;
          transition: all 0.25s ease;
          box-shadow: 0 4px 20px rgba(245,200,66,0.25);
          position: relative;
          z-index: 1;
        }
        .vcp-btn:hover {
          background: transparent;
          color: #f5c842;
          box-shadow: none;
        }

        @media (max-width: 700px) {
          .vcp-block { grid-template-columns: 1fr; }
          .vcp-left, .vcp-right { padding: 32px 24px; }
        }
      `}</style>

      <section className="vcp-section">
        <div className="vcp-header">
          <h2 className="vcp-title">
            Programme{" "}
            <em style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 400 }}>
              Pricing & Details
            </em>
          </h2>
          <div className="vcp-rule" />
        </div>

        <div className="vcp-block">

          {/* LEFT */}
          <div className="vcp-left">
            <p className="vcp-left-label">What's Included</p>
            <div className="vcp-bullet">
              <span className="vcp-plus">+</span>
              <span>Students will be required to be on campus from <strong>9:00 AM to 6:00 PM</strong> on both days</span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="vcp-right">
            <p className="vcp-fee-label">Programme Fee</p>
            <div className="vcp-fee-row">
              <span className="vcp-fee-amount">{fee}</span>
              <span className="vcp-fee-gst">+ GST</span>
            </div>
            <div className="vcp-divider" />
            <div className="vcp-meta">
              <div className="vcp-meta-row">
                <span className="vcp-meta-icon"><CalendarIcon /></span>
                {dates}
              </div>
              <div className="vcp-meta-row">
                <span className="vcp-meta-icon"><PinIcon /></span>
                {venue}
              </div>
            </div>
            <a href={applyHref} onClick={onApply} className="vcp-btn">
              Apply Now <ArrowIcon />
            </a>
          </div>

        </div>
      </section>
    </>
  );
}