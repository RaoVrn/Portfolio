/* ============================================================
   Experience — newest to oldest. Concise and human.
   ============================================================ */

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  focus: string;
  tags: string[];
  /** Small system flow shown under the entry. */
  flow?: string[];
}

export const experience: ExperienceEntry[] = [
  {
    company: "HCLTech",
    role: "Academic Trainee, Agentic AI Developer",
    period: "May 2026 – Aug 2026",
    focus:
      "Strengthened software engineering foundations while working with Python, application development, and AI concepts.",
    tags: ["AI", "Agentic AI", "Python"],
    flow: ["Input", "Agent", "Tools", "Output"],
  },
  {
    company: "Infosys Springboard",
    role: "Full Stack Developer Intern",
    period: "Oct 2024 – Dec 2024",
    focus:
      "Built TeamSync, a collaborative project management application for teams, with real-time updates.",
    tags: ["Full Stack", "React", "Node.js"],
    flow: ["Frontend", "API", "Backend", "Database"],
  },
  {
    company: "Samsung R&D Institute India",
    role: "Research and Development Intern",
    period: "Jan 2024 – Aug 2024",
    focus:
      "Worked on AI and computer vision research involving image generation, visual question answering, and image inpainting.",
    tags: ["AI", "Computer Vision"],
    flow: ["Images", "Model", "Insight"],
  },
];