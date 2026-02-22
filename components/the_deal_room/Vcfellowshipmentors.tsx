"use client";

const MENTORS = [
  {
    name: "Mr. Rajat Kumar",
    role: "Nandan Capital, Ex McKinsey and Wharton Alum",
    labels: ["Wharton", "McKinsey", "Nandan Capital", "EY"],
    tags: ["/images/wharton.png", "/images/McKinseyCompany_logo-dark.png", "/images/Nandan_Final_Logo_page-0001_12-removebg-preview.png", "/images/ey.png"],
    initials: "RK",
    subheading: "Managing Partner Nandan Capital,\nEx-McKinsey and Wharton Alum",
    image: "/images/WhatsApp_Image_2026-02-21_at_8.27.19_PM-removebg-preview.png",
    linkedin: "https://www.linkedin.com/in/rajat-kumar-004533/",
  },
  {
    name: "Mr. Mayank Kapoor",
    role: "VP, Leena AI",
    labels: ["MIT", "IIT Delhi", "Leena AI", "Apple"],
    tags: ["/images/mit2.png", "/images/iit.png", "/images/leenaai.png", "/images/apple.png"],
    initials: "MK",
    subheading: "VP Leena AI,\nAlum IIT Delhi & MIT",
    image: "/images/mayank_kapoor-removebg-preview.png",
    linkedin: "https://www.linkedin.com/in/mayankkapoor/",
  },
  {
    name: "Mr. Siddhant Gupta",
    role: "Founder, Himland Capital",
    labels: ["ISB", "Himland Capital", "Sixth Sense", "Deloitte"],
    tags: ["/images/isb-logo1_1.jpg", "/images/WhatsApp Image 2026-02-22 at 4.01.38 PM.jpeg", "/images/sixth sense.png", "/images/deloitte.png"],
    initials: "SG",
    subheading: "Founder Himland Capital,\nEx-VP Sixth Sense Ventures",
    image: "/images/siddhant_gupta-removebg-preview.png",
    linkedin: "https://www.linkedin.com/in/siddhant-gupta-/",
  },
];

function getLogoUrl(label: string): string | undefined {
  if (label === "Nandan Capital") return "https://nandancapital.com/";
  if (label === "Himland Capital") return "https://www.linkedin.com/company/himlandcapitaladvisors";
  return undefined;
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function LogoBadge({ src, alt, href }: { src: string; alt: string; href?: string }) {
  const badge = (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4px 8px",
        border: "1.5px solid rgba(245,200,66,0.50)",
        borderRadius: 8,
        background: "#ffffff",
        boxShadow: "0 1px 4px rgba(1,22,56,0.06)",
        height: 40,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          height: 30,
          maxWidth: 56,
          width: "auto",
          objectFit: "contain",
          display: "block",
        }}
      />
    </span>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "inline-block" }}>
        {badge}
      </a>
    );
  }

  return badge;
}

