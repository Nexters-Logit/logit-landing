"use client";

import { Fragment, useEffect, useState } from "react";
import { useScrollReveal } from "@/lib/hooks";

const EXPERIENCES = [
  {
    label: "편의점 야간 알바",
    body: "새벽 2시, 혼자 재고 정리하다 냉장고 온도 이상 발견. 바로 점장님께 연락했어요.",
    tags: ["알바", "책임감"],
  },
  {
    label: "면접 스터디 운영",
    body: "취업 준비 스터디를 직접 만들어 7명을 이끌었어요. 팀원 3명이 최종 합격했어요.",
    tags: ["리더십", "실행력"],
  },
  {
    label: "동아리 홍보 영상",
    body: "영상 기획·촬영·편집을 혼자 해서 SNS 조회수 2만 뷰를 달성했어요.",
    tags: ["동아리", "창의성"],
  },
  {
    label: "자취 생활 6개월",
    body: "월 예산 50만 원으로 생활비를 관리하며 자기관리를 배웠어요.",
    tags: ["자기관리", "계획성"],
  },
];

function CyclingCard({ active }: { active: boolean }) {
  const [idx, setIdx] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    if (!active) {
      setIdx(0);
      setFadeIn(true);
      return;
    }
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setIdx((p) => (p + 1) % EXPERIENCES.length);
        setFadeIn(true);
      }, 350);
    }, 2800);
    return () => clearInterval(interval);
  }, [active]);

  const exp = EXPERIENCES[idx];

  return (
    <div className="bg-white rounded-2xl p-4 border border-grey-70 flex flex-col gap-3">
      <div className="flex items-center gap-2 pb-2 border-b border-grey-70">
        <span className="w-2 h-2 rounded-full bg-primary-100 shrink-0" />
        <span className="text-xs font-semibold text-grey-300 tracking-wide">경험 카드</span>
      </div>
      <div
        style={{
          opacity: fadeIn ? 1 : 0,
          transform: fadeIn ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <p className="text-grey-400 text-sm font-semibold mb-1.5">{exp.label}</p>
        <p className="text-grey-300 text-sm leading-relaxed">{exp.body}</p>
      </div>
      <div
        className="flex gap-2 flex-wrap"
        style={{
          opacity: fadeIn ? 1 : 0,
          transition: "opacity 0.3s ease 0.05s",
        }}
      >
        {exp.tags.map((tag) => (
          <span key={tag} className="bg-primary-20 text-primary-200 text-xs font-medium px-2.5 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      {/* 인디케이터 dots */}
      <div className="flex gap-1.5 justify-center pt-1">
        {EXPERIENCES.map((_, i) => (
          <span
            key={i}
            className="h-1.5 rounded-full bg-primary-200 transition-all duration-300"
            style={{
              width: i === idx ? "16px" : "6px",
              opacity: i === idx ? 1 : 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function AIMockup() {
  return (
    <div className="bg-white rounded-2xl p-4 border border-grey-70 flex flex-col gap-3">
      <div className="flex items-center gap-2 pb-2 border-b border-grey-70">
        <span className="w-2 h-2 rounded-full bg-secondary-100 shrink-0" />
        <span className="text-xs font-semibold text-grey-300 tracking-wide">AI 핵심 역량 추출</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {[
          { label: "책임감", pct: 88 },
          { label: "위기 대응력", pct: 76 },
          { label: "커뮤니케이션", pct: 82 },
        ].map((t) => (
          <div key={t.label} className="flex items-center gap-3">
            <span className="text-xs text-grey-300 w-20 shrink-0">{t.label}</span>
            <div className="flex-1 h-1.5 bg-primary-20 rounded-full overflow-hidden">
              <div className="h-full bg-primary-200 rounded-full" style={{ width: `${t.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DraftMockup() {
  return (
    <div className="bg-white rounded-2xl p-4 border border-grey-70 flex flex-col gap-3">
      <div className="flex items-center gap-2 pb-2 border-b border-grey-70">
        <span className="w-2 h-2 rounded-full bg-icon-1 shrink-0" />
        <span className="text-xs font-semibold text-grey-300 tracking-wide">자소서 초안</span>
      </div>
      <p className="text-grey-400 text-sm leading-relaxed line-clamp-4">
        저는 책임감과 빠른 판단력을 갖추고 있습니다. 편의점 야간 근무 중 냉장 설비 이상을 발견하고 즉시 점장님께 연락하여 피해를 최소화한 경험이 이를 증명합니다.
      </p>
      <div className="flex items-center gap-1.5 text-primary-200 text-xs font-semibold">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        10초 만에 완성
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
      <path d="M0 10H24M24 10L16 2M24 10L16 18" stroke="#C8D5E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const STEPS = [
  {
    number: "01",
    title: "경험을 기록해요",
    description: "어떤 경험이든 괜찮아요. 오늘 있었던 일을 짧게 메모하듯 기록해요.",
  },
  {
    number: "02",
    title: "AI가 소재를 발굴해요",
    description: "로짓 AI가 평범한 일상에서 합격 포인트를 찾아드려요.",
  },
  {
    number: "03",
    title: "자소서 초안 완성",
    description: "문항에 맞는 자소서 초안을 10초 만에 생성해드려요.",
  },
];

export default function HowItWorksV3() {
  const header = useScrollReveal(0.2, false);
  const section = useScrollReveal(0.1, false);

  return (
    <section className="w-full bg-white py-36 max-lg:py-24 max-md:py-16">
      <div className="w-full px-20 max-lg:px-12 max-md:px-6 flex flex-col items-center gap-20 max-lg:gap-14 max-md:gap-10">

        {/* 헤더 */}
        <div
          ref={header.ref}
          className="flex flex-col items-center text-center gap-4 transition-all duration-700"
          style={{
            opacity: header.visible ? 1 : 0,
            transform: header.visible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <span className="text-primary-200 text-lg font-semibold">사용 방법</span>
          <h2 className="text-5xl max-lg:text-4xl max-md:text-3xl font-bold text-grey-400 [word-break:keep-all]">
            3단계로 끝나요
          </h2>
          <p className="text-xl max-md:text-base text-grey-200 [word-break:keep-all]">
            기록부터 자소서까지, 로짓이 함께해요
          </p>
        </div>

        {/* 스텝 */}
        <div
          ref={section.ref}
          className="w-full flex items-center gap-3 max-md:flex-col max-md:items-stretch max-md:gap-5"
        >
          {STEPS.map((step, i) => (
            <Fragment key={i}>
              <div
                className="flex-1 bg-grey-20 rounded-3xl p-8 max-lg:p-6 flex flex-col gap-6 transition-all duration-700"
                style={{
                  opacity: section.visible ? 1 : 0,
                  transform: section.visible ? "translateY(0)" : "translateY(32px)",
                  transitionDelay: `${i * 150}ms`,
                }}
              >
                <span className="text-primary-100 text-3xl font-bold">{step.number}</span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl max-lg:text-lg font-bold text-grey-400 [word-break:keep-all]">{step.title}</h3>
                  <p className="text-grey-200 text-sm leading-relaxed [word-break:keep-all]">{step.description}</p>
                </div>
                {i === 0 && <CyclingCard active={section.visible} />}
                {i === 1 && <AIMockup />}
                {i === 2 && <DraftMockup />}
              </div>

              {i < STEPS.length - 1 && (
                <div
                  className="shrink-0 max-md:hidden"
                  style={{
                    opacity: section.visible ? 1 : 0,
                    transition: `opacity 0.5s ease ${i * 150 + 400}ms`,
                  }}
                >
                  <ArrowIcon />
                </div>
              )}
            </Fragment>
          ))}
        </div>

      </div>
    </section>
  );
}
