"use client";

import { useEffect, useState } from "react";

const EXPERIENCES = [
  "알바",
  "동아리 활동",
  "넷플릭스 정주행",
  "편의점 야간 알바",
  "자취 생활",
  "팀 프로젝트",
  "여행",
];

const STAGGER_ITEMS = [
  { delay: 0 },
  { delay: 150 },
  { delay: 300 },
  { delay: 450 },
  { delay: 600 },
];

function revealStyle(visible: boolean, delay: number) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  };
}

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Hero → PainPoint 스크롤 스냅
  useEffect(() => {
    let isSnapping = false;

    const snapToPainPoint = () => {
      if (isSnapping) return;
      isSnapping = true;
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
      setTimeout(() => { isSnapping = false; }, 1000);
    };

    const handleWheel = (e: WheelEvent) => {
      if (window.scrollY < 50 && e.deltaY > 0 && !isSnapping) {
        e.preventDefault();
        snapToPainPoint();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY < 50 && !isSnapping) {
        const delta = touchStartY - e.touches[0].clientY;
        if (delta > 20) {
          e.preventDefault();
          snapToPainPoint();
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % EXPERIENCES.length);
        setWordVisible(true);
      }, 400);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] flex items-start overflow-hidden">

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-20 md:py-24 xl:pt-[294px] xl:pb-32 flex justify-center">
        <div
          className="max-w-2xl md:max-w-3xl xl:max-w-4xl w-full flex flex-col items-center text-center"
          style={{ gap: "clamp(20px, 2.08vw, 40px)" }}
        >

          {/* 배지 */}
          <span
            className="flex justify-center items-center gap-[10px] bg-primary-50 text-primary-200 font-bold leading-[120%] rounded-[50px] w-fit"
            style={{
              ...revealStyle(mounted, STAGGER_ITEMS[0].delay),
              fontSize: "clamp(13px, 1.25vw, 24px)",
              padding: "clamp(6px, 0.52vw, 10px) clamp(16px, 1.25vw, 24px)",
            }}
          >
            AI 자소서 초안 서비스
          </span>

          {/* 헤드카피 */}
          <h1
            className="flex flex-col items-center font-bold text-grey-400 text-center [word-break:keep-all]"
            style={{
              ...revealStyle(mounted, STAGGER_ITEMS[1].delay),
              fontSize: "clamp(28px, 3.33vw, 64px)",
              gap: "14.56px",
              marginTop: "calc(22px - clamp(20px, 2.08vw, 40px))",
            }}
          >
            <span className="leading-[120%]">
              <span
                className="text-primary-200"
                style={{ opacity: wordVisible ? 1 : 0, transition: "opacity 0.3s ease" }}
              >
                {EXPERIENCES[index]}
              </span>
              만 하세요.
            </span>
            <span className="leading-[120%] md:leading-[72%] [word-break:keep-all]">
              자소서 초안은 AI가 10초 만에 끝냅니다.
            </span>
          </h1>

          {/* 서브카피 */}
          <p
            className="font-normal text-grey-300 leading-[120%] text-center [word-break:keep-all]"
            style={{
              ...revealStyle(mounted, STAGGER_ITEMS[2].delay),
              fontSize: "clamp(15px, 1.25vw, 24px)",
              marginTop: "calc(20px - clamp(20px, 2.08vw, 40px))",
            }}
          >
            경험을 등록해두고, 자소서를 한 번에 생성해보세요. 당신의 숨겨진 합격 DNA, AI가 찾아드릴게요.
          </p>

          {/* CTA */}
          <a
            href="https://logit.ai.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-primary-100 hover:bg-primary-200 text-white font-semibold leading-[140%] rounded-[14px] transition-colors duration-200 whitespace-nowrap w-full"
            style={{
              ...revealStyle(mounted, STAGGER_ITEMS[3].delay),
              fontSize: "clamp(14px, 0.94vw, 18px)",
              maxWidth: "586px",
              height: "clamp(52px, 5vw, 66px)",
              padding: "14px 24px",
              marginTop: "calc(52px - clamp(20px, 2.08vw, 40px))",
            }}
          >
            지금 바로 무료로 시작하기
          </a>

        </div>
      </div>

      {/* 앱 다운로드 - 우측 하단 고정 */}
      <div
        className="absolute bottom-12 right-[30px] z-10 flex items-center gap-4 max-sm:hidden"
        style={revealStyle(mounted, STAGGER_ITEMS[4].delay)}
      >
        <a href="https://apps.apple.com/kr/app/logit/id6759486113" target="_blank" rel="noopener noreferrer">
          <img src="/app-store.svg" alt="App Store" className="h-12" />
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.useai.logit&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">
          <img src="/google-play.svg" alt="Google Play" className="h-12" />
        </a>
      </div>
    </section>
  );
}
