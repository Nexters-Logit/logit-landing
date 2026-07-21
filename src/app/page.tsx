import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import PainPoint from "@/components/sections/PainPoint";
import Features from "@/components/sections/Features";

export default function Home() {
  return (
    <main>
      <div className="relative overflow-hidden bg-white">
        <img
          src="/logit-bg.svg"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-50px",
            top: "-222px",
            width: "1970px",
            height: "943px",
            maxWidth: "none",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: "170vw",
            height: "170vw",
            borderRadius: "50%",
            background: "radial-gradient(50% 50% at 50% 50%, #2571EB 0%, rgba(216, 231, 255, 0.00) 100%)",
            top: "39.7vh",
          }}
        />
        <Header />
        <Hero />
      </div>
      <PainPoint />
      <Features />
    </main>
  );
}
