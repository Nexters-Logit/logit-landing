"use client";
import React, { useRef, useEffect } from "react";

interface GradientConfig {
  style: React.CSSProperties;
}

interface ExtraImage {
  src: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
  className?: string;
  // 설정 시 메인 이미지 wrapper 기준 % 위치로 렌더링 (함께 스케일)
  relLeft?: number;
  relTop?: number;
  relBottom?: number;
  relWidth?: number;
  imgZIndex?: number;
}

interface FeatureStepProps {
  emoji: string;
  emojiColor: string;
  stepLabel: string;
  heading: string;
  textWidth?: string;
  imageSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
  background: string;
  gradients?: GradientConfig[];
  extraImages?: ExtraImage[];
  sectionRef?: React.RefObject<HTMLElement | null>;
  innerContentRef?: React.RefObject<HTMLDivElement | null>;
}

function FeatureStep({
  emoji,
  emojiColor,
  stepLabel,
  heading,
  textWidth = "866px",
  imageSrc,
  imageWidth = 0,
  imageHeight = 0,
  background,
  gradients = [],
  extraImages = [],
  sectionRef,
  innerContentRef,
}: FeatureStepProps) {
  const relativeImages = extraImages.filter(
    (img) => img.relLeft !== undefined || img.relTop !== undefined || img.relBottom !== undefined
  );
  const standaloneImages = extraImages.filter(
    (img) => img.relLeft === undefined && img.relTop === undefined && img.relBottom === undefined
  );

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden" style={{ minHeight: "100vh", background }}>
      {gradients.map((g, i) => (
        <div key={i} className="pointer-events-none" style={{ position: "absolute", zIndex: 0, ...g.style }} />
      ))}

      {/* 애니메이션 대상 콘텐츠 래퍼 */}
      <div ref={innerContentRef} style={{ position: "absolute", inset: 0, willChange: "transform, opacity" }}>
        {/* 텍스트 */}
        <div
          style={{
            position: "absolute",
            top: "clamp(110px, 20.1vh, 217px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: `min(${textWidth}, calc(100vw - 40px))`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            zIndex: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          <p style={{ alignSelf: "stretch", color: emojiColor, textAlign: "center", fontSize: "clamp(40px, 4.44vw, 64px)", fontWeight: 400, lineHeight: "120%" }}>
            {emoji}
          </p>
          <p style={{ alignSelf: "stretch", color: emojiColor, textAlign: "center", fontSize: "clamp(14px, 1.67vw, 24px)", fontWeight: 400, lineHeight: "120%" }}>
            {stepLabel}
          </p>
          <p style={{ color: "#FFFFFF", textAlign: "center", fontSize: "clamp(20px, 2.08vw, 40px)", fontWeight: 700, lineHeight: "120%", wordBreak: "keep-all" }}>
            {heading}
          </p>
        </div>

        {/* 목업 이미지 + 함께 스케일되는 이미지 세트 */}
        {imageSrc && imageWidth > 0 && imageHeight > 0 && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: `min(${imageWidth}px, 70vw, calc((100vh - 400px) * ${(imageWidth / imageHeight).toFixed(4)}))`,
              aspectRatio: `${imageWidth} / ${imageHeight}`,
              overflow: "visible",
              zIndex: 1,
            }}
          >
            <img
              src={imageSrc}
              alt=""
              aria-hidden="true"
              style={{ width: "100%", height: "100%", display: "block" }}
            />
            {relativeImages.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt=""
                aria-hidden="true"
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
        )}

        {/* 독립 배치 이미지 (구 방식) */}
        {standaloneImages.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt=""
            aria-hidden="true"
            className={img.className}
            style={{
              position: "absolute",
              width: `${img.width}px`,
              height: `${img.height}px`,
              zIndex: 2,
              ...(img.style ?? {}),
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default function Features() {
  const step1Ref = useRef<HTMLElement>(null);
  const step2Ref = useRef<HTMLElement>(null);
  const step3Ref = useRef<HTMLElement>(null);
  const step3ContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isSnapping = false;
    let curtainUpActive = false;
    let wheelAccum = 0;
    let wheelDir = 0;
    let activeStep = "";
    let stepEnteredAt = 0;
    const ENTRY_COOLDOWN = 200;

    const snapTo = (el: HTMLElement, blockScroll = false) => {
      if (isSnapping) return;
      isSnapping = true;
      curtainUpActive = blockScroll;
      wheelAccum = 0;
      wheelDir = 0;
      activeStep = "";
      stepEnteredAt = 0;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => { isSnapping = false; curtainUpActive = false; }, 900);
    };

    const snapToY = (y: number) => {
      if (isSnapping) return;
      isSnapping = true;
      curtainUpActive = false;
      wheelAccum = 0;
      wheelDir = 0;
      activeStep = "";
      stepEnteredAt = 0;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      setTimeout(() => { isSnapping = false; }, 900);
    };

    const handleWheel = (e: WheelEvent) => {
      const step1 = step1Ref.current;
      const step2 = step2Ref.current;
      const step3 = step3Ref.current;
      if (!step1 || !step2 || !step3) return;

      const s1 = step1.getBoundingClientRect();
      const s2 = step2.getBoundingClientRect();
      const s3 = step3.getBoundingClientRect();

      // 뷰포트 중심점 기준으로 현재 step 감지 (서브픽셀 오차 완전 방지)
      const center = window.innerHeight / 2;
      const inStep1 = s1.top <= center && s1.bottom > center;
      const inStep2 = s2.top <= center && s2.bottom > center;
      const inStep3 = s3.top <= center && s3.bottom > center;

      if (!inStep1 && !inStep2 && !inStep3) { wheelAccum = 0; wheelDir = 0; activeStep = ""; return; }

      // 새로운 step에 진입했을 때 누적 초기화 + 쿨다운 시작
      const curStep = inStep1 ? "1" : inStep2 ? "2" : "3";
      if (curStep !== activeStep) {
        activeStep = curStep;
        stepEnteredAt = Date.now();
        wheelAccum = 0;
        wheelDir = 0;
      }

      // Step 3 하향: 자연 스크롤 허용 → handleScroll이 커튼 애니메이션 + auto-snap 처리
      if (inStep3 && e.deltaY > 0) {
        if (isSnapping || Date.now() - stepEnteredAt < ENTRY_COOLDOWN) {
          e.preventDefault(); // 스냅 중이거나 쿨다운: 자연 스크롤 차단
        }
        // 쿨다운 이후: preventDefault 없이 return → 자연 스크롤 허용
        return;
      }

      // 그 외 모든 경우: 자연 스크롤 차단
      e.preventDefault();
      if (isSnapping) return;

      // 진입 직후 관성 이벤트 무시 (쿨다운)
      if (Date.now() - stepEnteredAt < ENTRY_COOLDOWN) return;

      // 방향 바뀌면 누적 초기화
      const dir = e.deltaY > 0 ? 1 : -1;
      if (dir !== wheelDir) { wheelAccum = 0; wheelDir = dir; }

      // 관성 잔여 이벤트(매우 작은 deltaY) 무시
      if (Math.abs(e.deltaY) < 3) return;
      wheelAccum += e.deltaY;

      const THRESHOLD = 50;
      const curtainZone = window.innerHeight * 0.05;

      if (wheelAccum > THRESHOLD && inStep1) { snapTo(step2); return; }
      if (wheelAccum > THRESHOLD && inStep2) { snapTo(step3); return; }
      // Step 3 하향은 위에서 자연 스크롤로 처리 (handleScroll이 auto-snap)
      if (wheelAccum < -THRESHOLD && inStep1) {
        snapToY(s1.top + window.scrollY - window.innerHeight); return;
      }
      if (wheelAccum < -THRESHOLD && inStep2) { snapTo(step1); return; }
      if (wheelAccum < -THRESHOLD && inStep3 && s3.top < -curtainZone) {
        hasCurtainSnapped = false; snapTo(step3, true); return;
      }
      if (wheelAccum < -THRESHOLD && inStep3) { snapTo(step2); return; }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const handleTouchMove = (e: TouchEvent) => {
      const step1 = step1Ref.current;
      const step2 = step2Ref.current;
      const step3 = step3Ref.current;
      if (!step1 || !step2 || !step3) return;

      const s1 = step1.getBoundingClientRect();
      const s2 = step2.getBoundingClientRect();
      const s3 = step3.getBoundingClientRect();

      const center = window.innerHeight / 2;
      const inStep1 = s1.top <= center && s1.bottom > center;
      const inStep2 = s2.top <= center && s2.bottom > center;
      const inStep3 = s3.top <= center && s3.bottom > center;
      if (!inStep1 && !inStep2 && !inStep3) return;

      if (isSnapping) { if (curtainUpActive) e.preventDefault(); return; }

      const curtainZone = window.innerHeight * 0.05;
      const d = touchStartY - e.touches[0].clientY;

      if (d > 15 && inStep1) {
        e.preventDefault(); touchStartY = e.touches[0].clientY; snapTo(step2);
      } else if (d > 15 && inStep2) {
        e.preventDefault(); touchStartY = e.touches[0].clientY; snapTo(step3);
      } else if (d > 15 && inStep3) {
        const darkSection = step3.nextElementSibling?.nextElementSibling as HTMLElement | null;
        if (darkSection) { hasCurtainSnapped = true; e.preventDefault(); touchStartY = e.touches[0].clientY; snapTo(darkSection); }
      } else if (d < -15 && inStep1) {
        e.preventDefault(); touchStartY = e.touches[0].clientY;
        snapToY(s1.top + window.scrollY - window.innerHeight);
      } else if (d < -15 && inStep2) {
        e.preventDefault(); touchStartY = e.touches[0].clientY; snapTo(step1);
      } else if (d < -15 && inStep3 && s3.top < -curtainZone) {
        hasCurtainSnapped = false;
        e.preventDefault(); touchStartY = e.touches[0].clientY; snapTo(step3, true);
      } else if (d < -15 && inStep3) {
        e.preventDefault(); touchStartY = e.touches[0].clientY; snapTo(step2);
      }
    };

    // Step 3 커튼 애니메이션: 콘텐츠가 위로 올라가며 사라지고 다크 섹션으로 스냅
    let hasCurtainSnapped = false;

    const handleScroll = () => {
      const step3 = step3Ref.current;
      const content = step3ContentRef.current;
      if (!step3 || !content) return;

      const rect = step3.getBoundingClientRect();
      if (rect.top < 0 && rect.bottom > 0) {
        const progress = Math.min(-rect.top / window.innerHeight, 1);
        const translateY = -progress * window.innerHeight * 0.5;
        const opacity = Math.max(0, 1 - progress * 2.5);
        content.style.transform = `translateY(${translateY}px)`;
        content.style.opacity = String(opacity);

        // 콘텐츠가 완전히 사라지면 다크 섹션으로 스냅
        if (progress >= 0.3 && !hasCurtainSnapped && !isSnapping) {
          hasCurtainSnapped = true;
          const darkSection = step3.nextElementSibling?.nextElementSibling as HTMLElement | null;
          if (darkSection) snapTo(darkSection);
        }
      } else if (rect.top >= 0) {
        content.style.transform = "translateY(0)";
        content.style.opacity = "1";
        hasCurtainSnapped = false;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <FeatureStep
        emoji="✏️"
        emojiColor="#E1E4ED"
        stepLabel="Step 1. 경험 등록"
        heading="STAR 기법으로 경험을 등록해두세요"
        imageSrc="/feature-step1.svg"
        imageWidth={570}
        imageHeight={647}
        background="#E4EEFD"
        sectionRef={step1Ref}
        gradients={[
          {
            style: {
              left: "-1726px",
              top: "-3021px",
              width: "5373px",
              height: "5373px",
              borderRadius: "5373px",
              background: "radial-gradient(50% 50% at 50% 50%, #2571EB 0%, rgba(216, 231, 255, 0.00) 100%)",
            },
          },
        ]}
      />
      <FeatureStep
        emoji="⌨️"
        emojiColor="#EBECF0"
        stepLabel="Step 2. 채용 공고 입력"
        heading="채용공고가 올라오면, 공고를 복사해 입력해주세요"
        imageSrc="/feature-step2.svg"
        imageWidth={493}
        imageHeight={637}
        background="#ABC9F8"
        sectionRef={step2Ref}
        extraImages={[
          {
            src: "/feature-step2-card.svg",
            width: 404,
            height: 183,
            className: "hidden md:block",
            relLeft: 60.14,
            relBottom: 48.67,
            relWidth: 81.95,
          },
        ]}
        gradients={[
          {
            style: {
              top: "-841px",
              right: "-1px",
              width: "1921px",
              height: "1921px",
              borderRadius: "1921px",
              background: "radial-gradient(50% 50% at 50% 50%, rgba(37, 113, 235, 0.36) 0%, rgba(216, 231, 255, 0.00) 100%)",
            },
          },
          {
            style: {
              top: "519px",
              left: "-757px",
              width: "2021px",
              height: "1228px",
              borderRadius: "2021px",
              background: "radial-gradient(50% 50% at 50% 50%, rgba(37, 113, 235, 0.18) 0%, rgba(216, 231, 255, 0.00) 100%)",
            },
          },
          {
            style: {
              top: "-32px",
              left: "1347px",
              width: "1287px",
              height: "1287px",
              borderRadius: "1287px",
              background: "radial-gradient(50% 50% at 50% 50%, rgba(37, 113, 235, 0.24) 0%, rgba(216, 231, 255, 0.00) 100%)",
            },
          },
        ]}
      />
      <FeatureStep
        emoji="🎉"
        emojiColor="#E1E4ED"
        stepLabel="Step 3. 자소서 초안 완성!"
        heading="AI가 매칭해주는 점수로 빠르게 경험을 매칭하고 자소서를 완성해보세요"
        textWidth="1500px"
        imageSrc="/feature-step3.svg"
        imageWidth={570}
        imageHeight={647}
        background="rgba(171, 201, 248, 1)"
        sectionRef={step3Ref}
        innerContentRef={step3ContentRef}
        extraImages={[
          {
            src: "/feature-step3-card.svg",
            width: 447,
            height: 183,
            className: "hidden md:block",
            relLeft: -17.19,
            relBottom: 16.54,
            relWidth: 78.42,
          },
          {
            src: "/feature-step3-deco.svg",
            width: 458,
            height: 458,
            className: "hidden md:block",
            relLeft: 76.14,
            relTop: -15.77,
            relWidth: 80.35,
            imgZIndex: 4,
          },
          {
            src: "/feature-step3-deco2.svg",
            width: 511,
            height: 501,
            className: "hidden md:block",
            relLeft: 92.11,
            relTop: 4.02,
            relWidth: 89.65,
          },
        ]}
        gradients={[
          {
            style: {
              top: "154px",
              left: "278px",
              width: "1365px",
              height: "569px",
              borderRadius: "1365px",
              background: "radial-gradient(50% 50% at 50% 50%, rgba(37, 113, 235, 0.40) 0%, rgba(216, 231, 255, 0.00) 100%)",
            },
          },
          {
            style: {
              bottom: "0",
              left: "0",
              width: "100%",
              height: "clamp(120px, 47.5vw, 387px)",
              borderRadius: "clamp(60px, 16.7vw, 320px) clamp(60px, 16.7vw, 320px) 0 0",
              background: "#181B24",
            },
          },
          {
            style: {
              top: "calc(100vh - 428px)",
              left: "-54px",
              width: "1974px",
              height: "1974px",
              borderRadius: "1974px",
              background: "radial-gradient(43.18% 43.18% at 50% 50%, rgba(24, 27, 36, 0.40) 0%, rgba(24, 27, 36, 0.00) 100%)",
            },
          },
        ]}
      />
    </>
  );
}
