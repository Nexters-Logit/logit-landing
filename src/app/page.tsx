import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import PainPoint from "@/components/sections/PainPoint";
import Features from "@/components/sections/Features";

export default function Home() {
  return (
    <main className="relative bg-white">
      {/* 라디얼 그라디언트 — 첫 화면 전체에 걸쳐 보임 */}
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
      <div className="relative overflow-hidden bg-transparent min-h-screen" style={{ zIndex: 1 }}>
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
    </main>
  );
}
