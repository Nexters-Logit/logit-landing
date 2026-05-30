"use client";

import { useEffect, useRef, useState } from "react";

function ease(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

/**
 * 이전 섹션에서 넘어올 때 고정 오버레이로 "갈아끼우듯" 전환하는 래퍼.
 * - 컨텐츠가 뷰포트로 진입하는 동안 오버레이가 full opacity 로 화면을 덮음
 * - 컨텐츠가 뷰포트 상단에 위치하면 오버레이가 서서히 fade-out
 */
export default function FadeReveal({
  children,
  background = "radial-gradient(circle at 38% 36%, #A8DEFA, #65C1ED 35%, #4BC0FA 60%, #2571EB)",
}: {
  children: React.ReactNode;
  background?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [op, setOp] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      let next: number;
      if (rect.top > 2 * vh) {
        // 아직 뷰포트 아래 — 오버레이 없음
        next = 0;
      } else if (rect.top >= 0) {
        // 아래에서 진입 중 — 2vh 전부터 시작, 0.75vh 전에 full opacity 도달
        // (PainPoint sticky 퇴장 전에 이미 오버레이가 충분히 채워지도록)
        next = ease(Math.min(1, (2 * vh - rect.top) / (1.25 * vh)));
      } else {
        // 뷰포트 상단을 지나가는 중 — 매우 천천히 fade-out (2vh 에 걸쳐)
        next = 1 - ease(Math.min(1, -rect.top / (vh * 2)));
      }
      setOp(next);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref}>
      {op > 0.005 && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background,
            opacity: op,
            pointerEvents: "none",
            zIndex: 200,
          }}
        />
      )}
      {children}
    </div>
  );
}
