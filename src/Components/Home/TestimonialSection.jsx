import { useState, useEffect, useRef } from "react";

// ── 8 Testimonials ─────────────────────────────────────────
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

// Show 2 at a time → 4 pages total
const PAIR_SIZE = 2;
const pairs = [];
for (let i = 0; i < testimonials.length; i += PAIR_SIZE) {
  pairs.push(testimonials.slice(i, i + PAIR_SIZE));
}

// ── Card colors alternating ────────────────────────────────
const CARD_STYLES = [
  { bg: "#1a3a6b", accent: "#f0a500", textColor: "#ffffff", quoteColor: "rgba(255,255,255,0.85)" },
  { bg: "#4a90d9", accent: "#ffffff", textColor: "#ffffff", quoteColor: "rgba(255,255,255,0.9)" },
];

// ── Single Testimonial Card ────────────────────────────────
function TestimonialCard({ person, colorIdx }) {
  const C = CARD_STYLES[colorIdx % 2];
  return (
    <div
      style={{
        flex: 1,
        background: C.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "48px 32px 40px",
        position: "relative",
        minHeight: 380,
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          overflow: "hidden",
          border: "4px solid rgba(255,255,255,0.3)",
          marginBottom: 20,
          flexShrink: 0,
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
        }}
      >
        <img
          src={person.avatar}
          alt={person.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Name */}
      <h3
        style={{
          fontSize: "1.3rem",
          fontWeight: 800,
          color: C.textColor,
          marginBottom: 4,
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          letterSpacing: "-0.01em",
        }}
      >
        {person.name}
      </h3>

      {/* Role */}
      <p
        style={{
          fontSize: "0.75rem",
          color: "rgba(255,255,255,0.65)",
          marginBottom: 14,
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {person.role}
      </p>

      {/* Accent line */}
      <div
        style={{
          width: 40,
          height: 3,
          background: C.accent,
          borderRadius: 2,
          marginBottom: 22,
        }}
      />

      {/* Quote */}
      <p
        style={{
          fontSize: "0.92rem",
          fontStyle: "italic",
          color: C.quoteColor,
          lineHeight: 1.75,
          fontFamily: "Georgia, serif",
          maxWidth: 260,
        }}
      >
        "{person.text}"
      </p>
    </div>
  );
}

// ── Main Section ───────────────────────────────────────────
export default function TestimonialsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [flipping, setFlipping]       = useState(false);
  const [flipDir, setFlipDir]         = useState("forward"); // forward | backward
  const [displayPage, setDisplayPage] = useState(0);         // what's actually rendered
  const timerRef = useRef(null);

  const totalPages = pairs.length;

  const goTo = (nextPage, dir = "forward") => {
    if (flipping) return;
    setFlipDir(dir);
    setFlipping(true);

    // After half the flip (page turns), swap content
    setTimeout(() => {
      setDisplayPage(nextPage);
      setCurrentPage(nextPage);
    }, 350);

    // After full flip completes
    setTimeout(() => {
      setFlipping(false);
    },500);
  };

  // Auto-advance every 3 seconds
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentPage(prev => {
        const next = (prev + 1) % totalPages;
        goTo(next, "forward");
        return prev; // state update handled inside goTo
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
    <section
      style={{
        background: "#f4f6f9",
        padding: "80px 0",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes flipForwardOut {
          0%   { transform: perspective(1400px) rotateY(0deg); opacity: 1; }
          100% { transform: perspective(1400px) rotateY(-90deg); opacity: 0; }
        }
        @keyframes flipForwardIn {
          0%   { transform: perspective(1400px) rotateY(90deg); opacity: 0; }
          100% { transform: perspective(1400px) rotateY(0deg); opacity: 1; }
        }
        @keyframes flipBackwardOut {
          0%   { transform: perspective(1400px) rotateY(0deg); opacity: 1; }
          100% { transform: perspective(1400px) rotateY(90deg); opacity: 0; }
        }
        @keyframes flipBackwardIn {
          0%   { transform: perspective(1400px) rotateY(-90deg); opacity: 0; }
          100% { transform: perspective(1400px) rotateY(0deg); opacity: 1; }
        }
        .flip-out-forward { animation: flipForwardOut 0.35s cubic-bezier(0.4,0,0.2,1) forwards; }
        .flip-in-forward  { animation: flipForwardIn  0.35s cubic-bezier(0.4,0,0.2,1) 0.35s forwards; opacity: 0; }
        .flip-out-backward { animation: flipBackwardOut 0.35s cubic-bezier(0.4,0,0.2,1) forwards; }
        .flip-in-backward  { animation: flipBackwardIn  0.35s cubic-bezier(0.4,0,0.2,1) 0.35s forwards; opacity: 0; }

        .testimonial-dot {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .testimonial-dot:hover { transform: scale(1.3); }
        .nav-arrow {
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .nav-arrow:hover { transform: scale(1.1); background: #1a3a6b !important; color: white !important; }
      `}</style>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          gap: 60,
        }}
      >
        {/* ── Left: Heading ── */}
        <div style={{ flex: "0 0 380px", maxWidth: 380 }}>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#f0a500",
              marginBottom: 12,
            }}
          >
            Testimonials
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              fontWeight: 900,
              color: "#1a2c5b",
              lineHeight: 1.15,
              marginBottom: 24,
              letterSpacing: "-0.02em",
            }}
          >
            What Our Users<br />Are Saying
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "#6b7280",
              lineHeight: 1.75,
              marginBottom: 36,
            }}
          >
            Our clients value our commitment to innovation, technical expertise, responsive support, and ability to deliver scalable technology solutions that improve business efficiency, security, and operational performance.
          </p>

          {/* JOIN NOW button */}
          <a
            href="#"
            style={{
              display: "inline-block",
              background: "#f0a500",
              color: "#fff",
              fontWeight: 800,
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "16px 36px",
              borderRadius: 4,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(240,165,0,0.35)",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#d4920a"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#f0a500"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Join Now
          </a>

          {/* Page indicator dots */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 36 }}>
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

          {/* Page counter */}
          {/* <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 10 }}>
            {currentPage + 1} / {totalPages}
          </p> */}
        </div>

        {/* ── Right: Flip Cards ── */}
        <div style={{ flex: 1, position: "relative" }}>
          {/* Nav arrows */}
          <button
            className="nav-arrow"
            onClick={handlePrev}
            style={{
              position: "absolute",
              left: -22,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#fff",
              border: "2px solid #e2e8f0",
              color: "#1a3a6b",
              fontSize: 18,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
            }}
          >
            ‹
          </button>

          {/* Flip book container */}
          <div
            style={{
              display: "flex",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(26,58,107,0.22), 0 2px 8px rgba(0,0,0,0.08)",
              transformStyle: "preserve-3d",
            }}
            className={
              flipping
                ? flipDir === "forward"
                  ? "flip-out-forward"
                  : "flip-out-backward"
                : flipDir === "forward"
                ? "flip-in-forward"
                : "flip-in-backward"
            }
          >
            {pair.map((person, i) => (
              <TestimonialCard key={person.name} person={person} colorIdx={i} />
            ))}
          </div>

          {/* Book spine shadow */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "50%",
              width: 3,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.18), rgba(0,0,0,0.06), rgba(0,0,0,0.18))",
              transform: "translateX(-50%)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />

          <button
            className="nav-arrow"
            onClick={handleNext}
            style={{
              position: "absolute",
              right: -22,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#fff",
              border: "2px solid #e2e8f0",
              color: "#1a3a6b",
              fontSize: 18,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
            }}
          >
            ›
          </button>

          {/* Auto-play progress bar */}
          <div
            style={{
              position: "absolute",
              bottom: -14,
              left: 0,
              right: 0,
              height: 3,
              background: "#e2e8f0",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              key={currentPage}
              style={{
                height: "100%",
                background: "#f0a500",
                borderRadius: 2,
                animation: "progressBar 3s linear forwards",
              }}
            />
          </div>
          <style>{`
            @keyframes progressBar {
              from { width: 0% }
              to   { width: 100% }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}