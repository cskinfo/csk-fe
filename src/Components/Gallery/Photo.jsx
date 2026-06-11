import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

const CATEGORIES = {
  "COMPANY EVENT": {
    bg: "linear-gradient(160deg, #0f2a5e 0%, #1a3a7c 40%, #0d1f4a 100%)",
  },
  "FESTIVAL CELEBRATION": {
    bg: "linear-gradient(160deg, #c45e00 0%, #e07b00 40%, #f5a623 80%, #c96a00 100%)",
  },
  CERTIFICATION: {
    bg: "linear-gradient(160deg, #3b1f7a 0%, #4e2a9e 50%, #2d1660 100%)",
  },
};

/* ─── Touch-active hook ─────────────────────────────────────── */
function useTouchActive() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const on  = () => setActive(true);
    const off = () => setActive(false);
    el.addEventListener("touchstart",  on,  { passive: true });
    el.addEventListener("touchend",    off, { passive: true });
    el.addEventListener("touchcancel", off, { passive: true });
    return () => {
      el.removeEventListener("touchstart",  on);
      el.removeEventListener("touchend",    off);
      el.removeEventListener("touchcancel", off);
    };
  }, []);
  return { ref, active };
}

/* ─── Decorative SVGs ───────────────────────────────────────── */
function BlueDots() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 260" fill="none" style={{ opacity: 0.35 }}>
      <circle cx="60"  cy="60"  r="3"   fill="white" />
      <circle cx="340" cy="40"  r="4"   fill="#f5a623" />
      <circle cx="200" cy="30"  r="2"   fill="white" />
      <circle cx="380" cy="120" r="2.5" fill="white" />
      <circle cx="20"  cy="180" r="2"   fill="white" />
      <circle cx="300" cy="200" r="3"   fill="white" />
    </svg>
  );
}

function FestivalLights() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 260" fill="none">
      <path d="M0 80 Q100 60 200 80 Q300 100 400 75" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
      {[40, 100, 160, 220, 280, 340].map((x, i) => (
        <circle key={i} cx={x} cy={68 + Math.sin(i) * 8} r="4" fill="rgba(255,255,255,0.7)" />
      ))}
      <circle cx="80"  cy="140" r="2"   fill="rgba(255,255,255,0.5)" />
      <circle cx="320" cy="50"  r="2.5" fill="rgba(255,255,255,0.6)" />
      <circle cx="180" cy="200" r="2"   fill="rgba(255,255,255,0.4)" />
      <circle cx="30"  cy="220" r="1.5" fill="rgba(255,255,255,0.4)" />
      <circle cx="370" cy="180" r="2"   fill="rgba(255,255,255,0.4)" />
      <ellipse cx="200" cy="230" rx="28" ry="8" fill="rgba(80,30,0,0.55)" />
      <path d="M200 195 Q205 175 200 160 Q195 175 200 195Z" fill="rgba(255,200,100,0.8)" />
      <path d="M200 195 Q208 178 204 163 Q198 178 200 195Z" fill="rgba(255,140,30,0.6)" />
    </svg>
  );
}

function CertificateIllustration() {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", width:"100%", height:"100%" }}>
      <div style={{ width:120, height:90, background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:8, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:6, position:"relative" }}>
        {[0,1,2].map(i=>(
          <div key={i} style={{ width:i===0?70:55, height:3, background:"rgba(200,190,255,0.5)", borderRadius:2 }}/>
        ))}
        <div style={{ width:18, height:18, borderRadius:"50%", background:"radial-gradient(circle, #f5c842 40%, #c8920a 100%)", border:"2px solid rgba(255,255,255,0.3)", position:"absolute", bottom:10, left:"50%", transform:"translateX(-50%)" }}/>
      </div>
    </div>
  );
}

