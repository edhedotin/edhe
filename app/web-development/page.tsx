import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export const metadata: Metadata = { title: "Web Development | Edhe Studio", description: "Performant, editorial sites that scale without apology." };

export default function Page() {
  return <ServicePageTemplate data={{
    serviceNum:  "S.01",
    serviceLabel: "Web Development",
    heroline1:   "Websites that",
    heroline2:   "earn their",
    heroOutline: "keep",
    intro: "We build web experiences that load in milliseconds, look stunning on any device, and convert visitors into believers. Not templates — custom-engineered digital products.",
    color: "#E34A27",
    what: ["Landing Pages","Marketing Sites","Web Applications","E-commerce Stores","Dashboards & Portals","API Integrations"],
    process: [
      { step: "01", title: "Discovery & Architecture", body: "We map out your users, your goals, and your constraints. We decide on the right stack before writing a single line of code." },
      { step: "02", title: "Design in Code",            body: "We don't hand off Figma files and hope. We design in the browser — iterating live so you see the real thing, not a simulation." },
      { step: "03", title: "Performance-First Build",   body: "Every component is built with Core Web Vitals in mind. Lighthouse scores of 95+ are our baseline, not our goal." },
      { step: "04", title: "Launch & Handoff",          body: "We document everything. Your team can confidently maintain what we built, or we stay on as your long-term engineering partner." },
    ],
    tech: ["Next.js","React","TypeScript","Tailwind CSS","Node.js","PostgreSQL","Vercel","Cloudflare"],
    marqueeItems: ["Web Dev","Performance","Editorial","Custom Code","Next.js","Fast · Accessible"],
  }} />;
}
