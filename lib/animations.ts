// Utility for scroll reveal animations
export const setupScrollReveal = () => {
  const reveals = document.querySelectorAll("[data-reveal]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
          observer.unobserve(element);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }
  );

  reveals.forEach((reveal) => {
    const element = reveal as HTMLElement;
    element.style.opacity = "0";
    element.style.transform = "translateY(60px)";
    element.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
    observer.observe(element);
  });
};

// Setup smooth scroll with Lenis
export const setupLenisScroll = () => {
  if (typeof window !== "undefined") {
    // Lenis smooth scroll will be added via script tag in layout
  }
};
