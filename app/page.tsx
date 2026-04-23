"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import ParticleField from "@/components/ParticleField";
import Navbar from "@/components/Navbar";
import Landing from "@/components/Landing";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="App relative min-h-screen">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <ParticleField isScattered={isLoading} />
      
      <div 
        className={`transition-opacity duration-1000 ease-in-out ${
          isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <Navbar />
        <Landing />
      </div>
    </div>
  );
}