function ScreenIllustration() {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", width:"100%", height:"100%" }}>
      <div style={{ width:140, height:95, background:"rgba(20,40,100,0.7)", border:"2px solid rgba(255,255,255,0.15)", borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
        <div style={{ width:45, height:45, borderRadius:"50%", background:"rgba(255,255,255,0.08)" }}/>
        <div style={{ position:"absolute", bottom:-12, left:"50%", transform:"translateX(-50%)", width:30, height:8, background:"rgba(255,255,255,0.1)", borderRadius:"0 0 4px 4px" }}/>
      </div>
    </div>
  );
}

/* ─── Gallery Card ──────────────────────────────────────────── */
function GalleryCard({ item, isWide }) {
  const { ref, active } = useTouchActive();
  const [hovered, setHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const lifted = hovered || active;
  const config = CATEGORIES[item.category] || { bg: "#1a2c5b" };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 14,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        minHeight: isWide ? 260 : 200,
        background: config.bg,
        cursor: "pointer",
        transform: lifted ? "scale(1.015)" : "scale(1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow: lifted
          ? "0 16px 40px rgba(0,0,0,0.35)"
          : "0 4px 16px rgba(0,0,0,0.2)",
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
      }}
    >
      {/* Image — with error fallback */}
      {item.image && !imageError && (
        <img
          src={item.image}
          alt={item.title}
          onError={() => setImageError(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: lifted ? 0.85 : 0.75,
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      {/* Placeholders — show when no image or image failed */}
      {(!item.image || imageError) && item.category === "FESTIVAL CELEBRATION" && (
        <FestivalLights />
      )}
      {(!item.image || imageError) && item.category === "COMPANY EVENT" && (
        <>
          <BlueDots />
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <ScreenIllustration />
          </div>
        </>
      )}
      {(!item.image || imageError) && item.category === "CERTIFICATION" && (
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <CertificateIllustration />
        </div>
      )}

      {/* Gradient overlay */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }}/>

      {/* Category label */}
      <div style={{ position:"absolute", top:14, left:14, fontSize:"0.62rem", fontWeight:600, letterSpacing:"0.14em", color:"rgba(255,255,255,0.75)", textTransform:"uppercase", fontFamily:"'Inter', sans-serif" }}>
        {item.category}
      </div>

      {/* Title */}
      <div style={{ position:"absolute", bottom:16, left:16, right:16, fontSize: isWide ? "1.1rem" : "0.9rem", fontWeight:700, color:"#fff", fontFamily:"'Inter', sans-serif", lineHeight:1.3, textShadow:"0 1px 8px rgba(0,0,0,0.4)" }}>
        {item.title}
      </div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────── */
export default function Photo() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("https://api.cskinfotech.com/api/gallery")
      .then(res => setItems(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        @media (max-width: 600px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
          }
          .gallery-grid > * {
            grid-column: span 1 !important;
          }
        }

        .photo-section {
          padding: 60px 24px 80px;
        }
        @media (max-width: 480px) {
          .photo-section { padding: 40px 16px 56px; }
        }
      `}</style>

      <section
        className="photo-section"
        style={{ fontFamily: "'Inter', sans-serif", background: "#fff", width: "100%" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* ── Section Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 0.68, 0, 1] }}
            style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", marginBottom:52, position:"relative" }}
          >
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 0.68, 0, 1] }}
              style={{ display:"inline-flex", alignItems:"center", gap:7, background:"#f0f4ff", border:"1px solid #dce8ff", borderRadius:999, padding:"5px 14px", marginBottom:20 }}
            >
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#22c55e", display:"inline-block", boxShadow:"0 0 0 2px rgba(34,197,94,0.25)" }}/>
              <span style={{ fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"#3b5bdb" }}>Life at CSK</span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 0.68, 0, 1] }}
              style={{ fontSize:"clamp(1.75rem, 5vw, 2.8rem)", fontWeight:800, lineHeight:1.15, color:"#191B23", marginBottom:16 }}
            >
              Moments That{" "}
              <span style={{ background:"linear-gradient(90deg, #3b5bdb 0%, #4dabf7 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                Define Us
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 0.68, 0, 1] }}
              style={{ fontSize:"0.95rem", color:"#6b7280", maxWidth:500, lineHeight:1.7 }}
            >
              From company milestones and festival celebrations to certifications and awards — explore the moments that bring the CSK family together.
            </motion.p>

            {/* Decorative blobs */}
            <div style={{ position:"absolute", right:-50, top:15, width:110, height:110, borderRadius:"50%", background:"rgba(59,130,246,0.15)", filter:"blur(5px)", pointerEvents:"none" }}/>
            <div style={{ position:"absolute", right:60, top:120, width:50, height:50, borderRadius:"50%", background:"rgba(59,130,246,0.15)", filter:"blur(5px)", pointerEvents:"none" }}/>
          </motion.div>

          {/* ── Gallery Grid ── */}
          <div className="gallery-grid">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 0.68, 0, 1] }}
                style={{ gridColumn: item.span === "wide" ? "span 2" : "span 1" }}
              >
                <GalleryCard item={item} isWide={item.span === "wide"} />
              </motion.div>
            ))}
          </div>

          {/* ── Empty state ── */}
          {items.length === 0 && (
            <div style={{ textAlign:"center", padding:"60px 20px", color:"#9ca3af", fontSize:"0.95rem" }}>
              No gallery items yet. Add some from the admin panel.
            </div>
          )}

        </div>
      </section>
    </>
  );
}