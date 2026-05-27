"use client";

import { useState } from "react";

const CARDS = [
  {
    before: "진상 손님 달래준 경험",
    after: "고객 불만 응대 프로세스 개선을 통한 매장 재방문율 제고",
    tag: "갈등 관리",
  },
  {
    before: "동아리 방 청소 구역 나눈 것",
    after: "구성원 간 역할 분담 체계 수립으로 운영 효율화 달성",
    tag: "조직 관리",
  },
  {
    before: "매일 가계부 쓴 것",
    after: "데이터 기반 지출 분석 및 재무 관리 역량 체득",
    tag: "데이터 분석",
  },
];

function FlipCard({ before, after, tag }: { before: string; after: string; tag: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full h-44 cursor-pointer"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* 앞면 */}
        <div
          className="absolute inset-0 rounded-2xl bg-grey-50 border border-grey-70 flex flex-col items-start justify-center px-6 gap-3"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-grey-200 text-sm">일상 경험</span>
          <p className="text-grey-400 text-lg font-medium">&ldquo;{before}&rdquo;</p>
        </div>
        {/* 뒷면 */}
        <div
          className="absolute inset-0 rounded-2xl bg-primary-50 border border-primary-60 flex flex-col items-start justify-center px-6 gap-3"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="bg-primary-100 text-white text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>
          <p className="text-primary-300 text-base font-medium leading-relaxed">{after}</p>
        </div>
      </div>
    </div>
  );
}

export default function HeroV2() {
  return (
    <section className="w-full bg-white px-8 md:px-16 lg:px-24 xl:px-36 py-20 lg:py-32">
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-8">

          <span className="bg-primary-50 text-primary-200 text-base lg:text-lg font-semibold px-5 py-2 rounded-full">
            AI 자소서 초안 서비스
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-grey-400 leading-[1.2] [word-break:keep-all]">
            평범한 일상이<br />
            합격 자소서로<br />
            <span className="text-primary-200">변하는 마법</span>
          </h1>

          <p className="text-grey-200 text-lg lg:text-xl leading-relaxed">
            카드에 마우스를 올려보세요
          </p>

          <a href="#" className="bg-primary-200 hover:bg-primary-300 text-white font-semibold text-lg lg:text-xl px-10 py-4 lg:px-12 lg:py-5 rounded-full transition-colors duration-200">
            지금 무료로 첫 경험 카드 만들기
          </a>
        </div>

        <div className="flex-1 w-full flex flex-col gap-4">
          {CARDS.map((card) => (
            <FlipCard key={card.tag} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
