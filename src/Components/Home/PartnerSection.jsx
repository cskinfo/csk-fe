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
import dynamicEngineers from "../../assets/clients/dynamicEngineers.png";
import savex from "../../assets/clients/savex.png";
import acer from "../../assets/partners/acer.png";
import welcomhotel from "../../assets/clients/welcomhotell.png";

const ROW1 = [
  { name: "Cisco",     logo: cisco,      w: 90,  h: 30 },
  { name: "AWS",       logo: aws,        w: 55,  h: 33 },
  { name: "Microsoft", logo: microsoft,  w: 120, h: 34 },
  { name: "Dell",      logo: dell,       w: 90,  h: 30 },
  { name: "Samsung",   logo: samsung,    w: 100, h: 24 },
  { name: "NetApp",    logo: netapp,     w: 110, h: 38 },
  { name: "HP",        logo: hp,         w: 44,  h: 44 },
  { name: "Acer",      logo: acer,       w: 95,  h: 34 },
];

const ROW2 = [
  { name: "Hitachi",   logo: hitachi,    w: 100, h: 34 },
  { name: "Oracle",    logo: oracle,     w: 100, h: 34 },
  { name: "HCL",       logo: hcl,        w: 80,  h: 24 },
  { name: "AU Bank",   logo: AU,         w: 100, h: 34 },
  { name: "Lenovo",    logo: Lenovo,     w: 100, h: 34 },
  { name: "SUSE",      logo: suse,       w: 95,  h: 32 },
  { name: "Juniper",   logo: juniperr,   w: 90,  h: 28 },
  { name: "Barracuda", logo: barracuda,  w: 100, h: 34 },
];

const ROW3 = [
  { name: "Trend Micro",  logo: trendmicrologo,   w: 115, h: 34 },
  { name: "Fortinet",     logo: Fortinet,         w: 110, h: 34 },
  { name: "PeopleLink",   logo: PeopleLinkLogo,   w: 110, h: 34 },
  { name: "Panasonic",    logo: panasoniclogo,    w: 120, h: 34 },
  { name: "Commvault",    logo: commvault,        w: 100, h: 26 },
  { name: "Dynamic Eng.", logo: dynamicEngineers, w: 95,  h: 32 },
  { name: "Savex",        logo: savex,            w: 80,  h: 26 },
  { name: "WelcomHotel",  logo: welcomhotel,      w: 115, h: 38 },
];

const css = `
  .pe-section {
    background: linear-gradient(135deg,
      #d8e2f0 0%,
      #e2d8ee 18%,
      #edddf4 32%,
      #e6ecf8 48%,
      #d8e8f4 62%,
      #e0d8ee 78%,
      #d8e2f0 100%
    );
    padding: 48px 0 56px;
    overflow: hidden;
    font-family: 'Inter', 'Segoe UI', sans-serif;
    width: 100%;
    box-sizing: border-box;
  }

  .pe-header {
    text-align: center;
    margin-bottom: 36px;
    padding: 0 16px;
  }

  .pe-header h2 {
    font-size: clamp(1.5rem, 6vw, 3.2rem);
    font-weight: 800;
    color: #1a1a2e;
    margin: 0 0 8px 0;
    letter-spacing: -0.3px;
    line-height: 1.2;
  }

  .pe-header p {
    font-size: clamp(0.65rem, 2.5vw, 0.95rem);
    color: #4a4a6a;
    margin: 0;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 400;
  }

  .pe-rows {
    display: flex;
    flex-direction: column;
    gap: clamp(24px, 4vw, 44px);
  }

  .pe-row {
    overflow: hidden;
    position: relative;
    padding: 6px 0;
  }

  .pe-row::before,
  .pe-row::after {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    width: clamp(40px, 8vw, 140px);
    z-index: 2;
    pointer-events: none;
  }
  .pe-row::before {
    left: 0;
    background: linear-gradient(to right, #d8e2f0, transparent);
  }
  .pe-row::after {
    right: 0;
    background: linear-gradient(to left, #d8e2f0, transparent);
  }

  .pe-track {
    display: flex;
    align-items: center;
    gap: clamp(32px, 5vw, 80px);
    width: max-content;
    will-change: transform;
  }

  .pe-track--ltr  { animation: peLeft  32s linear infinite; }
  .pe-track--rtl  { animation: peRight 36s linear infinite; }
  .pe-track--ltr2 { animation: peLeft  28s linear infinite; }

  @keyframes peLeft  { from { transform: translateX(0);    } to { transform: translateX(-50%); } }
  @keyframes peRight { from { transform: translateX(-50%); } to { transform: translateX(0);    } }

  .pe-row:hover .pe-track,
  .pe-row:active .pe-track {
    animation-play-state: paused;
  }

  .pe-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .pe-logo img {
    display: block;
    object-fit: contain;
    /* scale logos down on mobile using CSS scale */
    transform-origin: center;
    filter: grayscale(100%) brightness(0.4) contrast(1.15);
    transition: filter 0.35s ease, transform 0.25s ease;
  }

  .pe-logo:hover img,
  .pe-logo:active img {
    filter: grayscale(0%) brightness(1) contrast(1);
    transform: scale(1.08);
  }

  /* Mobile: shrink all logos proportionally */
  @media (max-width: 480px) {
    .pe-logo img {
      transform: scale(0.72);
    }
    .pe-logo:hover img,
    .pe-logo:active img {
      transform: scale(0.78);
    }
    .pe-track {
      gap: 20px;
    }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    .pe-logo img {
      transform: scale(0.85);
    }
    .pe-track {
      gap: 36px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pe-track { animation: none !important; }
  }
`;

function MarqueeRow({ items, direction }) {
  const doubled = [...items, ...items];
  return (
    <div className="pe-row">
      <div className={`pe-track pe-track--${direction}`}>
        {doubled.map((p, i) => (
          <div
            key={`${p.name}-${i}`}
            className="pe-logo"
            style={{ width: p.w, height: p.h }}
          >
            <img
              src={p.logo}
              alt={p.name}
              style={{ width: p.w, height: p.h }}
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Partners() {
  return (
    <>
      <style>{css}</style>
      <section className="pe-section">
        <div className="pe-header">
          <h2>Our Partner Ecosystem</h2>
          <p>United by Technology</p>
        </div>
        <div className="pe-rows">
          <MarqueeRow items={ROW1} direction="ltr"  />
          <MarqueeRow items={ROW2} direction="rtl"  />
          <MarqueeRow items={ROW3} direction="ltr2" />
        </div>
      </section>
    </>
  );
}