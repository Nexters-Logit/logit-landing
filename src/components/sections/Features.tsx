"use client";
import React from "react";

interface GradientConfig {
  style: React.CSSProperties;
}

interface ExtraImage {
  src: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
  className?: string;
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
}: FeatureStepProps) {
  const relativeImages = extraImages.filter(
    (img) => img.relLeft !== undefined || img.relTop !== undefined || img.relBottom !== undefined
  );
  const standaloneImages = extraImages.filter(
    (img) => img.relLeft === undefined && img.relTop === undefined && img.relBottom === undefined
  );

  return (
    <section className="snap-start relative w-full h-screen overflow-hidden" style={{ background, scrollSnapStop: "always" }}>
      {gradients.map((g, i) => (
        <div key={i} className="pointer-events-none" style={{ position: "absolute", zIndex: 0, ...g.style }} />
      ))}

      <div style={{ position: "absolute", inset: 0 }}>
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

        {/* 독립 배치 이미지 */}
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
              height: "max(80px, min(387px, 47.5vw, calc(59.8vh - 239.2px)))",
              borderRadius: "max(40px, min(320px, 16.7vw)) max(40px, min(320px, 16.7vw)) 0 0",
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
