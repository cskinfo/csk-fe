import { useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════════
   INTERACTIVE TECH CANVAS  — mouse parallax + hover nodes
   Colors: CSK brand — navy #0d1b3e, blue #2563eb, teal #0ea5e9
   ══════════════════════════════════════════════════════════════ */
function TechCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const DPR = window.devicePixelRatio || 1;

    let W, H;
    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      W = rect.width || 520;
      H = 422;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.scale(DPR, DPR);
    };
    resize();

    // ── mouse state
    const mouse = { x: W / 2, y: H / 2, px: W / 2, py: H / 2 };
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = W / 2; mouse.y = H / 2; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    // ── Tech Nodes definition
    const NODES = [
      // center — main server
      { id: "server",   label: "Cloud Server",   icon: "server",   x: 0.50, y: 0.48, r: 36, color: "#2563eb", glow: "#3b82f6", ring: true  },
      // surrounding nodes
      { id: "network",  label: "Network",         icon: "net",      x: 0.18, y: 0.25, r: 28, color: "#0ea5e9", glow: "#38bdf8", ring: false },
      { id: "security", label: "Security",        icon: "shield",   x: 0.80, y: 0.22, r: 28, color: "#6366f1", glow: "#818cf8", ring: false },
      { id: "ai",       label: "AI / ML",         icon: "ai",       x: 0.82, y: 0.68, r: 28, color: "#0ea5e9", glow: "#38bdf8", ring: false },
      { id: "iot",      label: "IoT",             icon: "iot",      x: 0.18, y: 0.70, r: 28, color: "#10b981", glow: "#34d399", ring: false },
      { id: "cloud",    label: "Cloud Infra",     icon: "cloud",    x: 0.50, y: 0.14, r: 26, color: "#f59e0b", glow: "#fbbf24", ring: false },
      { id: "support",  label: "24/7 Support",    icon: "support",  x: 0.50, y: 0.82, r: 26, color: "#ec4899", glow: "#f472b6", ring: false },
    ];

    // edges (from → to)
    const EDGES = [
      ["server","network"],["server","security"],["server","ai"],
      ["server","iot"],["server","cloud"],["server","support"],
      ["network","cloud"],["security","cloud"],["ai","support"],["iot","support"],
    ];

    // floating particles
    const PARTICLES = Array.from({ length: 1 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    // data packets travelling along edges
    const PACKETS = EDGES.map((e, i) => ({
      edge: e, t: Math.random(), speed: 0.003 + Math.random() * 0.003,
      color: ["#3b82f6","#38bdf8","#818cf8","#34d399","#fbbf24"][i % 5],
    }));

    // hoveredNode
    let hovered = null;
    const onMoveHover = (e) => {
      const r = canvas.getBoundingClientRect();
      const mx = e.clientX - r.left, my = e.clientY - r.top;
      hovered = null;
      NODES.forEach(n => {
        const nx = n.x * W, ny = n.y * H;
        if (Math.hypot(mx - nx, my - ny) < n.r + 6) hovered = n.id;
      });
      canvas.style.cursor = hovered ? "pointer" : "default";
    };
    canvas.addEventListener("mousemove", onMoveHover);

    // ── draw icon inside node
    function drawIcon(type, cx, cy, size, color) {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 1.8;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const s = size * 0.55;
      ctx.save(); ctx.translate(cx, cy);
      switch (type) {
        case "server":
          // server stack
          [-s*0.5, 0, s*0.5].forEach(oy => {
            ctx.beginPath();
            ctx.roundRect(-s, oy - s*0.3, s*2, s*0.55, 3);
            ctx.stroke();
            ctx.beginPath(); ctx.arc(s*0.6, oy, s*0.12, 0, Math.PI*2); ctx.fill();
          });
          break;
        case "net":
          // network topology
          [[0,-s],[s*0.8,s*0.5],[-s*0.8,s*0.5]].forEach(([nx,ny], i, arr) => {
            ctx.beginPath(); ctx.arc(nx, ny, s*0.18, 0, Math.PI*2); ctx.fill();
            arr.forEach(([nx2,ny2]) => {
              ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(nx2, ny2); ctx.stroke();
            });
          });
          break;
        case "shield":
          ctx.beginPath();
          ctx.moveTo(0, -s); ctx.lineTo(s*0.8, -s*0.4);
          ctx.lineTo(s*0.8, s*0.2); ctx.quadraticCurveTo(s*0.8, s, 0, s*1.1);
          ctx.quadraticCurveTo(-s*0.8, s, -s*0.8, s*0.2);
          ctx.lineTo(-s*0.8, -s*0.4); ctx.closePath(); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(-s*0.3, 0); ctx.lineTo(-s*0.1, s*0.3);
          ctx.lineTo(s*0.4, -s*0.3); ctx.stroke();
          break;
        case "ai":
          // brain / circuit
          ctx.beginPath(); ctx.arc(0, 0, s*0.55, 0, Math.PI*2); ctx.stroke();
          [0,72,144,216,288].forEach(deg => {
            const r = deg * Math.PI / 180;
            const ix = Math.cos(r)*s*0.55, iy = Math.sin(r)*s*0.55;
            const ox = Math.cos(r)*s*0.9, oy = Math.sin(r)*s*0.9;
            ctx.beginPath(); ctx.moveTo(ix, iy); ctx.lineTo(ox, oy); ctx.stroke();
            ctx.beginPath(); ctx.arc(ox, oy, s*0.12, 0, Math.PI*2); ctx.fill();
          });
          break;
        case "iot":
          // wifi waves
          [1, 0.65, 0.35].forEach(f => {
            ctx.beginPath();
            ctx.arc(0, s*0.3, s*f, Math.PI*1.25, Math.PI*1.75);
            ctx.stroke();
          });
          ctx.beginPath(); ctx.arc(0, s*0.3, s*0.1, 0, Math.PI*2); ctx.fill();
          break;
        case "cloud":
          ctx.beginPath();
          ctx.arc(-s*0.3, s*0.1, s*0.4, Math.PI, Math.PI*2);
          ctx.arc(s*0.3, s*0.1, s*0.4, Math.PI, Math.PI*2);
          ctx.arc(0, -s*0.15, s*0.55, Math.PI, 0);
          ctx.closePath(); ctx.stroke();
          break;
        case "support":
          // headset
          ctx.beginPath(); ctx.arc(0, -s*0.1, s*0.55, Math.PI, 0); ctx.stroke();
          ctx.beginPath(); ctx.arc(-s*0.55, s*0.1, s*0.22, Math.PI*0.5, Math.PI*1.5); ctx.stroke();
          ctx.beginPath(); ctx.arc(s*0.55, s*0.1, s*0.22, -Math.PI*0.5, Math.PI*0.5); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(0, s*0.45); ctx.lineTo(s*0.3, s*0.8);
          ctx.arc(s*0.1, s*0.8, s*0.2, 0, Math.PI); ctx.stroke();
          break;
        default: break;
      }
      ctx.restore();
    }

    let raf;
    const draw = (t) => {
      ctx.clearRect(0, 0, W, H);

      // smooth mouse lag
      mouse.px += (mouse.x - mouse.px) * 0.06;
      mouse.py += (mouse.y - mouse.py) * 0.06;
      const dx = (mouse.px - W / 2) / W;
      const dy = (mouse.py - H / 2) / H;

      // ── dark gradient background
      const bg = ctx.createRadialGradient(W*0.5, H*0.45, 30, W*0.5, H*0.45, H*0.85);
     bg.addColorStop(0, "#ffffff");
bg.addColorStop(0.5, "#f8fbff");
bg.addColorStop(1, "#eef6ff");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // ── grid lines (subtle, parallax)
    //   ctx.save();
    //   ctx.translate(dx * -10, dy * -10);
    //   ctx.strokeStyle = "rgba(37,99,235,0.07)";
    //   ctx.lineWidth = 0.6;
    //   const gStep = 40;
    //   for (let x = -gStep; x < W + gStep; x += gStep) {
    //     ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    //   }
    //   for (let y = -gStep; y < H + gStep; y += gStep) {
    //     ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    //   }
    //   ctx.restore();

      // ── particles
      ctx.save(); ctx.translate(dx * -18, dy * -18);
      PARTICLES.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(147,197,253,${p.alpha})`; ctx.fill();
      });
      ctx.restore();

      // resolve node screen positions (with parallax layers)
      const screenPos = (n) => {
        const depth = n.id === "server" ? 0.02 : 0.06;
        return {
          x: n.x * W + dx * W * depth * -1,
          y: n.y * H + dy * H * depth * -1,
        };
      };

      // ── edges
      EDGES.forEach(([a, b]) => {
        const na = NODES.find(n => n.id === a);
        const nb = NODES.find(n => n.id === b);
        const pa = screenPos(na), pb = screenPos(nb);
        const grad = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y);
        grad.addColorStop(0, na.glow + "55");
        grad.addColorStop(1, nb.glow + "55");
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = grad; ctx.lineWidth = 1; ctx.stroke();
      });

      // ── data packets
      PACKETS.forEach(pk => {
        pk.t += pk.speed;
        if (pk.t > 1) pk.t = 0;
        const na = NODES.find(n => n.id === pk.edge[0]);
        const nb = NODES.find(n => n.id === pk.edge[1]);
        const pa = screenPos(na), pb = screenPos(nb);
        const px = pa.x + (pb.x - pa.x) * pk.t;
        const py = pa.y + (pb.y - pa.y) * pk.t;
        ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI*2);
        ctx.fillStyle = pk.color; ctx.fill();
        // trail
        const trail = 0.08;
        const t2 = Math.max(0, pk.t - trail);
        const px2 = pa.x + (pb.x - pa.x) * t2;
        const py2 = pa.y + (pb.y - pa.y) * t2;
        const tg = ctx.createLinearGradient(px2, py2, px, py);
        tg.addColorStop(0, pk.color + "00");
        tg.addColorStop(1, pk.color + "cc");
        ctx.beginPath(); ctx.moveTo(px2, py2); ctx.lineTo(px, py);
        ctx.strokeStyle = tg; ctx.lineWidth = 2; ctx.stroke();
      });

      // ── nodes
      NODES.forEach(n => {
        const pos = screenPos(n);
        const isHov = hovered === n.id;
        const pulse = Math.sin(t / 800 + n.x * 10) * 0.5 + 0.5;
        const scale = isHov ? 1.15 : 1;
        const nr = n.r * scale;

        // outer glow ring
        if (n.ring || isHov) {
          const ringR = nr + 10 + pulse * 8;
          const rg = ctx.createRadialGradient(pos.x, pos.y, nr, pos.x, pos.y, ringR + 6);
          rg.addColorStop(0, n.glow + "44");
          rg.addColorStop(1, n.glow + "00");
          ctx.beginPath(); ctx.arc(pos.x, pos.y, ringR, 0, Math.PI*2);
          ctx.fillStyle = rg; ctx.fill();
        }

        // rotating ring (server only)
        if (n.ring) {
          ctx.save(); ctx.translate(pos.x, pos.y);
          ctx.rotate(t / 2000);
          ctx.beginPath();
          ctx.arc(0, 0, nr + 14, 0, Math.PI * 1.5);
          ctx.strokeStyle = n.glow + "66"; ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 6]); ctx.stroke(); ctx.setLineDash([]);
          ctx.restore();
        }

        // node circle
        const cg = ctx.createRadialGradient(pos.x - nr*0.3, pos.y - nr*0.3, 2, pos.x, pos.y, nr);
        cg.addColorStop(0, n.color + "ff");
        cg.addColorStop(1, n.color + "99");
        ctx.beginPath(); ctx.arc(pos.x, pos.y, nr, 0, Math.PI*2);
        ctx.fillStyle = cg; ctx.fill();
        ctx.strokeStyle = n.glow; ctx.lineWidth = isHov ? 2 : 1;
        ctx.stroke();

        // icon
        drawIcon(n.icon, pos.x, pos.y, nr, "#fff");

        // label
        ctx.fillStyle = isHov ? "#555555" : "#555555";
        ctx.font = `${isHov ? 600 : 500} ${isHov ? 11 : 12}px 'Inter',sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(n.label, pos.x, pos.y + nr + 16);
      });

      // ── CSK brand watermark (center bottom)
      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 11px 'Inter',sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("CSK INFORMATION TECHNOLOGY", W / 2, H - 10);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mousemove", onMoveHover);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ borderRadius: "16px", display: "block" }}
      aria-label="CSK IT interactive tech network"
    />
  );
}

