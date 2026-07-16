"use client";

import { useScrollReveal } from "@/lib/hooks";

const FEATURES = [
  {
    number: "01",
    title: "기억나는 대로 툭툭 적어도 괜찮아요",
    description: "날짜, 장소, 키워드만 던져주세요. AI가 구조화된 경험 카드로 정리해 드립니다.",
    tags: ["편의점 야간 알바", "왕복 3시간 통학", "동아리 홍보 영상"],
  },
  {
    number: "02",
    title: "평범한 일상이 직무 역량으로 바뀌어요",
    description: "자주 나오는 자소서 단골 질문에 맞춰 당신의 경험을 역량 언어로 풀어냅니다.",
    tags: ["시간 관리 역량", "책임감", "창의성 · 실행력"],
  },
  {
    number: "03",
    title: "경험 카드 고르면 자소서 초안 3초 컷",
    description: "원하는 경험 카드를 조합하면 AI가 자소서 초안을 즉시 생성해 드립니다.",
    tags: ["자소서 초안 완성", "경험 카드 조합", "AI 생성"],
  },
];

export default function Features() {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section className="w-full py-32 max-md:py-20 px-20 max-lg:px-12 max-md:px-6 bg-white">
      <div ref={ref}>
      {/* 섹션 헤더 */}
      <div
        className="text-center mb-16 max-md:mb-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <span className="bg-primary-50 text-primary-200 text-sm font-semibold px-4 py-1.5 rounded-full">
          핵심 기능
        </span>
        <h2 className="mt-5 text-5xl max-lg:text-4xl max-md:text-3xl font-bold text-grey-400 leading-tight [word-break:keep-all]">
          로짓, 이렇게 씁니다
        </h2>
      </div>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-6 max-w-6xl mx-auto">
        {FEATURES.map((feature, i) => (
          <div
            key={i}
            className="bg-grey-20 rounded-3xl p-8 max-md:p-6 flex flex-col gap-6 border border-grey-70"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms`,
            }}
          >
            {/* 번호 */}
            <span className="text-4xl font-bold text-primary-60 leading-none">
              {feature.number}
            </span>

            {/* 텍스트 */}
            <div className="flex flex-col gap-3 flex-1">
              <h3 className="text-xl max-md:text-lg font-bold text-grey-400 leading-snug [word-break:keep-all]">
                {feature.title}
              </h3>
              <p className="text-grey-300 text-base leading-relaxed [word-break:keep-all]">
                {feature.description}
              </p>
            </div>

            {/* 태그 */}
            <div className="flex flex-wrap gap-2">
              {feature.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white border border-grey-70 text-grey-300 text-sm font-medium px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
