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

const CARD_STAGGER = [0, 0.05, 0.10];

export default function PainPoint() {
  const section = useScrollReveal(0.05, false);

  const convergeSpaceRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const pRef = useRef(0);
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
      const next = Math.max(0, Math.min(1, -rect.top / total));
      setP(next);
      pRef.current = next;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 솔루션 텍스트 → Features 스크롤 스냅
  useEffect(() => {
    let isSnapping = false;

    const snapToFeatures = () => {
      if (isSnapping) return;
      const el = convergeSpaceRef.current;
      if (!el) return;
      isSnapping = true;
      const target = window.scrollY + el.getBoundingClientRect().bottom;
      window.scrollTo({ top: target, behavior: "smooth" });
      setTimeout(() => { isSnapping = false; }, 1000);
    };

    const handleWheel = (e: WheelEvent) => {
      if (pRef.current > 0.85 && e.deltaY > 0 && !isSnapping) {
        e.preventDefault();
        snapToFeatures();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const handleTouchMove = (e: TouchEvent) => {
      if (pRef.current > 0.85 && !isSnapping) {
        const delta = touchStartY - e.touches[0].clientY;
        if (delta > 20) { e.preventDefault(); snapToFeatures(); }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // 텍스트 인트로 — 스크롤 시작하면 바로 fade-out
  const textFadeT  = ease(norm(p, 0.02, 0.18));
  const textOpacity = p > 0.01 ? Math.max(0, 1 - textFadeT) : section.visible ? 1 : 0;
  const textSlideY  = p > 0.01 ? textFadeT * -40 : section.visible ? 0 : 20;
  const textTransition = p > 0.01 ? "none" : "opacity 0.7s ease, transform 0.7s ease";

  // 카드별 stagger
  const cardTs = CARD_STAGGER.map(s => ease(norm(p, s, 0.50 + s)));

  // 중심 glow
  const glowT    = ease(norm(p, 0.05, 0.46));
  const glowSize = 60 + glowT * 420;

  // 로고
  const logoAppear  = ease(norm(p, 0.40, 0.50));
  const logoFade    = ease(norm(p, 0.54, 0.68));
  const logoOpacity = Math.max(0, logoAppear * (1 - logoFade));
  const logoScale   = 0.6 + 0.4 * logoAppear;

  // 로고 링
  const ringT     = ease(norm(p, 0.40, 0.52));
  const ringFade  = ease(norm(p, 0.54, 0.68));
  const ring1Size = 60 + ringT * 48;
  const ring2Size = 60 + ringT * 90;
  const ringOp    = Math.max(0, ringT * 0.5 * (1 - ringFade));

  // 배경 확장
  const expandT    = ease(norm(p, 0.50, 0.82));
  const circleSize = 80 * (1 + expandT * 42);

  // 솔루션 텍스트
  const labelT    = ease(norm(p, 0.58, 0.68));
  const headingT  = ease(norm(p, 0.61, 0.71));
  const subT      = ease(norm(p, 0.64, 0.76));
  const textExitT = ease(norm(p, 0.88, 1.0));

  const isMobile = vw < 768;
  const padding  = vw >= 1024 ? 80 : 48;
  const colWidth = Math.max(120, (vw - 2 * padding - 48) / 3);
  const dx = colWidth + 24;
  const dy = 226;

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

      {/* IntersectionObserver 트리거 wrapper */}
      <div ref={section.ref}>
        <div
          ref={convergeSpaceRef}
          style={{ height: "500vh" }}
          className="relative"
        >
          <div
            className="sticky top-0 h-screen overflow-hidden"
            style={{
              background: expandT > 0
                ? `rgb(${Math.round(229 + (255 - 229) * textExitT)}, ${Math.round(240 + (255 - 240) * textExitT)}, 255)`
                : "#E4EEFD"
            }}
          >

            {/* 텍스트 인트로 */}
            <div
              style={{
                position: "absolute",
                top: "207px",
                left: 0, right: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "32px",
                opacity: textOpacity,
                transform: `translateY(${textSlideY}px)`,
                transition: textTransition,
                pointerEvents: "none",
                zIndex: 6,
              }}
            >
              <img
                src="/object.svg"
                alt=""
                aria-hidden="true"
                style={{ width: "208px", height: "180px" }}
              />
              <p className="text-grey-300 text-[24px] font-normal leading-[120%] text-center self-stretch">
                자소서 작성, 왜 매번 이렇게 어려울까요?
              </p>
              <h2
                className="text-[40px] font-bold text-grey-400 leading-[120%] text-center self-stretch [word-break:keep-all]"
                style={{ marginTop: "-24px" }}
              >
                {QUOTE}
              </h2>
            </div>

            {/* 카드 그리드 */}
            <div
              className="w-full grid grid-cols-3 max-md:grid-cols-1 gap-[28px] max-md:gap-4 px-[181px] max-lg:px-[100px] max-md:px-6 items-start"
              style={{
                position: "absolute",
                top: "599px",
                left: 0, right: 0,
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
                        : section.visible ? "translateY(0)" : "translateY(40px)",
                      opacity: cT > 0
                        ? Math.pow(1 - cT, 0.7)
                        : section.visible ? 1 : 0,
                      filter: blurPx > 0.5 ? `blur(${blurPx}px)` : undefined,
                      transition: cT > 0
                        ? "none"
                        : `opacity 0.7s ease-out ${cardDelay}ms, transform 0.7s ease-out ${cardDelay}ms`,
                      gap: "29px",
                      transformOrigin: "center center",
                      willChange: "transform, opacity, filter",
                    }}
                  >
                    <span className="text-primary-100 text-[32px] font-bold leading-[120%] self-stretch">0{i + 1}</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: "9px", alignSelf: "stretch" }}>
                      <p className="text-black text-[24px] font-bold leading-[120%] self-stretch [word-break:keep-all]">
                        {point.question}
                      </p>
                      <p className="text-grey-300 text-[24px] font-medium leading-[120%] self-stretch">
                        {point.description.split('\n').map((line, j, arr) => (
                          <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 중심 glow */}
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

            {/* 배경 확장 원 */}
            <div style={{
              position: "absolute",
              width: `${circleSize}px`, height: `${circleSize}px`,
              borderRadius: "50%",
              background: "radial-gradient(circle at 38% 36%, #A8DEFA, #65C1ED 35%, #4BC0FA 60%, #2571EB)",
              left: "50%", top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
              opacity: expandT > 0 ? (1 - textExitT) : 0,
            }} />

            {/* 로고 링 */}
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

            {/* 솔루션 배경 gradient */}
            <div style={{
              position: "absolute",
              left: "-695px",
              top: "-864px",
              width: "2801px",
              height: "2801px",
              borderRadius: "2801px",
              background: "radial-gradient(55.95% 55.95% at 41.75% 40.6%, #40A5FF 0%, #2571EB 100%)",
              opacity: (1 - textExitT) * labelT,
              zIndex: 4,
              pointerEvents: "none",
            }} />

            {/* 솔루션 배경 SVG */}
            <img
              src="/solution-bg.svg"
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: (1 - textExitT) * labelT,
                zIndex: 4,
                pointerEvents: "none",
              }}
            />

            {/* 솔루션 텍스트 */}
            <div style={{
              position: "absolute", left: 0, right: 0, top: "50%",
              transform: `translateY(calc(-50% + ${textExitT * -80}px))`,
              opacity: 1 - textExitT,
              zIndex: 5,
              textAlign: "center", padding: "0 3rem",
              pointerEvents: "none",
            }}>
              <p
                className="text-grey-70 text-[24px] font-normal leading-[120%] text-center self-stretch mb-5"
                style={{ opacity: labelT, transform: `translateY(${(1 - labelT) * 14}px)` }}
              >
                그래서 로짓은, 자소서를 바로 쓰지 않습니다.
              </p>
              <h2
                className="text-[40px] font-bold text-white leading-[120%] text-center whitespace-nowrap mb-6"
                style={{ opacity: headingT, transform: `translateY(${(1 - headingT) * 20}px)` }}
              >
                자소서가 달라지려면, 경험을 고르는 방식부터 달라져야 합니다.
              </h2>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
