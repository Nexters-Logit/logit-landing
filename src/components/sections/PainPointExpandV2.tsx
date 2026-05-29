"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function PainPointExpandV2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [vh, setVh] = useState(800);
  const [vw, setVw] = useState(1200);

  useEffect(() => {
    setVh(window.innerHeight);
    setVw(window.innerWidth);
    const onResize = () => { setVh(window.innerHeight); setVw(window.innerWidth); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const expandProgress = Math.min(1, progress * 1.4);
  const contentProgress = Math.max(0, Math.min(1, (progress - 0.35) / 0.3));
  const logoFade = Math.max(0, 1 - progress * 4); // 로고는 초반에 빠르게 사라짐

  // 시작: 로고 크기 (80×80) → 화면 전체
  const SIZE_START = 80;
  const widthPx = SIZE_START + (vw - SIZE_START) * expandProgress;
  const heightPx = SIZE_START + (vh - SIZE_START) * expandProgress;
  const radius = (SIZE_START / 2) * (1 - expandProgress); // 원 → 사각형

  return (
    <div
      ref={sectionRef}
      style={{ height: "250vh" }}
      className="w-full bg-grey-20"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-grey-20">
        <div
          style={{
            width: `${widthPx}px`,
            height: `${heightPx}px`,
            borderRadius: `${radius}px`,
            backgroundColor: "var(--color-primary-200, #3B6FE8)",
            transition: "none",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* 로고 심볼 — 초반에만 보임 */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: logoFade,
              transition: "none",
            }}
          >
            <Image
              src="/logo_symbol_2d.svg"
              alt="로짓 로고"
              width={36}
              height={36}
            />
          </div>

          {/* 텍스트 콘텐츠 — 중간 이후 등장 */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-12 max-md:px-8 gap-6"
            style={{
              opacity: contentProgress,
              transform: `translateY(${(1 - contentProgress) * 16}px)`,
              transition: "none",
            }}
          >
            <p className="text-white/70 text-lg max-md:text-base font-medium">
              그래서 로짓이 나왔어요
            </p>
            <h2 className="text-5xl max-lg:text-4xl max-md:text-3xl font-bold text-white leading-[1.2] [word-break:keep-all]">
              당신의 평범한 일상이<br />합격의 재료가 됩니다
            </h2>
            <p className="text-white/75 text-xl max-md:text-base max-w-xl leading-relaxed [word-break:keep-all]">
              어떤 경험이든, 어떤 일상이든 괜찮아요.<br className="max-md:hidden" />
              {" "}로짓이 당신만의 합격 스토리를 찾아드릴게요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
