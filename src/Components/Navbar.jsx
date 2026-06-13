// import { useState, useEffect } from "react";
// import logo from "../assets/Logo/logo.png";
// import { Link } from "react-router-dom";
// import { NavLink } from "react-router-dom";

// const navLinks = [

//     { label: "Home", hasDropdown: true,path: "/" },

//   { label: "Solutions", hasDropdown: true,path: "/Solution" },
//   { label: "Services", hasDropdown: true ,path: "/Service"},
//   { label: "Career", hasDropdown: true ,path: "/CareerPage"},
//   { label: "Gallery", hasDropdown: false,path: "/GalleryPage" },
//   { label: "About us", hasDropdown: false,path: "/AboutPage" },
//   { label: "Admin", hasDropdown: true,path: "/AdminPage" },
// ];

// const NavItem = ({ item, active, onActivate }) => {
//   const [hovered, setHovered] = useState(false);

//   const isActive = active === item.label;

//   return (
//     <li className="relative">
//       <NavLink
//   to={item.path}
//   className={({ isActive }) =>
//     `flex items-center gap-1 px-3.5 py-2 text-[13.5px] font-medium border-b-2 transition-colors duration-200 ${
//       isActive
//         ? "text-[#1a6bbd] border-[#1a6bbd]"
//         : "text-[#222] border-transparent"
//     }`
//   }
// >
//   {item.label}
// </NavLink>
//     </li>
//   );
// };

// export default function Navbar() {
//   const [activeLink, setActiveLink] = useState("Home");
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [contactHovered, setContactHovered] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 12);
//     onScroll();
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <>
//       {/* Google Font */}
//       <link
//         href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
//         rel="stylesheet"
//       />

//       {/* Tabler Icons */}
//       <link
//         href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
//         rel="stylesheet"
//       />

//       <nav
//         className={`sticky top-0 z-[1000] bg-white border-b border-[#e8edf2] font-[Poppins] transition-all duration-300 ${
//           scrolled
//             ? "shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
//             : "shadow-[0_1px_8px_rgba(0,0,0,0.06)]"
//         }`}
//       >
//         <div
//           className={`max-w-[1200px] mx-auto px-6 flex items-center justify-between gap-6 transition-[padding] duration-300 ease-out ${
//             scrolled ? "py-1.5" : "py-[4px]"
//           }`}
//         >
          
//           {/* Logo */}
//           <Link
//             to="/"
//             className="flex items-center shrink-0 w-[150px]"
//           >
//             <img
//               src={logo}
//               alt="CSK Information Technology"
//               className={`w-auto object-contain transition-[height] duration-300 ease-out ${
//                 scrolled ? "h-[50px]" : "h-[60px]"
//               }`}
//             />
//           </Link>

//           {/* Desktop Nav */}
//           <ul className="hidden md:flex items-center gap-1 flex-1 justify-center list-none m-0 p-0">
//             {navLinks.map((item) => (
//               <NavItem
//                 key={item.label}
//                 item={item}
//                 active={activeLink}
//                 onActivate={setActiveLink}
//               />
//             ))}
//           </ul>

//           {/* Right Section */}
//           <div className="flex items-center gap-3.5 shrink-0">

//             {/* Social Icons */}
//           <div className="hidden md:flex items-center gap-2">
//   {[
//     { icon: "brand-instagram", link: "https://www.instagram.com/csk_infotech?igsh=MXM1azByaDVueXFxbA==" },
//     { icon: "headset", link: "https://support.cskinfotech.com/login.php" }, // Help Desk
   
//     { icon: "brand-facebook", link: "https://www.facebook.com/CSKITNOIDA/" },
//   ].map((item) => (
//     <a
//       key={item.icon}
//       href={item.link}
//       aria-label={item.icon}
//       className="text-[#555] text-[18px] p-1 flex items-center transition-all duration-200 hover:text-[#1a6bbd]"
//     >
//       <i className={`ti ti-${item.icon}`} />
//     </a>
//   ))}
// </div>

