import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function NetworkBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.width;
    const H = () => canvas.height;

    const nodes = Array.from({ length: 55 }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2.5 + 1,
      pulse: Math.random() * Math.PI * 2,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W(), H());

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100,160,255,${0.18 * (1 - dist / 160)})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        n.pulse += 0.03;
        const glow = Math.sin(n.pulse) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + glow, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(80,160,255,${0.5 + glow * 0.4})`;
        ctx.fill();
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W()) n.vx *= -1;
        if (n.y < 0 || n.y > H()) n.vy *= -1;
      });

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

export default function SolutionPageHeroSection() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap" rel="stylesheet" />

      <section
        className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-20"
        style={{
          background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 40%, #0a1628 100%)",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <NetworkBg />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center max-w-3xl w-full text-center">

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-8 tracking-tight">
            Overcoming Challenges,<br />
            Achieving Dreams!
          </h1>

          {/* Card */}
          <div
            className="w-full max-w-2xl rounded-2xl p-10 backdrop-blur-md border border-white/10"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <p className="text-sm md:text-base text-[#c8d8e8] leading-relaxed mb-8">
              The technology landscape is changing rapidly, disrupting existing businesses
              and altering entire marketplaces. Enterprises must adapt to these dynamic
              changes and integrate the latest innovations into their "IT infrastructures or risk
              being left behind by nimbler competitors". CSK Information Technology Pvt. Ltd.
              specialize in providing clients with 360-degree IT solutions that are
              strategically aligned with business objectives.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/Service" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-7 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5">
                Explore Our Services
              </Link>
              <button className="bg-transparent hover:bg-white/10 text-white text-sm font-semibold px-7 py-3 rounded-lg border-2 border-white/40 hover:border-white transition-all duration-200 hover:-translate-y-0.5">
                Get Expert Consultation
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
