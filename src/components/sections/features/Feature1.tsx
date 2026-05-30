"use client";

import { useEffect, useState } from "react";
import { useScrollReveal } from "@/lib/hooks";

const EXPERIENCES = [
  { label: "편의점 야간 알바", body: "새벽 2시, 혼자 재고 정리하다 냉장고 온도 이상 발견.", tags: ["알바", "책임감"] },
  { label: "왕복 3시간 통학", body: "지하철에서 매일 책 읽고, 단어 외우고, 팟캐스트 들었어요.", tags: ["통학", "자기계발"] },
  { label: "동아리 홍보 영상", body: "기획부터 편집까지 혼자 완성해 조회수 2만을 달성했어요.", tags: ["동아리", "창의성"] },
  { label: "자취 생활 6개월", body: "월 50만 원으로 혼자 생활비를 관리하며 버텼어요.", tags: ["자기관리", "계획성"] },
  { label: "넷플릭스 정주행", body: "주말마다 드라마 완주하며 스토리텔링 감각을 키웠어요.", tags: ["취미", "집중력"] },
];

function ExperienceCard({ exp }: { exp: typeof EXPERIENCES[0] }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-grey-70 flex flex-col gap-3 w-full shadow-sm">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary-100 shrink-0" />
        <span className="text-xs font-semibold text-grey-300 tracking-wide">경험 카드</span>
      </div>
      <p className="text-grey-400 font-bold text-lg [word-break:keep-all]">{exp.label}</p>
      <p className="text-grey-300 text-sm leading-relaxed [word-break:keep-all]">{exp.body}</p>
      <div className="flex gap-2 flex-wrap mt-auto pt-1">
        {exp.tags.map((tag) => (
          <span key={tag} className="bg-primary-20 text-primary-200 text-xs font-medium px-3 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function CardDeck({ active }: { active: boolean }) {
  const [idx, setIdx] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    if (!active) { setIdx(0); setOut(false); return; }
    const interval = setInterval(() => {
      setOut(true);
      setTimeout(() => {
        setIdx((p) => (p + 1) % EXPERIENCES.length);
        setOut(false);
      }, 380);
    }, 3000);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="relative w-full max-w-sm" style={{ height: "260px" }}>
      {/* 뒷 카드 2 */}
      <div
        className="absolute inset-0"
        style={{ transform: "translateY(-20px) translateX(20px) rotate(4deg)", opacity: 0.4, pointerEvents: "none" }}
      >
        <ExperienceCard exp={EXPERIENCES[(idx + 2) % EXPERIENCES.length]} />
      </div>
      {/* 뒷 카드 1 */}
      <div
        className="absolute inset-0"
        style={{ transform: "translateY(-10px) translateX(10px) rotate(2deg)", opacity: 0.7, pointerEvents: "none" }}
      >
        <ExperienceCard exp={EXPERIENCES[(idx + 1) % EXPERIENCES.length]} />
      </div>
      {/* 앞 카드 */}
      <div
        className="absolute inset-0"
        style={{
          opacity: out ? 0 : 1,
          transform: out ? "translateY(12px) scale(0.97)" : "translateY(0) scale(1)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}
      >
        <ExperienceCard exp={EXPERIENCES[idx]} />
      </div>
    </div>
  );
}

export default function Feature1() {
  const section = useScrollReveal(0.15, false);
  const visual = useScrollReveal(0.15, false);

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
          <span className="text-primary-200 text-sm font-semibold tracking-[0.2em] uppercase">편안한 경험 등록</span>
          <h2 className="text-5xl max-lg:text-4xl max-md:text-3xl font-bold text-grey-400 leading-[1.2] [word-break:keep-all]">
            기억나는 대로 툭툭-<br />낙서하듯 적어도<br />괜찮아요.
          </h2>
          <p className="text-xl max-md:text-base text-grey-200 leading-relaxed max-w-md [word-break:keep-all]">
            날짜, 장소, 키워드만 던져주세요. 정리되지 않은 당신의 기억을 AI가 구조화된 '경험 카드'로 깔끔하게 박제해 드립니다.
          </p>
        </div>

        {/* 카드 덱 */}
        <div
          ref={visual.ref}
          className="flex-1 flex justify-center max-md:w-full transition-all duration-700"
          style={{
            opacity: visual.visible ? 1 : 0,
            transform: visual.visible ? "translateX(0)" : "translateX(32px)",
            transitionDelay: "150ms",
          }}
        >
          <CardDeck active={visual.visible} />
        </div>

      </div>
    </section>
  );
}
