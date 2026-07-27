"use client";

export default function Footer() {
  const scrollToTop = () => {
    document.querySelector("main")?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full" style={{ background: "#13151C" }}>
      <div style={{
        padding: "clamp(48px, 6.25vw, 120px) clamp(30px, 4.6875vw, 90px) clamp(24px, 3.125vw, 60px)",
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

        {/* Email */}
        <div className="mt-10 md:mt-[clamp(40px,4.6875vw,90px)]">

          <p style={{
            color: "#F6F6F7",
            fontFamily: "Pretendard",
            fontSize: "clamp(13px, 1.25vw, 24px)",
            fontWeight: 400,
            lineHeight: "160%",
            letterSpacing: "-0.024em",
            margin: 0,
          }}>Email</p>
          <p style={{
            color: "#F6F6F7",
            fontFamily: "Pretendard",
            fontSize: "clamp(13px, 1.25vw, 24px)",
            fontWeight: 700,
            lineHeight: "160%",
            letterSpacing: "-0.024em",
            margin: 0,
          }}>logit2026@gmail.com</p>
        </div>

        {/* 소셜 아이콘 + 스토어 버튼 */}
        <div
          className="flex flex-col items-start mt-5 md:flex-row md:justify-between md:items-center md:mt-[clamp(24px,2.5vw,48px)]"
        >

          {/* 소셜 아이콘 그룹 */}
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(12px, 1.25vw, 24px)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon_tistory.svg" alt="Tistory" style={{ width: "clamp(28px, 3.125vw, 60px)", height: "clamp(28px, 3.125vw, 60px)" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon_naver_blog.svg" alt="Naver Blog" style={{ width: "clamp(28px, 3.125vw, 60px)", height: "clamp(28px, 3.125vw, 60px)" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon_instagram.svg" alt="Instagram" style={{ width: "clamp(28px, 3.125vw, 60px)", height: "clamp(28px, 3.125vw, 60px)" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon_kakaotalk.svg" alt="KakaoTalk" style={{ width: "clamp(28px, 3.125vw, 60px)", height: "clamp(28px, 3.125vw, 60px)" }} />
          </div>

          {/* 스토어 버튼 그룹 */}
          <div className="mt-[65px] w-full md:mt-0 md:w-auto" style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 0.83vw, 16px)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/app-store.svg" alt="App Store" className="flex-1 md:flex-none" style={{ width: "clamp(100px, 9.375vw, 180px)", height: "auto", minWidth: 0 }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/google-play.svg" alt="Google Play" className="flex-1 md:flex-none" style={{ width: "clamp(100px, 9.375vw, 180px)", height: "auto", minWidth: 0 }} />
          </div>

        </div>

        {/* Copyright */}
        <p style={{
          color: "#949497",
          textAlign: "center",
          fontFamily: "Pretendard",
          fontSize: "clamp(12px, 1.09vw, 21px)",
          fontWeight: 500,
          lineHeight: "160%",
          letterSpacing: "-0.024em",
          margin: 0,
          marginTop: "clamp(24px, 2.5vw, 48px)",
          alignSelf: "stretch",
        }}>© Copyright 2026 logit.ac.kr All Right Reserved</p>

      </div>
    </footer>
  );
}
