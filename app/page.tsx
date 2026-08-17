import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Stakes } from "@/components/sections/Stakes";
import { WhatItDoes } from "@/components/sections/WhatItDoes";
import { PushDemo } from "@/components/sections/PushDemo";
import { MemoryObjection } from "@/components/sections/MemoryObjection";
import { Moat } from "@/components/sections/Moat";
import { Arc } from "@/components/sections/Arc";
import { Cta } from "@/components/sections/Cta";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stakes />
        <WhatItDoes />
        <PushDemo />
        <MemoryObjection />
        <Moat />
        <Arc />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
