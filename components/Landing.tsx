"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import useScrollAnimations from "@/lib/useScrollAnimations";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ScrubText = ({ text }: { text: string }) => {
  const el = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    if (!el.current) return;
    const words = el.current.querySelectorAll('.word');
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: el.current,
            start: "top 85%",
            end: "bottom 50%",
            scrub: true,
          }
        }
      );
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <p ref={el} className="font-display font-black tracking-tighter text-[#1C1C1C] text-3xl md:text-5xl lg:text-6xl leading-[1.1] max-w-5xl">
      {text.split(" ").map((word, i) => (
        <span key={i} className="word inline-block mr-[0.25em] mb-[0.1em]">{word}</span>
      ))}
    </p>
  );
};

const ScrubGrid = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const el = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!el.current) return;
    const items = el.current.children;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0.1, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          scrollTrigger: {
            trigger: el.current,
            start: "top 95%",
            end: "bottom 70%",
            scrub: true,
          }
        }
      );
    });
    
    return () => ctx.revert();
  }, []);

  return <div ref={el} className={className}>{children}</div>;
};

const ParticleShape = ({ path }: { path: string }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full p-4 md:p-8 overflow-visible opacity-90 drop-shadow-[0_0_15px_rgba(227,74,39,0.3)]" fill="none">
    <defs>
      <filter id="glow-intense" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="glow-ambient" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    {/* Ambient dust cloud (very soft, wide) */}
    <path d={path} stroke="#E34A27" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0 8" opacity="0.15" filter="url(#glow-ambient)" transform="translate(1, 1)" />
    <path d={path} stroke="#E34A27" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0 15" strokeDashoffset="5" opacity="0.1" filter="url(#glow-ambient)" transform="translate(-2, 3)" />

    {/* Scattered secondary particles (small, slightly offset) */}
    <path d={path} stroke="#FAF9F6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0 6" strokeDashoffset="2" opacity="0.3" transform="translate(-1, 1.5)" />
    <path d={path} stroke="#E34A27" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0 9" strokeDashoffset="5" opacity="0.4" transform="translate(1.5, -1)" />
    <path d={path} stroke="#FAF9F6" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0 5" strokeDashoffset="1" opacity="0.5" transform="translate(-0.5, -1.5)" />
    
    {/* Core bright particles (sharp, tiny) */}
    <path d={path} stroke="#FAF9F6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0 4" opacity="0.9" filter="url(#glow-intense)" />
    <path d={path} stroke="#E34A27" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0 7" strokeDashoffset="3" opacity="0.8" filter="url(#glow-intense)" />
  </svg>
);

const HERO_QUESTIONS = [
  "Why does this exist?",
  "Who is it truly for?",
  "What if it were simpler?",
  "When is it enough?",
];

const SERVICES = [
  {
    num: "S.01",
    title: "Web Development",
    body: "Performant, accessible, editorial sites that feel handcrafted and scale without apology.",
    particlePath: "M 35 25 L 10 50 L 35 75 M 60 15 L 40 85 M 65 25 L 90 50 L 65 75"
  },
  {
    num: "S.02",
    title: "App Development",
    body: "Native-quality cross-platform apps with obsessive attention to animation, latency and feel.",
    particlePath: "M 30 10 h 40 a 5 5 0 0 1 5 5 v 70 a 5 5 0 0 1 -5 5 h -40 a 5 5 0 0 1 -5 -5 v -70 a 5 5 0 0 1 5 -5 z M 40 18 h 20 M 45 82 h 10"
  },
  {
    num: "S.03",
    title: "UI / UX Design",
    body: "Interfaces that read like literature — calm hierarchy, confident motion, zero decorative noise.",
    particlePath: "M 10 15 h 80 v 70 h -80 z M 10 35 h 80 M 35 35 v 50 M 45 45 h 35 v 20 h -35 z"
  },
  {
    num: "S.04",
    title: "Product Mockups",
    body: "Presentation-ready renders that make investors lean in and founders sleep better.",
    particlePath: "M 50 15 L 85 35 L 85 75 L 50 95 L 15 75 L 15 35 Z M 50 55 L 50 15 M 50 55 L 85 35 M 50 55 L 15 35 M 50 55 L 50 95"
  },
  {
    num: "S.05",
    title: "Canvas Designing",
    body: "Brand-aligned print and large-format canvases for campaigns, merch and physical spaces.",
    particlePath: "M 50 15 Q 50 45 20 45 Q 50 45 50 75 Q 50 45 80 45 Q 50 45 50 15 M 80 15 Q 80 25 70 25 Q 80 25 80 35 Q 80 25 90 25 Q 80 25 80 15 M 25 65 Q 25 75 15 75 Q 25 75 25 85 Q 25 75 35 75 Q 25 75 25 65"
  },
  {
    num: "S.06",
    title: "WhatsApp Automations",
    body: "Conversational flows and commerce bots that sell, support and never sound robotic.",
    particlePath: "M 15 25 h 50 a 10 10 0 0 1 10 10 v 30 a 10 10 0 0 1 -10 10 h -30 l -15 15 v -15 a 10 10 0 0 1 -10 -10 v -30 a 10 10 0 0 1 10 -10 z M 30 50 h 0.1 M 40 50 h 0.1 M 50 50 h 0.1"
  },
];

const STEPS = [
  {
    num: "01",
    title: "Ask",
    body: "We interrogate the brief until only truth remains. No assumption survives the first workshop.",
  },
  {
    num: "02",
    title: "Sketch",
    body: "Rough, fast, unprecious. Twenty ideas on paper before a single pixel is drawn.",
  },
  {
    num: "03",
    title: "Shape",
    body: "Design, prototype, test. Motion, typography and hierarchy rehearsed like a score.",
  },
  {
    num: "04",
    title: "Ship",
    body: "Engineered for speed and longevity. Handover includes a studio that still picks up the phone.",
  },
];

const PROJECTS = [
  { id: "meridian", tag: "Editorial / Web", year: "2024", title: "Meridian", image: "/images/photo-1634084462412-b54873c0a56d.jpg", tags: ["Web Design", "Development"], link: "#contact" },
  { id: "kora", tag: "Identity / App", year: "2024", title: "Kora Studio", image: "/images/photo-1490013616775-3ca8865fb129.jpg", tags: ["App Design", "UI / UX"], link: "#contact" },
  { id: "atlas", tag: "Product / Mockups", year: "2025", title: "Atlas Commerce", image: "/images/pexels-photo-196645.jpeg", tags: ["Product Mockups", "Branding"], link: "#contact" },
  { id: "slate", tag: "Full Stack", year: "2026", title: "Slate", image: "/proof/slate.png", tags: ["Full Stack", "Application"], link: "https://slate-tau-eight.vercel.app/" },
];

const paragraphs = [
  "Edhe is not a name, it is an instinct. The first word every child learns to weaponise against the world.",
  "We believe the best products are built by refusing every default — by treating every decision as a door marked 'why'.",
  "From first sketch to final pixel, we chase the uncomfortable question until it resolves into something inevitable.",
];

export default function Landing() {
  useScrollAnimations();
  const [activeProject, setActiveProject] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [activeHeroQ, setActiveHeroQ] = useState(0);
  
  // Parallax Scroll Scrub logic for Capabilities section
  useEffect(() => {
    const servicesSection = document.getElementById('services');
    if (!servicesSection) return;
    
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: servicesSection,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          // Map scroll progress (0 to 1) to the 6 services
          const idx = Math.min(Math.floor(self.progress * SERVICES.length), SERVICES.length - 1);
          setActiveService(idx);
        }
      });
    });
    
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveHeroQ(i => (i + 1) % HERO_QUESTIONS.length), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="relative w-full overflow-clip">
      <section id="top" data-testid="hero-section" className="relative min-h-screen flex flex-col justify-center md:items-center px-6 md:px-16 pt-24 md:pt-40 pb-20 md:pb-24">
        <div className="max-w-[1400px] w-full mx-auto relative z-10">
          <div data-reveal="true" data-speed="-0.15" className="flex items-center gap-2 md:gap-3 mb-6 md:mb-10 overflow-hidden w-full">
            <span className="block h-px w-4 md:w-6 bg-[#1C1C1C] flex-shrink-0" />
            <span className="font-mono font-bold text-[8.5px] md:text-[11px] tracking-[0.2em] md:tracking-[0.3em] uppercase text-[#595959] whitespace-nowrap overflow-hidden text-ellipsis">Edhe · எதே · A studio of questions</span>
          </div>
          <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-center">
            <div className="md:col-span-7 flex flex-col gap-6">
              <h1 data-reveal="true" className="font-display font-black tracking-tighter leading-[0.82] text-[#1C1C1C] text-[21vw] sm:text-[18vw] lg:text-[14vw] -ml-1 md:-ml-2">
                Edhe<span className="text-[#E34A27]">?</span>
              </h1>
              <p data-reveal="true" data-speed="0.06" className="font-body text-lg md:text-xl leading-[1.6] text-[#1C1C1C] max-w-[500px]">
                <span className="marker-highlight">Before the first line of code. Before the first pixel. There is always one question. That&apos;s where we begin.</span>
              </p>
              <div className="mt-8 md:mt-16 animate-[fadeIn_1s_ease-out_0.8s_both]">
                <Link href="#contact" data-testid="hero-cta" className="group inline-flex items-center gap-3">
                  <span className="relative font-display font-black text-2xl md:text-3xl tracking-tighter text-[#1C1C1C]">
                    Start with a Question
                    <span className="absolute -bottom-1 left-0 h-[2px] bg-[#E34A27] w-0 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  </span>
                  <span className="text-[#E34A27] font-display font-black text-2xl md:text-3xl transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </Link>
              </div>
            </div>
            <div data-reveal="true" data-speed="0.08" className="md:col-span-5 flex flex-col gap-4 md:gap-6 mt-8 md:mt-0">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#595959]">The first question we ask —</p>
              <div className="relative h-28 md:h-32 overflow-hidden">
                {HERO_QUESTIONS.map((q, i) => (
                  <p key={i} className={`absolute inset-0 font-display font-black text-[10vw] sm:text-5xl tracking-tighter leading-tight transition-all duration-700 ${i === activeHeroQ ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} text-[#1C1C1C] drop-shadow-[0_4px_12px_rgba(250,249,246,0.9)]`}>{q}</p>
                ))}
              </div>
              <div className="flex gap-2">
                {HERO_QUESTIONS.map((_, i) => (
                  <span key={i} className={`h-[2px] rounded-full transition-all duration-500 ${i === activeHeroQ ? "w-8 bg-[#E34A27]" : "w-3 bg-[#DCDAD2]"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section
        id="vision"
        data-testid="about-section"
        className="relative py-32 md:py-40 px-6 md:px-16"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Oversized Philosophy */}
          <div className="mb-10 md:mb-16">
            <p data-reveal="true" className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#595959] mb-8 md:mb-12">
              01 / Exploration
            </p>
            <div className="flex flex-col gap-6 md:gap-12">
              <ScrubText text="Edhe is not a name, it is an instinct. The first word every child learns to challenge the status quo." />
              <ScrubText text="We believe the best products are built by refusing every default — by treating every decision as a door marked 'why'." />
              <ScrubText text="From first sketch to final pixel, we chase the uncomfortable question until it resolves into something inevitable." />
            </div>
          </div>

          {/* Principles - Small 3-Column Footer Grid */}
          <ScrubGrid className="grid md:grid-cols-3 gap-8 md:gap-8 mt-4 md:mt-8 pt-8 border-t border-[#DCDAD2]">
            {[
              { id: "01", title: "Obsessive Detail", desc: "Every pixel must justify its existence. No decorative noise." },
              { id: "02", title: "Strategic Restraint", desc: "We build what is necessary, not what is trendy." },
              { id: "03", title: "Endless Questions", symbol: "∞" }
            ].map((principle, index) => {
              const dirs = ["up", "scale", "right"];
              const dir = dirs[index % dirs.length];
              return (
              <div key={principle.id} data-reveal="true" data-reveal-dir={dir} className="flex flex-col h-full">
                <span className="font-mono text-[10px] tracking-[0.3em] text-[#E34A27] mb-4">{principle.id}</span>
                <h3 className="font-display font-black text-xl md:text-2xl tracking-tight text-[#1C1C1C] mb-3">{principle.title}</h3>
                {principle.desc && <p className="font-body text-[#595959] text-sm md:text-base leading-relaxed max-w-[280px]">{principle.desc}</p>}
                {principle.symbol && <p className="font-display font-black text-4xl text-[#E34A27] mt-1">{principle.symbol}</p>}
              </div>
              );
            })}
          </ScrubGrid>
        </div>
      </section>

      {/* Capability Section Header (Normal Scroll) */}
      <section className="relative bg-[#1C1C1C] pt-24 md:pt-32 px-6 md:px-16 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 55% at 75% 50%, rgba(227,74,39,0.08) 0%, transparent 70%)" }} />
        <div className="max-w-[1400px] w-full mx-auto relative z-10">
          <p data-reveal="true" className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#595959] mb-4">02 / Capability</p>
          <h2 data-reveal="true" className="font-display font-black tracking-tighter leading-[0.9] text-4xl md:text-5xl text-[#FAF9F6] pb-8 lg:pb-0">What we do, <span className="text-[#E34A27]">when asked.</span></h2>
        </div>
      </section>

      {/* Capability Section - Parallax Area (Unified) */}
      <section id="services" data-testid="services-section" className="relative bg-[#1C1C1C] h-[450vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center py-12 px-6 md:px-16 overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 55% at 75% 50%, rgba(227,74,39,0.08) 0%, transparent 70%)" }} />
          
          <div className="max-w-[1400px] w-full mx-auto relative z-10 h-full flex flex-col justify-center">
            
            {/* DESKTOP LAYOUT */}
            <div className="hidden lg:grid grid-cols-12 gap-10 items-center w-full h-full">
              {/* Left Side: Massive Menu */}
              <nav className="col-span-7 flex flex-col gap-5 justify-center">
                {SERVICES.map((svc, idx) => (
                  <button 
                    key={svc.num} 
                    onMouseEnter={() => setActiveService(idx)}
                    className="group relative text-left w-full flex flex-col items-start"
                  >
                    <div className="flex items-center gap-6">
                      <span className={`font-mono text-[10px] tracking-[0.3em] transition-colors duration-700 ${activeService === idx ? "text-[#E34A27]" : "text-[#595959]"}`}>{svc.num}</span>
                      {activeService === idx && <span className="w-8 h-[2px] bg-[#E34A27]" />}
                    </div>
                    <h3 className={`font-display font-black text-5xl lg:text-6xl tracking-tighter transition-all duration-700 mt-1 ${
                      activeService === idx 
                        ? "text-[#FAF9F6] translate-x-4" 
                        : "text-transparent [-webkit-text-stroke:1px_#3D3D3D] hover:[-webkit-text-stroke:1px_#8A8880]"
                    }`}>
                      {svc.title}
                    </h3>
                  </button>
                ))}
              </nav>
              
              {/* Right Side: Description */}
              <div className="col-span-5 relative flex items-center h-full min-h-[600px]">
                {SERVICES.map((svc, idx) => (
                  <div 
                    key={svc.num} 
                    className={`absolute inset-0 flex flex-col justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] w-full ${
                      activeService === idx ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-12 pointer-events-none"
                    }`}
                  >
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-3xl relative overflow-hidden h-full flex flex-col shadow-2xl gap-8">
                      <div className="absolute top-0 right-0 p-8 text-[#FAF9F6]/10 font-display font-black text-9xl leading-none select-none z-0 pointer-events-none">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      
                      <div className="relative w-full flex-1 min-h-[280px] rounded-2xl overflow-hidden border border-white/5 z-10 bg-gradient-to-b from-[#FAF9F6]/5 to-transparent flex items-center justify-center">
                        <div className="absolute inset-0 bg-[#E34A27]/5 mix-blend-overlay" />
                        <ParticleShape path={svc.particlePath} />
                      </div>

                      <div className="relative z-10">
                        <h4 className="font-display text-4xl font-bold text-[#FAF9F6] mb-4">{svc.title}</h4>
                        <p className="font-body text-[#8A8880] text-lg leading-relaxed max-w-md">{svc.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MOBILE LAYOUT (Scroll Accordion) */}
            <div className="lg:hidden flex flex-col justify-center w-full gap-2">
              {SERVICES.map((svc, idx) => (
                <div key={svc.num} className="flex flex-col w-full">
                  {/* TITLE */}
                  <div className="flex items-center gap-4 mb-1">
                    <span className={`font-mono text-[9px] tracking-[0.2em] transition-colors duration-700 ${activeService === idx ? "text-[#E34A27]" : "text-[#595959]"}`}>{svc.num}</span>
                    <h3 className={`font-display font-black text-[8vw] sm:text-4xl tracking-tighter transition-all duration-700 ${
                      activeService === idx 
                        ? "text-[#FAF9F6]" 
                        : "text-transparent [-webkit-text-stroke:1px_#3D3D3D]"
                    }`}>
                      {svc.title}
                    </h3>
                  </div>

                  {/* CARD (Accordion expands when active) */}
                  <div className={`grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    activeService === idx ? "grid-rows-[1fr] opacity-100 mt-2 mb-4" : "grid-rows-[0fr] opacity-0 mt-0 mb-0"
                  }`}>
                    <div className="overflow-hidden">
                      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-3xl relative flex flex-col shadow-2xl">
                        <div className="absolute top-0 right-0 p-4 text-[#FAF9F6]/5 font-display font-black text-6xl leading-none select-none z-0 pointer-events-none">
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                        
                        <div className="relative w-full h-[160px] sm:h-[200px] rounded-2xl overflow-hidden border border-white/5 z-10 bg-gradient-to-b from-[#FAF9F6]/5 to-transparent flex items-center justify-center mb-4">
                          <div className="absolute inset-0 bg-[#E34A27]/5 mix-blend-overlay" />
                          <ParticleShape path={svc.particlePath} />
                        </div>

                        <div className="relative z-10">
                          <p className="font-body text-[#8A8880] text-[13px] sm:text-sm leading-relaxed">{svc.body}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>




      {/* Process Section */}
      <section
        id="process"
        data-testid="process-section"
        className="relative py-16 md:py-40 px-6 md:px-16"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 md:mb-20">
            <p
              data-reveal="true"
              className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#595959] mb-4 md:mb-6"
            >
              03 / Method
            </p>
            <h2
              data-reveal="true"
              className="font-display font-black tracking-tighter leading-[0.9] text-[12vw] sm:text-6xl md:text-7xl lg:text-7xl text-[#1C1C1C] max-w-4xl"
            >
              Four movements,
              <br />
              <span className="text-[#E34A27]">no waste.</span>
            </h2>
          </div>

          <ol className="relative md:border-l md:border-[#DCDAD2] pl-0">
            {STEPS.map((step, index) => (
              <li
                key={step.num}
                data-reveal="true"
                data-testid={`process-step-${step.num.padStart(2, "0")}`}
                className="relative grid md:grid-cols-12 gap-2 md:gap-6 py-8 md:py-16 border-t md:border-t-0 md:border-b border-[#DCDAD2] group first:border-t-0"
              >
                <div className="md:col-span-3 flex items-start gap-4">
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#E34A27] md:mt-3">
                    Step {step.num}
                  </span>
                </div>
                <div className="md:col-span-5 mt-1 md:mt-0">
                  <h3 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-[#1C1C1C] group-hover:text-[#E34A27] transition-colors duration-500">
                    {step.title}.
                  </h3>
                </div>
                <p className="md:col-span-4 font-body text-base md:text-lg leading-relaxed text-[#595959] mt-3 md:mt-6">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="projects" data-testid="projects-section" className="relative py-20 md:py-28 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-14">
            <div>
              <p data-reveal="true" className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#595959] mb-6">04 / Proof</p>
              <h2 data-reveal="true" className="font-display font-black tracking-tighter leading-[0.9] text-5xl md:text-6xl lg:text-7xl text-[#1C1C1C]">Selected<br /><span className="text-[#E34A27]">answers.</span></h2>
            </div>
            <p data-reveal="true" className="md:text-right font-body font-light text-[#595959] max-w-xs leading-relaxed">Three recent studies. Each began with a single, uncomfortable question.</p>
          </div>
          {/* Desktop Layout */}
          <div data-reveal="true" className="hidden lg:grid grid-cols-12 gap-16 items-start">
            <div className="flex flex-col lg:col-span-7 border-t border-[#1C1C1C]/20">
              {PROJECTS.map((project, index) => (
                <Link key={project.id} href={project.link || "#contact"} data-testid={`project-link-${project.id}`}
                  {...(project.link?.startsWith('http') ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onMouseEnter={() => setActiveProject(index)}
                  className={`group py-8 px-4 border-b border-[#1C1C1C]/20 flex justify-between items-center transition-all duration-300 ${activeProject === index ? "bg-[#F2F1EC]" : "hover:bg-[#F2F1EC]"}`}>
                  <div className="flex gap-6 sm:gap-10 items-center flex-wrap">
                    <span className="font-mono text-sm text-[#8A8880] tabular-nums w-8">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className={`font-display text-xl md:text-2xl font-semibold tracking-tight transition-colors duration-300 ${activeProject === index ? "text-[#E34A27]" : "text-[#1C1C1C] group-hover:text-[#E34A27]"}`}>{project.title}</h3>
                    <div className="hidden sm:flex gap-2 flex-wrap">
                      {project.tags.map(tag => (<span key={tag} className="px-2.5 py-1 rounded-full border border-[#1C1C1C]/15 bg-[#1C1C1C]/5 text-[#595959] font-mono text-[9px] tracking-[0.15em] uppercase">{tag}</span>))}
                    </div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 flex-shrink-0 ml-4 transition-all duration-300 ${activeProject === index ? "opacity-100 text-[#E34A27]" : "opacity-0 text-[#E34A27] group-hover:opacity-100"}`}>
                    <path d="M18.25 15.5a.75.75 0 0 1-.75-.75V7.56L7.28 17.78a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L16.44 6.5H9.25a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75Z" />
                  </svg>
                </Link>
              ))}
            </div>
            <div className="hidden lg:block lg:col-span-5">
              <div className="sticky top-28">
                <div className="w-full overflow-hidden relative" style={{ height: "450px" }}>
                  <div className="w-full" style={{ transform: `translateY(-${activeProject * 450}px)`, transition: "transform 700ms cubic-bezier(0.76,0,0.24,1)" }}>
                    {PROJECTS.map((project, i) => (
                      <div key={project.id} className="w-full relative" style={{ height: "450px" }}>
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover block" loading={i === 0 ? "eager" : "lazy"} />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5">
                          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/60">{project.year} — {project.tag}</p>
                          <p className="font-display text-2xl font-black tracking-tight text-white mt-1">{project.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 mt-4 justify-end">
                  {PROJECTS.map((_, i) => (
                    <button key={i} onClick={() => setActiveProject(i)}
                      className={`h-[3px] rounded-full transition-all duration-300 ${activeProject === i ? "w-8 bg-[#E34A27]" : "w-3 bg-[#DCDAD2] hover:bg-[#8A8880]"}`}
                      aria-label={`View project ${i + 1}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout (Vertical Feed) */}
          <div className="lg:hidden flex flex-col gap-12 mt-12">
            {PROJECTS.map((project, index) => {
              const dirs = ["up", "left", "scale", "right"];
              const dir = dirs[index % dirs.length];
              return (
              <Link 
                key={project.id} 
                href={project.link || "#contact"} 
                data-reveal="true"
                data-reveal-dir={dir}
                data-testid={`project-link-mobile-${project.id}`}
                {...(project.link?.startsWith('http') ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex flex-col group block"
              >
                {/* Image Card */}
                <div className="w-full aspect-[4/3] sm:aspect-[3/2] rounded-2xl overflow-hidden relative mb-5 shadow-[0_12px_40px_rgba(28,28,28,0.08)] bg-[#DCDAD2]">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    loading={index === 0 ? "eager" : "lazy"} 
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                
                {/* Content */}
                <div className="flex flex-col gap-3 px-1">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-display text-3xl font-black tracking-tight text-[#1C1C1C] group-hover:text-[#E34A27] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="w-10 h-10 rounded-full border border-[#1C1C1C]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E34A27] group-hover:border-[#E34A27] transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#1C1C1C] group-hover:text-white transition-colors duration-300">
                        <path d="M18.25 15.5a.75.75 0 0 1-.75-.75V7.56L7.28 17.78a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L16.44 6.5H9.25a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75Z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap items-center mt-1">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#E34A27] mr-2">
                      {project.year}
                    </span>
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 rounded-full border border-[#1C1C1C]/15 bg-[#1C1C1C]/5 text-[#595959] font-mono text-[9px] tracking-[0.15em] uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
        </div>
      </section>




      <section id="contact" data-testid="cta-section" className="relative px-6 md:px-16 pt-32 md:pt-40 pb-32 border-t border-[#DCDAD2]/60">
        <span aria-hidden="true" className="pointer-events-none select-none absolute -bottom-10 -right-8 font-display font-black leading-none text-[#1C1C1C]/[0.03] text-[20rem] md:text-[28rem]">?</span>
        <div className="max-w-[1400px] mx-auto">
          <p data-reveal="true" className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#595959] mb-8">05 / Conversation</p>
          <h2 data-reveal="true" className="font-display font-black tracking-tighter leading-[0.85] text-[#1C1C1C] text-[18vw] md:text-[11vw] lg:text-[9vw] mb-16 md:mb-20">
            Let&apos;s<br /><span className="text-[#E34A27]">talk?</span>
          </h2>
          <div className="grid md:grid-cols-12 gap-12 md:gap-10">
            <div className="md:col-span-5 flex flex-col gap-8 md:gap-6">
              <p data-reveal="true" className="font-body text-base md:text-lg leading-relaxed text-[#595959] max-w-sm">Send a note, a sketch, a question — or just a word. We answer every one.</p>
              
              <div className="flex flex-col sm:flex-row md:flex-col gap-4 mt-2 md:mt-0">
                <a data-reveal="true" data-speed="0.02" href="mailto:hello@edhe.in" data-testid="email-link" className="group flex flex-col justify-between p-6 md:p-8 border border-[#DCDAD2] bg-white/40 backdrop-blur-md rounded-3xl hover:border-[#E34A27]/60 hover:bg-white/80 transition-all duration-500 shadow-sm flex-1 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-6 md:mb-8 relative z-10">
                    <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#595959]">Email</p>
                    <div className="w-10 h-10 rounded-full border border-[#DCDAD2] group-hover:border-[#E34A27] group-hover:bg-[#E34A27] flex items-center justify-center transition-all duration-500 flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#595959] group-hover:text-white transition-colors duration-300"><path d="M18.25 15.5a.75.75 0 0 1-.75-.75V7.56L7.28 17.78a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L16.44 6.5H9.25a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75Z" /></svg>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <p className="font-display text-2xl sm:text-xl lg:text-2xl font-black tracking-tighter text-[#1C1C1C] group-hover:text-[#E34A27] transition-colors duration-300">hello@edhe.in</p>
                  </div>
                  <div className="absolute -bottom-8 -right-4 text-[#1C1C1C]/[0.03] group-hover:text-[#E34A27]/[0.05] transition-colors duration-500 font-display font-black text-9xl pointer-events-none select-none">@</div>
                </a>

                <a data-reveal="true" data-speed="0.04" href="https://wa.me/919000000000" target="_blank" rel="noreferrer noopener" data-testid="whatsapp-link" className="group flex flex-col justify-between p-6 md:p-8 border border-[#DCDAD2] bg-white/40 backdrop-blur-md rounded-3xl hover:border-[#E34A27]/60 hover:bg-white/80 transition-all duration-500 shadow-sm flex-1 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-6 md:mb-8 relative z-10">
                    <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#595959]">WhatsApp</p>
                    <div className="w-10 h-10 rounded-full border border-[#DCDAD2] group-hover:border-[#E34A27] group-hover:bg-[#E34A27] flex items-center justify-center transition-all duration-500 flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#595959] group-hover:text-white transition-colors duration-300"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <p className="font-display text-2xl sm:text-xl lg:text-2xl font-black tracking-tighter text-[#1C1C1C] group-hover:text-[#E34A27] transition-colors duration-300">+91 90000 00000</p>
                  </div>
                  <div className="absolute -bottom-6 -right-2 text-[#1C1C1C]/[0.03] group-hover:text-[#E34A27]/[0.05] transition-colors duration-500 font-display font-black text-9xl pointer-events-none select-none">W</div>
                </a>
              </div>
            </div>
            
            <form data-reveal="true" data-testid="contact-form" className="md:col-span-6 md:col-start-7 flex flex-col gap-8 sm:gap-10 bg-[#1C1C1C]/85 backdrop-blur-2xl border border-[#1C1C1C]/10 rounded-3xl p-8 sm:p-10 md:p-12 shadow-[0_20px_50px_rgba(28,28,28,0.15)] relative overflow-hidden mt-6 md:mt-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#E34A27] rounded-full mix-blend-screen filter blur-[100px] opacity-10 pointer-events-none" />
              
              <div className="relative z-10"><label htmlFor="c-name" className="block font-mono text-[10px] tracking-[0.3em] uppercase text-white/50 mb-3">Your name</label><input id="c-name" data-testid="contact-name-input" type="text" placeholder="Jane Smith" className="w-full bg-transparent border-b-2 border-white/10 focus:border-[#E34A27] outline-none pb-3 font-display text-2xl font-black tracking-tighter text-[#FAF9F6] placeholder:text-white/20 transition-colors duration-300 rounded-none" /></div>
              <div className="relative z-10"><label htmlFor="c-email" className="block font-mono text-[10px] tracking-[0.3em] uppercase text-white/50 mb-3">Email</label><input id="c-email" data-testid="contact-email-input" type="email" placeholder="jane@company.com" className="w-full bg-transparent border-b-2 border-white/10 focus:border-[#E34A27] outline-none pb-3 font-display text-2xl font-black tracking-tighter text-[#FAF9F6] placeholder:text-white/20 transition-colors duration-300 rounded-none" /></div>
              <div className="relative z-10"><label htmlFor="c-message" className="block font-mono text-[10px] tracking-[0.3em] uppercase text-white/50 mb-3">What&apos;s the question?</label><textarea id="c-message" rows={3} data-testid="contact-message-input" placeholder="We&apos;re thinking about..." className="w-full bg-transparent border-b-2 border-white/10 focus:border-[#E34A27] outline-none pb-3 font-body text-lg text-[#FAF9F6] placeholder:text-white/20 transition-colors duration-300 resize-none rounded-none" /></div>
              
              <div className="flex items-center justify-end pt-4 z-10 relative">
                <button type="submit" data-testid="contact-submit-btn" className="group inline-flex items-center gap-3">
                  <span className="relative font-display font-black text-2xl sm:text-3xl tracking-tighter text-[#FAF9F6] whitespace-nowrap">
                    Send question
                    <span className="absolute -bottom-1 left-0 h-[2px] bg-[#E34A27] w-0 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  </span>
                  <span className="text-[#E34A27] font-display font-black text-2xl sm:text-3xl transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>







      <footer data-testid="site-footer" className="border-t border-[#DCDAD2] px-6 md:px-16 pt-12 pb-8 overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto flex flex-col items-center md:items-start">
          
          <div className="w-full flex flex-col items-start gap-6 md:gap-8 mb-8 md:mb-12">
            <div className="flex items-center gap-3">
              <Image src="/Edhe_logo_transparent.png" alt="Edhe Studio" width={40} height={40} className="w-8 h-8 object-contain" />
              <span className="font-display text-2xl font-black tracking-tighter text-[#1C1C1C]">Edhe</span>
            </div>
            
            <ul className="flex flex-wrap gap-6 md:gap-8 font-display font-bold text-lg md:text-xl text-[#1C1C1C]">
              <li>
                <a href="#" className="relative group transition-colors inline-block">
                  <span className="relative z-10 group-hover:text-[#E34A27] transition-colors duration-300">Twitter (X)</span>
                  <span className="absolute -bottom-1 left-0 h-[2px] bg-[#E34A27] w-0 group-hover:w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </a>
              </li>
              <li>
                <a href="#" className="relative group transition-colors inline-block">
                  <span className="relative z-10 group-hover:text-[#E34A27] transition-colors duration-300">Instagram</span>
                  <span className="absolute -bottom-1 left-0 h-[2px] bg-[#E34A27] w-0 group-hover:w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </a>
              </li>
              <li>
                <a href="#" className="relative group transition-colors inline-block">
                  <span className="relative z-10 group-hover:text-[#E34A27] transition-colors duration-300">LinkedIn</span>
                  <span className="absolute -bottom-1 left-0 h-[2px] bg-[#E34A27] w-0 group-hover:w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </a>
              </li>
            </ul>
          </div>
          
          <div className="w-full flex justify-center mb-6">
            <h2 className="font-display font-black text-transparent [-webkit-text-stroke:1px_rgba(28,28,28,0.2)] md:[-webkit-text-stroke:2px_rgba(28,28,28,0.15)] text-[32vw] md:text-[30vw] leading-[0.75] tracking-normal md:tracking-[75px] select-none pointer-events-none">EDHE</h2>
          </div>
          
          <div className="w-full flex justify-center border-t border-[#1C1C1C]/10 pt-6 mt-2">
             <p className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-[#595959] text-center">© 2026 Edhe Studio. Built with curiosity.</p>
          </div>
          
        </div>
      </footer>
    </main>
  );
}
