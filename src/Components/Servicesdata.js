// ─── CSK Services Data ───────────────────────────────────────────────────────
// One source of truth for all 7 service pages.
// ServiceDetail.jsx reads this file and renders the correct page by slug.


import infraHero from "../assets/ServicePagePhoto/infra-hero.jpg";
import itOutsourcingHero from "../assets/ServicePagePhoto/it-outsourcing-hero.jpg";
import breakfixhero from "../assets/ServicePagePhoto/break-fix-hero.jpg";
import systemIntegrationHero from "../assets/ServicePagePhoto/systemintegrationphoto.jpg";
import avHero from "../assets/ServicePagePhoto/AbSolutionHeroSection.jpg";
import AbSolutionSecondSection from "../assets/ServicePagePhoto/AbSolutionSecondSection.jpg";
// import trainingHero from "../assets/ServicePagePhoto/training-hero.jpg";
import corporateTraning from "../assets/ServicePagePhoto/corporateTraning.jpg";
import ArVRHeroImage from "../assets/ServicePagePhoto/ArVRHeroImagesss.jpg";

import ArVrSecondSection from "../assets/ServicePagePhoto/ArVrSecondSections.jpg";
import ArVrSectionThird from "../assets/ServicePagePhoto/ArVrSectionThird.jpg";



// sectioni images
import networkManagementImg from "../assets/ServicePagePhoto/network-management.jpg";

import datacenterillustration from "../assets/ServicePagePhoto/data-center-illustration.jpg";
import hardwarerepair from "../assets/ServicePagePhoto/hardwarerepair.png";

import systemintegrationsectiontwophoto from "../assets/ServicePagePhoto/systemintegrationsectiontwophoto.jpg";
corporateTrainingSecond
import corporateTrainingSecond from "../assets/ServicePagePhoto/CorporateTraingSecond.jpg";

import AvSolutionSecond from "../assets/ServicePagePhoto/AvSolutionSecond.jpg";


import CorporateTraingSecond from "../assets/ServicePagePhoto/CorporateTraingSecond.jpg";


