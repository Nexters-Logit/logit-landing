"use client";

import { useEffect, useRef, useState } from "react";

const EXPERIENCES = [
  { label: "편의점 야간 알바", body: "새벽 2시, 혼자 재고 정리하다 냉장고 온도 이상 발견. 바로 점장님께 연락했어요.", tags: ["알바", "책임감"] },
  { label: "면접 스터디 운영", body: "직접 스터디를 만들어 7명을 이끌었어요. 팀원 3명이 최종 합격했어요.", tags: ["리더십", "실행력"] },
  { label: "동아리 홍보 영상", body: "기획부터 편집까지 혼자 완성해 조회수 2만을 달성했어요.", tags: ["동아리", "창의성"] },
  { label: "자취 생활 6개월", body: "월 50만 원으로 혼자 생활비를 관리했어요.", tags: ["자기관리", "계획성"] },
];

const DRAFT = "저는 책임감과 빠른 판단력을 갖추고 있습니다. 편의점 야간 근무 중 냉장 설비 이상을 발견하고 즉시 점장님께 연락하여 피해를 최소화한 경험이 이를 증명합니다.";

/* ─── App Header ─── */
function AppHeader({ right }: { right?: React.ReactNode }) {
  return (
    <div className="flex items-center px-5 py-3 border-b border-grey-70 bg-white shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-md bg-gradient-to-br from-primary-200 to-secondary-100" />
        <span className="font-bold text-grey-400 text-sm">logit</span>
      </div>
      {right && <div className="ml-auto">{right}</div>}
    </div>
  );
}

