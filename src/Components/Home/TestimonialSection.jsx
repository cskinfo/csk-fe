import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Natalie Rose",
    role: "IT Manager, FinServ Inc.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "CSK's technical expertise transformed our infrastructure. Their responsive support and innovative solutions improved our operational efficiency beyond expectations.",
  },
  {
    name: "Dyland Prose",
    role: "CTO, TechBridge Ltd.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Scalable, secure, and delivered on time. CSK Information Technology redefined what we thought was possible for enterprise IT deployments.",
  },
  {
    name: "Priya Sharma",
    role: "Operations Head, LogiCorp",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "Working with CSK felt like having a dedicated in-house team. Their commitment to our success was evident in every interaction and every deliverable.",
  },
  {
    name: "Arjun Mehta",
    role: "Director, CloudBase Systems",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    text: "The level of security and compliance CSK brought to our systems gave us complete confidence. Truly a partner who understands enterprise needs.",
  },
  {
    name: "Sarah Williams",
    role: "VP Engineering, NovaTech",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    text: "From implementation to post-launch support, CSK exceeded every benchmark we set. Their team is professional, knowledgeable, and genuinely invested.",
  },
  {
    name: "Rahul Gupta",
    role: "CEO, DataDrive Solutions",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    text: "CSK helped us migrate to a fully cloud-based architecture seamlessly. Zero downtime, perfect execution, and incredible after-support.",
  },
  {
    name: "Emily Chen",
    role: "Product Lead, SyncWave",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    text: "Their ability to understand our complex requirements and deliver tailored solutions is unmatched. CSK is the gold standard for IT partnerships.",
  },
  {
    name: "Vikram Singh",
    role: "MD, InfraPrime Group",
    avatar: "https://randomuser.me/api/portraits/men/18.jpg",
    text: "We've worked with many vendors, but CSK stands apart. Their proactive approach and technical depth make them an invaluable long-term partner.",
  },
];

const PAIR_SIZE = 2;
const pairs = [];
for (let i = 0; i < testimonials.length; i += PAIR_SIZE) {
  pairs.push(testimonials.slice(i, i + PAIR_SIZE));
}

const CARD_STYLES = [
  { bg: "#1a3a6b", accent: "#f0a500", textColor: "#ffffff", quoteColor: "rgba(255,255,255,0.85)" },
  { bg: "#4a90d9", accent: "#ffffff", textColor: "#ffffff", quoteColor: "rgba(255,255,255,0.9)" },
];

