"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/lib/hooks";
import Image from "next/image";

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

function ease(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function norm(p: number, s: number, e: number) {
  return Math.max(0, Math.min(1, (p - s) / (e - s)));
}

// 카드별 수렴 시작 시점 (바깥 카드가 먼저 움직임)
const CARD_STAGGER = [0, 0.05, 0.10];

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
        setTimeout(() => { setCursor(false); onDone(); }, 400);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <h2 className="text-5xl max-lg:text-4xl max-md:text-2xl font-bold text-grey-400 leading-[1.3] [word-break:keep-all]">
      &ldquo;{displayed}
      {cursor && <span className="inline-block w-[3px] h-[1em] bg-grey-400 ml-1 align-middle animate-pulse" />}
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

  const convergeSpaceRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [vw, setVw] = useState(1200);

  useEffect(() => {
    setVw(window.innerWidth);
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = convergeSpaceRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      setP(Math.max(0, Math.min(1, -rect.top / total)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (section.visible && !hasStarted) setHasStarted(true);
    if (!section.visible && hasStarted) { setHasStarted(false); setQuoteDone(false); }
  }, [section.visible, hasStarted]);

  // 카드별 stagger — 0번(왼쪽)이 가장 먼저 수렴
  const cardTs = CARD_STAGGER.map(s => ease(norm(p, s, 0.50 + s)));

  // 중심 glow — 카드가 가까워질수록 밝아짐
  const glowT    = ease(norm(p, 0.05, 0.46));
  const glowSize = 60 + glowT * 420;

  // 로고 — 0.40 에 등장, 0.52~0.66 천천히 페이드아웃
  const logoAppear  = ease(norm(p, 0.40, 0.50));
  const logoFade    = ease(norm(p, 0.54, 0.68));
  const logoOpacity = Math.max(0, logoAppear * (1 - logoFade));
  const logoScale   = 0.6 + 0.4 * logoAppear;

  // 로고 링 (동심원 2개)
  const ringT    = ease(norm(p, 0.40, 0.52));
  const ringFade = ease(norm(p, 0.54, 0.68));
  const ring1Size = 60 + ringT * 48;
  const ring2Size = 60 + ringT * 90;
  const ringOp    = Math.max(0, ringT * 0.5 * (1 - ringFade));

  // 배경 확장
  const expandT    = ease(norm(p, 0.50, 0.82));
  const circleSize = 80 * (1 + expandT * 42);

  // 솔루션 텍스트 — 요소별 순차 등장 (더 일찍 + 스태거 축소 → 한번에 보이는 느낌)
  const labelT   = ease(norm(p, 0.58, 0.68));
  const headingT = ease(norm(p, 0.61, 0.71));
  const subT     = ease(norm(p, 0.64, 0.76));

  const isMobile = vw < 768;
  const padding  = vw >= 1024 ? 80 : 48;
  const colWidth = Math.max(120, (vw - 2 * padding - 48) / 3);
  const dx = colWidth + 24;
  const dy = 226;

  // 카드 transform: stagger별 개별 convergeT 사용
  const cardTransforms = CARD_STAGGER.map((_, i) => {
    const cT = cardTs[i];
    if (isMobile) {
      const offsets = [dy, 0, -dy];
      return `translate(0, ${offsets[i] * cT}px) scale(${1 - 0.88 * cT})`;
    } else {
      const offsets = [dx, 0, -dx];
      return `translate(${offsets[i] * cT}px, 0) scale(${1 - 0.88 * cT})`;
    }
  });

  return (
    <section className="w-full bg-grey-20">

      {/* ── 텍스트 인트로 ── */}
      <div className="pt-36 pb-20 max-lg:pt-24 max-lg:pb-14 max-md:pt-16 max-md:pb-10 w-full px-20 max-lg:px-12 max-md:px-6 flex flex-col items-center gap-20 max-lg:gap-14 max-md:gap-10">
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

          <div className="min-h-[160px] max-md:min-h-[100px] flex items-center justify-center">
            {hasStarted && <TypewriterQuote onDone={handleQuoteDone} />}
          </div>

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
      </div>

      {/* ── 카드 + 수렴 ── */}
      <div style={{ position: "relative" }}>

        {/* 카드 그리드 — sticky */}
        <div
          ref={cards.ref}
          className="w-full grid grid-cols-3 max-md:grid-cols-1 gap-6 max-md:gap-4 px-20 max-lg:px-12 max-md:px-6"
          style={{
            position: "sticky",
            top: "calc(50vh - 155px)",
            opacity: cards.visible ? 1 : 0,
            transform: cards.visible && cardTs[0] === 0 ? "translateY(0)" : cardTs[0] === 0 ? "translateY(40px)" : undefined,
            transition: cardTs[0] > 0 ? "none" : "opacity 0.7s ease-out 0.1s, transform 0.7s ease-out 0.1s",
            zIndex: 10,
          }}
        >
          {PAIN_POINTS.map((point, i) => {
            const cT = cardTs[i];
            const blurPx = cT * 16;
            return (
              <div
                key={i}
                className="bg-white rounded-3xl px-8 py-10 max-md:px-6 max-md:py-7 flex flex-col gap-5 border border-grey-70 select-none"
                style={{
                  boxShadow: "0 2px 24px rgba(59,111,232,0.07), 0 1px 6px rgba(0,0,0,0.04)",
                  transform: cardTransforms[i],
                  opacity: cT > 0 ? Math.pow(1 - cT, 0.7) : undefined,
                  filter: blurPx > 0.5 ? `blur(${blurPx}px)` : undefined,
                  transition: cT > 0 ? "none" : "transform 0.15s ease-out",
                  transformOrigin: "center center",
                  willChange: "transform, opacity, filter",
                }}
              >
                <span className="text-primary-100 text-4xl max-md:text-2xl font-bold">0{i + 1}</span>
                <p className="text-grey-400 text-2xl max-lg:text-xl max-md:text-lg font-bold leading-snug [word-break:keep-all]">
                  {point.question}
                </p>
                <p className="text-grey-200 text-lg max-md:text-sm leading-relaxed [word-break:keep-all]">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* 수렴 오버레이 공간 */}
        <div ref={convergeSpaceRef} style={{ height: "400vh" }} className="relative">
          <div className="sticky top-0 h-screen overflow-hidden pointer-events-none">

            {/* 중심 glow — 카드 수렴 시 빛이 모임 */}
            <div style={{
              position: "absolute",
              left: "50%", top: "50%",
              width: `${glowSize}px`, height: `${glowSize}px`,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(75,192,250,0.22) 0%, rgba(101,193,237,0.07) 50%, transparent 72%)",
              transform: "translate(-50%, -50%)",
              opacity: glowT * (1 - expandT * 2),
              zIndex: 1,
            }} />

            {/* 배경 확장 원 — 브랜드 하늘색 그라디언트 */}
            <div style={{
              position: "absolute",
              width: `${circleSize}px`, height: `${circleSize}px`,
              borderRadius: "50%",
              background: "radial-gradient(circle at 38% 36%, #A8DEFA, #65C1ED 35%, #4BC0FA 60%, #2571EB)",
              left: "50%", top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
              opacity: expandT > 0 ? 1 : 0,
            }} />

            {/* 로고 링 2개 — 동심원 */}
            <div style={{
              position: "absolute", left: "50%", top: "50%",
              width: `${ring1Size}px`, height: `${ring1Size}px`,
              borderRadius: "50%",
              border: "1.5px solid rgba(59,111,232,0.45)",
              transform: "translate(-50%, -50%)",
              opacity: ringOp,
              zIndex: 3,
            }} />
            <div style={{
              position: "absolute", left: "50%", top: "50%",
              width: `${ring2Size}px`, height: `${ring2Size}px`,
              borderRadius: "50%",
              border: "1px solid rgba(59,111,232,0.18)",
              transform: "translate(-50%, -50%)",
              opacity: ringOp * 0.6,
              zIndex: 3,
            }} />

            {/* 로고 */}
            <div style={{
              position: "absolute", left: "50%", top: "50%",
              transform: `translate(-50%, -50%) scale(${logoScale})`,
              zIndex: 4,
              opacity: logoOpacity,
            }}>
              <Image src="/logo_symbol_2d.svg" alt="로짓" width={52} height={52} />
            </div>

            {/* 솔루션 텍스트 — 요소별 순차 등장 */}
            <div style={{
              position: "absolute", left: 0, right: 0, top: "50%",
              transform: "translateY(-50%)",
              zIndex: 5,
              textAlign: "center", padding: "0 3rem",
              pointerEvents: "none",
            }}>
              <p
                className="text-white/60 text-sm font-semibold mb-5 tracking-[0.15em] uppercase"
                style={{ opacity: labelT, transform: `translateY(${(1 - labelT) * 14}px)` }}
              >
                그래서 로짓이 나왔어요
              </p>
              <h2
                className="text-5xl max-lg:text-4xl max-md:text-3xl font-bold text-white leading-[1.2] [word-break:keep-all] mb-6"
                style={{ opacity: headingT, transform: `translateY(${(1 - headingT) * 20}px)` }}
              >
                당신의 평범한 일상이<br />합격의 재료가 됩니다
              </h2>
              <p
                className="text-white/75 text-xl max-md:text-base max-w-xl mx-auto leading-relaxed [word-break:keep-all]"
                style={{ opacity: subT, transform: `translateY(${(1 - subT) * 14}px)` }}
              >
                어떤 경험이든, 어떤 일상이든 괜찮아요.{" "}
                로짓이 당신만의 합격 스토리를 찾아드릴게요.
              </p>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
