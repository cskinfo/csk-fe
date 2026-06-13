import React, { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); obs.unobserve(ref.current); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const dur = 1800;
    const frame = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / dur, 1);
      const ease = 1 - Math.pow(2, -10 * p);
      setCount(Math.floor(target * ease));
      if (p < 1) requestAnimationFrame(frame);
      else setCount(target);
    };
    requestAnimationFrame(frame);
  }, [started, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const StatCard = ({ icon: Icon, target, suffix, label, index }) => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState('');
  const cardRef = useRef(null);
  const wrapRef = useRef(null);
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.unobserve(wrapRef.current); }
    }, { threshold: 0.1 });
    if (wrapRef.current) obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (isTouch.current || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    const rx = ((y - rect.height / 2) / (rect.height / 2)) * -10;
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 10;
    setTilt(`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.04,1.04,1.04)`);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)');
  };

  // SVG icons inline (no external dependency)
  const icons = {
    building: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 7l9-4 9 4M4 21V7m16 14V7M9 21v-4a3 3 0 016 0v4"/>
      </svg>
    ),
    users: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    award: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    check: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  };

  return (
    <div
      ref={wrapRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.94)',
        transition: `opacity 0.8s cubic-bezier(0.34,1.56,0.64,1) ${index * 130}ms, transform 0.8s cubic-bezier(0.34,1.56,0.64,1) ${index * 130}ms`,
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => !isTouch.current && setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          aspectRatio: '1 / 1',
          borderRadius: '20px',
          background: '#ffffff',
          border: '1px solid #e8e8ec',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          overflow: 'hidden',
          cursor: 'pointer',
          boxShadow: hovered ? '0 16px 36px rgba(37,99,235,0.14)' : '0 4px 18px rgba(0,0,0,0.05)',
          transform: tilt || 'perspective(1000px)',
          transformStyle: 'preserve-3d',
          transition: 'box-shadow 0.3s, border-color 0.3s',
          borderColor: hovered ? 'rgba(37,99,235,0.25)' : '#e8e8ec',
        }}
      >
        {/* Mouse spotlight */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '20px', pointerEvents: 'none',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
          background: `radial-gradient(260px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37,99,235,0.06), transparent 60%)`,
        }} />

        {/* Icon */}
        <div style={{ position: 'relative', zIndex: 2, transform: 'translateZ(30px)' }}>
          <div className="wcu-icon-circle" style={{
            borderRadius: '50%',
            background: '#f3f6fd',
            border: '1px solid #e8edfa',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {icons[Icon]}
          </div>
        </div>

        {/* Value */}
        <p className="wcu-value" style={{ position: 'relative', zIndex: 2, fontWeight: 800, color: '#111111', margin: 0, transform: 'translateZ(30px)' }}>
          <AnimatedCounter target={target} suffix={suffix} />
        </p>

        {/* Label */}
        <p className="wcu-label" style={{
          position: 'relative', zIndex: 2, color: '#444444',
          fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
          textAlign: 'center', lineHeight: 1.6, margin: 0,
          transform: 'translateZ(20px)',
        }}>
          {label}
        </p>
      </div>
    </div>
  );
};

