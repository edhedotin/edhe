"use client";
import Link from "next/link";
import Image from "next/image";

export default function PageFooter() {
  return (
    <footer className="border-t border-[#DCDAD2] px-6 md:px-16 pt-12 pb-8 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center md:items-start">
        <div className="w-full flex flex-col items-start gap-6 md:gap-8 mb-8 md:mb-12">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/Edhe_logo_transparent.png" alt="Edhe Studio" width={40} height={40} className="w-8 h-8 object-contain" />
            <span className="font-display text-2xl font-black tracking-tighter text-[#1C1C1C]">Edhe</span>
          </Link>
          <ul className="flex flex-wrap gap-6 md:gap-8 font-display font-bold text-lg md:text-xl text-[#1C1C1C]">
            {["Twitter (X)", "Instagram", "LinkedIn"].map((s) => (
              <li key={s}>
                <a href="#" className="relative group transition-colors inline-block">
                  <span className="relative z-10 group-hover:text-[#E34A27] transition-colors duration-300">{s}</span>
                  <span className="absolute -bottom-1 left-0 h-[2px] bg-[#E34A27] w-0 group-hover:w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full flex justify-center mb-6">
          <h2 className="font-display font-black text-transparent [-webkit-text-stroke:1px_rgba(28,28,28,0.2)] md:[-webkit-text-stroke:2px_rgba(28,28,28,0.15)] text-[32vw] md:text-[30vw] leading-[0.75] tracking-normal md:tracking-[75px] select-none pointer-events-none">
            EDHE
          </h2>
        </div>
        <div className="w-full flex justify-center border-t border-[#1C1C1C]/10 pt-6 mt-2">
          <p className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-[#595959] text-center">
            © 2026 Edhe Studio. Built with curiosity.
          </p>
        </div>
      </div>
    </footer>
  );
}
