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
    <section className="relative w-full min-h-[90vh] flex items-start overflow-hidden">

      <div className="relative z-10 w-full px-20 max-lg:px-12 max-md:px-6 pt-[180px] pb-32 max-lg:pt-24 max-lg:pb-24 max-md:pt-16 max-md:pb-16 flex justify-center">
        <div className="max-w-3xl w-full flex flex-col gap-10 max-md:gap-7 items-center text-center">

          {/* 배지 */}
          <span
            className="flex justify-center items-center gap-[10px] bg-primary-50 text-primary-200 text-[24px] max-lg:text-xl max-md:text-sm font-semibold px-6 py-[10px] rounded-[50px] w-fit"
            style={revealStyle(mounted, STAGGER_ITEMS[0].delay)}
          >
            AI 자소서 초안 서비스
          </span>

          {/* 헤드카피 */}
          <h1
            className="flex flex-col items-center gap-6 text-[64px] max-lg:text-[52px] max-md:text-4xl font-bold text-grey-400 text-center [word-break:keep-all]"
            style={revealStyle(mounted, STAGGER_ITEMS[1].delay)}
          >
            <span className="leading-[72%]">
              <span
                className="text-primary-200"
                style={{ opacity: wordVisible ? 1 : 0, transition: "opacity 0.3s ease" }}
              >
                {EXPERIENCES[index]}
              </span>
              {" "}기록만 하세요.
            </span>
            <span className="leading-[72%] whitespace-nowrap max-md:whitespace-normal">
              자소서 초안은 AI가 10초 만에 끝냅니다.
            </span>
          </h1>

          {/* 서브카피 */}
          <p
            className="text-[24px] max-lg:text-xl max-md:text-base font-normal text-grey-300 leading-[120%] text-center whitespace-nowrap max-md:whitespace-normal"
            style={revealStyle(mounted, STAGGER_ITEMS[2].delay)}
          >
            경험을 등록해두고, 자소서를 한 번에 생성해보세요. 당신의 숨겨진 합격 DNA, AI가 찾아드릴게요.
          </p>

          {/* CTA */}
          <a
            href="https://logit.ai.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-200 hover:bg-primary-300 text-white font-semibold text-[18px] leading-[140%] px-8 py-5 md:px-[120px] lg:px-[201px] max-md:py-4 rounded-full transition-colors duration-200 whitespace-nowrap w-fit"
            style={revealStyle(mounted, STAGGER_ITEMS[3].delay)}
          >
            지금 바로 무료로 시작하기
          </a>


        </div>
      </div>

      {/* 앱 다운로드 - 우측 하단 고정 */}
      <div
        className="absolute bottom-8 right-[30px] z-10 flex items-center gap-4 max-md:hidden"
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
