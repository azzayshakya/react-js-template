export function Card({ title, children }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "16px",
        background: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      {title && <h3 style={{ margin: "0 0 12px", fontSize: "16px" }}>{title}</h3>}
      {children}
    </div>
  );
}
