"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const PAIN_POINTS = [
  { num: "01", question: "어떤 경험을 써야 하지?", desc: "매번 자소서를 열어도 경험란 앞에서 멈추게 돼요." },
  { num: "02", question: "내 경험이 너무 평범한 것 같아", desc: "공모전도, 인턴십도 없는 평범한 일상이 소재가 될 수 있을까요?" },
  { num: "03", question: "매번 처음부터 다시 쓰는 자소서", desc: "회사마다 비슷한 질문인데, 왜 항상 백지에서 시작해야 할까요?" },
];

function ease(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function norm(p: number, s: number, e: number) {
  return Math.max(0, Math.min(1, (p - s) / (e - s)));
}

export default function PainPointExpand() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [vw, setVw] = useState(1200);

  useEffect(() => {
    setVw(window.innerWidth);
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      setProgress(Math.max(0, Math.min(1, -rect.top / total)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 0.00~0.50 : 카드 수렴
  const convergeT = ease(norm(progress, 0, 0.50));
  // 0.38~0.55 : 로고
  const logoOpacity = Math.max(0, norm(progress, 0.38, 0.50) - norm(progress, 0.50, 0.60) * 2);
  // 0.50~0.82 : 원 확장
  const expandT = ease(norm(progress, 0.50, 0.82));
  const circleSize = 80 * (1 + expandT * 42);
  // 0.68~0.92 : 솔루션 텍스트
  const contentT = norm(progress, 0.68, 0.92);

  const isMobile = vw < 768;

  // PainPoint 그리드와 동일한 카드 중심 간격
  const padding = vw >= 1024 ? 80 : 48;
  const gridCardWidth = (vw - 2 * padding - 48) / 3;
  const cardSpacing = gridCardWidth + 24;

  const cardOffsets = isMobile
    ? [{ x: 0, y: -210 }, { x: 0, y: 0 }, { x: 0, y: 210 }]
    : [{ x: -cardSpacing, y: 0 }, { x: 0, y: 0 }, { x: cardSpacing, y: 0 }];

  return (
    <div ref={sectionRef} style={{ height: "400vh" }} className="w-full bg-grey-20">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-grey-20 flex items-center justify-center">

        {/* 확장 원 */}
        <div style={{
          position: "absolute",
          width: `${circleSize}px`, height: `${circleSize}px`,
          borderRadius: "50%",
          backgroundColor: "var(--color-primary-200, #3B6FE8)",
          left: "50%", top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2, opacity: expandT > 0 ? 1 : 0, pointerEvents: "none",
        }} />

        {/* 로고 */}
        <div style={{
          position: "absolute", left: "50%", top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 3, opacity: logoOpacity, pointerEvents: "none",
        }}>
          <Image src="/logo_symbol_2d.svg" alt="로짓" width={52} height={52} />
        </div>

        {/* 솔루션 텍스트 */}
        <div style={{
          position: "absolute", left: 0, right: 0, top: "50%",
          transform: `translateY(calc(-50% + ${(1 - contentT) * 20}px))`,
          zIndex: 4, opacity: contentT, pointerEvents: "none",
          textAlign: "center", padding: "0 3rem",
        }}>
          <p className="text-white/70 text-lg font-medium mb-5">그래서 로짓이 나왔어요</p>
          <h2 className="text-5xl max-lg:text-4xl max-md:text-3xl font-bold text-white leading-[1.2] [word-break:keep-all] mb-6">
            당신의 평범한 일상이<br />합격의 재료가 됩니다
          </h2>
          <p className="text-white/75 text-xl max-md:text-base max-w-xl mx-auto leading-relaxed [word-break:keep-all]">
            어떤 경험이든, 어떤 일상이든 괜찮아요.{" "}
            로짓이 당신만의 합격 스토리를 찾아드릴게요.
          </p>
        </div>

        {/* 카드 3개 — progress=0 에서 그리드 위치, 스크롤하면 수렴 */}
        {PAIN_POINTS.map((card, i) => {
          const offset = cardOffsets[i];
          const tx = offset.x * (1 - convergeT);
          const ty = offset.y * (1 - convergeT);
          const scale = 1 - 0.88 * convergeT;
          const opacity = 1 - convergeT;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: isMobile ? "78vw" : "clamp(220px, 21vw, 290px)",
                left: "50%", top: "50%",
                transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(${scale})`,
                opacity,
                zIndex: 1, pointerEvents: "none",
              }}
            >
              <div
                className="bg-white rounded-3xl px-8 py-10 flex flex-col gap-5 border border-grey-70"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              >
                <span className="text-primary-100 text-4xl font-bold">{card.num}</span>
                <p className="text-grey-400 text-2xl max-lg:text-xl font-bold leading-snug [word-break:keep-all]">{card.question}</p>
                <p className="text-grey-200 text-lg max-md:text-sm leading-relaxed [word-break:keep-all]">{card.desc}</p>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
