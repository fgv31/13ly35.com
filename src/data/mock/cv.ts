export interface CVEntry {
  year: string;
  title: string;
  description: string;
  type: "work" | "education" | "personal";
}

export const cvData: CVEntry[] = [
  {
    year: "2024",
    title: "Current Role",
    description: "Placeholder description",
    type: "work",
  },
  {
    year: "2022",
    title: "Previous Experience",
    description: "Placeholder",
    type: "work",
  },
  {
    year: "2020",
    title: "Education Milestone",
    description: "Placeholder",
    type: "education",
  },
  {
    year: "2018",
    title: "First Achievement",
    description: "Placeholder",
    type: "personal",
  },
  {
    year: "Earlier",
    title: "Origin Story",
    description: "Where it all began",
    type: "personal",
  },
];
