
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";

// ============================================================
// GALLERY DATA — Admin Panel will replace this with API data
// To connect admin panel: replace `galleryItems` with a
// useEffect fetch from your API: GET /api/gallery
// Each item needs: { id, title, category, image, span }
// span: "wide" = 2-col card, "normal" = 1-col card
// ============================================================

const CATEGORIES = {
  "COMPANY EVENT": {
    bg: "linear-gradient(160deg, #0f2a5e 0%, #1a3a7c 40%, #0d1f4a 100%)",
    dots: "blue",
  },
  "FESTIVAL CELEBRATION": {
    bg: "linear-gradient(160deg, #c45e00 0%, #e07b00 40%, #f5a623 80%, #c96a00 100%)",
    dots: "orange",
  },
  CERTIFICATION: {
    bg: "linear-gradient(160deg, #3b1f7a 0%, #4e2a9e 50%, #2d1660 100%)",
    dots: "purple",
  },
};

const galleryItems = [
  {
    id: 1,
    title: "Manali Office Tour 2026",
    category: "COMPANY EVENT",
    image: null, // Replace with real image URL from admin panel
    span: "wide", // wide = 2 cols
  },
  {
    id: 2,
    title: "Diwali Celebration",
    category: "FESTIVAL CELEBRATION",
    image: null,
    span: "normal",
  },
  {
    id: 3,
    title: "ISO 27001 Certification",
    category: "CERTIFICATION",
    image: null,
    span: "normal",
  },
  {
    id: 4,
    title: "Team Offsite Retreat",
    category: "COMPANY EVENT",
    image: null,
    span: "normal",
  },
  {
    id: 5,
    title: "Microsoft Azure Partner Award",
    category: "CERTIFICATION",
    image: null,
    span: "normal",
  },
  {
    id: 6,
    title: "Holi Festival of Colors",
    category: "FESTIVAL CELEBRATION",
    image: null,
    span: "wide",
  },
  {
    id: 7,
    title: "Employee of the Year",
    category: "CERTIFICATION",
    image: null,
    span: "normal",
  },
  {
    id: 8,
    title: "Product Launch Meetup",
    category: "COMPANY EVENT",
    image: null,
    span: "normal",
  },
  {
    id: 9,
    title: "Independence Day",
    category: "FESTIVAL CELEBRATION",
    image: null,
    span: "normal",
  },
];

// ── Decorative dots for Company Event cards ──────────────────
function BlueDots() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 400 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.35 }}
    >
      <circle cx="60" cy="60" r="3" fill="white" />
      <circle cx="340" cy="40" r="4" fill="#f5a623" />
      <circle cx="200" cy="30" r="2" fill="white" />
      <circle cx="380" cy="120" r="2.5" fill="white" />
      <circle cx="20" cy="180" r="2" fill="white" />
      <circle cx="300" cy="200" r="3" fill="white" />
    </svg>
  );
}

// ── Decorative lights/dots for Festival cards ────────────────
function FestivalLights() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 400 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* String line */}
      <path
        d="M0 80 Q100 60 200 80 Q300 100 400 75"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1"
        fill="none"
      />
      {/* Bulb dots along string */}
      {[40, 100, 160, 220, 280, 340].map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy={68 + Math.sin(i) * 8}
          r="4"
          fill="rgba(255,255,255,0.7)"
        />
      ))}
      {/* Scattered sparkle dots */}
      <circle cx="80" cy="140" r="2" fill="rgba(255,255,255,0.5)" />
      <circle cx="320" cy="50" r="2.5" fill="rgba(255,255,255,0.6)" />
      <circle cx="180" cy="200" r="2" fill="rgba(255,255,255,0.4)" />
      <circle cx="30" cy="220" r="1.5" fill="rgba(255,255,255,0.4)" />
      <circle cx="370" cy="180" r="2" fill="rgba(255,255,255,0.4)" />
      {/* Diya / flame shape */}
      <ellipse cx="200" cy="230" rx="28" ry="8" fill="rgba(80,30,0,0.55)" />
      <path
        d="M200 195 Q205 175 200 160 Q195 175 200 195Z"
        fill="rgba(255,200,100,0.8)"
      />
      <path
        d="M200 195 Q208 178 204 163 Q198 178 200 195Z"
        fill="rgba(255,140,30,0.6)"
      />
    </svg>
  );
}

// ── Certificate illustration for Certification cards ─────────
function CertificateIllustration() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        style={{
          width: "120px",
          height: "90px",
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          position: "relative",
        }}
      >
        {/* Lines */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: i === 0 ? "70px" : "55px",
              height: "3px",
              background: "rgba(200,190,255,0.5)",
              borderRadius: "2px",
            }}
          />
        ))}
        {/* Gold seal */}
        <div
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #f5c842 40%, #c8920a 100%)",
            border: "2px solid rgba(255,255,255,0.3)",
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </div>
    </div>
  );
}

