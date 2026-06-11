import heroimg from "../../assets/CareerPagePhoto/CareerPageHeroSectionPhotos.jpg";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function CareerHeroSection() {
  useEffect(() => {
    const img = new Image();
    img.src = heroimg;
  }, []);

  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden h-[260px] sm:h-[320px] md:h-[380px] lg:h-[430px]"
    >
      {/* Background Image */}
      <motion.img
        src={heroimg}
        alt=""
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          objectPosition: "center 25%",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      />

      {/* Light Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(255,255,255,0.25)",
        }}
      />

      {/* Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: -60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileTap={{ scale: 0.985 }} // touch devices ke liye tap-feedback
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="relative z-10 w-[92%] sm:w-[90%] md:w-[85%] lg:w-[660px] max-w-[660px]
                   px-5 py-6 sm:px-8 sm:py-7 md:px-10 md:py-8
                   rounded-2xl text-center"
        style={{
          background: "rgba(255,255,255,0.28)",
          backdropFilter: "blur(1px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.35)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.7,
          }}
          className="font-extrabold leading-tight mb-3 sm:mb-4 md:mb-[18px]"
          style={{
            fontSize: "clamp(1.5rem, 6vw, 2.3rem)",
            color: "#0B4ED8",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Innovate Your Career. Find Your
          <br className="hidden sm:block" />
          {" "}Next IT Role Here.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.7,
          }}
          className="mx-auto"
          style={{
            fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
            lineHeight: 1.7,
            color: "#191B23",
            maxWidth: "700px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Build, grow, and lead at CSK Information Technology. Explore open
          roles across engineering, sales, HR, and operations — and shape the
          future of enterprise IT with us.
        </motion.p>
      </motion.div>
    </section>
  );
}