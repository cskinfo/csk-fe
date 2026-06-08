"use client";
import { Link } from "react-router-dom";

import ParticleBackground from "../ParticleBackground";
import "./HeroSection.css";

export default function HeroSection() {
  return (
    <section className="hero-section">

      {/* PARTICLES */}
      <ParticleBackground />

      {/* GRADIENT BLOBS */}
      <div className="hero-blob hero-blob-one"></div>
      <div className="hero-blob hero-blob-two"></div>

      {/* GRID */}
      <div className="hero-grid"></div>

      {/* CONTENT */}
      <div className="hero-container">

        {/* LEFT */}
        <div className="hero-left">

          <p className="hero-tag">
            FUTURE READY IT SOLUTIONS
          </p>

          <h1 className="hero-title">
            Empowering
            <span> Digital </span>
            Transformation
          </h1>

          <p className="hero-description">
            CSK delivers cloud infrastructure, cybersecurity,
            enterprise networking and digital innovation
            solutions for modern businesses.
          </p>

          <div className="hero-buttons">
  <Link to="/Service" className="primary-btn flex justify-center place-items-center">
    Explore Services
  </Link>

  <button className="secondary-btn">
    Contact Us
  </button>
</div>
        </div>

        {/* RIGHT */}
        <div className="hero-right">

          <div className="floating-card card-one">
            Cloud Solutions
          </div>

          <div className="floating-card card-two">
            Cyber Security
          </div>

          <div className="floating-card card-three">
            AI Integration
          </div>

          <div className="floating-card card-four">
            Networking
          </div>

        </div>

      </div>
    </section>
  );
}