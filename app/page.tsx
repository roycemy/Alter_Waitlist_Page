import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { LikeYou } from "@/components/sections/LikeYou";
import { PushLine } from "@/components/sections/PushLine";
import { Moat } from "@/components/sections/Moat";
import { Cta } from "@/components/sections/Cta";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <LikeYou />
        <PushLine />
        <Moat />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
