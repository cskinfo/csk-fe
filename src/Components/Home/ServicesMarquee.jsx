"use client";
import { useRef, useEffect, useState } from "react";

export default function LRSMasonryClone() {
  const column1 = [
    {
      title: "NOC Services",
      image: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1200&auto=format&fit=crop",
      height: 190,
    },
    {
      title: "Digital Transformation",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
      height: 290,
    },
  ];

  const column2 = [
    {
      title: "Managed Services",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
      height: 190,
    },
    {
      title: "Cloud Services",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
      height: 290,
    },
  ];

  const column3 = [
    {
      title: "Security",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
      height: 240,
    },
    {
      title: "100% Uptime",
      image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
      height: 240,
    },
  ];

  const column4 = [
    {
      title: "Resource Augmentation",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
      height: 240,
    },
    {
      title: "Energy & Power",
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop",
      height: 240,
    },
  ];

  const columns = [column1, column2, column3, column4];

  // ── responsive card width
  const [cardWidth, setCardWidth] = useState(280);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 400) setCardWidth(200);
      else if (w < 640) setCardWidth(230);
      else if (w < 768) setCardWidth(255);
      else setCardWidth(280);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ── responsive card heights (scale down on mobile)
  const scaleHeight = (h) => {
    if (cardWidth <= 200) return Math.round(h * 0.68);
    if (cardWidth <= 230) return Math.round(h * 0.78);
    if (cardWidth <= 255) return Math.round(h * 0.88);
    return h;
  };

  // ── gap between columns
  const gap = cardWidth <= 200 ? 12 : cardWidth <= 255 ? 16 : 20;

  return (
    <section className="w-full bg-white py-12 md:py-16 overflow-hidden">

      {/* TOP CONTENT */}
      <div className="text-center mb-10 md:mb-16 px-4">
        <p className="uppercase tracking-[4px] md:tracking-[7px] text-[#7FB3F3] text-xs md:text-base font-semibold mb-3 md:mb-4">
          ENTERPRISE IT SERVICES
        </p>
        <h1 className="text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px] leading-[1.05] font-bold text-[rgba(3,38,64,1)] tracking-[-2px] md:tracking-[-4px]">
          End-to-End Solutions
        </h1>
      </div>

      {/* SLIDER */}
      <div className="relative overflow-hidden">

        {/* LEFT FADE */}
        {/* <div className="absolute left-0 top-0 h-full w-12 md:w-24 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />

        {/* RIGHT FADE */}
        {/* <div className="absolute right-0 top-0 h-full w-12 md:w-24 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" /> */} 

        <div
          className="flex animate-marquee-rsp"
          style={{ gap: `${gap}px`, width: "max-content", paddingInline: `${gap}px` }}
        >
          {[...columns, ...columns].map((column, i) => (
            <div
              key={i}
              className="flex flex-col shrink-0"
              style={{ gap: `${gap}px` }}
            >
              {column.map((card, index) => (
                <div
                  key={index}
                  className="relative rounded-[20px] md:rounded-[30px] overflow-hidden group cursor-pointer
                             shadow-[0_2px_10px_rgba(0,0,0,0.18)]
                             hover:shadow-[0_10px_20px_rgba(0,0,0,0.22)]
                             transition-all duration-500"
                  style={{
                    width: `${cardWidth}px`,
                    height: `${scaleHeight(card.height)}px`,
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/45 group-hover:bg-white/5 transition duration-500" />
                  <div className="absolute bottom-4 left-4 z-10">
                    <h2
                      className="text-white font-semibold"
                      style={{ fontSize: cardWidth <= 220 ? "13px" : cardWidth <= 255 ? "15px" : "18px" }}
                    >
                      {card.title}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-rsp {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-rsp {
          animation: marquee-rsp 32s linear infinite;
        }
        @media (max-width: 480px) {
          .animate-marquee-rsp { animation-duration: 24s; }
        }
      `}</style>

    </section>
  );
}