"use client";

import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";
import Marquee from "@/components/Marquee";
import Link from "next/link";
import useReveal from "@/lib/useReveal";

export interface ServicePageData {
  serviceNum:  string;
  serviceLabel: string;
  heroline1:   string;
  heroline2:   string;
  heroOutline: string;
  intro:       string;
  color:       string;
  what:        string[];
  process: { step: string; title: string; body: string }[];
  tech?:       string[];
  marqueeItems?: string[];
}

export default function ServicePageTemplate({ data }: { data: ServicePageData }) {
  const pageRef = useReveal() as React.RefObject<HTMLDivElement>;

  return (
    <main ref={pageRef} className="min-h-screen bg-[#FAF9F6] text-[#1C1C1C] overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-16 pt-40 pb-20 overflow-hidden">
        {/* Huge ghost letter */}
        <span aria-hidden className="pointer-events-none select-none absolute right-[-2vw] bottom-[5%] font-display font-black text-[50vw] leading-none text-[#1C1C1C]/[0.03]">
          {data.serviceNum.replace("S.", "")}
        </span>

        {/* Orange orb */}
        <div className="absolute top-32 right-16 w-64 h-64 rounded-full bg-[#E34A27] opacity-[0.06] blur-3xl pointer-events-none" />

        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          <p className="reveal font-mono text-[11px] tracking-[0.4em] uppercase text-[#E34A27] mb-8">
            {data.serviceNum} · {data.serviceLabel}
          </p>
          <h1 className="reveal font-display font-black tracking-tighter leading-[0.85] text-[#1C1C1C] text-[15vw] sm:text-[12vw] lg:text-[9.5vw] -ml-1 mb-10" style={{transitionDelay:"0.1s"}}>
            {data.heroline1}<br />
            {data.heroline2}<br />
            <span className="text-transparent [-webkit-text-stroke:2px_#1C1C1C]">{data.heroOutline}.</span>
          </h1>
          <p className="reveal font-body text-xl md:text-2xl text-[#595959] max-w-xl leading-relaxed" style={{transitionDelay:"0.2s"}}>
            {data.intro}
          </p>
        </div>

        {/* Scroll line */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-[#1C1C1C]" />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <Marquee items={data.marqueeItems ?? [data.serviceLabel, "Edhe Studio", "We Question", "We Build", "We Ship"]} />

      {/* ── WHAT WE BUILD — dark ── */}
      <section className="py-24 px-6 md:px-16 bg-[#1C1C1C] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#E34A27] opacity-[0.03] blur-3xl" />
        </div>
        <div className="max-w-[1400px] mx-auto">
          <p className="reveal font-mono text-[10px] tracking-[0.4em] uppercase text-white/30 mb-12">What we deliver</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-white/[0.07]">
            {data.what.map((item, i) => (
              <div key={item} className="reveal group bg-[#1C1C1C] p-8 hover:bg-white/[0.04] transition-all duration-300 flex items-start gap-4" style={{transitionDelay:`${i*0.06}s`}}>
                <span className="font-mono text-[10px] text-[#E34A27] mt-1 flex-shrink-0">0{i+1}</span>
                <span className="font-display font-black text-lg tracking-tighter text-[#FAF9F6] group-hover:text-[#E34A27] transition-colors duration-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-24 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <p className="reveal font-mono text-[10px] tracking-[0.4em] uppercase text-[#595959] mb-16">Our Process</p>
          <div className="flex flex-col divide-y divide-[#DCDAD2]">
            {data.process.map((p, i) => (
              <div key={p.step} className="reveal group grid md:grid-cols-12 gap-6 py-10 hover:bg-[#1C1C1C]/[0.02] transition-all duration-300 -mx-6 md:-mx-16 px-6 md:px-16" style={{transitionDelay:`${i*0.08}s`}}>
                <span className="md:col-span-1 font-mono text-[11px] tracking-[0.3em] text-[#E34A27] self-start mt-2">{p.step}</span>
                <h3 className="md:col-span-3 font-display font-black text-2xl md:text-3xl tracking-tighter text-[#1C1C1C] group-hover:text-[#E34A27] transition-colors duration-300 self-start">{p.title}</h3>
                <p className="md:col-span-7 font-body text-base md:text-lg text-[#595959] leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH ── */}
      {data.tech && data.tech.length > 0 && (
        <section className="py-16 px-6 md:px-16 border-t border-[#DCDAD2]">
          <div className="max-w-[1400px] mx-auto">
            <p className="reveal font-mono text-[10px] tracking-[0.4em] uppercase text-[#595959] mb-8">Tools & Stack</p>
            <div className="flex flex-wrap gap-3">
              {data.tech.map(t => (
                <span key={t} className="reveal font-mono text-[11px] tracking-[0.2em] uppercase px-5 py-2.5 border border-[#DCDAD2] rounded-full text-[#1C1C1C] hover:border-[#E34A27] hover:text-[#E34A27] transition-all duration-300 cursor-default">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-28 px-6 md:px-16 bg-[#1C1C1C] relative overflow-hidden">
        <span aria-hidden className="pointer-events-none select-none absolute -bottom-12 -right-6 font-display font-black text-[25vw] leading-none text-white/[0.025]">edhe</span>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <h2 className="reveal font-display font-black text-5xl md:text-7xl tracking-tighter text-[#FAF9F6] leading-[0.9] max-w-2xl">
            Ready to start?<br /><span className="text-[#E34A27]">Let&apos;s talk.</span>
          </h2>
          <Link href="/contact" className="group reveal inline-flex items-center gap-3 flex-shrink-0" style={{transitionDelay:"0.2s"}}>
            <span className="relative font-display font-black text-2xl md:text-3xl tracking-tighter text-[#FAF9F6]">
              Start the project
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
