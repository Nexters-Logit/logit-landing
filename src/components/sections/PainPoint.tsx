"use client";

import { useEffect, useRef, useState } from "react";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

const PAIN_POINTS = [
  {
    question: "어떤 경험을 써야 하지?",
    description: "매번 자소서를 열어도 경험란 앞에서 멈추게 돼요.",
  },
  {
    question: "내 경험이 너무 평범한 것 같아",
    description: "공모전도, 인턴십도 없는 평범한 일상이 자소서 소재가 될 수 있을까요?",
  },
  {
    question: "매번 처음부터 다시 쓰는 자소서",
    description: "회사마다 비슷한 질문인데, 왜 항상 백지에서 시작해야 할까요?",
  },
];

export default function PainPoint() {
  const header = useScrollReveal();
  const cards = useScrollReveal();

  return (
    <section className="w-full bg-grey-20 py-36 max-lg:py-24 max-md:py-16">
      <div className="w-full px-20 max-lg:px-12 max-md:px-6 flex flex-col items-center gap-20 max-lg:gap-14 max-md:gap-10">

        {/* 헤드 카피 */}
        <div
          ref={header.ref}
          className="flex flex-col items-center text-center gap-8 max-md:gap-5 transition-all duration-700 ease-out"
          style={{
            opacity: header.visible ? 1 : 0,
            transform: header.visible ? "translateY(0)" : "translateY(32px)",
          }}
        >
          <p className="text-grey-200 text-xl max-md:text-base font-medium">
            많은 취준생들이 이런 생각을 해요
          </p>
          <h2 className="text-6xl max-lg:text-5xl max-md:text-3xl font-bold text-grey-400 leading-[1.3] [word-break:keep-all]">
            &ldquo;자소서 문항: 본인의 가장 도전적인<br className="max-md:hidden" />
            {" "}경험을 기술하시오&rdquo;
          </h2>
          <p className="text-4xl max-lg:text-3xl max-md:text-xl font-semibold text-primary-200 [word-break:keep-all]">
            잠시만요, 제 인생에<br className="max-md:hidden" />
            {" "}그렇게 거창한 도전은 없었는데요?
          </p>
          <p className="text-xl max-md:text-base text-grey-200 leading-relaxed max-w-2xl [word-break:keep-all]">
            대단한 공모전 수상, 거창한 인턴십만 스펙이 아닙니다.<br className="max-md:hidden" />
            {" "}당신의 사소한 일상 속 숨겨진 합격 DNA를 AI가 찾아드릴게요.
          </p>
        </div>

        {/* 페인포인트 카드 3개 */}
        <div
          ref={cards.ref}
          className="w-full grid grid-cols-3 max-md:grid-cols-1 gap-6 max-md:gap-4"
          style={{
            opacity: cards.visible ? 1 : 0,
            transform: cards.visible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.7s ease-out 0.2s, transform 0.7s ease-out 0.2s",
          }}
        >
          {PAIN_POINTS.map((point, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl px-8 py-10 max-md:px-6 max-md:py-7 flex flex-col gap-5 border border-grey-70"
            >
              <span className="text-primary-100 text-4xl max-md:text-2xl font-bold">0{i + 1}</span>
              <p className="text-grey-400 text-2xl max-lg:text-xl max-md:text-lg font-bold leading-snug [word-break:keep-all]">
                {point.question}
              </p>
              <p className="text-grey-200 text-lg max-md:text-sm leading-relaxed [word-break:keep-all]">
                {point.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