//             {/* Contact Button */}
//             <Link to ="/ContactPage"
//               type="button"
//               onMouseEnter={() => setContactHovered(true)}
//               onMouseLeave={() => setContactHovered(false)}
//               className={`hidden md:block text-white text-[13px] font-semibold px-5 py-[9px] rounded-md transition-all duration-200 whitespace-nowrap
//                 ${
//                   contactHovered
//                     ? "bg-[#155ea8]"
//                     : "bg-[#1a6bbd]"
//                 }
//               `}
//             >
//               Contact Us
//             </Link>

//             {/* Mobile Hamburger */}
//             <button
//               type="button"
//               aria-label="Toggle Menu"
//               onClick={() => setMobileOpen((v) => !v)}
//               className="md:hidden text-[24px] text-[#222]"
//             >
//               <i
//                 className={`ti ti-${mobileOpen ? "x" : "menu-2"}`}
//               />
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div
//   className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-[#e8edf2]
//     ${
//       mobileOpen
//         ? "max-h-[500px] opacity-100"
//         : "max-h-0 opacity-0"
//     }
//   `}
// >
//   <div className="px-6 py-4`">

//     {navLinks.map((item) => (
//       <NavLink
//         key={item.label}
//         to={item.path}
//         onClick={() => {
//           setActiveLink(item.label);
//           setMobileOpen(false);
//         }}
//         className={`w-full text-left py-3 border-b border-[#f0f0f0] text-[14px] font-medium flex items-center justify-between transition-all duration-200

//           ${
//             activeLink === item.label
//               ? "text-[#1a6bbd]"
//               : "text-[#222]"
//           }
//         `}
//       >
//         <span>{item.label}</span>

//         {item.hasDropdown && (
//           <i className="ti ti-chevron-right text-[#aaa]" />
//         )}
//       </NavLink>
//     ))}

//     <Link
//       to="/ContactPage"
//       onClick={() => setMobileOpen(false)}
//       className="block w-full mt-4 bg-[#1a6bbd] text-white text-[13px] font-semibold py-3 rounded-md text-center"
//     >
//       Contact Us
//     </Link>

//   </div>
// </div>
//       </nav>
//     </>
//   );
// }




// import { useState, useEffect } from "react";
// import logo from "../assets/Logo/logo.png";
// import { Link, NavLink } from "react-router-dom";

// const navLinks = [
//   { label: "Home",      path: "/" },
//   { label: "Solutions", path: "/Solution" },
//   { label: "Services",  path: "/Service" },
//   { label: "Career",    path: "/CareerPage" },
//   { label: "Gallery",   path: "/GalleryPage" },
//   { label: "About us",  path: "/AboutPage" },
//   { label: "Admin",     path: "/AdminPage" },
// ];

// const socials = [
//   { icon: "brand-instagram", href: "https://www.instagram.com/csk_infotech?igsh=MXM1azByaDVueXFxbA==" },
//   { icon: "headset",         href: "https://support.cskinfotech.com/login.php" },
//   { icon: "brand-facebook",  href: "https://www.facebook.com/CSKITNOIDA/" },
// ];

// export default function Navbar() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [scrolled,   setScrolled]   = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 30);
//     onScroll();
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const closeMenu = () => setMobileOpen(false);

//   return (
//     <>
//       <link
//         href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
//         rel="stylesheet"
//       />
//       <link
//         href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
//         rel="stylesheet"
//       />

//       {/* Fixed navbar — floats over hero, takes zero height in document flow */}
//       <nav className={`csk-nav ${scrolled ? "csk-nav--scrolled" : ""}`}>

//         {/* Logo */}
//         <Link to="/" className="csk-logo" onClick={closeMenu}>
//           <img src={logo} alt="CSK Infotech" className="csk-logo-img" />
//         </Link>

//         {/* Desktop links */}
//         <ul className="csk-links">
//           {navLinks.map(({ label, path }) => (
//             <li key={label}>
//               <NavLink
//                 to={path}
//                 end={path === "/"}
//                 className={({ isActive }) =>
//                   "csk-link" + (isActive ? " csk-link--active" : "")
//                 }
//               >
//                 {label}
//               </NavLink>
//             </li>
//           ))}
//         </ul>

