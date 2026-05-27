"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    label: "01 경험 기록",
    text: "오늘 편의점 알바에서 진상 손님이 왔는데, 일단 웃으면서 들어줬더니 알아서 나가더라. 나름 노하우가 생긴 것 같기도...",
    style: "bg-grey-50 border border-grey-70 text-grey-400",
    tag: null,
  },
  {
    label: "02 AI 분석 중",
    text: "감정 노동 상황에서의 대처 방식, 고객 응대 패턴 인식, 갈등 해소 전략 분석 중...",
    style: "bg-primary-50 border border-primary-60 text-primary-300",
    tag: "분석 중",
  },
  {
    label: "03 자소서 완성",
    text: "편의점 근무 중 고객 불만 상황에서 경청과 공감을 기반으로 한 응대 전략을 수립하여 갈등을 효과적으로 해소하고 고객 만족도를 높인 경험이 있습니다.",
    style: "bg-white border-2 border-primary-200 text-grey-400",
    tag: "갈등 관리 · 고객 응대",
  },
];

export default function HeroV3() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (-top) / (height * 0.5)));
      setActiveStep(Math.min(2, Math.floor(progress * 3)));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white px-8 md:px-16 lg:px-24 xl:px-36 py-20 lg:py-32 min-h-[200vh]">
      <div className="sticky top-32 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-8">

          <span className="bg-primary-50 text-primary-200 text-base lg:text-lg font-semibold px-5 py-2 rounded-full">
            AI 자소서 초안 서비스
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-grey-400 leading-[1.2] [word-break:keep-all]">
            일상의 순간이<br />
            <span className="text-primary-200">합격의 언어</span>로<br />
            바뀌는 과정
          </h1>

          <p className="text-grey-200 text-lg lg:text-xl leading-relaxed">
            스크롤을 내려보세요
          </p>

          {/* 스텝 인디케이터 */}
          <div className="flex flex-col gap-3 w-full max-w-sm">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 transition-all duration-300 ${i === activeStep ? "opacity-100" : "opacity-30"}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${i === activeStep ? "bg-primary-200 text-white" : "bg-grey-50 text-grey-200"}`}>
                  {i + 1}
                </div>
                <span className={`text-base font-medium ${i === activeStep ? "text-grey-400" : "text-grey-100"}`}>{step.label}</span>
              </div>
            ))}
          </div>

          <a href="#" className="bg-primary-200 hover:bg-primary-300 text-white font-semibold text-lg lg:text-xl px-10 py-4 lg:px-12 lg:py-5 rounded-full transition-colors duration-200">
            지금 무료로 첫 경험 카드 만들기
          </a>
        </div>

        {/* 카드 변환 */}
        <div className="flex-1 w-full">
          <div className={`w-full rounded-3xl p-8 lg:p-10 flex flex-col gap-4 transition-all duration-500 ${STEPS[activeStep].style}`}>
            {STEPS[activeStep].tag && (
              <span className="bg-primary-100 text-white text-sm font-semibold px-4 py-1.5 rounded-full w-fit">
                {STEPS[activeStep].tag}
              </span>
            )}
            <p className="text-lg lg:text-xl leading-relaxed">{STEPS[activeStep].text}</p>
            <span className="text-sm text-grey-200">{STEPS[activeStep].label}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
