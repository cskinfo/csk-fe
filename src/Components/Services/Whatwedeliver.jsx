import { useState } from "react";

/* ─── SVG Icons ─────────────────────────────────────────────── */
function IconGrid() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="1" y="1" width="8" height="8" rx="1.5" stroke="white" strokeWidth="1.6"/>
      <rect x="13" y="1" width="8" height="8" rx="1.5" stroke="white" strokeWidth="1.6"/>
      <rect x="1" y="13" width="8" height="8" rx="1.5" stroke="white" strokeWidth="1.6"/>
      <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="white" strokeWidth="1.6"/>
    </svg>
  );
}
function IconCart() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M2 2h2.5l2.8 10.5h9L19 6H6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="18.5" r="1.5" fill="white"/>
      <circle cx="16" cy="18.5" r="1.5" fill="white"/>
    </svg>
  );
}
function IconDeploy() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="8" r="4" stroke="white" strokeWidth="1.6"/>
      <path d="M3 20c0-4 3.6-7 8-7s8 3 8 7" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M15 5l3-3M19 2l-2 4" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}
function IconTransition() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M4 11h14M13 6l5 5-5 5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 4L4 9" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}
function IconManage() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="3" stroke="white" strokeWidth="1.6"/>
      <path d="M11 2v2M11 18v2M2 11h2M18 11h2M4.2 4.2l1.4 1.4M16.4 16.4l1.4 1.4M4.2 17.8l1.4-1.4M16.4 5.6l1.4-1.4" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 2L3 5.5v5c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10v-5L11 2z" stroke="white" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M7.5 11l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ─── Lifecycle step icons (small, colored) ─────────────────── */
function StepIcon({ n }) {
  const icons = [
    // 1 assess
    <svg key={1} width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="4" width="10" height="1.6" rx=".8" fill="white"/><rect x="1" y="8" width="7" height="1.6" rx=".8" fill="white"/><rect x="1" y="12" width="9" height="1.6" rx=".8" fill="white"/><path d="M14 7l2 2-2 2" stroke="white" strokeWidth="1.4" strokeLinecap="round"/></svg>,
    // 2 procure
    <svg key={2} width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="2" width="12" height="14" rx="2" stroke="white" strokeWidth="1.4"/><path d="M6 6h6M6 9h4M6 12h5" stroke="white" strokeWidth="1.3" strokeLinecap="round"/></svg>,
    // 3 deploy
    <svg key={3} width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="7" r="3" stroke="white" strokeWidth="1.4"/><path d="M3 16c0-3 2.7-5 6-5s6 2 6 5" stroke="white" strokeWidth="1.4" strokeLinecap="round"/></svg>,
    // 4 transition
    <svg key={4} width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M10 5l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    // 5 manage
    <svg key={5} width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="2.5" stroke="white" strokeWidth="1.4"/><path d="M9 2v1.5M9 14.5V16M2 9h1.5M14.5 9H16M3.7 3.7l1 1M13.3 13.3l1 1M3.7 14.3l1-1M13.3 4.7l1-1" stroke="white" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  ];
  return icons[n - 1];
}

const lifecycleSteps = [
  { n: 1, title: "Assess & Design", sub: "Plan the roadmap" },
  { n: 2, title: "Procure",         sub: "Source the right kit" },
  { n: 3, title: "Deploy",          sub: "Zero-touch rollout" },
  { n: 4, title: "Transition",      sub: "Smooth adoption" },
  { n: 5, title: "Manage",          sub: "Always-on support" },
];

/* ─── Icon wrappers ─────────────────────────────────────────── */
function BlueIconBox({ children }) {
  return (
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
      style={{ background: "linear-gradient(135deg,#1e40af 0%,#1A56DB 100%)" }}
    >
      {children}
    </div>
  );
}

/* ─── Card variants ─────────────────────────────────────────── */
function WhiteCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl p-7 border border-gray-100 flex flex-col ${className}`}
      style={{ background: "#FDFDFD" }}
    >
      {children}
    </div>
  );
}
function BlueCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl p-7 flex flex-col ${className}`}
      style={{
        background: "linear-gradient(135deg,#1A56DB 0%,#1e3a8a 100%)",
      }}
    >
      {children}
    </div>
  );
}

/* ─── Stat badge ────────────────────────────────────────────── */
function StatBadge({ value, label, color = "text-[#1A56DB]" }) {
  return (
    <div className="flex flex-col">
      <span className={`text-lg font-bold ${color} leading-none`}>{value}</span>
      <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mt-0.5">{label}</span>
    </div>
  );
}

