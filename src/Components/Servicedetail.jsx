import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { SERVICES_DATA } from "./Servicesdata";




/* ─────────────────────────────────────────────────────────────────────────────
   ServiceDetail.jsx
   One template that renders any of the 7 CSK service pages.

   USAGE (React Router example):
     <Route path="/services/:slug" element={<ServiceDetail />} />

   STANDALONE (for demo / preview):
     Pass `serviceData` prop directly:
     <ServiceDetail serviceData={SERVICES_DATA["infra-managed"]} />
─────────────────────────────────────────────────────────────────────────────── */

/* ── Keyframe Injection ────────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=Manrope:wght@400;500;600;700&display=swap');

  @keyframes sdFadeUp   { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes sdFadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes sdSlideR   { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
  @keyframes sdSlideL   { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
  @keyframes sdFloat    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes sdCountUp  { from{opacity:0;transform:scale(.75)} to{opacity:1;transform:scale(1)} }
  @keyframes sdBarGrow  { from{width:0} to{width:var(--w)} }
  @keyframes sdPulse    { 0%,100%{box-shadow:0 0 0 0 rgba(23,74,151,.3)} 50%{box-shadow:0 0 0 8px rgba(23,74,151,0)} }
  @keyframes sdRotate   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes sdDotBlink { 0%,80%,100%{opacity:.2} 40%{opacity:1} }

  .sd-hero-btn:hover   { background:#0F3A80!important; transform:translateY(-2px)!important; box-shadow:0 8px 24px rgba(23,74,151,.4)!important; }
  .sd-card:hover       { transform:translateY(-5px)!important; box-shadow:0 12px 36px rgba(23,74,151,.15)!important; }
  .sd-back-btn:hover   { background:rgba(23,74,151,.08)!important; color:#174A97!important; }
  .sd-stat-card:hover  { transform:translateY(-4px) scale(1.03)!important; }

  .sd-section-label {
    display:inline-flex; align-items:center; gap:8px;
    font-size:11px; font-weight:700; letter-spacing:.14em;
    color:#174A97; text-transform:uppercase;
    font-family:'Manrope',sans-serif; margin-bottom:14px;
  }
  .sd-section-label::before {
    content:''; display:block; width:24px; height:2px;
    background:#174A97; border-radius:2px;
  }

  /* ── Responsive: layout helpers ─────────────────────────────────────────── */
  .sd-root { overflow-x: hidden; }

  .sd-container {
    max-width: 1200px; margin: 0 auto; padding: 0 32px; box-sizing: border-box;
  }

  .sd-section-pad { padding: 72px 0; }

  .sd-split-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }

  .sd-card-grid {
    display: grid;
    gap: 20px;
  }

  .sd-stats-row {
    display: grid;
    gap: 1px;
    background: rgba(23,74,151,0.08);
    border-radius: 14px;
    overflow: hidden;
  }

  .sd-diagram-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .sd-diagram-wrap > * {
    max-width: 100%;
  }

  /* Tablet */
  @media (max-width: 968px) {
    .sd-container { padding: 0 24px; }
    .sd-section-pad { padding: 56px 0; }
    .sd-split-grid {
      grid-template-columns: 1fr !important;
      direction: ltr !important;
      gap: 36px;
    }
    .sd-card-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    .sd-stats-row {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }

  /* Mobile */
  @media (max-width: 640px) {
    .sd-container { padding: 0 18px; }
    .sd-section-pad { padding: 44px 0; }
    .sd-split-grid { gap: 28px; }
    .sd-card-grid {
      grid-template-columns: 1fr !important;
    }
    .sd-stats-row {
      grid-template-columns: 1fr !important;
    }
    .sd-hero-wrap {
      min-height: 320px !important;
      padding: 90px 18px 32px !important;
    }
    .sd-back-btn {
      top: 16px !important;
      left: 16px !important;
      padding: 7px 12px !important;
      font-size: 11px !important;
    }
    .sd-we-believe { padding: 48px 18px !important; }
  }
`;

function injectCSS() {
  if (typeof document === "undefined") return;
  if (document.getElementById("sd-styles")) return;
  const el = document.createElement("style");
  el.id = "sd-styles";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* ── Responsive helper hook ──────────────────────────────────────────────── */
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => setIsMobile(window.innerWidth <= breakpoint);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isMobile;
}

/* ── Colour palette ─────────────────────────────────────────────────────────── */
const NAVY    = "#0B1F3A";
const BLUE    = "#174A97";
const LBBLUE  = "#F2F6FB";
const WHITE   = "#FFFFFF";
const MUTED   = "#4A5A70";
const ACCENT  = "#EA6D24";

/* ── SVG Icons ──────────────────────────────────────────────────────────────── */
function Icon({ name, size = 20, color = BLUE }) {
  const s = { width: size, height: size };
  const paths = {
    chart:     <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    roadmap:   <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></>,
    dollar:    <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
    vendor:    <><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></>,
    facility:  <><rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>,
    server:    <><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></>,
    network:   <><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><line x1="12" y1="8" x2="5" y2="16"/><line x1="12" y1="8" x2="19" y2="16"/></>,
    disaster:  <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    cloud:     <><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></>,
    optimize:  <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    storage:   <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>,
    database:  <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>,
    lock:      <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    shield:    <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    audit:     <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>,
    testing:   <><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></>,
    display:   <><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>,
    monitor:   <><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>,
    outdoor:   <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
    wayfind:   <><polygon points="3 11 22 2 13 21 11 13 3 11"/></>,
    clock:     <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    headset:   <><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></>,
    wrench:    <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></>,
    upgrade:   <><polyline points="17 11 12 6 7 11"/><line x1="12" y1="6" x2="12" y2="18"/></>,
    globe:     <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    wifi:      <><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></>,
    speed:     <><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></>,
    firewall:  <><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></>,
    switch:    <><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></>,
    report:    <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
    ar:        <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></>,
    floor:     <><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></>,
    collab:    <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    maintain:  <><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93L17.66 6.34"/><path d="M4.93 4.93L6.34 6.34"/><path d="M14.12 2H9.88a2 2 0 0 0-1.73 1L7 5"/><path d="M17 5l-1.15-2a2 2 0 0 0-1.73-1H9.88"/><circle cx="12" cy="12" r="10"/></>,
    vr:        <><path d="M2 8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8z"/><circle cx="9" cy="12" r="2"/><circle cx="15" cy="12" r="2"/></>,
    code:      <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
    data:      <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>,
    cyber:     <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    project:   <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    virtual:   <><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>,
    elearning: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>,
    onsite:    <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
    blended:   <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    arrow:     <><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></>,
    back:      <><polyline points="15 18 9 12 15 6"/></>,
    default:   <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></>,
  };

  const d = paths[name] || paths.default;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" style={s}>
      {d}
    </svg>
  );
}

/* ── Server Diagram (Infra Managed Section 03) ───────────────────────────────── */
function ServerDiagram() {
  return (
    <div style={{
      width: "100%", maxWidth: 320,
      background: WHITE, border: `1px solid rgba(23,74,151,0.10)`,
      borderRadius: 14, padding: "20px 24px",
      boxShadow: "0 4px 20px rgba(23,74,151,0.08)",
      boxSizing: "border-box",
    }}>
      {/* Center box */}
      <div style={{
        background: "#F2F6FB", border: `1px solid rgba(23,74,151,0.12)`,
        borderRadius: 10, padding: "12px 16px", marginBottom: 16,
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8,
          background: `rgba(23,74,151,0.08)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Icon name="monitor" size={18} color={BLUE} />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, fontFamily: "'Manrope',sans-serif" }}>Network Monitoring Software</div>
          <div style={{ fontSize: 10, color: MUTED, fontFamily: "'Manrope',sans-serif" }}>Central Management</div>
        </div>
      </div>

      {/* Dotted line */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { label: "Critical Device", sub: "Servers, Routers, Switches…", color: "#174A97", bg: "rgba(23,74,151,0.08)" },
          { label: "Non-Critical Device", sub: "Desktops, Printers…", color: ACCENT, bg: "rgba(234,109,36,0.08)" },
        ].map((item, i) => (
          <div key={i} style={{
            background: item.bg, border: `1px dashed ${item.color}44`,
            borderRadius: 8, padding: "10px 14px",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <div style={{ display: "flex", gap: 4 }}>
              {[0, 1, 2].map(j => (
                <div key={j} style={{
                  width: 8, height: 8, borderRadius: 2,
                  background: item.color, opacity: 0.7 + j * 0.1,
                }} />
              ))}
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: item.color, fontFamily: "'Manrope',sans-serif" }}>{item.label}</div>
              <div style={{ fontSize: 9, color: MUTED, fontFamily: "'Manrope',sans-serif" }}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


/* ── Systems Integration Hub Diagram (System Integration Section 03) ─────────── */
function SystemsIntegrationDiagram() {
  const nodes = [
    { label: "Solution-Based\nApproach",          x: -130, y: -30,  color: "#EF4444", border: "#EF4444" },
    { label: "Maximum\nReturn-On-\nInvestment",    x: 130,  y: -30,  color: "#93C5FD", border: "#3B82F6" },
    { label: "Best-of-Breed\nProcesses",           x: -80,  y: 110,  color: "#D1D5DB", border: "#9CA3AF" },
    { label: "On-time,\nHigh-Quality\nDeliverables", x: 80, y: 110,  color: "#93C5FD", border: "#1D4ED8" },
  ];

  return (
    <div style={{
      width: "100%", maxWidth: 380,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px 0",
    }}>
      <div style={{ position: "relative", width: "100%", maxWidth: 320, aspectRatio: "320 / 280" }}>
        {/* Center hub */}
        <div style={{
          position: "absolute",
          left: "50%", top: "40%",
          transform: "translate(-50%,-50%)",
          width: "34%", height: "34%", minWidth: 80, minHeight: 80, borderRadius: "50%",
          background: "linear-gradient(135deg,#174A97,#0B1F3A)",
          border: "3px solid #174A97",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 30px rgba(23,74,151,0.4)",
          zIndex: 2,
        }}>
          <div style={{
            fontSize: 13, fontWeight: 800, color: WHITE,
            textAlign: "center", lineHeight: 1.3,
            fontFamily: "'Bricolage Grotesque',sans-serif",
          }}>Systems<br/>Integration</div>
        </div>

        {/* Satellite nodes */}
        {nodes.map((n, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `calc(50% + ${n.x}px)`,
            top: `calc(40% + ${n.y}px)`,
            transform: "translate(-50%,-50%)",
            width: 88, height: 88, borderRadius: "50%",
            background: n.color + "22",
            border: `2px solid ${n.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1,
          }}>
            <div style={{
              fontSize: 9, fontWeight: 600,
              color: n.border, textAlign: "center",
              lineHeight: 1.4, whiteSpace: "pre-line",
              fontFamily: "'Manrope',sans-serif",
              padding: "0 6px",
            }}>{n.label}</div>
          </div>
        ))}

        {/* Connector lines */}
        <svg style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          zIndex: 0,
        }} viewBox="0 0 320 280" preserveAspectRatio="none">
          {nodes.map((n, i) => (
            <line key={i}
              x1={160} y1={112}
              x2={160 + n.x} y2={112 + n.y}
              stroke="rgba(23,74,151,0.25)" strokeWidth="1.5"
              strokeDasharray="4 3"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

/* ── Managed Services Diagram (IT Outsourcing Section 03) ────────────────────── */
function ManagedServicesDiagram() {
  const nodes = [
    { label: "Ticket\nManagement", x: 0,   y: 0,   color: "#06B6D4" },
    { label: "Technical\nHelpdesk", x: 100, y: 0,   color: "#8B5CF6" },
    { label: "Billing\nOperations", x: 0,   y: 80,  color: "#F59E0B" },
    { label: "Transform &\nNew Technology", x: 100, y: 80, color: "#10B981" },
    { label: "Consulting &\nDev Strategy", x: 0,   y: 160, color: "#EF4444" },
  ];
  const rightNodes = [
    { label: "Onboard\nDevice Mgmt",    color: "#3B82F6" },
    { label: "Resource Plan\nManagement", color: "#8B5CF6" },
    { label: "Platform Support",         color: "#06B6D4" },
    { label: "Customer Cost\nManagement",color: "#10B981" },
    { label: "Project\nPlanning",        color: "#F59E0B" },
  ];

  return (
    <div style={{
      width: "100%", maxWidth: 380,
      background: WHITE, border: `1px solid rgba(23,74,151,0.10)`,
      borderRadius: 14, padding: "20px",
      boxShadow: "0 4px 20px rgba(23,74,151,0.08)",
      overflow: "hidden",
      boxSizing: "border-box",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, minWidth: 0 }}>
          {nodes.map((n, i) => (
            <div key={i} style={{
              background: n.color + "15", border: `1px solid ${n.color}40`,
              borderRadius: 8, padding: "6px 10px",
              fontSize: 9, fontWeight: 600, color: n.color,
              fontFamily: "'Manrope',sans-serif", whiteSpace: "pre-line",
              lineHeight: 1.4,
            }}>{n.label}</div>
          ))}
        </div>

        {/* Center hub */}
        <div style={{
          width: 70, height: 70, borderRadius: "50%",
          background: "linear-gradient(135deg,#174A97,#0B1F3A)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          color: WHITE, flexShrink: 0,
          boxShadow: "0 0 20px rgba(23,74,151,0.4)",
        }}>
          <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: ".05em", textAlign: "center", lineHeight: 1.4 }}>
            MANAGED<br/>SERVICES
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, minWidth: 0 }}>
          {rightNodes.map((n, i) => (
            <div key={i} style={{
              background: n.color + "15", border: `1px solid ${n.color}40`,
              borderRadius: 8, padding: "6px 10px",
              fontSize: 9, fontWeight: 600, color: n.color,
              fontFamily: "'Manrope',sans-serif", whiteSpace: "pre-line",
              lineHeight: 1.4,
            }}>{n.label}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Section: Image Left/Right ───────────────────────────────────────────────── */
function SectionImageSplit({ section, index, reverse = false }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="sd-section-pad" style={{
      background: index % 2 === 0 ? WHITE : LBBLUE,
    }}>
      <div className="sd-container">
        <div className="sd-split-grid" style={{
          direction: reverse ? "rtl" : "ltr",
        }}>
          {/* Text side */}
          <div style={{
            direction: "ltr",
            animation: vis ? `sdSlideL .7s cubic-bezier(.22,.68,0,1.1) both` : "none",
            opacity: vis ? undefined : 0,
          }}>
            <span className="sd-section-label">{section.label}</span>
            <h2 style={{
              fontSize: "clamp(22px,2.2vw,30px)", fontWeight: 800,
              color: NAVY, lineHeight: 1.2, marginBottom: 16,
              fontFamily: "'Bricolage Grotesque',sans-serif",
            }}>{section.title}</h2>

            {section.intro && (
              <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.75, marginBottom: 20, fontWeight: 800, fontFamily: "'Manrope',sans-serif" }}>
                {section.intro.split("\n\n").map((para, i) => <span key={i}>{para}<br/><br/></span>)}
              </p>
            )}

            {section.bullets && section.bullets.map((b, bi) => (
              <div key={bi} style={{
                display: "flex", gap: 10, marginBottom: 10,
                animation: vis ? `sdFadeUp .5s ease ${.3 + bi * .07}s both` : "none",
                opacity: vis ? undefined : 0, 
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: BLUE, flexShrink: 0, marginTop: 7, 
                }} />
                <p style={{ fontSize: 13.5, color: MUTED, lineHeight: 1.7, margin: 0,  fontFamily: "'Manrope',sans-serif" }}>
                  {b.term && <strong style={{ color: NAVY, fontWeight: 900,fontSize: 14.5 }}>{b.term}</strong>}
                  {b.term ? " " : ""}{b.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Image / Visual side */}
          <div style={{
            direction: "ltr",
            animation: vis ? `sdSlideR .7s cubic-bezier(.22,.68,0,1.1) .15s both` : "none",
            opacity: vis ? undefined : 0,
          }}>
            {section.diagramType === "serverDiagram" ? (
              <div className="sd-diagram-wrap"><ServerDiagram /></div>
            ) : section.diagramType === "managedServicesDiagram" ? (
              <div className="sd-diagram-wrap"><ManagedServicesDiagram /></div>
            ) : section.diagramType === "diagnosticsDashboard" ? (
               <div className="sd-diagram-wrap"><DiagnosticsDashboard /></div>

            ): section.diagramType === "systemsIntegrationDiagram" ? (
   <div className="sd-diagram-wrap"><SystemsIntegrationDiagram /></div>
):
             (
              <div style={{
                width: "100%", aspectRatio: "4/3",
                background: section.imageBg || "#EEF3FF",
                borderRadius: 18,
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden",
                boxShadow: "0 8px 40px rgba(23,74,151,0.10)",
                position: "relative",
              }}>
                {section.image ? (
                  <img src={section.image} alt={section.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 18 }}
                    onError={e => { e.target.style.display = "none"; }}
                  />
                ) : (
                  /* Placeholder visual */
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 80, height: 80, borderRadius: "50%",
                      background: `rgba(23,74,151,0.10)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      animation: "sdFloat 3s ease-in-out infinite",
                    }}>
                      <Icon name="server" size={36} color={BLUE} />
                    </div>
                    <span style={{ fontSize: 12, color: BLUE, fontWeight: 600, fontFamily: "'Manrope',sans-serif" }}>
                      {section.title}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


function DiagnosticsDashboard() {
  const bars = [
    { label: "ROOT CAUSE ANALYSIS", pct: 85, color: "#174A97" },
    { label: "ISSUE RESOLUTION",    pct: 72, color: "#22C55E" },
    { label: "RESPONSE TIME",       pct: 60, color: "#F59E0B" },
  ];
 
  return (
    <div style={{
      width: "100%", maxWidth: 440,
      height: 350,
      background: "#fffff",
      borderRadius: 14,
      overflow: "hidden",
      boxShadow: "0 8px 32px rgba(11,31,58,0.3)",
      boxSizing: "border-box",
    }}>
      {/* Title bar */}
      <div style={{
        background: "#112240", padding: "12px 18px",
        display: "flex", alignItems: "center", gap: 8,
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        {/* Traffic lights */}
        {["#FF5F57","#FFBD2E","#28CA41"].map((c,i) => (
          <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:c, flexShrink: 0 }}/>
        ))}
        <span style={{
          fontSize: 12, fontWeight: 600, color: "#A9D2F8E5",
          fontFamily: "'Manrope',sans-serif", marginLeft: 6, letterSpacing: ".04em",
        }}>System Diagnostics</span>
      </div>
 
      {/* Bar chart */}
      <div style={{ padding: "20px 18px 16px" }}>
        {bars.map((bar, i) => (
          <div key={i} style={{ marginBottom: i < bars.length - 1 ? 16 : 0 }}>
            <div style={{
              fontSize: 9, fontWeight: 700, letterSpacing: ".08em",
              color: "#3A546C", fontFamily: "'Manrope',sans-serif",
              marginBottom: 6,
            }}>{bar.label}</div>
            <div style={{
              height: 10, borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}>
              <div style={{
                height: "100%", borderRadius: 999,
                width: `${bar.pct}%`,
                background: bar.color,
                transition: "width 1s ease",
              }}/>
            </div>
          </div>
        ))}
      </div>
 
      {/* Two action cards */}
      <div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",

    margin: 12,
    marginTop :15,

    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 12,
    overflow: "hidden",

    gap: 1, // 10 ki jagah 1 ya 0
  }}
>
        {[
          { label: "On-Site",  sub: "Field Support",  color: "#174A97" },
          { label: "Remote",   sub: "Rapid Connect",  color: "#EA6D24" },
        ].map((item, i) => (
          <div key={i} style={{
            padding: "14px 16px",
            background: i === 0 ? "rgba(23,74,151,0.15)" : "rgba(234,109,36,0.12)",
            textAlign: "center",
          }}>
            <div style={{
              fontSize: 13, fontWeight: 700,
              color: item.color,
              fontFamily: "'Bricolage Grotesque',sans-serif",
            }}>{item.label}</div>
            <div style={{
              fontSize: 10, color: "#3A546C",
              fontFamily: "'Manrope',sans-serif", marginTop: 5, fontWeight:900,
            }}>{item.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Section: Card Grid ──────────────────────────────────────────────────────── */
function SectionCardGrid({ section, index }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="sd-section-pad" style={{
      background: index % 2 === 0 ? WHITE : LBBLUE,
    }}>
      <div className="sd-container">
        <div style={{
          animation: vis ? "sdFadeUp .6s ease both" : "none",
          opacity: vis ? undefined : 0,
          marginBottom: 40,
        }}>
          <span className="sd-section-label">{section.label}</span>
          <h2 style={{
            fontSize: "clamp(22px,2.2vw,30px)", fontWeight: 800,
            color: NAVY, lineHeight: 1.2, marginBottom: 12,
            fontFamily: "'Bricolage Grotesque',sans-serif",
          }}>{section.title}</h2>
          {section.intro && (
            <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.75, maxWidth: 680, fontFamily: "'Manrope',sans-serif" }}>
              {section.intro}
            </p>
          )}
        </div>

        <div className="sd-card-grid" style={{
          gridTemplateColumns: `repeat(${section.cards.length}, 1fr)`,
        }}>
          {section.cards.map((card, ci) => (
            <div key={ci} className="sd-card" style={{
              background: WHITE,
              border: `1px solid rgba(23,74,151,0.09)`,
              borderRadius: 14, padding: "24px 22px",
              transition: "transform .3s, box-shadow .3s",
              animation: vis ? `sdFadeUp .55s ease ${.1 + ci * .07}s both` : "none",
              opacity: vis ? undefined : 0,
              cursor: "default",
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: "rgba(23,74,151,0.07)",
                border: `1px solid rgba(23,74,151,0.12)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 16,
                animation: "sdPulse 3s ease-in-out infinite",
              }}>
                <Icon name={card.icon || "default"} size={20} color={BLUE} />
              </div>
              <h4 style={{
                fontSize: 15, fontWeight: 700, color: NAVY,
                marginBottom: 8, fontFamily: "'Bricolage Grotesque',sans-serif",
              }}>{card.title}</h4>
              <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.7, margin: 0, fontFamily: "'Manrope',sans-serif" }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Section: Card Grid + Stats ──────────────────────────────────────────────── */
function SectionCardGridStats({ section, index }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="sd-section-pad" style={{
      background: index % 2 === 0 ? WHITE : LBBLUE,
    }}>
      <div className="sd-container">
        {/* Header */}
        <div style={{
          animation: vis ? "sdFadeUp .6s ease both" : "none",
          opacity: vis ? undefined : 0,
          marginBottom: 40,
        }}>
          <span className="sd-section-label">{section.label}</span>
          <h2 style={{
            fontSize: "clamp(22px,2.2vw,30px)", fontWeight: 800,
            color: NAVY, lineHeight: 1.2, marginBottom: 12,
            fontFamily: "'Bricolage Grotesque',sans-serif",
          }}>{section.title}</h2>
          {section.intro && (
            <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.75, maxWidth: 680, fontFamily: "'Manrope',sans-serif" }}>
              {section.intro}
            </p>
          )}
        </div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16, marginBottom: 24,
        }}>
          {section.cards.map((card, ci) => (
            <div key={ci} className="sd-card" style={{
              background: WHITE,
              border: `1px solid rgba(23,74,151,0.09)`,
              borderRadius: 14, padding: "22px 20px",
              transition: "transform .3s, box-shadow .3s",
              animation: vis ? `sdFadeUp .55s ease ${.1 + ci * .07}s both` : "none",
              opacity: vis ? undefined : 0,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 9,
                background: "rgba(23,74,151,0.07)",
                border: `1px solid rgba(23,74,151,0.12)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 14,
              }}>
                <Icon name={card.icon || "default"} size={18} color={BLUE} />
              </div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 6, fontFamily: "'Bricolage Grotesque',sans-serif" }}>
                {card.title}
              </h4>
              <p style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.65, margin: 0, fontFamily: "'Manrope',sans-serif" }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        {section.stats && (
          <div className="sd-stats-row" style={{
            gridTemplateColumns: `repeat(${section.stats.length}, 1fr)`,
          }}>
            {section.stats.map((stat, si) => (
              <div key={si} className="sd-stat-card" style={{
                background: WHITE, padding: "28px 20px", textAlign: "center",
                transition: "transform .3s, box-shadow .3s",
                animation: vis ? `sdCountUp .6s cubic-bezier(.22,.68,0,1.2) ${.4 + si * .1}s both` : "none",
                opacity: vis ? undefined : 0,
              }}>
                <div style={{
                  fontSize: "clamp(26px,3vw,38px)", fontWeight: 800,
                  color: BLUE, fontFamily: "'Bricolage Grotesque',sans-serif",
                  letterSpacing: "-0.03em",
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: ".10em",
                  color: MUTED, textTransform: "uppercase",
                  fontFamily: "'Manrope',sans-serif", marginTop: 6,
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Section: Diagram Right (text left, diagram right) ───────────────────────── */
function SectionDiagramRight({ section, index }) {
  return <SectionImageSplit section={section} index={index} reverse={false} />;
}

/* ── We Believe Banner ───────────────────────────────────────────────────────── */
function WeBelieveBanner({ data }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="sd-we-believe" style={{
      background: "linear-gradient(135deg,#0B1F3A 0%,#174A97 60%,#1A4A8A 100%)",
      padding: "72px 32px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative quote mark */}
      <div style={{
        position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)",
        fontSize: 140, color: "rgba(255,255,255,0.04)",
        fontFamily: "'Bricolage Grotesque',sans-serif",
        lineHeight: 1, pointerEvents: "none", userSelect: "none",
      }}>"</div>

      <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>
        <h2 style={{
          fontSize: "clamp(18px,2.5vw,26px)", fontWeight: 700,
          color: WHITE, lineHeight: 1.5, marginBottom: data.body ? 16 : 0,
          fontFamily: "'Bricolage Grotesque',sans-serif",
          animation: vis ? "sdFadeUp .7s ease both" : "none",
          opacity: vis ? undefined : 0,
        }}>
          {data.quote}
          {data.highlight && (
            <span style={{ color: "#78B8F5", fontStyle: "italic" }}> {data.highlight}</span>
          )}
        </h2>
        {data.body && (
          <p style={{
            fontSize: 14.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.8,
            fontFamily: "'Manrope',sans-serif", margin: 0,
            animation: vis ? "sdFadeUp .7s ease .15s both" : "none",
            opacity: vis ? undefined : 0,
          }}>
            {data.body}
          </p>
        )}
        <div style={{
          width: 40, height: 2, background: ACCENT,
          borderRadius: 2, margin: "20px auto 0",
        }} />
      </div>
    </div>
  );
}

/* ── Hero Section ────────────────────────────────────────────────────────────── */
function HeroSection({ data, onBack }) {

  const isMobile = useIsMobile(640);

  const defaultOverlay =
  "linear-gradient(to bottom, rgba(11,31,58,0.82) 0%, rgba(11,31,58,0.65) 100%)";
  return (
    <div
  className="sd-hero-wrap"
  style={{
    background: `
      ${data.heroOverlay || defaultOverlay},
      url(${data.heroBg || ""}) center/cover no-repeat
    `,
    backgroundColor: "#0B1F3A",
    minHeight: 380,
    padding: "0 32px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    position: "relative",
    boxSizing: "border-box",
  }}
>
      {/* Back button */}
      <button className="sd-back-btn" onClick={onBack} style={{
        position: "absolute", top: 24, left: 32,
        display: "flex", alignItems: "center", gap: 6,
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 8, padding: "8px 14px", cursor: "pointer",
        color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 600,
        fontFamily: "'Manrope',sans-serif", letterSpacing: ".04em",
        transition: "all .2s",
        zIndex: 2,
      }}>
        <Icon name="back" size={14} color="currentColor" />
        {isMobile ? "All" : "All Services"}
      </button>

      <div style={{ maxWidth: 760, animation: "sdFadeUp .8s ease .1s both" }}>
        <h1 style={{
          fontSize: "clamp(32px,5vw,58px)", fontWeight: 800,
          color: data.heroTitleColor || "#174A97", lineHeight: 1.1,
          fontFamily: "'Bricolage Grotesque',sans-serif",
          letterSpacing: "-0.03em", marginBottom: 20,
        }}>
          {data.heroTitle}
        </h1>
        <p style={{
          fontSize: "clamp(13px,1.3vw,15px)", color: "rgba(255,255,255,0.75)",
          lineHeight: 1.8, marginBottom: 32,
          fontFamily: "'Manrope',sans-serif",
          maxWidth: 680, margin: "0 auto 32px",
        }}>
          {data.heroSubtitle}
        </p>
        <button className="sd-hero-btn" style={{
          background: BLUE, color: WHITE,
          border: "none", borderRadius: 8, padding: "13px 28px",
          fontSize: 12, fontWeight: 700, letterSpacing: ".10em",
          textTransform: "uppercase", cursor: "pointer",
          fontFamily: "'Manrope',sans-serif",
          transition: "all .25s",
          display: "inline-flex", alignItems: "center", gap: 8,
        }}>
          {data.heroCta}
          <Icon name="arrow" size={13} color={WHITE} />
        </button>
      </div>
    </div>
  );
}

/* ── Footer ──────────────────────────────────────────────────────────────────── */

/* ── Main ServiceDetail Component ────────────────────────────────────────────── */


export default function ServiceDetail() {

  const { slug } = useParams();

  const serviceData = SERVICES_DATA[slug];

  const navigate = useNavigate();

  useEffect(() => {
    injectCSS();
  }, []);

  const handleBack = () => {
    navigate("/Service");
  };

  // Service Not Found
  if (!serviceData) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: LBBLUE,
          fontFamily: "'Manrope',sans-serif",
          padding: "0 20px",
          textAlign: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>

          <h2
            style={{
              color: NAVY,
              fontFamily: "'Bricolage Grotesque',sans-serif",
            }}
          >
            Service not found
          </h2>

          <p style={{ color: MUTED }}>
            No service data available for this service.
          </p>

          <button
            onClick={handleBack}
            style={{
              marginTop: 16,
              padding: "10px 24px",
              background: BLUE,
              color: WHITE,
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "'Manrope',sans-serif",
            }}
          >
            ← Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="sd-root"
      style={{
        background: LBBLUE,
        fontFamily: "'Manrope',sans-serif",
      }}
    >
      {/* Hero */}
      <HeroSection
        data={serviceData}
        onBack={handleBack}
      />

      {/* Dynamic Sections */}
      {serviceData.sections.map((section, idx) => {
        const weBelieveAfter = 0;

        const sectionEl = (() => {
          switch (section.type) {
            case "imageLeft":
            case "imageRight":
              return (
                <SectionImageSplit
                  key={section.id}
                  section={section}
                  index={idx}
                  reverse={section.type === "imageLeft"}
                />
              );

            case "diagramLeft":
              return (
                <SectionImageSplit
                  key={section.id}
                  section={section}
                  index={idx}
                  reverse={true}
                />
              );

            case "diagramRight":
              return (
                <SectionImageSplit
                  key={section.id}
                  section={section}
                  index={idx}
                  reverse={false}
                />
              );

            case "cardGrid":
              return (
                <SectionCardGrid
                  key={section.id}
                  section={section}
                  index={idx}
                />
              );

            case "cardGridStats":
              return (
                <SectionCardGridStats
                  key={section.id}
                  section={section}
                  index={idx}
                />
              );

            default:
              return null;
          }
        })();

        return (
          <div key={section.id}>
            {sectionEl}

            {idx === weBelieveAfter &&
              serviceData.weBelieve && (
                <WeBelieveBanner
                  data={serviceData.weBelieve}
                />
              )}
          </div>
        );
      })}
    </div>
  );
}