import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import PainPoint from "@/components/sections/PainPoint";
import Features from "@/components/sections/Features";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide relative bg-white">

      {/* Section 1: Hero */}
      <div className="snap-start h-screen relative overflow-hidden bg-transparent flex flex-col" style={{ zIndex: 1, scrollSnapStop: "always" }}>
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: "clamp(700px, 170vw, 3273px)",
            height: "clamp(700px, 170vw, 3273px)",
            borderRadius: "50%",
            background: "radial-gradient(50% 50% at 50% 50%, #2571EB 0%, rgba(216, 231, 255, 0.00) 100%)",
            top: "clamp(150px, 39.7vh, 429px)",
            zIndex: 0,
          }}
        />
        <img
          src="/logit-bg.svg"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "max(-50px, -2.6vw)",
            top: "max(-222px, -11.6vw)",
            width: "clamp(375px, 103vw, 1970px)",
            height: "auto",
            maxWidth: "none",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <Header />
        <Hero />
      </div>

      {/* Sections 2 & 3: PainPoint */}
      <PainPoint />

      {/* Sections 4, 5, 6: Features */}
      <Features />

      {/* Section 7: CTA + Footer (하나의 snap 섹션) */}
      <div className="snap-start" style={{ position: "relative", zIndex: 1, scrollSnapStop: "always" }}>
      <div style={{ position: "relative", width: "100%", height: "100vh", background: "#181B24", overflow: "hidden" }}>
        <img
          src="/dark-section-bg.svg"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            pointerEvents: "none",
          }}
        />
        <div
          className="pointer-events-none"
          style={{
            position: "absolute",
            top: "-428px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "1974px",
            height: "1974px",
            borderRadius: "1974px",
            background: "radial-gradient(43.18% 43.18% at 50% 50%, rgba(24, 27, 36, 0.40) 0%, rgba(24, 27, 36, 0.00) 100%)",
          }}
        />
        <img
          src="/dark-section-deco.svg"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "clamp(120px, 36.1vw, 694px)",
            height: "clamp(138px, 41.6vw, 799px)",
            pointerEvents: "none",
          }}
        />
        <img
          src="/dark-section-deco2.svg"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "clamp(40px, 7.5vh, 81px)",
            right: 0,
            width: "clamp(80px, 19.7vw, 378px)",
            height: "clamp(131px, 32.3vw, 620px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(866px, calc(100vw - 40px))",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "clamp(20px, 2.96vh, 32px)",
            zIndex: 1,
          }}
        >
          <p
            style={{
              color: "#FFF",
              textAlign: "center",
              fontFamily: "Pretendard",
              fontSize: "clamp(22px, 2.08vw, 40px)",
              fontWeight: 700,
              lineHeight: "120%",
              wordBreak: "keep-all",
            }}
          >
            경험이 자산이 되는 자소서 작성, 지금 바로 시작해보세요
          </p>
          <a
            href="https://logit.ai.kr/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              width: "min(586px, 100%)",
              height: "clamp(52px, 6.1vh, 66px)",
              padding: "14px 24px",
              justifyContent: "center",
              alignItems: "center",
              gap: "13.702px",
              borderRadius: "14px",
              background: "#40A5FF",
              cursor: "pointer",
              color: "#FFF",
              fontFamily: "Pretendard",
              fontSize: "clamp(14px, 0.94vw, 18px)",
              fontWeight: 600,
              lineHeight: "140%",
              textDecoration: "none",
            }}
          >
            로짓 무료로 시작하기
          </a>
        </div>
      </div>

      {/* Footer */}
      <Footer />
      </div>

    </main>
  );
}
