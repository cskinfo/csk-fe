import { useRef } from "react";
import first from "../../assets/SolutionPagePhoto/first.jpg";
import second from "../../assets/SolutionPagePhoto/second.jpg";
import third from "../../assets/SolutionPagePhoto/third.jpg";
import fourth from "../../assets/SolutionPagePhoto/fourth.jpg";
import fifth from "../../assets/SolutionPagePhoto/fifth.jpg";
import sixth from "../../assets/SolutionPagePhoto/sixth.jpg";

const cards = [
  {
    title: "Enterprise Infrastructure",
    image: first,
    points: [
      "End-User Compute Solutions",
      "Infrastructure Deployment",
      "Managed Device Support",
    ],
  },
  {
    title: "Data Center Solutions",
    image: second,
    points: [
      "Smart Rack Systems",
      "Advanced Cooling Solutions",
      "Cloud Integration Services",
    ],
  },
  {
    title: "Cloud & Security",
    image: third,
    points: [
      "Hybrid Cloud Architecture",
      "Firewall & Threat Protection",
      "Data Encryption Services",
    ],
  },
  {
    title: "Networking Solutions",
    image: fourth,
    points: [
      "Advanced Routers & Switches",
      "Enterprise Wireless Setup",
      "Secure VPN & SD-WAN",
    ],
  },
  {
    title: "AV & Collaboration",
    image: fifth,
    position: "center 15%",
    points: [
      "Smart Boardroom Design",
      "Pro Video Conferencing",
      "Smart Classroom Tech",
    ],
  },
  {
    title: "Managed Services",
    image: sixth,
    points: [
      "24/7 Remote Monitoring",
      "Enterprise Help Desk",
      "IT Vendor Management",
    ],
  },
];

function TiltCard({ card }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const applyTilt = (clientX, clientY) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;

    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;
    el.style.transition = "transform 0.1s ease";

    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(26,107,189,0.12), transparent 70%)`;
    }
  };

  const resetTilt = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    el.style.transition = "transform 0.4s ease";
    if (glowRef.current) {
      glowRef.current.style.background = "transparent";
    }
  };

  const handlePointerMove = (e) => {
    // Only track primary pointer (finger or mouse)
    if (!e.isPrimary) return;
    applyTilt(e.clientX, e.clientY);
  };

  const handlePointerLeave = (e) => {
    if (!e.isPrimary) return;
    resetTilt();
  };

  // Also reset on pointer up (finger lift on mobile)
  const handlePointerUp = (e) => {
    if (!e.isPrimary) return;
    resetTilt();
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerUp={handlePointerUp}
      className="relative rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-xl cursor-pointer"
      style={{ transformStyle: "preserve-3d", willChange: "transform", touchAction: "pan-y" }}
    >
      {/* Glow overlay */}
      <div
        ref={glowRef}
        className="absolute inset-0 z-10 pointer-events-none rounded-2xl transition-all duration-200"
      />

      {/* Image */}
      <div className="w-full h-44 sm:h-48 overflow-hidden">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          style={{ objectPosition: card.position || "center" }}
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 sm:mb-3">
          {card.title}
        </h3>
        <ul className="space-y-1.5">
          {card.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2 text-xs sm:text-sm text-gray-600"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function SolutionPageThirdSection() {
  return (
    <section
      className="w-full bg-white py-10 sm:py-14 md:py-16 px-4 sm:px-6"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Comprehensive Technology Solutions
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Innovative and integrated IT ecosystems designed to improve
            efficiency, security, scalability, and digital transformation.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {cards.map((card) => (
            <TiltCard key={card.title} card={card} />
          ))}
        </div>

      </div>
    </section>
  );
}