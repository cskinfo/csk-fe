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
    <>
      <style>{`
        .contact-page { font-family: 'Segoe UI', sans-serif; color: #1a1a2e; }

        /* Hero */
        .contact-hero {
          position: relative;
          width: 100%;
          min-height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #0d3b4f;
        }
        @media (max-width: 480px) {
          .contact-hero { min-height: 240px; }
        }

        /* Contact cards grid */
        .contact-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: stretch;
        }
        @media (max-width: 768px) {
          .contact-cards { grid-template-columns: 1fr; gap: 16px; }
        }

        /* Section padding */
        .contact-details-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 70px 24px 60px;
        }
        .contact-faq-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }
        @media (max-width: 480px) {
          .contact-details-section { padding: 48px 16px 40px; }
          .contact-faq-section     { padding: 0 16px 56px; }
        }

        /* FAQ button tap target */
        .faq-btn {
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          padding: 20px 4px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .faq-btn:active .faq-question { color: #1565c0; }
      `}</style>

      <div className="contact-page">

        {/* ── SECTION 1: HERO ── */}
        <section className="contact-hero">
          <img
            src={contactBg}
            alt=""
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              opacity: 1,
              mixBlendMode: "luminosity",
            }}
          />
          <h1
            style={{
              position: "relative", zIndex: 2,
              color: "#ffffff",
              fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
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

        {/* ── SECTION 2: CONTACT DETAILS ── */}
        <section className="contact-details-section">
          <h2
            style={{
              textAlign: "center",
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              fontWeight: 700,
              marginBottom: 48,
              color: "#1a1a2e",
            }}
          >
            Contact Details
          </h2>

          <div className="contact-cards">
            {/* Phone */}
            <div style={{ border:"1.5px solid #c5d8f0", borderRadius:12, padding:"36px 28px", background:"#f8fbff", display:"flex", flexDirection:"column", gap:10, minHeight:140 }}>
              <span style={{ fontSize:"1rem", fontWeight:600, color:"#1a1a2e" }}>Phone</span>
              <span style={{ fontSize:"1rem", color:"#1565c0", fontWeight:500 }}>+91 120 605 4621</span>
            </div>

            {/* Address */}
            <div style={{ border:"1.5px solid #1565c0", borderRadius:12, padding:"36px 28px", background:"#f0f6ff", display:"flex", flexDirection:"column", gap:10 }}>
              <span style={{ fontSize:"1rem", fontWeight:600, color:"#1a1a2e" }}>Address</span>
              <span style={{ fontSize:"0.95rem", color:"#333", lineHeight:1.6 }}>
                Tower4, Unit B-1206, 12th floor, NX ONE,<br />
                Tech Zone-IV Gautam Buddha Nagar,<br />
                Uttar Pradesh-201306
              </span>
            </div>

            {/* Email */}
            <div style={{ border:"1.5px solid #c5d8f0", borderRadius:12, padding:"36px 28px", background:"#f8fbff", display:"flex", flexDirection:"column", gap:10, minHeight:140 }}>
              <span style={{ fontSize:"1rem", fontWeight:600, color:"#1a1a2e" }}>Email</span>
              <span style={{ fontSize:"1rem", color:"#1565c0", fontWeight:500 }}>info@cskinfotech.com</span>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: FAQ ── */}
        <section className="contact-faq-section">
          <h2
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 700,
              marginBottom: 36,
              color: "#1a1a2e",
              display: "flex",
              alignItems: "baseline",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontWeight:700 }}>Frequently Asked</span>
            <span style={{ fontWeight:800, fontSize:"1.6em", color:"#1565c0", lineHeight:1 }}>Questions</span>
          </h2>

          <div style={{ display:"flex", flexDirection:"column" }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom:"1.5px solid #e0e0e0" }}>
                <button className="faq-btn" onClick={() => toggle(i)}>
                  <span
                    className="faq-question"
                    style={{
                      fontSize: "0.97rem",
                      fontWeight: 600,
                      color: openIndex === i ? "#1565c0" : "#1a1a2e",
                      lineHeight: 1.4,
                      transition: "color 0.2s",
                    }}
                  >
                    {faq.question}
                  </span>
                  <span
                    style={{
                      fontSize: "1.2rem",
                      color: "#1565c0",
                      flexShrink: 0,
                      transition: "transform 0.25s ease",
                      transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                      display: "inline-block",
                    }}
                  >
                    +
                  </span>
                </button>

                {/* Smooth expand */}
                <div
                  style={{
                    overflow: "hidden",
                    maxHeight: openIndex === i ? "400px" : "0",
                    transition: "max-height 0.35s ease",
                  }}
                >
                  <div style={{ padding:"0 4px 20px", fontSize:"0.93rem", color:"#444", lineHeight:1.7 }}>
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}