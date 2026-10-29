"use client";

/**
 * The last safety net: if the root layout itself fails, this replaces the whole
 * document with a plain, self-contained page (no site styles or scripts needed).
 */
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en-IN">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#050605",
          color: "#f2f5f2",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div>
          <p style={{ color: "#23c862", letterSpacing: "0.12em", fontSize: 12 }}>HIRANIX</p>
          <h1 style={{ fontSize: "clamp(2rem, 6vw, 4rem)", margin: "12px 0" }}>Something went wrong.</h1>
          <p style={{ color: "#9aa49d" }}>Please try again in a moment.</p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 16,
              minHeight: 48,
              padding: "0 24px",
              border: 0,
              borderRadius: 999,
              background: "#23c862",
              color: "#050605",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
