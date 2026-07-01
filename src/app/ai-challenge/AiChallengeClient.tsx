"use client";

import React from "react";
import { slideManifest, type SlideId, type SlideMeta } from "@/data/ai-challenge";
import { DeckProvider } from "@/components/ai-challenge/DeckController";
import DeckBackground from "@/components/ai-challenge/DeckBackground";
import DeckNav from "@/components/ai-challenge/DeckNav";
import WelcomeSlide from "@/components/ai-challenge/sections/WelcomeSlide";
import DimensionsSlide from "@/components/ai-challenge/sections/DimensionsSlide";
import FailFastSlide from "@/components/ai-challenge/sections/FailFastSlide";
import CaseOverviewSlide from "@/components/ai-challenge/sections/CaseOverviewSlide";
import Sec1QuestionsSlide from "@/components/ai-challenge/sections/Sec1QuestionsSlide";
import Sec1AssumptionsSlide from "@/components/ai-challenge/sections/Sec1AssumptionsSlide";
import Sec1TeamsSlide from "@/components/ai-challenge/sections/Sec1TeamsSlide";
import Sec1VerdictSlide from "@/components/ai-challenge/sections/Sec1VerdictSlide";
import Sec1ReframeSlide from "@/components/ai-challenge/sections/Sec1ReframeSlide";
import Sec2QuestionsSlide from "@/components/ai-challenge/sections/Sec2QuestionsSlide";
import Sec2AssumptionsSlide from "@/components/ai-challenge/sections/Sec2AssumptionsSlide";
import Sec2Q1Slide from "@/components/ai-challenge/sections/Sec2Q1Slide";
import Sec2Q2Slide from "@/components/ai-challenge/sections/Sec2Q2Slide";
import Sec2Q3Slide from "@/components/ai-challenge/sections/sec2flow/Sec2Q3Slide";
import Sec2Q4aSlide from "@/components/ai-challenge/sections/sec2arch/Sec2Q4aSlide";
import Sec2Q4bSlide from "@/components/ai-challenge/sections/Sec2Q4bSlide";
import Sec2Q5Slide from "@/components/ai-challenge/sections/Sec2Q5Slide";
import Sec2Q6Slide from "@/components/ai-challenge/sections/Sec2Q6Slide";
import Sec3QuestionsSlide from "@/components/ai-challenge/sections/Sec3QuestionsSlide";
import Sec3Q1Slide from "@/components/ai-challenge/sections/Sec3Q1Slide";
import Sec3Q2Slide from "@/components/ai-challenge/sections/Sec3Q2Slide";
import Sec3Q3Slide from "@/components/ai-challenge/sections/Sec3Q3Slide";
import Sec3Q4aSlide from "@/components/ai-challenge/sections/Sec3Q4aSlide";
import Sec3Q4bSlide from "@/components/ai-challenge/sections/Sec3Q4bSlide";
import ClosingSlide from "@/components/ai-challenge/sections/ClosingSlide";

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
  "sec2-questions": Sec2QuestionsSlide,
  "sec2-assumptions": Sec2AssumptionsSlide,
  "sec2-q1": Sec2Q1Slide,
  "sec2-q2": Sec2Q2Slide,
  "sec2-q3": Sec2Q3Slide,
  "sec2-q4a": Sec2Q4aSlide,
  "sec2-q4b": Sec2Q4bSlide,
  "sec2-q5": Sec2Q5Slide,
  "sec2-q6": Sec2Q6Slide,
  "sec3-questions": Sec3QuestionsSlide,
  "sec3-q1": Sec3Q1Slide,
  "sec3-q2": Sec3Q2Slide,
  "sec3-q3": Sec3Q3Slide,
  "sec3-q4a": Sec3Q4aSlide,
  "sec3-q4b": Sec3Q4bSlide,
  "closing": ClosingSlide,
};

export default function AiChallengeClient() {
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
