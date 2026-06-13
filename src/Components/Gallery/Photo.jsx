import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useState, useEffect, useCallback, useRef } from "react";

/* ─── Group photos by title (case-insensitive) ───────────────── */
function groupByTitle(items) {
  const map = {};
  items.forEach((item) => {
    const key = item.title.trim().toLowerCase();
    if (!map[key]) {
      map[key] = { title: item.title.trim(), category: item.category, cover: item.image, photos: [] };
    }
    map[key].photos.push(item);
    if (item.image && !map[key].cover) map[key].cover = item.image;
  });
  return Object.values(map);
}

/* ─── Only used for placeholder backgrounds (no image) ──────── */
const CAT_BG = {
  "COMPANY EVENT": "linear-gradient(145deg,#0f2a5e 0%,#1a3a7c 60%,#0d1f4a 100%)",
  "FESTIVAL CELEBRATION": "linear-gradient(145deg,#c45e00 0%,#e07b00 50%,#c96a00 100%)",
  CERTIFICATION: "linear-gradient(145deg,#3b1f7a 0%,#4e2a9e 60%,#2d1660 100%)",
};

/* ─── Category pill styles (pill only — no card overlay) ─────── */
const CAT_PILL = {
  "COMPANY EVENT":       { bg: "rgba(14,42,94,0.82)",  color: "#90c4ff" },
  "FESTIVAL CELEBRATION":{ bg: "rgba(100,35,0,0.82)",  color: "#ffb067" },
  CERTIFICATION:         { bg: "rgba(45,20,90,0.82)",  color: "#c4a8ff" },
};