// ── Computer screen illustration for Company Event cards ─────
function ScreenIllustration() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        style={{
          width: "140px",
          height: "95px",
          background: "rgba(20,40,100,0.7)",
          border: "2px solid rgba(255,255,255,0.15)",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Screen glare */}
        <div
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
          }}
        />
        {/* Bottom stand */}
        <div
          style={{
            position: "absolute",
            bottom: "-12px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "30px",
            height: "8px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "0 0 4px 4px",
          }}
        />
      </div>
    </div>
  );
}

// ── Single Gallery Card ──────────────────────────────────────
function GalleryCard({ item, isWide }) {
  const [hovered, setHovered] = useState(false);
  const config = CATEGORIES[item.category];

  const renderPlaceholder = () => {
    if (item.category === "CERTIFICATION") return <CertificateIllustration />;
    if (item.category === "COMPANY EVENT") return <ScreenIllustration />;
    return null; // Festival uses background decoration
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: isWide ? "span 2" : "span 1",
        borderRadius: "14px",
        overflow: "hidden",
        position: "relative",
        minHeight: isWide ? "260px" : "200px",
        background: config.bg,
        cursor: "pointer",
        transform: hovered ? "scale(1.015)" : "scale(1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow: hovered
          ? "0 16px 40px rgba(0,0,0,0.35)"
          : "0 4px 16px rgba(0,0,0,0.2)",
      }}
    >
      {/* Real image (from admin panel) */}
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: hovered ? 0.85 : 0.75,
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      {/* Decorative background elements */}
      {!item.image && item.category === "FESTIVAL CELEBRATION" && (
        <FestivalLights />
      )}
      {!item.image && item.category === "COMPANY EVENT" && <BlueDots />}
      {!item.image && item.category === "CERTIFICATION" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CertificateIllustration />
        </div>
      )}
      {!item.image && item.category === "COMPANY EVENT" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ScreenIllustration />
        </div>
      )}

      {/* Gradient overlay for text legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
        }}
      />

      {/* Category label — top left */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          fontSize: "0.62rem",
          fontWeight: 600,
          letterSpacing: "0.14em",
          color: "rgba(255,255,255,0.75)",
          textTransform: "uppercase",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {item.category}
      </div>

      {/* Title — bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: "18px",
          left: "18px",
          right: "18px",
          fontSize: isWide ? "1.15rem" : "0.95rem",
          fontWeight: 700,
          color: "#ffffff",
          fontFamily: "'Inter', sans-serif",
          lineHeight: 1.3,
          textShadow: "0 1px 8px rgba(0,0,0,0.4)",
        }}
      >
        {item.title}
      </div>
    </div>
  );
}

// ── Main Gallery Component ───────────────────────────────────
export default function Photo() {
  // --------------------------------------------------------
  // ADMIN PANEL INTEGRATION POINT:
  // Replace `galleryItems` below with data from your API.
  //
  // Example:
  // const [items, setItems] = useState([]);
  // useEffect(() => {
  //   fetch('/api/gallery')
  //     .then(res => res.json())
  //     .then(data => setItems(data));
  // }, []);
  //
  // Each item from API should have:
  // { id, title, category, image (URL string), span }
  // --------------------------------------------------------
  const [items, setItems] = useState([]);

useEffect(() => {
  fetchGallery();
}, []);

const fetchGallery = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/gallery"
    );

    setItems(res.data);
  } catch (err) {
    console.log(err);
  }
};

  return (
    <section
      className="w-full bg-white"
      style={{
        paddingTop: "60px",
        paddingBottom: "80px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        {/* ── Section Header ── */}
      <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    marginBottom: "52px",
    position:"relative"
  }}
>
          {/* Pill badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              background: "#f0f4ff",
              border: "1px solid #dce8ff",
              borderRadius: "999px",
              padding: "5px 14px",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#22c55e",
                display: "inline-block",
                boxShadow: "0 0 0 2px rgba(34,197,94,0.25)",
              }}
            />
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#3b5bdb",
              }}
            >
              Life at CSK
            </span>
          </div>

          {/* Heading */}
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 2.8rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#191B23",
              marginBottom: "16px",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Moments That{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #3b5bdb 0%, #4dabf7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Define Us
            </span>
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "0.95rem",
              color: "#6b7280",
              maxWidth: "500px",
              lineHeight: 1.7,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            From company milestones and festival celebrations to certifications
            and awards — explore the moments that bring the CSK family together.
          </p>



{/* Big Blur Circle */}
<div
  style={{
    position: "absolute",
    right: "-50px",
    top: "15px",
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    background: "rgba(59,130,246,0.15)",
    filter: "blur(5px)",
    pointerEvents: "none",
  }}
/>

{/* Small Circle */}
<div
  style={{
     position: "absolute",
    right: "60px",
    top: "120px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "rgba(59,130,246,0.15)",
    filter: "blur(5px)",
    pointerEvents: "none",
  }}
/>
          
        </motion.div>

        {/* ── Gallery Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
          }}
        >
          {items.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
              isWide={item.span === "wide"}
            />
          ))}
        </div>

        {/* ── Empty state (shown when admin removes all items) ── */}
        {items.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#9ca3af",
              fontSize: "0.95rem",
            }}
          >
            No gallery items yet. Add some from the admin panel.
          </div>
        )}
      </div>
    </section>
  );
}