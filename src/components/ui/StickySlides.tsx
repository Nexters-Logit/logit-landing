"use client";

import React, { useEffect, useRef, useState } from "react";

function ease(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function norm(p: number, s: number, e: number) {
  return Math.max(0, Math.min(1, (p - s) / (e - s)));
}

// 슬라이드당 머무는 스크롤 구간 (vh)
const DWELL = 150;
// 슬라이드 간 크로스페이드 구간 (vh)
const FADE  = 80;

export default function StickySlides({ children }: { children: React.ReactNode }) {
  const slides = React.Children.toArray(children);
  const N = slides.length;
  // 전체 스크롤 높이: N개 슬라이드 × DWELL + (N-1) 개 전환 × FADE
  const totalVh = N * DWELL + (N - 1) * FADE;
  const unit    = totalVh; // 정규화 기준

  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect  = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      setP(Math.max(0, Math.min(1, -rect.top / total)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 각 슬라이드는 아래부터 쌓임 (마지막 = 최하단, 항상 opacity 1)
  // 위 슬라이드가 fadeOut 되면서 아래 슬라이드가 드러나는 방식 → 배경색 혼합 없음
  const getOp = (i: number) => {
    if (i === N - 1) return 1; // 최하단 슬라이드는 항상 노출

    const segStart     = i * (DWELL + FADE);
    const fadeOutStart = segStart + DWELL;
    const segEnd       = segStart + DWELL + FADE;

    return 1 - ease(norm(p, fadeOutStart / unit, segEnd / unit));
  };

  return (
    <div ref={ref} style={{ height: `${totalVh}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {slides.map((slide, i) => {
          const op = getOp(i);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                opacity: op,
                zIndex: N - i,   // 첫 슬라이드가 최상단
                pointerEvents: op > 0.5 ? "auto" : "none",
                willChange: "opacity",
              }}
            >
              {slide}
            </div>
          );
        })}
      </div>
    </div>
  );
}
