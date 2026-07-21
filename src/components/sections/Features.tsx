"use client";
import React, { useRef, useEffect } from "react";

interface GradientConfig {
  style: React.CSSProperties;
}

interface ExtraImage {
  src: string;
  width: number;
  height: number;
  style: React.CSSProperties;
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
}: FeatureStepProps) {
  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden" style={{ minHeight: "100vh", background }}>
      {gradients.map((g, i) => (
        <div key={i} className="pointer-events-none" style={{ position: "absolute", zIndex: 0, ...g.style }} />
      ))}

      {/* 텍스트 */}
      <div
        style={{
          position: "absolute",
          top: "217px",
          left: "50%",
          transform: "translateX(-50%)",
          width: textWidth,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          zIndex: 1,
        }}
      >
        <p style={{ alignSelf: "stretch", color: emojiColor, textAlign: "center", fontSize: "64px", fontWeight: 400, lineHeight: "120%" }}>
          {emoji}
        </p>
        <p style={{ alignSelf: "stretch", color: emojiColor, textAlign: "center", fontSize: "24px", fontWeight: 400, lineHeight: "120%" }}>
          {stepLabel}
        </p>
        <p style={{ color: "#FFFFFF", textAlign: "center", fontSize: "40px", fontWeight: 700, lineHeight: "120%", whiteSpace: "nowrap" }}>
          {heading}
        </p>
      </div>

      {/* 목업 이미지 */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "433.873px",
            left: "50%",
            transform: "translateX(-50%)",
            width: `${imageWidth}px`,
            height: `${imageHeight}px`,
            zIndex: 1,
          }}
        />
      )}

      {extraImages.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            width: `${img.width}px`,
            height: `${img.height}px`,
            zIndex: 2,
            ...img.style,
          }}
        />
      ))}
    </section>
  );
}

export default function Features() {
  const step1Ref = useRef<HTMLElement>(null);
  const step2Ref = useRef<HTMLElement>(null);
  const step3Ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let isSnapping = false;

    const snapTo = (y: number) => {
      if (isSnapping) return;
      isSnapping = true;
      window.scrollTo({ top: y, behavior: "smooth" });
      setTimeout(() => { isSnapping = false; }, 900);
    };

    const handleWheel = (e: WheelEvent) => {
      if (isSnapping) return;
      const step1 = step1Ref.current;
      const step2 = step2Ref.current;
      const step3 = step3Ref.current;
      if (!step1 || !step2 || !step3) return;

      const step1Rect = step1.getBoundingClientRect();
      const step2Rect = step2.getBoundingClientRect();
      const step3Rect = step3.getBoundingClientRect();

      if (e.deltaY > 0 && step1Rect.top < -30 && step1Rect.bottom > 0) {
        e.preventDefault();
        snapTo(window.scrollY + step1Rect.bottom);
        return;
      }
      if (e.deltaY > 0 && step2Rect.top < -30 && step2Rect.bottom > 0) {
        e.preventDefault();
        snapTo(window.scrollY + step2Rect.bottom);
        return;
      }
      if (e.deltaY < 0 && step2Rect.top <= 0 && step2Rect.bottom > 0) {
        e.preventDefault();
        snapTo(step2Rect.top + window.scrollY - window.innerHeight);
        return;
      }
      if (e.deltaY < 0 && step3Rect.top <= 0 && step3Rect.bottom > 0) {
        e.preventDefault();
        snapTo(step3Rect.top + window.scrollY - window.innerHeight);
        return;
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const handleTouchMove = (e: TouchEvent) => {
      if (isSnapping) return;
      const step1 = step1Ref.current;
      const step2 = step2Ref.current;
      const step3 = step3Ref.current;
      if (!step1 || !step2 || !step3) return;

      const step1Rect = step1.getBoundingClientRect();
      const step2Rect = step2.getBoundingClientRect();
      const step3Rect = step3.getBoundingClientRect();
      const delta = touchStartY - e.touches[0].clientY;

      if (delta > 20 && step1Rect.top < -30 && step1Rect.bottom > 0) {
        e.preventDefault();
        snapTo(window.scrollY + step1Rect.bottom);
      } else if (delta > 20 && step2Rect.top < -30 && step2Rect.bottom > 0) {
        e.preventDefault();
        snapTo(window.scrollY + step2Rect.bottom);
      } else if (delta < -20 && step2Rect.top <= 0 && step2Rect.bottom > 0) {
        e.preventDefault();
        snapTo(step2Rect.top + window.scrollY - window.innerHeight);
      } else if (delta < -20 && step3Rect.top <= 0 && step3Rect.bottom > 0) {
        e.preventDefault();
        snapTo(step3Rect.top + window.scrollY - window.innerHeight);
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
            style: { left: "calc(50% + 50px)", top: "586.873px" },
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
        textWidth="1100px"
        imageSrc="/feature-step3.svg"
        imageWidth={570}
        imageHeight={647}
        background="rgba(171, 201, 248, 1)"
        sectionRef={step3Ref}
        extraImages={[
          {
            src: "/feature-step3-card.svg",
            width: 447,
            height: 183,
            style: { left: "calc(50% - 383px)", top: "790px" },
          },
          {
            src: "/feature-step3-deco.svg",
            width: 458,
            height: 458,
            style: { left: "1109px", top: "331px", zIndex: 4 },
          },
          {
            src: "/feature-step3-deco2.svg",
            width: 511,
            height: 501,
            style: { left: "1200px", top: "459px" },
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
        ]}
      />
    </>
  );
}