//         {/* Right: socials + CTA + hamburger */}
//         <div className="csk-right">
//           <div className="csk-socials">
//             {socials.map(({ icon, href }) => (
//               <a
//                 key={icon}
//                 href={href}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="csk-social-btn"
//                 aria-label={icon}
//               >
//                 <i className={`ti ti-${icon}`} />
//               </a>
//             ))}
//           </div>

//           <Link to="/ContactPage" className="csk-cta">
//             Contact Us
//           </Link>

//           <button
//             className="csk-hamburger"
//             aria-label={mobileOpen ? "Close menu" : "Open menu"}
//             onClick={() => setMobileOpen((v) => !v)}
//           >
//             <i className={`ti ti-${mobileOpen ? "x" : "menu-2"}`} />
//           </button>
//         </div>
//       </nav>

//       {/* Mobile drawer — also fixed, drops below navbar */}
//       <div className={`csk-mobile-drawer ${mobileOpen ? "csk-mobile-drawer--open" : ""}`}>
//         <div className="csk-mobile-inner">
//           {navLinks.map(({ label, path }) => (
//             <NavLink
//               key={label}
//               to={path}
//               end={path === "/"}
//               onClick={closeMenu}
//               className={({ isActive }) =>
//                 "csk-mobile-link" + (isActive ? " csk-mobile-link--active" : "")
//               }
//             >
//               <span>{label}</span>
//               <i className="ti ti-chevron-right" style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }} />
//             </NavLink>
//           ))}
//           <Link to="/ContactPage" onClick={closeMenu} className="csk-mobile-cta">
//             Contact Us
//           </Link>
//         </div>
//       </div>

//       <style>{`
//         /* ── Base reset ── */
//         .csk-nav *, .csk-mobile-drawer * { box-sizing: border-box; }

//         /* ── Navbar: fixed, fully transparent by default ── */
//         .csk-nav {
//           position: fixed;
//           top: 14px;
//           left: 50%;
//           transform: translateX(-50%);
//           width: 94%;
//           max-width: 1300px;
//           z-index: 1000;
//           font-family: 'Poppins', sans-serif;

//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           gap: 16px;
//           padding: 8px 20px;

//           /* Fully transparent glass — no background color */
//           background: rgba(255, 255, 255, 0.04);
//           backdrop-filter: blur(18px);
//           -webkit-backdrop-filter: blur(18px);
//           border: 1px solid rgba(255, 255, 255, 0.10);
//           border-radius: 20px;
//           transition: background 0.3s ease, box-shadow 0.3s ease, top 0.3s ease;
//         }

//         /* After scroll: slightly more visible but still very transparent */
//         .csk-nav--scrolled {
//           top: 8px;
//           background: rgba(5, 8, 22, 0.55);
//           border-color: rgba(255, 255, 255, 0.13);
//           box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
//         }

//         /* ── Logo ── */
//         .csk-logo { display: flex; align-items: center; text-decoration: none; flex-shrink: 0; }
//         .csk-logo-img {
//           height: 50px;
//           width: auto;
//           object-fit: contain;
//           transition: height 0.3s;
//         }
//         .csk-nav--scrolled .csk-logo-img { height: 42px; }

//         /* ── Desktop nav links ── */
//         .csk-links {
//           display: flex;
//           align-items: center;
//           gap: 2px;
//           list-style: none;
//           margin: 0; padding: 0;
//           flex: 1;
//           justify-content: center;
//         }

//         .csk-link {
//           display: block;
//           padding: 7px 15px;
//           color: rgba(255, 255, 255, 0.65);
//           text-decoration: none;
//           font-size: 13.5px;
//           font-weight: 500;
//           border-radius: 12px;
//           border: 1px solid transparent;
//           transition: all 0.22s ease;
//           white-space: nowrap;
//         }

//         .csk-link:hover {
//           color: #fff;
//           background: rgba(255, 255, 255, 0.09);
//           border-color: rgba(255, 255, 255, 0.12);
//         }

