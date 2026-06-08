import React, { useState } from "react";
import "./Partners.css";

const CATEGORIES = [
  "All Partners",
  "Cloud",
  "Security",
  "Networking",
  "Enterprise",
];

const PARTNERS = [
  {
    name: "Cisco",
    category: "Networking",
    color: "#1ba0d7",
  },

  {
    name: "AWS",
    category: "Cloud",
    color: "#ff9900",
  },

  {
    name: "Microsoft",
    category: "Cloud",
    color: "#00a4ef",
  },

  {
    name: "Fortinet",
    category: "Security",
    color: "#da291c",
  },

  {
    name: "Palo Alto",
    category: "Security",
    color: "#fa6800",
  },

  {
    name: "Dell",
    category: "Enterprise",
    color: "#007db8",
  },

  {
    name: "Juniper",
    category: "Networking",
    color: "#009639",
  },
];

const PartnersSection = () => {

  const [active, setActive] = useState("All Partners");

  const filteredPartners =
    active === "All Partners"
      ? PARTNERS
      : PARTNERS.filter(
          (p) => p.category === active
        );

  return (
    <section className="partners-section">

      {/* BACKGROUND */}
      <div className="partners-bg-canvas">

        <div className="partners-orb partners-orb-1"></div>
        <div className="partners-orb partners-orb-2"></div>
        <div className="partners-orb partners-orb-3"></div>

        <div className="partners-dot-grid"></div>

      </div>

      {/* MAIN */}
      <div className="partners-main">

        {/* HEADER */}
        <div className="partners-header">

          <div className="partners-eyebrow">

            <div className="partners-eyebrow-dot"></div>

            Technology Ecosystem

          </div>

          <h1>
            <span className="partners-title-gradient">
              Our Trusted Alliances
            </span>
          </h1>

          <p>Our Partners, Your Advantage</p>

        </div>

        {/* FILTER */}
        <div className="partners-filter-row">

          <div className="partners-filter-bar">

            {CATEGORIES.map((item, index) => (

              <button
                key={index}
                onClick={() => setActive(item)}
                className={`partners-filter-btn ${
                  active === item ? "active" : ""
                }`}
              >
                {item}
              </button>

            ))}

          </div>

          <div className="partners-count">
            {filteredPartners.length} Partners
          </div>

        </div>

        {/* GRID */}
        <div className="partners-grid-shell">

          <div className="partners-logo-grid">

            {filteredPartners.map((partner, index) => (

              <div
                key={index}
                className="partners-card-outer visible"
                style={{
                  "--brand": partner.color,
                }}
              >

                <div className="partners-card-ring"></div>

                <div className="partners-card-face">

                  <div
                    className="partners-card-glow"
                    style={{
                      background: `radial-gradient(
                        ellipse 90% 60% at 50% 110%,
                        ${partner.color}55 0%,
                        transparent 70%
                      )`,
                    }}
                  ></div>

                  <div
                    className="partners-card-name"
                    style={{
                      color: partner.color,
                    }}
                  >
                    {partner.name}
                  </div>

                  <div className="partners-card-cat">
                    {partner.category}
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* FOOTER */}
        <div className="partners-footer">

          <div className="partners-footer-badge">

            <div className="partners-live-dot"></div>

            <span>
              142 Partners · Updated January 2025
            </span>

          </div>

        </div>

      </div>

    </section>
  );
};

export default PartnersSection;