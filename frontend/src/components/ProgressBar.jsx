function ProgressBar({ value }) {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#e5e7eb",
        borderRadius: "8px",
        overflow: "hidden",
        height: "12px",
        marginTop: "8px",
      }}
    >
      <div
        style={{
          width: `${value}%`,
          backgroundColor: "#0078d4",
          height: "100%",
          transition: "width 0.3s ease",
        }}
      />
    </div>
  );
}

export default ProgressBar;