"use client";

import { useEffect, useState } from "react";
import { useScrollReveal } from "@/lib/hooks";

const EXPERIENCES = [
  { label: "편의점 야간 알바", body: "새벽 2시, 혼자 재고 정리하다 냉장고 온도 이상 발견. 바로 점장님께 연락했어요.", tags: ["알바", "책임감"] },
  { label: "면접 스터디 운영", body: "취업 준비 스터디를 직접 만들어 7명을 이끌었어요. 팀원 3명이 최종 합격했어요.", tags: ["리더십", "실행력"] },
  { label: "동아리 홍보 영상", body: "영상 기획·촬영·편집을 혼자 해서 SNS 조회수 2만 뷰를 달성했어요.", tags: ["동아리", "창의성"] },
  { label: "자취 생활 6개월", body: "월 예산 50만 원으로 생활비를 관리하며 자기관리를 배웠어요.", tags: ["자기관리", "계획성"] },
];

function CyclingCard() {
  const trigger = useScrollReveal(0.3, false);
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
      }, 350);
    }, 2800);
    return () => clearInterval(interval);
  }, [trigger.visible]);

  const exp = EXPERIENCES[idx];

  return (
    <div ref={trigger.ref} className="bg-grey-20 rounded-3xl p-10 max-lg:p-8 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-primary-100" />
        <span className="text-sm font-semibold text-grey-300 tracking-wide">경험 카드</span>
      </div>
      <div
        style={{
          opacity: fadeIn ? 1 : 0,
          transform: fadeIn ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <p className="text-grey-400 text-2xl max-lg:text-xl font-bold mb-3 [word-break:keep-all]">{exp.label}</p>
        <p className="text-grey-300 text-base leading-relaxed [word-break:keep-all]">{exp.body}</p>
      </div>
      <div
        className="flex gap-2 flex-wrap"
        style={{ opacity: fadeIn ? 1 : 0, transition: "opacity 0.3s ease 0.05s" }}
      >
        {exp.tags.map((tag) => (
          <span key={tag} className="bg-primary-20 text-primary-200 text-sm font-medium px-4 py-1.5 rounded-full">{tag}</span>
        ))}
      </div>
      <div className="flex gap-2 pt-2">
        {EXPERIENCES.map((_, i) => (
          <span
            key={i}
            className="h-1.5 rounded-full bg-primary-200 transition-all duration-300"
            style={{ width: i === idx ? "20px" : "6px", opacity: i === idx ? 1 : 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}

function AIMockup() {
  return (
    <div className="bg-grey-20 rounded-3xl p-10 max-lg:p-8 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-secondary-100" />
        <span className="text-sm font-semibold text-grey-300 tracking-wide">AI 핵심 역량 추출</span>
      </div>
      <div className="flex flex-col gap-5">
        {[
          { label: "책임감", pct: 88 },
          { label: "위기 대응력", pct: 76 },
          { label: "커뮤니케이션", pct: 82 },
          { label: "주도성", pct: 71 },
        ].map((t) => (
          <div key={t.label} className="flex items-center gap-4">
            <span className="text-sm text-grey-300 w-24 shrink-0">{t.label}</span>
            <div className="flex-1 h-2 bg-primary-20 rounded-full overflow-hidden">
              <div className="h-full bg-primary-200 rounded-full" style={{ width: `${t.pct}%` }} />
            </div>
            <span className="text-sm text-grey-200 w-10 text-right">{t.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DraftMockup() {
  return (
    <div className="bg-grey-20 rounded-3xl p-10 max-lg:p-8 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-icon-1" />
        <span className="text-sm font-semibold text-grey-300 tracking-wide">자소서 초안</span>
      </div>
      <div className="bg-white rounded-2xl p-6 border border-grey-70 flex flex-col gap-4">
        <p className="text-grey-200 text-xs font-semibold pb-3 border-b border-grey-70">
          Q. 본인의 가장 도전적인 경험을 기술하시오
        </p>
        <p className="text-grey-400 text-sm leading-relaxed [word-break:keep-all]">
          저는 책임감과 빠른 판단력을 갖추고 있습니다. 편의점 야간 근무 중 냉장 설비 이상을 발견하고 즉시 점장님께 연락하여 피해를 최소화한 경험이 이를 증명합니다. 단순한 아르바이트였지만, 맡은 일에 끝까지 책임을 다하는 자세를 배웠습니다.
        </p>
      </div>
      <div className="flex items-center gap-1.5 text-primary-200 text-sm font-semibold">
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
          <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        10초 만에 완성
      </div>
    </div>
  );
}

function StepBlock({
  number, title, description, visual, reverse,
}: {
  number: string; title: string; description: string;
  visual: React.ReactNode; reverse?: boolean;
}) {
  const text = useScrollReveal(0.15, false);
  const vis = useScrollReveal(0.15, false);

  return (
    <div className={`w-full px-20 max-lg:px-12 max-md:px-6 py-24 max-lg:py-16 border-t border-grey-70 flex items-center gap-16 max-lg:gap-10 max-md:flex-col max-md:gap-8 ${reverse ? "flex-row-reverse" : ""}`}>
      <div
        ref={text.ref}
        className="flex-1 flex flex-col gap-8"
        style={{
          opacity: text.visible ? 1 : 0,
          transform: text.visible ? "translateX(0)" : `translateX(${reverse ? "32px" : "-32px"})`,
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <span className="text-primary-100 text-8xl max-lg:text-7xl font-bold leading-none">{number}</span>
        <div className="flex flex-col gap-4">
          <h3 className="text-4xl max-lg:text-3xl max-md:text-2xl font-bold text-grey-400 [word-break:keep-all]">{title}</h3>
          <p className="text-xl max-md:text-base text-grey-200 leading-relaxed [word-break:keep-all]">{description}</p>
        </div>
      </div>
      <div
        ref={vis.ref}
        className="flex-1"
        style={{
          opacity: vis.visible ? 1 : 0,
          transform: vis.visible ? "translateX(0)" : `translateX(${reverse ? "-32px" : "32px"})`,
          transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
        }}
      >
        {visual}
      </div>
    </div>
  );
}

export default function HowItWorksV4() {
  const header = useScrollReveal(0.3, false);

  return (
    <section className="w-full bg-white">

      {/* 헤더 */}
      <div className="px-20 max-lg:px-12 max-md:px-6 pt-36 max-lg:pt-24 max-md:pt-16 pb-16 max-md:pb-10 flex flex-col items-center text-center gap-4">
        <div
          ref={header.ref}
          className="flex flex-col items-center gap-4 transition-all duration-700"
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
      </div>

      {/* 스텝 */}
      <StepBlock
        number="01"
        title="경험을 기록해요"
        description="어떤 경험이든 괜찮아요. 오늘 있었던 일을 짧게 메모하듯 기록하기만 하면 돼요."
        visual={<CyclingCard />}
      />
      <StepBlock
        number="02"
        title="AI가 소재를 발굴해요"
        description="로짓 AI가 평범한 일상에서 합격 포인트를 찾아드려요. 공모전이 없어도 괜찮아요."
        visual={<AIMockup />}
        reverse
      />
      <StepBlock
        number="03"
        title="자소서 초안 완성"
        description="문항에 맞는 자소서 초안을 10초 만에 생성해드려요. 이제 빈 화면 앞에서 멈추지 않아도 돼요."
        visual={<DraftMockup />}
      />

      <div className="pb-36 max-lg:pb-24 max-md:pb-16" />
    </section>
  );
}
