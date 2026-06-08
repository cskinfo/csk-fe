import { useEffect, useRef, useState } from "react";

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
      // Ease out
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

  return (
    <div className={`flex flex-col items-center justify-center py-6 px-6 text-center ${divider ? "border-r border-gray-300" : ""}`}>
      <span className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight tabular-nums">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="mt-2 text-[10px] md:text-xs font-semibold text-blue-500 tracking-widest uppercase">
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
          // Reset then re-trigger to replay animation every time
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
      <div className="max-w-5xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4">
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