/* ─── Screen 0: 경험 입력 ─── */
function Screen0({ active }: { active: boolean }) {
  const [idx, setIdx] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    if (!active) { setIdx(0); setFadeIn(true); return; }
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => { setIdx((p) => (p + 1) % EXPERIENCES.length); setFadeIn(true); }, 380);
    }, 2800);
    return () => clearInterval(interval);
  }, [active]);

  const exp = EXPERIENCES[idx];

  return (
    <div className="flex flex-col h-full">
      <AppHeader right={
        <button className="text-xs text-primary-200 font-semibold px-3 py-1.5 rounded-lg bg-primary-20">저장하기</button>
      } />
      <div className="flex-1 flex flex-col gap-4 p-5 overflow-hidden">
        <p className="text-grey-200 text-xs font-medium">오늘의 경험을 기록해보세요</p>
        <div
          className="flex-1 bg-grey-20 rounded-2xl p-5 flex flex-col gap-3"
          style={{
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          <p className="text-grey-400 font-bold text-base [word-break:keep-all]">{exp.label}</p>
          <p className="text-grey-300 text-sm leading-relaxed [word-break:keep-all]">{exp.body}</p>
          <div className="flex gap-2 flex-wrap mt-auto pt-2">
            {exp.tags.map((tag) => (
              <span key={tag} className="bg-primary-20 text-primary-200 text-xs font-medium px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
        {/* indicator */}
        <div className="flex gap-1.5 justify-center">
          {EXPERIENCES.map((_, i) => (
            <span key={i} className="h-1 rounded-full bg-primary-200 transition-all duration-300"
              style={{ width: i === idx ? "16px" : "5px", opacity: i === idx ? 1 : 0.2 }} />
          ))}
        </div>
        <button className="w-full bg-primary-200 hover:bg-primary-300 text-white font-semibold text-sm py-3 rounded-xl transition-colors">
          AI 소재 찾기 →
        </button>
      </div>
    </div>
  );
}

/* ─── Screen 1: AI 분석 ─── */
function Screen1({ active }: { active: boolean }) {
  const [widths, setWidths] = useState([0, 0, 0]);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (!active) { setAnimated(false); setWidths([0, 0, 0]); return; }
    setAnimated(true);
    const t1 = setTimeout(() => setWidths([88, 0, 0]), 250);
    const t2 = setTimeout(() => setWidths([88, 76, 0]), 600);
    const t3 = setTimeout(() => setWidths([88, 76, 82]), 950);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [active]);

  const traits = [
    { label: "책임감", pct: widths[0] },
    { label: "위기 대응력", pct: widths[1] },
    { label: "커뮤니케이션", pct: widths[2] },
  ];

  return (
    <div className="flex flex-col h-full">
      <AppHeader />
      <div className="flex-1 flex flex-col items-center justify-center gap-8 p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary-20 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L12.5 7.5L18 8.5L14 12.5L15 18L10 15.5L5 18L6 12.5L2 8.5L7.5 7.5L10 2Z" fill="#4B9EF8" />
            </svg>
          </div>
          <p className="text-grey-400 font-semibold text-sm text-center [word-break:keep-all]">
            AI가 핵심 역량을 분석하고 있어요
          </p>
        </div>
        <div className="w-full flex flex-col gap-4">
          {traits.map((t) => (
            <div key={t.label} className="flex items-center gap-3">
              <span className="text-xs text-grey-300 w-20 shrink-0">{t.label}</span>
              <div className="flex-1 h-2 bg-primary-20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-200 rounded-full"
                  style={{ width: `${t.pct}%`, transition: animated ? "width 0.7s ease" : "none" }}
                />
              </div>
              <span className="text-xs text-grey-200 w-8 text-right">
                {t.pct > 0 ? `${t.pct}%` : "—"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Screen 2: 자소서 초안 ─── */
function Screen2({ active }: { active: boolean }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!active) { setDisplayed(""); return; }
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        i++;
        setDisplayed(DRAFT.slice(0, i));
        if (i >= DRAFT.length) clearInterval(interval);
      }, 22);
    }, 200);
    return () => { clearTimeout(timeout); clearInterval(interval); };
  }, [active]);

  return (
    <div className="flex flex-col h-full">
      <AppHeader right={
        <div className="flex gap-2">
          <button className="text-xs text-grey-300 font-medium px-3 py-1.5 rounded-lg border border-grey-70">수정</button>
          <button className="text-xs text-primary-200 font-medium px-3 py-1.5 rounded-lg bg-primary-20">복사</button>
        </div>
      } />
      <div className="flex-1 flex flex-col gap-3 p-5">
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
            <path d="M2 6L5 9L10 3" stroke="#34C759" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-grey-300 text-xs font-semibold">자소서 초안이 준비됐어요</span>
        </div>
        <div className="flex-1 bg-grey-20 rounded-2xl p-5">
          <p className="text-grey-400 text-sm leading-relaxed [word-break:keep-all]">
            {displayed}
            {displayed.length < DRAFT.length && (
              <span className="inline-block w-0.5 h-3.5 bg-grey-400 ml-0.5 align-middle animate-pulse" />
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Main ─── */
const STEPS = [
  { number: "01", title: "경험을 기록해요", description: "어떤 경험이든 괜찮아요. 짧게 메모하듯 기록하기만 하면 돼요." },
  { number: "02", title: "AI가 소재를 발굴해요", description: "평범한 일상에서 합격 포인트를 찾아드려요." },
  { number: "03", title: "자소서 초안 완성", description: "문항에 맞는 초안을 10초 만에 생성해드려요." },
];

export default function HowItWorksV6() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const total = sectionRef.current.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(0.999, scrolled / total));
      setActiveStep(Math.floor(progress * 3));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} style={{ height: "300vh" }} className="relative">
      <div className="sticky top-0 h-screen bg-white flex items-center overflow-hidden">
        <div className="w-full px-20 max-lg:px-12 flex items-center gap-16 max-lg:gap-10">

          {/* 왼쪽: 스텝 정보 */}
          <div className="w-[38%] max-lg:w-[42%] flex flex-col gap-3">
            <p className="text-primary-200 text-xs font-semibold tracking-[0.2em] uppercase mb-4">사용 방법</p>
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="transition-all duration-500 py-4 border-b border-grey-70 last:border-0"
                style={{ opacity: activeStep === i ? 1 : 0.3 }}
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-primary-200 text-xs font-bold tracking-widest">{step.number}</span>
                  <div className={`h-px flex-1 transition-all duration-500 ${activeStep === i ? "bg-primary-100" : "bg-grey-70"}`} />
                </div>
                <h3
                  className="font-bold text-grey-400 [word-break:keep-all] transition-all duration-300"
                  style={{ fontSize: activeStep === i ? "28px" : "18px", lineHeight: 1.3 }}
                >
                  {step.title}
                </h3>
                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{ maxHeight: activeStep === i ? "60px" : "0px", opacity: activeStep === i ? 1 : 0 }}
                >
                  <p className="text-grey-200 text-sm mt-2 leading-relaxed [word-break:keep-all]">{step.description}</p>
                </div>
              </div>
            ))}

            {/* 스텝 인디케이터 */}
            <div className="flex gap-1.5 mt-4">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1 rounded-full bg-primary-200 transition-all duration-500"
                  style={{ width: activeStep === i ? "28px" : "8px", opacity: activeStep === i ? 1 : 0.2 }}
                />
              ))}
            </div>
          </div>

          {/* 오른쪽: 브라우저 목업 */}
          <div className="flex-1">
            <div
              className="rounded-2xl overflow-hidden border border-grey-70"
              style={{ height: "480px", boxShadow: "0 24px 60px rgba(0,0,0,0.10)" }}
            >
              {/* 브라우저 크롬 */}
              <div className="bg-grey-20 border-b border-grey-70 px-4 py-2.5 flex items-center gap-2 shrink-0">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 mx-3">
                  <div className="bg-white rounded-md h-6 flex items-center justify-center">
                    <span className="text-xs text-grey-200">app.logit.kr</span>
                  </div>
                </div>
              </div>

              {/* 앱 스크린 */}
              <div className="relative bg-white" style={{ height: "calc(480px - 41px)" }}>
                {[0, 1, 2].map((s) => (
                  <div
                    key={s}
                    className="absolute inset-0 transition-all duration-700"
                    style={{
                      opacity: activeStep === s ? 1 : 0,
                      transform: activeStep === s ? "translateY(0)" : activeStep > s ? "translateY(-16px)" : "translateY(16px)",
                      pointerEvents: activeStep === s ? "auto" : "none",
                    }}
                  >
                    {s === 0 && <Screen0 active={activeStep === 0} />}
                    {s === 1 && <Screen1 active={activeStep === 1} />}
                    {s === 2 && <Screen2 active={activeStep === 2} />}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center text-grey-200 text-xs mt-3 tracking-wide">↓ 스크롤해서 계속 보기</p>
          </div>

        </div>
      </div>
    </section>
  );
}
