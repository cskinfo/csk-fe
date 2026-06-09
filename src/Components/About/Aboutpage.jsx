import React from "react";
import heroBg from "../../assets/AboutPagePhoto/aboutImage.jpg";
import AboutHero from "./Abouthero";
import cultureImg1 from "../../assets/AboutPagePhoto/cultureimg1.jpg";
import { Link } from "react-router-dom";
import cultureImg2 from "../../assets/AboutPagePhoto/cultureimg2.jpg";

import sectionthreeimg from "../../assets/AboutPagePhoto/sectionthreeimg.jpg";
import AreaCovered from "./Areacovered";


// ── Icon SVGs (inline, no external dep) ──────────────────────────
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

// ── Location data ─────────────────────────────────────────────────
const locations = [
  {
    state: "Uttar Pradesh",
    address: "Tower4, Unit B-1206, 12th floor, NX ONE, Tech Zone-IV Gautam Buddha Nagar, Uttar Pradesh-201306",
  },
  {
    state: "Uttar Pradesh",
    address: "603, Tower C, KLJ Noida One, Block B, Industrial Area, Sector 62, Noida, Uttar Pradesh 201309",
  },
  {
    state: "Telangana",
    address: "1043, St. 52, Ayyappa Society, Khanapet, Serilingampally mandal, Hyderabad – 500081",
  },
  {
    state: "Andhra Pradesh",
    address: "4-16-462, PS Nagar, Amravati Road Main Road, Guntur, AP-522002",
  },
  {
    state: "Haryana-1",
    address: "Behind Radhe Krishna School, Sondhapur Chowk Jattal Road, Panipat-132103",
  },
  {
    state: "Karnataka",
    address: "112, 5th Cross, ITC Colony Jeevanahalli, Coxtown, Bangalore KA-560005",
  },
  {
    state: "Haryana-2",
    address: "Office No. 3, Plot No. 9, HSIIDC I.T PARK, Sector-22, Panchkula, Haryana-133301",
  },
  {
    state: "Madhya Pradesh",
    address: "1256, Kunj-Vihar Colony, 60 feet Road, Gole Ka Mandir Gwalior-474005",
  },
  {
    state: "Tamil Nadu/Chennai",
    address: "7/8, Kambar Street, Vivekananda nagar Chennai Tamil Nadu-600118",
  },
];

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, sans-serif", color: "#1a1a2e" }}>

      {/* ─── SECTION 1: HERO ──────────────────────────────────────── */}
      <AboutHero/>

      {/* ─── SECTION 2: CULTURE IN MOTION ────────────────────────── */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "72px 24px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          alignItems: "center",
        }}
      >
        {/* Left */}
        <div>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 700,
              marginBottom: "20px",
              color: "#1a1a2e",
            }}
          >
            Culture in Motion
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              color: "#555",
              lineHeight: 1.75,
              marginBottom: "32px",
            }}
          >
            At CSK, we believe that great technology is born from a vibrant,
            collaborative culture. From Hackathons to festival celebrations, we
            thrive on diversity and shared success.
          </p>
          <Link to ="/GalleryPage"
            style={{
              background: "#f5a623",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "12px 28px",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            View the Gallery
          </Link>
        </div>

        {/* Right — 2 images */}
        {/* Right — 2 images */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  }}
>
  <img
    src={cultureImg1}
    alt="Culture"
    style={{
      width: "100%",
      height: "320px",
      objectFit: "cover",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
    }}
  />

  <img
    src={cultureImg2}
    alt="Team"
    style={{
      width: "100%",
      height: "320px",
      objectFit: "cover",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
    }}
  />
</div>
      </section>

      {/* ─── SECTION 3: WHY CSK ───────────────────────────────────── */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 2px 80px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          alignItems: "center",
          marginTop: "50px"
        }}
      >
        {/* Left — Illustration placeholder */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            minHeight: "380px",
            // display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
            // flexDirection: "column",
            gap: "50px",
          }}
        >
          {/* Teamwork label */}
          <div
  style={{
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
    width: "100%",
    maxWidth: "500px",
  }}
>
  <img
    src={sectionthreeimg}
    alt="CSK Team"
    style={{
      width: "100%",
      height: "380px",
      objectFit: "cover",
      display: "block",
    }}
  />
</div>
          
        </div>

        {/* Right */}
        <div>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 700,
              marginBottom: "16px",
            }}
          >
            Why CSK...?
          </h2>
          <p
            style={{
              fontSize: "0.94rem",
              color: "#555",
              lineHeight: 1.75,
              marginBottom: "32px",
            }}
          >
            CSK provides end to end solutions across all portfolios. We, at CI
            have strong work ethics and streamlined internal process for
            transparency. Customer satisfaction has always been our top priority
            &amp; we have over a 95% customer retention rate. We provide a
            variety of solutions to address one problem statement.
          </p>

          {/* 4 feature cards in 2x2 grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
            }}
          >
            {[
              {
                icon: <IconInnovation />,
                title: "Innovation-Driven",
                desc: "Leveraging the latest technologies for future-ready solutions.",
              },
              {
                icon: <IconExpertise />,
                title: "Industry Expertise",
                desc: "Specialized teams for corporate, gov, and education sectors.",
              },
              {
                icon: <IconCustom />,
                title: "Customized Services",
                desc: "Tailored roadmaps aligned with your business goals.",
              },
              {
                icon: <IconNationwide />,
                title: "Nationwide Support",
                desc: "Consistent service delivery across 66 locations in India.",
              },
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {f.icon}
                <p style={{ fontSize: "0.95rem", fontWeight: 700, margin: 0 }}>
                  {f.title}
                </p>
                <p style={{ fontSize: "0.85rem", color: "#666", margin: 0, lineHeight: 1.5 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: AREA COVERED ──────────────────────────────── */}
      <AreaCovered/>
    </div>
  );
}