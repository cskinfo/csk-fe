import React, { useState } from "react";
import contactBg from "../../assets/ContactPagePhoto/contact.png";

const faqs = [
  {
    question: "What services does CSK Information Technology provide?",
    answer:
      "We offer end-to-end IT solutions, including End-User Compute Services, Data Center Solutions (DC & DR), Cloud Services, Cybersecurity, Networking Solutions, Infrastructure Managed Services, AV Solutions, and Product Sales (hardware & software).",
  },
  {
    question: "Where does CSK provide support across India?",
    answer:
      "CSK Information Technology provides support across major cities and regions throughout India, with a strong presence in North India and expanding coverage nationwide.",
  },
  {
    question: "Do you offer onsite support?",
    answer:
      "Yes, we offer comprehensive onsite support services to ensure your IT infrastructure runs smoothly. Our trained engineers are available for onsite visits as per your requirements.",
  },
  {
    question: "Can CSK help with hardware product procurement?",
    answer:
      "Absolutely. CSK helps businesses procure a wide range of hardware products including servers, networking equipment, end-user devices, and more from leading global brands.",
  },
  {
    question: "How can I contact the CSK support team?",
    answer:
      "You can reach our support team by calling +91 120 605 4621 or by emailing info@cskinfotech.com. Our team is available during business hours to assist you.",
  },
  {
    question: "Is CSK Information Technology certified?",
    answer:
      "Yes, CSK Information Technology holds various industry certifications and partnerships with leading technology vendors, ensuring we deliver solutions that meet the highest standards.",
  },
];

export default function ContactPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", color: "#1a1a2e" }}>
      {/* ─── SECTION 1: HERO ─────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "320px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "#0d3b4f",
        }}
      >
        {/* Background image */}
        <img
          src={contactBg}
          alt="Keep in Touch background"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 1,
            mixBlendMode: "luminosity",
          }}
        />

        {/* Dark teal overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            // background:
            //   "linear-gradient(135deg, rgba(10,45,65,0.82) 0%, rgba(15,65,85,0.75) 100%)",
          }}
        />     

        {/* Hero Title */}
        <h1
          style={{
            position: "relative",
            zIndex: 2,
            color: "#ffffff",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 700,
            letterSpacing: "0.02em",
            margin: 0,
            textAlign: "center",
            padding: "80px 20px",
          }}
        >
          Keep in Touch
        </h1>
      </section>

      {/* ─── SECTION 2: CONTACT DETAILS ──────────────────────────── */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "70px 24px 60px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
            fontWeight: 700,
            marginBottom: "48px",
            color: "#1a1a2e",
          }}
        >
          Contact Details
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          {/* Phone Card */}
          <div
            style={{
              border: "1.5px solid #c5d8f0",
              borderRadius: "12px",
              padding: "36px 28px",
              background: "#f8fbff",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              minHeight: "140px",
            }}
          >
            <span
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "#1a1a2e",
              }}
            >
              Phone
            </span>
            <span
              style={{
                fontSize: "1rem",
                color: "#1565c0",
                fontWeight: 500,
              }}
            >
              +91 120 605 4621
            </span>
          </div>

          {/* Address Card — taller / highlighted */}
          <div
            style={{
              border: "1.5px solid #1565c0",
              borderRadius: "12px",
              padding: "36px 28px",
              background: "#f0f6ff",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              minHeight: "160px",
            }}
          >
            <span
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "#1a1a2e",
              }}
            >
              Address
            </span>
            <span
              style={{
                fontSize: "0.95rem",
                color: "#333",
                lineHeight: "1.6",
              }}
            >
              Tower4, Unit B-1206, 12th floor, NX ONE,
              <br />
              Tech Zone-IV Gautam Buddha Nagar,
              <br />
              Uttar Pradesh-201306
            </span>
          </div>

          {/* Email Card */}
          <div
            style={{
              border: "1.5px solid #c5d8f0",
              borderRadius: "12px",
              padding: "36px 28px",
              background: "#f8fbff",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              minHeight: "140px",
            }}
          >
            <span
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "#1a1a2e",
              }}
            >
              Email
            </span>
            <span
              style={{
                fontSize: "1rem",
                color: "#1565c0",
                fontWeight: 500,
              }}
            >
              info@cskinfotech.com
            </span>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: FAQ ──────────────────────────────────────── */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        {/* FAQ heading */}
        <h2
          style={{
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            fontWeight: 700,
            marginBottom: "36px",
            color: "#1a1a2e",
            display: "flex",
            alignItems: "baseline",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontWeight: 700, fontSize: "1em" }}>
            Frequently Asked
          </span>
          <span
            style={{
              fontWeight: 800,
              fontSize: "1.6em",
              color: "#1565c0",
              lineHeight: 1,
            }}
          >
            Questions
          </span>
        </h2>

        {/* FAQ Items */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                borderBottom: "1.5px solid #e0e0e0",
              }}
            >
              <button
                onClick={() => toggle(i)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  padding: "20px 4px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <span
                  style={{
                    fontSize: "0.97rem",
                    fontWeight: 600,
                    color: "#1a1a2e",
                    lineHeight: 1.4,
                  }}
                >
                  {faq.question}
                </span>
                <span
                  style={{
                    fontSize: "1.2rem",
                    color: "#1565c0",
                    flexShrink: 0,
                    transition: "transform 0.2s",
                    transform:
                      openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                    display: "inline-block",
                  }}
                >
                  +
                </span>
              </button>

              {openIndex === i && (
                <div
                  style={{
                    padding: "0 4px 20px",
                    fontSize: "0.93rem",
                    color: "#444",
                    lineHeight: 1.7,
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}