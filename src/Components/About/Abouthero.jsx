import React, { useEffect, useRef, useState } from "react";
import heroBg from "../../assets/AboutPagePhoto/aboutImages.jpg";

/* Inject a <link rel="preload"> as early as possible so the browser
   starts fetching the image in parallel with JS parsing. */
function usePreloadImage(src) {
  useEffect(() => {
    if (!src) return;
    const existing = document.querySelector(`link[rel="preload"][href="${src}"]`);
    if (existing) return;
    const link = document.createElement("link");
    link.rel      = "preload";
    link.as       = "image";
    link.href     = src;
    link.fetchPriority = "high";          // tell browser: this is important
    document.head.prepend(link);          // prepend = as early as possible
  }, [src]);
}

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
  usePreloadImage(heroBg);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <>
      <style>{`
        .about-hero {
          position: relative;
          width: 100%;
          min-height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #0b1f35;
        }

        /* Tablet */
        @media (max-width: 768px) {
          .about-hero { min-height: 320px; }
          .about-hero-text { padding: 48px 32px !important; }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .about-hero { min-height: 280px; }
          .about-hero-text { padding: 40px 20px !important; }
        }
      `}</style>

      <section className="about-hero">
        {/* Background photo — <img> so preload works correctly */}
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          onLoad={() => setImgLoaded(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            zIndex: 1,
            opacity: imgLoaded ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />
        {/* Dark overlay — always visible so text is readable even before image loads */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(8,20,40,0.70)",
            zIndex: 1,
          }}
        />

        {/* Soft orb canvas */}
        <OrbCanvas />

        {/* Text */}
        <div
          className="about-hero-text"
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            padding: "0 24px",
            maxWidth: "680px",
            width: "100%",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
              fontWeight: 800,
              color: "#ffffff",
              margin: "0 0 14px",
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
              fontSize: "clamp(0.875rem, 2.2vw, 1rem)",
              color: "rgba(200,225,245,0.65)",
              lineHeight: 1.75,
              margin: "0 auto",
              maxWidth: "520px",
            }}
          >
            We bridge the gap between complex technology and human-centric
            experiences, crafting solutions that scale and inspire.
          </p>
        </div>
      </section>
    </>
  );
}