import React, { useState, useEffect, useRef } from 'react';
import { Building2, UserCheck, Award, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

// New Component for the counting animation
const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const targetRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Extract the numeric part and any string suffix (like '+')
  const target = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Unobserve once triggered so it only counts up once per page load
          if (targetRef.current) observer.unobserve(targetRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) observer.unobserve(targetRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // easeOutExpo function for a nice rapid start that slows down at the end
      const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      const currentCount = Math.floor(target * easeOut);

      setCount(currentCount);

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target); // Ensure it ends exactly on the target number
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration, isVisible]);

  return <span ref={targetRef}>{count}{suffix}</span>;
};

const StatCard = ({ icon: Icon, value, label, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const wrapperRef = useRef(null);
  
  // 3D Tilt State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (wrapperRef.current) observer.unobserve(wrapperRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => {
      if (wrapperRef.current) observer.unobserve(wrapperRef.current);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Calculate 3D tilt (Max 15 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15; 
    const rotateY = ((x - centerX) / centerX) * 15;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform(`perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
  };

  return (
    <div 
      ref={wrapperRef}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-24 scale-90'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative flex flex-col items-center p-8 cursor-pointer rounded-3xl bg-white/40 backdrop-blur-md border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] transition-all duration-300 ease-out w-full h-full"
        style={{ 
          transform: transform || 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Interactive Spotlight Glow */}
        <div 
          className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300 z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`
          }}
        />

        {/* 3D Elevated Content Wrapper */}
        <div className="relative z-10 flex flex-col items-center w-full" style={{ transform: 'translateZ(40px)' }}>
          {/* Floating Icon Container */}
          <div className="relative mb-6">
            <div className={`absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-40' : ''}`}></div>
            <div className="relative w-20 h-20 bg-gradient-to-br from-white to-blue-50 rounded-full flex items-center justify-center border border-white shadow-lg text-blue-500 transition-transform duration-500">
              <Icon className="w-8 h-8 stroke-[1.5]" />
            </div>
          </div>
          
          {/* 3D Text Content */}
          <h3 className="text-4xl font-extrabold text-slate-800 mb-3 drop-shadow-sm">
            <AnimatedCounter value={value} />
          </h3>
          <p className="text-[11px] text-gray-500 font-bold tracking-widest uppercase text-center max-w-[200px] leading-relaxed">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
};

const IsoBadge = ({ standard }) => (
  <div className="group relative w-full aspect-square p-2 bg-gradient-to-br from-blue-300 via-[#8bc4f5] to-blue-500 flex items-center justify-center overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer shine-effect">
    {/* Background light bursts */}
    <div className="absolute inset-0 opacity-40 group-hover:opacity-80 transition-opacity duration-500">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-4 bg-white/40 rotate-45 blur-md group-hover:rotate-[225deg] transition-all duration-[1500ms] ease-in-out" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-4 bg-white/40 -rotate-45 blur-md group-hover:rotate-[135deg] transition-all duration-[1500ms] ease-in-out" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] bg-white/20 blur-xl group-hover:animate-pulse" />
      </div>

      {/* SVG Badge */}
      <div className="relative w-full h-full max-w-[220px] max-h-[220px] drop-shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="outer-ring" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6ebaf5"/>
              <stop offset="20%" stopColor="#1e58a8"/>
              <stop offset="80%" stopColor="#0b2e61"/>
              <stop offset="100%" stopColor="#3b82f6"/>
            </linearGradient>
            
            <linearGradient id="silver-ring" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9ca3af"/>
              <stop offset="30%" stopColor="#f3f4f6"/>
              <stop offset="50%" stopColor="#ffffff"/>
              <stop offset="80%" stopColor="#e5e7eb"/>
              <stop offset="100%" stopColor="#6b7280"/>
            </linearGradient>

            <radialGradient id="center-blue" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#3b82f6"/>
              <stop offset="50%" stopColor="#1e40af"/>
              <stop offset="100%" stopColor="#0f172a"/>
            </radialGradient>

            {/* Paths for curved text */}
            <path id={`top-curve-${standard}`} d="M 28 103 A 72 72 0 0 1 172 103" fill="transparent" />
            <path id={`bottom-curve-${standard}`} d="M 172 97 A 72 72 0 0 1 28 97" fill="transparent" />
          </defs>

          {/* Outer Bevel */}
          <circle cx="100" cy="100" r="96" fill="url(#outer-ring)" className="origin-center transition-transform duration-1000 ease-in-out group-hover:rotate-180" />
          <circle cx="100" cy="100" r="92" fill="rgba(255,255,255,0.2)" />
          
          {/* Silver Text Ring */}
          <circle cx="100" cy="100" r="88" fill="url(#silver-ring)" stroke="#0b2e61" strokeWidth="1" className="origin-center transition-transform duration-[1500ms] ease-in-out group-hover:-rotate-180" />
          
          {/* Inner Blue Center */}
          <circle cx="100" cy="100" r="62" fill="url(#center-blue)" stroke="#cbd5e1" strokeWidth="2" />
          
          {/* Subtle inner globe lines for detail */}
          <circle cx="100" cy="100" r="60" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <path d="M 100 40 A 30 60 0 0 0 100 160 A 30 60 0 0 0 100 40" fill="transparent" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <path d="M 40 100 Q 100 130 160 100 Q 100 70 40 100" fill="transparent" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

          {/* Circular Texts */}
          <text fill="#0f294d" fontSize="21" fontWeight="900" fontFamily="Impact, Arial Black, sans-serif" letterSpacing="1.5">
            <textPath href={`#top-curve-${standard}`} startOffset="50%" textAnchor="middle">CERTIFIED</textPath>
          </text>
          <text fill="#0f294d" fontSize="21" fontWeight="900" fontFamily="Impact, Arial Black, sans-serif" letterSpacing="1.5">
            <textPath href={`#bottom-curve-${standard}`} startOffset="50%" textAnchor="middle">COMPANY</textPath>
          </text>

          {/* Center Main Text */}
          <text x="100" y="93" textAnchor="middle" fill="#ffffff" fontSize="40" fontWeight="900" fontFamily="Arial, sans-serif" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>ISO</text>
          <text x="100" y="116" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing="0.5" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{standard}</text>

          {/* Glossy Top Highlight */}
          <path d="M 42 100 A 58 58 0 0 1 158 100 A 48 30 0 0 0 42 100 Z" fill="rgba(255,255,255,0.3)" />
        </svg>
      </div>
  </div>
);

