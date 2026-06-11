import { useEffect, useRef } from "react";

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
      // Responsive height: shorter on small screens
      H = W < 400 ? 280 : W < 600 ? 340 : 422;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(DPR, DPR);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    const mouse = { x: 0.5, y: 0.5, px: 0.5, py: 0.5 };

    // ── unified pointer position from either mouse or touch
    const getPos = (e) => {
      const r = canvas.getBoundingClientRect();
      const src = e.touches ? e.touches[0] : e;
      return { x: src.clientX - r.left, y: src.clientY - r.top };
    };

    const NODES = [
      { id: "server",   label: "Cloud Server",  icon: "server",  x: 0.50, y: 0.48, r: 36, color: "#2563eb", glow: "#3b82f6", ring: true  },
      { id: "network",  label: "Network",        icon: "net",     x: 0.18, y: 0.25, r: 28, color: "#0ea5e9", glow: "#38bdf8", ring: false },
      { id: "security", label: "Security",       icon: "shield",  x: 0.80, y: 0.22, r: 28, color: "#6366f1", glow: "#818cf8", ring: false },
      { id: "ai",       label: "AI / ML",        icon: "ai",      x: 0.82, y: 0.68, r: 28, color: "#0ea5e9", glow: "#38bdf8", ring: false },
      { id: "iot",      label: "IoT",            icon: "iot",     x: 0.18, y: 0.70, r: 28, color: "#10b981", glow: "#34d399", ring: false },
      { id: "cloud",    label: "Cloud Infra",    icon: "cloud",   x: 0.50, y: 0.14, r: 26, color: "#f59e0b", glow: "#fbbf24", ring: false },
      { id: "support",  label: "24/7 Support",   icon: "support", x: 0.50, y: 0.82, r: 26, color: "#ec4899", glow: "#f472b6", ring: false },
    ];

    const EDGES = [
      ["server","network"],["server","security"],["server","ai"],
      ["server","iot"],["server","cloud"],["server","support"],
      ["network","cloud"],["security","cloud"],["ai","support"],["iot","support"],
    ];

    const PARTICLES = Array.from({ length: 18 }, () => ({
      x: Math.random() * 600, y: Math.random() * 422,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5, alpha: Math.random() * 0.5 + 0.2,
    }));

    const PACKETS = EDGES.map((e, i) => ({
      edge: e, t: Math.random(), speed: 0.003 + Math.random() * 0.003,
      color: ["#3b82f6","#38bdf8","#818cf8","#34d399","#fbbf24"][i % 5],
    }));

    let hovered = null;
    let touchClearTimer = null;

    const hitTest = (mx, my) => {
      let found = null;
      NODES.forEach(n => {
        if (Math.hypot(mx - n.x * W, my - n.y * H) < n.r + 10) found = n.id;
      });
      return found;
    };

    // ── pointer events (mouse + stylus)
    const onPointerMove = (e) => {
      const { x, y } = getPos(e);
      mouse.x = x / W; mouse.y = y / H;
      hovered = hitTest(x, y);
      canvas.style.cursor = hovered ? "pointer" : "default";
    };
    const onPointerLeave = () => {
      mouse.x = 0.5; mouse.y = 0.5;
      hovered = null;
    };

    // ── touch events (finger)
    const onTouchStart = (e) => {
      e.preventDefault();
      clearTimeout(touchClearTimer);
      const { x, y } = getPos(e);
      mouse.x = x / W; mouse.y = y / H;
      hovered = hitTest(x, y);
    };
    const onTouchMove = (e) => {
      e.preventDefault();
      const { x, y } = getPos(e);
      mouse.x = x / W; mouse.y = y / H;
      hovered = hitTest(x, y);
    };
    const onTouchEnd = () => {
      touchClearTimer = setTimeout(() => { hovered = null; }, 500);
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);

    function drawIcon(type, cx, cy, size, color) {
      ctx.strokeStyle = color; ctx.fillStyle = color;
      ctx.lineWidth = 1.8; ctx.lineCap = "round"; ctx.lineJoin = "round";
      const s = size * 0.55;
      ctx.save(); ctx.translate(cx, cy);
      switch (type) {
        case "server":
          [-s*0.5, 0, s*0.5].forEach(oy => {
            ctx.beginPath(); ctx.roundRect(-s, oy - s*0.3, s*2, s*0.55, 3); ctx.stroke();
            ctx.beginPath(); ctx.arc(s*0.6, oy, s*0.12, 0, Math.PI*2); ctx.fill();
          }); break;
        case "net":
          [[0,-s],[s*0.8,s*0.5],[-s*0.8,s*0.5]].forEach(([nx,ny], i, arr) => {
            ctx.beginPath(); ctx.arc(nx, ny, s*0.18, 0, Math.PI*2); ctx.fill();
            arr.forEach(([nx2,ny2]) => { ctx.beginPath(); ctx.moveTo(nx,ny); ctx.lineTo(nx2,ny2); ctx.stroke(); });
          }); break;
        case "shield":
          ctx.beginPath();
          ctx.moveTo(0,-s); ctx.lineTo(s*0.8,-s*0.4); ctx.lineTo(s*0.8,s*0.2);
          ctx.quadraticCurveTo(s*0.8,s,0,s*1.1); ctx.quadraticCurveTo(-s*0.8,s,-s*0.8,s*0.2);
          ctx.lineTo(-s*0.8,-s*0.4); ctx.closePath(); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(-s*0.3,0); ctx.lineTo(-s*0.1,s*0.3); ctx.lineTo(s*0.4,-s*0.3); ctx.stroke(); break;
        case "ai":
          ctx.beginPath(); ctx.arc(0,0,s*0.55,0,Math.PI*2); ctx.stroke();
          [0,72,144,216,288].forEach(deg => {
            const r=deg*Math.PI/180, ix=Math.cos(r)*s*0.55, iy=Math.sin(r)*s*0.55;
            const ox=Math.cos(r)*s*0.9, oy=Math.sin(r)*s*0.9;
            ctx.beginPath(); ctx.moveTo(ix,iy); ctx.lineTo(ox,oy); ctx.stroke();
            ctx.beginPath(); ctx.arc(ox,oy,s*0.12,0,Math.PI*2); ctx.fill();
          }); break;
        case "iot":
          [1,0.65,0.35].forEach(f => {
            ctx.beginPath(); ctx.arc(0,s*0.3,s*f,Math.PI*1.25,Math.PI*1.75); ctx.stroke();
          });
          ctx.beginPath(); ctx.arc(0,s*0.3,s*0.1,0,Math.PI*2); ctx.fill(); break;
        case "cloud":
          ctx.beginPath();
          ctx.arc(-s*0.3,s*0.1,s*0.4,Math.PI,Math.PI*2);
          ctx.arc(s*0.3,s*0.1,s*0.4,Math.PI,Math.PI*2);
          ctx.arc(0,-s*0.15,s*0.55,Math.PI,0);
          ctx.closePath(); ctx.stroke(); break;
        case "support":
          ctx.beginPath(); ctx.arc(0,-s*0.1,s*0.55,Math.PI,0); ctx.stroke();
          ctx.beginPath(); ctx.arc(-s*0.55,s*0.1,s*0.22,Math.PI*0.5,Math.PI*1.5); ctx.stroke();
          ctx.beginPath(); ctx.arc(s*0.55,s*0.1,s*0.22,-Math.PI*0.5,Math.PI*0.5); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(0,s*0.45); ctx.lineTo(s*0.3,s*0.8);
          ctx.arc(s*0.1,s*0.8,s*0.2,0,Math.PI); ctx.stroke(); break;
      }
      ctx.restore();
    }

    let raf;
    const draw = (t) => {
      ctx.clearRect(0, 0, W, H);
      mouse.px += (mouse.x - mouse.px) * 0.06;
      mouse.py += (mouse.y - mouse.py) * 0.06;
      const dx = mouse.px - 0.5, dy = mouse.py - 0.5;

      const bg = ctx.createRadialGradient(W*0.5,H*0.45,30,W*0.5,H*0.45,H*0.85);
      bg.addColorStop(0,"#ffffff"); bg.addColorStop(0.5,"#f8fbff"); bg.addColorStop(1,"#eef6ff");
      ctx.fillStyle = bg; ctx.fillRect(0,0,W,H);

      ctx.save(); ctx.translate(dx*-18*W/520, dy*-18*H/422);
      PARTICLES.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x<0) p.x=W; if (p.x>W) p.x=0;
        if (p.y<0) p.y=H; if (p.y>H) p.y=0;
        ctx.beginPath(); ctx.arc(p.x*(W/600), p.y*(H/422), p.r, 0, Math.PI*2);
        ctx.fillStyle=`rgba(147,197,253,${p.alpha})`; ctx.fill();
      }); ctx.restore();

      const screenPos = (n) => ({
        x: n.x*W + dx*W*(n.id==="server"?0.02:0.06)*-1,
        y: n.y*H + dy*H*(n.id==="server"?0.02:0.06)*-1,
      });

      // Scale node radius for small canvases
      const rScale = Math.min(W/520, 1);

      EDGES.forEach(([a,b]) => {
        const pa=screenPos(NODES.find(n=>n.id===a)), pb=screenPos(NODES.find(n=>n.id===b));
        const grad=ctx.createLinearGradient(pa.x,pa.y,pb.x,pb.y);
        const na=NODES.find(n=>n.id===a), nb=NODES.find(n=>n.id===b);
        grad.addColorStop(0,na.glow+"55"); grad.addColorStop(1,nb.glow+"55");
        ctx.beginPath(); ctx.moveTo(pa.x,pa.y); ctx.lineTo(pb.x,pb.y);
        ctx.strokeStyle=grad; ctx.lineWidth=1; ctx.stroke();
      });

      PACKETS.forEach(pk => {
        pk.t += pk.speed; if (pk.t>1) pk.t=0;
        const na=NODES.find(n=>n.id===pk.edge[0]), nb=NODES.find(n=>n.id===pk.edge[1]);
        const pa=screenPos(na), pb=screenPos(nb);
        const px=pa.x+(pb.x-pa.x)*pk.t, py=pa.y+(pb.y-pa.y)*pk.t;
        ctx.beginPath(); ctx.arc(px,py,3*rScale,0,Math.PI*2);
        ctx.fillStyle=pk.color; ctx.fill();
        const t2=Math.max(0,pk.t-0.08);
        const px2=pa.x+(pb.x-pa.x)*t2, py2=pa.y+(pb.y-pa.y)*t2;
        const tg=ctx.createLinearGradient(px2,py2,px,py);
        tg.addColorStop(0,pk.color+"00"); tg.addColorStop(1,pk.color+"cc");
        ctx.beginPath(); ctx.moveTo(px2,py2); ctx.lineTo(px,py);
        ctx.strokeStyle=tg; ctx.lineWidth=2; ctx.stroke();
      });

      NODES.forEach(n => {
        const pos=screenPos(n);
        const isHov=hovered===n.id;
        const pulse=Math.sin(t/800+n.x*10)*0.5+0.5;
        const nr=n.r*rScale*(isHov?1.15:1);

        if (n.ring||isHov) {
          const ringR=nr+10+pulse*8;
          const rg=ctx.createRadialGradient(pos.x,pos.y,nr,pos.x,pos.y,ringR+6);
          rg.addColorStop(0,n.glow+"44"); rg.addColorStop(1,n.glow+"00");
          ctx.beginPath(); ctx.arc(pos.x,pos.y,ringR,0,Math.PI*2);
          ctx.fillStyle=rg; ctx.fill();
        }

        if (n.ring) {
          ctx.save(); ctx.translate(pos.x,pos.y); ctx.rotate(t/2000);
          ctx.beginPath(); ctx.arc(0,0,nr+14,0,Math.PI*1.5);
          ctx.strokeStyle=n.glow+"66"; ctx.lineWidth=1.5;
          ctx.setLineDash([4,6]); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
        }

        const cg=ctx.createRadialGradient(pos.x-nr*0.3,pos.y-nr*0.3,2,pos.x,pos.y,nr);
        cg.addColorStop(0,n.color+"ff"); cg.addColorStop(1,n.color+"99");
        ctx.beginPath(); ctx.arc(pos.x,pos.y,nr,0,Math.PI*2);
        ctx.fillStyle=cg; ctx.fill();
        ctx.strokeStyle=n.glow; ctx.lineWidth=isHov?2:1; ctx.stroke();

        drawIcon(n.icon,pos.x,pos.y,nr,"#fff");

        // Scale label font
        const labelSize = Math.max(10, 12 * rScale);
        ctx.fillStyle="#555555";
        ctx.font=`${isHov?600:500} ${isHov?labelSize-1:labelSize}px 'Inter',sans-serif`;
        ctx.textAlign="center";
        ctx.fillText(n.label, pos.x, pos.y+nr+16*rScale);
      });

      ctx.fillStyle="#1e293b";
      ctx.font=`bold ${Math.max(9,11*rScale)}px 'Inter',sans-serif`;
      ctx.textAlign="center";
      ctx.fillText("CSK INFORMATION TECHNOLOGY", W/2, H-10);

      raf=requestAnimationFrame(draw);
    };
    raf=requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      clearTimeout(touchClearTimer);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ borderRadius: "16px", display: "block", touchAction: "none" }}
      aria-label="CSK IT interactive tech network"
    />
  );
}

