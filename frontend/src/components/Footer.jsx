import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        color: "#fff",
        padding: "24px 0",
        textAlign: "center",
        fontFamily: "Segoe UI, Arial, sans-serif",
        letterSpacing: "1px",
        marginTop: "40px",
      }}
    >
      <div
        style={{ marginBottom: "8px", fontSize: "1.2rem", fontWeight: "bold" }}
      >
        ThinkNotes &copy; {new Date().getFullYear()}
      </div>
      <div style={{ fontSize: "0.95rem", opacity: 0.8 }}>
        Made with <span style={{ color: "#ffb347" }}>❤</span> by SPT.SOPHEAKTRA
      </div>
      <div style={{ marginTop: "10px" }}>
        <a
          href="https://github.com/Pheakboy/ThinkNotes/tree/main"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#ffb347",
            textDecoration: "none",
            margin: "0 8px",
            fontWeight: "bold",
          }}
        >
          GitHub
        </a>
        |
        <a
          href="https://www.linkedin.com/in/sot-sopheaktra-62380a368/"
          style={{
            color: "#ffb347",
            textDecoration: "none",
            margin: "0 8px",    
            fontWeight: "bold",
          }}
        >
          Contact
        </a>
      </div>
    </footer>
  );
};

export default Footer;