const ParallaxHero = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const dist = (rect.top + rect.height / 2) - window.innerHeight / 2;
      setOffset(prev => ({ ...prev, y: dist * 0.18 }));
    };
    const handleMouse = (e) => {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      setOffset({ x: (e.clientX - cx) * 0.025, y: (e.clientY - cy) * 0.018 });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <div ref={sectionRef} className="wcu-hero" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: '8px' }}>
      {/* Blobs */}
      {[
        { w: 280, h: 280, top: '-50px', right: '-50px', color: 'rgba(37,99,235,0.06)', mx: -0.6, my: -0.5 },
        { w: 220, h: 220, bottom: '-30px', left: '-30px', color: 'rgba(37,99,235,0.05)', mx: 0.5, my: 0.6 },
        { w: 180, h: 180, top: '30%', left: '55%', color: 'rgba(37,99,235,0.04)', mx: 0.8, my: 0.3 },
      ].map((b, i) => (
        <div key={i} style={{
          position: 'absolute', width: b.w, height: b.h,
          top: b.top, right: b.right, bottom: b.bottom, left: b.left,
          borderRadius: '50%', pointerEvents: 'none',
          background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
          transform: `translate(${offset.x * b.mx}px, ${offset.y * b.my}px)`,
        }} />
      ))}

      {/* BG text */}
      <div className="wcu-bg-text" style={{
        position: 'absolute',
        fontWeight: 900, color: 'rgba(0,0,0,0.035)',
        letterSpacing: '-4px', userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap',
        transform: `translate(${offset.x * -1.4}px, ${offset.y * -0.8}px)`,
      }}>
        WHY CHOOSE US
      </div>

      {/* Foreground */}
      <div className="wcu-hero-content" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: '#ffffff', border: '1px solid #e0e0e6',
          borderRadius: '999px', padding: '5px 16px', fontSize: '13px',
          color: '#2563eb', fontWeight: 600, marginBottom: '16px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2563eb', display: 'inline-block' }} />
          Why Choose Us
        </div>
        <h2 className="wcu-heading" style={{ fontWeight: 900, color: '#111111', margin: '0 0 12px', lineHeight: 1.1, letterSpacing: '-1px' }}>
          Why Choose Us
        </h2>
        <p className="wcu-subtext" style={{ color: '#555555', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
          With industry expertise, innovation-driven strategies, and nationwide support capabilities, we help businesses achieve reliable and sustainable digital transformation.
        </p>
      </div>
    </div>
  );
};

const WhyChooseUs = () => {
  const stats = [
    { icon: 'building', target: 150, suffix: '+', label: 'Certified & Skilled Professionals' },
    { icon: 'users',    target: 90,  suffix: '+', label: 'Trusted Clients Across Industries' },
    { icon: 'award',    target: 15,  suffix: '+', label: 'Years of Industry Experience' },
    { icon: 'check',    target: 3408,suffix: '+', label: 'Postcodes With Same-Day Support' },
  ];

  return (
    <section style={{
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      background: '#ffffff',
      width: '100%',
      padding: '0 0 64px 0',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        .wcu-hero {
          height: 300px;
        }
        .wcu-bg-text {
          font-size: clamp(70px, 17vw, 160px);
        }
        .wcu-heading {
          font-size: clamp(2rem, 5vw, 3.5rem);
        }
        .wcu-subtext {
          font-size: 14px;
        }
        .wcu-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 36px;
        }
        .wcu-icon-circle {
          width: 58px;
          height: 58px;
        }
        .wcu-value {
          font-size: 28px;
        }
        .wcu-label {
          font-size: 10px;
          padding: 0 12px;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .wcu-hero {
            height: 260px;
          }
          .wcu-hero-content {
            padding: 0 16px;
          }
          .wcu-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .wcu-hero {
            height: auto;
            padding: 48px 16px;
          }
          .wcu-bg-text {
            font-size: clamp(48px, 22vw, 90px);
          }
          .wcu-subtext {
            font-size: 13px;
            padding: 0 8px;
          }
          .wcu-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .wcu-icon-circle {
            width: 46px;
            height: 46px;
          }
          .wcu-icon-circle svg {
            width: 20px;
            height: 20px;
          }
          .wcu-value {
            font-size: 22px;
          }
          .wcu-label {
            font-size: 9px;
            padding: 0 6px;
          }
        }

        /* Small mobile */
        @media (max-width: 380px) {
          .wcu-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .wcu-value {
            font-size: 18px;
          }
          .wcu-label {
            font-size: 8px;
          }
        }
      `}</style>

      <ParallaxHero />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px' }}>
        {/* Stats grid */}
        <div className="wcu-grid">
          {stats.map((s, i) => (
            <StatCard key={i} icon={s.icon} target={s.target} suffix={s.suffix} label={s.label} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;