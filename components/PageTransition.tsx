"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function PageTransition() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "cover" | "uncover">("idle");
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    // Skip very first mount
    if (prevPath.current === null) {
      prevPath.current = pathname;
      return;
    }
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    // Phase 1: panel slides IN covering the screen
    setPhase("cover");

    // Phase 2: after cover is fully in, uncover
    const timer = setTimeout(() => {
      setPhase("uncover");
      // Phase 3: reset after animation completes
      setTimeout(() => setPhase("idle"), 700);
    }, 650);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (phase === "idle") return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden"
    >
      {/* Dark sliding panel — 3 staggered strips for a premium multi-layer wipe */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 w-[34%] bg-[#1C1C1C]"
          style={{
            left: `${i * 33.3}%`,
            transform: phase === "cover" ? "translateY(0)" : "translateY(-102%)",
            transition: `transform 0.6s cubic-bezier(0.76,0,0.24,1)`,
            transitionDelay: phase === "cover"
              ? `${i * 60}ms`       // stagger in: left → right
              : `${(2 - i) * 60}ms`, // stagger out: right → left
          }}
        />
      ))}

      {/* Logo centered — only visible during "cover" phase */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10"
        style={{
          opacity: phase === "cover" ? 1 : 0,
          transition: "opacity 0.3s ease",
          transitionDelay: phase === "cover" ? "0.45s" : "0s",
        }}
      >
        <div
          className="w-12 h-12 relative"
          style={{
            animation: "float 2s ease-in-out infinite",
            filter: "drop-shadow(0 0 12px rgba(227,74,39,0.5))",
          }}
        >
          <Image
            src="/Edhe_logo_transparent.png"
            alt="Edhe"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-px w-8 bg-[#E34A27] animate-pulse" />
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">
            Loading
          </span>
          <div className="h-px w-8 bg-[#E34A27] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
