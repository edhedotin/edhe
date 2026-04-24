import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export const metadata: Metadata = { title: "Canvas Designing | Edhe Studio", description: "Brand-aligned print and large-format canvases." };

export default function Page() {
  return <ServicePageTemplate data={{
    serviceNum:  "S.05",
    serviceLabel: "Canvas Designing",
    heroline1:   "Designs that live",
    heroline2:   "beyond the",
    heroOutline: "screen",
    intro: "Brand-aligned print and large-format canvases for campaigns, merchandise, events, and physical retail spaces. Every millimetre is considered.",
    color: "#E34A27",
    what: ["Event Banners & Signage","Merchandise Design","Posters & Print","Packaging Design","Exhibition Graphics","Brand Collateral"],
    process: [
      { step: "01", title: "Brand Immersion",     body: "We absorb your existing brand elements, colour codes, and physical context so the canvas feels like an extension, not an addition." },
      { step: "02", title: "Concept Development", body: "We present layout compositions and typographic treatments scaled to your actual output dimensions — not a scaled-down proxy." },
      { step: "03", title: "Print-Ready Mastering", body: "Bleed, trim, safe zones, CMYK conversion — we handle every technical requirement so your printer never comes back with questions." },
      { step: "04", title: "File Delivery",       body: "Source files in AI/PDF plus export-ready versions at the correct DPI for every output format in your campaign." },
    ],
    tech: ["Adobe Illustrator","Adobe InDesign","Figma","Canva Pro","Photoshop"],
    marqueeItems: ["Print Design","Event Banners","Merch","Packaging","Large Format","CMYK"],
  }} />;
}
