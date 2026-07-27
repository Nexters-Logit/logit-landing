"use client";

export default function Footer() {
  const scrollToTop = () => {
    document.querySelector("main")?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full" style={{ background: "#13151C" }}>
      <div style={{
        padding: "clamp(48px, 6.25vw, 120px) clamp(20px, 4.6875vw, 90px) clamp(32px, 4.17vw, 80px)",
      }}>

        {/* 로고 + 위로가기 버튼 */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}>

          {/* 로고 컨테이너 — 1920px 기준 323.111×106px */}
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "clamp(10px, 1.97vw, 38px)",
            width: "fit-content",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo_symbol_2d.svg"
              alt="Logit 심볼"
              style={{ width: "clamp(28px, 4.73vw, 90.857px)", height: "clamp(28px, 4.73vw, 90.857px)", flexShrink: 0 }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo_wordmark.svg"
              alt="Logit"
              style={{ width: "clamp(60px, 10.12vw, 194.396px)", height: "auto", marginTop: "2px" }}
            />
          </div>

          {/* 위로가기 버튼 */}
          <button
            onClick={scrollToTop}
            aria-label="맨 위로 이동"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/arrow_top.svg"
              alt="위로 가기"
              style={{ width: "clamp(30px, 5.12vw, 98px)", height: "clamp(30px, 5.12vw, 98px)" }}
            />
          </button>

        </div>
      </div>
    </footer>
  );
}
