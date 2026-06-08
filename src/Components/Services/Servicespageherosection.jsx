import { useEffect, useRef, useState } from "react";

// Pure CSS keyframes injected once
const STYLES = `
@keyframes heroFadeUp {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes heroFadeDown {
  from { opacity: 0; transform: translateY(-24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes heroScaleIn {   
  from { opacity: 0; transform: scale(0.55); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes heroSlideRight {
  from { opacity: 0; transform: translateX(-40px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes heroSlideLeft {
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes dividerGrow {
  from { width: 0px; opacity: 0; }
  to   { width: 48px; opacity: 0.7; }
}
@keyframes pillPop {
  0%   { opacity: 0; transform: scale(0.7) translateY(-10px); }
  70%  { transform: scale(1.06) translateY(0); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes dotPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(23,74,151,0.5); }
  50%       { box-shadow: 0 0 0 6px rgba(23,74,151,0); }
}
`;

function injectStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("hero-anim-styles")) return;
  const el = document.createElement("style");
  el.id = "hero-anim-styles";
  el.textContent = STYLES;
  document.head.appendChild(el);
}

export default function ServicesPageHeroSection() {
  const canvasRef = useRef(null);
  const [entered, setEntered] = useState(false);

  // Inject keyframes & trigger entrance
  useEffect(() => {
    injectStyles();
    // Tiny delay so browser paints once before animating
    const t = setTimeout(() => setEntered(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Canvas: animated mesh + orbs
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width  = (canvas.width  = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    let animId;
    // fade-in alpha for canvas (0→1 over ~800ms)
    let canvasAlpha = 0;

    const resize = () => {
      width  = canvas.width  = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);

    const orbs = [
      { x: width*0.85, y: height*0.18, r:180, color:"rgba(120,184,245,0.13)", vx:0.12, vy:0.08 },
      { x: width*0.90, y: height*0.50, r:80,  color:"rgba(100,160,240,0.10)", vx:-0.09,vy:0.10 },
      { x: width*0.07, y: height*0.75, r:175, color:"rgba(255,255,255,0.30)", vx:0.07, vy:-0.10},
      { x: width*0.18, y: height*0.85, r:65,  color:"rgba(200,220,255,0.22)", vx:-0.06,vy:0.07 },
      { x: width*0.50, y: height*0.10, r:55,  color:"rgba(120,184,245,0.08)", vx:0.05, vy:0.06 },
    ];
    const nodes = Array.from({ length: 18 }, () => ({
      x: Math.random()*width, y: Math.random()*height,
      vx:(Math.random()-0.5)*0.3, vy:(Math.random()-0.5)*0.3,
    }));

    const draw = () => {
      canvasAlpha = Math.min(1, canvasAlpha + 0.012);
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.globalAlpha = canvasAlpha;

      // mesh
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i+1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(100,160,230,${0.06*(1-dist/180)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, 1.5, 0, Math.PI*2);
        ctx.fillStyle = "rgba(100,150,230,0.15)";
        ctx.fill();
        nodes[i].x += nodes[i].vx; nodes[i].y += nodes[i].vy;
        if (nodes[i].x < 0 || nodes[i].x > width)  nodes[i].vx *= -1;
        if (nodes[i].y < 0 || nodes[i].y > height) nodes[i].vy *= -1;
      }

      // orbs
      orbs.forEach(orb => {
        const g = ctx.createRadialGradient(orb.x,orb.y,0,orb.x,orb.y,orb.r);
        g.addColorStop(0, orb.color);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI*2);
        ctx.fillStyle = g;
        ctx.fill();
        orb.x += orb.vx; orb.y += orb.vy;
        if (orb.x-orb.r < 0 || orb.x+orb.r > width)  orb.vx *= -1;
        if (orb.y-orb.r < 0 || orb.y+orb.r > height) orb.vy *= -1;
      });

      ctx.restore();
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  // Reusable animation style builder
  const anim = (name, delay = 0, duration = 0.65, easing = "cubic-bezier(.22,.68,0,1.2)") =>
    entered
      ? { animation: `${name} ${duration}s ${easing} ${delay}s both` }
      : { opacity: 0 };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: 420,
        background:
          "linear-gradient(130deg, #C8DFF8 0%, #D8EAF9 18%, #E6EFF7 42%, #EAF0F5 65%, #EAEEF2 85%, #E8ECF4 100%)",
      }}
    >
      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display:"block" }} />

      {/* ── Top-right circle cluster ── */}
      <div
        className="absolute pointer-events-none"
        style={{ top:28, right:36, ...anim("heroSlideLeft", 0.05, 0.9, "cubic-bezier(.22,.68,0,1.15)") }}
      >
        <div style={{ width:210, height:210, borderRadius:"50%",
          border:"1.5px solid rgba(120,184,245,0.30)",
          background:"radial-gradient(circle at 40% 38%, rgba(120,184,245,0.22) 0%, rgba(200,225,252,0.10) 60%, transparent 100%)",
          boxShadow:"inset 0 0 40px rgba(120,184,245,0.10)" }} />
        <div style={{ width:100, height:100, borderRadius:"50%",
          border:"1px solid rgba(120,184,245,0.20)", background:"rgba(180,215,250,0.12)",
          position:"absolute", top:52, left:52 }} />
        <div style={{ width:14, height:14, borderRadius:"50%",
          background:"rgba(100,160,240,0.40)", position:"absolute", top:14, left:14,
          boxShadow:"0 0 12px rgba(100,160,240,0.30)",
          animation:"dotPulse 2.4s ease-in-out 1.2s infinite" }} />
        <div style={{ width:62, height:62, borderRadius:"50%",
          border:"1px solid rgba(120,184,245,0.18)", background:"rgba(200,225,252,0.14)",
          position:"absolute", top:-20, left:-58 }} />
      </div>

      {/* ── Bottom-left circle cluster ── */}
      <div
        className="absolute pointer-events-none"
        style={{ bottom:18, left:28, ...anim("heroSlideRight", 0.1, 0.9, "cubic-bezier(.22,.68,0,1.15)") }}
      >
        <div style={{ width:200, height:200, borderRadius:"50%",
          border:"1.5px solid rgba(255,255,255,0.55)",
          background:"radial-gradient(circle at 55% 55%, rgba(255,255,255,0.45) 0%, rgba(200,220,245,0.15) 55%, transparent 100%)",
          boxShadow:"0 8px 32px rgba(120,184,245,0.08)" }} />
        <div style={{ width:90, height:90, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(200,218,248,0.20) 100%)",
          border:"1px solid rgba(255,255,255,0.60)", position:"absolute", top:56, left:56 }} />
        <div style={{ width:52, height:52, borderRadius:"50%",
          border:"1px solid rgba(120,184,245,0.22)", background:"rgba(220,235,252,0.18)",
          position:"absolute", top:-16, left:140 }} />
        <div style={{ width:10, height:10, borderRadius:"50%",
          background:"rgba(120,184,245,0.50)", position:"absolute", top:8, left:170,
          boxShadow:"0 0 8px rgba(120,184,245,0.35)",
          animation:"dotPulse 2.8s ease-in-out 1.5s infinite" }} />
      </div>

      {/* Diagonal accent lines */}
      <svg className="absolute pointer-events-none"
        style={{ top:0, left:0, width:320, height:180, opacity:0.18 }}
        viewBox="0 0 320 180">
        <line x1="0" y1="0" x2="320" y2="180" stroke="#78B8F5" strokeWidth="1"/>
        <line x1="30" y1="0" x2="320" y2="150" stroke="#78B8F5" strokeWidth="0.5"/>
      </svg>

      {/* ── Content ── */}
      <div
        className="relative z-10 mx-auto px-6 text-center flex flex-col items-center justify-center"
        style={{ maxWidth:860, paddingTop:90, paddingBottom:90 }}
      >
        {/* Pill — pops in first */}
        <div style={{
          display:"inline-flex", alignItems:"center", gap:8,
          background:"rgba(120,184,245,0.14)",
          border:"1px solid rgba(120,184,245,0.30)",
          borderRadius:999, padding:"5px 16px", marginBottom:24,
          ...anim("pillPop", 0.18, 0.55, "cubic-bezier(.22,.68,0,1.4)")
        }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:"#174A97",
            display:"inline-block", animation:"dotPulse 2s ease-in-out 2s infinite" }} />
          <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.13em",
            color:"#174A97", textTransform:"uppercase" }}>
            All Services
          </span>
        </div>

        {/* Heading line 1 */}
        <div style={anim("heroFadeDown", 0.32, 0.7, "cubic-bezier(.22,.68,0,1.1)")}>
          <h1 style={{
            fontSize:"clamp(38px,5vw,52px)", fontWeight:800, color:"#0F3872",
            lineHeight:1.1, letterSpacing:"-0.03em", fontFamily:"'Georgia', serif",
            marginBottom:0,
          }}>
            Everything Your IT Needs,
          </h1>
        </div>

        {/* Heading line 2 — slight extra delay → stagger effect */}
        <div style={anim("heroFadeUp", 0.46, 0.7, "cubic-bezier(.22,.68,0,1.1)")}>
          <h1 style={{
            fontSize:"clamp(38px,5vw,52px)", fontWeight:800,
            lineHeight:1.2, letterSpacing:"-0.03em", fontFamily:"'Georgia', serif",
            background:"linear-gradient(95deg, #174A97 20%, #4A90D9 80%)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          }}>
            One Partner.
          </h1>
        </div>

        {/* Divider — grows from center */}
        <div style={{
          height:3, borderRadius:99,
          background:"linear-gradient(90deg, #78B8F5, #174A97)",
          margin:"22px auto",
          ...(entered
            ? { animation:`dividerGrow 0.55s cubic-bezier(.22,.68,0,1.2) 0.72s both` }
            : { width:0, opacity:0 }),
        }} />

        {/* Description */}
        <p style={{
          fontSize:"clamp(14px,1.2vw,17px)", color:"#3A506B",
          lineHeight:1.75, maxWidth:700, margin:"0 auto",
          ...anim("heroFadeUp", 0.82, 0.65, "ease-out"),
        }}>
          From infrastructure management and cloud migration to AV solutions
          and corporate training — CSK delivers end-to-end technology services
          that keep your business secure, efficient, and ready for what's next.
        </p>
      </div>
    </section>
  );
}

