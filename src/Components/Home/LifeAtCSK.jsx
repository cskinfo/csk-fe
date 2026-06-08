"use client";

import { useState, useEffect } from "react";

import lifeVideo from "../../assets/lifeAtCsk.mp4";
import thumbnail from "../../assets/thumnail.png";

export default function LifeAtCSK() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (showVideo) {
        setShowVideo(false);
      }
    };

    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener(
        "wheel",
        handleScroll
      );
    };
  }, [showVideo]);

  return (
    <>
      {/* SECTION */}
      <section className="relative bg-[#F5F7FA] py-[50px] overflow-hidden">
        {/* SMALL TEXT */}
        <div className="text-center mb-5">
          <p className="uppercase tracking-[14px] text-[#0A4B8F] text-[20px] font-semibold">
            LIFE AT
          </p>
        </div>

        {/* BIG CSK */}
        <div className="flex justify-center items-center">
          <h1
            onMouseEnter={() => setShowVideo(true)}
            className="
              relative
              text-[100px]
              md:text-[120px]
              lg:text-[200px]
              font-black
              leading-[0.9]
              uppercase
              cursor-pointer
              text-transparent
              bg-clip-text
              bg-cover
              bg-center
              transition-all
              duration-500
              hover:scale-[1.03]
              select-none
            "
            style={{
              backgroundImage: `url(${thumbnail})`,
              WebkitTextStroke: "5px #3D4B63",
              filter:
                "drop-shadow(0px 12px 30px rgba(0,0,0,0.18))",
              letterSpacing: "-10px",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            CSK
          </h1>
        </div>

        {/* SUB TEXT */}
        <div className="text-center mt-4">
          <p className="text-[#6B7280] text-[16px] tracking-[1px]">
            Hover on CSK to explore our workplace
          </p>
        </div>
      </section>

      {/* VIDEO OVERLAY */}
      {showVideo && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            bg-black
            overflow-hidden
          "
        >
          {/* VIDEO */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
            "
          >
            <source
              src={lifeVideo}
              type="video/mp4"
            />
          </video>

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />

          {/* TEXT */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <p className="uppercase tracking-[14px] text-white/70 text-[22px] mb-6">
              LIFE AT
            </p>

            <h1
              className="
                text-[140px]
                md:text-[240px]
                font-black
                leading-none
                tracking-[-12px]
                text-transparent
                opacity-25
                select-none
              "
              style={{
                WebkitTextStroke:
                  "3px rgba(255,255,255,0.9)",
              }}
            >
              CSK
            </h1>
          </div>

          {/* CLOSE BUTTON */}
          <button
            onClick={() =>
              setShowVideo(false)
            }
            className="
              absolute
              top-6
              right-6
              z-30
              w-14
              h-14
              rounded-full
              bg-white/10
              backdrop-blur-md
              text-white
              text-4xl
              hover:bg-white/20
              transition-all
              duration-300
            "
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}