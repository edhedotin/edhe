"use client";

const ARROW = "→";

interface MarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
  dark?: boolean;
}

export default function Marquee({ items, speed = 22, className = "", dark = false }: MarqueeProps) {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div className={`overflow-hidden py-4 border-y ${dark ? "border-white/10" : "border-[#DCDAD2]"} ${className}`}>
      <div className="flex gap-0 whitespace-nowrap" style={{ animation: `marquee ${speed}s linear infinite` }}>
        {repeated.map((item, i) => (
          <span key={i} className={`inline-flex items-center gap-4 font-display font-black text-4xl md:text-5xl tracking-tighter pr-10 ${dark ? "text-white/20" : "text-[#1C1C1C]/12"}`}>
            {item}
            <span className={`text-[#E34A27] text-3xl`}>{ARROW}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
