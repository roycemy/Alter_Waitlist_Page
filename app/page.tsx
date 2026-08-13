import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Stakes } from "@/components/sections/Stakes";
import { WhatItDoes } from "@/components/sections/WhatItDoes";
import { MemoryObjection } from "@/components/sections/MemoryObjection";
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
        <MemoryObjection />
        <Arc />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
