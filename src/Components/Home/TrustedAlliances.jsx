import { useState, useEffect, useRef, useCallback } from "react";
import samsung from "../../assets/clients/samsungg.png";
import hp from "../../assets/clients/hplogo.png";
import netapp from "../../assets/clients/netappp.png";
import dell from "../../assets/clients/dell.png";
import cisco from "../../assets/clients/cisco.png";
import aws from "../../assets/clients/aws.png";
import hitachi from "../../assets/clients/hitachi.png";
import suse from "../../assets/clients/suse.png";
import microsoft from "../../assets/clients/micro.png";
import oracle from "../../assets/clients/oracle.png";
import trend from "../../assets/clients/trend.png";
import welcomhotel from "../../assets/clients/welcomhotell.png";
import iitmandi from "../../assets/clients/iitmandi.png";
import idds from "../../assets/clients/idds.png";
import gku from "../../assets/clients/gku.png";
import bharatpetroleum from "../../assets/clients/bharatpetroleum.png";
import hcl from "../../assets/clients/HCLTECH.NS_BIG.png";
import AU from "../../assets/clients/AUBANK.png";
import Lenovo from "../../assets/clients/Lenovo-Symbol.png";
import trendmicrologo from "../../assets/clients/trendmicrologo.png";
import Fortinet from "../../assets/clients/Fortinet.png";
import PeopleLinkLogo from "../../assets/clients/PeopleLinkLogo.png";

import panasoniclogo from "../../assets/clients/Panasonicc.png";

import juniperr from "../../assets/clients/juniperr.png";
import barracuda from "../../assets/clients/barracudalogosss.png";
import commvault from "../../assets/clients/commvault.png";

// our client 
import dynamicEngineers from "../../assets/clients/dynamicEngineers.png";
import savex from "../../assets/clients/savex.png";
import hyphen from "../../assets/clients/hyphen.avif"

import teamcomputer from "../../assets/clients/team_computers-removebg-preview.png"

import ceigallremovebgpreview from "../../assets/clients/ceigall-removebg-preview.png"
import accel from "../../assets/clients/accel.png"

import sysmacsolutionlogo from "../../assets/clients/sysmac-solution-logo.png"
import sy from "../../assets/clients/sy.png"
import logo from "../../assets/clients/logo.png"
import tilid from "../../assets/clients/tilid.webp"

import lubrikote from "../../assets/clients/lubrikote.png"
import Pnb from "../../assets/clients/Pnb.png"
import ifci from "../../assets/clients/ifci.png"
import utkarsh from "../../assets/clients/utkarsh.avif"
import csll from "../../assets/clients/csll.png"

import pgbremovebgpreview from "../../assets/clients/pgb.png"

import parkinn from "../../assets/clients/parkinn.png"
import alila from "../../assets/clients/alila.png"
import ibis from "../../assets/clients/ibislogo.png"

import novo from "../../assets/clients/novohotel.png"
import abes from "../../assets/clients/abes.png"

import IITMANDILOGO from "../../assets/clients/IITMANDILOGO.png"

import INDRAPRASTHA from "../../assets/clients/INDRAPRASTHA.png"

import GKUlogo from "../../assets/clients/GKUlogo.png"


import army from "../../assets/clients/army.png"

import Teerthankar from "../../assets/clients/Teerthankar.png"

import KR from "../../assets/clients/KR.png"
import NHPC from "../../assets/clients/square_NHPC.png"
import food from "../../assets/clients/FOODLOGO-removebg-preview.png"

import ESIANDPF from "../../assets/clients/ESIANDPF.png"

import Bharat from "../../assets/clients/Bharat.png"
import Habitat from "../../assets/clients/Habitatt.png"
import jvvnl from "../../assets/clients/jvvnl.png"

import deptfertilizers from "../../assets/clients/deptfertilizers.png"
import NIC from "../../assets/clients/NICELOGOS.png"















