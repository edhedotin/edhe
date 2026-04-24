"use client";

import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";
import useReveal from "@/lib/useReveal";
import { useState } from "react";

const channels = [
  { label: "Email", value: "hello@edhe.in", icon: "✉" },
  { label: "WhatsApp", value: "+91 9876543210", icon: "◎" },
  { label: "Instagram", value: "@edhe.studio", icon: "◈" },
];

const services = ["Web Development","App Development","UI / UX Design","Product Mockups","Canvas Designing","WhatsApp Automations","Not sure yet"];
const budgets  = ["< ₹50K","₹50K – ₹1L","₹1L – ₹5L","₹5L +","Let's discuss"];

export default function ContactPage() {
  const pageRef = useReveal() as React.RefObject<HTMLDivElement>;
  const [selected, setSelected] = useState<string[]>([]);
  const [budget,   setBudget]   = useState("");
  const [sent,     setSent]     = useState(false);

  const toggleService = (s: string) =>
    setSelected(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main ref={pageRef} className="min-h-screen bg-[#1C1C1C] text-[#FAF9F6] overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex flex-col justify-end px-6 md:px-16 pt-40 pb-20 overflow-hidden">
        <span aria-hidden className="pointer-events-none select-none absolute right-[-3vw] top-[5%] font-display font-black text-[55vw] leading-none text-white/[0.03]">?</span>
        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          <p className="reveal font-mono text-[11px] tracking-[0.4em] uppercase text-[#E34A27] mb-8">Start a Project</p>
          <h1 className="reveal font-display font-black tracking-tighter leading-[0.85] text-[#FAF9F6] text-[16vw] sm:text-[12vw] lg:text-[10vw] -ml-1 mb-10" style={{transitionDelay:"0.1s"}}>
            Let&apos;s build<br /><span className="text-transparent [-webkit-text-stroke:2px_#FAF9F6]">something.</span>
          </h1>
          <p className="reveal font-body text-xl text-white/50 max-w-lg leading-relaxed" style={{transitionDelay:"0.2s"}}>
            Tell us about your project. We read every message personally and respond within 24 hours.
          </p>
        </div>
      </section>

      {/* ── FORM + SIDEBAR ── */}
      <section className="px-6 md:px-16 pb-24">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-16">

          {/* Contact channels */}
          <div className="md:col-span-3 reveal flex flex-col gap-10 pt-4">
            <div>
              <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-white/30 mb-6">Find us at</p>
              <div className="flex flex-col gap-5">
                {channels.map(c => (
                  <div key={c.label} className="group flex flex-col gap-1">
                    <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/30">{c.label}</span>
                    <span className="font-display font-black text-lg tracking-tighter text-white/80 group-hover:text-[#E34A27] transition-colors duration-300">{c.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability pill */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-full border border-[#E34A27]/30 bg-[#E34A27]/5 w-fit">
              <div className="w-2 h-2 rounded-full bg-[#E34A27] animate-ping" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#E34A27]">Available for work</span>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-8 md:col-start-5 reveal" style={{transitionDelay:"0.15s"}}>
            {sent ? (
              <div className="flex flex-col items-center justify-center min-h-[500px] text-center gap-6">
                <span className="text-8xl">✦</span>
                <h2 className="font-display font-black text-5xl tracking-tighter text-[#FAF9F6]">Message received.</h2>
                <p className="font-body text-lg text-white/50 max-w-sm">We&apos;ll be back with you within 24 hours. In the meantime, enjoy the silence.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">

                {/* Name + Email row */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30">Your Name</label>
                    <input required type="text" placeholder="Jane Smith" className="bg-transparent border-b-2 border-white/20 focus:border-[#E34A27] text-white font-body text-lg py-3 outline-none transition-colors duration-300 placeholder:text-white/20" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30">Email</label>
                    <input required type="email" placeholder="jane@company.com" className="bg-transparent border-b-2 border-white/20 focus:border-[#E34A27] text-white font-body text-lg py-3 outline-none transition-colors duration-300 placeholder:text-white/20" />
                  </div>
                </div>

                {/* Service picker */}
                <div className="flex flex-col gap-3">
                  <label className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30">What do you need? <span className="text-white/15">(pick all that apply)</span></label>
                  <div className="flex flex-wrap gap-2">
                    {services.map(s => (
                      <button key={s} type="button" onClick={() => toggleService(s)}
                        className={`px-4 py-2 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase border transition-all duration-300 ${selected.includes(s) ? "bg-[#E34A27] border-[#E34A27] text-white" : "border-white/20 text-white/50 hover:border-white/40"}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div className="flex flex-col gap-3">
                  <label className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30">Budget range</label>
                  <div className="flex flex-wrap gap-2">
                    {budgets.map(b => (
                      <button key={b} type="button" onClick={() => setBudget(b)}
                        className={`px-4 py-2 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase border transition-all duration-300 ${budget === b ? "bg-white border-white text-[#1C1C1C]" : "border-white/20 text-white/50 hover:border-white/40"}`}>
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30">Tell us about your project</label>
                  <textarea required rows={5} placeholder="We're building a platform that..." className="bg-transparent border-b-2 border-white/20 focus:border-[#E34A27] text-white font-body text-lg py-3 outline-none resize-none transition-colors duration-300 placeholder:text-white/20" />
                </div>

                {/* Submit */}
                <div className="flex items-center gap-6 pt-4">
                  <button type="submit" className="group inline-flex items-center gap-3">
                    <span className="relative font-display font-black text-2xl md:text-3xl tracking-tighter text-[#FAF9F6]">
                      Send message
                      <span className="absolute -bottom-1 left-0 h-[2px] bg-[#E34A27] w-0 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    </span>
                    <span className="text-[#E34A27] text-3xl transition-transform duration-300 group-hover:translate-x-2">→</span>
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>
      </section>

      <div className="bg-[#FAF9F6]"><PageFooter /></div>
    </main>
  );
}
