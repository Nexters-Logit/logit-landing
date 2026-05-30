"use client";

import { useEffect, useState } from "react";
import { useScrollReveal } from "@/lib/hooks";

const SELECTED_CARDS = [
  { label: "편의점 야간 알바", tags: ["책임감"] },
  { label: "면접 스터디 운영", tags: ["리더십"] },
];

const DRAFT = "저는 책임감과 리더십을 갖추고 있습니다. 편의점 야간 근무 중 돌발 상황에 즉시 대응한 경험과, 취업 스터디를 직접 이끌어 팀원 3명을 합격으로 이끈 경험이 이를 증명합니다.";

function DraftVisual({ active }: { active: boolean }) {
  const [drafted, setDrafted] = useState(false);
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!active) { setDrafted(false); setDisplayed(""); return; }
    const t1 = setTimeout(() => setDrafted(true), 800);
    let interval: ReturnType<typeof setInterval>;
    const t2 = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        i++;
        setDisplayed(DRAFT.slice(0, i));
        if (i >= DRAFT.length) clearInterval(interval);
      }, 22);
    }, 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearInterval(interval); };
  }, [active]);

  return (
    <div className="w-full max-w-lg flex flex-col gap-4">
      {/* 선택된 경험 카드들 */}
      <div className="flex gap-3 max-md:flex-col">
        {SELECTED_CARDS.map((card, i) => (
          <div
            key={i}
            className="flex-1 bg-white border border-grey-70 rounded-xl p-4 flex flex-col gap-2 transition-all duration-500 shadow-sm"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? "translateY(0)" : "translateY(16px)",
              transitionDelay: `${i * 150}ms`,
            }}
          >
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-primary-200 flex items-center justify-center shrink-0">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-grey-400 text-xs font-semibold">{card.label}</span>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {card.tags.map((tag) => (
                <span key={tag} className="bg-grey-50 text-grey-300 text-xs px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 화살표 + "3초 컷" 라벨 */}
      <div
        className="flex items-center gap-3 transition-all duration-500"
        style={{ opacity: drafted ? 1 : 0, transitionDelay: "0ms" }}
      >
        <div className="flex-1 h-px bg-grey-100" />
        <span className="text-grey-300 text-xs font-semibold tracking-wide">AI 초안 생성 중</span>
        <div className="flex-1 h-px bg-grey-100" />
      </div>

      {/* 초안 출력 */}
      <div
        className="bg-white border border-grey-70 rounded-xl p-5 min-h-[120px] transition-all duration-500 shadow-sm"
        style={{ opacity: drafted ? 1 : 0 }}
      >
        <p className="text-grey-400 text-sm leading-relaxed [word-break:keep-all]">
          {displayed}
          {displayed.length > 0 && displayed.length < DRAFT.length && (
            <span className="inline-block w-0.5 h-3.5 bg-grey-400 ml-0.5 align-middle animate-pulse" />
          )}
        </p>
      </div>

      {/* 완성 배지 */}
      <div
        className="flex items-center justify-end gap-1.5 transition-all duration-500"
        style={{ opacity: displayed.length >= DRAFT.length ? 1 : 0 }}
      >
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
          <path d="M2 6L5 9L10 3" stroke="#34C759" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-grey-300 text-xs font-semibold">초안 완성</span>
      </div>
    </div>
  );
}

export default function Feature3() {
  const section = useScrollReveal(0.15, false);
  const visual = useScrollReveal(0.2, false);

  return (
    <section className="w-full min-h-screen flex items-center bg-primary-50 py-32 max-lg:py-24 max-md:py-16">
      <div className="w-full px-20 max-lg:px-12 max-md:px-6 flex items-center gap-20 max-lg:gap-12 max-md:flex-col max-md:gap-12">

        {/* 텍스트 */}
        <div
          ref={section.ref}
          className="flex-1 flex flex-col gap-8 transition-all duration-700"
          style={{
            opacity: section.visible ? 1 : 0,
            transform: section.visible ? "translateX(0)" : "translateX(-32px)",
          }}
        >
          <span className="text-primary-200 text-sm font-semibold tracking-[0.2em] uppercase">초안 고속 생성</span>
          <h2 className="text-5xl max-lg:text-4xl max-md:text-3xl font-bold text-grey-400 leading-[1.2] [word-break:keep-all]">
            경험 카드 조합하면,<br />자소서 초안 3초 컷
          </h2>
          <p className="text-xl max-md:text-base text-grey-200 leading-relaxed max-w-md [word-break:keep-all]">
            원하는 문항을 고르고 매칭할 경험 카드를 선택하면 끝. 맞춤법부터 자연스러운 문맥 흐름까지 완벽한 초안을 눈앞에 대령합니다.
          </p>
        </div>

        {/* 초안 생성 비주얼 */}
        <div
          ref={visual.ref}
          className="flex-1 flex justify-center max-md:w-full transition-all duration-700"
          style={{
            opacity: visual.visible ? 1 : 0,
            transform: visual.visible ? "translateX(0)" : "translateX(32px)",
            transitionDelay: "150ms",
          }}
        >
          <DraftVisual active={visual.visible} />
        </div>

      </div>
    </section>
  );
}
