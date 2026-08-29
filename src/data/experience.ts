/* ============================================================
   Experience — newest to oldest. Concise and human.
   ============================================================ */

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  focus: string;
  tags: string[];
}

export const experience: ExperienceEntry[] = [
  {
    company: "HCLTech",
    role: "Academic Trainee, Agentic AI Developer",
    period: "May 2026 – Aug 2026",
    focus:
      "Worked on AI-powered application development while strengthening software engineering and practical development skills.",
    tags: ["AI", "Agentic AI", "Python"],
  },
  {
    company: "Infosys Springboard",
    role: "Full Stack Developer Intern",
    period: "Oct 2024 – Dec 2024",
    focus:
      "Built TeamSync, a collaborative project management application with real-time updates and role-based workflows.",
    tags: ["Full Stack", "React", "Node.js"],
  },
  {
    company: "Samsung R&D Institute India",
    role: "Research and Development Intern",
    period: "Jan 2024 – Aug 2024",
    focus:
      "Worked on AI and computer vision research involving image generation, visual question answering, and image inpainting.",
    tags: ["AI", "Computer Vision"],
  },
];