"use client";

import { useState } from "react";

import hclLogo from "../../assets/CaseStudy/hcl.png";
import syscomLogo from "../../assets/CaseStudy/syscom.png";
import govtLogo from "../../assets/CaseStudy/govt.png";

import case1 from "../../assets/CaseStudy/case1.jpg";
import case2 from "../../assets/CaseStudy/case2.jpg";
import case3 from "../../assets/CaseStudy/case3.jpg";

export default function CaseStudy() {

  // ── touch state: which card index is "active" on mobile
  const [activeCard, setActiveCard] = useState(null);

  const cards = [
    {
      logo: hclLogo,
      image: case1,
      title: "DC & EUC Operation & Maintenance(HCL)",
      description:
        "Delivered round-the-clock data center and end-user support with proactive monitoring and enterprise maintenance services.",
    },
    {
      logo: syscomLogo,
      image: case2,
      title: "Smart Network Solutions",
      description:
        "Designed and deployed scalable enterprise networking infrastructure solutions with high reliability and performance.",
    },
    {
      logo: govtLogo,
      image: case3,
      title: "Branches Infra Maintenance Services",
      description:
        "Managed nationwide branch infrastructure support services including networking, systems, and operational maintenance.",
    },
  ];

  // ── toggle active card on touch
  const handleTouch = (index) => {
    setActiveCard((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative overflow-hidden bg-[#B9D8F7] py-16 md:py-[110px]">

      {/* BG BLURS */}
      <div className="absolute top-[-40px] left-[30px] w-[140px] h-[140px] rounded-full bg-[#034787]/60 blur-[55px]" />
      <div className="absolute bottom-[40px] left-[60px] w-[100px] h-[100px] rounded-full bg-[#034787]/50 blur-[45px]" />
      <div className="absolute top-[0px] right-[-90px] w-[380px] h-[380px] rounded-full bg-[#034787]/60 blur-[90px]" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-[1450px] mx-auto px-4 sm:px-6">

        {/* HEADING */}
        <div className="text-center mb-10 md:mb-16">
          <p className="uppercase tracking-[4px] text-[#123D6A] text-xs font-semibold mb-3">
            FEATURED CASE STUDY
          </p>
          <h2 className="text-[32px] sm:text-[44px] md:text-[58px] leading-[0.95] font-[800] tracking-[-2px] md:tracking-[-3px] text-[#0A3B73]">
            CASE STUDIES
          </h2>
        </div>

        {/* CARDS */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">

          {cards.map((card, index) => {

            // ── "is this card hovered/active?" — works for both mouse and touch
            const isActive = activeCard === index;

            return (
              <div
                key={index}
                className="relative pt-6 w-[260px] sm:w-[270px] md:w-[280px] h-[360px] sm:h-[370px] md:h-[380px] group"

                // ── TOUCH handlers
                onTouchStart={() => handleTouch(index)}

                // ── prevent long-press context menu on mobile
                onContextMenu={(e) => e.preventDefault()}
                
              >

                {/* TOP LOGO */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50">
                  <div className="bg-white px-4 py-2 rounded-md shadow-[0_5px_18px_rgba(0,0,0,0.12)]">
                    <img
                      src={card.logo}
                      alt="logo"
                      className="h-[40px] md:h-[43px] object-contain"
                    />
                  </div>
                </div>

                {/* MAIN CARD */}
                <div
                  className={`
                    relative w-full h-full overflow-hidden rounded-[30px] md:rounded-[38px]
                    bg-black border border-white/20
                    transition-all duration-700
                    shadow-[0_12px_35px_rgba(0,0,0,0.10),0_30px_60px_rgba(0,0,0,0.12)]
                    ${isActive ? "-translate-y-4" : ""}
                    group-hover:-translate-y-4
                  `}
                >

                  {/* IMAGE */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className={`
                      w-full h-full object-cover
                      transition-all duration-1000
                      ${isActive ? "scale-110" : ""}
                      group-hover:scale-110
                    `}
                  />

                  {/* DARK OVERLAY */}
                  <div className="absolute inset-0 bg-black/35" />

                  {/* LIQUID REVEAL */}
                  <div
                    className={`
                      absolute left-[-10%] w-[120%] h-[220%]
                      bg-gradient-to-t from-[#02192E]/98 via-[#034787]/88 via-40% to-[#38BDF8]/20
                      rounded-[42%] blur-[2px]
                      transition-all duration-[1800ms] ease-[cubic-bezier(0.19,1,0.22,1)]
                      ${isActive ? "bottom-[-55%]" : "-bottom-[140%]"}
                      group-hover:bottom-[-55%]
                    `}
                  />

                  {/* GLOW */}
                  <div
                    className={`
                      absolute inset-0
                      bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_55%)]
                      transition-all duration-700
                      ${isActive ? "opacity-100" : "opacity-0"}
                      group-hover:opacity-100
                    `}
                  />

                  {/* DEFAULT TITLE */}
                  <div
                    className={`
                      absolute inset-0 flex items-center justify-center px-8 z-10
                      transition-all duration-500
                      ${isActive ? "opacity-0 -translate-y-8" : ""}
                      group-hover:opacity-0 group-hover:-translate-y-8
                    `}
                  >
                    <h3 className="text-white text-[19px] md:text-[22px] leading-[1.15] font-semibold text-center">
                      {card.title}
                    </h3>
                  </div>

                  {/* HOVER CONTENT */}
                  <div
                    className={`
                      absolute bottom-0 left-0 z-30 w-full p-6 md:p-8
                      transition-all duration-700 delay-300
                      ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
                      group-hover:opacity-100 group-hover:translate-y-0
                    `}
                  >
                    {/* NUMBER */}
                    <div className="text-white/20 text-[55px] md:text-[65px] font-black leading-none mb-2 md:mb-3">
                      0{index + 1}
                    </div>

                    {/* TITLE */}
                    <h3 className="text-white text-[18px] md:text-[21px] leading-[1.4] font-bold mb-3 md:mb-4">
                      {card.title}
                    </h3>

                    {/* DESC */}
                    <p className="text-white/75 text-[13px] md:text-[14px] leading-[26px] md:leading-[28px]">
                      {card.description}
                    </p>
                  </div>

                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}