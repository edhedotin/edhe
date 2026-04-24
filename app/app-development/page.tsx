import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export const metadata: Metadata = { title: "App Development | Edhe Studio", description: "Native-quality cross-platform apps with obsessive attention to feel." };

export default function Page() {
  return <ServicePageTemplate data={{
    serviceNum:  "S.02",
    serviceLabel: "App Development",
    heroline1:   "Apps people",
    heroline2:   "actually come",
    heroOutline: "back to",
    intro: "We build mobile applications that feel native, perform flawlessly, and solve real problems. iOS and Android from a single focused team that cares about every frame.",
    color: "#E34A27",
    what: ["iOS Applications","Android Applications","Cross-platform (Flutter)","Real-time Features","Offline-first Apps","App Store Submission"],
    process: [
      { step: "01", title: "User Research & Flows", body: "We map user journeys before wireframing. Every tap, gesture, and edge case is thought through before a single screen is designed." },
      { step: "02", title: "Prototype & Validate",  body: "We build interactive prototypes early and put them in front of real users. Assumptions are the enemy of good UX." },
      { step: "03", title: "Cross-Platform Build",  body: "One codebase for iOS and Android using Flutter. Pixel-perfect fidelity on both platforms without the overhead of two teams." },
      { step: "04", title: "App Store Launch",      body: "We handle the submission process, ASO, and post-launch monitoring so you don't fly blind after launch." },
    ],
    tech: ["Flutter","React Native","Firebase","Supabase","Swift","Kotlin","Figma","TestFlight"],
    marqueeItems: ["iOS","Android","Flutter","Native Feel","Real-time","Cross-platform"],
  }} />;
}
