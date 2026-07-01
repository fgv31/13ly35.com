// ── NodeCard.tsx ───────────────────────────────────────────────────────────
// Clickable-node detail overlay. Reads FlowNode.detail. Escape / click-away
// closes. Escape is captured so it does not leak to the deck controller.

"use client";

import { useEffect } from "react";
import type { FlowNode } from "@/data/sec2-flow";

const ACCENT = "#4f5bff"; // --upvest-accent
const AUTO = "#138a72";
const HUMAN = "#b06a1a";

export default function NodeCard({
  node,
  onClose,
}: {
  node: FlowNode | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!node) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [node, onClose]);

  if (!node) return null;
  const d = node.detail ?? {};
  const classLabel =
    node.autoClass === "auto"
      ? "Deterministic / automated"
      : node.autoClass === "human"
        ? "Human decision"
        : "Branch — partly both";
  const classColor =
    node.autoClass === "auto" ? AUTO : node.autoClass === "human" ? HUMAN : ACCENT;

  return (
    <div
      onClick={onClose}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(14,18,56,0.32)",
        backdropFilter: "blur(2px)",
        zIndex: 30,
        padding: "1.5rem",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${node.label} — detail`}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--upvest-surface, #fff)",
          borderRadius: "0.85rem",
          border: "1px solid var(--upvest-accent-soft, #e7eaff)",
          boxShadow: "0 24px 60px rgba(14,18,56,0.25)",
          padding: "clamp(1.1rem, 2.4vw, 1.6rem)",
          maxWidth: "min(92vw, 480px)",
          display: "flex",
          flexDirection: "column",
          gap: "0.7rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.6rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: classColor,
            }}
          >
            {classLabel}
            {node.tempted ? " · LLM temptation" : ""}
          </span>
          <button
            onClick={onClose}
            aria-label="Close detail"
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "1.1rem",
              lineHeight: 1,
              color: "var(--upvest-muted, #5b6079)",
              padding: "0.1rem 0.3rem",
            }}
          >
            ✕
          </button>
        </div>

        <h3
          style={{
            fontFamily: "var(--font-sans, sans-serif)",
            fontSize: "clamp(1.05rem, 2vw, 1.35rem)",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            color: "var(--upvest-ink, #0e1238)",
            margin: 0,
          }}
        >
          {node.label}
        </h3>

        {d.auto && <DetailRow label="Automated" color={AUTO} body={d.auto} />}
        {d.human && <DetailRow label="Stays human" color={HUMAN} body={d.human} />}
        {d.why && <DetailRow label="Why" color={ACCENT} body={d.why} />}
        {!d.auto && !d.human && !d.why && (
          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--upvest-muted, #5b6079)" }}>
            Part of the deterministic pipeline.
          </p>
        )}
      </div>
    </div>
  );
}

function DetailRow({ label, color, body }: { label: string; color: string; body: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
      <span
        style={{
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "0.56rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 700,
          color,
        }}
      >
        {label}
      </span>
      <p
        style={{
          margin: 0,
          fontSize: "clamp(0.8rem, 1.2vw, 0.92rem)",
          lineHeight: 1.5,
          color: "var(--upvest-ink, #0e1238)",
        }}
      >
        {body}
      </p>
    </div>
  );
}
