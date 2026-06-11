"use client";

import { useState, useEffect } from "react";

import lifeVideo from "../../assets/lifeAtCsk.mp4";
import thumbnail from "../../assets/thumnail.png";

export default function LifeAtCSK() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (showVideo) setShowVideo(false);
    };
    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [showVideo]);

  return (
    <>
      <style>{`



        /* ── SECTION ── */
        .lac-section {
          position: relative;
          background: #F5F7FA;
          padding: 50px 16px;
          overflow: hidden;
        }


        /* ── SMALL TAG ── */
        .lac-tag {
          text-align: center;
          margin-bottom: 20px;
        }
        .lac-tag p {
          text-transform: uppercase;
          letter-spacing: 14px;
          color: #0A4B8F;
          font-size: 14px;         /* mobile */
          font-weight: 600;
        }

        /* ── BIG CSK ── */
        .lac-title-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .lac-csk {
          position: relative;
          font-weight: 900;
          line-height: 0.9;
          text-transform: uppercase;
          cursor: pointer;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          background-size: cover;
          background-position: center;
          transition: all 0.5s ease;
          user-select: none;
          -webkit-text-stroke: 3px #3D4B63;
          filter: drop-shadow(0px 12px 30px rgba(0,0,0,0.18));
          letter-spacing: -4px;

          /* mobile size */
          font-size: clamp(72px, 22vw, 120px);
          
        }
        .lac-csk:hover {
          transform: scale(1.03);
        }

        /* ── SUB TEXT ── */
        .lac-sub {
    position: relative;
  font-weight: 900;
  color: transparent;

  background-size: cover;
  background-position: center;

  -webkit-background-clip: text;
  background-clip: text;

  filter: blur(6px) drop-shadow(0px 12px 30px rgba(0,0,0,0.18));
}



        /* ── VIDEO OVERLAY ── */
        .lac-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: black;
          overflow: hidden;
        }
        .lac-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .lac-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.30),
            rgba(0,0,0,0.50),
            rgba(0,0,0,0.70)
          );
        }
        .lac-overlay-text {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 20;
        }
        .lac-overlay-tag {
          text-transform: uppercase;
          letter-spacing: 14px;
          color: rgba(255,255,255,0.70);
          font-size: 16px;         /* mobile */
          margin-bottom: 20px;
        }
        .lac-overlay-csk {
          font-weight: 900;
          line-height: 1;
          color: transparent;
          opacity: 0.25;
          user-select: none;
          -webkit-text-stroke: 3px rgba(255,255,255,0.9);
          letter-spacing: -8px;

          /* mobile size */
          font-size: clamp(80px, 28vw, 160px);
        }
        .lac-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 30;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255,255,255,0.10);
          backdrop-filter: blur(12px);
          color: white;
          font-size: 32px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          line-height: 1;
        }
        .lac-close-btn:hover {
          background: rgba(255,255,255,0.20);
        }

        /* ════════════════════════════════
           TABLET  ≥ 640px
        ════════════════════════════════ */
        @media (min-width: 640px) {
          .lac-tag p         { font-size: 17px; }
          .lac-csk           { font-size: clamp(100px, 20vw, 160px); letter-spacing: -6px; -webkit-text-stroke: 4px #3D4B63; }
          .lac-sub p         { font-size: 15px; }
          .lac-overlay-tag   { font-size: 19px; }
          .lac-overlay-csk   { font-size: clamp(120px, 24vw, 200px); letter-spacing: -10px; }
          .lac-close-btn     { width: 52px; height: 52px; top: 24px; right: 24px; }
        }

        /* ════════════════════════════════
           DESKTOP  ≥ 1024px  (original sizes)
        ════════════════════════════════ */
        @media (min-width: 1024px) {
          .lac-section       { padding: 50px 0; }
          .lac-tag p         { font-size: 20px; }
          .lac-csk           { font-size: 200px; letter-spacing: -10px; -webkit-text-stroke: 5px #3D4B63; }
          .lac-sub p         { font-size: 16px; }
          .lac-overlay-tag   { font-size: 22px; margin-bottom: 24px; }
          .lac-overlay-csk   { font-size: 240px; letter-spacing: -12px; }
          .lac-close-btn     { width: 56px; height: 56px; top: 24px; right: 24px; font-size: 36px; }
        }

      `}</style>

      {/* SECTION */}
      <section className="lac-section">

        {/* SMALL TEXT */}
        <div className="lac-tag">
          <p>LIFE AT</p>
        </div>

        {/* BIG CSK */}
        <div className="lac-title-wrap">
          <h1
            className="lac-csk"
            onMouseEnter={() => setShowVideo(true)}
             onClick={() => setShowVideo(true)}
            style={{ backgroundImage: `url(${thumbnail})` }}
          >
            CSK
          </h1>
        </div>

        {/* SUB TEXT */}
        <div className="lac-sub">
          <p>Hover on CSK to explore our workplace</p>
        </div>

      </section>

      {/* VIDEO OVERLAY */}
      {showVideo && (
        <div className="lac-overlay">

          <video
            autoPlay muted loop playsInline
            className="lac-video"
          >
            <source src={lifeVideo} type="video/mp4" />
          </video>

          <div className="lac-gradient" />

          <div className="lac-overlay-text">
            <p className="lac-overlay-tag">LIFE AT</p>
            <h1 className="lac-overlay-csk">CSK</h1>
          </div>

          <button
            className="lac-close-btn"
            onClick={() => setShowVideo(false)}
          >
            ×
          </button>

        </div>
      )}
    </>
  );
}