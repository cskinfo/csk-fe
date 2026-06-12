import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    gridTemplateColumns: "1.8fr 1fr 1.1fr 1.4fr 1.5fr",
    gap: "28px",
    maxWidth: "1280px",
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
    textDecoration: "none",
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
    cursor: "pointer",
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
    cursor: "pointer",
  },
  contactItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    marginBottom: "16px",
  },
  contactIcon: {
    width: "30px",
    height: "30px",
    borderRadius: "4px",
    background: "#162030",
    border: "1px solid #2a3d52",
    color: "#1a6bbd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
    flexShrink: 0,
  },
  contactText: {
    fontSize: "12px",
    lineHeight: "1.7",
    color: "#9aabb8",
    margin: 0,
  },
};

const quickLinks = [
  { label: "Home",          path: "/"            },
  { label: "About Company", path: "/AboutPage"   },
  { label: "Our Services",  path: "/Service"     },
  { label: "Gallery",       path: "/GalleryPage" },
  { label: "Contact Us",    path: "/ContactPage" },
];

const services = [
  { label: "Infra Managed",      path: "/service/infra-managed"      },
  { label: "IT Outsourcing",     path: "/service/it-outsourcing"     },
  { label: "Break Fix Services", path: "/service/break-fix"          },
  { label: "System Integration", path: "/service/system-integration" },
  { label: "AV Solutions",       path: "/service/av-solutions"       },
  { label: "AR & VR Devices",    path: "/service/ar-vr"              },
  { label: "Corporate Training", path: "/service/corporate-training" },
];

// ✅ Apne actual social media URLs yahan daalo
const socialLinks = [
  {
    icon: "facebook",
    href: "https://www.facebook.com/CSKITNOIDA/",
    label: "Facebook",
  },
  {
    icon: "instagram",
    href: "https://www.instagram.com/csk_infotech/",
    label: "Instagram",
  },
  {
    icon: "linkedin",
    href: "https://www.linkedin.com/company/csk-information-technology-pvt-ltd/?viewAsMember=true",
    label: "LinkedIn",
  },
];

function SocialButton({ icon, href, label }) {
  const [hovered, setHovered] = useState(false);


  return (
    <a
    
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        ...styles.socialBtn,
        borderColor: hovered ? "#1a6bbd" : "#2a3d52",
        color: hovered ? "#fff" : "#9aabb8",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
    >
      <i className={`ti ti-brand-${icon}`} aria-hidden="true" />
    </a>
  );
}

function NavLink({ label, path }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <li style={styles.linkItem}>
      <span style={styles.linkArrow}>›</span>
      <span
        style={{ ...styles.link, color: hovered ? "#fff" : "#ccc" }}
        onClick={() => navigate(path)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setHovered(false)}
      >
        {label}
      </span>
    </li>
  );
}

export default function Footer() {
  const [email, setEmail]       = useState("");
  const [btnHovered, setBtnHovered] = useState(false);
  const navigate = useNavigate();

  
  
  
  
  
  const handleSubscribe = () => {
    if (email.trim()) {
      alert("Subscribed with: " + email);
      setEmail("");
    }
  };

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
        rel="stylesheet"
      />

      <style>{`
        @media (max-width: 1199px) {
          .footer-grid { grid-template-columns: 1fr 1fr 1fr !important; gap: 28px !important; }
          .footer-col-contact { grid-column: span 3 !important; }
        }
        @media (max-width: 767px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
          .footer-col-brand, .footer-col-contact { grid-column: span 2 !important; }
        }
        @media (max-width: 479px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .footer-col-brand, .footer-col-contact { grid-column: span 1 !important; }
          .footer-bottom-inner { flex-direction: column !important; align-items: flex-start !important; gap: 6px !important; }
        }
      `}</style>

      <footer style={styles.footer}>
        <div className="footer-grid" style={styles.footerTop}>

          {/* Brand */}
          <div className="footer-col-brand">
            <div style={styles.brandLogo}>
              <span style={styles.logoIcon}>CSK</span>
              <span style={styles.brandName}>Information Technology</span>
            </div>
            <p style={styles.brandDesc}>
              Delivering quality from the ages of technology. We are experts in
              offshore software development, running parallel with technology trends.
            </p>
            <div style={styles.socialIcons}>
              {socialLinks.map((s) => (
                <SocialButton key={s.icon} icon={s.icon} href={s.href} label={s.label} />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={styles.colHeading}>Quick Links</h4>
            <ul style={styles.linkList}>
              {quickLinks.map((item) => (
                <NavLink key={item.label} label={item.label} path={item.path} />
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={styles.colHeading}>Our Services</h4>
            <ul style={styles.linkList}>
              {services.map((item) => (
                <NavLink key={item.label} label={item.label} path={item.path} />
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col-contact">
            <h4 style={styles.colHeading}>Get In Touch</h4>
            <div style={styles.contactItem}>
              <div style={styles.contactIcon}>
                <i className="ti ti-map-pin" aria-hidden="true" />
              </div>
              <p style={styles.contactText}>
                Tower 4, Unit B-1206, 12th Floor, NX ONE, Tech Zone-IV,
                Gautam Buddha Nagar, Uttar Pradesh - 201306
              </p>
            </div>
            <div style={styles.contactItem}>
              <div style={styles.contactIcon}>
                <i className="ti ti-mail" aria-hidden="true" />
              </div>
              <p style={styles.contactText}>info@cskinfotech.com</p>
            </div>
            <div style={styles.contactItem}>
              <div style={styles.contactIcon}>
                <i className="ti ti-phone" aria-hidden="true" />
              </div>
              <p style={styles.contactText}>+91 120 605 4621</p>
            </div>
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
                onKeyDown={(e) => { if (e.key === "Enter") handleSubscribe(); }}
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
                onTouchStart={() => setBtnHovered(true)}
                onTouchEnd={() => setBtnHovered(false)}
                aria-label="Subscribe"
              >
                <i className="ti ti-arrow-right" aria-hidden="true" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-inner" style={styles.footerBottom}>
          <p style={styles.copyright}>
            (c) 2026 CSK Information Technology Pvt Ltd. All rights reserved.
          </p>
          <div style={styles.bottomLinks}>
            <span
              onClick={() => navigate("/privacy-policy")}
              style={styles.bottomLink}
            >
              Privacy Policy
            </span>
            <span
              onClick={() => navigate("/terms")}
              style={styles.bottomLink}
            >
              Terms of Service
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}