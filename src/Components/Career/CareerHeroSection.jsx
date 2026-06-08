import heroimg from "../../assets/CareerPagePhoto/CareerPageHeroSectionPhoto.jpg";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function CareerHeroSection() {
  useEffect(() => {
    const img = new Image();
    img.src = heroimg;
  }, []);

  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{
        height: "430px",
      }}
    >
      {/* Background Image */}
      <img
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
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="relative z-10"
        style={{
          width: "660px",
          maxWidth: "90%",
          padding: "32px 40px",
          borderRadius: "18px",
          background: "rgba(255,255,255,0.28)",
          backdropFilter: "blur(1px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.35)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          textAlign: "center",
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
          style={{
            fontSize: "clamp(2.2rem, 4vw, 2.3rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            color: "#0B4ED8",
            marginBottom: "18px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Innovate Your Career. Find Your
          <br />
          Next IT Role Here.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.7,
          }}
          style={{
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "#191B23",
            maxWidth: "700px",
            margin: "0 auto",
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