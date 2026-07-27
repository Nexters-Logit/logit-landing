export default function Footer() {
  return (
    <footer
      className="w-full"
      style={{ background: "#13151C" }}
    >
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "clamp(40px, 6vh, 72px) clamp(20px, 6vw, 120px)",
        minHeight: "clamp(160px, 20vh, 240px)",
      }} />
    </footer>
  );
}
