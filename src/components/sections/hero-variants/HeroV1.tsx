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

export default function HeroV1() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % EXPERIENCES.length);
        setVisible(true);
      }, 400);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-white px-8 md:px-16 lg:px-24 xl:px-36 py-20 lg:py-32">
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-8">

          <span className="bg-primary-50 text-primary-200 text-base lg:text-lg font-semibold px-5 py-2 rounded-full">
            AI 자소서 초안 서비스
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-grey-400 leading-[1.3] [word-break:keep-all]">
            <span
              className="inline text-primary-200"
              style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            >
              {EXPERIENCES[index]}
            </span>
            {" "}기록만 하세요.<br />
            자소서 초안은 AI가<br />
            10초 만에 끝냅니다.
          </h1>

          <p className="text-grey-200 text-lg lg:text-xl xl:text-2xl leading-relaxed">
            당신의 사소한 일상 속 숨겨진 합격 DNA를<br className="hidden lg:block" />
            {" "}AI가 찾아드릴게요.
          </p>

          <a href="#" className="bg-primary-200 hover:bg-primary-300 text-white font-semibold text-lg lg:text-xl px-10 py-4 lg:px-12 lg:py-5 rounded-full transition-colors duration-200">
            지금 무료로 첫 경험 카드 만들기
          </a>
        </div>

        <div className="flex-1 w-full">
          <div className="w-full aspect-[4/3] lg:aspect-square rounded-3xl bg-primary-50 flex items-center justify-center">
            <span className="text-primary-100 text-base">서비스 목업 이미지</span>
          </div>
        </div>
      </div>
    </section>
  );
}
