/* ============================================================
   Arsenal — technologies grouped by discipline. Every item is
   real: sourced from projects, experience, and certifications.
   Each item carries a short technical inventory label.
   ============================================================ */

export interface ArsenalItem {
  name: string;
  tag: string;
}

export interface ArsenalCategory {
  id: string;
  label: string;
  note: string;
  items: ArsenalItem[];
}

export const arsenal: ArsenalCategory[] = [
  {
    id: "languages",
    label: "Languages",
    note: "Where everything starts",
    items: [
      { name: "Python", tag: "Primary language" },
      { name: "JavaScript", tag: "Web development" },
      { name: "TypeScript", tag: "Type-safe development" },
      { name: "C++", tag: "Systems programming" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    note: "Interfaces and interaction",
    items: [
      { name: "React", tag: "UI development" },
      { name: "Next.js", tag: "Application framework" },
      { name: "Tailwind CSS", tag: "Interface styling" },
      { name: "Vite", tag: "Build tooling" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    note: "APIs and application logic",
    items: [
      { name: "Node.js", tag: "Server runtime" },
      { name: "REST APIs", tag: "API design" },
      { name: "Supabase", tag: "Backend-as-a-service" },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    note: "Structured data at rest",
    items: [
      { name: "SQL", tag: "Relational queries" },
      { name: "PostgreSQL", tag: "Relational database" },
      { name: "MongoDB", tag: "Document database" },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    note: "Ship and operate",
    items: [
      { name: "Docker", tag: "Containers" },
      { name: "Cloud", tag: "Cloud platforms" },
      { name: "CI/CD", tag: "Pipelines" },
    ],
  },
  {
    id: "ai",
    label: "AI & Tools",
    note: "The current frontier",
    items: [
      { name: "LLMs", tag: "Language models" },
      { name: "RAG", tag: "Retrieval augmented" },
      { name: "AI Agents", tag: "Agent workflows" },
      { name: "OpenAI APIs", tag: "Model integration" },
      { name: "Groq", tag: "Fast inference" },
      { name: "Pydantic AI", tag: "Structured AI output" },
      { name: "MCP", tag: "Tool protocol" },
      { name: "Claude Code", tag: "AI coding" },
      { name: "OpenCode", tag: "AI coding" },
      { name: "Git", tag: "Version control" },
      { name: "GitHub", tag: "Repository hosting" },
    ],
  },
];