export default function Hero() {
  return (
    <section className="w-full bg-white px-8 md:px-16 lg:px-24 xl:px-36 py-20 lg:py-32">
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

        {/* 텍스트 영역 */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-8 lg:gap-10">

          {/* 배지 */}
          <span className="bg-primary-50 text-primary-200 text-base lg:text-lg font-semibold px-5 py-2 rounded-full">
            AI 자소서 초안 서비스
          </span>

          {/* 헤드카피 */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-grey-400 leading-[1.2] [word-break:keep-all]">
            알바, 동아리, 일상 기록만 하세요.<br />
            자소서 초안은 AI가<br />
            10초 만에 끝냅니다.
          </h1>

          {/* 서브카피 */}
          <p className="text-grey-200 text-lg lg:text-xl xl:text-2xl leading-relaxed [word-break:keep-all]">
            당신의 사소한 일상 속 숨겨진 합격 DNA를<br className="hidden lg:block" />
            {" "}AI가 찾아드릴게요.
          </p>

          {/* CTA 버튼 */}
          <a
            href="#"
            className="bg-primary-200 hover:bg-primary-300 text-white font-semibold text-lg lg:text-xl px-10 py-4 lg:px-12 lg:py-5 rounded-full transition-colors duration-200 whitespace-nowrap"
          >
            지금 무료로 첫 경험 카드 만들기
          </a>

          {/* 앱 다운로드 */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="flex items-center gap-3 border border-grey-70 hover:border-grey-200 text-grey-300 hover:text-grey-400 text-base lg:text-lg font-medium px-6 py-3 lg:px-7 lg:py-4 rounded-xl transition-colors duration-200"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              App Store
            </a>
            <a
              href="#"
              className="flex items-center gap-3 border border-grey-70 hover:border-grey-200 text-grey-300 hover:text-grey-400 text-base lg:text-lg font-medium px-6 py-3 lg:px-7 lg:py-4 rounded-xl transition-colors duration-200"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.3.17.64.24.99.2l12.6-12.6-2.61-2.6L3.18 23.76zM20.49 10.26L17.5 8.56l-2.93 2.93 2.93 2.93 3.02-1.72c.86-.49.86-1.95-.03-2.44zM2.01 1.05C1.87 1.3 1.8 1.6 1.8 1.94v20.12c0 .34.07.64.21.89l.09.08 11.27-11.26v-.27L2.1.97l-.09.08zM14.44 8.19l-2.63-2.63L2.01 1.05l11.15 8.76 1.28-1.62z"/>
              </svg>
              Google Play
            </a>
          </div>
        </div>

        {/* 목업 이미지 영역 */}
        <div className="flex-1 w-full">
          <div className="w-full aspect-[4/3] lg:aspect-square rounded-3xl bg-primary-50 flex items-center justify-center">
            <span className="text-primary-100 text-base font-medium">서비스 목업 이미지</span>
          </div>
        </div>

      </div>
    </section>
  );
}
