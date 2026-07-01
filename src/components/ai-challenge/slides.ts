export interface Slide {
  id: string;
  chapter: string;
  variant: "light" | "tint" | "dark";
}

export const slides: Slide[] = [
  { id: "hero",          chapter: "Intro",       variant: "light" },
  { id: "arc",           chapter: "Intro",       variant: "light" },
  { id: "philosophy",    chapter: "Philosophy",  variant: "tint"  },
  { id: "questions",     chapter: "The Case",    variant: "dark"  },
  { id: "assumptions",   chapter: "The Case",    variant: "tint"  },
  { id: "teams",         chapter: "Mapping",     variant: "light" },
  { id: "reveal",        chapter: "Mapping",     variant: "dark"  },
  { id: "reframe-setup", chapter: "Reframe",     variant: "dark"  },
  { id: "reframe-payoff",chapter: "Reframe",     variant: "dark"  },
  { id: "closing",       chapter: "Contact",     variant: "dark"  },
];

export const chapterFirstIds: { id: string; label: string }[] = [
  { id: "hero",          label: "Intro"       },
  { id: "philosophy",    label: "Philosophy"  },
  { id: "questions",     label: "The Case"    },
  { id: "teams",         label: "Mapping"     },
  { id: "reframe-setup", label: "Reframe"     },
  { id: "closing",       label: "Contact"     },
];