//         .csk-link--active {
//           color: #fff;
//           background: rgba(99, 102, 241, 0.28);
//           border-color: rgba(139, 92, 246, 0.40);
//           box-shadow: 0 2px 12px rgba(99, 102, 241, 0.18);
//         }

//         /* ── Right section ── */
//         .csk-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
//         .csk-socials { display: flex; align-items: center; gap: 6px; }

//         .csk-social-btn {
//           width: 36px; height: 36px;
//           display: flex; align-items: center; justify-content: center;
//           background: rgba(255, 255, 255, 0.06);
//           border: 1px solid rgba(255, 255, 255, 0.10);
//           border-radius: 10px;
//           color: rgba(255, 255, 255, 0.65);
//           font-size: 17px;
//           text-decoration: none;
//           transition: all 0.2s ease;
//         }
//         .csk-social-btn:hover {
//           background: rgba(255, 255, 255, 0.14);
//           color: #fff;
//           transform: translateY(-2px);
//         }

//         .csk-cta {
//           padding: 8px 22px;
//           background: linear-gradient(135deg, #6366f1, #8b5cf6);
//           border-radius: 12px;
//           color: #fff;
//           font-size: 13px;
//           font-weight: 600;
//           text-decoration: none;
//           letter-spacing: 0.2px;
//           transition: all 0.25s;
//           white-space: nowrap;
//         }
//         .csk-cta:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 6px 22px rgba(99, 102, 241, 0.5);
//         }

//         /* ── Hamburger ── */
//         .csk-hamburger {
//           display: none;
//           width: 38px; height: 38px;
//           align-items: center; justify-content: center;
//           background: rgba(255, 255, 255, 0.07);
//           border: 1px solid rgba(255, 255, 255, 0.12);
//           border-radius: 10px;
//           color: rgba(255, 255, 255, 0.85);
//           font-size: 20px;
//           cursor: pointer;
//           transition: background 0.2s;
//         }
//         .csk-hamburger:hover { background: rgba(255, 255, 255, 0.14); color: #fff; }

//         /* ── Mobile drawer: fixed below navbar ── */
//         .csk-mobile-drawer {
//           position: fixed;
//           top: 80px;
//           left: 50%;
//           transform: translateX(-50%);
//           width: 92%;
//           max-width: 500px;
//           z-index: 999;
//           overflow: hidden;
//           max-height: 0;
//           opacity: 0;
//           transition: max-height 0.35s ease, opacity 0.25s ease;
//           font-family: 'Poppins', sans-serif;
//         }
//         .csk-mobile-drawer--open {
//           max-height: 600px;
//           opacity: 1;
//         }

//         .csk-mobile-inner {
//           background: rgba(5, 8, 22, 0.82);
//           backdrop-filter: blur(24px);
//           -webkit-backdrop-filter: blur(24px);
//           border: 1px solid rgba(255, 255, 255, 0.10);
//           border-radius: 18px;
//           padding: 10px 12px 14px;
//           display: flex;
//           flex-direction: column;
//           gap: 2px;
//         }

//         .csk-mobile-link {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: 12px 16px;
//           border-bottom: 1px solid rgba(255, 255, 255, 0.05);
//           color: rgba(255, 255, 255, 0.70);
//           font-size: 14px;
//           font-weight: 500;
//           text-decoration: none;
//           border-radius: 10px;
//           transition: all 0.2s;
//         }
//         .csk-mobile-link:hover { color: #fff; background: rgba(255,255,255,0.07); }
//         .csk-mobile-link--active { color: #a5b4fc; background: rgba(99,102,241,0.15); }

//         .csk-mobile-cta {
//           display: block;
//           margin-top: 8px;
//           padding: 13px;
//           background: linear-gradient(135deg, #6366f1, #8b5cf6);
//           border-radius: 12px;
//           color: #fff;
//           font-size: 14px;
//           font-weight: 600;
//           text-align: center;
//           text-decoration: none;
//           transition: transform 0.2s, box-shadow 0.2s;
//         }
//         .csk-mobile-cta:hover { transform: scale(1.01); box-shadow: 0 6px 20px rgba(99,102,241,0.4); }

