import Feature1 from "@/components/sections/features/Feature1";
import Feature2 from "@/components/sections/features/Feature2";
import Feature3 from "@/components/sections/features/Feature3";
import PainPoint from "@/components/sections/PainPoint";
import PainPointExpand from "@/components/sections/PainPointExpand";
import PainPointExpandV2 from "@/components/sections/PainPointExpandV2";
import HowItWorksV4 from "@/components/sections/how-it-works-variants/HowItWorksV4";
import HowItWorksV5 from "@/components/sections/how-it-works-variants/HowItWorksV5";
import HowItWorksV6 from "@/components/sections/how-it-works-variants/HowItWorksV6";
import HeroV6 from "@/components/sections/hero-variants/HeroV6";
import HeroV7 from "@/components/sections/hero-variants/HeroV7";

function Divider({ label }: { label: string }) {
  return (
    <div className="w-full bg-grey-50 border-y border-grey-70 py-4 px-8 md:px-16 lg:px-24">
      <span className="text-grey-300 text-sm font-semibold uppercase tracking-widest">{label}</span>
    </div>
  );
}

export default function TestPage() {
  return (
    <main>
<Divider label="V6 — 목업 오른쪽 배치 + 블러 페이드" />
      <HeroV6 />
      <Divider label="V7 — 로짓 중심 플로팅 카드 + 연결선" />
      <HeroV7 />
      <Divider label="PainPointExpand V1 — 카드에서 수렴 → 로고 → 풀스크린" />
      <PainPoint />
      <Divider label="PainPointExpand V2 — 로고에서 풀스크린" />
      <PainPoint />
      <PainPointExpandV2 />
      <Divider label="Feature 1 — 편안한 경험 등록 (카드 덱)" />
      <Feature1 />
      <Divider label="Feature 2 — 스토리 확장 (일상 → 역량 변환)" />
      <Feature2 />
      <Divider label="Feature 3 — 초안 고속 생성 (다크)" />
      <Feature3 />
      <Divider label="HowItWorks V4 — 스텝별 세로 스크롤 + 경험 카드 순환" />
      <HowItWorksV4 />
      <Divider label="HowItWorks V5 — 풀스크린 타이포그래피 중심" />
      <HowItWorksV5 />
      <Divider label="HowItWorks V6 — Sticky 스크롤 + 앱 목업 시연" />
      <HowItWorksV6 />
    </main>
  );
}
