import { useEffect, useRef, useState, useCallback } from "react";

const stats = [
  { number: 150, suffix: "+", label: "PROFESSIONALS" },
  { number: 4000, suffix: "+", label: "DEVICES DELIVERED" },
  { number: 90, suffix: "+", label: "ENTERPRISE CLIENTS" },
  { number: 66, suffix: "", label: "SERVICE LOCATIONS" },
];

function useCountUp(target, duration = 1800, trigger) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    setCount(0);
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [trigger, target, duration]);

  return count;
}

function StatItem({ number, suffix, label, trigger, divider }) {
  const count = useCountUp(number, 1800, trigger);
  const [hovered, setHovered] = useState(false);

  const handlePointerEnter = useCallback(() => setHovered(true), []);
  const handlePointerLeave = useCallback(() => setHovered(false), []);
  // On touch, remove hover highlight after a short delay
  const handleTouchEnd = useCallback(() => {
    setTimeout(() => setHovered(false), 400);
  }, []);

  return (
    <div
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onTouchEnd={handleTouchEnd}
      className={[
        "flex flex-col items-center justify-center text-center",
        "transition-all duration-200 rounded-xl cursor-default",
        // Responsive padding: tighter on mobile, normal on tablet+
        "py-4 px-3 sm:py-5 sm:px-4 md:py-6 md:px-6",
        divider ? "border-r border-gray-300" : "",
        hovered ? "bg-blue-50 scale-[1.04]" : "",
      ].join(" ")}
    >
      <span
        className={[
          "font-bold text-gray-800 tracking-tight tabular-nums",
          // Responsive font size: smaller on mobile, larger on desktop
          "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
        ].join(" ")}
      >
        {count.toLocaleString()}{suffix}
      </span>
      <span
        className={[
          "mt-1.5 font-semibold text-blue-500 tracking-widest uppercase",
          // Responsive label size
          "text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs",
        ].join(" ")}
      >
        {label}
      </span>
    </div>
  );
}

export default function SolutionPageSecondSection() {
  const sectionRef = useRef(null);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTrigger(false);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setTrigger(true));
          });
        }
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#f4f6fb] border-y border-gray-200"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div
        className={[
          "max-w-5xl mx-auto px-4 sm:px-6 py-2 sm:py-3 md:py-4",
          // 2-col on mobile/tablet, 4-col on desktop — dividers need adjustment
          "grid grid-cols-2 md:grid-cols-4",
          // Row divider between top and bottom row on mobile/tablet
          "[&>*:nth-child(1)]:border-b [&>*:nth-child(2)]:border-b",
          "md:[&>*:nth-child(1)]:border-b-0 md:[&>*:nth-child(2)]:border-b-0",
          "[&>*:nth-child(1)]:border-b-gray-300 [&>*:nth-child(2)]:border-b-gray-300",
          // Remove right border on 2nd item (end of row 1) on mobile/tablet
          "[&>*:nth-child(2)]:border-r-0 md:[&>*:nth-child(2)]:border-r",
        ].join(" ")}
      >
        {stats.map((stat, index) => (
          <StatItem
            key={stat.label}
            {...stat}
            trigger={trigger}
            divider={index < stats.length - 1}
          />
        ))}
      </div>
    </section>
  );
}