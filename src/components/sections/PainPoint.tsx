"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/lib/hooks";
import Image from "next/image";

const QUOTE = "자소서가 어려운 이유, 글솜씨 때문만이 아닙니다";

const PAIN_POINTS = [
  {
    question: "경험은 있는데 어디에 써야 할지 모르겠어요",
    description: "프로젝트, 인턴, 대외활동은 했는데 어떤 문항에\n어떤 경험을 넣어야 할지 막막합니다.",
  },
  {
    question: "AI가 써준 글이 내 이야기 같지 않아요",
    description: "문장은 그럴듯하지만, 면접에서 설명하기 어려운\n답변이 만들어집니다.",
  },
  {
    question: "공고마다 자소서를 다시 쓰는 게 힘들어요",
    description: "비슷한 경험을 매번 새로 정리하고, 문항에 맞게\n다시 고쳐야 합니다.",
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

export default function PainPoint() {
  const section = useScrollReveal(0.3, false);
  const cards = useScrollReveal(0.3, false);

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

  // 솔루션 텍스트 — 요소별 순차 등장
  const labelT   = ease(norm(p, 0.58, 0.68));
  const headingT = ease(norm(p, 0.61, 0.71));
  const subT     = ease(norm(p, 0.64, 0.76));
  // 텍스트 퇴장 — 수렴 공간 끝에 딱 맞춰 위로 슬라이드 fade-out
  const textExitT = ease(norm(p, 0.88, 1.0));

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
    <section className="w-full bg-[#E4EEFD]">

      {/* ── 텍스트 인트로 ── */}
      <div className="pt-36 pb-20 max-lg:pt-24 max-lg:pb-14 max-md:pt-16 max-md:pb-10 w-full px-20 max-lg:px-12 max-md:px-6 flex flex-col items-center gap-20 max-lg:gap-14 max-md:gap-10">
        <div
          ref={section.ref}
          className="flex flex-col items-center text-center gap-8 max-md:gap-5 w-full max-w-4xl"
        >
          <p
            className="text-grey-300 text-[24px] font-normal leading-[120%] text-center w-full"
            style={{
              opacity: section.visible ? 1 : 0,
              transform: section.visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0ms, transform 0.7s ease 0ms",
            }}
          >
            자소서 작성, 왜 매번 이렇게 어려울까요?
          </p>

          <h2
            className="text-[40px] max-md:text-2xl font-bold text-grey-400 leading-[120%] text-center w-full [word-break:keep-all]"
            style={{
              opacity: section.visible ? 1 : 0,
              transform: section.visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 150ms, transform 0.7s ease 150ms",
            }}
          >
            &ldquo;{QUOTE}&rdquo;
          </h2>
        </div>
      </div>

      {/* ── 카드 + 수렴 ── */}
      <div style={{ position: "relative" }}>

        {/* 카드 그리드 — sticky */}
        <div
          ref={cards.ref}
          className="w-full grid grid-cols-3 max-md:grid-cols-1 gap-6 max-md:gap-4 px-[181px] max-lg:px-[100px] max-md:px-6 items-start"
          style={{
            position: "sticky",
            top: "calc(50vh - 155px)",
            zIndex: 10,
          }}
        >
          {PAIN_POINTS.map((point, i) => {
            const cT = cardTs[i];
            const blurPx = cT * 16;
            const cardDelay = i * 150;
            return (
              <div
                key={i}
                className="select-none"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  alignSelf: "start",
                  padding: "24px",
                  borderRadius: "20px",
                  background: "#FFF",
                  boxShadow: "0 4px 32px 0 rgba(0, 0, 0, 0.12)",
                  transform: cT > 0
                    ? cardTransforms[i]
                    : cards.visible ? "translateY(0)" : "translateY(40px)",
                  opacity: cT > 0
                    ? Math.pow(1 - cT, 0.7)
                    : cards.visible ? 1 : 0,
                  filter: blurPx > 0.5 ? `blur(${blurPx}px)` : undefined,
                  transition: cT > 0
                    ? "none"
                    : `opacity 0.7s ease-out ${cardDelay}ms, transform 0.7s ease-out ${cardDelay}ms`,
                  transformOrigin: "center center",
                  willChange: "transform, opacity, filter",
                }}
              >
                <span className="text-primary-100 text-[20px] font-bold" style={{ marginBottom: "29px" }}>0{i + 1}</span>
                <p className="text-black text-[16px] font-bold leading-[120%] w-full [word-break:keep-all]" style={{ marginBottom: "20px" }}>
                  {point.question}
                </p>
                <p className="text-grey-300 text-[15px] font-medium leading-[120%] w-full">
                  {point.description.split('\n').map((line, j, arr) => (
                    <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                  ))}
                </p>
              </div>
            );
          })}
        </div>

        {/* 수렴 오버레이 공간 */}
        <div
          ref={convergeSpaceRef}
          style={{
            height: "400vh",
            background: expandT > 0 ? "#E5F0FF" : undefined,
          }}
          className="relative"
        >
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

            {/* 솔루션 텍스트 — 등장 후 위로 slide-up fade-out */}
            <div style={{
              position: "absolute", left: 0, right: 0, top: "50%",
              transform: `translateY(calc(-50% + ${textExitT * -80}px))`,
              opacity: 1 - textExitT,
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
