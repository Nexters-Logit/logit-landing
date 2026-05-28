"use client";

import { useCallback, useEffect, useState } from "react";
import { useScrollReveal } from "@/lib/hooks";

const QUOTE = "자소서 문항: 본인의 가장 도전적인 경험을 기술하시오";

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

function TypewriterQuote({ onDone }: { onDone: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(QUOTE.slice(0, i));
      if (i >= QUOTE.length) {
        clearInterval(interval);
        setTimeout(() => {
          setCursor(false);
          onDone();
        }, 400);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <h2 className="text-5xl max-lg:text-4xl max-md:text-2xl font-bold text-grey-400 leading-[1.3] [word-break:keep-all]">
      &ldquo;{displayed}
      {cursor && (
        <span className="inline-block w-[3px] h-[1em] bg-grey-400 ml-1 align-middle animate-pulse" />
      )}
      {!cursor && <>&rdquo;</>}
    </h2>
  );
}

export default function PainPoint() {
  const section = useScrollReveal(0.1, false);
  const [quoteDone, setQuoteDone] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const cards = useScrollReveal(0.1, false);
  const handleQuoteDone = useCallback(() => setQuoteDone(true), []);

  useEffect(() => {
    if (section.visible && !hasStarted) {
      setHasStarted(true);
    }
    if (!section.visible && hasStarted) {
      setHasStarted(false);
      setQuoteDone(false);
    }
  }, [section.visible, hasStarted]);

  return (
    <section className="w-full bg-grey-20 py-36 max-lg:py-24 max-md:py-16">
      <div className="w-full px-20 max-lg:px-12 max-md:px-6 flex flex-col items-center gap-20 max-lg:gap-14 max-md:gap-10">

        <div
          ref={section.ref}
          className="flex flex-col items-center text-center gap-8 max-md:gap-5 w-full max-w-4xl"
        >
          <p
            className="text-grey-200 text-xl max-md:text-base font-medium transition-all duration-700"
            style={{
              opacity: section.visible ? 1 : 0,
              transform: section.visible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            많은 취준생들이 이런 생각을 해요
          </p>

          {/* 타이핑 Quote */}
          <div className="min-h-[160px] max-md:min-h-[100px] flex items-center justify-center">
            {hasStarted && (
              <TypewriterQuote onDone={handleQuoteDone} />
            )}
          </div>

          {/* 반응 문구 */}
          <div
            className="transition-all duration-600"
            style={{
              opacity: quoteDone ? 1 : 0,
              transform: quoteDone ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
            }}
          >
            <p className="text-4xl max-lg:text-3xl max-md:text-xl font-bold text-primary-200 [word-break:keep-all]">
              잠시만요, 제 인생에<br className="max-md:hidden" />
              {" "}그렇게 거창한 도전은 없었는데요?
            </p>
          </div>

          {/* 서브 카피 */}
          <p
            className="text-xl max-md:text-base text-grey-200 leading-relaxed max-w-2xl [word-break:keep-all] transition-all duration-700"
            style={{
              opacity: quoteDone ? 1 : 0,
              transform: quoteDone ? "translateY(0)" : "translateY(12px)",
              transitionDelay: "200ms",
            }}
          >
            대단한 공모전 수상, 거창한 인턴십만 스펙이 아닙니다.<br className="max-md:hidden" />
            {" "}당신의 사소한 일상 속 숨겨진 합격 DNA를 AI가 찾아드릴게요.
          </p>
        </div>

        {/* 카드 */}
        <div
          ref={cards.ref}
          className="w-full grid grid-cols-3 max-md:grid-cols-1 gap-6 max-md:gap-4"
          style={{
            opacity: cards.visible ? 1 : 0,
            transform: cards.visible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.7s ease-out 0.1s, transform 0.7s ease-out 0.1s",
          }}
        >
          {PAIN_POINTS.map((point, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl px-8 py-10 max-md:px-6 max-md:py-7 flex flex-col gap-5 border border-grey-70 cursor-pointer select-none transition-transform duration-150 ease-out hover:-translate-y-1 active:scale-[0.97] active:shadow-none"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
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
