import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Stakes } from "@/components/sections/Stakes";
import { TheBuild } from "@/components/sections/TheBuild";
import { PushDemo } from "@/components/sections/PushDemo";
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
        <TheBuild />
        <PushDemo />
        <Moat />
        <Arc />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
