// ─── AllServicesWithNav.jsx ───────────────────────────────────────────────────
// Responsive + touch-friendly version
// • Single-column on mobile, bento grid on desktop
// • Hover effects replaced with :active + touch state so they work on mobile
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from "react";

/* ─── Keyframes + responsive CSS ───────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap');

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(28px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes filterPop {
    from { opacity:0; transform:scale(0.85) translateY(-8px); }
    to   { opacity:1; transform:scale(1) translateY(0); }
  }
  @keyframes cardReveal {
    from { opacity:0; transform:translateY(36px) scale(0.97); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }
  @keyframes orbFloat {
    0%,100% { transform:translateY(0px) scale(1); }
    50%      { transform:translateY(-10px) scale(1.04); }
  }
  @keyframes tagSlide {
    from { opacity:0; transform:translateX(-10px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes pulseRing {
    0%   { box-shadow: 0 0 0 0 rgba(120,184,245,0.35); }
    70%  { box-shadow: 0 0 0 10px rgba(120,184,245,0); }
    100% { box-shadow: 0 0 0 0 rgba(120,184,245,0); }
  }

  /* ── Service card touch/hover ── */
  .svc-card {
    transition: transform 0.28s cubic-bezier(.22,.68,0,1.2), box-shadow 0.28s ease;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
  .svc-card.dark-card:hover,
  .svc-card.dark-card:active,
  .svc-card.dark-card.touch-active {
    transform: translateY(-4px) scale(1.012);
    box-shadow: 0 16px 56px rgba(14,39,84,0.45) !important;
  }
  .svc-card.light-card:hover,
  .svc-card.light-card:active,
  .svc-card.light-card.touch-active {
    transform: translateY(-4px) scale(1.012);
    box-shadow: 0 8px 32px rgba(23,74,151,0.14) !important;
  }

  /* ── Arrow button touch/hover ── */
  .arrow-btn {
    transition: background 0.2s, transform 0.2s;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
  .arrow-btn.dark-btn:hover,
  .arrow-btn.dark-btn:active,
  .arrow-btn.dark-btn.touch-active {
    background: rgba(255,255,255,0.22) !important;
    transform: scale(1.12);
  }
  .arrow-btn.light-btn:hover,
  .arrow-btn.light-btn:active,
  .arrow-btn.light-btn.touch-active {
    background: rgba(23,74,151,0.15) !important;
    transform: scale(1.12);
  }

  /* ── Filter pill touch/hover ── */
  .filter-btn {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    transition: all 0.2s cubic-bezier(.22,.68,0,1.2);
  }
  .filter-btn:not(.active):hover,
  .filter-btn:not(.active):active {
    background: rgba(23,74,151,0.07) !important;
    color: #174A97 !important;
  }

  /* ── Filter scroll container ── */
  .filter-scroll {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding-bottom: 4px;
  }
  .filter-scroll::-webkit-scrollbar { display: none; }
  .filter-scroll .filter-btn { flex-shrink: 0; }

  /* ── Responsive grid rows ── */
  .grid-row-2-1  { display: grid; grid-template-columns: 2fr 1fr;  gap: 20px; }
  .grid-row-5-7  { display: grid; grid-template-columns: 5fr 7fr;  gap: 20px; align-items: stretch; }
  .grid-row-1-2  { display: grid; grid-template-columns: 1fr 2fr;  gap: 20px; }
  .grid-row-half { display: grid; grid-template-columns: 1fr 1fr;  gap: 20px; }

  @media (max-width: 768px) {
    .grid-row-2-1,
    .grid-row-5-7,
    .grid-row-1-2,
    .grid-row-half {
      grid-template-columns: 1fr !important;
    }
    /* Hide the empty placeholder cell on mobile */
    .grid-placeholder { display: none; }
  }

  /* Orbit / VR visuals: scale down on mobile */
  @media (max-width: 540px) {
    .visual-orbit, .visual-vr { display: none; }
    .integration-dots-wrap { display: none; }
  }

  /* Section padding */
  @media (max-width: 480px) {
    .services-section { padding: 48px 0 56px !important; }
    .services-inner   { padding: 0 16px !important; }
    .section-header   { margin-bottom: 28px !important; }
  }
`;

function injectStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("all-services-styles")) return;
  const el = document.createElement("style");
  el.id = "all-services-styles";
  el.textContent = STYLES;
  document.head.appendChild(el);
}

/* ─── Service Data ───────────────────────────────────────────── */
const SERVICES = [
  {
    id: "01", slug: "infra-managed", label: "Infra Managed",
    title: "Infrastructure Managed Services",
    desc: "At CSK, we offer comprehensive Infrastructure Managed Services designed to streamline and optimize your IT operations. From network management to cloud services — your systems stay secure, reliable, and efficient around the clock.",
    tags: ["Network Management", "Server Management", "Data Center", "Strategic IT Planning"],
    cta: "EXPLORE INFRA MANAGED",
    accent: "#1B3F7A", iconBg: "rgba(255,255,255,0.12)", iconColor: "#fff",
    dark: true, size: "large", visual: "orbit",
  },
  {
    id: "02", slug: "it-outsourcing", label: "IT Outsourcing",
    title: "IT Outsourcing",
    desc: "Our team of skilled IT professionals acts as an extension of your in-house team — managing critical infrastructure, applications, and ongoing IT needs. Overcoming Challenges, Achieving Dreams.",
    tags: ["Managed IT Service", "Cloud Solutions", "IT Helpdesk", "Cybersecurity"],
    cta: "EXPLORE IT OUTSOURCING",
    accent: "#FFFFFF", iconBg: "rgba(23,74,151,0.10)", iconColor: "#174A97",
    dark: false, size: "normal", visual: null,
  },
  {
    id: "03", slug: "break-fix", label: "Break Fix",
    title: "Break Fix Services",
    desc: "Unexpected system issues can disrupt your business. Our Break-Fix Services provide immediate, expert assistance to diagnose and resolve technical problems — on-site and remote — with minimal downtime.",
    tags: ["Hardware Fix", "Network Troubleshooting", "Preventive Measures"],
    cta: "EXPLORE BREAK FIX",
    accent: "#FFFFFF", iconBg: "rgba(234,109,36,0.12)", iconColor: "#EA6D24",
    dark: false, size: "normal", visual: null,
  },
  {
    id: "04", slug: "system-integration", label: "System Integration",
    title: "System Integration",
    desc: "Experience the power of unified systems. At CSK, we seamlessly integrate diverse systems — driving innovation, enhancing productivity, and streamlining your operations. We connect the dots for a connected future.",
    tags: ["Middleware Solutions", "Data Integration", "LAN/WAN", "Security & Compliance", "Testing & Validation"],
    cta: "EXPLORE SYSTEM INTEGRATION",
    accent: "#FFFFFF", iconBg: "rgba(23,74,151,0.10)", iconColor: "#174A97",
    dark: false, size: "row2wide", visual: "integrationDots",
  },
  {
    id: "05", slug: "av-solutions", label: "AV Solutions",
    title: "AV Solutions",
    desc: "Comprehensive audio-visual solutions covering design, installation, maintenance, and support. Custom AV systems for presentations, conferences, boardrooms, smart classrooms, and events.",
    tags: ["Conference Room", "Interactive Display", "Home Theater", "AV Maintenance"],
    cta: "EXPLORE AV SOLUTIONS",
    accent: "#FFFFFF", iconBg: "rgba(23,74,151,0.10)", iconColor: "#174A97",
    dark: false, size: "normal", visual: null,
  },
  {
    id: "06", slug: "ar-vr", label: "AR & VR Devices",
    title: "AR & VR Devices",
    desc: "Step into the future of immersive enterprise technology. CSK delivers end-to-end AR and VR device solutions — from hardware procurement to custom environment setup — transforming how your teams train, collaborate, and engage.",
    tags: ["Enterprise VR Training", "AR Visualization", "Device Procurement", "Custom Environments", "Remote Collaboration"],
    cta: "EXPLORE AR & VR",
    accent: "#2B1C6B", iconBg: "rgba(168,130,255,0.25)", iconColor: "#C4A8FF",
    dark: true, size: "large", visual: "vrOrbs",
  },
  {
    id: "07", slug: "corporate-training", label: "Corporate Training",
    title: "Corporate Training",
    desc: "Customized corporate training solutions designed to empower your workforce, enhance productivity, and drive business success. From compliance training to leadership development and technical skills programs.",
    tags: ["Leadership Dev.", "Technical Skills", "Compliance Training"],
    cta: "EXPLORE CORPORATE TRAINING",
    accent: "#FFFFFF", iconBg: "rgba(34,139,80,0.12)", iconColor: "#228B50",
    dark: false, size: "normal", visual: null,
  },
];

const FILTERS = ["All","Infra Managed","IT Outsourcing","Break Fix","System Integration","AV Solutions","Corporate Training","AR & VR Devices"];

/* ─── Icons ──────────────────────────────────────────────────── */
const icons = {
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:22,height:22}}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  code:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:22,height:22}}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  wrench: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:22,height:22}}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  git:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:22,height:22}}><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>,
  monitor:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:22,height:22}}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  vr:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:22,height:22}}><path d="M2 8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8z"/><circle cx="9" cy="12" r="2"/><circle cx="15" cy="12" r="2"/></svg>,
  graduation:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:22,height:22}}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  arrow:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>,
};
const SERVICE_ICONS = ["shield","code","wrench","git","monitor","vr","graduation"];

/* ─── Orbit Visual ───────────────────────────────────────────── */
function OrbitVisual() {
  const items = [
    { text:"24/7\nMonitoring", top:10, left:20 },
    { text:"Cloud\nReady", top:10, right:10 },
    { text:"Cyber\nSecurity", bottom:25, left:10 },
    { text:"Backup &\nRecovery", bottom:25, right:10 },
  ];
  return (
    <div className="visual-orbit" style={{ position:"relative", width:280, height:220, flexShrink:0 }}>
      <div style={{ position:"absolute", top:"50%", left:"50%", width:140, height:140, borderRadius:"50%", transform:"translate(-50%,-50%)", background:"radial-gradient(circle, rgba(72,129,255,.45) 0%, rgba(72,129,255,.08) 60%, transparent 100%)", filter:"blur(12px)" }}/>
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:110, height:110, borderRadius:"50%", background:"linear-gradient(135deg,#1E4ED8 0%, #133B8F 100%)", border:"1px solid rgba(255,255,255,0.15)", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", color:"#fff", boxShadow:"0 0 35px rgba(59,130,246,.35)" }}>
        <div style={{ fontSize:34 }}>🛡️</div>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:".08em", marginTop:4 }}>MANAGED</div>
      </div>
      {items.map((item, i) => (
        <div key={i} style={{ position:"absolute", ...item, width:78, height:78, borderRadius:"50%", background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.14)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", textAlign:"center", color:"rgba(255,255,255,.85)", fontSize:10, fontWeight:600, lineHeight:1.3, whiteSpace:"pre-line", animation:`orbFloat ${2+i*0.5}s ease-in-out infinite` }}>
          {item.text}
        </div>
      ))}
      <div style={{ position:"absolute", bottom:-2, left:0, right:0, display:"flex", justifyContent:"space-between", color:"rgba(255,255,255,.55)", fontSize:10, fontWeight:600 }}>
        <span>99.9% Uptime</span><span>ISO Certified</span><span>500+ Devices</span>
      </div>
    </div>
  );
}

/* ─── VR Orbs Visual ─────────────────────────────────────────── */
function VrOrbsVisual() {
  return (
    <div className="visual-vr" style={{ position:"relative", width:220, height:160, flexShrink:0 }}>
      {[["Augmented Reality","top:8px;left:10px"],["Virtual Reality","top:8px;right:10px"]].map(([label,pos],i)=>(
        <div key={i} style={{ position:"absolute", ...Object.fromEntries(pos.split(";").filter(Boolean).map(p=>p.split(":").map(s=>s.trim()))), fontSize:9, fontWeight:600, color:"rgba(255,255,255,0.6)", letterSpacing:"0.04em" }}>{label}</div>
      ))}
      <div style={{ position:"absolute", top:"42%", left:"50%", transform:"translate(-50%,-50%)", display:"flex", gap:6, alignItems:"center" }}>
        {[["rgba(120,80,230,0.7)",52],["rgba(80,120,250,0.6)",44],["rgba(160,80,255,0.65)",52],["rgba(220,160,80,0.8)",14]].map(([color,size],i)=>(
          <div key={i} style={{ width:size, height:size, borderRadius:"50%", background:color, filter:"blur(2px)", animation:`orbFloat ${2.5+i*0.4}s ease-in-out ${i*0.3}s infinite` }}/>
        ))}
      </div>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, display:"flex", justifyContent:"space-around", fontSize:8, color:"rgba(255,255,255,0.45)", fontWeight:500 }}>
        {["Training","Collaboration","Simulation","Visualization"].map(l=><span key={l}>{l}</span>)}
      </div>
    </div>
  );
}

/* ─── Integration Dots Visual ────────────────────────────────── */
function IntegrationDotsVisual() {
  const nodes = [
    {label:"Solution\nBased", x:10, y:30, accent:false},
    {label:"Systems\nIntegration", x:100, y:55, accent:false, main:true},
    {label:"Maximum\nReturn on\nInvestment", x:190, y:30, accent:false},
    {label:"Best-of-Breed\nProcesses", x:20, y:130, accent:false},
    {label:"On-time,\nHigh-Quality", x:200, y:130, accent:true},
  ];
  return (
    <div style={{ position:"relative", width:310, height:170 }}>
      <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%" }} viewBox="0 0 310 170">
        {[[0,1],[1,2],[1,3],[1,4],[3,4]].map(([a,b],i)=>(
          <line key={i} x1={nodes[a].x+30} y1={nodes[a].y+22} x2={nodes[b].x+30} y2={nodes[b].y+22} stroke="rgba(23,74,151,0.18)" strokeWidth="1" strokeDasharray="4 3"/>
        ))}
      </svg>
      {nodes.map((n,i)=>(
        <div key={i} style={{ position:"absolute", left:n.x, top:n.y, width:60, height:44, borderRadius:8, background: n.accent?"linear-gradient(135deg,#F4813A,#E05A1A)":n.main?"rgba(23,74,151,0.08)":"rgba(23,74,151,0.05)", border:n.main?"1.5px solid rgba(23,74,151,0.20)":"1px solid rgba(23,74,151,0.10)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:7, fontWeight:600, color:n.accent?"#fff":"#1B3F7A", textAlign:"center", lineHeight:1.4, whiteSpace:"pre-line" }}>
          {n.label}
        </div>
      ))}
    </div>
  );
}

/* ─── useTouchActive hook ────────────────────────────────────── */
// Returns ref + className. Adds "touch-active" on touchstart, removes on end/cancel.
function useTouchActive(baseClass) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const on  = () => setActive(true);
    const off = () => setActive(false);
    el.addEventListener("touchstart", on,  { passive: true });
    el.addEventListener("touchend",   off, { passive: true });
    el.addEventListener("touchcancel",off, { passive: true });
    return () => {
      el.removeEventListener("touchstart", on);
      el.removeEventListener("touchend",   off);
      el.removeEventListener("touchcancel",off);
    };
  }, []);

  return { ref, className: `${baseClass}${active ? " touch-active" : ""}` };
}

/* ─── Single Card ────────────────────────────────────────────── */
function ServiceCard({ service, index, visible, onServiceClick }) {
  const isDark = service.dark;
  const iconKey = SERVICE_ICONS[index];

  const { ref: cardRef, className: cardClass } = useTouchActive(
    `svc-card ${isDark ? "dark-card" : "light-card"}`
  );
  const { ref: btnRef, className: btnClass } = useTouchActive(
    `arrow-btn ${isDark ? "dark-btn" : "light-btn"}`
  );

  const isWide = service.size === "large" || service.size === "row2wide";

  return (
    <div
      ref={cardRef}
      className={cardClass}
      onClick={() => onServiceClick && onServiceClick(service.slug)}
      style={{
        borderRadius: 16,
        padding: "28px 28px 24px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        animation: visible ? `cardReveal 0.6s cubic-bezier(.22,.68,0,1.1) ${0.08*index}s both` : "none",
        opacity: visible ? undefined : 0,
        ...(isDark ? {
          background: "linear-gradient(135deg,#0E2754 0%,#1B3F7A 40%,#1A3A70 100%)",
          boxShadow: "0 8px 40px rgba(14,39,84,0.35)",
          color: "#fff",
        } : {
          background: "#fff",
          boxShadow: "0 2px 16px rgba(23,74,151,0.07)",
          border: "1px solid rgba(23,74,151,0.08)",
          color: "#0F1F3D",
        }),
      }}
    >
      {isDark && (
        <div style={{ position:"absolute",inset:0,borderRadius:16,pointerEvents:"none",background:"radial-gradient(ellipse at 75% 20%, rgba(255,255,255,0.05) 0%, transparent 60%)" }}/>
      )}

      {/* top: number + label */}
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
        <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.06em", color:isDark?"rgba(255,255,255,0.40)":"rgba(23,74,151,0.40)", fontFamily:"'Manrope',sans-serif" }}>{service.id}</span>
        <span style={{ fontSize:11, fontWeight:600, letterSpacing:"0.07em", color:isDark?"rgba(255,255,255,0.45)":"rgba(23,74,151,0.50)", fontFamily:"'Manrope',sans-serif", textTransform:"uppercase" }}>{service.label}</span>
      </div>

      {/* main row — on mobile always column, on desktop follow size */}
      <div style={{
        display: "flex",
        flexDirection: isWide ? "row" : "column",
        gap: isWide ? 24 : 0,
        flex: 1,
        alignItems: service.size === "row2wide" ? "flex-start" : undefined,
        flexWrap: "wrap",   // lets visuals drop below on narrow cards
      }}>
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          {/* icon */}
          <div style={{ width:44, height:44, borderRadius:10, background:service.iconBg, border:isDark?"1px solid rgba(255,255,255,0.15)":`1px solid ${service.iconColor}22`, display:"flex", alignItems:"center", justifyContent:"center", color:service.iconColor, marginBottom:16, flexShrink:0, animation:"pulseRing 3s ease-in-out infinite" }}>
            {icons[iconKey]}
          </div>
          <h3 style={{ fontSize: service.size==="large" ? "clamp(15px,1.5vw,20px)" : 16, fontWeight:700, lineHeight:1.25, marginBottom:10, fontFamily:"'Bricolage Grotesque',sans-serif", color:isDark?"#fff":"#0B1F3A" }}>
            {service.title}
          </h3>
          <p style={{ fontSize:13, lineHeight:1.7, marginBottom:18, color:isDark?"rgba(255,255,255,0.62)":"#4A5A70", fontFamily:"'Manrope',sans-serif", flex:1 }}>
            {service.desc}
          </p>
        </div>

        {service.size==="large" && service.visual==="orbit" && (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <OrbitVisual/>
          </div>
        )}
        {service.size==="large" && service.visual==="vrOrbs" && (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <VrOrbsVisual/>
          </div>
        )}
        {service.size==="row2wide" && service.visual==="integrationDots" && (
          <div className="integration-dots-wrap" style={{ flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(23,74,151,0.03)", border:"1px solid rgba(23,74,151,0.07)", borderRadius:12, padding:"15px 16px", minWidth:260, overflowX:"auto" }}>
            <IntegrationDotsVisual/>
          </div>
        )}
      </div>

      {/* tags */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:20 }}>
        {service.tags.map((tag,ti)=>(
          <span key={ti} style={{ fontSize:10.5, fontWeight:600, padding:"4px 10px", borderRadius:999, background:isDark?"rgba(255,255,255,0.10)":"rgba(23,74,151,0.07)", border:isDark?"1px solid rgba(255,255,255,0.14)":"1px solid rgba(23,74,151,0.12)", color:isDark?"rgba(255,255,255,0.75)":"#174A97", fontFamily:"'Manrope',sans-serif", letterSpacing:"0.03em", animation:visible?`tagSlide 0.4s ease ${0.08*index+0.05*ti+0.3}s both`:"none" }}>
            {tag}
          </span>
        ))}
      </div>

      {/* CTA row */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:16, borderTop:isDark?"1px solid rgba(255,255,255,0.10)":"1px solid rgba(23,74,151,0.07)", marginTop:"auto" }}>
        <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.10em", color:isDark?"rgba(255,255,255,0.55)":"#174A97", fontFamily:"'Manrope',sans-serif" }}>
          {service.cta}
        </span>
        <button
          ref={btnRef}
          className={btnClass}

          style={{
            width:36, height:36, borderRadius:"50%",
            background: isDark ? "rgba(255,255,255,0.12)" : "rgba(23,74,151,0.08)",
            border: isDark ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(23,74,151,0.14)",
            display:"flex", alignItems:"center", justifyContent:"center",
            color: isDark ? "rgba(255,255,255,0.7)" : "#174A97",
            cursor:"pointer",
            flexShrink: 0,
          }}
        >
          {icons.arrow}
        </button>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function AllServicesWithNav({ onServiceClick }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    injectStyles();
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }   // lower threshold so mobile triggers sooner
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const filteredServices = activeFilter === "All"
    ? SERVICES
    : SERVICES.filter(s =>
        s.label.toLowerCase().includes(activeFilter.toLowerCase()) ||
        activeFilter.toLowerCase().includes(s.label.toLowerCase())
      );

  const show = (id) => filteredServices.some(s => s.id === id);

  return (
    <section
      ref={sectionRef}
      className="services-section"
      style={{ background:"#F2F6FB", padding:"72px 0 80px", fontFamily:"'Manrope', sans-serif" }}
    >
      <div className="services-inner" style={{ maxWidth:1250, margin:"0 auto", padding:"0 28px" }}>

        {/* Section Header */}
        <div className="section-header" style={{ display:"flex", flexDirection:"column", gap:0, marginBottom:44 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20, animation:visible?"fadeUp 0.5s ease 0.05s both":"none", opacity:visible?undefined:0 }}>
            <div style={{ width:28, height:2, background:"#174A97", borderRadius:2 }}/>
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.14em", color:"#174A97", textTransform:"uppercase", fontFamily:"'Manrope',sans-serif" }}>ALL SERVICES</span>
          </div>
          <div style={{ display:"flex", alignItems:"flex-start", gap:24, flexWrap:"wrap", justifyContent:"space-between" }}>
            <h2 style={{ fontSize:"clamp(24px,3.5vw,42px)", fontWeight:800, color:"#0B1F3A", lineHeight:1.15, margin:0, fontFamily:"'Bricolage Grotesque',sans-serif", letterSpacing:"-0.025em", maxWidth:380, animation:visible?"fadeUp 0.55s ease 0.12s both":"none", opacity:visible?undefined:0 }}>
              Seven pillars of<br/>enterprise IT<br/>excellence
            </h2>
            <div style={{ flex:1, minWidth:260, maxWidth:520, background:"rgba(255,255,255,0.85)", border:"1.5px solid rgba(23,74,151,0.14)", borderLeft:"4px solid #174A97", borderRadius:"0 10px 10px 0", padding:"16px 20px", animation:visible?"fadeUp 0.55s ease 0.22s both":"none", opacity:visible?undefined:0 }}>
              <p style={{ fontSize:13.5, lineHeight:1.75, color:"#3A4F6A", margin:0, fontFamily:"'Manrope',sans-serif" }}>
                Every service is delivered by CSK's certified professionals — with ISO 9001:2008 quality standards and ISO/IEC 27001:2013 security benchmarks guaranteed across all engagements.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Pills — horizontally scrollable on mobile */}
        <div
          className="filter-scroll"
          style={{ marginBottom:36, animation:visible?"fadeUp 0.5s ease 0.3s both":"none", opacity:visible?undefined:0 }}
        >
          {FILTERS.map((f, fi) => {
            const isActive = activeFilter === f;
            return (
              <button
                key={f}
                className={`filter-btn${isActive ? " active" : ""}`}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding:"8px 16px", borderRadius:999, border:"none", cursor:"pointer",
                  fontSize:12, fontWeight:600, fontFamily:"'Manrope',sans-serif",
                  letterSpacing:"0.02em",
                  background: isActive ? "#174A97" : "rgba(255,255,255,0.9)",
                  color: isActive ? "#fff" : "#4A5A70",
                  boxShadow: isActive ? "0 4px 16px rgba(23,74,151,0.28)" : "0 1px 4px rgba(0,0,0,0.06)",
                  border: isActive ? "none" : "1px solid rgba(23,74,151,0.10)",
                  transform: isActive ? "scale(1.04)" : "scale(1)",
                  animation: visible ? `filterPop 0.4s cubic-bezier(.22,.68,0,1.3) ${0.32+fi*0.04}s both` : "none",
                  // Make tap targets large enough on mobile
                  minHeight: 38,
                }}
              >{f}</button>
            );
          })}
        </div>

        {/* Cards Grid */}
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

          {(activeFilter==="All" || activeFilter==="Infra Managed" || activeFilter==="IT Outsourcing") && (
            <div className="grid-row-2-1">
              {filteredServices.filter(s=>s.id==="01").map(s=><ServiceCard key={s.id} service={s} index={0} visible={visible} onServiceClick={onServiceClick}/>)}
              {filteredServices.filter(s=>s.id==="02").map(s=><ServiceCard key={s.id} service={s} index={1} visible={visible} onServiceClick={onServiceClick}/>)}
            </div>
          )}

          {(activeFilter==="All" || activeFilter==="Break Fix" || activeFilter==="System Integration") && (
            <div className="grid-row-5-7">
              {filteredServices.filter(s=>s.id==="03").map(s=><ServiceCard key={s.id} service={s} index={2} visible={visible} onServiceClick={onServiceClick}/>)}
              {filteredServices.filter(s=>s.id==="04").map(s=><ServiceCard key={s.id} service={s} index={3} visible={visible} onServiceClick={onServiceClick}/>)}
            </div>
          )}

          {(activeFilter==="All" || activeFilter==="AV Solutions" || activeFilter==="AR & VR Devices") && (
            <div className="grid-row-1-2">
              {filteredServices.filter(s=>s.id==="05").map(s=><ServiceCard key={s.id} service={s} index={4} visible={visible} onServiceClick={onServiceClick}/>)}
              {filteredServices.filter(s=>s.id==="06").map(s=><ServiceCard key={s.id} service={s} index={5} visible={visible} onServiceClick={onServiceClick}/>)}
            </div>
          )}

          {(activeFilter==="All" || activeFilter==="Corporate Training") && (
            <div className="grid-row-half">
              {filteredServices.filter(s=>s.id==="07").map(s=><ServiceCard key={s.id} service={s} index={6} visible={visible} onServiceClick={onServiceClick}/>)}
              <div className="grid-placeholder"/>
            </div>
          )}

          {/* Single filtered result */}
          {activeFilter !== "All" && filteredServices.length === 1 && (
            <div style={{ maxWidth: 560 }}>
              <ServiceCard service={filteredServices[0]} index={0} visible={visible} onServiceClick={onServiceClick}/>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}