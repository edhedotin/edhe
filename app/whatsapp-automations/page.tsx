import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export const metadata: Metadata = { title: "WhatsApp Automations | Edhe Studio", description: "Conversational flows and commerce bots that sell, support and never sound robotic." };

export default function Page() {
  return <ServicePageTemplate data={{
    serviceNum:  "S.06",
    serviceLabel: "WhatsApp Automations",
    heroline1:   "Conversations that",
    heroline2:   "convert,",
    heroOutline: "automatically",
    intro: "Conversational flows and commerce bots that sell, support, re-engage, and never sound robotic. Built on the WhatsApp Business API for scale and reliability.",
    color: "#E34A27",
    what: ["Lead Qualification Bots","Order Tracking Flows","Customer Support Bots","Payment Links & Reminders","Re-engagement Campaigns","Custom Flow Builder"],
    process: [
      { step: "01", title: "Conversation Mapping", body: "We document every user intent and draw the full conversation tree — every branch, fallback, and escalation path — before writing a single message." },
      { step: "02", title: "Copy & Tone",          body: "We write every bot message in your brand voice. Warm, direct, and never robotic. Users shouldn't feel like they're talking to a machine." },
      { step: "03", title: "API Build & Test",     body: "We connect to the WhatsApp Business API, configure webhook integrations with your CRM or backend, and run 200+ test conversations before launch." },
      { step: "04", title: "Monitor & Optimise",   body: "After launch we track drop-off points, A/B test message variants, and continuously improve conversion rates on every flow." },
    ],
    tech: ["WhatsApp Business API","Twilio","Make (Integromat)","Zapier","Airtable","Notion"],
    marqueeItems: ["WhatsApp API","Lead Bots","Commerce Flows","Re-engagement","Support Automation","CRM Connect"],
  }} />;
}