export default function VCFellowshipMentors() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .vc-mentors-section {
          background: #f5c842;
          padding: clamp(28px, 5vw, 48px) clamp(16px, 6vw, 120px) clamp(32px, 5vw, 48px);
          font-family: 'DM Sans', sans-serif;
          box-sizing: border-box;
        }

        .vc-mentors-header {
          text-align: center;
          margin-bottom: clamp(20px, 4vw, 32px);
        }
        .vc-mentors-title {
          font-size: clamp(22px, 3.5vw, 38px);
          font-weight: 700;
          color: #011638;
          letter-spacing: -0.5px;
          line-height: 1.15;
          font-family: 'DM Sans', sans-serif;
          margin: 0 0 10px;
        }
        .vc-mentors-rule {
          width: 80px;
          height: 4px;
          background: #011638;
          border-radius: 99px;
          margin: 10px auto 0;
          opacity: 0.20;
        }
        .vc-mentors-subtitle {
          margin-top: 10px;
          font-size: clamp(12px, 1.5vw, 14px);
          color: rgba(1,22,56,0.70);
        }

        /* Grid — 3 col desktop, 1 col mobile */
        .vc-mentors-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(12px, 2vw, 24px);
          margin: 0 auto;
          width: 100%;
          max-width: 1100px;
        }

        /* Card */
        .vc-mentor-card {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(1,22,56,0.14);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .vc-mentor-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 56px rgba(1,22,56,0.22);
        }

        /* Photo — fixed aspect ratio for consistency */
        .vc-mentor-photo-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 2.5;
          overflow: hidden;
          background: #1a3a5c;
          flex-shrink: 0;
        }

        .vc-mentor-photo-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          filter: grayscale(100%);
          transition: filter 0.4s ease;
        }
        .vc-mentor-card:hover .vc-mentor-photo-wrap img {
          filter: grayscale(0%);
        }

        /* Fallback initials */
        .vc-mentor-initials {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 52px;
          font-weight: 700;
          color: #f5c842;
          background: #011638;
        }

        /* LinkedIn badge */
        .vc-mentor-linkedin {
          position: absolute;
          bottom: 12px;
          right: 12px;
          width: 32px;
          height: 32px;
          background: #0077b5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-decoration: none;
          box-shadow: 0 2px 10px rgba(0,0,0,0.30);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          z-index: 2;
        }
        .vc-mentor-linkedin:hover {
          transform: scale(1.12);
          box-shadow: 0 4px 16px rgba(0,0,0,0.35);
        }

        /* Info block */
        .vc-mentor-body {
          padding: clamp(12px, 2vw, 18px);
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex-shrink: 0;
          justify-content: space-between;
        }

        .vc-mentor-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .vc-mentor-name {
          font-size: clamp(14px, 1.4vw, 17px);
          font-weight: 700;
          color: #011638;
          line-height: 1.3;
          margin: 0;
        }

        .vc-mentor-role {
          font-size: clamp(11px, 1vw, 13px);
          font-weight: 400;
          color: rgba(1,22,56,0.60);
          line-height: 1.5;
          margin: 0;
        }

        .vc-mentor-logos {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          padding-top: 8px;
          border-top: 1px solid rgba(1,22,56,0.08);
        }

        /* Tablet: 2 columns */
        @media (max-width: 860px) {
          .vc-mentors-grid {
            grid-template-columns: repeat(2, 1fr);
            max-width: 600px;
          }
          .vc-mentor-photo-wrap {
            aspect-ratio: 3 / 3.4;
          }
        }

        /* Mobile: 1 column, horizontal card layout */
        @media (max-width: 540px) {
          .vc-mentors-section {
            padding: 28px 16px 36px;
          }
          .vc-mentors-grid {
            grid-template-columns: 1fr;
            max-width: 400px;
          }
          /* On mobile switch to horizontal layout for each card */
          .vc-mentor-card {
            flex-direction: row;
            border-radius: 16px;
          }
          .vc-mentor-photo-wrap {
            width: 130px;
            min-width: 130px;
            aspect-ratio: unset;
            height: auto;
            border-radius: 0;
            align-self: stretch;
          }
          .vc-mentor-linkedin {
            bottom: 8px;
            right: 8px;
            width: 26px;
            height: 26px;
          }
          .vc-mentor-linkedin svg {
            width: 12px;
            height: 12px;
          }
          .vc-mentor-body {
            padding: 14px 14px 14px 12px;
            gap: 4px;
            justify-content: center;
          }
          .vc-mentor-name {
            font-size: 14px;
          }
          .vc-mentor-role {
            font-size: 11px;
          }
          .vc-mentor-logos {
            gap: 4px;
            padding-top: 6px;
          }
        }

        /* Very small screens */
        @media (max-width: 360px) {
          .vc-mentor-photo-wrap {
            width: 110px;
            min-width: 110px;
          }
        }
      `}</style>

      <section className="vc-mentors-section">

        <div className="vc-mentors-header">
          <h2 className="vc-mentors-title">
            Mentors behind{" "}
            <em style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 400 }}>
              the programme
            </em>
          </h2>
          <div className="vc-mentors-rule" />
          <p className="vc-mentors-subtitle">
            Learn from top industry leaders who have made a significant impact.
          </p>
        </div>

        <div className="vc-mentors-grid">
          {MENTORS.map((mentor) => (
            <div key={mentor.name} className="vc-mentor-card">

              {/* Photo */}
              <div className="vc-mentor-photo-wrap">
                <img
                  src={mentor.image.trim()}
                  alt={mentor.name}
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.style.display = "none";
                    const fb = el.nextElementSibling as HTMLElement;
                    if (fb) fb.style.display = "flex";
                  }}
                />
                <div className="vc-mentor-initials" style={{ display: "none" }}>
                  {mentor.initials}
                </div>
                <a
                  href={mentor.linkedin}
                  className="vc-mentor-linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${mentor.name} LinkedIn`}
                >
                  <LinkedInIcon />
                </a>
              </div>

              {/* Info */}
              <div className="vc-mentor-body">
                <div className="vc-mentor-info">
                  <p className="vc-mentor-name">{mentor.name}</p>
                  <p className="vc-mentor-role">{mentor.subheading}</p>
                </div>
                <div className="vc-mentor-logos">
                  {mentor.tags.map((src, i) => (
                    <LogoBadge key={src} src={src} alt={mentor.labels[i]} href={getLogoUrl(mentor.labels[i])} />
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>
    </>
  );
}