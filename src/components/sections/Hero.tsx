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
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-primary-50" />
      <div className="absolute inset-0 bg-white/40" />

      <div className="relative z-10 w-full px-20 max-lg:px-12 max-md:px-6 py-32 max-lg:py-24 max-md:py-16 flex justify-center">
        <div className="max-w-3xl w-full flex flex-col gap-10 max-md:gap-7 items-center text-center">

          {/* 배지 */}
          <span
            className="bg-primary-50 text-primary-200 text-lg max-md:text-sm font-semibold px-5 py-2 rounded-full w-fit"
            style={revealStyle(mounted, STAGGER_ITEMS[0].delay)}
          >
            AI 자소서 초안 서비스
          </span>

          {/* 헤드카피 */}
          <h1
            className="text-7xl max-lg:text-6xl max-md:text-4xl font-bold text-grey-400 leading-[1.2] [word-break:keep-all]"
            style={revealStyle(mounted, STAGGER_ITEMS[1].delay)}
          >
            <span
              className="inline text-primary-200"
              style={{ opacity: wordVisible ? 1 : 0, transition: "opacity 0.3s ease" }}
            >
              {EXPERIENCES[index]}
            </span>
            {" "}기록만 하세요.<br />
            자소서 초안은 AI가<br />
            10초 만에 끝냅니다.
          </h1>

          {/* 서브카피 */}
          <p
            className="text-2xl max-lg:text-xl max-md:text-base text-grey-200 leading-relaxed [word-break:keep-all]"
            style={revealStyle(mounted, STAGGER_ITEMS[2].delay)}
          >
            당신의 사소한 일상 속 숨겨진 합격 DNA를<br className="max-md:hidden" />
            {" "}AI가 찾아드릴게요.
          </p>

          {/* CTA */}
          <a
            href="https://logit.ai.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-200 hover:bg-primary-300 text-white font-semibold text-xl max-md:text-base px-12 py-5 max-md:px-8 max-md:py-4 rounded-full transition-colors duration-200 whitespace-nowrap w-fit"
            style={revealStyle(mounted, STAGGER_ITEMS[3].delay)}
          >
            지금 무료로 첫 경험 카드 만들기
          </a>

          {/* 앱 다운로드 */}
          <div
            className="flex items-center gap-4"
            style={revealStyle(mounted, STAGGER_ITEMS[4].delay)}
          >
            <a href="https://apps.apple.com/kr/app/logit/id6759486113" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 border border-grey-70 hover:border-grey-200 text-grey-300 hover:text-grey-400 text-lg max-md:text-sm font-medium px-7 py-4 max-md:px-5 max-md:py-3 rounded-xl transition-colors duration-200">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              App Store
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.useai.logit&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 border border-grey-70 hover:border-grey-200 text-grey-300 hover:text-grey-400 text-lg max-md:text-sm font-medium px-7 py-4 max-md:px-5 max-md:py-3 rounded-xl transition-colors duration-200">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.3.17.64.24.99.2l12.6-12.6-2.61-2.6L3.18 23.76zM20.49 10.26L17.5 8.56l-2.93 2.93 2.93 2.93 3.02-1.72c.86-.49.86-1.95-.03-2.44zM2.01 1.05C1.87 1.3 1.8 1.6 1.8 1.94v20.12c0 .34.07.64.21.89l.09.08 11.27-11.26v-.27L2.1.97l-.09.08zM14.44 8.19l-2.63-2.63L2.01 1.05l11.15 8.76 1.28-1.62z"/>
              </svg>
              Google Play
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