/* ─── Circle progress indicator (Service Transition) ───────── */
function CircleIndicator() {
  return (
    <div className="flex items-start gap-3 mt-4">
      <div
        className="w-10 h-10 rounded-full flex-shrink-0 border-[3px]"
        style={{ borderColor: "#1A56DB", borderTopColor: "transparent", borderRightColor: "transparent" }}
      />
      <p className="text-xs text-gray-500 leading-relaxed pt-1">
        Faster team onboarding with structured training &{" "}
        <a href="#" className="text-[#1A56DB] font-medium hover:underline">transformational services.</a>
      </p>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function WhatWeDeliver() {
  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-[1200px] mx-auto">

        {/* ── Section header ── */}
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#1A56DB] mb-2">
            Services&nbsp;/&nbsp;End-to-End
          </p>
          <h2
            className="font-extrabold text-[#0d1b2e] leading-tight mb-3"
            style={{ fontSize: "clamp(28px,3.5vw,42px)", letterSpacing: "-0.02em", fontFamily: "'Inter',sans-serif" }}
          >
            What we deliver
          </h2>
          <p className="text-sm text-gray-500 max-w-md leading-relaxed">
            A single accountable partner across every stage of the device lifecycle — from
            first assessment to always-on management.
          </p>
        </div>

        {/* ── Lifecycle bar ── */}
        <div
          className="rounded-2xl px-8 py-16 mb-6 relative overflow-hidden"
  style={{
  background:
    "linear-gradient(100deg, #00A4EF 0%, #034787 100%)"
}}
        >
          {/* CONTINUOUS LOOP badge */}
          <div className="absolute top-4 right-5 flex items-center gap-1.5">
            <svg width="20" height="26" viewBox="0 0 16 16" fill="none">
              <path d="M13 8A5 5 0 1 1 8 3" stroke="#f97316" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M8 1l2 2-2 2" stroke="#f97316" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/70">Continuous<br/>Loop</span>
          </div>

          <p className="text-l font-semibold text-white mb-5 tracking-wide">
            The CSK End-User Computing Lifecycle
          </p>

          {/* Steps */}
          <div className="flex items-start justify-between relative">
            {/* connecting line */}
            <div className="absolute top-8 left-[calc(10%)] right-[calc(10%)] h-px bg-white/25" />

            {lifecycleSteps.map((step) => (
              <div key={step.n} className="flex flex-col items-center z-10 flex-1">
                {/* numbered circle */}
                <div className="relative mb-3">
                  <div
                    className="w-15 h-15 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)" }}
                  >
                    <StepIcon n={step.n} />
                  </div>
                  <div
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                    style={{ background: "#5b9eff", color: "#fff" }}
                  >
                    {step.n}
                  </div>
                </div>
                <span className="text-white text-[11px] font-semibold text-center leading-tight">{step.title}</span>
                <span className="text-white/50 text-[9px] text-center mt-0.5">{step.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Row 1: Access & Design (wide) + Product Sales (blue) ── */}
        <div className="grid grid-cols-5 gap-4 mb-4">
          {/* Access & Design — ~60% */}
          <WhiteCard className="col-span-3">
            <BlueIconBox><IconGrid /></BlueIconBox>
            <h3 className="text-base font-bold text-[#0d1b2e] mb-2">Access & Design</h3>
            <p className="text-sm text-gray-500 leading-relaxed flex-1">
              Environment assessment, project planning, and solution architecting tailored to your workflows.
              We analyze your current state to design a future-proof roadmap.
            </p>
            <div className="flex gap-8 mt-5 pt-4 border-t border-gray-100">
              <StatBadge value="3-step" label="Assess · Plan · Architect" />
              <StatBadge value="100%" label="Workflow-tailored" color="text-[#f97316]" />
            </div>
          </WhiteCard>

          {/* Product Sales — ~40% blue */}
          <BlueCard className="col-span-2">
            <BlueIconBox><IconCart /></BlueIconBox>
            <h3 className="text-base font-bold text-white mb-2">Product Sales</h3>
            <p className="text-sm text-white/70 leading-relaxed flex-1">
              Pre-configured systems, transparent rate-card offerings, and hardware & software procurement.
            </p>
          </BlueCard>
        </div>

        {/* ── Row 2: Deploy (narrow) + Service Transition (wide) ── */}
        <div className="grid grid-cols-5 gap-4 mb-4">
          {/* Deploy — ~40% */}
          <WhiteCard className="col-span-2">
            <BlueIconBox><IconDeploy /></BlueIconBox>
            <h3 className="text-base font-bold text-[#0d1b2e] mb-2">Deploy</h3>
            <p className="text-sm text-gray-500 leading-relaxed flex-1">
              Zero-touch setup, installation, and data migration with minimal disruption.
            </p>
          </WhiteCard>

          {/* Service Transition — ~60% */}
          <WhiteCard className="col-span-3">
            <BlueIconBox><IconTransition /></BlueIconBox>
            <h3 className="text-base font-bold text-[#0d1b2e] mb-2">Service Transition</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Staff augmentation, client training, and transformational services for smooth adoption across
              your entire organization.
            </p>
            <CircleIndicator />
          </WhiteCard>
        </div>

        {/* ── Row 3: Manage (wide) + Holistic Governance (blue) ── */}
        <div className="grid grid-cols-5 gap-4">
          {/* Manage — ~55% */}
          <WhiteCard className="col-span-3">
            <BlueIconBox><IconManage /></BlueIconBox>
            <h3 className="text-base font-bold text-[#0d1b2e] mb-2">Manage</h3>
            <p className="text-sm text-gray-500 leading-relaxed flex-1">
              Service desk, resident engineers, multivendor support, and priority onsite service to ensure
              peak operational uptime.
            </p>
            <div className="flex gap-6 mt-5 pt-4 border-t border-gray-100">
              <StatBadge value="24/7" label="Service Desk" />
              <StatBadge value="Multi" label="Vendor Support" />
              <StatBadge value="Priority" label="Onsite Service" color="text-[#f97316]" />
            </div>
          </WhiteCard>

          {/* Holistic Governance — ~45% blue */}
          <BlueCard className="col-span-2">
            <BlueIconBox><IconShield /></BlueIconBox>
            <h3 className="text-base font-bold text-white mb-2">Holistic Governance</h3>
            <p className="text-sm text-white/70 leading-relaxed flex-1">
              We manage the underlying complexity of your hardware landscape so you can focus on core
              business growth.
            </p>
            <a
              href="#"
              className="mt-4 text-[11px] font-semibold tracking-widest uppercase text-[#f97316] hover:text-orange-300 transition-colors"
            >
              CSK Managed Services →
            </a>
          </BlueCard>
        </div>

      </div>
    </section>
  );
}