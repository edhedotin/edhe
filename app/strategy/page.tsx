import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Strategy",
  description: "Roadmaps built to outlast the trend cycle. Digital strategy by Edhe Studio.",
};

export default function StrategyPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#1C1C1C]">
      <Navbar />
      <section className="pt-36 pb-20 px-6 md:px-16 max-w-[1400px] mx-auto">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#E34A27] mb-6">Service · Strategy</p>
        <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter text-[#1C1C1C] leading-[0.9] max-w-4xl mb-10">
          Direction<br />before<br />
          <span className="text-transparent [-webkit-text-stroke:2px_#1C1C1C]">execution.</span>
        </h1>
        <p className="font-body text-xl md:text-2xl text-[#595959] max-w-2xl leading-relaxed">
          Before we build anything, we ask if we should. Digital strategy sessions that clarify what you&apos;re building, who it&apos;s for, and whether the plan holds up under pressure.
        </p>
      </section>

      <section className="py-20 px-6 md:px-16 bg-[#1C1C1C]">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40 mb-12">What&apos;s included</p>
          <div className="grid md:grid-cols-3 gap-px bg-white/10">
            {["Product Strategy", "Competitive Positioning", "Go-to-Market Planning", "Audience Definition", "Digital Roadmapping", "Workshop Facilitation"].map((item) => (
              <div key={item} className="bg-[#1C1C1C] p-8 hover:bg-white/[0.03] transition-colors duration-300">
                <span className="font-display font-black text-xl tracking-tighter text-[#FAF9F6]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-16 bg-[#1C1C1C]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tighter text-[#FAF9F6] max-w-xl leading-[1.05]">Need a clearer direction?</h2>
          <Link href="/contact" className="group inline-flex items-center gap-3 px-8 py-4 bg-[#E34A27] rounded-full text-[#FAF9F6] font-mono text-[11px] tracking-[0.3em] uppercase hover:bg-white hover:text-[#1C1C1C] transition-all duration-300 flex-shrink-0">
            Book a strategy call
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 transition-transform group-hover:translate-x-1"><path d="M18.25 15.5a.75.75 0 0 1-.75-.75V7.56L7.28 17.78a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L16.44 6.5H9.25a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75Z" /></svg>
          </Link>
        </div>
      </section>
      <PageFooter />
    </main>
  );
}