//         /* ── Responsive ── */
//         @media (max-width: 1024px) {
//           .csk-links   { display: none; }
//           .csk-socials { display: none; }
//           .csk-cta     { display: none; }
//           .csk-hamburger { display: flex; }
//         }

//         @media (max-width: 768px) {
//           .csk-nav { padding: 8px 14px; top: 10px; }
//           .csk-logo-img { height: 42px; }
//           .csk-mobile-drawer { top: 72px; }
//         }

//         @media (max-width: 480px) {
//           .csk-nav { top: 8px; border-radius: 14px; }
//           .csk-logo-img { height: 36px; }
//           .csk-mobile-drawer { top: 64px; width: 96%; }
//         }
//       `}</style>
//     </>
//   );
// }


import { useState, useEffect, useRef } from "react";
import logo from "../assets/Logo/logo.png";
import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { label: "Home",      path: "/" },
  { label: "Solutions", path: "/Solution" },
  { label: "Services",  path: "/Service" },
  { label: "Career",    path: "/CareerPage" },
  { label: "Gallery",   path: "/GalleryPage" },
  { label: "About us",  path: "/AboutPage" },
  { label: "Admin",     path: "/AdminPage" },
];

const socials = [
  { icon: "brand-instagram", href: "https://www.instagram.com/csk_infotech?igsh=MXM1azByaDVueXFxbA==" },
  { icon: "headset",         href: "https://support.cskinfotech.com/login.php" },
  { icon: "brand-facebook",  href: "https://www.facebook.com/CSKITNOIDA/" },
];

