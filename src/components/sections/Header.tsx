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
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      {/* 모바일: 2줄 / 데스크탑: 1줄 */}
      <div className="w-full px-6 md:px-12 lg:px-20">

        {/* 1줄: 로고 + (데스크탑 nav) + CTA */}
        <div className="flex items-center justify-between h-20 lg:h-28">
          <div className="flex items-center gap-8 lg:gap-12">
            <div className="flex items-center gap-3">
              <Image
                src="/logo_symbol_2d.svg"
                alt="Logit 심볼"
                width={40}
                height={40}
                className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14"
              />
              <Image
                src="/logo_wordmark.svg"
                alt="Logit"
                width={104}
                height={52}
                className="w-16 md:w-20 lg:w-28"
              />
            </div>

            {/* 데스크탑에서만 보이는 nav */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-10">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-grey-300 hover:text-grey-400 text-base lg:text-lg font-medium transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-grey-300 hover:text-grey-400 transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 lg:w-6 lg:h-6"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </nav>
          </div>

          {/* CTA */}
          <a
            href="https://logit.ai.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-200 hover:bg-primary-300 text-white font-semibold px-5 py-2.5 lg:px-7 lg:py-3.5 text-sm lg:text-base rounded-full transition-colors duration-200 whitespace-nowrap"
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
              className="text-grey-300 hover:text-grey-400 text-sm font-medium transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-grey-300 hover:text-grey-400 transition-colors duration-200"
            aria-label="Instagram"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </nav>

      </div>
    </header>
  );
}
