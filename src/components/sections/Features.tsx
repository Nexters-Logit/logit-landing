"use client";

import React, { useEffect, useRef, useState } from "react";

interface GradientConfig {
  style: React.CSSProperties;
}

interface ExtraImage {
  src: string;
  className?: string;
  relLeft?: number;
  relTop?: number;
  relBottom?: number;
  relWidth?: number;
  imgZIndex?: number;
}

interface StepConfig {
  emoji: string;
  emojiColor: string;
  stepLabel: string;
  heading: string;
  textWidth?: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  background: string;
  gradients: GradientConfig[];
  extraImages: ExtraImage[];
}

const STEPS: StepConfig[] = [
  {
    emoji: "✏️",
    emojiColor: "#E1E4ED",
    stepLabel: "Step 1. 경험 등록",
    heading: "STAR 기법으로 경험을 등록해두세요",
    imageSrc: "/feature-step1.svg",
    imageWidth: 570,
    imageHeight: 647,
    background: "#E4EEFD",
    gradients: [
      {
        style: {
          left: "-1726px", top: "-3021px",
          width: "5373px", height: "5373px", borderRadius: "5373px",
          background: "radial-gradient(50% 50% at 50% 50%, #2571EB 0%, rgba(216, 231, 255, 0.00) 100%)",
        },
      },
    ],
    extraImages: [],
  },
  {
    emoji: "⌨️",
    emojiColor: "#EBECF0",
    stepLabel: "Step 2. 채용 공고 입력",
    heading: "채용공고가 올라오면, 공고를 복사해 입력해주세요",
    imageSrc: "/feature-step2.svg",
    imageWidth: 493,
    imageHeight: 637,
    background: "#ABC9F8",
    gradients: [
      {
        style: {
          top: "-841px", right: "-1px",
          width: "1921px", height: "1921px", borderRadius: "1921px",
          background: "radial-gradient(50% 50% at 50% 50%, rgba(37, 113, 235, 0.36) 0%, rgba(216, 231, 255, 0.00) 100%)",
        },
      },
      {
        style: {
          top: "519px", left: "-757px",
          width: "2021px", height: "1228px", borderRadius: "2021px",
          background: "radial-gradient(50% 50% at 50% 50%, rgba(37, 113, 235, 0.18) 0%, rgba(216, 231, 255, 0.00) 100%)",
        },
      },
      {
        style: {
          top: "-32px", left: "1347px",
          width: "1287px", height: "1287px", borderRadius: "1287px",
          background: "radial-gradient(50% 50% at 50% 50%, rgba(37, 113, 235, 0.24) 0%, rgba(216, 231, 255, 0.00) 100%)",
        },
      },
    ],
    extraImages: [
      { src: "/feature-step2-card.svg", className: "hidden md:block", relLeft: 60.14, relBottom: 48.67, relWidth: 81.95 },
    ],
  },
  {
    emoji: "🎉",
    emojiColor: "#E1E4ED",
    stepLabel: "Step 3. 자소서 초안 완성!",
    heading: "AI가 매칭해주는 점수로 빠르게 경험을 매칭하고 자소서를 완성해보세요",
    textWidth: "1500px",
    imageSrc: "/feature-step3.svg",
    imageWidth: 570,
    imageHeight: 647,
    background: "rgba(171, 201, 248, 1)",
    gradients: [
      {
        style: {
          top: "154px", left: "278px",
          width: "1365px", height: "569px", borderRadius: "1365px",
          background: "radial-gradient(50% 50% at 50% 50%, rgba(37, 113, 235, 0.40) 0%, rgba(216, 231, 255, 0.00) 100%)",
        },
      },
      {
        style: {
          bottom: "0", left: "0", width: "100%",
          height: "max(80px, min(387px, 47.5vw, calc(59.8vh - 239.2px)))",
          borderRadius: "max(40px, min(320px, 16.7vw)) max(40px, min(320px, 16.7vw)) 0 0",
          background: "#181B24",
        },
      },
      {
        style: {
          top: "calc(100vh - 428px)", left: "-54px",
          width: "1974px", height: "1974px", borderRadius: "1974px",
          background: "radial-gradient(43.18% 43.18% at 50% 50%, rgba(24, 27, 36, 0.40) 0%, rgba(24, 27, 36, 0.00) 100%)",
        },
      },
    ],
    extraImages: [
      { src: "/feature-step3-card.svg", className: "hidden md:block", relLeft: -17.19, relBottom: 16.54, relWidth: 78.42 },
      { src: "/feature-step3-deco.svg", className: "hidden md:block", relLeft: 76.14, relTop: -15.77, relWidth: 80.35, imgZIndex: 4 },
      { src: "/feature-step3-deco2.svg", className: "hidden md:block", relLeft: 92.11, relTop: 4.02, relWidth: 89.65 },
    ],
  },
];

