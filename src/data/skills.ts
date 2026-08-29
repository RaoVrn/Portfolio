/* ============================================================
   Skills — what I work with, grouped naturally.
   Only technologies present in the record.
   ============================================================ */

export interface SkillGroup {
  group: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    group: "AI & Intelligent Systems",
    items: ["Python", "LLMs", "Computer Vision", "NLP", "Automation", "Agentic AI"],
  },
  {
    group: "Full Stack",
    items: ["React", "TypeScript", "Node.js", "MongoDB", "Supabase"],
  },
  {
    group: "Developer Tools",
    items: ["Git", "GitHub", "Streamlit", "Vercel", "REST APIs"],
  },
];