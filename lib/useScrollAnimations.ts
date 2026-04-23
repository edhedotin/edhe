"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollAnimations() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis();

    lenis.on("scroll", (e: any) => {
      ScrollTrigger.update();
      (window as any).__edheScroll = e.progress;
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Get all reveal elements with data-speed attributes
    const reveals = document.querySelectorAll("[data-reveal='true']") as NodeListOf<HTMLElement>;

    reveals.forEach((element) => {
      const speedStr = element.getAttribute("data-speed");
      const speed = speedStr ? parseFloat(speedStr) : 0;
      const dir = element.getAttribute("data-reveal-dir");

      // Set initial properties based on direction
      let startProps: any = { opacity: 0 };
      if (dir === "left") {
        startProps.x = -80;
      } else if (dir === "right") {
        startProps.x = 80;
      } else if (dir === "scale") {
        startProps.scale = 0.85;
        startProps.y = 30;
      } else if (dir === "up") {
        startProps.y = 80;
      } else {
        startProps.y = 60; // default
      }

      // Create scroll trigger animation
      gsap.fromTo(
        element,
        startProps,
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1.2,
          delay: Math.abs(speed), // Use speed as a staggered delay
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top bottom-=50",
            end: "center center",
            toggleActions: "play none none reverse",
            scrub: false,
            markers: false,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenis.destroy();
    };
  }, []);
}
