/* ============================================================
   Skills — what I work with. Focus areas first, then the
   technologies behind them. No ratings, no invented expertise.
   ============================================================ */

export interface FocusArea {
  title: string;
  description: string;
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export const focusAreas: FocusArea[] = [
  {
    title: "Software Development",
    description: "Building practical applications and tools.",
  },
  {
    title: "AI Applications",
    description: "Working with LLMs, generative AI, NLP, and intelligent systems.",
  },
  {
    title: "Automation",
    description: "Creating workflows and tools that reduce manual work.",
  },
  {
    title: "Full-Stack Development",
    description: "Building complete applications from interface to database.",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    group: "Languages",
    items: ["Python", "Java", "JavaScript", "SQL"],
  },
  {
    group: "AI & Intelligent Systems",
    items: ["Generative AI", "Agentic AI", "LLM Applications", "NLP"],
  },
  {
    group: "Web Development",
    items: ["React", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    group: "Data",
    items: ["MongoDB", "MySQL"],
  },
  {
    group: "Tools",
    items: ["Git", "GitHub", "Streamlit"],
  },
];