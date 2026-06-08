import { useState } from "react";

const styles = {
  footer: {
    background: "#0d1b2a",
    color: "#ccc",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "13px",
    paddingTop: "48px",
    width: "100%",
    boxSizing: "border-box",
  },
  footerTop: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1.2fr 1.5fr",
    gap: "32px",
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 24px 40px",
  },
  brandLogo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "14px",
  },
  logoIcon: {
    background: "#1a6bbd",
    color: "#fff",
    fontWeight: "700",
    fontSize: "14px",
    padding: "4px 8px",
    borderRadius: "4px",
    letterSpacing: "0.5px",
  },
  brandName: {
    color: "#fff",
    fontWeight: "600",
    fontSize: "13px",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  brandDesc: {
    fontSize: "12px",
    lineHeight: "1.7",
    color: "#9aabb8",
    marginBottom: "18px",
  },
  socialIcons: {
    display: "flex",
    gap: "10px",
  },
  socialBtn: {
    width: "32px",
    height: "32px",
    border: "1px solid #2a3d52",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#9aabb8",
    fontSize: "16px",
    cursor: "pointer",
    transition: "border-color 0.2s, color 0.2s",
    background: "transparent",
  },
  colHeading: {
    color: "#fff",
    fontSize: "13px",
    fontWeight: "600",
    margin: "0 0 16px",
    letterSpacing: "0.3px",
  },
  linkList: {
    listStyle: "none",
    margin: "0",
    padding: "0",
  },
  linkItem: {
    marginBottom: "9px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  linkArrow: {
    color: "#1a6bbd",
    fontSize: "14px",
    lineHeight: "1",
  },
  link: {
    color: "#ccc",
    textDecoration: "none",
  },
  newsletterDesc: {
    fontSize: "12px",
    color: "#9aabb8",
    lineHeight: "1.65",
    marginBottom: "14px",
  },
  newsletterForm: {
    display: "flex",
    borderRadius: "4px",
    overflow: "hidden",
    border: "1px solid #2a3d52",
  },
  newsletterInput: {
    flex: "1",
    background: "#162030",
    border: "none",
    outline: "none",
    padding: "9px 12px",
    color: "#ccc",
    fontSize: "12px",
    fontFamily: "'Poppins', sans-serif",
  },
  newsletterBtn: {
    background: "#1a6bbd",
    border: "none",
    padding: "0 14px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
  },
  footerBottom: {
    background: "#0a1520",
    borderTop: "1px solid #1e2f3e",
    padding: "14px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "8px",
  },
  copyright: {
    fontSize: "12px",
    color: "#556678",
    margin: "0",
  },
  bottomLinks: {
    display: "flex",
    gap: "20px",
  },
  bottomLink: {
    fontSize: "12px",
    color: "#556678",
    textDecoration: "none",
  },
};

const quickLinks = ["Home", "About Company", "Our Services", "Portfolio", "Latest Blogs", "Contact Us"];
const services = ["Managed Services", "Cloud Security", "Resource Augmentation", "Digital Transformation", "Energy & Power IT"];

const SocialButton = ({ icon }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      style={{
        ...styles.socialBtn,
        borderColor: hovered ? "#1a6bbd" : "#2a3d52",
        color: hovered ? "#fff" : "#9aabb8",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={icon}
    >
      <i className={`ti ti-brand-${icon}`} aria-hidden="true" />
    </button>
  );
};

const NavLink = ({ label, href = "#" }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <li style={styles.linkItem}>
      <span style={styles.linkArrow}>›</span>
      <a
        href={href}
        style={{ ...styles.link, color: hovered ? "#fff" : "#ccc" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {label}
      </a>
    </li>
  );
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [btnHovered, setBtnHovered] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      alert(`Subscribed with: ${email}`);
      setEmail("");
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
        rel="stylesheet"
      />

      <footer style={styles.footer}>
        <div style={styles.footerTop}>

          {/* Brand Column */}
          <div>
            <div style={styles.brandLogo}>
              <span style={styles.logoIcon}>CSK</span>
              <span style={styles.brandName}>Information Technology</span>
            </div>
            <p style={styles.brandDesc}>
              Delivering quality from the ages of technology. We are experts in
              offshore software development, running parallel with technology trends.
            </p>
            <div style={styles.socialIcons}>
              <SocialButton icon="facebook" />
              <SocialButton icon="twitter" />
              <SocialButton icon="instagram" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={styles.colHeading}>Quick Links</h4>
            <ul style={styles.linkList}>
              {quickLinks.map((label) => (
                <NavLink key={label} label={label} />
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 style={styles.colHeading}>Our Services</h4>
            <ul style={styles.linkList}>
              {services.map((label) => (
                <NavLink key={label} label={label} />
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={styles.colHeading}>Newsletter</h4>
            <p style={styles.newsletterDesc}>
              Subscribe to our newsletter to get latest updates and news.
            </p>
            <div style={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                style={styles.newsletterInput}
              />
              <button
                onClick={handleSubscribe}
                style={{
                  ...styles.newsletterBtn,
                  background: btnHovered ? "#155ea8" : "#1a6bbd",
                }}
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
                aria-label="Subscribe"
              >
                <i className="ti ti-arrow-right" aria-hidden="true" />
              </button>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div style={styles.footerBottom}>
          <p style={styles.copyright}>
            © 2026 CSK Information Technology Pvt Ltd. All rights reserved.
          </p>
          <div style={styles.bottomLinks}>
            <a href="#" style={styles.bottomLink}>Privacy Policy</a>
            <a href="#" style={styles.bottomLink}>Terms of Service</a>
          </div>
        </div>
      </footer>
    </>
  );
}