/* PARTNERS */
import acer from "../../assets/partners/acer.png";
import juniper from "../../assets/partners/juniper.png";
import panasonic from "../../assets/partners/panasonic.png";
import peoplelink from "../../assets/partners/peoplelink.png";
// import lenovo from "../../assets/partners/Lenovologo.png";
/* ─── DATA ─── */
const CATEGORIES = [
  { id: "all",        label: "All Partners",           icon: "fa-globe" },
  { id: "ourClient",   label: "Our Client",               icon: null },
   { id: "Government",   label: "Our Government & PSU Customer",icon: null },
  { id: "security",   label: "Security",               icon: null },
  { id: "cloud",      label: "Cloud",                  icon: null },
  { id: "networking", label: "Networking",              icon: null },
  { id: "enterprise", label: "Enterprise & Storage",   icon: null },
  { id: "license",    label: "License & Subscription", icon: null },
  // { id: "audio",      label: "Audio Visual",           icon: null },
];

const PARTNERS = [
  {
     
    name: "Cisco",
    logo: cisco,
    category: "networking",
    color: "#1ba0d7",

    width: "95px",
    height: "32px",
  
  },

   {
     
    name: "dynamicEngineers",
    logo: dynamicEngineers,
    category: "ourClient",
    color: "#ff7f50",

    width: "95px",
    height: "32px",
  
  },

   {
    name: "AWS",
    logo: aws,
    category: "cloud",
    color: "#ff9900",

    width: "60px",
    height: "40px",
  },

   {
    name: "Microsoft",
    logo: microsoft,
    category: "cloud",
    color: "#00a4ef",

    width: "150px",
    height: "40px",
  },
{
     name: "Dell",
    logo: dell,
    category: "enterprise",
    color: "#007db8",

    width: "95px",
    height: "34px",
  },

   {
    name: "Samsung",
    logo: samsung,
    category: "endpoint",
    color: "#1b1b1b",

    width: "90px",
    height: "25px",
  },

  {
    name: "NetApp",
    logo: netapp,
    category: "enterprise",
    color: "#009bde",

    width: "125px",
    height: "43px",
  },

    {
    name: "Hitachi",
    logo: hitachi,
    category: ["networking","ourClient"],
    color: "#e31937",

    width: "110px",
    height: "40px",
  },

  {
    name: "Oracle",
    logo: oracle,
    category: "enterprise",
    color: "#f80000",

    width: "110px",
    height: "40px",
  },


  {
    name: "HCL",
    logo: hcl,
    category: ["networking","ourClient"],
    color: "#0000ff ",
     width: "70px",
    height: "20px",

  },

  {
    name: "savex",
    logo: savex,
    category: "ourClient",
    color: "#ff4500",
     width: "70px",
    height: "20px",

  },


  {
    name: "HP",
    logo: hp,
    category: "enterprise",
    color: "#0096d6",
     width: "110px",
    height: "40px",
  },

  {
    name: "Acer",
    logo: acer,
    category: "endpoint",
    color: "#83b81a",
     width: "110px",
    height: "40px",
  },

  {
    name: "AU",
    logo: AU,
    category: ["networking","ourClient"],
    color: "#ff8c00",
     width: "110px",
    height: "40px",
  },

  {
    name: "Lenovo",
    logo: Lenovo,
    category: "enterprise",
    color: "#ff0000",
     width: "110px",
    height: "40px",
  },

   {
    name: "Trend Micro ",
    logo: trendmicrologo,
    category: "enterprise",
    color: "#ff0000",
     width: "300px",
    height: "400px",
  },

  {
    name: "SUSE",
    logo: suse,
    category: "enterprise",
    color: "#30ba78",
     width: "110px",
    height: "35px",
  },

  {
    name: "WelcomHotel",
    logo: welcomhotel,
    category: "enterprise",
    color: "#d4af37",
     width: "250px",
    height: "89px",
  },

  {
    name: "Fortinet",
    logo: Fortinet,
    category: "enterprise",
    color: "#8b0000",
     width: "140px",
    height: "100px",
  },

  {
    name: "PeopleLinkLogo",
    logo: PeopleLinkLogo,
    category: "enterprise",
    color: "#0077c8",
     width: "250px",
    height: "150px",
  },

  {
    name: "panasoniclogo",
    logo: panasoniclogo,
    category: "enterprise",
    color: "#004080",
     width: "200px",
    height: "100px",
  },

  {
    name: "juniperr",
    logo: juniperr,
    category: "enterprise",
    color: "#000000 ",
     width: "80px",
    height: "30px",
  },

  {
    name: "barracuda",
    logo: barracuda,
    category: "enterprise",
    color: "#1f5aa6",
     width: "110px",
    height: "50px",
  },

   {
    name: "commvault",
    logo: commvault,
    category: "enterprise",
    color: "#800080",
     width: "110px",
    height: "20px",
  },

  

 

]; 

