"use client";

import { useEffect } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  useEffect(() => {
    // Prevent body scrolling while preloader is active
    document.body.style.overflow = "hidden";

    // Just act as a 2 second timer, while the particles assemble
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        window.dispatchEvent(new Event("resize"));
        onComplete();
      }
    });

    tl.to({}, { duration: 2 });

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, [onComplete]);

  // Completely transparent, just blocks interaction
  return (
    <div className="fixed inset-0 z-50 bg-transparent" />
  );
}
