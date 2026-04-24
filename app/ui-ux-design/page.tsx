import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export const metadata: Metadata = { title: "UI / UX Design | Edhe Studio", description: "Interfaces that feel as good as they look." };

export default function Page() {
  return <ServicePageTemplate data={{
    serviceNum:  "S.03",
    serviceLabel: "UI / UX Design",
    heroline1:   "Interfaces with",
    heroline2:   "a clear point",
    heroOutline: "of view",
    intro: "We design with intent. Every component, every spacing decision, every micro-interaction exists for a reason. We design for your users, not for Dribbble.",
    color: "#E34A27",
    what: ["UX Research","Information Architecture","Wireframes","UI Design Systems","Interactive Prototypes","Usability Testing"],
    process: [
      { step: "01", title: "Discovery & Research", body: "We talk to your users, study your competitors, and identify the exact friction that's costing you conversions." },
      { step: "02", title: "Architecture First",   body: "Before any visual design, we map the information architecture and user flows. Structure before aesthetics — always." },
      { step: "03", title: "High-fidelity Design", body: "We build out a complete UI design system: components, states, motion guidelines. Figma files that engineers actually enjoy working with." },
      { step: "04", title: "Test & Iterate",       body: "We run usability tests and iterate until the design earns its place. Every flow must feel inevitable." },
    ],
    tech: ["Figma","FigJam","Framer","Lottie","ProtoPie","Notion"],
    marqueeItems: ["UI Design","UX Research","Prototyping","Systems Thinking","Interaction","Figma"],
  }} />;
}
