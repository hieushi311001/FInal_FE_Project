function Button({ label, id, productId, color, size, onClick }) {
  return (
    <button
      onClick={() => onClick(id, productId, color, size)}
      className="filter-btn"
      style={{
        fontSize: "14px",
        color: "#ffffff",
        fontWeight: 700,
        background: "#e7ab3c",
        padding: "7px 20px 5px",
        borderRadius: "2px",
        display: "inline-block",
        textTransform: "uppercase",
        border: "none",
        cursor: "pointer",
        marginTop: "50px",
        marginLeft: "10px",
      }}
    >
      {label}
    </button>
  );
}

export default Button;
