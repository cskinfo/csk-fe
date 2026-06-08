import { useState } from "react";
import logo from "../assets/Logo/logo.png";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const navLinks = [

    { label: "Home", hasDropdown: true,path: "/" },

  { label: "Solutions", hasDropdown: true,path: "/Solution" },
  { label: "Services", hasDropdown: true ,path: "/Service"},
  { label: "Career", hasDropdown: true ,path: "/CareerPage"},
  { label: "Gallery", hasDropdown: false,path: "/GalleryPage" },
  { label: "Partners", hasDropdown: false,path: "/Solution" },
  { label: "Admin", hasDropdown: true,path: "/AdminPage" },
];

const NavItem = ({ item, active, onActivate }) => {
  const [hovered, setHovered] = useState(false);

  const isActive = active === item.label;

  return (
    <li className="relative">
      <NavLink
  to={item.path}
  className={({ isActive }) =>
    `flex items-center gap-1 px-3.5 py-2 text-[13.5px] font-medium border-b-2 ${
      isActive
        ? "text-[#1a6bbd] border-[#1a6bbd]"
        : "text-[#222] border-transparent"
    }`
  }
>
  {item.label}
</NavLink>
    </li>
  );
};

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactHovered, setContactHovered] = useState(false);

  return (
    <>
      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Tabler Icons */}
      <link
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
        rel="stylesheet"
      />

      <nav className="sticky top-0 z-[1000] bg-white border-b border-[#e8edf2] shadow-[0_1px_8px_rgba(0,0,0,0.06)] font-[Poppins]">
        <div className="max-w-[1200px] mx-auto px-6 h-[70px] flex items-center justify-between gap-6">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0"
          >
            <img
              src={logo}
              alt="CSK Information Technology"
              className="h-[60px] w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1 flex-1 justify-center list-none m-0 p-0">
            {navLinks.map((item) => (
              <NavItem
                key={item.label}
                item={item}
                active={activeLink}
                onActivate={setActiveLink}
              />
            ))}
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-3.5 shrink-0">

            {/* Social Icons */}
          <div className="hidden md:flex items-center gap-2">
  {[
    { icon: "brand-instagram", link: "https://www.instagram.com/csk_infotech?igsh=MXM1azByaDVueXFxbA==" },
    { icon: "headset", link: "https://support.cskinfotech.com/login.php" }, // Help Desk
   
    { icon: "brand-facebook", link: "#" },
  ].map((item) => (
    <a
      key={item.icon}
      href={item.link}
      aria-label={item.icon}
      className="text-[#555] text-[18px] p-1 flex items-center transition-all duration-200 hover:text-[#1a6bbd]"
    >
      <i className={`ti ti-${item.icon}`} />
    </a>
  ))}
</div>

            {/* Contact Button */}
            <Link to ="/ContactPage"
              type="button"
              onMouseEnter={() => setContactHovered(true)}
              onMouseLeave={() => setContactHovered(false)}
              className={`hidden md:block text-white text-[13px] font-semibold px-5 py-[9px] rounded-md transition-all duration-200 whitespace-nowrap
                ${
                  contactHovered
                    ? "bg-[#155ea8]"
                    : "bg-[#1a6bbd]"
                }
              `}
            >
              Contact Us
            </Link>

            {/* Mobile Hamburger */}
            <button
              type="button"
              aria-label="Toggle Menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden text-[24px] text-[#222]"
            >
              <i
                className={`ti ti-${mobileOpen ? "x" : "menu-2"}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
  className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-[#e8edf2]
    ${
      mobileOpen
        ? "max-h-[500px] opacity-100"
        : "max-h-0 opacity-0"
    }
  `}
>
  <div className="px-6 py-4">

    {navLinks.map((item) => (
      <NavLink
        key={item.label}
        to={item.path}
        onClick={() => {
          setActiveLink(item.label);
          setMobileOpen(false);
        }}
        className={`w-full text-left py-3 border-b border-[#f0f0f0] text-[14px] font-medium flex items-center justify-between transition-all duration-200

          ${
            activeLink === item.label
              ? "text-[#1a6bbd]"
              : "text-[#222]"
          }
        `}
      >
        <span>{item.label}</span>

        {item.hasDropdown && (
          <i className="ti ti-chevron-right text-[#aaa]" />
        )}
      </NavLink>
    ))}

    <Link
      to="/ContactPage"
      onClick={() => setMobileOpen(false)}
      className="block w-full mt-4 bg-[#1a6bbd] text-white text-[13px] font-semibold py-3 rounded-md text-center"
    >
      Contact Us
    </Link>

  </div>
</div>
      </nav>
    </>
  );
}