/* ══════════════════════════════════════════════════════════════
   LUXURY SLIDESHOW LIGHTBOX
══════════════════════════════════════════════════════════════ */
function Lightbox({ group, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);
  const [direction, setDirection] = useState(0); // -1 prev, 1 next
  const [isAnimating, setIsAnimating] = useState(false);
  const photos = group.photos;
  const thumbRef = useRef(null);

  const go = useCallback((dir) => {
    if (isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);
    setCurrent((c) => (c + dir + photos.length) % photos.length);
  }, [isAnimating, photos.length]);

  const prev = useCallback(() => go(-1), [go]);
  const next = useCallback(() => go(1), [go]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  // Auto-scroll thumbnail strip to active thumb
  useEffect(() => {
    if (thumbRef.current) {
      const active = thumbRef.current.querySelector(`[data-active="true"]`);
      if (active) active.scrollIntoView({ inline: "center", behavior: "smooth", block: "nearest" });
    }
  }, [current]);

  const photo = photos[current];
  const pill = CAT_PILL[group.category] || { bg: "rgba(0,0,0,0.6)", color: "#fff" };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#050810",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ── Blurred bg glow from current image ── */}
      {photo.image && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `url(${photo.image})`,
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "blur(60px) brightness(0.18) saturate(1.4)",
          transform: "scale(1.1)",
          transition: "background-image 0.6s ease",
        }} />
      )}

      {/* ── Top bar ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 20,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 28px",
          background: "linear-gradient(to bottom, rgba(5,8,16,0.95) 0%, transparent 100%)",
        }}
      >
        {/* Left: album info */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            padding: "3px 10px", borderRadius: 999, fontSize: "0.62rem", fontWeight: 700,
            letterSpacing: "0.12em", textTransform: "uppercase",
            background: pill.bg, color: pill.color,
            border: `1px solid ${pill.color}33`,
            backdropFilter: "blur(6px)",
          }}>
            {group.category}
          </div>
          <div>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>
              {group.title}
            </div>
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.38)", marginTop: 3 }}>
              {current + 1} of {photos.length} photos
            </div>
          </div>
        </div>

        {/* Right: progress dots + close */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {photos.length <= 8 && (
            <div style={{ display: "flex", gap: 5 }}>
              {photos.map((_, i) => (
                <div
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  style={{
                    width: i === current ? 18 : 6, height: 6, borderRadius: 999,
                    background: i === current ? "#fff" : "rgba(255,255,255,0.25)",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.22,0.68,0,1)",
                  }}
                />
              ))}
            </div>
          )}
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.8)", width: 40, height: 40, borderRadius: "50%",
              fontSize: "1.1rem", cursor: "pointer", display: "flex", alignItems: "center",
              justifyContent: "center", lineHeight: 1, transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
          >✕</button>
        </div>
      </div>

      {/* Full screen image */}
      <AnimatePresence initial={false} custom={direction} onExitComplete={() => setIsAnimating(false)}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.42, ease: [0.22, 0.68, 0, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {photo.image ? (
            <img
              src={photo.image}
              alt={photo.title}
              style={{ width: "100vw", height: "100vh", objectFit: "contain", display: "block" }}
            />
          ) : (
            <div style={{ width: "100vw", height: "100vh", background: CAT_BG[photo.category] || "#1a2c5b", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "3rem", opacity: 0.2 }}>📷</span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Prev / Next arrows ── */}
      {photos.length > 1 && (
        <>
          {[{ dir: -1, side: "left", label: "❮" }, { dir: 1, side: "right", label: "❯" }].map(({ dir, side, label }) => (
            <button
              key={side}
              onClick={(e) => { e.stopPropagation(); go(dir); }}
              style={{
                position: "fixed", top: "50%", [side]: 20, transform: "translateY(-50%)",
                zIndex: 20,
                width: 52, height: 52, borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                color: "rgba(255,255,255,0.7)", fontSize: "1.1rem",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.transform = "translateY(-50%) scale(1.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.transform = "translateY(-50%) scale(1)"; }}
            >
              {label}
            </button>
          ))}
        </>
      )}

      {/* ── Thumbnail strip ── */}
      {photos.length > 1 && (
        <div
          ref={thumbRef}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 20,
            padding: "18px 24px 22px",
            background: "linear-gradient(to top, rgba(5,8,16,0.97) 0%, transparent 100%)",
            display: "flex", gap: 8, justifyContent: "center",
            overflowX: "auto", scrollbarWidth: "none",
          }}
        >
          {photos.map((p, i) => (
            <motion.button
              key={i}
              data-active={i === current ? "true" : "false"}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              whileHover={{ scale: 1.08 }}
              style={{
                width: 62, height: 46, borderRadius: 8, overflow: "hidden", flexShrink: 0,
                border: i === current
                  ? "2px solid rgba(255,255,255,0.9)"
                  : "2px solid rgba(255,255,255,0.1)",
                cursor: "pointer", padding: 0, background: "transparent",
                opacity: i === current ? 1 : 0.5,
                transition: "border-color 0.25s, opacity 0.25s",
                boxShadow: i === current ? "0 0 0 3px rgba(255,255,255,0.15)" : "none",
              }}
            >
              {p.image ? (
                <img src={p.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: CAT_BG[p.category] || "#1a2c5b" }} />
              )}
            </motion.button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ALBUM CARD  — NO color overlay, only dark bottom gradient
══════════════════════════════════════════════════════════════ */
function AlbumCard({ group, onClick }) {
  const [hovered, setHovered] = useState(false);
  const count = group.photos.length;
  const pill = CAT_PILL[group.category] || { bg: "rgba(0,0,0,0.6)", color: "#fff" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 0.68, 0, 1] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", borderRadius: 18, overflow: "hidden",
        cursor: "pointer", aspectRatio: "4/3",
        background: CAT_BG[group.category] || "#1a2c5b",
        boxShadow: hovered
          ? "0 24px 60px rgba(0,0,0,0.38), 0 4px 12px rgba(0,0,0,0.18)"
          : "0 4px 18px rgba(0,0,0,0.18)",
        transform: hovered ? "translateY(-5px) scale(1.012)" : "translateY(0) scale(1)",
        transition: "transform 0.35s cubic-bezier(0.22,0.68,0,1), box-shadow 0.35s cubic-bezier(0.22,0.68,0,1)",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* Stacked card shadow hints */}
      {count > 1 && (
        <>
          <div style={{ position: "absolute", top: 8, right: 14, width: "88%", height: "94%", borderRadius: 14, background: "rgba(0,0,0,0.18)", transform: "rotate(3.5deg) translateX(6px)", zIndex: 0 }} />
          <div style={{ position: "absolute", top: 5, right: 10, width: "90%", height: "96%", borderRadius: 14, background: "rgba(0,0,0,0.10)", transform: "rotate(1.8deg) translateX(3px)", zIndex: 0 }} />
        </>
      )}

      {/* Cover image — NO color tint, just scale on hover */}
      {group.cover && (
        <img
          src={group.cover}
          alt={group.title}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", zIndex: 1,
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.55s cubic-bezier(0.22,0.68,0,1)",
          }}
        />
      )}

      {/* ONLY a dark gradient at the bottom — no color overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.22) 40%, transparent 70%)",
      }} />

      {/* Category pill — top left, only the small tag */}
      <div style={{
        position: "absolute", top: 12, left: 12, zIndex: 3,
        fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.13em",
        textTransform: "uppercase", fontFamily: "'Inter', sans-serif",
        background: pill.bg, color: pill.color,
        padding: "4px 10px", borderRadius: 999,
        backdropFilter: "blur(8px)",
        border: `1px solid ${pill.color}28`,
      }}>
        {group.category}
      </div>

      {/* Photo count — top right */}
      <div style={{
        position: "absolute", top: 12, right: 12, zIndex: 3,
        display: "flex", alignItems: "center", gap: 5,
        background: "rgba(0,0,0,0.42)", backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "4px 10px", borderRadius: 999,
        fontSize: "0.7rem", fontWeight: 600, color: "rgba(255,255,255,0.85)",
        fontFamily: "'Inter', sans-serif",
      }}>
        <span style={{ fontSize: "0.65rem" }}>📷</span>
        {count} {count === 1 ? "photo" : "photos"}
      </div>

      {/* Bottom info */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3, padding: "18px 16px 16px" }}>
        <div style={{
          fontSize: "1.05rem", fontWeight: 700, color: "#fff",
          fontFamily: "'Inter', sans-serif", lineHeight: 1.25,
          textShadow: "0 1px 10px rgba(0,0,0,0.6)", marginBottom: 6,
        }}>
          {group.title}
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}>
          <div style={{ height: 1, flex: 1, background: "linear-gradient(to right,rgba(255,255,255,0.35),transparent)" }} />
          <span style={{
            fontSize: "0.68rem", fontWeight: 600, color: "rgba(255,255,255,0.7)",
            fontFamily: "'Inter', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase",
          }}>View all →</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
export default function Photo() {
  const [items, setItems] = useState([]);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    axios.get("https://api.cskinfotech.com/api/gallery")
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, []);

  const groups = groupByTitle(items);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) { .gallery-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 540px) {
          .gallery-grid { grid-template-columns: 1fr; }
          .photo-section { padding: 40px 16px 56px !important; }
        }
        .lb-thumb-strip::-webkit-scrollbar { display: none; }
      `}</style>

      <section
        className="photo-section"
        style={{ padding: "60px 24px 80px", fontFamily: "'Inter',sans-serif", background: "#fff", width: "100%" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 0.68, 0, 1] }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 52, position: "relative" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 0.68, 0, 1] }}
              style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#f0f4ff", border: "1px solid #dce8ff", borderRadius: 999, padding: "5px 14px", marginBottom: 20 }}
            >
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 0 2px rgba(34,197,94,0.25)" }} />
              <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3b5bdb" }}>Life at CSK</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 0.68, 0, 1] }}
              style={{ fontSize: "clamp(1.75rem,5vw,2.8rem)", fontWeight: 800, lineHeight: 1.15, color: "#191B23", marginBottom: 16 }}
            >
              Moments That{" "}
              <span style={{ background: "linear-gradient(90deg,#3b5bdb 0%,#4dabf7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Define Us
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 0.68, 0, 1] }}
              style={{ fontSize: "0.95rem", color: "#6b7280", maxWidth: 500, lineHeight: 1.7 }}
            >
              From company milestones and festival celebrations to certifications and awards — explore the moments that bring the CSK family together.
            </motion.p>
            <div style={{ position: "absolute", right: -50, top: 15, width: 110, height: 110, borderRadius: "50%", background: "rgba(59,130,246,0.15)", filter: "blur(5px)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", right: 60, top: 120, width: 50, height: 50, borderRadius: "50%", background: "rgba(59,130,246,0.15)", filter: "blur(5px)", pointerEvents: "none" }} />
          </motion.div>

          {/* ── Grid ── */}
          {groups.length > 0 ? (
            <div className="gallery-grid">
              {groups.map((group, i) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 0.68, 0, 1] }}
                >
                  <AlbumCard group={group} onClick={() => setLightbox({ group, index: 0 })} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af", fontSize: "0.95rem" }}>
              No gallery items yet. Add some from the admin panel.
            </div>
          )}
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox group={lightbox.group} startIndex={lightbox.index} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </>
  );
}