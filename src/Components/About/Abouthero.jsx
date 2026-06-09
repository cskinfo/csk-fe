import React, { useEffect, useRef } from "react";
import heroBg from "../../assets/AboutPagePhoto/aboutImage.jpg";

function OrbCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv.getContext("2d");
    let animId;
    let t = 0;

    function resize() {
      cv.width = cv.offsetWidth;
      cv.height = cv.offsetHeight;
    }

    function draw() {
      const W = cv.width;
      const H = cv.height;
      ctx.clearRect(0, 0, W, H);

      const orbs = [
        { x: W * 0.2, y: H * 0.4, r: 180, speed: 0.008, color: "15,80,140" },
        { x: W * 0.8, y: H * 0.6, r: 160, speed: 0.011, color: "10,60,110" },
        { x: W * 0.5, y: H * 0.2, r: 140, speed: 0.006, color: "20,100,160" },
      ];

      orbs.forEach((o, i) => {
        const ox = o.x + Math.sin(t * o.speed + i) * 30;
        const oy = o.y + Math.cos(t * o.speed + i) * 18;
        const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r);
        g.addColorStop(0, `rgba(${o.color},0.18)`);
        g.addColorStop(1, `rgba(${o.color},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      t++;
      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(cv);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 2,
      }}
    />
  );
}

export default function AboutHero() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "380px",
        maxHeight: "380px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#0b1f35",
      }}
    >
      {/* Background photo */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(8,20,40,0.70), rgba(8,20,40,0.70)), url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        }}
      />

      {/* Soft orb canvas */}
      <OrbCanvas />

      {/* Text */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: "680px",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(1.7rem, 3.8vw, 2.5rem)",
            fontWeight: 800,
            color: "#ffffff",
            margin: "0 0 16px",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
          }}
        >
          Powering Business Evolution
          <br />
          through Intelligent Design.
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "rgba(200,225,245,0.65)",
            lineHeight: 1.75,
            margin: 0,
            maxWidth: "520px",
            marginInline: "auto",
          }}
        >
          We bridge the gap between complex technology and human-centric
          experiences, crafting solutions that scale and inspire.
        </p>
      </div>
    </section>
  );
}
