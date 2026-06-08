import { useEffect, useRef, useState } from "react";
import "./StickyScroll.css";

import ImageOne from "../../assets/ScrollSection/ImageFirst.jpeg";
import ImageTwo from "../../assets/ScrollSection/ImageFourth.png";
import ImageThree from "../../assets/ScrollSection/ImageThird.jpeg";

const Sections = [

  {
    title: `Driving Digital Transformation with
Innovation & Reliability`,

    description:
      `CSK Information Technology Private Limited is a fast-growing enterprise IT company delivering innovative infrastructure.`,

    points: [
      "Expert Offshore Development Teams",
      "Agile & Transparent Methodologies",
      "Next-Gen Technology Adoption",
    ],

    button: "Read More",

    image: ImageOne,

    tag: "OUR COMPANY",
  },

  {
    title: `Smart Enterprise Solutions for a
Connected Future`,

    description:
      `We provide comprehensive technology solutions that simplify operations, strengthen security, improve collaboration, and enhance business performance. Our expertise spans cloud infrastructure, networking, data centers, cybersecurity, AV systems, and enterprise integration services tailored for modern organizations.`,

    points: [],

    button: "Read More",

    image: ImageTwo,

    tag: "SOLUTIONS SECTION",
  },

  {
    title: `Building Secure & Scalable
Technology Ecosystems`,

    description:
      `From enterprise networking to managed IT support, CSK empowers organizations with reliable digital infrastructure and future-ready technology services that drive innovation, productivity, and long-term growth.`,

    points: [],

    button: "Read More",

    image: ImageThree,

    tag: "WHY CHOOSE US",
  },
];

export default function StickyScroll() {

  const [activeCard, setActiveCard] = useState(0);

  const blockRefs = useRef([]);

  /* =========================
     SCROLL DETECTION
  ========================= */

  useEffect(() => {

    const handleScroll = () => {

      let current = 0;

      blockRefs.current.forEach((section, index) => {

        if (!section) return;

        const rect = section.getBoundingClientRect();

        if (rect.top <= 250) {
          current = index;
        }
      });

      setActiveCard(current);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);

  }, []);

  return (

    <section className="sticky-scroll-wrapper">

      <div className="sticky-scroll-section">

        {/* =========================
            LEFT SIDE
        ========================= */}

        <div className="sticky-scroll__left">

          {Sections.map((card, index) => (

            <div
              key={index}
              ref={(el) => (blockRefs.current[index] = el)}
              className="sticky-scroll__text-block"
            >

              <span className="sticky-scroll__tag">
                {card.tag}
              </span>

              <h2>
                {card.title}
              </h2>

              <p>
                {card.description}
              </p>

              {card.points.length > 0 && (

                <div className="sticky-scroll__points">

                  {card.points.map((point, i) => (

                    <div
                      key={i}
                      className="sticky-scroll__point"
                    >

                      <div className="sticky-scroll__point-dot"></div>

                      <span>{point}</span>

                    </div>

                  ))}

                </div>
              )}

              <button className="sticky-scroll__btn2">

                {card.button}

                <span>→</span>

              </button>

            </div>
          ))}
        </div>

        {/* =========================
            RIGHT SIDE
        ========================= */}

        <div className="sticky-scroll__right">

          <div className="sticky-scroll__stack">

            {Sections.map((card, index) => {

              let className =
                "sticky-scroll__card--hidden";

              /* =========================
                 ACTIVE CARD
              ========================= */

              if (index === activeCard) {

                className =
                  "sticky-scroll__card--full";
              }

              /* =========================
                 FIRST SCREEN
                 IMAGE + 2 BOTTOM STACKS
              ========================= */

              if (activeCard === 0) {

                if (index === 1) {

                  className =
                    "sticky-scroll__card--stacked-bottom-1";
                }

                if (index === 2) {

                  className =
                    "sticky-scroll__card--stacked-bottom-2";
                }
              }

              /* =========================
                 SECOND SCREEN
                 1 TOP STACK
                 IMAGE
                 1 BOTTOM STACK
              ========================= */

              if (activeCard === 1) {

                if (index === 0) {

                  className =
                    "sticky-scroll__card--stacked-top-1";
                }

                if (index === 2) {

                  className =
                    "sticky-scroll__card--stacked-bottom-1";
                }
              }

              /* =========================
                 THIRD SCREEN
                 2 TOP STACKS
                 IMAGE
              ========================= */

              if (activeCard === 2) {

                if (index === 1) {

                  className =
                    "sticky-scroll__card--stacked-top-1";
                }

                if (index === 0) {

                  className =
                    "sticky-scroll__card--stacked-top-2";
                }
              }

              return (

                <div
                  key={index}
                  className={`sticky-scroll__card ${className}`}
                >

                  <img
                    src={card.image}
                    alt=""
                  />

                </div>
              );
            })}

          </div>

        </div>

      </div>

    </section>
  );
}