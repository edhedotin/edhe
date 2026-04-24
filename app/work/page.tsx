"use client";

import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";
import Marquee from "@/components/Marquee";
import Link from "next/link";
import Image from "next/image";
import useReveal from "@/lib/useReveal";

const projects = [
  { num: "001", name: "Slate",           category: "Full Stack · App",    year: "2026", description: "A full-stack real-time collaboration platform built with Next.js and Supabase.", tags: ["Next.js","Supabase","TypeScript"],  href: "https://slate-tau-eight.vercel.app/", live: true,  image: "/proof/slate.png" },
  { num: "002", name: "Kora Studio",     category: "Identity · App",      year: "2025", description: "Brand identity and cross-platform app for a boutique creative studio.", tags: ["Flutter","Figma","Branding"],         href: "#",   live: false, image: null },
  { num: "003", name: "Atlas Commerce",  category: "Product · Mockups",   year: "2025", description: "Product mockup system for a DTC e-commerce brand preparing for launch.", tags: ["Figma","Mockups","Branding"],         href: "#",   live: false, image: null },
  { num: "004", name: "Meridian",        category: "Editorial · Web",     year: "2024", description: "Editorial website for a content-first media platform with GSAP scroll scenes.", tags: ["Next.js","GSAP","Editorial"],      href: "#",   live: false, image: null },
];

export default function WorkPage() {
  const pageRef = useReveal() as React.RefObject<HTMLDivElement>;

  return (
    <main ref={pageRef} className="min-h-screen bg-[#FAF9F6] text-[#1C1C1C] overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex flex-col justify-end px-6 md:px-16 pt-40 pb-20 overflow-hidden">
        <span aria-hidden className="pointer-events-none select-none absolute left-[-3vw] top-[8%] font-display font-black text-[55vw] leading-none text-[#1C1C1C]/[0.03]">W</span>
        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          <p className="reveal font-mono text-[11px] tracking-[0.4em] uppercase text-[#E34A27] mb-8">Selected Work</p>
          <h1 className="reveal font-display font-black tracking-tighter leading-[0.85] text-[#1C1C1C] text-[18vw] sm:text-[14vw] lg:text-[11vw] -ml-1 mb-10" style={{transitionDelay:"0.1s"}}>
            Things<br /><span className="text-transparent [-webkit-text-stroke:3px_#1C1C1C]">we&apos;re proud of.</span>
          </h1>
          <p className="reveal font-body text-xl text-[#595959] max-w-lg leading-relaxed" style={{transitionDelay:"0.2s"}}>
            A curated selection of projects — not our biggest. Our best.
          </p>
        </div>
      </section>

      {/* ── PROJECT LIST ── */}
      <section className="pb-8 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto border-t border-[#DCDAD2]">
          {projects.map((p, i) => (
            <div key={p.num} className="reveal group border-b border-[#DCDAD2]" style={{transitionDelay:`${i*0.1}s`}}>
              <div className="grid md:grid-cols-12 gap-6 py-10 md:py-14 items-start hover:bg-[#1C1C1C]/[0.02] transition-colors duration-300 -mx-6 md:-mx-16 px-6 md:px-16">
                {/* Number */}
                <div className="md:col-span-1 hidden md:flex items-center">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-[#595959]">{p.num}</span>
                </div>

                {/* Image thumb — only if available */}
                <div className="md:col-span-2 hidden md:flex items-start">
                  {p.image ? (
                    <div className="relative w-full rounded-xl overflow-hidden" style={{aspectRatio:"4/3"}}>
                      <Image src={p.image} alt={p.name} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-700" sizes="180px" />
                    </div>
                  ) : (
                    <div className="w-full rounded-xl bg-[#1C1C1C]/5 flex items-center justify-center group-hover:bg-[#E34A27]/10 transition-colors duration-500" style={{aspectRatio:"4/3"}}>
                      <span className="font-display font-black text-3xl text-[#1C1C1C]/10 group-hover:text-[#E34A27]/20 transition-colors duration-500">{p.num}</span>
                    </div>
                  )}
                </div>

                {/* Name + desc */}
                <div className="md:col-span-4">
                  <h2 className="font-display font-black text-4xl md:text-5xl tracking-tighter text-[#1C1C1C] group-hover:text-[#E34A27] transition-colors duration-300 mb-3 leading-tight">{p.name}</h2>
                  <p className="font-body text-sm text-[#595959] leading-relaxed max-w-xs">{p.description}</p>
                </div>

                {/* Meta */}
                <div className="md:col-span-3 flex flex-col gap-3 md:pt-2">
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#595959]">{p.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map(t => (
                      <span key={t} className="font-mono text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 border border-[#DCDAD2] rounded-full text-[#595959] group-hover:border-[#E34A27]/30 transition-colors">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Year + arrow */}
                <div className="md:col-span-2 flex flex-col gap-3 md:items-end md:pt-2">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-[#595959]">{p.year}</span>
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-[9px] tracking-[0.25em] uppercase px-3 py-1 rounded-full border ${p.live ? "border-[#E34A27]/40 text-[#E34A27] bg-[#E34A27]/5" : "border-[#DCDAD2] text-[#595959]"}`}>
                      {p.live ? "Live" : "Case Study Soon"}
                    </span>
                    {p.live && (
                      <div className="w-9 h-9 rounded-full border border-[#DCDAD2] group-hover:border-[#E34A27] group-hover:bg-[#E34A27] flex items-center justify-center transition-all duration-300 flex-shrink-0">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#595959] group-hover:text-white transition-colors">
                          <path d="M18.25 15.5a.75.75 0 0 1-.75-.75V7.56L7.28 17.78a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L16.44 6.5H9.25a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75Z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Marquee items={["Your project could be next", "Let's build it", "Start a conversation", "We answer every brief"]} />

      {/* ── CTA ── */}
      <section className="py-28 px-6 md:px-16 bg-[#1C1C1C] relative overflow-hidden">
        <span aria-hidden className="pointer-events-none select-none absolute -bottom-12 -right-6 font-display font-black text-[30vw] leading-none text-white/[0.03]">next?</span>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <h2 className="reveal font-display font-black text-5xl md:text-7xl tracking-tighter text-[#FAF9F6] leading-[0.9] max-w-2xl">
            Your project<br /><span className="text-[#E34A27]">could be next.</span>
          </h2>
          <Link href="/contact" className="group reveal inline-flex items-center gap-3 flex-shrink-0" style={{transitionDelay:"0.2s"}}>
            <span className="relative font-display font-black text-2xl md:text-3xl tracking-tighter text-[#FAF9F6]">
              Start a project
              <span className="absolute -bottom-1 left-0 h-[2px] bg-[#E34A27] w-0 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </span>
            <span className="text-[#E34A27] text-3xl transition-transform duration-300 group-hover:translate-x-2">→</span>
          </Link>
        </div>
      </section>

      <PageFooter />
    </main>
  );
}
