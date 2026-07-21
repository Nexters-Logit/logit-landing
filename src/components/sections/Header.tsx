"use client";

import Image from "next/image";

const NAV_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Price", href: "#price" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-transparent w-full flex flex-col items-start px-4 md:px-6 lg:px-[30px] py-[15px]">

      {/* 로고 + (데스크탑 nav) + CTA */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-8 lg:gap-10">
          <div className="flex items-start gap-[10px]" style={{ width: "85.35px", height: "28px" }}>
            <Image
              src="/logo_symbol_2d.svg"
              alt="Logit 심볼"
              width={24}
              height={24}
              style={{ width: "24px", height: "24px" }}
            />
            <Image
              src="/logo_wordmark.svg"
              alt="Logit"
              width={104}
              height={52}
              style={{ width: "51.35px", height: "26px", marginTop: "2px" }}
            />
          </div>

          {/* 데스크탑에서만 보이는 nav */}
          <nav className="hidden md:flex items-center gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-primary-400 hover:text-primary-500 text-[18px] font-medium leading-[120%] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-500 text-[18px] font-medium leading-[120%] transition-colors duration-200"
            >
              SNS
            </a>
          </nav>
        </div>

        {/* CTA */}
        <a
          href="https://logit.ai.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-[44px] px-6 py-[14px] justify-center items-center gap-[14px] rounded-[14px] bg-primary-200 hover:bg-primary-300 text-white font-semibold text-[18px] leading-[140%] transition-colors duration-200 whitespace-nowrap"
        >
          <span className="hidden sm:inline">지금 무료로 시작하기</span>
          <span className="sm:hidden">무료 시작</span>
        </a>
      </div>

      {/* 모바일에서만 보이는 nav */}
      <nav className="md:hidden flex items-center gap-6 pt-3">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-primary-400 hover:text-primary-500 text-[18px] font-medium leading-[120%] transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-400 hover:text-primary-500 text-[18px] font-medium leading-[120%] transition-colors duration-200"
        >
          SNS
        </a>
      </nav>

    </header>
  );
}
