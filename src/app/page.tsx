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
      <PainPoint />
      <Features />
      {/* 높이 0 앵커: 다크 섹션 overflow:hidden에 클립되지 않고 경계를 걸치는 요소를 배치 */}
      <div className="hidden md:block" style={{ position: "relative", height: 0, zIndex: 2 }}>
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
      <div style={{ position: "relative", width: "100%", minHeight: "100vh", background: "#181B24", overflow: "hidden", zIndex: 1 }}>
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
        {/* 라디얼 그라디언트 — overflow:hidden으로 하단 클립, Step 3 쪽 상단 부분은 Features의 Step3 gradient로 처리 */}
        <div
          className="pointer-events-none"
          style={{
            position: "absolute",
            top: "-428px",
            left: "-54px",
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
            top: "281px",
            left: 0,
            width: "694px",
            height: "799px",
            pointerEvents: "none",
          }}
        />
        <img
          src="/dark-section-deco2.svg"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "81px",
            left: "1542px",
            width: "378px",
            height: "620px",
            pointerEvents: "none",
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
          <a
            href="https://logit.ai.kr/"
            target="_blank"
            rel="noopener noreferrer"
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
              cursor: "pointer",
              color: "#FFF",
              fontFamily: "Pretendard",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "140%",
              textDecoration: "none",
            }}
          >
            로짓 무료로 시작하기
          </a>
        </div>
      </div>
    </main>
  );
}
