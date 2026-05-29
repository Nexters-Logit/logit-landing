"use client";

import { useEffect, useState } from "react";
import { useScrollReveal } from "@/lib/hooks";

const EXPERIENCES = [
  { label: "편의점 야간 알바", body: "새벽 2시, 냉장고 온도 이상을 발견하고 바로 조치했어요.", tags: ["알바", "책임감"] },
  { label: "면접 스터디 운영", body: "직접 스터디를 만들어 7명을 이끌었어요. 팀원 3명이 합격했어요.", tags: ["리더십", "실행력"] },
  { label: "동아리 홍보 영상", body: "기획부터 편집까지 혼자 완성해 조회수 2만을 달성했어요.", tags: ["동아리", "창의성"] },
  { label: "자취 생활 6개월", body: "월 50만 원으로 혼자 생활비를 관리했어요.", tags: ["자기관리", "계획성"] },
];

const TRAITS = ["책임감", "위기 대응력", "커뮤니케이션", "주도성", "실행력"];

function Step01() {
  const trigger = useScrollReveal(0.2, false);
  const [idx, setIdx] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    if (!trigger.visible) {
      setIdx(0);
      setFadeIn(true);
      return;
    }
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setIdx((p) => (p + 1) % EXPERIENCES.length);
        setFadeIn(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, [trigger.visible]);

  const exp = EXPERIENCES[idx];

  return (
    <div className="relative min-h-screen flex items-center justify-center px-20 max-lg:px-12 max-md:px-6 py-24 overflow-hidden bg-white">
      <span className="absolute text-[38vw] font-black leading-none select-none pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-grey-400 opacity-[0.03]">
        01
      </span>

      <div
        ref={trigger.ref}
        className="relative z-10 flex flex-col items-center text-center gap-10 w-full max-w-3xl"
      >
        {/* 스텝 라벨 + 타이틀 */}
        <div
          className="flex flex-col items-center gap-4 transition-all duration-700"
          style={{
            opacity: trigger.visible ? 1 : 0,
            transform: trigger.visible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <span className="text-primary-200 text-sm font-semibold tracking-[0.2em] uppercase">Step 01</span>
          <h2 className="text-6xl max-lg:text-5xl max-md:text-4xl font-bold text-grey-400 [word-break:keep-all]">
            경험을 기록해요
          </h2>
        </div>

        {/* 순환 경험 */}
        <div
          className="flex flex-col items-center gap-5"
          style={{
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
        >
          <p className="text-5xl max-lg:text-4xl max-md:text-3xl font-bold text-primary-200 [word-break:keep-all]">
            {exp.label}
          </p>
          <p className="text-xl max-md:text-base text-grey-300 leading-relaxed max-w-lg [word-break:keep-all]">
            {exp.body}
          </p>
          <div className="flex gap-2.5 flex-wrap justify-center">
            {exp.tags.map((tag) => (
              <span key={tag} className="bg-primary-20 text-primary-200 text-base font-medium px-5 py-2 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 인디케이터 */}
        <div className="flex gap-2">
          {EXPERIENCES.map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full bg-primary-200 transition-all duration-300"
              style={{ width: i === idx ? "24px" : "6px", opacity: i === idx ? 1 : 0.2 }}
            />
          ))}
        </div>

        <p
          className="text-grey-200 text-lg max-md:text-base max-w-md [word-break:keep-all] transition-all duration-700"
          style={{
            opacity: trigger.visible ? 1 : 0,
            transitionDelay: "300ms",
          }}
        >
          어떤 경험이든 괜찮아요. 짧게 메모하듯 기록하기만 하면 돼요.
        </p>
      </div>
    </div>
  );
}

function Step02() {
  const trigger = useScrollReveal(0.2, false);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!trigger.visible) {
      setVisibleCount(0);
      return;
    }
    const timers = TRAITS.map((_, i) =>
      setTimeout(() => setVisibleCount(i + 1), 300 + i * 250)
    );
    return () => timers.forEach(clearTimeout);
  }, [trigger.visible]);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-20 max-lg:px-12 max-md:px-6 py-24 overflow-hidden bg-grey-20">
      <span className="absolute text-[38vw] font-black leading-none select-none pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-grey-400 opacity-[0.04]">
        02
      </span>

      <div
        ref={trigger.ref}
        className="relative z-10 flex flex-col items-center text-center gap-10 w-full max-w-3xl"
      >
        <div
          className="flex flex-col items-center gap-4 transition-all duration-700"
          style={{
            opacity: trigger.visible ? 1 : 0,
            transform: trigger.visible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <span className="text-primary-200 text-sm font-semibold tracking-[0.2em] uppercase">Step 02</span>
          <h2 className="text-6xl max-lg:text-5xl max-md:text-4xl font-bold text-grey-400 [word-break:keep-all]">
            AI가 소재를 발굴해요
          </h2>
        </div>

        {/* 역량 배지 순차 등장 */}
        <div className="flex flex-wrap justify-center gap-3 max-w-xl">
          {TRAITS.map((trait, i) => (
            <span
              key={trait}
              className="bg-white text-primary-200 border border-primary-100 text-xl max-md:text-base font-semibold px-7 py-3 rounded-full transition-all duration-500"
              style={{
                opacity: visibleCount > i ? 1 : 0,
                transform: visibleCount > i ? "translateY(0) scale(1)" : "translateY(16px) scale(0.9)",
              }}
            >
              {trait}
            </span>
          ))}
        </div>

        <p
          className="text-grey-200 text-lg max-md:text-base max-w-md [word-break:keep-all] transition-all duration-700"
          style={{
            opacity: visibleCount >= TRAITS.length ? 1 : 0,
            transitionDelay: "100ms",
          }}
        >
          평범한 일상에서 합격 포인트를 찾아드려요. 공모전이 없어도 괜찮아요.
        </p>
      </div>
    </div>
  );
}

function Step03() {
  const trigger = useScrollReveal(0.2, false);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-20 max-lg:px-12 max-md:px-6 py-24 overflow-hidden bg-white">
      <span className="absolute text-[38vw] font-black leading-none select-none pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-grey-400 opacity-[0.03]">
        03
      </span>

      <div
        ref={trigger.ref}
        className="relative z-10 flex flex-col items-center text-center gap-10 w-full max-w-3xl"
      >
        <div
          className="flex flex-col items-center gap-4 transition-all duration-700"
          style={{
            opacity: trigger.visible ? 1 : 0,
            transform: trigger.visible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <span className="text-primary-200 text-sm font-semibold tracking-[0.2em] uppercase">Step 03</span>
          <h2 className="text-6xl max-lg:text-5xl max-md:text-4xl font-bold text-grey-400 [word-break:keep-all]">
            자소서 초안 완성
          </h2>
        </div>

        {/* 자소서 인용구 */}
        <div
          className="transition-all duration-700"
          style={{
            opacity: trigger.visible ? 1 : 0,
            transform: trigger.visible ? "translateY(0)" : "translateY(24px)",
            transitionDelay: "150ms",
          }}
        >
          <p className="text-3xl max-lg:text-2xl max-md:text-xl text-grey-400 font-medium leading-relaxed text-center [word-break:keep-all]">
            &ldquo;저는 책임감과 빠른 판단력을 갖추고 있습니다. 편의점 야간 근무 중 냉장 설비 이상을 발견하고 즉시 조치를 취한 경험이 이를 증명합니다.&rdquo;
          </p>
        </div>

        <div
          className="flex items-center gap-2 text-primary-200 font-semibold text-lg transition-all duration-700"
          style={{
            opacity: trigger.visible ? 1 : 0,
            transitionDelay: "300ms",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 12 12" fill="none">
            <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          10초 만에 완성
        </div>

        <p
          className="text-grey-200 text-lg max-md:text-base max-w-md [word-break:keep-all] transition-all duration-700"
          style={{
            opacity: trigger.visible ? 1 : 0,
            transitionDelay: "400ms",
          }}
        >
          문항에 맞는 초안을 바로 받아보세요. 이제 빈 화면 앞에서 멈추지 않아도 돼요.
        </p>
      </div>
    </div>
  );
}

export default function HowItWorksV5() {
  const header = useScrollReveal(0.3, false);

  return (
    <div>
      {/* 섹션 헤더 */}
      <div className="relative flex flex-col items-center justify-center px-20 max-lg:px-12 max-md:px-6 py-24 max-md:py-16 bg-white border-b border-grey-70">
        <div
          ref={header.ref}
          className="flex flex-col items-center gap-4 text-center transition-all duration-700"
          style={{
            opacity: header.visible ? 1 : 0,
            transform: header.visible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <h2 className="text-5xl max-lg:text-4xl max-md:text-3xl font-bold text-grey-400">
            3단계로 끝나요
          </h2>
          <p className="text-xl max-md:text-base text-grey-200 [word-break:keep-all]">
            기록부터 자소서까지, 로짓이 함께해요
          </p>
        </div>
      </div>

      <Step01 />
      <Step02 />
      <Step03 />
    </div>
  );
}
