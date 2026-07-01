import type { ReactNode } from "react";
import "./ai-challengev2.css";

export default function AiChallengeV2Layout({ children }: { children: ReactNode }) {
  return <div className="av2-scope">{children}</div>;
}
