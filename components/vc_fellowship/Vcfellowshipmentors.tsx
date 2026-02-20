"use client";

import { useEffect, useRef } from "react";

const MENTORS = [
  {
    name: "Mr. Rajat Kumar",
    role: "Nandan Capital, Ex McKinsey and Wharton Alum",
    labels: ["Wharton", "McKinsey", "Nandan Capital", "EY"],
    tags: ["/images/wharton.png", "/images/McKinseyCompany_logo-dark.png", "/images/Nandan_Final_Logo_page-0001_12-removebg-preview.png", "/images/ey.png"],
    initials: "RK",
    image: "/images/rajat_kumar.jpg",
    linkedin: "https://www.linkedin.com/in/rajat-kumar-004533/",
  },
  {
    name: "Mr. Mayank Kapoor",
    role: "VP, Leena AI",
    labels: ["MIT", "IIT Delhi", "Leena AI", "Apple"],
    tags: ["/images/mit2.png", "/images/iit.png", "/images/leenaai.png", "/images/apple.png"],
    initials: "MK",
    image: "/images/mayank_kapoor.png",
    linkedin: "https://www.linkedin.com/in/mayankkapoor/",
  },
  {
    name: "Mr. Siddhant Gupta",
    role: "Founder, Himland Capital",
    labels: ["ISB", "Himland Capital", "Sixth Sense", "Deloitte"],
    tags: ["/images/isb-logo1_1.jpg", "/images/himlandcapitaladvisors_logo.jpg", "/images/sixth sense.png", "/images/deloitte.png"],
    initials: "SG",
    image: "/images/siddhant_gupta.jpg",
    linkedin: "https://www.linkedin.com/in/siddhant-gupta-/",
  },
];

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function LogoBadge({ src, alt }: { src: string; alt: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "5px 10px",
        border: "1.5px solid rgba(245,200,66,0.50)",
        borderRadius: 8,
        background: "#ffffff",
        boxShadow: "0 1px 4px rgba(1,22,56,0.06)",
        height: 56,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          height: 48,
          maxWidth: 70,
          width: "auto",
          objectFit: "contain",
          display: "block",
        }}
      />
    </span>
  );
}

export default function VCFellowshipMentors() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.vc-mentor-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('vc-animate');
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes vc-mentor-fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .vc-mentors-section {
          background: #f5c842;
          padding: 80px clamp(20px, 8vw, 120px);
          font-family: 'DM Sans', sans-serif;
        }

        .vc-mentors-header {
          text-align: center;
          margin-bottom: 36px;
        }
        .vc-mentors-title {
          font-size: clamp(28px, 3.5vw, 40px);
          font-weight: 700;
          color: #011638;
          letter-spacing: -0.5px;
          line-height: 1.15;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 10px;
        }
        .vc-mentors-rule {
          width: 96px; height: 4px;
          background: #011638;
          border-radius: 99px;
          margin: 12px auto 0;
          opacity: 0.20;
        }
        .vc-mentors-subtitle {
          margin-top: 12px;
          font-size: 15px;
          color: rgba(1,22,56,0.70);
        }

        /* 3-column grid */
        .vc-mentors-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin: 0 auto;
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
          opacity: 0;
          transform: translateY(24px);
        }
        .vc-mentor-card.vc-animate {
          animation: vc-mentor-fadeUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .vc-mentor-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 56px rgba(1,22,56,0.22);
        }

        /* Photo area — fills top of card */
        .vc-mentor-photo-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 3;
          overflow: hidden;
          background: #1a3a5c;
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

        /* LinkedIn badge — bottom-right of photo */
        .vc-mentor-linkedin {
          position: absolute;
          bottom: 14px;
          right: 14px;
          width: 34px;
          height: 34px;
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

        /* White info block */
        .vc-mentor-body {
          padding: 20px 22px 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .vc-mentor-name {
          font-size: 17px;
          font-weight: 700;
          color: #011638;
          line-height: 1.3;
          margin: 0;
        }

        .vc-mentor-role {
          font-size: 13px;
          font-weight: 400;
          color: rgba(1,22,56,0.60);
          line-height: 1.5;
          margin: 0;
        }

        .vc-mentor-logos {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding-top: 6px;
          border-top: 1px solid rgba(1,22,56,0.08);
          margin-top: auto;
        }

        @media (max-width: 768px) {
          .vc-mentors-grid {
            grid-template-columns: 1fr;
            max-width: 360px;
          }
        }
      `}</style>

      <section className="vc-mentors-section" ref={sectionRef}>

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
                  src={mentor.image}
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
                <p className="vc-mentor-name">{mentor.name}</p>
                <p className="vc-mentor-role">{mentor.role}</p>
                <div className="vc-mentor-logos">
                  {mentor.tags.map((src, i) => (
                    <LogoBadge key={src} src={src} alt={mentor.labels[i]} />
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