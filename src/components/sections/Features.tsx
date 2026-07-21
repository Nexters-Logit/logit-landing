export default function Features() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "100vh", background: "#E4EEFD" }}>
      {/* 배경 radial gradient — 대형 */}
      <div
        className="pointer-events-none"
        style={{
          position: "absolute",
          left: "-1726px",
          top: "-3021px",
          width: "5373px",
          height: "5373px",
          borderRadius: "5373px",
          background: "radial-gradient(50% 50% at 50% 50%, #2571EB 0%, rgba(216, 231, 255, 0.00) 100%)",
          zIndex: 0,
        }}
      />

      {/* 배경 radial gradient — 우측 보조 */}
      <div
        className="pointer-events-none"
        style={{
          position: "absolute",
          top: "-841px",
          right: "-1px",
          width: "1921px",
          height: "1921px",
          borderRadius: "1921px",
          background: "radial-gradient(50% 50% at 50% 50%, rgba(37, 113, 235, 0.36) 0%, rgba(216, 231, 255, 0.00) 100%)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "217px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "866px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          zIndex: 1,
        }}
      >
        <p
          style={{
            alignSelf: "stretch",
            color: "#E1E4ED",
            textAlign: "center",
            fontSize: "64px",
            fontWeight: 400,
            lineHeight: "120%",
          }}
        >
          ✏️
        </p>
        <p
          style={{
            alignSelf: "stretch",
            color: "#E1E4ED",
            textAlign: "center",
            fontSize: "24px",
            fontWeight: 400,
            lineHeight: "120%",
          }}
        >
          Step 1. 경험 등록
        </p>
        <p
          style={{
            color: "#FFFFFF",
            textAlign: "center",
            fontSize: "40px",
            fontWeight: 700,
            lineHeight: "120%",
          }}
        >
          STAR 기법으로 경험을 등록해두세요
        </p>

      </div>

      <img
        src="/feature-step1.svg"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "433.873px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "570px",
          height: "647px",
          zIndex: 1,
        }}
      />
    </section>
  );
}