const OUR_CLIENTS = [

  {
    name: "Hitachi",
    logo: hitachi,
    color: "#cc0000",

    width: "120px",
    height: "40px",
  },

  {
    name: "Dell",
    logo: dell,
    color: "#0000ff",

    width: "150px",
    height: "48px",
  },

  {
    name: "Savex",
    logo: savex,
    color: "#ffa500",

    width: "65px",
    height: "35px",
  },

   {
    name: "HCL",
    logo: hcl,
    color: "#0000cd",

    width: "75px",
    height: "30px",
  },

  {
    name: "Team Computer",
    logo: teamcomputer,
    color: "#eee600",

    width: "150px",
    height: "80px",
  },

  {
    name: "dynamicEngineers",
    logo: dynamicEngineers,
    color: "#ff4500 ",

    width: "120px",
    height: "40px",
  },
  
   {
    name: "Ceigallremovebgpreview",
    logo: ceigallremovebgpreview,
    color: "#1#ffa500 ",

    width: "115px",
    height: "44px",
  },

  {
    name: "accel",
    logo: accel,
    color: "#00008b ",

    width: "180px",
    height: "60px",
  },

  {
    name: "sysmacsolutionlogo",
    logo: sysmacsolutionlogo,
    color: "#0000cd ",

    width: "100px",
    height: "40px",
  },

  {
    name: "sy",
    logo: sy,
    color: "#0000cd ",

    width: "120px",
    height: "36px",
  },

  {
    name: "logo",
    logo: logo,
    color: "#000036",

    width: "110px",
    height: "50px",
  },

  {
    name: "tilid",
    logo: tilid,
    color: "#ff4500 ",

    width: "95px",
    height: "34px",
  },

  {
    name: "lubrikote",
    logo: lubrikote,
    color: "#6a5acd",

    width: "110px",
    height: "40px",
  },

  {
    name: "Pnb",
    logo: Pnb,
    color: "#ff9800",

    width: "90px",
    height: "90px",
  },

   {
    name: "AU",
    logo: AU,
    color: "#ff9800",

    width: "90px",
    height: "40px",
  },

   {
    name: "ifci",
    logo: ifci,
    color: "#0000ff",

    width: "90px",
    height: "90px",
  },

   {
    name: "utkarsh",
    logo: utkarsh,
    color: "#663399",

    width: "150px",
    height: "150px",
  },

     {
    name: "csll",
    logo: csll,
    color: "#8b0000 ",

    width: "150px",
    height: "150px",
  },


  //  {
  //   name: "pgbremovebgpreview",
  //   logo: pgbremovebgpreview,
  //   color: "#ff9800",

  //   width: "120px",
  //   height: "120px",
  // },

   {
    name: "hyphen",
    logo: hyphen,
    color: "#8b0000 ",

    width: "90px",
    height: "90px",
    
  },
   
   {
    name: "welcomhotel",
    logo: welcomhotel,
    color: "#ff9800",

    width: "250px",
    height: "90px",
  },

    {
    name: "parkinn",
    logo: parkinn,
    color: "#00008b",

    width: "80px",
    height: "90px",
  },


    {
    name: "alila",
    logo: alila,
    color: "#242124",

    width: "80px",
    height: "80px",
  },

    {
    name: "ibis",
    logo: ibis,
    color: "#800000",

    width: "80px",
    height: "60px",
  },

    {
    name: "novo",
    logo: novo,
    color: "#002147",

    width: "90px",
    height: "80px",
  },

   {
    name: "abes",
    logo: abes,
    color: "#002147",

    width: "90px",
    height: "80px",
  },

 

    {
    name: "IITMANDILOGO",
    logo: IITMANDILOGO,
    color: "#ffa500",

    width: "80px",
    height: "80px",
  },

    {
    name: "INDRAPRASTHA",
    logo: INDRAPRASTHA,
    color: "#00ced1",

    width: "70px",
    height: "70px",
  },



 {
    name: "GKUlogo",
    logo: GKUlogo,
    color: "#002147",

    width: "60px",
    height: "60px",
  },

 {
    name: "army",
    logo: army,
    color: "#002147",

    width: "50px",
    height: "50px",
  },

   {
    name: "Teerthankar",
    logo: Teerthankar,
    color: "#ff8c00",

    width: "70px",
    height: "70px",
  },

   {
    name: "KR",
    logo: KR,
    color: "#00b7eb",

    width: "50px",
    height: "50px",
  },


];

