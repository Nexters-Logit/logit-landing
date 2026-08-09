"use client";

import Image from "next/image";
import { useState } from "react";

const NAV_LINKS = [
  { label: "About Us", href: "https://docs.logit.ai.kr/", external: true },
  { label: "Price", href: "#price", external: false },
  { label: "SNS", href: "https://www.instagram.com/logit._official?igsh=MXRsdzNqMWV1bnVrOQ==", external: true },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-transparent w-full">
      {/* 로고 + (데스크탑 nav) + CTA + 햄버거 */}
      <div className="flex items-center justify-between w-full px-4 md:px-6 lg:px-[30px] py-[15px]">
        <div className="flex items-center gap-8 lg:gap-10">
          <div className="flex items-center gap-3">
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

            {/* 햄버거 버튼 (모바일만) */}
            <button
              className="md:hidden flex justify-center items-center w-9 h-9"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            >
              {menuOpen ? (
                <svg viewBox="0 0 22 22" fill="none" style={{ width: "clamp(16px, 5vw, 22px)", height: "clamp(16px, 5vw, 22px)" }}>
                  <line x1="4" y1="4" x2="18" y2="18" stroke="#262626" strokeWidth="2.2" strokeLinecap="round" />
                  <line x1="18" y1="4" x2="4" y2="18" stroke="#262626" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 22 22" fill="none" style={{ width: "clamp(16px, 5vw, 22px)", height: "clamp(16px, 5vw, 22px)" }}>
                  <line x1="2" y1="6" x2="20" y2="6" stroke="#262626" strokeWidth="2.2" strokeLinecap="round" />
                  <line x1="2" y1="11" x2="20" y2="11" stroke="#262626" strokeWidth="2.2" strokeLinecap="round" />
                  <line x1="2" y1="16" x2="20" y2="16" stroke="#262626" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>

          {/* 데스크탑에서만 보이는 nav */}
          <nav className="hidden md:flex items-center gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-primary-400 hover:text-primary-500 text-[18px] font-medium leading-[120%] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* CTA */}
        <a
          href="https://logit.ai.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-[36px] md:h-[44px] px-4 md:px-6 py-2 md:py-[14px] justify-center items-center gap-[14px] rounded-[14px] bg-primary-200 hover:bg-primary-300 text-white font-semibold text-[15px] md:text-[18px] leading-[140%] transition-colors duration-200 whitespace-nowrap"
        >
          <span className="hidden sm:inline">지금 무료로 시작하기</span>
          <span className="sm:hidden">무료 시작</span>
        </a>
      </div>

      {/* 모바일 드롭다운 */}
      <nav
        className="md:hidden absolute left-0 right-0 overflow-hidden"
        style={{
          top: "100%",
          maxHeight: menuOpen ? "200px" : "0",
          opacity: menuOpen ? 1 : 0,
          transition: "max-height 0.3s ease, opacity 0.25s ease",
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <div className="flex flex-col px-4 py-4 gap-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={() => setMenuOpen(false)}
              className="text-primary-400 text-[17px] font-medium leading-[120%]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