function FeatureItem({ icon, title, desc }) {
  return (
    <div className="flex flex-col gap-[6px]">
      <div className="w-10 h-10 sm:w-[44px] sm:h-[44px] rounded-full bg-[#eef3ff] border border-[#d6e4ff] flex items-center justify-center mb-1">
        {icon}
      </div>
      <p className="text-[13px] sm:text-[15px] font-bold text-[#1a1a2e] leading-snug">{title}</p>
      <p className="text-[12px] sm:text-[13px] text-[#6b7280] leading-[1.65]">{desc}</p>
    </div>
  );
}

const InnovationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9.5" stroke="#2563eb" strokeWidth="1.4"/>
    <circle cx="12" cy="12" r="2.5" fill="#2563eb"/>
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M6.34 6.34l1.41 1.41M16.24 16.24l1.42 1.42M6.34 17.66l1.41-1.41M16.24 7.76l1.42-1.42" stroke="#0ea5e9" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);
const ExpertiseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9.5" stroke="#10b981" strokeWidth="1.4"/>
    <rect x="8" y="7" width="8" height="10" rx="1" stroke="#10b981" strokeWidth="1.3"/>
    <path d="M10 10h4M10 12.5h3M10 15h4" stroke="#10b981" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
);
const CustomizedIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9.5" stroke="#6366f1" strokeWidth="1.4"/>
    <circle cx="12" cy="12" r="2.8" stroke="#6366f1" strokeWidth="1.3"/>
    <path d="M12 5v2M12 17v2M5 12h2M17 12h2" stroke="#6366f1" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);
const NationwideIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9.5" stroke="#0ea5e9" strokeWidth="1.4"/>
    <path d="M12 3c0 0 3 3.5 3 9s-3 9-3 9-3-3.5-3-9 3-9 3-9z" stroke="#0ea5e9" strokeWidth="1.2"/>
    <path d="M3 12h18" stroke="#0ea5e9" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

export default function SolutionPageFifthSection() {
  return (
    <section className="w-full bg-white" style={{ fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 flex flex-col lg:flex-row items-center gap-8 lg:gap-10">

        {/* LEFT */}
        <div className="flex-1 min-w-0 w-full">
          <h2
            className="text-[26px] sm:text-[32px] lg:text-[38px] font-extrabold text-[#0d1b3e] leading-[1.15] mb-3 sm:mb-4"
            style={{ letterSpacing: "-0.5px" }}
          >
            Why Businesses Trust CSK..?
          </h2>
          <p className="text-[13px] sm:text-[14px] text-[#555] leading-[1.8] mb-8 sm:mb-10 max-w-[400px]">
            Delivering excellence through innovation, industry expertise, and
            nationwide service capability. We don't just provide IT; we build
            resilient digital futures.
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:gap-x-10 sm:gap-y-8 max-w-[480px]">
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

        {/* RIGHT — canvas */}
        <div className="flex-1 w-full flex items-center justify-center">
          <div className="w-full max-w-[520px] rounded-2xl overflow-hidden shadow-2xl">
            <TechCanvas />
          </div>
        </div>

      </div>
    </section>
  );
}