/* ─── Feature Item ─────────────────────────────────────────────────────────── */
function FeatureItem({ icon, title, desc }) {
  return (
    <div className="flex flex-col gap-[6px]">
      <div className="w-[44px] h-[44px] rounded-full bg-[#eef3ff] border border-[#d6e4ff] flex items-center justify-center mb-1">
        {icon}
      </div>
      <p className="text-[15px] font-bold text-[#1a1a2e] leading-snug">{title}</p>
      <p className="text-[13px] text-[#6b7280] leading-[1.65]">{desc}</p>
    </div>
  );
}

/* ─── Icons ────────────────────────────────────────────────────────────────── */
const InnovationIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9.5" stroke="#2563eb" strokeWidth="1.4"/>
    <circle cx="12" cy="12" r="2.5" fill="#2563eb"/>
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M6.34 6.34l1.41 1.41M16.24 16.24l1.42 1.42M6.34 17.66l1.41-1.41M16.24 7.76l1.42-1.42" stroke="#0ea5e9" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);
const ExpertiseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9.5" stroke="#10b981" strokeWidth="1.4"/>
    <rect x="8" y="7" width="8" height="10" rx="1" stroke="#10b981" strokeWidth="1.3"/>
    <path d="M10 10h4M10 12.5h3M10 15h4" stroke="#10b981" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
);
const CustomizedIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9.5" stroke="#6366f1" strokeWidth="1.4"/>
    <circle cx="12" cy="12" r="2.8" stroke="#6366f1" strokeWidth="1.3"/>
    <path d="M12 5v2M12 17v2M5 12h2M17 12h2" stroke="#6366f1" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);
const NationwideIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9.5" stroke="#0ea5e9" strokeWidth="1.4"/>
    <path d="M12 3c0 0 3 3.5 3 9s-3 9-3 9-3-3.5-3-9 3-9 3-9z" stroke="#0ea5e9" strokeWidth="1.2"/>
    <path d="M3 12h18" stroke="#0ea5e9" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

/* ─── Main Export ──────────────────────────────────────────────────────────── */
export default function SolutionPageFifthSection() {
  return (
    <section className="w-full bg-white" style={{ fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <div className="max-w-[1200px] mx-auto px-8 py-16 flex flex-col lg:flex-row items-center gap-10">

        {/* LEFT */}
        <div className="flex-1 min-w-0">
          <h2
            className="text-[38px] font-extrabold text-[#0d1b3e] leading-[1.15] mb-4"
            style={{ letterSpacing: "-0.5px" }}
          >
            Why Businesses Trust CSK..?
          </h2>
          <p className="text-[14px] text-[#555] leading-[1.8] mb-10 max-w-[400px]">
            Delivering excellence through innovation, industry expertise, and
            nationwide service capability. We don't just provide IT; we build
            resilient digital futures.
          </p>
          <div className="grid grid-cols-2 gap-x-10 gap-y-8 max-w-[480px]">
            <FeatureItem icon={<InnovationIcon />} title="Innovation-Driven"
              desc="Leveraging the latest technologies for future-ready solutions." />
            <FeatureItem icon={<ExpertiseIcon />} title="Industry Expertise"
              desc="Specialized teams for corporate, gov, and education sectors." />
            <FeatureItem icon={<CustomizedIcon />} title="Customized Services"
              desc="Tailored roadmaps aligned with your business goals." />
            <FeatureItem icon={<NationwideIcon />} title="Nationwide Support"
              desc="Consistent service delivery across 66 locations in India." />
          </div>
        </div>

        {/* RIGHT — interactive tech canvas */}
        <div className="flex-1 w-full flex items-center justify-center">
          <div className="w-full max-w-[520px] rounded-2xl overflow-hidden shadow-2xl">
            <TechCanvas />
          </div>
        </div>

      </div>
    </section>
  );
}