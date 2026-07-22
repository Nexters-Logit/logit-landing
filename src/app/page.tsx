import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import PainPoint from "@/components/sections/PainPoint";
import Features from "@/components/sections/Features";

export default function Home() {
  return (
    <main className="relative bg-white">
      <div className="relative overflow-hidden bg-transparent min-h-screen" style={{ zIndex: 1 }}>
        {/* 라디얼 그라디언트 — 첫 화면에만 보임 (overflow-hidden으로 클립) */}
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: "3273px",
            height: "3273px",
            borderRadius: "3273px",
            background: "radial-gradient(50% 50% at 50% 50%, #2571EB 0%, rgba(216, 231, 255, 0.00) 100%)",
            top: "429px",
            zIndex: 0,
          }}
        />
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
        <Header />
        <Hero />
      </div>
      <PainPoint />
      <Features />
      <div style={{ position: "relative", width: "100%", minHeight: "100vh", background: "#181B24", overflow: "visible", zIndex: 1 }}>
        <img
          src="/next-section-mockup.svg"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-125px",
            left: "231px",
            width: "467px",
            height: "451px",
          }}
        />
      </div>
    </main>
  );
}
