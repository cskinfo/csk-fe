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
    <>
      <style>{`
        .area-section {
          background: #cfe3f5;
          padding: 80px 24px;
        }

        /* Main two-column layout */
        .area-inner {
          max-width: 1300px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 60px;
          align-items: center;
        }

        /* Location cards: 2 columns on desktop */
        .area-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        /* Tablet: stack map above cards, full width */
        @media (max-width: 900px) {
          .area-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .area-map img {
            max-width: 500px !important;
          }
        }

        /* Mobile: single column cards */
        @media (max-width: 540px) {
          .area-section { padding: 56px 16px; }
          .area-cards {
            grid-template-columns: 1fr;
          }
          .area-map img {
            max-width: 320px !important;
          }
        }
      `}</style>

      <section className="area-section">
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            fontWeight: 700,
            marginBottom: "56px",
            color: "#0f2844",
          }}
        >
          Area Covered
        </h2>

        <div className="area-inner">
          {/* LEFT — Map */}
          <div className="area-map" style={{ display:"flex", justifyContent:"center", alignItems:"center" }}>
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

          {/* RIGHT — Location cards */}
          <div className="area-cards">
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
                <p style={{ fontSize:"0.95rem", fontWeight:700, color:"#0f2844", margin:"0 0 6px" }}>
                  {loc.state}
                </p>
                <p style={{ fontSize:"0.82rem", color:"#334", lineHeight:1.6, margin:0 }}>
                  {loc.address}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}