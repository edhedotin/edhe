"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/* ── SVG Icons for each service ── */
const ServiceIcons: Record<string, React.ReactNode> = {
  web: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round"/>
    </svg>
  ),
  app: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <rect x="7" y="2" width="10" height="20" rx="2"/><line x1="11" y1="18" x2="13" y2="18"/>
    </svg>
  ),
  ui: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
    </svg>
  ),
  mockups: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  canvas: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10c-1.85 0-3.58-.5-5.06-1.38" strokeLinecap="round"/>
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
  ),
};

const services = [
  { id: "web",      num: "01", label: "Web Development",      href: "/web-development",      description: "Performant, editorial sites that scale without apology." },
  { id: "app",      num: "02", label: "App Development",      href: "/app-development",      description: "Native-quality cross-platform apps with obsessive attention to feel." },
  { id: "ui",       num: "03", label: "UI / UX Design",       href: "/ui-ux-design",         description: "Interfaces that read like literature — calm hierarchy, zero noise." },
  { id: "mockups",  num: "04", label: "Product Mockups",      href: "/product-mockups",      description: "Presentation-ready renders that make investors lean in." },
  { id: "canvas",   num: "05", label: "Canvas Designing",     href: "/canvas-designing",     description: "Brand-aligned print & large-format canvases for campaigns." },
  { id: "whatsapp", num: "06", label: "WhatsApp Automations", href: "/whatsapp-automations", description: "Conversational bots that sell, support, and never sound robotic." },
];

