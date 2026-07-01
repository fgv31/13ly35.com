"use client";

import React from "react";
import { slideManifest, type SlideId, type SlideMeta } from "@/data/ai-challengev2";
import { DeckProvider } from "@/components/ai-challengev2/DeckController";
import DeckBackground from "@/components/ai-challengev2/DeckBackground";
import DeckNav from "@/components/ai-challengev2/DeckNav";
import WelcomeSlide from "@/components/ai-challengev2/sections/WelcomeSlide";
import DimensionsSlide from "@/components/ai-challengev2/sections/DimensionsSlide";
import FailFastSlide from "@/components/ai-challengev2/sections/FailFastSlide";
import CaseOverviewSlide from "@/components/ai-challengev2/sections/CaseOverviewSlide";
import Sec1QuestionsSlide from "@/components/ai-challengev2/sections/Sec1QuestionsSlide";
import Sec1AssumptionsSlide from "@/components/ai-challengev2/sections/Sec1AssumptionsSlide";
import Sec1TeamsSlide from "@/components/ai-challengev2/sections/Sec1TeamsSlide";
import Sec1VerdictSlide from "@/components/ai-challengev2/sections/Sec1VerdictSlide";
import Sec1ReframeSlide from "@/components/ai-challengev2/sections/Sec1ReframeSlide";
import Sec2PlaceholderSlide from "@/components/ai-challengev2/sections/Sec2PlaceholderSlide";
import Sec3QuestionsSlide from "@/components/ai-challengev2/sections/Sec3QuestionsSlide";
import Sec3Q2Slide from "@/components/ai-challengev2/sections/Sec3Q2Slide";
import Sec3Q1Slide from "@/components/ai-challengev2/sections/Sec3Q1Slide";
import Sec3Q3Slide from "@/components/ai-challengev2/sections/Sec3Q3Slide";
import Sec3Q4Slide from "@/components/ai-challengev2/sections/Sec3Q4Slide";
import Sec3TalkingSlide from "@/components/ai-challengev2/sections/Sec3TalkingSlide";
import ClosingSlide from "@/components/ai-challengev2/sections/ClosingSlide";

const SLIDE_COMPONENTS: Record<SlideId, React.ComponentType<{ meta: SlideMeta; index: number }>> = {
  "welcome": WelcomeSlide,
  "dim-risk": DimensionsSlide,
  "dim-founder": DimensionsSlide,
  "dim-nerd": DimensionsSlide,
  "failfast": FailFastSlide,
  "case-overview": CaseOverviewSlide,
  "sec1-questions": Sec1QuestionsSlide,
  "sec1-assumptions": Sec1AssumptionsSlide,
  "sec1-teams": Sec1TeamsSlide,
  "sec1-verdict": Sec1VerdictSlide,
  "sec1-reframe": Sec1ReframeSlide,
  "sec2-placeholder": Sec2PlaceholderSlide,
  "sec3-questions": Sec3QuestionsSlide,
  "sec3-q2": Sec3Q2Slide,
  "sec3-q1": Sec3Q1Slide,
  "sec3-q3": Sec3Q3Slide,
  "sec3-q4": Sec3Q4Slide,
  "sec3-talking": Sec3TalkingSlide,
  "closing": ClosingSlide,
};

export default function AiChallengeV2Client() {
  return (
    <DeckProvider total={slideManifest.length}>
      <DeckBackground />
      <DeckNav />
      {slideManifest.map((meta, i) => {
        const C = SLIDE_COMPONENTS[meta.id];
        return <C key={meta.id} meta={meta} index={i} />;
      })}
    </DeckProvider>
  );
}
