import { useState, useEffect } from "react";

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

// 6 satellite nodes evenly placed at 60deg intervals
// angle = starting angle in degrees (0 = right, -90 = top)
const orbitNodes = [
  { label: "24×7\nMonitoring",    bg: "#3b82f6", angle: -90 },
  { label: "Remote\nHelp Desk",   bg: "#1a2c5b", angle: -30 },
  { label: "Backup &\nDis. Rec.", bg: "#1a2c5b", angle:  30 },
  { label: "Onsite\nSupport",     bg: "#f59e0b", angle:  90 },
  { label: "Cloud\nServices",     bg: "#1a2c5b", angle: 150 },
  { label: "Security\nSolutions", bg: "#1a2c5b", angle: 210 },
];

const ORBIT_R = 148; // px, distance from center to satellite center
const SAT_R   = 42;  // px, satellite circle radius
const CX      = 200; // center x of SVG
const CY      = 200; // center y of SVG
const SVG_SIZE = 400;

function toRad(deg) { return (deg * Math.PI) / 180; }

function OrbitDiagram() {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let frame;
    const tick = () => {
      setAngle((a) => a +0.04); // degrees per frame
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg
      width={SVG_SIZE}
      height={SVG_SIZE}
      viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
      style={{ display: "block", overflow: "visible" }}
    >
      {/* Dashed orbit rings */}
      <circle cx={CX} cy={CY} r={ORBIT_R}      fill="none" stroke="rgba(30,50,100,0.13)" strokeWidth="1" strokeDasharray="5 7" />
      <circle cx={CX} cy={CY} r={ORBIT_R + 26} fill="none" stroke="rgba(30,50,100,0.10)" strokeWidth="1" strokeDasharray="5 7" />

      {/* Rotating group — spokes + satellites */}
      <g style={{ transformOrigin: `${CX}px ${CY}px`, transform: `rotate(${angle}deg)` }}>
        {orbitNodes.map((n, i) => {
          const rad = toRad(n.angle);
          const sx = CX + ORBIT_R * Math.cos(rad);
          const sy = CY + ORBIT_R * Math.sin(rad);
          const lines = n.label.split("\n");

          return (
            <g key={i}>
              {/* Spoke */}
              <line
                x1={CX} y1={CY} x2={sx} y2={sy}
                stroke="rgba(30,50,100,0.14)" strokeWidth="1" strokeDasharray="4 5"
              />
              {/* Satellite circle */}
              <circle cx={sx} cy={sy} r={SAT_R} fill={n.bg} />
              {/* Counter-rotate text so it stays upright */}
              <g style={{ transformOrigin: `${sx}px ${sy}px`, transform: `rotate(${-angle}deg)` }}>
                {lines.map((line, li) => (
                  <text
                    key={li}
                    x={sx}
                    y={sy + (li - (lines.length - 1) / 2) * 13}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="10.5"
                    fontWeight="700"
                    fontFamily="Manrope, sans-serif"
                  >
                    {line}
                  </text>
                ))}
              </g>
            </g>
          );
        })}
      </g>

      {/* Center circle — always on top, not rotating */}
      <circle cx={CX} cy={CY} r={66} fill="#0f1e3c" />
      <circle cx={CX} cy={CY} r={60} fill="#1a2c5b" opacity="0.6" />
      <text x={CX} y={CY - 8} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="13" fontWeight="800" fontFamily="Manrope, sans-serif">
        YOUR
      </text>
      <text x={CX} y={CY + 10} textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.65)" fontSize="11" fontWeight="500" fontFamily="Manrope, sans-serif">
        BUSINESS
      </text>
    </svg>
  );
}

export default function ITServicesSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
      `}</style>
      <section
        style={{ fontFamily: "'Manrope', sans-serif" }}
        className="bg-white flex flex-col lg:flex-row gap-10 lg:gap-16 px-25 py-14 items-center"
      >
        {/* ── LEFT ── */}
        <div className="flex-1 min-w-0">
          {/* Tag */}
          <div className="flex items-center gap-2 mb-5">
            <div className="w-6 h-[2px] bg-amber-400" />
            <span className="text-[11px] font-bold tracking-[0.14em] text-amber-400 uppercase">
              Deep Dive
            </span>
          </div>

          {/* Heading */}
          <h2
            className="text-[36px] font-extrabold leading-[1.15] mb-4"
            style={{ color: "#0f1e3c" }}
          >
            We Are Ready to<br />
            Take Control of<br />
            Your IT
          </h2>

          {/* Sub */}
          <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-[680px]">
            Our team acts as an extension of your in-house staff — managing your
            critical infrastructure, applications, and IT needs so your team
            stays focused on driving business growth.
          </p>

          {/* Service Cards */}
          <div className="flex flex-col gap-3">
            {services.map((s, i) => (
              <div
                key={i}
                className="flex items-start gap-3 border border-gray-200 rounded-xl p-3.5 bg-gray-50"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 "
                  style={{ background: "#1a2c5b" }}
                >
                  {s.icon}
                </div>
                <div>
                  <h4
                    className="text-sm font-bold mb-1"
                    style={{ color: "#0f1e3c" }}
                  >
                    {s.title}
                  </h4>
                  <p className="text-xs text-black-500 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — Pure SVG orbit diagram ── */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <OrbitDiagram />
        </div>
      </section>
    </>
  );
}