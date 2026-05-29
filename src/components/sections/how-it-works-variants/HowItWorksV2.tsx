"use client";

import { useEffect, useState } from "react";
import { useScrollReveal } from "@/lib/hooks";

function ExperienceMockup() {
  return (
    <div className="bg-white rounded-2xl p-4 border border-grey-70 flex flex-col gap-3">
      <div className="flex items-center gap-2 pb-2 border-b border-grey-70">
        <span className="w-2 h-2 rounded-full bg-primary-100 shrink-0" />
        <span className="text-xs font-semibold text-grey-300 tracking-wide">경험 카드</span>
      </div>
      <p className="text-grey-400 text-sm leading-relaxed">
        편의점 야간 알바 3개월. 새벽 2시에 혼자 재고 정리하다가 냉장고 온도 이상을 발견해서 점장님께 바로 연락했어요.
      </p>
      <div className="flex gap-2 flex-wrap">
        <span className="bg-primary-20 text-primary-200 text-xs font-medium px-2.5 py-1 rounded-full">알바</span>
        <span className="bg-primary-20 text-primary-200 text-xs font-medium px-2.5 py-1 rounded-full">책임감</span>
      </div>
    </div>
  );
}

function AIMockup() {
  const traits = [
    { label: "책임감", pct: 88 },
    { label: "위기 대응력", pct: 76 },
    { label: "커뮤니케이션", pct: 82 },
  ];
  return (
    <div className="bg-white rounded-2xl p-4 border border-grey-70 flex flex-col gap-3">
      <div className="flex items-center gap-2 pb-2 border-b border-grey-70">
        <span className="w-2 h-2 rounded-full bg-secondary-100 shrink-0" />
        <span className="text-xs font-semibold text-grey-300 tracking-wide">AI 핵심 역량 추출</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {traits.map((t) => (
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

function StepCard({ number, title, description, children }: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-grey-20 rounded-3xl p-8 max-lg:p-6 flex flex-col gap-6 h-full">
      <span className="text-primary-100 text-3xl font-bold">{number}</span>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl max-lg:text-lg font-bold text-grey-400 [word-break:keep-all]">{title}</h3>
        <p className="text-grey-200 text-sm leading-relaxed [word-break:keep-all]">{description}</p>
      </div>
      {children}
    </div>
  );
}

export default function HowItWorksV2() {
  const trigger = useScrollReveal(0.15, false);
  const [seq, setSeq] = useState(0);

  useEffect(() => {
    if (trigger.visible) {
      const timers = [
        setTimeout(() => setSeq(1), 100),
        setTimeout(() => setSeq(2), 650),
        setTimeout(() => setSeq(3), 950),
        setTimeout(() => setSeq(4), 1500),
        setTimeout(() => setSeq(5), 1800),
      ];
      return () => timers.forEach(clearTimeout);
    } else {
      setSeq(0);
    }
  }, [trigger.visible]);

  const show = (n: number) => seq >= n;

  const cardStyle = (n: number): React.CSSProperties => ({
    opacity: show(n) ? 1 : 0,
    transform: show(n) ? "translateY(0)" : "translateY(24px)",
    transition: "opacity 0.6s ease, transform 0.6s ease",
  });

  const arrowStyle = (n: number): React.CSSProperties => ({
    opacity: show(n) ? 1 : 0,
    transform: show(n) ? "scaleX(1)" : "scaleX(0)",
    transformOrigin: "left center",
    transition: "opacity 0.35s ease, transform 0.35s ease",
  });

  return (
    <section className="w-full bg-white py-36 max-lg:py-24 max-md:py-16">
      <div
        ref={trigger.ref}
        className="w-full px-20 max-lg:px-12 max-md:px-6 flex flex-col items-center gap-20 max-lg:gap-14 max-md:gap-10"
      >

        {/* 헤더 */}
        <div
          className="flex flex-col items-center text-center gap-4"
          style={cardStyle(1)}
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
        <div className="w-full flex items-center gap-3 max-md:flex-col max-md:items-stretch max-md:gap-5">

          <div className="flex-1" style={cardStyle(1)}>
            <StepCard number="01" title="경험을 기록해요" description="오늘 있었던 일을 짧게 메모하듯 기록해요. 거창하지 않아도 괜찮아요.">
              <ExperienceMockup />
            </StepCard>
          </div>

          <div className="shrink-0 max-md:hidden" style={arrowStyle(2)}>
            <ArrowIcon />
          </div>

          <div className="flex-1" style={cardStyle(3)}>
            <StepCard number="02" title="AI가 소재를 발굴해요" description="로짓 AI가 평범한 일상에서 합격 포인트를 찾아드려요.">
              <AIMockup />
            </StepCard>
          </div>

          <div className="shrink-0 max-md:hidden" style={arrowStyle(4)}>
            <ArrowIcon />
          </div>

          <div className="flex-1" style={cardStyle(5)}>
            <StepCard number="03" title="자소서 초안 완성" description="문항에 맞는 자소서 초안을 10초 만에 생성해드려요.">
              <DraftMockup />
            </StepCard>
          </div>

        </div>
      </div>
    </section>
  );
}
