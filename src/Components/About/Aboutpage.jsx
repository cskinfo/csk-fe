import React from "react";
import heroBg from "../../assets/AboutPagePhoto/aboutImage.jpg";
import AboutHero from "./Abouthero";
import cultureImg1 from "../../assets/AboutPagePhoto/cultureImg1.jpg";
import { Link } from "react-router-dom";
import cultureImg2 from "../../assets/AboutPagePhoto/cultureImg2.jpg";
import sectionthreeimg from "../../assets/AboutPagePhoto/sectionthreeimg.jpg";
import AreaCovered from "./Areacovered";

/* ── Icons ─────────────────────────────────────────────────────── */
const IconInnovation = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="18" fill="#e8f0fe" />
    <path d="M18 10a5 5 0 0 1 3 9v2h-6v-2a5 5 0 0 1 3-9z" stroke="#1565c0" strokeWidth="1.5" fill="none" />
    <rect x="15" y="21" width="6" height="2" rx="1" fill="#1565c0" />
    <rect x="15" y="24" width="6" height="1.5" rx="0.75" fill="#1565c0" />
  </svg>
);
const IconExpertise = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="18" fill="#e8f5e9" />
    <circle cx="18" cy="15" r="4" stroke="#2e7d32" strokeWidth="1.5" fill="none" />
    <path d="M10 26c0-4 3.6-7 8-7s8 3 8 7" stroke="#2e7d32" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M22 12l2-2m-2 8l2 2M14 12l-2-2m2 8l-2 2" stroke="#2e7d32" strokeWidth="1" strokeLinecap="round" />
  </svg>
);
const IconCustom = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="18" fill="#fce4ec" />
    <rect x="11" y="11" width="14" height="14" rx="2" stroke="#c62828" strokeWidth="1.5" fill="none" />
    <path d="M14 18h8M18 14v8" stroke="#c62828" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const IconNationwide = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="18" fill="#e3f2fd" />
    <circle cx="18" cy="18" r="6" stroke="#0277bd" strokeWidth="1.5" fill="none" />
    <path d="M18 12v-3M18 27v-3M12 18H9M27 18h-3" stroke="#0277bd" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="18" cy="18" r="2" fill="#0277bd" />
  </svg>
);

export default function AboutPage() {
  return (
    <>
      <style>{`
        .about-page { font-family: 'Segoe UI', Tahoma, sans-serif; color: #1a1a2e; }

        /* ── Section 2: Culture ── */
        .culture-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 72px 24px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }
        .culture-images {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .culture-images img {
          width: 100%;
          height: 320px;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.12);
        }

        /* ── Section 3: Why CSK ── */
        .why-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px 80px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }
        .why-img {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
          width: 100%;
          max-width: 500px;
        }
        .why-img img {
          width: 100%;
          height: 380px;
          object-fit: cover;
          display: block;
        }
        .feature-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        /* ── Tablet (≤900px) ── */
        @media (max-width: 900px) {
          .culture-section {
            grid-template-columns: 1fr;
            padding: 56px 24px;
            gap: 32px;
          }
          .why-section {
            grid-template-columns: 1fr;
            padding: 0 24px 64px;
            gap: 32px;
          }
          .why-img { max-width: 100%; }
          .why-img img { height: 300px; }
        }

        /* ── Mobile (≤600px) ── */
        @media (max-width: 600px) {
          .culture-section { padding: 48px 16px; gap: 28px; }
          .culture-images { grid-template-columns: 1fr; }
          .culture-images img { height: 220px; }
          .why-section { padding: 0 16px 56px; gap: 28px; }
          .why-img img { height: 220px; }
          .feature-grid { grid-template-columns: 1fr; gap: 20px; }
        }
      `}</style>

      <div className="about-page">

        {/* ── SECTION 1: HERO ── */}
        <AboutHero />

        {/* ── SECTION 2: CULTURE IN MOTION ── */}
        <section className="culture-section">
          {/* Left — text */}
          <div>
            <h2 style={{ fontSize:"clamp(1.6rem, 3vw, 2.4rem)", fontWeight:700, marginBottom:20, color:"#1a1a2e" }}>
              Culture in Motion
            </h2>
            <p style={{ fontSize:"0.95rem", color:"#555", lineHeight:1.75, marginBottom:32 }}>
              At CSK, we believe that great technology is born from a vibrant,
              collaborative culture. From Hackathons to festival celebrations, we
              thrive on diversity and shared success.
            </p>
            <Link
              to="/GalleryPage"
              style={{ background:"#f5a623", color:"#fff", border:"none", borderRadius:6, padding:"12px 28px", fontSize:"0.95rem", fontWeight:600, cursor:"pointer", textDecoration:"none", display:"inline-block" }}
            >
              View the Gallery
            </Link>
          </div>

          {/* Right — 2 images */}
          <div className="culture-images">
            <img src={cultureImg1} alt="Culture" />
            <img src={cultureImg2} alt="Team" />
          </div>
        </section>

        {/* ── SECTION 3: WHY CSK ── */}
        <section className="why-section">
          {/* Left — image */}
          <div className="why-img">
            <img src={sectionthreeimg} alt="CSK Team" />
          </div>

          {/* Right — text + feature grid */}
          <div>
            <h2 style={{ fontSize:"clamp(1.6rem, 3vw, 2.2rem)", fontWeight:700, marginBottom:16 }}>
              Why CSK...?
            </h2>
            <p style={{ fontSize:"0.94rem", color:"#555", lineHeight:1.75, marginBottom:32 }}>
              CSK provides end to end solutions across all portfolios. We, at CI
              have strong work ethics and streamlined internal process for
              transparency. Customer satisfaction has always been our top priority
              &amp; we have over a 95% customer retention rate. We provide a
              variety of solutions to address one problem statement.
            </p>

            <div className="feature-grid">
              {[
                { icon:<IconInnovation />, title:"Innovation-Driven",  desc:"Leveraging the latest technologies for future-ready solutions." },
                { icon:<IconExpertise />,  title:"Industry Expertise", desc:"Specialized teams for corporate, gov, and education sectors." },
                { icon:<IconCustom />,     title:"Customized Services", desc:"Tailored roadmaps aligned with your business goals." },
                { icon:<IconNationwide />, title:"Nationwide Support", desc:"Consistent service delivery across 66 locations in India." },
              ].map((f, i) => (
                <div key={i} style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {f.icon}
                  <p style={{ fontSize:"0.95rem", fontWeight:700, margin:0 }}>{f.title}</p>
                  <p style={{ fontSize:"0.85rem", color:"#666", margin:0, lineHeight:1.5 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 4: AREA COVERED ── */}
        <AreaCovered />

      </div>
    </>
  );
}