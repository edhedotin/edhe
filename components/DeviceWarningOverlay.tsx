"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function DeviceWarningOverlay() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[9999] hidden md:flex lg:hidden flex-col items-center justify-center bg-[#1C1C1C] text-[#FAF9F6] p-8 text-center overflow-hidden">
      
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(#FAF9F6 1px, transparent 1px), linear-gradient(90deg, #FAF9F6 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Giant Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <h1 className="font-display font-black text-transparent [-webkit-text-stroke:2px_rgba(250,249,246,0.06)] text-[40vw] tracking-tighter leading-none whitespace-nowrap animate-[flicker_4s_linear_infinite]">
          SORRY
        </h1>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10 max-w-lg animate-[fadeIn_0.8s_ease-out]">
        
        {/* Animated Logo & Text */}
        <div className="flex items-center gap-4 mb-2 animate-[float_4s_ease-in-out_infinite] drop-shadow-[0_0_15px_rgba(227,74,39,0.4)]">
          <div className="w-14 h-14 relative">
            <Image 
              src="/Edhe_logo_transparent.png" 
              alt="Edhe Studio" 
              fill 
              className="object-contain" 
            />
          </div>
          <span className="font-display text-4xl font-black tracking-tighter text-[#FAF9F6]">Edhe</span>
        </div>
        
        <div className="flex flex-col gap-6 items-center">
          <p className="font-mono text-xs tracking-[0.4em] uppercase text-[#E34A27]">
            Resolution Unsupported
          </p>
          
          <h2 className="font-display font-black text-4xl sm:text-5xl tracking-tighter leading-tight text-white">
            We don't compromise<br/>on experience.
          </h2>
          
          <p className="font-body text-[#FAF9F6]/70 text-lg sm:text-xl leading-relaxed max-w-[400px]">
            This canvas is explicitly crafted for extreme dimensions. 
            <span className="marker-highlight text-white font-medium"> Please view</span> this site on a <span className="marker-highlight text-white font-bold">Mobile Phone</span> or a full <span className="marker-highlight text-white font-bold">Desktop Screen</span>.
          </p>
        </div>
        
      </div>
    </div>
  );
}
