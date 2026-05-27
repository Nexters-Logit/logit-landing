import HeroV1 from "@/components/sections/hero-variants/HeroV1";
import HeroV2 from "@/components/sections/hero-variants/HeroV2";
import HeroV3 from "@/components/sections/hero-variants/HeroV3";
import HeroV4 from "@/components/sections/hero-variants/HeroV4";

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
      <Divider label="V1 — 타이핑 애니메이션" />
      <HeroV1 />
      <Divider label="V2 — Before / After 카드 Flip" />
      <HeroV2 />
      <Divider label="V3 — 스크롤 스토리텔링" />
      <HeroV3 />
      <Divider label="V4 — 플로팅 경험 카드" />
      <HeroV4 />
    </main>
  );
}
