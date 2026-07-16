import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import PainPoint from "@/components/sections/PainPoint";
import Features from "@/components/sections/Features";

export default function Home() {
  return (
    <main>
      <div className="relative overflow-hidden bg-primary-50">
        <div className="absolute inset-0 bg-white/40" />
        <img
          src="/logit-bg.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-0 left-0 w-full pointer-events-none select-none"
        />
        <Header />
        <Hero />
      </div>
      <PainPoint />
      <Features />
    </main>
  );
}
