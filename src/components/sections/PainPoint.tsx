"use client";

import { useEffect, useRef, useState } from "react";

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

export default function PainPoint() {
  const [entered, setEntered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const expandedRef = useRef(false);
  const ref = useRef<HTMLElement>(null);

  // 누적값을 ref로 관리 — 두 useEffect에서 공유
  const accumRef = useRef(0);
  const accumTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cooldownRef = useRef(false);
  // getBoundingClientRect() 대신 IO 기반 활성 여부 (강제 레이아웃 방지)
  const isEnteredRef = useRef(false);

  useEffect(() => {
    expandedRef.current = expanded;
  }, [expanded]);

  // 진입/이탈 감지
  useEffect(() => {
    // 애니메이션 트리거용 (10% 진입 시)
    const animObs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEntered(true);
          // snap 진입 후 남은 모멘텀 차단 (Features와 동일 패턴)
          cooldownRef.current = true;
          setTimeout(() => { cooldownRef.current = false; }, 600);
        } else {
          setEntered(false);
          setExpanded(false);
          isEnteredRef.current = false;
          // 이탈 시 누적값·쿨다운 강제 리셋
          accumRef.current = 0;
          cooldownRef.current = false;
          if (accumTimerRef.current) clearTimeout(accumTimerRef.current);
        }
      },
      { threshold: 0.1 }
    );
    // 스크롤 핸들러 게이트용 (90% 이상 보일 때만 활성)
    const activeObs = new IntersectionObserver(
      ([e]) => { isEnteredRef.current = e.isIntersecting; },
      { threshold: 0.9 }
    );
    if (ref.current) {
      animObs.observe(ref.current);
      activeObs.observe(ref.current);
    }
    return () => {
      animObs.disconnect();
      activeObs.disconnect();
    };
  }, []);

  // 휠/터치로 expanded 제어
  useEffect(() => {
    const THRESHOLD = 80;

    const resetAccum = () => {
      accumRef.current = 0;
      if (accumTimerRef.current) clearTimeout(accumTimerRef.current);
    };

    const onDown = () => {
      resetAccum();
      cooldownRef.current = true;
      setExpanded(true);
      setTimeout(() => { cooldownRef.current = false; }, 2500);
    };
    const onUp = () => {
      resetAccum();
      cooldownRef.current = true;
      setExpanded(false);
      setTimeout(() => { cooldownRef.current = false; }, 900);
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isEnteredRef.current) return;
      if (cooldownRef.current) { e.preventDefault(); return; }

      if (e.deltaY > 0 && !expandedRef.current) {
        e.preventDefault();
        accumRef.current += e.deltaY;
        if (accumTimerRef.current) clearTimeout(accumTimerRef.current);
        accumTimerRef.current = setTimeout(() => { accumRef.current = 0; }, 400);
        if (accumRef.current >= THRESHOLD) onDown();
      } else if (e.deltaY < 0 && expandedRef.current) {
        e.preventDefault();
        accumRef.current += Math.abs(e.deltaY);
        if (accumTimerRef.current) clearTimeout(accumTimerRef.current);
        accumTimerRef.current = setTimeout(() => { accumRef.current = 0; }, 400);
        if (accumRef.current >= THRESHOLD) onUp();
      } else {
        // 경계(expanded+아래, cards+위) → snap 컨테이너로 통과
        resetAccum();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isEnteredRef.current || cooldownRef.current) return;
      const delta = touchStartY - e.touches[0].clientY;
      if (Math.abs(delta) < 30) return;
      if (delta > 0 && !expandedRef.current) {
        e.preventDefault(); touchStartY = e.touches[0].clientY; onDown();
      } else if (delta < 0 && expandedRef.current) {
        e.preventDefault(); touchStartY = e.touches[0].clientY; onUp();
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
    <section
      ref={ref}
      className="snap-start h-screen w-full overflow-hidden"
      style={{ position: "relative", background: "#E4EEFD", scrollSnapStop: "always" }}
    >
      {/* ── 카드 레이어 ─────────────────────────────────── */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "60px 20px 40px",
        opacity: expanded ? 0 : 1,
        transition: "opacity 0.4s ease",
        pointerEvents: expanded ? "none" : "auto",
      }}>
        <div className="flex flex-col items-center" style={{ gap: "clamp(24px, 4vh, 48px)", width: "100%" }}>
          {/* 타이틀: 1080px 제약 */}
          <div className="flex flex-col items-center text-center gap-2" style={{
            maxWidth: "1080px",
            opacity: entered ? 1 : 0,
            transform: entered ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.05s, transform 0.6s ease 0.05s",
          }}>
            <img
              src="/object.svg" alt="" aria-hidden="true"
              className="hidden md:block"
              style={{ width: "clamp(80px, 10.83vw, 208px)", height: "auto", marginBottom: "8px" }}
            />
            <p className="text-grey-300 font-normal leading-[120%]" style={{ fontSize: "clamp(13px, 1.25vw, 24px)" }}>
              자소서 작성, 왜 매번 이렇게 어려울까요?
            </p>
            <h2 className="font-bold text-grey-400 leading-[120%] text-center [word-break:keep-all]" style={{ fontSize: "clamp(20px, 2.08vw, 40px)" }}>
              {QUOTE}
            </h2>
          </div>

          {/* 카드: 화면 전체 너비 기준으로 181px 패딩 */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3" style={{ padding: "0 clamp(0px, 9.4vw, 181px)", gap: "clamp(16px, 1.46vw, 28px)" }}>
            {PAIN_POINTS.map((point, i) => (
              <div key={i} className="bg-white rounded-[16px] flex flex-col" style={{
                padding: "clamp(14px, 1.25vw, 24px)",
                gap: "clamp(12px, 1.5vw, 29px)",
                boxShadow: "0 4px 32px 0 rgba(0,0,0,0.12)",
                opacity: entered ? 1 : 0,
                transform: entered ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.6s ease ${0.2 + i * 0.12}s, transform 0.6s ease ${0.2 + i * 0.12}s`,
              }}>
                <span className="text-primary-100 font-bold leading-[120%]" style={{ fontSize: "clamp(16px, 1.67vw, 32px)" }}>
                  0{i + 1}
                </span>
                <div className="flex flex-col gap-[6px]">
                  <p className="text-black font-bold leading-[120%] [word-break:keep-all]" style={{ fontSize: "clamp(14px, 1.25vw, 24px)" }}>
                    {point.question}
                  </p>
                  <p className="text-grey-300 font-medium leading-[120%]" style={{ fontSize: "clamp(12px, 1.04vw, 20px)" }}>
                    {point.description.split("\n").map((line, j, arr) => (
                      <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 원형 팽창 배경 ──────────────────────────────── */}
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        width: "max(220vw, 220vh)", height: "max(220vw, 220vh)",
        borderRadius: "50%",
        background: "radial-gradient(circle at 38% 36%, #A8DEFA, #65C1ED 35%, #4BC0FA 60%, #2571EB)",
        transform: `translate(-50%, -50%) scale(${expanded ? 1 : 0})`,
        transition: expanded
          ? "transform 2.5s cubic-bezier(0.22, 1, 0.36, 1)"
          : "transform 0.5s cubic-bezier(0.55, 0, 1, 0.45)",
        pointerEvents: "none", zIndex: 1,
        willChange: "transform",
      }} />

      <img src="/solution-bg.svg" alt="" aria-hidden="true" style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%", objectFit: "cover",
        opacity: expanded ? 0.6 : 0,
        transition: expanded ? "opacity 0.5s ease 1.8s" : "opacity 0.2s ease",
        pointerEvents: "none", zIndex: 2,
        willChange: "opacity",
      }} />

      {/* ── 솔루션 텍스트 ───────────────────────────────── */}
      <div className="relative flex flex-col items-center justify-center text-center h-full" style={{
        padding: "0 clamp(24px, 6vw, 120px)", gap: "16px",
        opacity: expanded ? 1 : 0,
        transform: expanded ? "translateY(0)" : "translateY(32px)",
        transition: expanded
          ? "opacity 0.6s ease 2.0s, transform 0.6s ease 2.0s"
          : "opacity 0.2s ease, transform 0.2s ease",
        zIndex: 3, pointerEvents: "none",
        willChange: "opacity, transform",
      }}>
        <p className="text-white font-normal leading-[120%]" style={{ fontSize: "clamp(13px, 1.25vw, 24px)" }}>
          그래서 로짓은, 자소서를 바로 쓰지 않습니다.
        </p>
        <h2 className="font-bold text-white leading-[120%] text-center [word-break:keep-all]" style={{ fontSize: "clamp(22px, 2.08vw, 40px)" }}>
          자소서가 달라지려면, 경험을 고르는 방식부터 달라져야 합니다.
        </h2>
      </div>
    </section>
  );
}