// 3D Coverflow Carousel Component
const IsoBadgeCarousel = ({ standards }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play interval
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % standards.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered, standards.length]);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % standards.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + standards.length) % standards.length);

  // Calculate 3D styles based on distance from the active index
  const getSlideStyle = (index) => {
    const diff = (index - activeIndex + standards.length) % standards.length;
    
    let translateX = '0';
    let scale = 1;
    let opacity = 1;
    let zIndex = 30;
    let rotateY = '0deg';

    if (diff === 1) { // Right Slide
      translateX = '85%';
      scale = 0.8;
      opacity = 0.6;
      zIndex = 20;
      rotateY = '-15deg';
    } else if (diff === standards.length - 1) { // Left Slide
      translateX = '-85%';
      scale = 0.8;
      opacity = 0.6;
      zIndex = 20;
      rotateY = '15deg';
    } else if (diff !== 0) { // Hidden Back Slides
      translateX = '0';
      scale = 0.5;
      opacity = 0;
      zIndex = 10;
    }

    return {
      transform: `translate(-50%, -50%) translateX(${translateX}) rotateY(${rotateY}) scale(${scale})`,
      opacity,
      zIndex
    };
  };

  return (
    <div 
      className="relative w-full h-[400px] md:h-[450px] flex items-center justify-center overflow-hidden py-2"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      {standards.map((std, index) => (
        <div 
          key={std} 
          className="absolute top-1/2 left-1/2 w-[240px] md:w-[320px] transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] cursor-pointer drop-shadow-2xl"
          style={getSlideStyle(index)}
          onClick={() => setActiveIndex(index)}
        >
          <IsoBadge standard={std} />
        </div>
      ))}

      {/* Left Navigation Arrow */}
      <button 
        onClick={handlePrev}
        className="absolute left-2 md:left-12 top-1/2 -translate-y-1/2 z-40 p-3 bg-white/90 backdrop-blur text-blue-900 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:bg-blue-50 hover:scale-110 transition-all border border-blue-100/50"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Navigation Arrow */}
      <button 
        onClick={handleNext}
        className="absolute right-2 md:right-12 top-1/2 -translate-y-1/2 z-40 p-3 bg-white/90 backdrop-blur text-blue-900 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:bg-blue-50 hover:scale-110 transition-all border border-blue-100/50"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      
      {/* Pagination Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-3 z-40">
        {standards.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ease-out ${
              idx === activeIndex 
                ? 'bg-blue-600 w-8 shadow-sm' 
                : 'bg-blue-200 hover:bg-blue-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default function WhyChooseUs() {
  const stats = [
    {
      icon: Building2,
      value: "150+",
      label: "CERTIFIED & SKILLED PROFESSIONALS",
    },
    {
      icon: UserCheck,
      value: "90+",
      label: "TRUSTED CLIENTS ACROSS INDUSTRIES",
    },
    {
      icon: Award,
      value: "90+",
      label: "TRUSTED CLIENTS ACROSS INDUSTRIES",
    },
    {
      icon: CheckCircle2,
      value: "3408+",
      label: "POSTCODES WITH SAME-DAY SUPPORT CAPABILITY",
    }
  ];

  const standards = [
    "20000-1:2018",
    "27001:2022",
    "9001:2015",
    "14001-2015"
  ];

  return (
    <section className="bg-white py-13 px-4 font-sans border-8 border-blue-50/50 overflow-hidden">
      <style>{`
        /* Hover Shine Effect */
        @keyframes shine {
          0% { left: -100%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 200%; opacity: 0; }
        }
        .shine-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%);
          transform: skewX(-25deg);
          z-index: 10;
        }
        .shine-effect:hover::after {
          animation: shine 1.2s ease-in-out;
        }

        /* Ambient Background Grid */
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
      <div className="max-w-7xl mx-auto relative">
        
        {/* Decorative Background Blob for Glassmorphism */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none -z-10 animate-pulse"></div>
        <div className="absolute top-40 right-1/4 w-72 h-72 bg-indigo-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Header Section */}
        <div className="text-center mb-10 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f294d] mb-4">
            Why Choose Us
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-5xl mx-auto leading-relaxed">
            With industry expertise, innovation-driven strategies, nationwide support capabilities, and customized enterprise solutions, CSK helps businesses, government sectors, and educational institutions achieve reliable and sustainable digital transformation.
          </p>
        </div>

        {/* Stats Grid - Now with glassmorphism layout */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-15 px-4 bg-grid-pattern py-8 rounded-3xl">
          {stats.map((stat, index) => (
            <StatCard 
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              index={index}
            />
          ))}
        </div>

        {/* 3D Interactive Carousel */}
        <IsoBadgeCarousel standards={standards} />

      </div>
    </section>
  );
}