"use client";

import { useEffect, useState } from "react";
import { useScrollReveal } from "@/lib/hooks";

const TRANSFORMATIONS = [
  { from: "왕복 3시간 통학", to: ["시간 관리 역량", "자기계발 의지"] },
  { from: "편의점 야간 알바", to: ["책임감", "위기 대응력"] },
  { from: "동아리 영상 제작", to: ["창의성", "실행력"] },
  { from: "팀 프로젝트 갈등", to: ["협업 능력", "소통·조율"] },
  { from: "넷플릭스 정주행", to: ["집중력", "스토리텔링"] },
];

function TransformVisual({ active }: { active: boolean }) {
  const [idx, setIdx] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    if (!active) { setIdx(0); setOut(false); return; }
    const interval = setInterval(() => {
      setOut(true);
      setTimeout(() => {
        setIdx((p) => (p + 1) % TRANSFORMATIONS.length);
        setOut(false);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, [active]);

  const item = TRANSFORMATIONS[idx];
  const fadeStyle: React.CSSProperties = {
    opacity: out ? 0 : 1,
    transform: out ? "translateY(8px)" : "translateY(0)",
    transition: "opacity 0.35s ease, transform 0.35s ease",
  };

  return (
    <div className="flex items-center gap-6 max-md:gap-4 w-full max-w-xl">
      {/* 일상 경험 */}
      <div className="flex-1 bg-white rounded-2xl p-6 max-md:p-4 border border-grey-70 shadow-sm" style={fadeStyle}>
        <p className="text-grey-200 text-xs font-semibold mb-3 tracking-wide uppercase">일상</p>
        <p className="text-grey-400 font-bold text-xl max-md:text-base [word-break:keep-all]">
          {item.from}
        </p>
      </div>

      {/* 화살표 */}
      <div className="shrink-0 flex flex-col items-center gap-1">
        <svg width="36" height="20" viewBox="0 0 36 20" fill="none">
          <path d="M0 10H32M32 10L24 2M32 10L24 18" stroke="#93BBFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-primary-100 text-[10px] font-semibold tracking-wide whitespace-nowrap">AI 해석</span>
      </div>

      {/* 역량 언어 */}
      <div className="flex-1 bg-white rounded-2xl p-6 max-md:p-4 border border-primary-100 shadow-sm" style={fadeStyle}>
        <p className="text-primary-200 text-xs font-semibold mb-3 tracking-wide uppercase">직무 역량</p>
        <div className="flex flex-col gap-2">
          {item.to.map((t) => (
            <span key={t} className="text-primary-200 font-bold text-xl max-md:text-base [word-break:keep-all]">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Feature2() {
  const section = useScrollReveal(0.15, false);
  const visual = useScrollReveal(0.2, false);

  return (
    <section
      className="w-full min-h-screen flex items-center py-32 max-lg:py-24 max-md:py-16"
      style={{ background: "linear-gradient(135deg, #E2ECFF 0%, #E9F2FF 35%, #E5EEFF 65%, #F0F6FF 100%)" }}
    >
      <div className="w-full px-20 max-lg:px-12 max-md:px-6 flex flex-col items-center gap-20 max-lg:gap-14 max-md:gap-12">

        {/* 텍스트 */}
        <div
          ref={section.ref}
          className="flex flex-col items-center text-center gap-6 max-w-2xl transition-all duration-700"
          style={{
            opacity: section.visible ? 1 : 0,
            transform: section.visible ? "translateY(0)" : "translateY(28px)",
          }}
        >
          <span className="text-primary-200 text-sm font-semibold tracking-[0.2em] uppercase">스토리 확장</span>
          <h2 className="text-5xl max-lg:text-4xl max-md:text-3xl font-bold text-grey-400 leading-[1.2] [word-break:keep-all]">
            프로 통학러의 일상이<br />&lsquo;시간 관리 역량&rsquo;으로<br />변하는 마법
          </h2>
          <p className="text-xl max-md:text-base text-grey-200 leading-relaxed [word-break:keep-all]">
            자주 나오는 자소서 단골 질문(도전, 협업, 갈등 해결 등)에 맞춰, 당신의 평범한 일상을 인사담당자가 좋아하는 직무 역량 언어로 풀어냅니다.
          </p>
        </div>

        {/* 변환 비주얼 */}
        <div
          ref={visual.ref}
          className="w-full flex justify-center transition-all duration-700"
          style={{
            opacity: visual.visible ? 1 : 0,
            transform: visual.visible ? "translateY(0)" : "translateY(32px)",
            transitionDelay: "150ms",
          }}
        >
          <TransformVisual active={visual.visible} />
        </div>

      </div>
    </section>
  );
}
