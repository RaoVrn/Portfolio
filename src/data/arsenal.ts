/* ============================================================
   Arsenal — technologies grouped by discipline. Every item is
   real: sourced from projects, experience, and certifications.
   ============================================================ */

export interface ArsenalCategory {
  id: string;
  label: string;
  note: string;
  items: string[];
}

export const arsenal: ArsenalCategory[] = [
  {
    id: "languages",
    label: "Languages",
    note: "Where everything starts",
    items: ["Python", "JavaScript", "TypeScript", "C++"],
  },
  {
    id: "frontend",
    label: "Frontend",
    note: "Interfaces and interaction",
    items: ["React", "Next.js", "Tailwind CSS", "Vite"],
  },
  {
    id: "backend",
    label: "Backend",
    note: "APIs and application logic",
    items: ["Node.js", "REST APIs", "Supabase"],
  },
  {
    id: "databases",
    label: "Databases",
    note: "Structured data at rest",
    items: ["SQL", "PostgreSQL", "MongoDB"],
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    note: "Ship and operate",
    items: ["Docker", "Cloud", "CI/CD"],
  },
  {
    id: "ai",
    label: "AI & Tools",
    note: "The current frontier",
    items: ["LLMs", "RAG", "AI Agents", "OpenAI APIs", "Groq", "Pydantic AI", "MCP", "Claude Code", "OpenCode", "Git", "GitHub"],
  },
];