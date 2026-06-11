import { useEffect, useRef, useState } from "react";

const nodes = [
  {
    id: "cloud",
    label: "Cloud Services",
    sub: "Hybrid & Multi-cloud Integration",
    icon: "☁️",
    color: "#3b82f6",
    pos: { x: 0.28, y: 0.22 },
  },
  {
    id: "cyber",
    label: "Cyber Defense",
    sub: "Zero-trust security & monitoring",
    icon: "🛡️",
    color: "#8b5cf6",
    pos: { x: 0.72, y: 0.22 },
  },
  {
    id: "data",
    label: "Data Centers",
    sub: "Scalable storage & smart racks",
    icon: "🗄️",
    color: "#10b981",
    pos: { x: 0.28, y: 0.78 },
  },
  {
    id: "network",
    label: "Smart Networks",
    sub: "SD-WAN & enterprise routing",
    icon: "🌐",
    color: "#f59e0b",
    pos: { x: 0.72, y: 0.78 },
  },
];

// Responsive node positions stay the same — they're percentage-based
// so they naturally scale. We only need to adjust card sizes & canvas.

function EcosystemCanvas({ progress, width, height }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const cx = W * 0.5;
    const cy = H * 0.5;

    nodes.forEach((node) => {
      const tx = W * node.pos.x;
      const ty = H * node.pos.y;
      const dx = tx - cx;
      const dy = ty - cy;

      const drawn = Math.min(progress, 1);
      const ex = cx + dx * drawn;
      const ey = cy + dy * drawn;

      ctx.save();
      ctx.beginPath();
      ctx.setLineDash([8, 6]);
      ctx.lineDashOffset = -progress * 40;
      ctx.strokeStyle = node.color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 1;
      ctx.moveTo(cx, cy);
      ctx.lineTo(ex, ey);
      ctx.stroke();

      if (drawn > 0) {
        const dotX = cx + dx * (drawn * 0.85);
        const dotY = cy + dy * (drawn * 0.85);
        const grad = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 8);
        grad.addColorStop(0, node.color);
        grad.addColorStop(1, "transparent");
        ctx.globalAlpha = 0.9 * drawn;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });
  }, [progress, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

export default function SolutionPageFourthSection() {
  const sectionRef = useRef(null);
  const diagramRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [dims, setDims] = useState({ width: 888, height: 460 });
  const rafRef = useRef(null);
  const startRef = useRef(null);

  // Measure diagram container on mount and resize
  useEffect(() => {
    const measure = () => {
      if (!diagramRef.current) return;
      const w = diagramRef.current.offsetWidth;
      // Keep a nice aspect ratio: taller on mobile, wider on desktop
      const h = w < 480 ? Math.round(w * 1.05) : w < 768 ? Math.round(w * 0.72) : 460;
      setDims({ width: w, height: h });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (diagramRef.current) ro.observe(diagramRef.current);
    return () => ro.disconnect();
  }, []);

  const startAnimation = () => {
    setProgress(0);
    startRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const duration = 3000;
    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setProgress(eased);
      if (p < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          setProgress(0);
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
        }
      },
      { threshold: 0.35 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Responsive card sizing
  const isMobile = dims.width < 480;
  const isTablet = dims.width < 768;
  const cardWidth = isMobile ? 130 : isTablet ? 155 : 190;
  const cardPadX = isMobile ? "10px" : "14px";
  const cardPadY = isMobile ? "8px" : "12px";
  const iconSize = isMobile ? "w-7 h-7 text-base" : "w-9 h-9 text-lg";
  const labelSize = isMobile ? "9px" : isTablet ? "10px" : "12px";
  const subSize = isMobile ? "8px" : "10px";

  // Core circle sizing
  const coreSize = isMobile ? 72 : isTablet ? 84 : 96;
  const ringSize = isMobile ? 96 : isTablet ? 112 : 126;
  const glowSize = isMobile ? 130 : isTablet ? 152 : 170;
  const glowOffset = isMobile ? -29 : isTablet ? -34 : -35;
  const coreIconSize = isMobile ? "text-xl" : "text-2xl";
  const coreLabelSize = isMobile ? "9px" : "11px";

  return (
    <section
      ref={sectionRef}
      className="w-full py-10 sm:py-14 md:py-16 px-4 sm:px-6"
      style={{
        background: "linear-gradient(160deg, #0a1628 0%, #0d1f3c 60%, #0a1628 100%)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
          Our Digital Ecosystem
        </h2>
        <div className="w-16 h-0.5 bg-blue-500 mx-auto mb-4" />
        <p className="text-[#9aabb8] text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
          A fully integrated architecture designed to protect, connect, and scale your modern
          enterprise operations.
        </p>
      </div>

      {/* Diagram */}
      <div
        ref={diagramRef}
        className="relative max-w-3xl mx-auto w-full"
        style={{ height: `${dims.height}px` }}
      >
        {/* Canvas lines — uses measured pixel dimensions */}
        <EcosystemCanvas progress={progress} width={dims.width} height={dims.height} />

        {/* Center CSK Core */}
        <div
          className="absolute z-20"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          {/* Outer glow */}
          <div
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${glowSize}px`,
              height: `${glowSize}px`,
              left: `${glowOffset}px`,
              top: `${glowOffset}px`,
              background:
                "radial-gradient(circle, rgba(59,130,246,0.20) 0%, rgba(59,130,246,0.06) 45%, transparent 75%)",
              filter: "blur(18px)",
            }}
          />
          {/* Second ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: `${ringSize}px`,
              height: `${ringSize}px`,
              left: `${-(ringSize - coreSize) / 2}px`,
              top: `${-(ringSize - coreSize) / 2}px`,
              border: "1px solid rgba(59,130,246,0.20)",
              boxShadow: "0 0 40px rgba(59,130,246,0.18)",
            }}
          />
          {/* Main core */}
          <div
            className="relative rounded-full flex flex-col items-center justify-center text-white"
            style={{
              width: `${coreSize}px`,
              height: `${coreSize}px`,
              background: "linear-gradient(180deg, #2563eb 0%, #1d4ed8 55%, #153ea8 100%)",
              border: "2px solid rgba(255,255,255,0.08)",
              boxShadow:
                "inset 0 1px 8px rgba(255,255,255,0.18), 0 0 28px rgba(37,99,235,0.55), 0 0 60px rgba(37,99,235,0.28)",
            }}
          >
            <div
              className="absolute top-[10px] left-1/2 -translate-x-1/2 rounded-full"
              style={{
                width: "52px",
                height: "18px",
                background: "rgba(255,255,255,0.22)",
                filter: "blur(8px)",
              }}
            />
            <span className={`${coreIconSize} relative z-10 mb-[2px]`}>💻</span>
            <span
              className="relative z-10 font-semibold tracking-[0.3px]"
              style={{ fontSize: coreLabelSize }}
            >
              CSK Core
            </span>
          </div>
        </div>

        {/* Node Cards */}
        {nodes.map((node) => {
          const cardVisible = progress > 0.6;
          return (
            <div
              key={node.id}
              className="absolute z-10 flex items-center gap-2 rounded-xl backdrop-blur-sm transition-all duration-500"
              style={{
                left: `${node.pos.x * 100}%`,
                top: `${node.pos.y * 100}%`,
                transform: "translate(-50%, -50%)",
                width: `${cardWidth}px`,
                padding: `${cardPadY} ${cardPadX}`,
                background: "rgba(255,255,255,0.05)",
                opacity: cardVisible ? 1 : 0,
                scale: cardVisible ? "1" : "0.85",
                boxShadow: cardVisible ? `0 0 20px ${node.color}22` : "none",
                border: `1px solid ${node.color}44`,
              }}
            >
              <div
                className={`${iconSize} rounded-full flex items-center justify-center flex-shrink-0`}
                style={{ background: `${node.color}22` }}
              >
                {node.icon}
              </div>
              <div className="min-w-0">
                <p
                  className="text-white font-semibold leading-tight truncate"
                  style={{ fontSize: labelSize }}
                >
                  {node.label}
                </p>
                <p
                  className="text-[#9aabb8] leading-tight mt-0.5"
                  style={{ fontSize: subSize }}
                >
                  {node.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}