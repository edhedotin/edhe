"use client";

import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";
import Marquee from "@/components/Marquee";
import Link from "next/link";
import useReveal from "@/lib/useReveal";

const values = [
  { num: "01", title: "Obsessive Detail",    body: "We believe the 2% that most people overlook is where 80% of the impression lives. Every kerning choice, every hover state, every transition curve is deliberate." },
  { num: "02", title: "Craft Over Speed",    body: "We build deliberately, test relentlessly, and release only when we're proud. Not every project takes long — but every project is taken seriously." },
  { num: "03", title: "Questions First",     body: "We ask \"why?\" before \"how?\". If the brief doesn't make sense, we say so. An uncomfortable truth upfront beats a comfortable failure at the end." },
  { num: "04", title: "Partners, Not Vendors", body: "We don't hand off deliverables and disappear. We become genuinely invested in your outcome. Your metrics become our design constraints." },
];

const stats = [
  { number: "6+",   label: "Years of craft" },
  { number: "40+",  label: "Projects shipped" },
  { number: "100%", label: "Client satisfaction" },
  { number: "∞",    label: "Questions asked" },
];

export default function AboutPage() {
  const pageRef = useReveal() as React.RefObject<HTMLDivElement>;

  return (
    <main ref={pageRef} className="min-h-screen bg-[#FAF9F6] text-[#1C1C1C] overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-16 pt-40 pb-16 overflow-hidden">
        {/* Giant background "?" */}
        <span aria-hidden className="pointer-events-none select-none absolute right-[-2vw] top-[10%] font-display font-black text-[50vw] leading-none text-[#1C1C1C]/[0.03] z-0">?</span>

        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          <p className="reveal font-mono text-[11px] tracking-[0.4em] uppercase text-[#E34A27] mb-8">About the Studio</p>
          <h1 className="reveal font-display font-black tracking-tighter leading-[0.85] text-[#1C1C1C] text-[18vw] sm:text-[15vw] lg:text-[12vw] -ml-1 mb-10" style={{transitionDelay:"0.1s"}}>
            We<br /><span className="text-transparent [-webkit-text-stroke:3px_#1C1C1C]">question.</span>
          </h1>
          <p className="reveal font-body text-xl md:text-2xl text-[#595959] max-w-xl leading-relaxed" style={{transitionDelay:"0.2s"}}>
            Edhe is a digital studio where every project starts with a question — not <em>what</em> to build, but <em>why</em> it should exist, and <em>how</em> it could make someone stop and look twice.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-[#1C1C1C]">Scroll</span>
          <div className="w-px h-10 bg-[#1C1C1C] animate-[fadeUp_2s_ease_infinite]" />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <Marquee items={["Web Development", "App Development", "UI / UX Design", "Canvas Designing", "Product Mockups", "WhatsApp Automations"]} />

      {/* ── MANIFESTO ── */}
      <section className="bg-[#1C1C1C] py-28 px-6 md:px-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#E34A27] opacity-[0.04] blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#E34A27] opacity-[0.04] blur-3xl" />
        </div>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-7 reveal">
              <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#E34A27] mb-8">Our Manifesto</p>
              <blockquote className="font-display font-black text-4xl md:text-6xl lg:text-7xl tracking-tighter text-[#FAF9F6] leading-[0.9]">
                "Good design doesn't shout. It whispers things<br className="hidden md:block" />{" "}
                <span className="text-[#E34A27]">that stay</span> with you."
              </blockquote>
            </div>
            <div className="md:col-span-4 md:col-start-9 flex flex-col gap-6 reveal" style={{transitionDelay:"0.15s"}}>
              <p className="font-body text-lg text-white/50 leading-relaxed">
                We started Edhe because we were tired of studios that traded craft for speed. A small, focused team with a shared obsession for quality can outperform agencies ten times its size.
              </p>
              <p className="font-body text-lg text-white/50 leading-relaxed">
                We work with founders, product teams, and brands who care deeply about how they show up — and want a studio that cares just as much.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-24 px-6 md:px-16 border-b border-[#DCDAD2]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-[#DCDAD2]">
          {stats.map((s, i) => (
            <div key={s.label} className="reveal bg-[#FAF9F6] py-12 px-8 flex flex-col gap-2 group hover:bg-[#1C1C1C] transition-colors duration-500" style={{transitionDelay:`${i*0.07}s`}}>
              <span className="font-display font-black text-6xl md:text-7xl tracking-tighter text-[#E34A27] leading-none">{s.number}</span>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#595959] group-hover:text-white/50 transition-colors duration-500">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-24 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <p className="reveal font-mono text-[11px] tracking-[0.4em] uppercase text-[#595959] mb-16">Principles We Live By</p>
          <div className="flex flex-col divide-y divide-[#DCDAD2]">
            {values.map((v, i) => (
              <div key={v.num} className="reveal group grid md:grid-cols-12 gap-6 py-10 hover:bg-[#1C1C1C]/[0.02] transition-colors duration-300 -mx-6 md:-mx-16 px-6 md:px-16" style={{transitionDelay:`${i*0.08}s`}}>
                <span className="md:col-span-1 font-mono text-[11px] tracking-[0.3em] text-[#E34A27] self-start mt-2">{v.num}</span>
                <h3 className="md:col-span-3 font-display font-black text-2xl md:text-3xl tracking-tighter text-[#1C1C1C] group-hover:text-[#E34A27] transition-colors duration-300 self-start">{v.title}</h3>
                <p className="md:col-span-7 font-body text-base md:text-lg text-[#595959] leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-6 md:px-16 bg-[#1C1C1C] relative overflow-hidden">
        <span aria-hidden className="pointer-events-none select-none absolute -bottom-12 -right-6 font-display font-black text-[30vw] leading-none text-white/[0.03]">edhe</span>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <h2 className="reveal font-display font-black text-5xl md:text-7xl tracking-tighter text-[#FAF9F6] leading-[0.9] max-w-2xl">
            Ready to build something that <span className="text-[#E34A27]">means something?</span>
          </h2>
          <Link href="/contact" className="group reveal inline-flex items-center gap-3 flex-shrink-0" style={{transitionDelay:"0.2s"}}>
            <span className="relative font-display font-black text-2xl md:text-3xl tracking-tighter text-[#FAF9F6]">
              Start a conversation
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