/* Tilt wrapper — li pe ref, NavLink ke andar */
function TiltNavItem({ label, path }) {
  const liRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = liRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const midX = rect.width / 2;
    const tiltY = ((x - midX) / midX) * 14;
    el.style.transform = `perspective(500px) rotateY(${tiltY}deg) rotateX(-4deg) translateY(-2px)`;
  };

  const handleMouseLeave = () => {
    const el = liRef.current;
    if (!el) return;
    el.style.transform = "perspective(500px) rotateY(0deg) rotateX(0deg) translateY(0px)";
  };

  return (
    <li
      ref={liRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.15s ease", transformStyle: "preserve-3d" }}
    >
      <NavLink
        to={path}
        end={path === "/"}
        className={({ isActive }) =>
          "csk-link" + (isActive ? " csk-link--active" : "")
        }
      >
        {label}
      </NavLink>
    </li>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" rel="stylesheet" />

      <nav className={`csk-nav ${scrolled ? "csk-nav--scrolled" : ""}`}>

        <Link to="/" className="csk-logo" onClick={closeMenu}>
          <img src={logo} alt="CSK Infotech" className="csk-logo-img" />
        </Link>

        <ul className="csk-links">
          {navLinks.map(({ label, path }) => (
            <TiltNavItem key={label} label={label} path={path} />
          ))}
        </ul>

        <div className="csk-right">
          <div className="csk-socials">
            {socials.map(({ icon, href }) => (
              <a key={icon} href={href} target="_blank" rel="noreferrer" className="csk-social-btn" aria-label={icon}>
                <i className={`ti ti-${icon}`} />
              </a>
            ))}
          </div>
          <Link to="/ContactPage" className="csk-cta">Contact Us</Link>
          <button
            className="csk-hamburger"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <i className={`ti ti-${mobileOpen ? "x" : "menu-2"}`} />
          </button>
        </div>
      </nav>

      <div className={`csk-mobile-drawer ${mobileOpen ? "csk-mobile-drawer--open" : ""}`}>
        <div className="csk-mobile-inner">
          {navLinks.map(({ label, path }) => (
            <NavLink
              key={label}
              to={path}
              end={path === "/"}
              onClick={closeMenu}
              className={({ isActive }) =>
                "csk-mobile-link" + (isActive ? " csk-mobile-link--active" : "")
              }
            >
              <span>{label}</span>
              <i className="ti ti-chevron-right" style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }} />
            </NavLink>
          ))}
          <Link to="/ContactPage" onClick={closeMenu} className="csk-mobile-cta">Contact Us</Link>
        </div>
      </div>

      <style>{`
        .csk-nav *, .csk-mobile-drawer * { box-sizing: border-box; }

        .csk-nav {
          position: fixed;
          top: 14px;
          left: 50%;
          transform: translateX(-50%);
          width: 94%;
          max-width: 1300px;
          z-index: 1000;
          font-family: 'Poppins', sans-serif;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 8px 20px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 20px;
          transition: background 0.3s ease, box-shadow 0.3s ease, top 0.3s ease;
        }
        .csk-nav--scrolled {
          top: 8px;
          background: rgba(5,8,22,0.55);
          border-color: rgba(255,255,255,0.13);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }

        .csk-logo { display: flex; align-items: center; text-decoration: none; flex-shrink: 0; }
        .csk-logo-img { height: 50px; width: auto; object-fit: contain; transition: height 0.3s; }
        .csk-nav--scrolled .csk-logo-img { height: 42px; }

        .csk-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0; padding: 0;
          flex: 1;
          justify-content: center;
        }

        .csk-link {
          display: block;
          padding: 7px 15px;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 500;
          border-radius: 12px;
          border: 1px solid transparent;
          transition: background 0.22s ease, color 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
          white-space: nowrap;
        }
        .csk-link:hover {
          color: #fff;
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.14);
        }
        .csk-link--active {
          color: #fff;
          background: rgba(99,102,241,0.28);
          border-color: rgba(139,92,246,0.40);
          box-shadow: 0 2px 12px rgba(99,102,241,0.18);
        }

        .csk-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .csk-socials { display: flex; align-items: center; gap: 6px; }

        .csk-social-btn {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 10px;
          color: rgba(255,255,255,0.65);
          font-size: 17px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .csk-social-btn:hover { background: rgba(255,255,255,0.14); color: #fff; transform: translateY(-2px); }

        .csk-cta {
          padding: 8px 22px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 12px;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
          transition: all 0.25s;
        }
        .csk-cta:hover { transform: translateY(-2px); box-shadow: 0 6px 22px rgba(99,102,241,0.5); }

        .csk-hamburger {
          display: none;
          width: 38px; height: 38px;
          align-items: center; justify-content: center;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          color: rgba(255,255,255,0.85);
          font-size: 20px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .csk-hamburger:hover { background: rgba(255,255,255,0.14); color: #fff; }

        .csk-mobile-drawer {
          position: fixed;
          top: 80px;
          left: 50%;
          transform: translateX(-50%);
          width: 92%;
          max-width: 500px;
          z-index: 999;
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.35s ease, opacity 0.25s ease;
          font-family: 'Poppins', sans-serif;
        }
        .csk-mobile-drawer--open { max-height: 600px; opacity: 1; }

        .csk-mobile-inner {
          background: rgba(5,8,22,0.82);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 18px;
          padding: 10px 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .csk-mobile-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.70);
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.2s;
        }
        .csk-mobile-link:hover { color: #fff; background: rgba(255,255,255,0.07); }
        .csk-mobile-link--active { color: #a5b4fc; background: rgba(99,102,241,0.15); }

        .csk-mobile-cta {
          display: block;
          margin-top: 8px;
          padding: 13px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 12px;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          text-align: center;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .csk-mobile-cta:hover { transform: scale(1.01); box-shadow: 0 6px 20px rgba(99,102,241,0.4); }

        @media (max-width: 1024px) {
          .csk-links   { display: none; }
          .csk-socials { display: none; }
          .csk-cta     { display: none; }
          .csk-hamburger { display: flex; }
        }
        @media (max-width: 768px) {
          .csk-nav { padding: 8px 14px; top: 10px; }
          .csk-logo-img { height: 42px; }
          .csk-mobile-drawer { top: 72px; }
        }
        @media (max-width: 480px) {
          .csk-nav { top: 8px; border-radius: 14px; }
          .csk-logo-img { height: 36px; }
          .csk-mobile-drawer { top: 64px; width: 96%; }
        }
      `}</style>
    </>
  );
}