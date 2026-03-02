"use client";

export default function SchoolMarquee() {
  const schoolLogos = [
    { src: "/schools/theheritageschool-removebg-preview.png",    alt: "The Heritage School" },
    { src: "/schools/amityinternational-removebg-preview.png",       alt: "Amity International School" },
    { src: "/schools/thedoonschool-removebg-preview.png",        alt: "The Doon School" },
    { src: "/schools/greenwoodhigh-removebg-preview.png",   alt: "Greenwood International" },
    { src: "/schools/oakridge.png",    alt: "Oakridge International School" },
    { src: "/schools/images-removebg-preview.png",     alt: "St. Theresa's Convent School, Karnal" }, //Not Povided
    { src: "/schools/kunskapsskolan-removebg-preview.png",          alt: "Kunskapsskolan Gurgaon" },
    { src: "/schools/images__1_-removebg-preview.png",   alt: "Mary Matha CMI Public School" }, //Not Provided
    { src: "/schools/THEMANTHANSCHOOL-removebg-preview.png",     alt: "The Manthan School" }, //Not Provided
    { src: "/schools/dpskolarroad-removebg-preview.png",    alt: "DPS Kolar Road" },
    { src: "/schools/vidyashilpacadamy-removebg-preview.png",  alt: "Vidyashilp Academy" },
    { src: "/schools/eklavya.png",     alt: "Eklavya School" }, //Not Provided
    { src: "/schools/nirma-removebg-preview.png",       alt: "Nirma Vidyavihar" }, //Not Provided
    { src: "/schools/nmims-removebg-preview.png",      alt: "Narsee Monjee College of Commerce" }, //Not Provided
    { src: "/schools/abhinavschool-removebg-preview.png",     alt: "Abhinav School" }, //Not Provided
    { src: "/schools/EMERALD-removebg-preview.png",     alt: "Emerald International" },
    { src: "/schools/cpe.png",         alt: "CPE Academy" }, //Not Provided
    { src: "/schools/centrepointschool-removebg-preview.png",         alt: "Centre Point School" }, //Not Provided
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
          height: 96px;
          padding: 0 clamp(24px, 3.5vw, 52px);
          /* subtle vertical separator */
          border-right: 1px solid rgba(1,22,56,0.07);
          transition: transform 0.25s ease;
          cursor: default;
        }
        .sm-logo:last-child { border-right: none; }
        .sm-logo:hover { transform: scale(1.10); }

        .sm-logo img {
          height: 84px;
          width: auto;
          max-width: 130px;
          object-fit: contain;
          display: block;
          transition: filter 0.30s ease;
        }
        .sm-logo:hover img {
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
            Trusted by <em>students of top schools</em>
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

      </section>
    </>
  );
}