import { useState, useEffect, useRef } from "react";

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

/* ─── Service data ──────────────────────────────────────────── */
const services = [
  {
    title: "24x7 Monitoring & Proactive Maintenance",
    desc: "Continuous monitoring and alert administration to prevent issues before they impact your business.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "Cloud Services & Flexible Platforms",
    desc: "Transition seamlessly to AWS, Azure, GCP, or private cloud with ongoing management to keep data accessible and secure.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
  },
  {
    title: "Cybersecurity & Compliance",
    desc: "Protect your business with comprehensive security assessments, threat monitoring, and incident response to safeguard critical assets.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Vendor Management & Procurement",
    desc: "Single point of accountability across all technology vendors — ensuring you always get the best value and service.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
];

/* ─── Orbit config ──────────────────────────────────────────── */
const orbitNodes = [
  { label: "24×7\nMonitoring",    bg: "#3b82f6", angle: -90 },
  { label: "Remote\nHelp Desk",   bg: "#1a2c5b", angle: -30 },
  { label: "Backup &\nDis. Rec.", bg: "#1a2c5b", angle:  30 },
  { label: "Onsite\nSupport",     bg: "#f59e0b", angle:  90 },
  { label: "Cloud\nServices",     bg: "#1a2c5b", angle: 150 },
  { label: "Security\nSolutions", bg: "#1a2c5b", angle: 210 },
];

const ORBIT_R  = 148;
const SAT_R    = 42;
const CX       = 200;
const CY       = 200;
const SVG_SIZE = 400;

function toRad(deg) { return (deg * Math.PI) / 180; }

/* ─── Orbit diagram ─────────────────────────────────────────── */
function OrbitDiagram({ size = SVG_SIZE }) {
  const [angle, setAngle] = useState(0);
  const scale = size / SVG_SIZE;

  useEffect(() => {
    let frame;
    const tick = () => {
      setAngle(a => a + 0.04);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
      style={{ display: "block", overflow: "visible", maxWidth: "100%" }}
    >
      <circle cx={CX} cy={CY} r={ORBIT_R}      fill="none" stroke="rgba(30,50,100,0.13)" strokeWidth="1" strokeDasharray="5 7" />
      <circle cx={CX} cy={CY} r={ORBIT_R + 26} fill="none" stroke="rgba(30,50,100,0.10)" strokeWidth="1" strokeDasharray="5 7" />

      <g style={{ transformOrigin: `${CX}px ${CY}px`, transform: `rotate(${angle}deg)` }}>
        {orbitNodes.map((n, i) => {
          const rad = toRad(n.angle);
          const sx = CX + ORBIT_R * Math.cos(rad);
          const sy = CY + ORBIT_R * Math.sin(rad);
          const lines = n.label.split("\n");
          return (
            <g key={i}>
              <line x1={CX} y1={CY} x2={sx} y2={sy} stroke="rgba(30,50,100,0.14)" strokeWidth="1" strokeDasharray="4 5" />
              <circle cx={sx} cy={sy} r={SAT_R} fill={n.bg} />
              <g style={{ transformOrigin: `${sx}px ${sy}px`, transform: `rotate(${-angle}deg)` }}>
                {lines.map((line, li) => (
                  <text key={li} x={sx} y={sy + (li - (lines.length - 1) / 2) * 13}
                    textAnchor="middle" dominantBaseline="middle"
                    fill="white" fontSize="10.5" fontWeight="700" fontFamily="Manrope, sans-serif">
                    {line}
                  </text>
                ))}
              </g>
            </g>
          );
        })}
      </g>

      <circle cx={CX} cy={CY} r={66} fill="#0f1e3c" />
      <circle cx={CX} cy={CY} r={60} fill="#1a2c5b" opacity="0.6" />
      <text x={CX} y={CY - 8}  textAnchor="middle" dominantBaseline="middle" fill="white"                   fontSize="13" fontWeight="800" fontFamily="Manrope, sans-serif">YOUR</text>
      <text x={CX} y={CY + 10} textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.65)"  fontSize="11" fontWeight="500" fontFamily="Manrope, sans-serif">BUSINESS</text>
    </svg>
  );
}

/* ─── Service card ──────────────────────────────────────────── */
function ServiceCard({ s }) {
  const { ref, active } = useTouchActive();
  const [hovered, setHovered] = useState(false);
  const lifted = hovered || active;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        border: lifted ? "1px solid rgba(26,44,91,0.35)" : "1px solid #e5e7eb",
        borderRadius: 12,
        padding: "14px",
        background: lifted ? "#f0f4ff" : "#f9fafb",
        transform: lifted ? "translateY(-2px)" : "translateY(0)",
        boxShadow: lifted ? "0 6px 20px rgba(26,44,91,0.10)" : "none",
        transition: "all 0.22s cubic-bezier(.22,.68,0,1.2)",
        cursor: "default",
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
      }}
    >
      <div style={{ width: 36, height: 36, borderRadius: 8, background: lifted ? "#3b82f6" : "#1a2c5b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.22s" }}>
        {s.icon}
      </div>
      <div>
        <h4 style={{ fontSize: 13, fontWeight: 700, color: "#0f1e3c", marginBottom: 4 }}>{s.title}</h4>
        <p style={{ fontSize: 12, color: "#4b5563", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
      </div>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────── */
export default function ITServicesSection() {
  // Measure container width to scale orbit diagram on mobile
  const wrapRef = useRef(null);
  const [orbitSize, setOrbitSize] = useState(SVG_SIZE);

  useEffect(() => {
    const update = () => {
      if (!wrapRef.current) return;
      const w = wrapRef.current.offsetWidth;
      // On mobile the orbit takes full width; cap at SVG_SIZE
      setOrbitSize(Math.min(w, SVG_SIZE));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

        .its-section {
          font-family: 'Manrope', sans-serif;
          background: #fff;
          padding: 56px 64px;
        }
        .its-inner {
          display: flex;
          flex-direction: row;
          gap: 64px;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }
        .its-left  { flex: 1; min-width: 0; }
        .its-right { flex-shrink: 0; display: flex; align-items: center; justify-content: center; }

        /* Tablet */
        @media (max-width: 900px) {
          .its-section { padding: 48px 32px; }
          .its-inner   { gap: 40px; }
        }

        /* Mobile — stack vertically, orbit on top */
        @media (max-width: 640px) {
          .its-section { padding: 40px 20px; }
          .its-inner   { flex-direction: column-reverse; gap: 32px; }
          .its-right   { width: 100%; }
        }
      `}</style>

      <section className="its-section">
        <div className="its-inner">

          {/* ── LEFT ── */}
          <div className="its-left">
            {/* Tag */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <div style={{ width: 24, height: 2, background: "#f59e0b", borderRadius: 2 }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#f59e0b", textTransform: "uppercase" }}>
                Deep Dive
              </span>
            </div>

            {/* Heading */}
            <h2 style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 800, lineHeight: 1.15, color: "#0f1e3c", marginBottom: 16 }}>
              We Are Ready to<br />
              Take Control of<br />
              Your IT
            </h2>

            {/* Sub */}
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.75, marginBottom: 28, maxWidth: 520 }}>
              Our team acts as an extension of your in-house staff — managing your critical infrastructure, applications, and IT needs so your team stays focused on driving business growth.
            </p>

            {/* Service Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {services.map((s, i) => <ServiceCard key={i} s={s} />)}
            </div>
          </div>

          {/* ── RIGHT — orbit diagram, scales on mobile ── */}
          <div className="its-right" ref={wrapRef}>
            <OrbitDiagram size={orbitSize} />
          </div>

        </div>
      </section>
    </>
  );
}