const topLinks = [
  { label: "About",   href: "/about"   },
  { label: "Work",    href: "/work"    },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [scrolled,   setScrolled]     = useState(false);
  const [visible,    setVisible]      = useState(true);
  const [megaOpen,   setMegaOpen]     = useState(false);
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setMobileOpen(false); setMegaOpen(false); }, [pathname]);

  useEffect(() => {
    let last = window.scrollY;
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setVisible(y <= 100 || y <= last);
      last = y;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const openMega  = () => { if (megaTimer.current) clearTimeout(megaTimer.current); setMegaOpen(true); };
  const closeMega = () => { megaTimer.current = setTimeout(() => setMegaOpen(false), 200); };

  const navLink = "relative font-mono text-[12px] tracking-[0.18em] uppercase font-bold text-[#1C1C1C] hover:text-[#E34A27] transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#E34A27] hover:after:w-full after:transition-all after:duration-300";

  return (
    <>
      {/* ─── Single fixed wrapper — pill + mega menu share same stacking context ─── */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        {/* ── Pill Navbar ── */}
        <div className={`flex justify-center px-4 md:px-8 pointer-events-none ${scrolled ? "pt-3" : "pt-4"}`}>
          <nav
            style={{ height: 52 }}
            className={`pointer-events-auto w-full max-w-[1100px] flex items-center justify-between px-5 md:px-6 rounded-full border transition-all duration-500 ${
              scrolled
                ? "border-[#1C1C1C]/15 bg-[#FAF9F6]/88 backdrop-blur-2xl shadow-[0_8px_32px_rgba(28,28,28,0.14)]"
                : "border-[#1C1C1C]/10 bg-[#FAF9F6]/70 backdrop-blur-xl shadow-[0_4px_20px_rgba(28,28,28,0.08)]"
            }`}
            data-testid="edhe-navbar"
          >
            {/* Logo */}
            <Link href="/" data-testid="logo-link" className="flex items-center gap-2 flex-shrink-0">
              <Image src="/Edhe_logo_transparent.png" alt="Edhe" width={32} height={32} className="h-7 w-7 object-contain" priority />
              <span className="font-display text-xl font-black tracking-tighter text-[#1C1C1C]">Edhe</span>
            </Link>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              <li onMouseEnter={openMega} onMouseLeave={closeMega}>
                <button className={navLink} aria-expanded={megaOpen}>Services</button>
              </li>
              {topLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className={navLink} data-testid={`nav-link-${l.label.toLowerCase()}`}>{l.label}</Link>
                </li>
              ))}
            </ul>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-3">
              {/* Desktop CTA */}
              <Link href="/contact" className="hidden md:block" data-testid="nav-cta-btn">
                <div className="group border border-[#1C1C1C]/25 bg-[#FAF9F6]/20 cursor-pointer p-0.5 h-9 rounded-full hover:scale-105 transition-transform duration-300 overflow-hidden">
                  <div className="relative flex items-center h-full rounded-full overflow-hidden">
                    <span className="pl-5 pr-11 font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-[#1C1C1C] whitespace-nowrap transition-opacity duration-300 group-hover:opacity-0">
                      Start Project
                    </span>
                    <div className="absolute inset-y-0 right-0 left-[calc(100%-34px)] group-hover:left-0 bg-[#E34A27] rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white flex-shrink-0">
                        <path d="M18.25 15.5a.75.75 0 0 1-.75-.75V7.56L7.28 17.78a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L16.44 6.5H9.25a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75Z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Hamburger */}
              <button
                className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-full border border-[#1C1C1C]/20 bg-[#FAF9F6]/60"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                data-testid="mobile-menu-toggle"
              >
                <span className={`block w-[15px] h-[2px] bg-[#1C1C1C] transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}/>
                <span className={`block w-[15px] h-[2px] bg-[#1C1C1C] transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}/>
                <span className={`block w-[15px] h-[2px] bg-[#1C1C1C] transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}/>
              </button>
            </div>
          </nav>
        </div>

        {/* ════════════════════════════════════════════
            MEGA MENU — sits in same fixed wrapper
        ════════════════════════════════════════════ */}
        <div
          className={`hidden md:block w-full px-4 md:px-8 pt-2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
            megaOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
          }`}
          onMouseEnter={openMega}
          onMouseLeave={closeMega}
        >
          {/* pointer-events ONLY when open — this prevents ghost hover on invisible panel */}
          <div className={`max-w-[1100px] mx-auto ${megaOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
            <div className="bg-black/70 backdrop-blur-2xl rounded-2xl border border-white/[0.1] shadow-[0_32px_80px_rgba(0,0,0,0.8)] overflow-hidden">
              <div className="flex" style={{ minHeight: 420 }}>

                {/* ── LEFT: Latest Work ── */}
                <div className="w-72 flex-shrink-0 border-r border-white/[0.08] p-7 flex flex-col gap-5">
                  <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/30">Latest Work</p>

                  <div className="relative rounded-xl overflow-hidden flex-shrink-0 group/img" style={{ aspectRatio: "4/3" }}>
                    <Image src="/proof/slate.png" alt="Slate" fill className="object-cover object-top" sizes="288px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl" />
                    <div className="absolute bottom-4 left-4">
                      <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/50 mb-1">Full Stack</p>
                      <p className="font-display font-black text-xl tracking-tighter text-white leading-none">Slate</p>
                    </div>
                  </div>

                  <p className="font-body text-sm text-white/40 leading-relaxed flex-1">
                    A full-stack real-time collaboration platform built with Next.js and Supabase.
                  </p>

                  <Link
                    href="/work"
                    className="group/wl relative inline-flex items-center gap-2 font-display font-black text-lg tracking-tighter text-white hover:text-[#E34A27] transition-colors duration-300"
                    onClick={() => setMegaOpen(false)}
                  >
                    <span className="relative">
                      View all work
                      <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-[#E34A27] group-hover/wl:w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    </span>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover/wl:translate-x-1">
                      <path d="M18.25 15.5a.75.75 0 0 1-.75-.75V7.56L7.28 17.78a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L16.44 6.5H9.25a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75Z"/>
                    </svg>
                  </Link>
                </div>

                {/* ── RIGHT: Services ── */}
                <div className="flex-1 p-7 flex flex-col">
                  <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/30 mb-6">What we do</p>

                  <div className="grid grid-cols-3 gap-3 flex-1">
                    {services.map(s => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="group/item flex flex-col gap-3 p-4 rounded-xl border border-white/[0.06] hover:border-[#E34A27]/40 hover:bg-[#E34A27]/[0.05] transition-all duration-250"
                        onClick={() => setMegaOpen(false)}
                      >
                        {/* Icon box */}
                        <div className="w-10 h-10 rounded-xl bg-white/[0.06] group-hover/item:bg-[#E34A27] flex items-center justify-center transition-all duration-250 text-[#E34A27] group-hover/item:text-white flex-shrink-0">
                          {ServiceIcons[s.id]}
                        </div>
                        <div>
                          <p className="font-display font-black text-base tracking-tighter text-white group-hover/item:text-[#E34A27] transition-colors duration-200 leading-snug mb-1">
                            {s.label}
                          </p>
                          <p className="font-body text-[12px] text-white/50 leading-relaxed">
                            {s.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between gap-4">
                    <p className="font-mono text-[11px] text-white/40 tracking-[0.15em] uppercase">Not sure which service fits?</p>
                    <Link
                      href="/contact"
                      onClick={() => setMegaOpen(false)}
                      className="group/cta relative inline-flex items-center gap-2 font-display font-black text-xl tracking-tighter text-[#E34A27] hover:text-white transition-colors duration-300 flex-shrink-0"
                    >
                      <span className="relative">
                        Let&apos;s figure it out
                        <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-white group-hover/cta:w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                      </span>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 transition-transform duration-300 group-hover/cta:translate-x-1">
                        <path d="M18.25 15.5a.75.75 0 0 1-.75-.75V7.56L7.28 17.78a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L16.44 6.5H9.25a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75Z"/>
                      </svg>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          MOBILE FULL-SCREEN MENU
      ════════════════════════════════════════════ */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-[#FAF9F6] flex flex-col overflow-y-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="flex flex-col px-6 pt-24 pb-12 gap-10">

          {/* Services section */}
          <div className={`transition-all duration-500 ${mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-[#E34A27] mb-5">Services</p>
            <div className="flex flex-col divide-y divide-[#DCDAD2]">
              {services.map(s => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group flex items-center justify-between py-4 hover:bg-[#FAF9F6] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-xl bg-[#1C1C1C]/5 group-hover:bg-[#E34A27] flex items-center justify-center text-[#1C1C1C] group-hover:text-white transition-all duration-300 flex-shrink-0">
                      {ServiceIcons[s.id]}
                    </div>
                    <span className="font-display font-black text-xl tracking-tighter text-[#1C1C1C] group-hover:text-[#E34A27] transition-colors">{s.label}</span>
                  </div>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#DCDAD2] group-hover:text-[#E34A27] group-hover:translate-x-1 transition-all flex-shrink-0">
                    <path d="M18.25 15.5a.75.75 0 0 1-.75-.75V7.56L7.28 17.78a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L16.44 6.5H9.25a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75Z"/>
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Top nav links */}
          <div className="flex flex-col gap-1">
            {topLinks.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className={`font-display font-black text-5xl tracking-tighter text-[#1C1C1C] hover:text-[#E34A27] transition-all duration-500 ${mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${(i + 1) * 70}ms` }}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className={`transition-all duration-500 delay-300 ${mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#1C1C1C] rounded-full text-white font-mono text-[12px] tracking-[0.25em] uppercase hover:bg-[#E34A27] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Start Project
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M18.25 15.5a.75.75 0 0 1-.75-.75V7.56L7.28 17.78a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L16.44 6.5H9.25a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75Z"/>
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