export const SERVICES_DATA = {

  /* ── 01. INFRA MANAGED ─────────────────────────────────────────────────── */
  "infra-managed": {
    slug: "infra-managed",
    label: "Infra Managed",
    heroTitle: "Infra managed",
    heroTitleColor: "#FFFFFF",
    heroSubtitle:
      "At CSK, we offer comprehensive Infrastructure Managed Services designed to streamline and optimize your IT operations. Our team of experts takes care of all aspects of your IT infrastructure, allowing you to focus on your core business activities. From network management to cloud services, we ensure your systems are secure, reliable, and efficient. Explore the range of services we provide to keep your infrastructure running smoothly.",
    heroCta: "Explore What We Deliver",
    heroBg: infraHero,   // swap with real asset path

    weBelieve: {
      quote: "Trust us to be your partner in managing and optimizing your IT infrastructure, so you can focus on what you do best –",
      highlight: "growing your business.",
    },

    sections: [
      {
        id: "s01",
        type: "imageLeft",            // image on right, text on left
        label: "SECTION 01",
        title: "Network Management",
        intro: "Efficient network management is crucial for seamless business operations. Our services include:",
        bullets: [
          { term: "Monitoring and Maintenance:", detail: "Continuous monitoring of your network to detect and resolve issues proactively." },
          { term: "Configuration Management:", detail: "Ensuring your network devices are correctly configured and up-to-date." },
          { term: "Security:", detail: "Implementing robust security measures to protect your network from threats and unauthorized access." },
          { term: "Performance Optimization:", detail: "Analyzing and optimizing network performance to ensure high-speed connectivity and minimal downtime." },
        ],
        image: networkManagementImg,
        imageBg: "#0B1B4D",
      },
      {
        id: "s02",
        type: "cardGrid",
        label: "SECTION 02",
        title: "Strategic IT Planning",
        intro: "Align your IT infrastructure with your business goals through strategic planning:",
        cards: [
          { icon: "chart", title: "IT Assessment", desc: "Evaluating your current IT infrastructure to identify strengths, weaknesses, and opportunities." },
          { icon: "roadmap", title: "Technology Roadmap", desc: "Developing a comprehensive technology roadmap to guide your IT investments and initiatives." },
          { icon: "dollar", title: "Budgeting & Forecasting", desc: "Assisting with IT budgeting and forecasting to ensure cost-effective management." },
          { icon: "vendor", title: "Vendor Management", desc: "Managing relationships with technology vendors to ensure you receive the best value and service." },
        ],
      },
      {
        id: "s03",
        type: "diagramLeft",
        label: "SECTION 03",
        title: "Server Management",
        intro: "Our server management services ensure your servers are always operational and performing at their best:",
        bullets: [
          { term: "Installation and Configuration:", detail: "Setting up servers according to your specific needs and industry best practices." },
          { term: "Monitoring:", detail: "Continuous monitoring to identify and resolve potential issues before they impact your business." },
          { term: "Patch Management:", detail: "Regularly updating server software to protect against vulnerabilities and improve performance." },
          { term: "Backup and Recovery:", detail: "Implementing robust backup solutions and disaster recovery plans to safeguard your data." },
        ],
        // The server management diagram shown in Figma (critical/non-critical device boxes)
        diagramType: "serverDiagram",
      },
      {
        id: "s04",
        type: "cardGridStats",
        label: "SECTION 04",
        title: "Data Center Management",
        intro: "Ensure the optimal operation of your data center with our management services:",
        cards: [
          { icon: "facility", title: "Facility Management", desc: "Managing the physical infrastructure of your data center, including power, cooling, and security." },
          { icon: "server", title: "Server Management", desc: "Overseeing the installation, maintenance, and optimization of data center servers." },
          { icon: "network", title: "Network Management", desc: "Ensuring reliable and high-performance network connectivity within your data center." },
          { icon: "disaster", title: "Disaster Recovery", desc: "Developing and implementing disaster recovery plans to ensure business continuity." },
        ],
        stats: [
          { value: "66",    label: "SUPPORT LOCATIONS" },
          { value: "230",   label: "FIELD ENGINEERS" },
          { value: "3,408", label: "SAME-DAY POSTCODES" },
          { value: "99",    label: "% UPTIME TARGET" },
        ],
      },
    ],
  },

  /* ── 02. IT OUTSOURCING ────────────────────────────────────────────────── */
  "it-outsourcing": {
    slug: "it-outsourcing",
    label: "IT Outsourcing",
    heroTitle: "IT Outsourcing",
    heroTitleColor: "#FFFFFF",
    heroSubtitle:
      "Our comprehensive IT outsourcing services provide end-to-end solutions for all your technology needs. From infrastructure management to application development, we ensure your systems are optimized for performance and efficiency. Partner with us to leverage our expertise and focus on your core business while we take care of your IT.",
    heroCta: "Explore What We Deliver",
    heroBg: itOutsourcingHero,

    weBelieve: {
      quote: "Technology Should Accelerate Growth, Not Create Complexity",
      highlight: "",
      body: "At CSK, we believe IT outsourcing is more than support services — it is a strategic partnership that empowers businesses to innovate faster, operate smarter, and achieve sustainable growth through reliable technology management.",
    },

    sections: [
      {
        id: "s01",
        type: "imageRight",
        label: "SECTION 01",
        title: "Powering Modern Enterprises with Intelligent Data Centers",
        intro:
          "Today's businesses rely on data availability, performance, and security. CSK Information Technology provides comprehensive data center infrastructure solutions that support mission-critical workloads while reducing operational risks and improving efficiency.\n\nWhether you're building a new facility, upgrading an existing environment, or expanding capacity, our experts ensure seamless planning, deployment, and management.",
        bullets: [
          { term: "", detail: "High-Availability Infrastructure" },
          { term: "", detail: "Optimized Power Utilization" },
          { term: "", detail: "Scalable Architecture" },
          { term: "", detail: "Enhanced Security" },
          { term: "", detail: "Reduced Downtime" },
          { term: "", detail: "Business Continuity Support" },
        ],
        image: datacenterillustration,
        imageBg: "#FFF3E0",
      },
      {
        id: "s02",
        type: "cardGrid",
        label: "SECTION 02",
        title: "Cloud & Infrastructure Management",
        intro:
          "Leverage the power of modern cloud platforms and enterprise infrastructure without the burden of in-house management. We handle cloud deployment, optimization, migration, server management, backup strategies, and infrastructure monitoring to ensure scalability, flexibility, and operational efficiency.",
        cards: [
          { icon: "cloud", title: "Cloud Deployment & Migration", desc: "Seamless migration to AWS, Azure, Google Cloud, or Oracle Cloud with minimal downtime and full security compliance." },
          { icon: "optimize", title: "Infrastructure Optimization", desc: "Continuous performance tuning, cost optimization, and capacity planning to maximize cloud ROI." },
          { icon: "storage", title: "Server & Storage Management", desc: "End-to-end management of physical and virtual servers, storage systems, and backup infrastructure." },
        ],
      },
      {
        id: "s03",
        type: "diagramRight",
        label: "SECTION 03",
        title: "Ready to Take Control of Your IT !!",
        intro:
          "Our team of skilled IT professionals acts as an extension of your in-house team, managing your critical infrastructure, applications, and ongoing IT needs. This allows your internal IT staff to focus on core competencies and strategic projects, ultimately driving business growth. By outsourcing your IT, you gain access to a wider range of expertise than you could maintain in-house, ensuring your technology is always optimized and secure.",
        diagramType: "managedServicesDiagram",
      },
      {
        id: "s04",
        type: "cardGridStats",
        label: "SECTION 04",
        title: "Data Center Management",
        intro: "Ensure the optimal operation of your data center with our management services:",
        cards: [
          { icon: "facility", title: "Facility Management", desc: "Managing the physical infrastructure of your data center, including power, cooling, and security." },
          { icon: "server",   title: "Server Management",  desc: "Overseeing the installation, maintenance, and optimization of data center servers." },
          { icon: "network",  title: "Network Management", desc: "Ensuring reliable and high-performance network connectivity within your data center." },
          { icon: "disaster", title: "Disaster Recovery",  desc: "Developing and implementing disaster recovery plans to ensure business continuity." },
        ],
        stats: [
          { value: "66",    label: "SUPPORT LOCATIONS" },
          { value: "230",   label: "FIELD ENGINEERS" },
          { value: "3,408", label: "SAME-DAY POSTCODES" },
          { value: "99",    label: "% UPTIME TARGET" },
        ],
      },
    ],
  },

  /* ── 03. BREAK FIX ─────────────────────────────────────────────────────── */
  "break-fix": {
    slug: "break-fix",
    label: "Break Fix",
    heroTitle: "Break Fix Services",
    heroTitleColor: "#FFFFFF",
    heroSubtitle:
      "At CSK, we understand that unexpected system issues can disrupt your business operations. Our Break-Fix Services are designed to provide immediate, expert assistance to diagnose and resolve technical problems as they arise. Whether it's a hardware malfunction, software glitch, or network issue, our experienced technicians are equipped to restore your systems quickly and efficiently."   ,
    heroCta: "Explore What We Deliver",
    heroBg: breakfixhero,

    weBelieve: {
      quote: " Take Your Idea to the Next Level",
      highlight: "",
      body: "Choose CSK for comprehensive Break-Fix Services that ensure your technology remains operational and your business continues to run smoothly. We are your trusted partner for reliable, efficient, and effective technical support.",
    },

    sections: [
      {
        id: "s01",
        type: "imageRight",
        label: "SECTION 01",
        title: "Hardware Break-Fix Support",
        intro: "From servers to end-user devices, our hardware break-fix service covers:",
        bullets: [
          { term: "On-site Repair:", detail: "Certified technicians dispatched to your location for physical hardware repairs." },
          { term: "Parts Replacement:", detail: "Access to a wide inventory of spare parts for quick replacements." },
          { term: "Warranty Management:", detail: "Handling warranty claims with OEMs on your behalf." },
          { term: "Asset Tracking:", detail: "Maintaining an updated inventory of all repaired assets." },
        ],
        image: hardwarerepair,
        imageBg: "#9370db",
      },
       {
        id: "s02", type: "cardGrid", label: "SECTION 02",
        title: "Preventive Measures & Network Troubleshooting",
        intro: "While our primary focus is on resolving immediate issues, we also implement preventive measures to reduce the likelihood of future problems and keep your network stable, secure, and optimized.",
        cards: [
          { icon: "chart",  title: "Preventive Maintenance",   desc: "Recommendations and necessary updates performed to enhance the reliability and performance of your systems." },
          { icon: "wifi",   title: "Network Troubleshooting",  desc: "Skilled diagnosis and resolution of network problems, from connectivity issues to configuration errors." },
          { icon: "shield", title: "Stable & Secure Networks", desc: "We ensure your network is stable, secure, and optimized for peak performance and reliability." },
        ],
      },
          {
        id: "s03", type: "diagramLeft", label: "SECTION 03",
        title: "Expert Diagnosis & Support",
        intro: "Accurate diagnosis is crucial for effective problem resolution. Our experienced technicians employ advanced diagnostic tools and methodologies to identify the root cause of your technical issues — addressing the underlying problem, not just the symptoms, to provide a long-lasting solution.",
        bullets: [
          { term: "Expert Diagnosis:", detail: "Advanced diagnostic tools and methodologies to pinpoint the root cause of every technical issue." },
          { term: "On-Site Support:",  detail: "For complex issues, our technicians provide on-site service to ensure comprehensive repair." },
          { term: "Remote Support:",   detail: "For issues that can be resolved remotely, technicians quickly connect to diagnose and fix problems." },
          { term: "Rapid Response:",   detail: "Built on the principle of speed — ready to act during business hours or in an emergency to minimize downtime." },
        ],
        diagramType: "diagnosticsDashboard",
      },
     
      /* Section 04 — 4 benefit cards, NO stats row */
      {
        id: "s04", type: "cardGrid", label: "SECTION 04",
        title: "Why Choose CSK Break-Fix",
        intro: "Break-Fix support that keeps your technology operational and your business running smoothly:",
        cards: [
          { icon: "zap",    title: "Immediate Assistance", desc: "Expert help the moment technical problems arise to keep disruption to a minimum." },
          { icon: "switch", title: "On-Site & Remote",     desc: "Flexible support delivered both remotely and on-site to match the issue's complexity." },
          { icon: "clock",  title: "Minimal Downtime",     desc: "Fast, effective resolution that gets your business back on track with little disruption." },
          { icon: "shield", title: "Trusted Partner",      desc: "Reliable, responsive, and effective break-fix solutions you can count on every time." },
        ],
      },
    ],
  },

/* ── 04. SYSTEM INTEGRATION ────────────────────────────────────────────────── */
"system-integration": {
  slug: "system-integration",
  label: "System Integration",
  heroTitle: "System Integration",
  heroTitleColor: "#FFFFFF",
  heroSubtitle:
    "At CSK, we specialize in seamlessly integrating diverse systems to create a cohesive, efficient, and robust IT environment. Our comprehensive system integration services ensure that your business operations are optimized, data flows smoothly, and all components work harmoniously. Let us help you transform your IT environment and take your business to the next level.",
  heroCta: "Explore What We Deliver",
  heroBg: systemIntegrationHero,

  weBelieve: {
    quote: "Unifying Systems Enhancing Efficiency: Seamless Integration…",
    highlight: "For A Connected Future.",
    body: "",
  },

  sections: [
    {
      id: "s01",
      type: "imageRight",
      label: "SECTION 01",
      title: "Interfacing & Communication",
      intro:
        "We establish reliable protocols and standards to enable effective communication between different systems. Whether it's through SOAP (Simple Object Access Protocol), REST (Representational State Transfer), or message queuing systems like RabbitMQ and Kafka, we ensure seamless data exchange and interaction, enabling your systems to work together flawlessly.\n\nMiddleware Solutions",
      bullets: [
        { term: "Message-Oriented Middleware (MOM):", detail: "Ensure reliable message passing between systems, with solutions like IBM MQ." },
        { term: "Database Middleware:", detail: "Manages connections and transactions across different database management systems (DBMS) using platforms like Oracle Fusion Middleware." },
        { term: "Application Servers:", detail: "Provide an environment for running and managing applications efficiently, with servers such as WebSphere and JBoss." },
      ],
      image: systemintegrationsectiontwophoto,
      imageBg: "#0B1B4D",
    },
   {
  id: "s02",
  type: "cardGrid",
  label: "OUR OFFERING",
  title: "A Complete System Integration Toolkit",
  intro: "",
  cards: [
    {
      icon: "database",
      title: "Data Integration",
      desc: "Unify data from multiple sources through ETL pipelines, data warehouses, and data lakes for better accessibility and insights.",
    },
    {
      icon: "wrench",
      title: "Maintenance & Support",
      desc: "Continuous monitoring, software updates, and technical assistance to ensure reliable system performance.",
    },
    {
      icon: "shield",
      title: "Security & Compliance",
      desc: "Protect systems with encryption, access control, and compliance with industry standards and regulations.",
    },
    {
      icon: "testing",
      title: "Testing & Validation",
      desc: "Comprehensive testing to ensure system reliability, seamless integration, and user satisfaction.",
    },
  ],
},

    {
      id: "s03",
      type: "diagramRight",
      label: "NETWORKING INTEGRATION",
      title: "Networking Integration",
      intro:
        "Our network integration services ensure that all networking components support seamless system communication. This includes:",
      bullets: [
        { term: "LAN/WAN Configuration:", detail: "Setting up local and wide area networks to facilitate data flow." },
        { term: "VPNs (Virtual Private Networks):", detail: "Securely connecting remote systems." },
        { term: "Firewalls and Security Protocols:", detail: "Implementing measures to protect data and systems from unauthorized access." },
      ],
      diagramType: "systemsIntegrationDiagram",
    },
  ],
},

  /* ── 05. AV SOLUTIONS ──────────────────────────────────────────────────── */
  "av-solutions": {
    slug: "av-solutions",
    label: "AV Solutions",
    heroTitle: "AV Solutions",
    heroTitleColor: "#FFFFFF",
    heroSubtitle:
      "Comprehensive audio-visual solutions covering design, installation, maintenance, and support. Custom AV systems for presentations, conferences, boardrooms, smart classrooms, and events. Crafting Experience, Engineering Excellence.",
    heroCta: "Explore What We Deliver",
    heroBg: avHero,

    weBelieve: {
      quote: "Crafting Experience, Engineering Excellence.",
      highlight: "",
      body: "Great AV is invisible — it just works. Our team designs and installs systems that feel effortless, letting your people focus on communication, collaboration, and creativity.",
    },

    sections: [
     {
  id: "s01",

  type: "imageRight",

  label: "SECTION 01",

  title: "AV Solutions & Support Services",

  intro:
    "Keep your audio-visual systems performing at their best with comprehensive maintenance, support, and enhancement services:",

  bullets: [

    {
      term: "System Maintenance:",
      detail:
        "Regular inspections, performance checks, and preventive maintenance to ensure reliable AV operations."
    },

    {
      term: "Technical Support:",
      detail:
        "Rapid troubleshooting and on-site assistance to minimize downtime and resolve issues efficiently."
    },

    {
      term: "Home Theater Solutions:",
      detail:
        "Custom-designed entertainment systems delivering immersive audio and stunning visual experiences."
    },

    {
      term: "Performance Optimization:",
      detail:
        "System tuning, upgrades, and proactive monitoring to extend equipment life and maximize performance."
    },

  ],

  image: AvSolutionSecond,

  imageBg: "#EEF3FF",
},
      {
        id: "s02",
        type: "cardGrid",
        label: "SECTION 02",
        title: "Digital Signage & Displays",
        intro: "Communicate your message powerfully with dynamic digital displays:",
        cards: [
          { icon: "display",  title: "Content Management",    desc: "Cloud-based CMS to schedule, manage, and update content across all your screens." },
          { icon: "monitor",  title: "Video Walls",           desc: "Multi-panel video wall installations for lobbies, control rooms, and events." },
          { icon: "outdoor",  title: "Outdoor Displays",      desc: "Weather-resistant outdoor digital signage for public-facing communications." },
          { icon: "wayfind",  title: "Wayfinding Systems",    desc: "Interactive directory and wayfinding displays for large facilities." },
        ],
      },
      {
        id: "s03",
        type: "imageRight",
        label: "SECTION 03",
        title: "Home Theater & Smart Spaces",
        intro: "Bring cinema-quality entertainment to residential and hospitality spaces:",
        bullets: [
          { term: "Home Theater Design:", detail: "Custom acoustic design and premium AV equipment for immersive home cinema." },
          { term: "Smart Home Integration:", detail: "AV systems integrated with home automation platforms like Control4 and Crestron." },
          { term: "Whole-Home Audio:", detail: "Multi-room audio distribution for seamless sound throughout your property." },
          { term: "4K / 8K Projection:", detail: "Ultra-high-definition projectors and screens for stunning visual clarity." },
        ],
        image: "/images/home-theater.png",
        imageBg: "#FFF3E0",
      },
      {
        id: "s04",
        type: "cardGridStats",
        label: "SECTION 04",
        title: "AV Maintenance & Support",
        intro: "Protect your AV investment with our ongoing support packages:",
        cards: [
          { icon: "clock",    title: "Preventive Maintenance", desc: "Scheduled service visits to inspect, clean, and calibrate all AV equipment." },
          { icon: "headset",  title: "24/7 Remote Support",    desc: "Round-the-clock remote diagnostics and troubleshooting for critical AV systems." },
          { icon: "wrench",   title: "On-site Repair",         desc: "Fast on-site engineer dispatch for hardware failures and system faults." },
          { icon: "upgrade",  title: "System Upgrades",        desc: "Firmware updates, software patches, and hardware refresh programmes." },
        ],
        stats: [
          { value: "500+",  label: "AV INSTALLATIONS" },
          { value: "100+",  label: "CORPORATE CLIENTS" },
          { value: "24/7",  label: "SUPPORT AVAILABLE" },
          { value: "5yr",   label: "WARRANTY SUPPORT" },
        ],
      },
    ],
  },

  /* ── 06. AR & VR DEVICES ───────────────────────────────────────────────── */
  "ar-vr": {
    slug: "ar-vr",
    label: "AR & VR Devices",
    heroTitle: "AR & VR Devices",
     heroTitleColor: "#FFFFFF",
    heroSubtitle:
      "Step into the future of immersive enterprise technology. CSK delivers end-to-end Augmented Reality and Virtual Reality device solutions — from hardware procurement and deployment to custom environment setup — transforming how your teams train, collaborate, design, and engage with customers.",
    heroCta: "Explore What We Deliver",
    heroBg: ArVRHeroImage,
     heroOverlay:
    "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 100%)",

   weBelieve: {
  quote: "Immerse. Collaborate. Innovate.",
  // highlight: "collaborate without boundaries.",
  body: "At CSK, we believe Extended Reality is more than a device — it is a strategic capability that empowers businesses to train safer, design smarter, and collaborate without boundaries. Step into the future of work with us.",
},

    sections: [
    {
  id: "s01",
  type: "imageRight",
  label: "SECTION 01",
  title: "Augmented Reality (AR) Solutions",
  intro: "Overlay digital intelligence onto the real world with enterprise-grade AR experiences:",
  bullets: [
    {
      term: "AR Visualization:",
      detail: "Display 3D models, blueprints, and live operational data directly within physical environments."
    },
    {
      term: "Field Service Support:",
      detail: "Hands-free guidance and remote expert assistance for technicians working on-site."
    },
    {
      term: "Smart Maintenance:",
      detail: "Interactive AR instructions for equipment inspection, repair, and assembly workflows."
    },
    {
      term: "Situational Awareness:",
      detail: "Provide workers with real-time contextual information while staying connected to their environment."
    }
  ],
  image: ArVrSecondSection,
  imageBg: "#1A0A3B",
},
    {
  id: "s02",
  type: "cardGrid",
  label: "SECTION 02",
  title: "Virtual Reality (VR) Solutions",
  intro: "Fully immersive environments for training, simulation, and experience — zero real-world distraction, total engagement:",
  cards: [
    {
      icon: "training",
      title: "Enterprise VR Training",
      desc: "Risk-free immersive training environments for safety drills, equipment operation, and employee onboarding."
    },
    {
      icon: "simulation",
      title: "Simulation & Modeling",
      desc: "Realistic VR simulations for product design, process testing, and scenario planning before real-world rollout."
    },
    {
      icon: "collab",
      title: "Virtual Collaboration",
      desc: "Shared virtual spaces for immersive meetings, co-design, and remote teamwork across locations."
    },
    {
      icon: "experience",
      title: "Customer Experiences",
      desc: "Engaging VR showrooms, virtual tours, and product demos that captivate and convert customers."
    }
  ],
},
     {
  id: "s03",
  type: "imageLeft",
  label: "SECTION 03",
  title: "Device Procurement & Managed Support",
  intro: "End-to-end device lifecycle management so your XR rollout runs smoothly:",
  bullets: [
    {
      term: "Hardware Sourcing:",
      detail: "Meta Quest, Microsoft HoloLens, HTC Vive Focus, Apple Vision Pro, and other enterprise XR devices."
    },
    {
      term: "Deployment & Configuration:",
      detail: "MDM/EMM enrollment, content pipelines, device setup, and environment configuration."
    },
    {
      term: "Lifecycle Management:",
      detail: "Provisioning, updates, asset tracking, compliance monitoring, and secure device retirement."
    },
    {
      term: "24/7 Support:",
      detail: "On-site and remote technical support to keep devices, users, and XR sessions running."
    }
  ],
  image: ArVrSectionThird,
  imageBg: "#FFFFFF",
},
    {
  id: "s04",
  type: "cardGridStats",
  label: "SECTION 04",
  title: "Why Choose CSK for AR & VR",
  intro: "Immersive technology delivered by certified experts you can trust:",
  cards: [
    {
      icon: "delivery",
      title: "End-to-End Delivery",
      desc: "From device sourcing to environment design and support — one accountable partner."
    },
    {
      icon: "platform",
      title: "Cross-Platform Expertise",
      desc: "Skilled across all major AR & VR hardware and content ecosystems."
    },
    {
      icon: "shield",
      title: "Enterprise-Grade Security",
      desc: "MDM/EMM-managed devices with secure provisioning and compliance controls."
    },
    {
      icon: "future",
      title: "Future-Ready",
      desc: "Solutions built to scale as XR technology and your business evolve."
    }
  ],
  stats: [
    { value: "AR", label: "AUGMENTED REALITY" },
    { value: "VR", label: "VIRTUAL REALITY" },
    { value: "XR", label: "EXTENDED REALITY" },
    { value: "24/7", label: "SUPPORTED" }
  ],
},
    ],
  },

  /* ── 07. CORPORATE TRAINING ────────────────────────────────────────────── */
  "corporate-training": {
    slug: "corporate-training",
    label: "Corporate Training",
    heroTitle: "Corporate Training",
    heroTitleColor: "#FFFFFF",
    heroSubtitle:
      "At CSK, we specialize in delivering customized corporate training solutions designed to empower your workforce, enhance productivity, and drive business success. Our team of experienced trainers and industry experts isdedicated to providing comprehensive training programs tailored to meet the unique needs of your organization.",
    heroCta: "Explore What We Deliver",
    heroBg: corporateTraning,

    weBelieve: {
  quote: "Who Should Attend",
  // highlight: "enhance their collective performance and drive organizational excellence.",
  body: "This program is ideal for professionals at all levels, from entry-level employees to senior executives, who are committed to continuous learning and professional growth. It is especially beneficial for teams looking to enhance their collective performance and drive organizational excellence",
},

    sections: [
      {
  id: "s01",

  type: "imageLeft",

  label: "SECTION 01",

  title: "Empowering People, Enhancing Performance",

  intro:
    "Equip your workforce with practical skills, knowledge, and confidence to excel in today’s competitive business environment:",

  bullets: [

    {
      term: "Interactive Workshops:",
      detail:
        "Engaging instructor-led sessions focused on real-world business challenges and practical learning outcomes."
    },

    {
      term: "Professional Development:",
      detail:
        "Programs designed to strengthen communication, collaboration, leadership, and workplace effectiveness."
    },

    {
      term: "Case Study Learning:",
      detail:
        "Hands-on exercises and business scenarios that help participants apply concepts in real situations."
    },

    {
      term: "Performance Enhancement:",
      detail:
        "Training initiatives that improve productivity, decision-making, and overall organizational success."
    },

  ],

  image: corporateTrainingSecond,

  imageBg: "#EEF3FF",
},
      {
  id: "s02",
  type: "cardGrid",
  label: "SECTION 02",
  title: "Bring Real-World Insights to Every Session",
  intro: "Industry-focused training programs designed to build practical skills and professional excellence:",
  cards: [
    {
      icon: "shield",
      title: "Compliance & Regulatory Training",
      desc: "Data privacy, workplace safety, and industry-specific compliance programs to help teams meet regulatory standards and reduce operational risk."
    },

    {
      icon: "users",
      title: "Leadership Development",
      desc: "Executive leadership, management training, and emerging leader programs that strengthen decision-making, strategic thinking, and team performance."
    },

    {
      icon: "code",
      title: "Technical Skills Training",
      desc: "Information technology, engineering, cloud technologies, and technical upskilling programs designed for modern digital workplaces."
    },

    {
      icon: "data",
      title: "Data Science & Analytics",
      desc: "Hands-on learning in data analysis, business intelligence, machine learning, and analytics to support data-driven decision making."
    }
  ]
},
      {
        id: "s03",
        type: "imageRight",
        label: "SECTION 03",
        title: "Compliance & Regulatory Training",
        intro: "Ensure your entire workforce meets regulatory and compliance requirements:",
        bullets: [
          { term: "GDPR & Data Privacy:", detail: "Role-specific training ensuring all employees understand data handling obligations." },
          { term: "Anti-Bribery & Corruption:", detail: "Engaging modules covering legal requirements and practical scenarios." },
          { term: "Health & Safety:", detail: "Mandatory H&S training delivered digitally or in person across all levels." },
          { term: "Industry-Specific Compliance:", detail: "Customized modules for BFSI, healthcare, manufacturing, and retail sectors." },
        ],
        image: CorporateTraingSecond,
        imageBg: "#F0FFF4",
      },
      
    ],
  },
 };

// Helper: get service by slug
export function getServiceBySlug(slug) {
  return SERVICES_DATA[slug] || null;
}

// Helper: all slugs list
export const ALL_SLUGS = Object.keys(SERVICES_DATA);