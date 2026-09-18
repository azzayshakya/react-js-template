export function Button({ children, onClick, variant = "primary", disabled = false, type = "button" }) {
  const styles = {
    base: {
      padding: "8px 16px",
      borderRadius: "6px",
      border: "none",
      fontSize: "14px",
      fontWeight: 600,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.6 : 1,
    },
    primary: { background: "#2563eb", color: "#fff" },
    secondary: { background: "#e5e7eb", color: "#111827" },
    danger: { background: "#dc2626", color: "#fff" },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...styles.base, ...styles[variant] }}
    >
      {children}
    </button>
  );
}
