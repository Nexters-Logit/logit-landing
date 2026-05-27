"use client";

import Image from "next/image";
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

const CARDS = [
  {
    score: 98, title: "편의점 알바 경험",
    tags: [{ label: "갈등 관리", color: "bg-icon-1" }, { label: "고객 응대" }, { label: "감정 노동" }],
    x: 24, y: 10, delay: "0s", duration: "3.2s",
  },
  {
    score: 94, title: "동아리 총무 활동",
    tags: [{ label: "조직 관리", color: "bg-icon-4" }, { label: "예산 집행" }, { label: "기획" }],
    x: 72, y: 22, delay: "0.6s", duration: "3.8s",
  },
  {
    score: 91, title: "팀 프로젝트 리더",
    tags: [{ label: "리더십", color: "bg-icon-3" }, { label: "PM" }, { label: "커뮤니케이션" }],
    x: 18, y: 52, delay: "1.2s", duration: "2.9s",
  },
  {
    score: 89, title: "매일 가계부 작성",
    tags: [{ label: "데이터 분석", color: "bg-icon-5" }, { label: "꼼꼼함" }, { label: "성실" }],
    x: 70, y: 62, delay: "1.8s", duration: "3.5s",
  },
  {
    score: 95, title: "해외여행 계획짜기",
    tags: [{ label: "기획력", color: "bg-icon-7" }, { label: "일정 관리" }, { label: "문제 해결" }],
    x: 40, y: 86, delay: "2.4s", duration: "3.1s",
  },
];

function ExperienceCard({ card }: { card: typeof CARDS[0] }) {
  return (
    <div className="bg-white border border-grey-70 rounded-2xl px-5 py-4 shadow-md flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-primary-200 text-xs font-semibold">공고 매칭 점수: {card.score}점</span>
        <span className="text-grey-200 text-base leading-none tracking-widest">···</span>
      </div>
      <p className="text-grey-400 text-base font-bold leading-snug">{card.title}</p>
      <div className="flex flex-wrap gap-1.5">
        {card.tags.map((tag, i) => (
          <span
            key={tag.label}
            className="flex items-center gap-1 bg-grey-50 text-grey-300 text-xs font-medium px-2.5 py-1 rounded-full"
          >
            {i === 0 && tag.color && (
              <span className={`${tag.color} w-2.5 h-2.5 rounded-sm flex-shrink-0`} />
            )}
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HeroV7() {
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
    <section className="relative w-full min-h-[90vh] flex items-center bg-white overflow-hidden">
      <style>{`
        @keyframes floatCard {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50%       { transform: translate(-50%, -50%) translateY(-10px); }
        }
      `}</style>

      <div className="w-full px-8 md:px-16 lg:px-24 xl:px-36 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

        {/* 텍스트 영역 */}
        <div className="flex-1 flex flex-col items-start gap-8 lg:gap-10">
          <span className="bg-primary-50 text-primary-200 text-base lg:text-lg font-semibold px-5 py-2 rounded-full">
            AI 자소서 초안 서비스
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-grey-400 leading-[1.3] [word-break:keep-all]">
            <span
              className="inline text-primary-200"
              style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
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

          <a
            href="#"
            className="bg-primary-200 hover:bg-primary-300 text-white font-semibold text-lg lg:text-xl px-10 py-4 lg:px-12 lg:py-5 rounded-full transition-colors duration-200 w-fit"
          >
            지금 무료로 첫 경험 카드 만들기
          </a>

          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-3 border border-grey-70 hover:border-grey-200 text-grey-300 hover:text-grey-400 text-base font-medium px-6 py-3 rounded-xl transition-colors duration-200">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              App Store
            </a>
            <a href="#" className="flex items-center gap-3 border border-grey-70 hover:border-grey-200 text-grey-300 hover:text-grey-400 text-base font-medium px-6 py-3 rounded-xl transition-colors duration-200">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.3.17.64.24.99.2l12.6-12.6-2.61-2.6L3.18 23.76zM20.49 10.26L17.5 8.56l-2.93 2.93 2.93 2.93 3.02-1.72c.86-.49.86-1.95-.03-2.44zM2.01 1.05C1.87 1.3 1.8 1.6 1.8 1.94v20.12c0 .34.07.64.21.89l.09.08 11.27-11.26v-.27L2.1.97l-.09.08zM14.44 8.19l-2.63-2.63L2.01 1.05l11.15 8.76 1.28-1.62z"/>
              </svg>
              Google Play
            </a>
          </div>
        </div>

        {/* 비주얼 영역 — 모바일: 2열 그리드 / 데스크탑: 플로팅 */}

        {/* 모바일 캐러셀 (lg 미만) */}
        <div className="lg:hidden w-full">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-8 px-8 md:-mx-16 md:px-16 scrollbar-hide">
            {CARDS.map((card) => (
              <div key={card.title} className="snap-start shrink-0 w-72 sm:w-80">
                <ExperienceCard card={card} />
              </div>
            ))}
          </div>
        </div>

        {/* 데스크탑 플로팅 (lg 이상) */}
        <div className="hidden lg:block flex-1 w-full">
          <div className="relative w-full aspect-square">

            {/* 중심 로고 */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-32 h-32 rounded-full bg-white shadow-lg border border-grey-70 flex items-center justify-center">
                <Image src="/logo_symbol_2d.svg" alt="Logit" width={56} height={56} />
              </div>
            </div>

            {/* 플로팅 카드 */}
            {CARDS.map((card) => (
              <div
                key={card.title}
                className="absolute z-10 w-64 xl:w-72"
                style={{
                  left: `${card.x}%`,
                  top: `${card.y}%`,
                  animation: `floatCard ${card.duration} ease-in-out infinite`,
                  animationDelay: card.delay,
                }}
              >
                <ExperienceCard card={card} />
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}
