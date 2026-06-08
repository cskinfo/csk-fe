import { Home, GraduationCap, Heart } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: <Home size={26} color="white" />,
      bg: "#2563eb",
      title: "Hybrid Working",
      desc: "We're a hybrid working company with some roles fully remote — work where you do your best.",
    },
    {
      icon: <GraduationCap size={26} color="white" />,
      bg: "#f97316",
      title: "Learning & Growth",
      desc: "Continuous upskilling, certifications, and clear career paths across IT specializations.",
    },
    {
      icon: <Heart size={26} color="white" />,
      bg: "#1d4ed8",
      title: "People-First Culture",
      desc: "Supportive teams, inclusive values, and recognition for the work you do every day.",
    },
  ];

  return (
    <section className="pb-20 bg-white">
      <div className="max-w-5xl mx-auto ">
        {/* Label */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-[2px] bg-orange-500"></div>

          <span
            className="uppercase text-xs font-semibold tracking-[0.18em]"
            style={{ color: "#f97316" }}
          >
            Why Work With Us
          </span>
        </div>

        {/* Heading */}
        <h2
          className="font-bold mb-4"
          style={{
            fontSize: "2.1rem",
            color: "#0f172a",
          }}
        >
          Benefits At CSK
        </h2>

        <p
          className="max-w-2xl mb-12"
          style={{
            color: "#64748b",
            lineHeight: "1.8",
          }}
        >
          We invest in our people with flexible work, growth opportunities,
          and a culture built on innovation and trust.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="p-5 pt-6 rounded-3xl text-center"
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{
                  background: item.bg,
                }}
              >
                {item.icon}
              </div>

              <h3
                className="font-bold mb-3"
                style={{
                  color: "#0f172a",
                  fontSize: "1.05rem",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.7",
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}