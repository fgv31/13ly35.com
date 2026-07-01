"use client";

/**
 * Shared header for every Section III (MCP Use Cases) slide.
 * Blue mono eyebrow + bold sans headline — matches the Section I slides
 * so the deck reads consistently. Optional lead paragraph below.
 */
export default function Sec3Header({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.55rem",
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "clamp(0.6rem, 1vw, 0.75rem)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--upvest-accent)",
          fontWeight: 600,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: "1.6rem",
            height: "2px",
            background: "var(--upvest-accent)",
            borderRadius: "1px",
            flexShrink: 0,
          }}
        />
        {eyebrow}
      </span>
      <h2
        style={{
          fontFamily: "var(--font-sans, sans-serif)",
          fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "var(--upvest-ink, #0e1238)",
          margin: 0,
        }}
      >
        {title}
      </h2>
      {lead && (
        <p
          style={{
            fontFamily: "var(--font-sans, sans-serif)",
            fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
            lineHeight: 1.5,
            color: "var(--upvest-muted, #5b6079)",
            margin: "0.1rem 0 0 0",
            maxWidth: "92ch",
          }}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
