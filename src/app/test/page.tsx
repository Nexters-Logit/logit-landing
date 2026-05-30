import Feature1 from "@/components/sections/features/Feature1";
import Feature2 from "@/components/sections/features/Feature2";
import Feature3 from "@/components/sections/features/Feature3";
import PainPoint from "@/components/sections/PainPoint";
import PainPointExpand from "@/components/sections/PainPointExpand";
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
      <Divider label="Feature 1 — 편안한 경험 등록 (카드 덱)" />
      <Feature1 />
      <Divider label="Feature 2 — 스토리 확장 (일상 → 역량 변환)" />
      <Feature2 />
      <Divider label="Feature 3 — 초안 고속 생성 (다크)" />
      <Feature3 />
    </main>
  );
}
