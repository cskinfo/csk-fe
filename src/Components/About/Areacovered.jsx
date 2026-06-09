import React from "react";

import indiaMap from "../../assets/AboutPagePhoto/indiaMap.png";

const locations = [
  {
    state: "Uttar Pradesh",
    address:
      "Tower4, Unit B-1206, 12th floor, NX ONE, Tech Zone-IV Gautam Buddha Nagar, Uttar Pradesh-201306",
  },
  {
    state: "Uttar Pradesh",
    address:
      "603, Tower C, KLJ Noida One, Block B, Industrial Area, Sector 62, Noida, Uttar Pradesh 201309",
  },
  {
    state: "Telangana",
    address:
      "1043, St. 52, Ayyappa Society, Khanapet, Serilingampally mandal, Hyderabad – 500081",
  },
  {
    state: "Andhra Pradesh",
    address:
      "4-16-462, PS Nagar, Amravati Road Main Road, Guntur, AP-522002",
  },
  {
    state: "Haryana-1",
    address:
      "Behind Radhe Krishna School, Sondhapur Chowk Jattal Road, Panipat-132103",
  },
  {
    state: "Karnataka",
    address:
      "112, 5th Cross, ITC Colony Jeevanahalli, Coxtown, Bangalore KA-560005",
  },
  {
    state: "Haryana-2",
    address:
      "Office No. 3, Plot No. 9, HSIIDC I.T PARK, Sector-22, Panchkula, Haryana-133301",
  },
  {
    state: "Madhya Pradesh",
    address:
      "1256, Kunj-Vihar Colony, 60 feet Road, Gole Ka Mandir Gwalior-474005",
  },
  {
    state: "Tamil Nadu/Chennai",
    address:
      "7/8, Kambar Street, Vivekananda nagar Chennai Tamil Nadu-600118",
  },
];

export default function AreaCovered() {
  return (
    <section
      style={{
        background: "#cfe3f5",
        padding: "80px 24px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
          fontWeight: 700,
          marginBottom: "60px",
          color: "#0f2844",
        }}
      >
        Area Covered
      </h2>

      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: "60px",
          alignItems: "center",
        }}
      >
        {/* LEFT SIDE MAP */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={indiaMap}
            alt="India map showing CSK locations"
            style={{
              width: "100%",
              maxWidth: "750px",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* RIGHT SIDE LOCATIONS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "26px 30px",
          }}
        >
          {locations.map((loc, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.55)",
                padding: "14px",
                borderRadius: "10px",
                backdropFilter: "blur(6px)",
              }}
            >
              <p
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "#0f2844",
                  margin: "0 0 6px",
                }}
              >
                {loc.state}
              </p>

              <p
                style={{
                  fontSize: "0.82rem",
                  color: "#334",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {loc.address}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}