const GOVERNMENT_CLIENTS = [
  {
    name: "NHPC",
    logo: NHPC,
    color: "#0047ab",

    width: "140px",
    height: "80px",
  },

  
  {
    name: "food",
    logo: NIC,
    color: "#0047ab",

    width: "350px",
    height: "250px",
  },

  {
    name: "ESIANDPF",
    logo: ESIANDPF,
    color: "#ff0000 ",

    width: "140px",
    height: "60px",
  },

   {
    name: " Bharat",
    logo:  Bharat,
    color: "#0047ab",

    width: "140px",
    height: "60px",
  },

  {
    name: "Bharat Petroleum",
    logo: bharatpetroleum,
    color: "#ffff00",

    width: "120px",
    height: "50px",
  },

  
  {
    name: "IIT Mandi",
    logo: IITMANDILOGO,
    color: "#ffa500",

    width: "80px",
    height: "85px",
  },
 
  
 

  {
    name: "Habitat",
    logo: Habitat,
    color: "#003366",

    width: "95px",
    height: "65px",
  },
 

  {
    name: "INDRAPRASTHA",
    logo: INDRAPRASTHA,
    color: "#00ced1",

    width: "100px",
    height: "80px",
  },

   {
    name: " jvvnl",
    logo:  jvvnl,
    color: "#00ced1",

    width: "100px",
    height: "60px",
  },
  {
    name: " deptfertilizers",
    logo:  deptfertilizers,
    color: "#002147",

    width: "100px",
    height: "80px",
  },

   {
    name: "IFCI",
    logo: ifci,
    color: "#004080",

    width: "110px",
    height: "90px",
  },
  
 

  {
    name: "Army",
    logo: army,
    color: "#00008b",

    width: "70px",
    height: "50px",
  },

 
   {
    name: "food",
    logo: food,
    color: "#32cd32",

    width: "100px",
    height: "60px",
  },

  {
    name: "PNB",
    logo: Pnb,
    color: "#fff600",

    width: "100px",
    height: "90px",
  },

  {
    name: "CSLL",
    logo: csll,
    color: "#ff0000",

    width: "120px",
    height: "100px",
  },

  {
    name: "GKU",
    logo: GKUlogo,
    color: "#002147",

    width: "80px",
    height: "60px",
  },

];


/* ─── UTILS ─── */
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return `${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)}`;
}

/* ─── PARTICLES ─── */
function spawnParticles(x, y, color, rgb) {
  for (let i = 0; i < 14; i++) {
    const ptc = document.createElement("div");
    const angle = (i / 14) * Math.PI * 2 + Math.random() * 0.3;
    const dist  = 45 + Math.random() * 65;
    ptc.style.cssText = `
      position:fixed;
      width:${3 + Math.random() * 4}px;
      height:${3 + Math.random() * 4}px;
      border-radius:50%;
      pointer-events:none;
      z-index:9999;
      left:${x - 2.5}px;
      top:${y - 2.5}px;
      background:${color};
      box-shadow:0 0 6px rgba(${rgb},0.6);
      animation:ptc-fly ${0.6 + Math.random() * 0.3}s cubic-bezier(0.2,0,0.7,1) ${Math.random() * 80}ms forwards;
      --tx:${Math.cos(angle) * dist}px;
      --ty:${Math.sin(angle) * dist}px;
    `;
    document.body.appendChild(ptc);
    setTimeout(() => ptc.remove(), 1100);
  }
}

