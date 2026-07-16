"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Price", href: "#price" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled ? "bg-primary-50/80 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      {/* 모바일: 2줄 / 데스크탑: 1줄 */}
      <div className="w-full px-4 md:px-6 lg:px-[30px]">

        {/* 1줄: 로고 + (데스크탑 nav) + CTA */}
        <div className="flex items-center justify-between h-20 lg:h-28">
          <div className="flex items-center gap-8 lg:gap-12">
            <div className="flex items-center gap-3">
              <Image
                src="/logo_symbol_2d.svg"
                alt="Logit 심볼"
                width={40}
                height={40}
                className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
              />
              <Image
                src="/logo_wordmark.svg"
                alt="Logit"
                width={104}
                height={52}
                className="w-12 md:w-16 lg:w-20"
              />
            </div>

            {/* 데스크탑에서만 보이는 nav */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-10">
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
            className="flex h-[44px] px-6 py-[14px] justify-center items-center gap-[14px] rounded-[14px] bg-primary-200 hover:bg-primary-300 text-white font-semibold text-sm lg:text-base transition-colors duration-200 whitespace-nowrap"
          >
            <span className="hidden sm:inline">지금 무료로 시작하기</span>
            <span className="sm:hidden">무료 시작</span>
          </a>
        </div>

        {/* 모바일에서만 보이는 2번째 줄 nav */}
        <nav className="md:hidden flex items-center gap-6 pb-3">
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
    </header>
  );
}
