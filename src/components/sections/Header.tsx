"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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
      <div className="w-full px-6 md:px-10 lg:px-16 flex items-center justify-between h-20">
        {/* 로고 */}
        <div className="flex items-center gap-2.5">
          <Image
            src="/logo_symbol_2d.svg"
            alt="Logit 심볼"
            width={40}
            height={40}
          />
          <Image
            src="/logo_wordmark.svg"
            alt="Logit"
            width={80}
            height={40}
          />
        </div>

        {/* CTA */}
        <a
          href="#"
          className="bg-primary-200 hover:bg-primary-300 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 whitespace-nowrap"
        >
          <span className="hidden sm:inline">지금 무료로 시작하기</span>
          <span className="sm:hidden">무료 시작</span>
        </a>
      </div>
    </header>
  );
}