/* ─── TOAST ─── */
let _toastEl = null;
let _toastTmr = null;
function showToast(name, cat) {
  if (_toastEl) { _toastEl.remove(); clearTimeout(_toastTmr); }
  const t = document.createElement("div");
  t.style.cssText = `
    position:fixed; bottom:36px; left:50%;
    transform:translateX(-50%) translateY(0);
    background:rgba(15,25,60,0.93);
    border:1px solid rgba(255,255,255,0.12);
    backdrop-filter:blur(24px);
    color:#fff;
    padding:11px 26px;
    border-radius:100px;
    font-size:13.5px; font-weight:500;
    font-family:'DM Sans',sans-serif;
    box-shadow:0 20px 48px rgba(30,50,120,0.25);
    z-index:9000;
    transition:all 0.3s cubic-bezier(0.16,1,0.3,1);
    pointer-events:none; white-space:nowrap;
  `;
  t.innerHTML = `<span style="color:rgba(255,255,255,0.4);margin-right:8px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase">${cat}</span><strong>${name}</strong>`;
  document.body.appendChild(t);
  _toastEl = t;
  _toastTmr = setTimeout(() => {
    t.style.opacity = "0";
    t.style.transform = "translateX(-50%) translateY(16px)";
    setTimeout(() => { t.remove(); if (_toastEl === t) _toastEl = null; }, 320);
  }, 2200);
}

