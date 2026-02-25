"use client";

export default function SchoolMarquee() {
  const schoolLogos = [
    { src: "/schools/heritage.png",    alt: "The Heritage School" },
    { src: "/schools/amity.png",       alt: "Amity International School" },
    { src: "/schools/doon.png",        alt: "The Doon School" },
    { src: "/schools/greenwood.png",   alt: "Greenwood International" },
    { src: "/schools/oakridge.png",    alt: "Oakridge International School" },
    { src: "/schools/theresa.png",     alt: "St. Theresa's Convent School, Karnal" },
    { src: "/schools/kp.png",          alt: "Kunskapsskolan Gurgaon" },
    { src: "/schools/marymatha.png",   alt: "Mary Matha CMI Public School" },
    { src: "/schools/manthan.png",     alt: "The Manthan School" },
    { src: "/schools/dpskolar.png",    alt: "DPS Kolar Road" },
    { src: "/schools/vidyashilp.png",  alt: "Vidyashilp Academy" },
    { src: "/schools/eklavya.png",     alt: "Eklavya School" },
    { src: "/schools/nirma.png",       alt: "Nirma Vidyavihar" },
    { src: "/schools/kpdlf.png",       alt: "Kunskapsskolan DLF Phase 1" },
    { src: "/schools/narsee.png",      alt: "Narsee Monjee College of Commerce" },
    { src: "/schools/abhinav.png",     alt: "Abhinav School" },
    { src: "/schools/emerald.png",     alt: "Emerald International" },
    { src: "/schools/cpe.png",         alt: "CPE Academy" },
    { src: "/schools/cps.png",         alt: "Centre Point School" },
  ];

  // Triple-duplicate so the loop is seamless at any viewport width
  const track = [...schoolLogos, ...schoolLogos, ...schoolLogos];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400&family=DM+Sans:wght@400;600;700&display=swap');

        .sm-section {
          background: #f5c842;
          padding: 56px 0 52px;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          border-top: 1px solid rgba(1,22,56,0.06);
          border-bottom: 1px solid rgba(1,22,56,0.06);
        }

        /* ── Heading ── */
        .sm-heading {
          text-align: center;
          margin-bottom: 36px;
          padding: 0 20px;
        }
        .sm-title {
          font-size: clamp(18px, 2.4vw, 26px);
          font-weight: 600;
          color: #011638;
          letter-spacing: -0.3px;
          line-height: 1.2;
          font-family: 'DM Sans', sans-serif;
        }
        .sm-title em {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-weight: 400;
        }
        .sm-rule {
          width: 64px;
          height: 3px;
          background: linear-gradient(to right, #60a5fa, #2563eb);
          border-radius: 99px;
          margin: 10px auto 0;
        }

        /* ── Marquee track ── */
        .sm-track-wrap {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        /* Fade edges */
        .sm-track-wrap::before,
        .sm-track-wrap::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: clamp(60px, 8vw, 140px);
          z-index: 2;
          pointer-events: none;
        }
        .sm-track-wrap::before {
          left: 0;
          background: linear-gradient(to right, #f5c842, transparent);
        }
        .sm-track-wrap::after {
          right: 0;
          background: linear-gradient(to left, #f5c842, transparent);
        }

        .sm-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: sm-scroll 38s linear infinite;
        }
        .sm-track:hover {
          animation-play-state: paused;
        }

        @keyframes sm-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        /* ── Individual logo cell ── */
        .sm-logo {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 72px;
          padding: 0 clamp(24px, 3.5vw, 52px);
          /* subtle vertical separator */
          border-right: 1px solid rgba(1,22,56,0.07);
          transition: transform 0.25s ease;
          cursor: default;
        }
        .sm-logo:last-child { border-right: none; }
        .sm-logo:hover { transform: scale(1.10); }

        .sm-logo img {
          height: 44px;
          width: auto;
          max-width: 130px;
          object-fit: contain;
          display: block;
          filter: grayscale(100%) opacity(0.60);
          transition: filter 0.30s ease;
        }
        .sm-logo:hover img {
          filter: grayscale(0%) opacity(1);
        }

        /* ── Footer note ── */
        .sm-footer {
          text-align: center;
          margin-top: 28px;
          padding: 0 20px;
        }
        .sm-footer p {
          font-size: 12px;
          letter-spacing: 0.5px;
          color: rgba(1,22,56,0.35);
          font-family: 'DM Sans', sans-serif;
        }
      `}</style>

      <section className="sm-section">

        {/* Heading */}
        <div className="sm-heading">
          <h2 className="sm-title">
            Trusted by <em>Top Schools</em>
          </h2>
          <div className="sm-rule" />
        </div>

        {/* Scrolling logo strip */}
        <div className="sm-track-wrap">
          <div className="sm-track">
            {track.map((school, i) => (
              <div className="sm-logo" key={i}>
                <img src={school.src} alt={school.alt} title={school.alt} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="sm-footer">
          <p>And many more schools joining every season</p>
        </div>

      </section>
    </>
  );
}