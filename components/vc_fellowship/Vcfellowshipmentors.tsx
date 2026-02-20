"use client";

function LogoBadge({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "5px 12px",
        border: "2px solid rgba(245,200,66,0.50)",
        borderRadius: 8,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.8px",
        textTransform: "uppercase" as const,
        color: "#011638",
        background: "#ffffff",
        fontFamily: "'DM Sans', sans-serif",
        whiteSpace: "nowrap" as const,
        boxShadow: "0 1px 4px rgba(1,22,56,0.06)",
        transition: "all 0.2s",
      }}
    >
      {label}
    </span>
  );
}

const MENTORS = [
  {
    name: "Mr. Rajat Kumar",
    role: "Managing Partner, Nandan Capital",
    bio: "Ex-McKinsey consultant and Wharton alumnus with deep expertise in venture investing and strategic advisory across emerging markets.",
    tags: ["Wharton", "McKinsey", "Nandan Capital", "EY"],
    initials: "RK",
    index: "01",
    image: "/images/rajat_kumar.jpg",
  },
  {
    name: "Mayank Kapoor",
    role: "VP, Leena AI",
    bio: "IIT Delhi and MIT alumnus building the future of enterprise AI. Previously at Apple, bringing product and technology depth to every conversation.",
    tags: ["MIT", "IIT Delhi", "Leena AI", "Apple"],
    initials: "MK",
    index: "02",
    image: "/images/mayank_kapoor.png",
  },
  {
    name: "Siddhant Gupta",
    role: "Founder, Himland Capital",
    bio: "Ex-VP at Sixth Sense Ventures and ISB alumnus. Has evaluated hundreds of deals and brings a practitioner's lens to venture and business analysis.",
    tags: ["ISB", "Himland Capital", "Sixth Sense", "Deloitte"],
    initials: "SG",
    index: "03",
    image: "/images/siddhant_gupta.jpg",
  },
];

export default function VCFellowshipMentors() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .vc-mentors-section {
          background: #f5c842;
          padding: 80px clamp(20px, 8vw, 120px);
          font-family: 'DM Sans', sans-serif;
        }

        /* Header */
        .vc-mentors-header {
          text-align: center;
          margin-bottom: 56px;
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

        /* ── Card grid — 1 column stack, full editorial width ── */
        .vc-mentors-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 900px;
          margin: 0 auto;
        }

        /* ── Card — horizontal layout, white bg for contrast on yellow section ── */
        .vc-mentor-card {
          background: #ffffff;
          border-radius: 20px;
          display: grid;
          grid-template-columns: 1fr 2fr;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(1,22,56,0.14);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
        }
        .vc-mentor-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 56px rgba(1,22,56,0.22);
        }

        /* Left: navy portrait block */
        .vc-mentor-portrait {
          background: #011638;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 36px 24px;
          position: relative;
          overflow: hidden;
          gap: 0;
          text-align: center;
        }

        /* Ambient yellow orb behind avatar */
        .vc-mentor-portrait::before {
          content: '';
          position: absolute;
          bottom: -30px; right: -30px;
          width: 120px; height: 120px;
          background: rgba(245,200,66,0.12);
          border-radius: 50%;
          filter: blur(32px);
          pointer-events: none;
        }

        /* Large index number — editorial flair */
        .vc-mentor-index {
          font-size: 56px;
          font-weight: 700;
          color: rgba(245,200,66,0.10);
          position: absolute;
          top: 12px;
          right: 16px;
          line-height: 1;
          letter-spacing: -2px;
          font-family: 'DM Sans', sans-serif;
          pointer-events: none;
          user-select: none;
        }

        /* Avatar circle */
        .vc-mentor-avatar {
          width: 80px;
          height: 80px;
          overflow: hidden;
          border-radius: 50%;
          background: #f5c842;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 700;
          color: #011638;
          letter-spacing: 0.5px;
          box-shadow: 0 0 0 4px rgba(245,200,66,0.20), 0 8px 24px rgba(245,200,66,0.25);
          margin-bottom: 16px;
          position: relative;
          z-index: 1;
        }
        .vc-mentor-avatar img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        /* Name on portrait block */
        .vc-mentor-portrait-name {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          text-align: center;
          line-height: 1.3;
          position: relative;
          z-index: 1;
        }

        /* Yellow role line */
        .vc-mentor-portrait-role {
          font-size: 16px;
          font-weight: 500;
          color: rgba(245,200,66,0.70);
          text-align: center;
          margin-top: 4px;
          line-height: 1.4;
          position: relative;
          z-index: 1;
        }

        /* Right: content block */
        .vc-mentor-body {
          padding: 32px 36px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-left: 3px solid #f5c842;
        }

        .vc-mentor-bio {
          font-size: clamp(14px, 1.4vw, 15.5px);
          line-height: 1.80;
          color: rgba(1,22,56,0.68);
          margin-bottom: 24px;
          font-family: 'DM Sans', sans-serif;
          flex: 1;
        }
        .vc-mentor-bio strong {
          color: #011638;
          font-weight: 700;
        }

        .vc-mentor-logos {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .vc-mentor-card {
            grid-template-columns: 1fr !important;
          }
          .vc-mentor-portrait {
            padding: 28px 24px !important;
            flex-direction: row !important;
            gap: 16px !important;
            justify-content: flex-start !important;
            align-items: center !important;
          }
          .vc-mentor-index { display: none; }
          .vc-mentor-avatar { margin-bottom: 0 !important; width: 52px !important; height: 52px !important; font-size: 16px !important; }
          .vc-mentor-portrait-name { text-align: left !important; }
          .vc-mentor-portrait-role { text-align: left !important; }
          .vc-mentor-body { padding: 24px !important; border-left: none !important; border-top: 3px solid #f5c842; }
        }
      `}</style>

      <section className="vc-mentors-section">

        {/* Header */}
        <div className="vc-mentors-header">
          <h2 className="vc-mentors-title">
            People behind{" "}
            <em style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 400 }}>
              the programme
            </em>
          </h2>
          <div className="vc-mentors-rule" />
          <p className="vc-mentors-subtitle">
            Learn from top industry leaders who have made a significant impact.
          </p>
        </div>

        {/* Cards */}
        <div className="vc-mentors-grid">
          {MENTORS.map((mentor) => (
            <div key={mentor.name} className="vc-mentor-card">

              {/* Left: navy portrait */}
              <div className="vc-mentor-portrait">
                <span className="vc-mentor-index">{mentor.index}</span>

                <div className="vc-mentor-avatar">
                  <img src={mentor.image} alt={mentor.name} />
                </div>

                <p className="vc-mentor-portrait-name">{mentor.name}</p>
                <p className="vc-mentor-portrait-role">{mentor.role}</p>
              </div>

              {/* Right: bio + badges */}
              <div className="vc-mentor-body">
                <p className="vc-mentor-bio">{mentor.bio}</p>
                <div className="vc-mentor-logos">
                  {mentor.tags.map((tag) => (
                    <LogoBadge key={tag} label={tag} />
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