/* ─── LOGO CARD ─── */
function PartnerCard({ partner, index }) {
  const outerRef = useRef(null);
  const faceRef  = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 28);
    return () => clearTimeout(timer);
  }, [index]);

  const handleMouseMove = useCallback((e) => {
    const r  = outerRef.current.getBoundingClientRect();
    const dx = (e.clientX - r.left  - r.width  / 2) / (r.width  / 2);
    const dy = (e.clientY - r.top   - r.height / 2) / (r.height / 2);
    outerRef.current.style.transform = `translateY(-5px) scale(1.05) rotateX(${-dy * 13}deg) rotateY(${dx * 13}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = outerRef.current;
    el.style.transition = "transform 0.6s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease";
    el.style.transform  = "translateY(0) scale(1) rotateX(0) rotateY(0)";
    el.style.boxShadow  = "";
    setTimeout(() => { if (el) el.style.transition = ""; }, 600);
  }, []);

  const handleMouseEnter = useCallback(() => {
    const rgb = hexToRgb(partner.color);
    outerRef.current.style.boxShadow = `0 0 0 1.5px rgba(${rgb},0.35), 0 8px 28px rgba(${rgb},0.18), 0 20px 40px rgba(${rgb},0.08), 0 4px 8px rgba(30,50,120,0.08)`;
  }, [partner.color]);

  const handleClick = useCallback((e) => {
    const r   = faceRef.current.getBoundingClientRect();
    const rgb = hexToRgb(partner.color);

    const rip = document.createElement("div");
    rip.style.cssText = `
      position:absolute;
      width:16px; height:16px;
      border-radius:50%;
      pointer-events:none;
      left:${e.clientX - r.left - 8}px;
      top:${e.clientY - r.top - 8}px;
      background:rgba(${rgb},0.3);
      transform:scale(0);
      animation:ripple-grow 0.55s ease forwards;
      z-index:10;
    `;
    faceRef.current.appendChild(rip);
    setTimeout(() => rip.remove(), 600);

    spawnParticles(e.clientX, e.clientY, partner.color, rgb);
    showToast(partner.name, partner.category);
  }, [partner]);

  const rgb = hexToRgb(partner.color);

  return (
    <div
      ref={outerRef}
      className="card-outer"
      style={{
        position: "relative",
        borderRadius: "16px",
        padding: "1.2px",
        background: "transparent",
        height: "92px",
        transformStyle: "preserve-3d",
        transition: "transform 0.12s ease",
        opacity:   visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(18px) scale(0.93)",
        animation: visible ? "card-pop 0.45s cubic-bezier(0.16,1,0.3,1) forwards" : "none",
        cursor: "pointer",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      {/* Spinning ring */}
      <div className="card-ring" style={{
        position: "absolute",
        inset: "-1.5px",
        borderRadius: "17px",
        background: `conic-gradient(from 0deg, transparent 0deg, ${partner.color} 60deg, transparent 120deg, transparent 360deg)`,
        animation: "ring-spin 2.5s linear infinite",
      }} />

      {/* Face */}
      <div
        ref={faceRef}
        className="card-face"
        style={{
          position: "absolute",
          inset: "1.2px",
          borderRadius: "14.5px",
          background: "linear-gradient(145deg, #ffffff, #f6f8ff)",
          border: "1px solid rgba(30,50,120,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px",
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(30,50,120,0.06), 0 1px 0 rgba(255,255,255,0.9) inset",
        }}
      >
        {/* Glow */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "14px",
          background: `radial-gradient(ellipse 90% 55% at 50% -10%, rgba(${rgb},0.18) 0%, transparent 70%)`,
          pointerEvents: "none",
        }} className="card-glow" />

        {/* Name */}
        <div
          className="card-name"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "12.5px",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            textAlign: "center",
            lineHeight: 1.35,
            position: "relative",
            zIndex: 2,
            userSelect: "none",
            color: partner.color,
          }}
        >
          {partner.logo ? (

 <img
  src={partner.logo}
  alt={partner.name}
  style={{
    width: partner.width || "90px",
    height: partner.height || "36px",

    objectFit: "contain",

    position: "relative",
    zIndex: 2,

    filter: "brightness(1)",

    transition: "all 0.3s ease",
  }}
/>

) : (

  <div
    className="card-name"
    style={{
      fontFamily: "'Syne', sans-serif",
      fontSize: "12.5px",
      fontWeight: 700,
      letterSpacing: "-0.01em",
      textAlign: "center",
      lineHeight: 1.35,
      position: "relative",
      zIndex: 2,
      userSelect: "none",
      color: partner.color,
    }}
  >
    {partner.name}
  </div>

)}
        </div>

        {/* Category label */}
        <div
          className="card-cat"
          style={{
            position: "absolute",
            bottom: "7px",
            left: "50%",
            transform: "translateX(-50%) translateY(4px)",
            fontSize: "8.5px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(17,24,39,0.35)",
            whiteSpace: "nowrap",
            zIndex: 2,
          }}
        >
          {partner.category}
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function TrustedAlliances() {
  const [active, setActive]   = useState("all");
  const [list, setList]       = useState(PARTNERS);
  const [gridKey, setGridKey] = useState(0);

 function filterPartners(id) {

  setActive(id);

  // OUR CLIENTS
  if (id === "ourClient") {

    setList(OUR_CLIENTS);

  }

  // ALL PARTNERS
  else if (id === "all") {

    setList(PARTNERS);


  }
  else if ( id=="Government"){
     setList(GOVERNMENT_CLIENTS);
  }

  // OTHER FILTERS
  else {

    setList(

      PARTNERS.filter((p) => {

        if (Array.isArray(p.category)) {

          return p.category.includes(id);

        }

        return p.category === id;
      })

    );

  }

  setGridKey((k) => k + 1);
}
  return (
    <>
      {/* Global styles injected once */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');

        * { box-sizing: border-box; }

        @keyframes orb-drift {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(40px,30px) scale(1.1); }
        }
        @keyframes scan-drift {
          0%   { top: -2px; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 0.35; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes blink {
          0%,100% { opacity:1; }
          50%      { opacity:0.3; }
        }
        @keyframes fade-up {
          from { opacity:0; transform: translateY(24px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes title-shine {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes card-pop {
          to { opacity:1; transform: translateY(0) scale(1); }
        }
        @keyframes ring-spin { to { transform: rotate(360deg); } }
        @keyframes ripple-grow { to { transform: scale(5); opacity: 0; } }
        @keyframes ptc-fly {
          to {
            transform: translate(var(--tx,0), var(--ty,0)) scale(0);
            opacity: 0;
          }
        }

        /* Ring hidden by default, shown on hover via CSS */
        .card-outer .card-ring {
          opacity: 0;
          transition: opacity 0.35s ease;
          animation-play-state: paused;
        }
        .card-outer:hover .card-ring {
          opacity: 1;
          animation-play-state: running;
        }

        /* Face border on hover */
        .card-outer:hover .card-face {
          border-color: rgba(30,50,120,0.13) !important;
        }

        /* Shimmer sweep */
        .card-face::before {
          content:'';
          position:absolute;
          top:0; left:-120%;
          width:55%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.85),transparent);
          transform:skewX(-18deg);
          transition:left 0s;
        }
        .card-outer:hover .card-face::before {
          transition:left 0.65s ease;
          left:160%;
        }

        /* Glow on hover */
        .card-glow { opacity:0; transition:opacity 0.4s ease; }
        .card-outer:hover .card-glow { opacity:1; }

        /* Name scale on hover */
        .card-name { transition:transform 0.3s cubic-bezier(0.16,1,0.3,1), text-shadow 0.35s ease; }
        .card-outer:hover .card-name { transform:scale(1.08) translateZ(4px); }

        /* Category reveal on hover */
        .card-cat { opacity:0; transition:opacity 0.25s, transform 0.3s; }
        .card-outer:hover .card-cat {
          opacity:1 !important;
          transform:translateX(-50%) translateY(0) !important;
        }

        /* Filter btn */
        .filter-btn::before {
          content:'';
          position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,0.5),transparent);
          opacity:0; transition:opacity 0.2s;
        }
        .filter-btn:hover::before { opacity:1; }
        .filter-btn:hover {
          border-color:rgba(59,108,240,0.3) !important;
          color:#111827 !important;
          background:rgba(59,108,240,0.06) !important;
          box-shadow:0 2px 8px rgba(59,108,240,0.1) !important;
        }

        /* Eyebrow dot blink */
        .eyebrow-dot { animation:blink 2.5s ease infinite; }

        /* Live dot */
        .live-dot { animation:blink 2s ease infinite; }

        /* Title shine */
        .title-gradient {
          background:linear-gradient(135deg,#1a2560 0%,#3b6cf0 45%,#1e3a8a 100%);
          background-size:200% 100%;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation:title-shine 6s ease infinite;
        }

        /* Scan line */
        .scan-line {
          position:absolute;
          left:0; right:0; height:2px;
          background:linear-gradient(90deg,transparent,rgba(59,108,240,0.22),transparent);
          animation:scan-drift 8s linear infinite;
          pointer-events:none; z-index:2;
        }

        /* Orbs */
        .orb { position:absolute; border-radius:50%; filter:blur(90px); animation:orb-drift 20s ease-in-out infinite alternate; }

        /* Grid shell top highlight */
        .grid-shell::before {
          content:'';
          position:absolute;
          top:0; left:15%; right:15%; height:1px;
          background:linear-gradient(90deg,transparent,rgba(59,108,240,0.35),transparent);
        }

        @media (max-width:600px) {
          .logo-grid { grid-template-columns:repeat(auto-fill,minmax(105px,1fr)) !important; gap:8px !important; }
          .main-section { padding:36px 16px 60px !important; }
        }
      `}</style>

      {/* Wrapper */}
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#eef1fb",
        color: "#111827",
        minHeight: "100vh",
        overflowX: "hidden",
        position: "relative",
      }}>

        {/* ── BACKGROUND CANVAS ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
          {/* Base gradient */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(160deg, #e8eeff 0%, #f3f0ff 40%, #eaf5ff 100%)",
          }} />

          {/* Orbs */}
          <div className="orb" style={{ width:640,height:640,top:-200,left:-160,background:"radial-gradient(circle,rgba(100,140,255,0.22) 0%,transparent 70%)",animationDuration:"22s" }} />
          <div className="orb" style={{ width:520,height:520,bottom:-160,right:-120,background:"radial-gradient(circle,rgba(140,100,240,0.18) 0%,transparent 70%)",animationDuration:"18s",animationDelay:"-7s" }} />
          <div className="orb" style={{ width:320,height:320,top:"38%",left:"52%",background:"radial-gradient(circle,rgba(60,180,255,0.14) 0%,transparent 70%)",animationDuration:"15s",animationDelay:"-4s" }} />
          <div className="orb" style={{ width:260,height:260,top:"20%",right:"15%",background:"radial-gradient(circle,rgba(255,180,80,0.1) 0%,transparent 70%)",animationDuration:"25s",animationDelay:"-10s" }} />

          {/* Dot grid */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(rgba(30,50,120,0.1) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse 100% 100% at 50% 0%, black 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 100% 100% at 50% 0%, black 30%, transparent 80%)",
          }} />

          {/* Scan line */}
          {/* <div className="scan-line" /> */}
        </div>

        {/* ── MAIN ── */}
        <div className="main-section" style={{
          position: "relative", zIndex: 1,
          maxWidth: 1300, margin: "0 auto",
          padding: "56px 32px 80px",
        }}>

          {/* ── HEADER ── */}
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            {/* Eyebrow */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 11, fontWeight: 500, letterSpacing: "0.22em",
              textTransform: "uppercase", color: "#3b6cf0",
              padding: "6px 16px",
              border: "1px solid rgba(59,108,240,0.22)",
              borderRadius: 100,
              background: "rgba(59,108,240,0.07)",
              marginBottom: 22,
              animation: "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
            }}>
              <div className="eyebrow-dot" style={{ width:5, height:5, background:"#3b6cf0", borderRadius:"50%" }} />
              Technology Ecosystem
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: "clamp(38px,5.5vw,48px)", letterSpacing: "0.2em", lineHeight: 1.2,
              animation: "fade-up 0.7s 0.08s cubic-bezier(0.16,1,0.3,1) both",
              margin: 0,
            }}>
              <span className="title-gradient">Our Trusted Alliances</span>
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: 16, color: "rgba(17,24,39,0.46)", marginTop: 12,
              fontWeight: 300, letterSpacing: "0.02em",
              animation: "fade-up 0.7s 0.15s cubic-bezier(0.16,1,0.3,1) both",
            }}>
              Our Partners, Your Advantage
            </p>
          </div>

          {/* ── FILTER ROW ── */}
          <div style={{ display:"flex", alignItems:"flex-start", gap:8, flexWrap:"wrap", marginBottom:28 }}>
            {/* Filter buttons */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, animation:"fade-up 0.7s 0.22s cubic-bezier(0.16,1,0.3,1) both" }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  className="filter-btn"
                  onClick={() => filterPartners(cat.id)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "8px 18px", borderRadius: 100,
                    fontSize: 13, fontWeight: 500,
                    fontFamily: "'DM Sans', sans-serif",
                    cursor: "pointer",
                    border: cat.id === active ? "1px solid transparent" : "1px solid rgba(30,50,120,0.09)",
                    background: cat.id === active ? "#3b6cf0" : "rgba(255,255,255,0.7)",
                    color: cat.id === active ? "#fff" : "rgba(17,24,39,0.46)",
                    transition: "all 0.2s ease",
                    backdropFilter: "blur(12px)",
                    position: "relative", overflow: "hidden",
                    boxShadow: cat.id === active
                      ? "0 0 20px rgba(59,108,240,0.4), 0 4px 12px rgba(59,108,240,0.25)"
                      : "0 1px 3px rgba(30,50,120,0.06)",
                    outline: "none",
                  }}
                >
                  {cat.icon && <i className={`fas ${cat.icon}`} style={{ fontSize: 11, opacity: 0.8 }} />}
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Partner count */}
            <div style={{
              fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 600,
              color: "rgba(17,24,39,0.46)",
              marginLeft: "auto", alignSelf: "center",
              padding: "4px 12px",
              border: "1px solid rgba(30,50,120,0.09)",
              borderRadius: 100,
              background: "rgba(255,255,255,0.7)",
              animation: "fade-up 0.7s 0.22s cubic-bezier(0.16,1,0.3,1) both",
              boxShadow: "0 1px 3px rgba(30,50,120,0.06)",
            }}>
              {list.length} Partner{list.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* ── GRID SHELL ── */}
          <div className="grid-shell" style={{
            background: "rgba(255,255,255,0.55)",
            border: "1px solid rgba(30,50,120,0.08)",
            borderRadius: 28,
            padding: 24,
            backdropFilter: "blur(28px)",
            animation: "fade-up 0.7s 0.3s cubic-bezier(0.16,1,0.3,1) both",
            position: "relative", overflow: "hidden",
            boxShadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 4px 24px rgba(30,50,120,0.06), 0 1px 3px rgba(30,50,120,0.04)",
          }}>
            <div className="logo-grid" key={gridKey} style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(130px,1fr))",
              gap: 11,
            }}>
              {list.map((partner, i) => (
                <PartnerCard key={`${partner.name}-${gridKey}`} partner={partner} index={i} />
              ))}
            </div>
          </div>

          {/* ── FOOTER ── */}
          <div style={{
            display: "flex", justifyContent: "center", marginTop: 28,
            animation: "fade-up 0.7s 0.5s cubic-bezier(0.16,1,0.3,1) both",
          }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              fontSize: 12, color: "rgba(17,24,39,0.46)",
              padding: "8px 20px", borderRadius: 100,
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(30,50,120,0.09)",
              boxShadow: "0 1px 4px rgba(30,50,120,0.07)",
            }}>
              <div className="live-dot" style={{ width:6, height:6, background:"#22c55e", borderRadius:"50%", flexShrink:0 }} />
              <span>142 Partners &nbsp;·&nbsp; Updated January 2025</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
