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
          src="/dark-section-bg.svg"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "130px",
            left: 0,
            width: "100%",
            pointerEvents: "none",
          }}
        />
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
        {/* CTA 박스 */}
        <div
          style={{
            position: "absolute",
            top: "511px",
            left: "527px",
            width: "866px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "32px",
          }}
        >
          <p
            style={{
              color: "#FFF",
              textAlign: "center",
              fontFamily: "Pretendard",
              fontSize: "40px",
              fontWeight: 700,
              lineHeight: "120%",
              whiteSpace: "nowrap",
            }}
          >
            경험이 자산이 되는 자소서 작성, 지금 바로 시작해보세요
          </p>
          <button
            style={{
              display: "flex",
              width: "586px",
              height: "66px",
              padding: "14px 24px",
              justifyContent: "center",
              alignItems: "center",
              gap: "13.702px",
              borderRadius: "14px",
              background: "#40A5FF",
              border: "none",
              cursor: "pointer",
              color: "#FFF",
              fontFamily: "Pretendard",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "140%",
            }}
          >
            로짓 무료로 시작하기
          </button>
        </div>
      </div>
    </main>
  );
}
