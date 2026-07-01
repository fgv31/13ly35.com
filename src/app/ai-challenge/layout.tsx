import type { ReactNode } from "react";
import "./ai-challenge.css";

export default function AiChallengeLayout({ children }: { children: ReactNode }) {
  return <div className="av2-scope">{children}</div>;
}
