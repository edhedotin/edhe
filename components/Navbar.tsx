"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const links = [
  { label: "Vision",    href: "#vision"   },
  { label: "Services",  href: "#services" },
  { label: "Process",   href: "#process"  },
  { label: "Projects",  href: "#projects" },
  { label: "Contact",   href: "#contact"  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Tighten the pill shadow as user scrolls and hide on scroll down
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);

      // Hide navbar when scrolling down past 100px, show when scrolling up
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Floating pill navbar ── */}
      <header
        data-testid="edhe-navbar"
        className={`fixed top-0 left-0 w-full z-50 flex justify-center px-4 md:px-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
          scrolled ? "pt-3" : "pt-4"
        } ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-[150%] opacity-0"}`}
      >
        <nav
          className={`pointer-events-auto w-full max-w-[1100px] flex items-center justify-between px-4 md:px-5 h-12 md:h-14 rounded-full border transition-all duration-500 ${
            scrolled
              ? "border-[#1C1C1C]/12 bg-[#FAF9F6]/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(28,28,28,0.12)]"
              : "border-[#1C1C1C]/10 bg-[#FAF9F6]/60 backdrop-blur-xl shadow-[0_4px_20px_rgba(28,28,28,0.06)]"
          }`}
        >
          {/* Logo */}
          <Link
            href="#top"
            data-testid="logo-link"
            className="flex items-center gap-2 flex-shrink-0"
          >
            <Image
              src="/Edhe_logo_transparent.png"
              alt="Edhe Studio"
              width={36}
              height={36}
              className="h-7 w-7 object-contain"
              priority
            />
            <span className="font-display text-lg md:text-xl font-black tracking-tighter text-[#1C1C1C]">
              Edhe
            </span>
          </Link>

          {/* Nav links */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-1/2 -translate-x-1/2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-testid={`nav-link-${link.label.toLowerCase()}`}
                  className="relative font-mono text-[10px] tracking-[0.25em] uppercase text-[#595959] hover:text-[#E34A27] transition-colors duration-200 after:absolute after:bottom-[-3px] after:left-0 after:h-px after:w-0 after:bg-[#E34A27] hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* ── Pill CTA button — arrow fills on hover ── */}
            <Link
              href="#contact"
              data-testid="nav-cta-btn"
              className="hidden md:block"
            >
              <div className="group border border-[#1C1C1C]/30 bg-[#FAF9F6]/20 backdrop-blur-xl cursor-pointer p-0.5 h-9 lg:h-10 rounded-full hover:scale-105 duration-300 transition-transform overflow-hidden">
                <div className="relative flex items-center h-full rounded-full overflow-hidden">
                  {/* Label — fades out on hover */}
                  <span className="pl-4 lg:pl-5 pr-12 font-mono text-[10px] tracking-[0.2em] uppercase text-[#1C1C1C] whitespace-nowrap transition-opacity duration-300 group-hover:opacity-0">
                    Start Project
                  </span>
                  {/* Orange fill — starts as small circle on right, expands left to fill pill on hover */}
                  <div className="absolute inset-y-0 right-0 left-[calc(100%-36px)] group-hover:left-0 bg-[#E34A27] rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 text-[#FAF9F6] flex-shrink-0"
                    >
                      <path d="M18.25 15.5a.75.75 0 0 1-.75-.75V7.56L7.28 17.78a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L16.44 6.5H9.25a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Mobile hamburger */}
            <button
              data-testid="mobile-menu-toggle"
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-full border border-[#1C1C1C]/20 bg-[#FAF9F6]/40 backdrop-blur-sm"
              aria-label="Toggle menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span
                className={`block w-4 h-px bg-[#1C1C1C] transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-[6px]" : ""
                }`}
              />
              <span
                className={`block w-4 h-px bg-[#1C1C1C] transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-4 h-px bg-[#1C1C1C] transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""
                }`}
              />
            </button>
          </div>
        </nav>

      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-[#FAF9F6] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-center px-6 ${
          mobileMenuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-8 items-center text-center">
          {links.map((link, idx) => (
            <li key={link.href} style={{ transitionDelay: `${idx * 50}ms` }} className={`transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Link
                href={link.href}
                data-testid={`nav-link-${link.label.toLowerCase()}-mobile`}
                className="font-display font-black text-5xl tracking-tighter text-[#1C1C1C] hover:text-[#E34A27] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className={`mt-8 transition-all duration-500 delay-300 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#1C1C1C] rounded-full text-[#FAF9F6] font-mono text-[12px] tracking-[0.25em] uppercase hover:bg-[#E34A27] transition-colors shadow-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Start Project
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M18.25 15.5a.75.75 0 0 1-.75-.75V7.56L7.28 17.78a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L16.44 6.5H9.25a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75Z" />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