// ── 공통: 스텝 콘텐츠 렌더 ─────────────────────────────
function StepContent({ s }: { s: StepConfig }) {
  const relativeImages = s.extraImages.filter(
    img => img.relLeft !== undefined || img.relTop !== undefined || img.relBottom !== undefined
  );

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {s.gradients.map((g, i) => (
        <div key={i} className="pointer-events-none" style={{ position: "absolute", zIndex: 0, ...g.style }} />
      ))}

      <div style={{
        position: "absolute",
        top: "clamp(110px, 20.1vh, 217px)",
        left: "50%", transform: "translateX(-50%)",
        width: `min(${s.textWidth ?? "866px"}, calc(100vw - 40px))`,
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: "8px", zIndex: 1, userSelect: "none", pointerEvents: "none",
      }}>
        <p style={{ alignSelf: "stretch", color: s.emojiColor, textAlign: "center", fontSize: "clamp(40px, 4.44vw, 64px)", fontWeight: 400, lineHeight: "120%" }}>
          {s.emoji}
        </p>
        <p style={{ alignSelf: "stretch", color: s.emojiColor, textAlign: "center", fontSize: "clamp(14px, 1.67vw, 24px)", fontWeight: 400, lineHeight: "120%" }}>
          {s.stepLabel}
        </p>
        <p style={{ color: "#FFFFFF", textAlign: "center", fontSize: "clamp(20px, 2.08vw, 40px)", fontWeight: 700, lineHeight: "120%", wordBreak: "keep-all" }}>
          {s.heading}
        </p>
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: `min(${s.imageWidth}px, 70vw, calc((100vh - 400px) * ${(s.imageWidth / s.imageHeight).toFixed(4)}))`,
        aspectRatio: `${s.imageWidth} / ${s.imageHeight}`,
        overflow: "visible", zIndex: 1,
      }}>
        <img src={s.imageSrc} alt="" aria-hidden="true" style={{ width: "100%", height: "100%", display: "block" }} />
        {relativeImages.map((img, i) => (
          <img
            key={i} src={img.src} alt="" aria-hidden="true"
            className={img.className}
            style={{
              position: "absolute",
              ...(img.relLeft !== undefined && { left: `${img.relLeft}%` }),
              ...(img.relTop !== undefined && { top: `${img.relTop}%` }),
              ...(img.relBottom !== undefined && { bottom: `${img.relBottom}%` }),
              ...(img.relWidth !== undefined && { width: `${img.relWidth}%` }),
              height: "auto",
              zIndex: img.imgZIndex ?? 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── 데스크탑: 단일 섹션 + 더블버퍼 swap ─────────────────
function DesktopFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const [displayStep, setDisplayStep] = useState(0);
  const [incoming, setIncoming] = useState<{ stepIdx: number; id: number } | null>(null);
  const [bg, setBg] = useState(STEPS[0].background);
  const stepRef = useRef(0);
  const isEnteredRef = useRef(false);
  const cooldownRef = useRef(false);
  // 스텝 내 누적
  const accumRef = useRef(0);
  const accumTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // 경계 통과용 별도 누적 (더 많은 스크롤 필요)
  const boundaryAccumRef = useRef(0);
  const boundaryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollTopRef = useRef(0);

  const changeStep = (next: number) => {
    if (next === stepRef.current) return;
    stepRef.current = next;
    setBg(STEPS[next].background);
    accumRef.current = 0;
    if (accumTimerRef.current) clearTimeout(accumTimerRef.current);
    boundaryAccumRef.current = 0;
    if (boundaryTimerRef.current) clearTimeout(boundaryTimerRef.current);
    cooldownRef.current = true;
    if (swapTimerRef.current) clearTimeout(swapTimerRef.current);
    setIncoming({ stepIdx: next, id: Date.now() });
    swapTimerRef.current = setTimeout(() => {
      setDisplayStep(next);
      setIncoming(null);
      cooldownRef.current = false;
    }, 700); // 애니메이션(400ms) + 버퍼(300ms)
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const container = section.closest("main") as HTMLElement | null;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        isEnteredRef.current = true;
        const curScrollTop = container?.scrollTop ?? 0;
        const scrolledDown = curScrollTop >= lastScrollTopRef.current;
        const init = scrolledDown ? 0 : STEPS.length - 1;
        stepRef.current = init;
        setDisplayStep(init);
        setIncoming(null);
        setBg(STEPS[init].background);
        accumRef.current = 0;
        boundaryAccumRef.current = 0;
        // 진입 직후 남은 모멘텀 차단
        cooldownRef.current = true;
        setTimeout(() => { cooldownRef.current = false; }, 600);
      } else {
        isEnteredRef.current = false;
        if (container) lastScrollTopRef.current = container.scrollTop;
        accumRef.current = 0;
        boundaryAccumRef.current = 0;
        if (accumTimerRef.current) clearTimeout(accumTimerRef.current);
        if (boundaryTimerRef.current) clearTimeout(boundaryTimerRef.current);
        if (swapTimerRef.current) clearTimeout(swapTimerRef.current);
        cooldownRef.current = false;
      }
    }, { threshold: 0.5 });

    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const STEP_THRESHOLD = 80;      // 스텝 전환 임계값
    const BOUNDARY_THRESHOLD = 250; // 섹션 이탈 임계값 (더 많이 스크롤해야)

    const resetAccum = () => {
      accumRef.current = 0;
      if (accumTimerRef.current) clearTimeout(accumTimerRef.current);
    };
    const resetBoundary = () => {
      boundaryAccumRef.current = 0;
      if (boundaryTimerRef.current) clearTimeout(boundaryTimerRef.current);
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isEnteredRef.current) return;
      if (cooldownRef.current) { e.preventDefault(); return; }

      const cur = stepRef.current;

      if (e.deltaY > 0 && cur < STEPS.length - 1) {
        // 다음 스텝으로 (경계 누적 리셋)
        e.preventDefault();
        resetBoundary();
        accumRef.current += e.deltaY;
        if (accumTimerRef.current) clearTimeout(accumTimerRef.current);
        accumTimerRef.current = setTimeout(() => { accumRef.current = 0; }, 400);
        if (accumRef.current >= STEP_THRESHOLD) { resetAccum(); changeStep(cur + 1); }

      } else if (e.deltaY < 0 && cur > 0) {
        // 이전 스텝으로 (경계 누적 리셋)
        e.preventDefault();
        resetBoundary();
        accumRef.current += Math.abs(e.deltaY);
        if (accumTimerRef.current) clearTimeout(accumTimerRef.current);
        accumTimerRef.current = setTimeout(() => { accumRef.current = 0; }, 400);
        if (accumRef.current >= STEP_THRESHOLD) { resetAccum(); changeStep(cur - 1); }

      } else {
        // 경계: BOUNDARY_THRESHOLD 채워야 섹션 이탈 허용
        resetAccum();
        boundaryAccumRef.current += Math.abs(e.deltaY);
        if (boundaryTimerRef.current) clearTimeout(boundaryTimerRef.current);
        boundaryTimerRef.current = setTimeout(() => { boundaryAccumRef.current = 0; }, 400);
        if (boundaryAccumRef.current >= BOUNDARY_THRESHOLD) {
          resetBoundary();
          // preventDefault 안함 → snap 컨테이너가 다음/이전 섹션으로 이동
        } else {
          e.preventDefault(); // 아직 임계값 미달 → 이탈 차단
        }
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isEnteredRef.current || cooldownRef.current) return;
      const delta = touchStartY - e.touches[0].clientY;
      if (Math.abs(delta) < 30) return;
      const cur = stepRef.current;
      if (delta > 0 && cur < STEPS.length - 1) {
        e.preventDefault(); touchStartY = e.touches[0].clientY; changeStep(cur + 1);
      } else if (delta < 0 && cur > 0) {
        e.preventDefault(); touchStartY = e.touches[0].clientY; changeStep(cur - 1);
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

  const indicatorStep = incoming?.stepIdx ?? displayStep;

  return (
    <section
      ref={sectionRef}
      className="snap-start h-screen w-full overflow-hidden relative"
      style={{ background: bg, transition: "background 0.4s ease", scrollSnapStop: "always" }}
    >
      {/* 베이스: incoming 중엔 fade-out, 완료 시 transition 없이 즉시 복원 */}
      <div style={{
        position: "absolute", inset: 0,
        opacity: incoming ? 0 : 1,
        transition: incoming ? "opacity 0.3s ease" : "none",
        willChange: "opacity",
      }}>
        <StepContent s={STEPS[displayStep]} />
      </div>

      {/* 오버레이: 새 콘텐츠 fade-in */}
      {incoming && (
        <div
          key={incoming.id}
          style={{ position: "absolute", inset: 0, animation: "featureStepIn 0.4s ease forwards", willChange: "opacity, transform" }}
        >
          <StepContent s={STEPS[incoming.stepIdx]} />
        </div>
      )}

      {/* 스텝 인디케이터 */}
      <div style={{
        position: "absolute", bottom: "clamp(28px, 3.5vh, 48px)", left: "50%",
        transform: "translateX(-50%)", display: "flex", gap: "8px",
        zIndex: 10, pointerEvents: "none",
      }}>
        {STEPS.map((_, i) => (
          <div key={i} style={{
            height: "6px", borderRadius: "3px",
            width: i === indicatorStep ? "20px" : "6px",
            background: "rgba(255,255,255,0.9)",
            opacity: i === indicatorStep ? 1 : 0.35,
            transition: "width 0.3s ease, opacity 0.3s ease",
          }} />
        ))}
      </div>
    </section>
  );
}

// ── 모바일: 3개 독립 snap 섹션 ───────────────────────────
function MobileFeatures() {
  return (
    <>
      {STEPS.map((s, idx) => {
        const relativeImages = s.extraImages.filter(
          img => img.relLeft !== undefined || img.relTop !== undefined || img.relBottom !== undefined
        );
        return (
          <section
            key={idx}
            className="snap-start h-screen w-full overflow-hidden relative"
            style={{ background: s.background, scrollSnapStop: "always" }}
          >
            {s.gradients.map((g, i) => (
              <div key={i} className="pointer-events-none" style={{ position: "absolute", zIndex: 0, ...g.style }} />
            ))}
            <div style={{
              position: "absolute",
              top: "clamp(110px, 20.1vh, 217px)",
              left: "50%", transform: "translateX(-50%)",
              width: `min(${s.textWidth ?? "866px"}, calc(100vw - 40px))`,
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: "8px", zIndex: 1, userSelect: "none", pointerEvents: "none",
            }}>
              <p style={{ alignSelf: "stretch", color: s.emojiColor, textAlign: "center", fontSize: "clamp(40px, 4.44vw, 64px)", fontWeight: 400, lineHeight: "120%" }}>
                {s.emoji}
              </p>
              <p style={{ alignSelf: "stretch", color: s.emojiColor, textAlign: "center", fontSize: "clamp(14px, 1.67vw, 24px)", fontWeight: 400, lineHeight: "120%" }}>
                {s.stepLabel}
              </p>
              <p style={{ color: "#FFFFFF", textAlign: "center", fontSize: "clamp(20px, 2.08vw, 40px)", fontWeight: 700, lineHeight: "120%", wordBreak: "keep-all" }}>
                {s.heading}
              </p>
            </div>
            <div style={{
              position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
              width: `min(${s.imageWidth}px, 70vw, calc((100vh - 400px) * ${(s.imageWidth / s.imageHeight).toFixed(4)}))`,
              aspectRatio: `${s.imageWidth} / ${s.imageHeight}`,
              overflow: "visible", zIndex: 1,
            }}>
              <img src={s.imageSrc} alt="" aria-hidden="true" style={{ width: "100%", height: "100%", display: "block" }} />
              {relativeImages.map((img, i) => (
                <img
                  key={i} src={img.src} alt="" aria-hidden="true"
                  className={img.className}
                  style={{
                    position: "absolute",
                    ...(img.relLeft !== undefined && { left: `${img.relLeft}%` }),
                    ...(img.relTop !== undefined && { top: `${img.relTop}%` }),
                    ...(img.relBottom !== undefined && { bottom: `${img.relBottom}%` }),
                    ...(img.relWidth !== undefined && { width: `${img.relWidth}%` }),
                    height: "auto", zIndex: img.imgZIndex ?? 2,
                  }}
                />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}

// ── 메인 export ──────────────────────────────────────────
export default function Features() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile === null) return null;
  return isMobile ? <MobileFeatures /> : <DesktopFeatures />;
}
