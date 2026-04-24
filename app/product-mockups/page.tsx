import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export const metadata: Metadata = { title: "Product Mockups | Edhe Studio", description: "Presentation-ready renders that make investors lean in." };

export default function Page() {
  return <ServicePageTemplate data={{
    serviceNum:  "S.04",
    serviceLabel: "Product Mockups",
    heroline1:   "Make them",
    heroline2:   "stop and",
    heroOutline: "look twice",
    intro: "Presentation-ready product renders and mockups that communicate the vision before a single line of code is shipped. Pitch decks, landing page heroes, campaign assets.",
    color: "#E34A27",
    what: ["Device Mockups","3D Product Renders","Pitch Deck Assets","App Store Screenshots","Social Campaign Visuals","Packaging Renders"],
    process: [
      { step: "01", title: "Brief & Brand Audit", body: "We absorb your brand guidelines, tone of voice, and the story you're trying to tell before touching a single asset." },
      { step: "02", title: "Scene & Concept",     body: "We propose 2–3 visual directions: camera angles, lighting, contexts. You pick the world your product lives in." },
      { step: "03", title: "Render & Refine",     body: "We produce high-resolution mockups with multiple variants. You get source files and export-ready versions for every format." },
      { step: "04", title: "Delivery Pack",       body: "Organised file handoff: web-optimised PNGs, high-res TIFFs, and social-ready crops — all labelled and ready to use." },
    ],
    tech: ["Figma","Blender","Cinema 4D","Adobe Photoshop","Dimension","Keyshot"],
    marqueeItems: ["3D Renders","Device Mockups","Pitch Assets","App Store","Campaign Visuals","Brand Render"],
  }} />;
}