function TestimonialCard({ person, colorIdx }) {
  const C = CARD_STYLES[colorIdx % 2];
  return (
    <div className="t-card" style={{ background: C.bg }}>
      <div className="t-avatar-wrap">
        <img src={person.avatar} alt={person.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <h3 className="t-name" style={{ color: C.textColor }}>{person.name}</h3>
      <p className="t-role">{person.role}</p>
      <div className="t-line" style={{ background: C.accent }} />
      <p className="t-quote" style={{ color: C.quoteColor }}>"{person.text}"</p>
    </div>
  );
}

export default function TestimonialsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [flipping, setFlipping]       = useState(false);
  const [flipDir, setFlipDir]         = useState("forward");
  const [displayPage, setDisplayPage] = useState(0);
  const timerRef = useRef(null);

  const totalPages = pairs.length;

  const goTo = (nextPage, dir = "forward") => {
    if (flipping) return;
    setFlipDir(dir);
    setFlipping(true);
    setTimeout(() => { setDisplayPage(nextPage); setCurrentPage(nextPage); }, 350);
    setTimeout(() => { setFlipping(false); }, 500);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentPage(prev => {
        const next = (prev + 1) % totalPages;
        goTo(next, "forward");
        return prev;
      });
    }, 3000);
    return () => clearInterval(timerRef.current);
  }, [flipping]);

  const handlePrev = () => {
    clearInterval(timerRef.current);
    const prev = (currentPage - 1 + totalPages) % totalPages;
    goTo(prev, "backward");
  };

  const handleNext = () => {
    clearInterval(timerRef.current);
    const next = (currentPage + 1) % totalPages;
    goTo(next, "forward");
  };

  const pair = pairs[displayPage];

  return (
    <section className="t-section">
      <style>{`

        /* ════════════════════════════════
           ANIMATIONS — unchanged
        ════════════════════════════════ */
        @keyframes flipForwardOut {
          0%   { transform: perspective(1400px) rotateY(0deg);   opacity: 1; }
          100% { transform: perspective(1400px) rotateY(-90deg); opacity: 0; }
        }
        @keyframes flipForwardIn {
          0%   { transform: perspective(1400px) rotateY(90deg);  opacity: 0; }
          100% { transform: perspective(1400px) rotateY(0deg);   opacity: 1; }
        }
        @keyframes flipBackwardOut {
          0%   { transform: perspective(1400px) rotateY(0deg);  opacity: 1; }
          100% { transform: perspective(1400px) rotateY(90deg); opacity: 0; }
        }
        @keyframes flipBackwardIn {
          0%   { transform: perspective(1400px) rotateY(-90deg); opacity: 0; }
          100% { transform: perspective(1400px) rotateY(0deg);   opacity: 1; }
        }
        @keyframes progressBar {
          from { width: 0% }
          to   { width: 100% }
        }
        .flip-out-forward  { animation: flipForwardOut  0.35s cubic-bezier(0.4,0,0.2,1) forwards; }
        .flip-in-forward   { animation: flipForwardIn   0.35s cubic-bezier(0.4,0,0.2,1) 0.35s forwards; opacity: 0; }
        .flip-out-backward { animation: flipBackwardOut 0.35s cubic-bezier(0.4,0,0.2,1) forwards; }
        .flip-in-backward  { animation: flipBackwardIn  0.35s cubic-bezier(0.4,0,0.2,1) 0.35s forwards; opacity: 0; }

        .testimonial-dot { transition: all 0.3s ease; cursor: pointer; }
        .testimonial-dot:hover { transform: scale(1.3); }
        .nav-arrow { transition: all 0.2s ease; cursor: pointer; }
        .nav-arrow:hover { transform: scale(1.1); background: #1a3a6b !important; color: white !important; }

        /* ════════════════════════════════
           BASE — mobile first
        ════════════════════════════════ */

        .t-section {
          background: #f4f6f9;
          padding: 48px 0 60px;
          font-family: 'Segoe UI', system-ui, sans-serif;
          overflow: hidden;
        }

        /* OUTER WRAPPER */
        .t-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          flex-direction: column;   /* stack on mobile */
          align-items: stretch;
          gap: 48px;
        }

        /* ── LEFT: HEADING PANEL ── */
        .t-left {
          flex: none;
          width: 100%;
          text-align: center;       /* center on mobile */
        }
        .t-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #ff7f50;
          margin-bottom: 10px;
        }
        .t-heading {
          font-size: clamp(1.7rem, 6vw, 2.8rem);
          font-weight: 700;
          color: #000000 ;
          line-height: 1.15;
          margin-bottom: 18px;
          letter-spacing: -0.02em;
        }
        .t-body {
          font-size: 0.92rem;
          color: #6b7280;
          line-height: 1.75;
          margin-bottom: 28px;
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
        }
        .t-join-btn {
          display: inline-block;
          background: #ff4f00 ;
          color: #fff;
          font-weight: 800;
          font-size: 0.82rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 14px 30px;
          border-radius: 4px;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(240,165,0,0.35);
          transition: all 0.2s;
        }
        .t-join-btn:hover {
          background: #ff4500;
          transform: translateY(-2px);
        }
        .t-dots {
          display: flex;
          align-items: center;
          justify-content: center;   /* center on mobile */
          gap: 8px;
          margin-top: 28px;
        }

        /* ── RIGHT: FLIP CARDS ── */
        .t-right {
          flex: 1;
          position: relative;
          padding: 0 28px;          /* room for nav arrows */
        }
        .t-flipbook {
          display: flex;
          flex-direction: column;   /* stack cards on mobile */
          border-radius: 16px;
          overflow: hidden;
          box-shadow:
            0 20px 60px rgba(26,58,107,0.22),
            0 2px 8px rgba(0,0,0,0.08);
          transform-style: preserve-3d;
        }
        .t-spine {
          position: absolute;
          top: 0; bottom: 0;
          left: 50%;
          width: 3px;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.18),
            rgba(0,0,0,0.06),
            rgba(0,0,0,0.18)
          );
          transform: translateX(-50%);
          pointer-events: none;
          z-index: 2;
          display: none;            /* hidden on mobile (stacked) */
        }
        .t-progress-wrap {
          position: absolute;
          bottom: -14px;
          left: 0; right: 0;
          height: 3px;
          background: #ffffff;
          border-radius: 2px;
          overflow: hidden;
        }
        .t-progress-bar {
          height: 100%;
          background: #ff4500;
          border-radius: 2px;
          animation: progressBar 3s linear forwards;
        }

        /* NAV ARROWS */
        .t-nav-prev,
        .t-nav-next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #e2e8f0;
          color: #1a3a6b;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 12px rgba(0,0,0,0.12);
        }
        .t-nav-prev { left: -6px; }
        .t-nav-next { right: -6px; }

        /* ── CARD ── */
        .t-card {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 36px 24px 32px;
          position: relative;
          min-height: 320px;
        }
        .t-avatar-wrap {
          width: 86px;
          height: 86px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid rgba(255,255,255,0.3);
          margin-bottom: 16px;
          flex-shrink: 0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
        }
        .t-name {
          font-size: 1.15rem;
          font-weight: 800;
          margin-bottom: 4px;
          letter-spacing: -0.01em;
        }
        .t-role {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.65);
          margin-bottom: 12px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .t-line {
          width: 40px;
          height: 3px;
          border-radius: 2px;
          margin-bottom: 18px;
        }
        .t-quote {
          font-size: 0.88rem;
          font-style: italic;
          line-height: 1.75;
          font-family: Georgia, serif;
          max-width: 260px;
        }

        /* ════════════════════════════════
           TABLET  ≥ 640px
        ════════════════════════════════ */
        @media (min-width: 640px) {
          .t-section  { padding: 64px 0 72px; }
          .t-wrapper  { padding: 0 32px; }
          .t-right    { padding: 0 32px; }
          .t-nav-prev { left: -4px; }
          .t-nav-next { right: -4px; }
          .t-card     { padding: 40px 28px 36px; min-height: 340px; }
          .t-avatar-wrap { width: 92px; height: 92px; }
          .t-name     { font-size: 1.2rem; }
          .t-quote    { font-size: 0.9rem; }
        }

        /* ════════════════════════════════
           TABLET LANDSCAPE  ≥ 768px
           Cards side-by-side again
        ════════════════════════════════ */
        @media (min-width: 768px) {
          .t-flipbook { flex-direction: row; }  /* side-by-side cards */
          .t-spine    { display: block; }        /* show spine divider */
          .t-card     { min-height: 360px; }
        }

        /* ════════════════════════════════
           DESKTOP  ≥ 1024px
           Left + Right side-by-side layout
        ════════════════════════════════ */
        @media (min-width: 1024px) {
          .t-section  { padding: 80px 0; }
          .t-wrapper  {
            flex-direction: row;     /* heading left, cards right */
            align-items: center;
            gap: 60px;
            padding: 0 40px;
          }
          .t-left {
            flex: 0 0 380px;
            max-width: 380px;
            text-align: left;        /* left-align on desktop */
          }
          .t-body     { margin-left: 0; margin-right: 0; }
          .t-dots     { justify-content: flex-start; }
          .t-right    { padding: 0 28px; }
          .t-nav-prev { left: -22px; }
          .t-nav-next { right: -22px; }
          .t-nav-prev,
          .t-nav-next { width: 44px; height: 44px; }
          .t-card     { padding: 48px 32px 40px; min-height: 380px; }
          .t-avatar-wrap { width: 100px; height: 100px; }
          .t-name     { font-size: 1.3rem; }
          .t-quote    { font-size: 0.92rem; }
        }

        /* ════════════════════════════════
           LARGE DESKTOP  ≥ 1280px
        ════════════════════════════════ */
        @media (min-width: 1280px) {
          .t-wrapper { padding: 0 48px; }
        }

      `}</style>

      <div className="t-wrapper">

        {/* ── LEFT ── */}
        <div className="t-left">
          <p className="t-label">Testimonials</p>
          <h2 className="t-heading">
            What Our Users<br />Are Saying
          </h2>
          <p className="t-body">
            Our clients value our commitment to innovation, technical expertise,
            responsive support, and ability to deliver scalable technology solutions
            that improve business efficiency, security, and operational performance.
          </p>
          <a className="t-join-btn" href="#">Join Now</a>
          <div className="t-dots">
            {pairs.map((_, i) => (
              <div
                key={i}
                className="testimonial-dot"
                onClick={() => goTo(i, i > currentPage ? "forward" : "backward")}
                style={{
                  width: i === currentPage ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === currentPage ? "#1a3a6b" : "#c8d4e8",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="t-right">

          {/* Prev */}
          <button className="t-nav-prev nav-arrow" onClick={handlePrev}>‹</button>

          {/* Flip book */}
          <div
            className={`t-flipbook ${
              flipping
                ? flipDir === "forward" ? "flip-out-forward"  : "flip-out-backward"
                : flipDir === "forward" ? "flip-in-forward"   : "flip-in-backward"
            }`}
          >
            {pair.map((person, i) => (
              <TestimonialCard key={person.name} person={person} colorIdx={i} />
            ))}
          </div>

          {/* Spine */}
          <div className="t-spine" />

          {/* Next */}
          <button className="t-nav-next nav-arrow" onClick={handleNext}>›</button>

          {/* Progress bar */}
          <div className="t-progress-wrap">
            <div key={currentPage} className="t-progress-bar" />
          </div>

        </div>
      </div>
    </section>
  );
}