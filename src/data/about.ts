/* ============================================================
   About — a capability showcase. One section, five engineering
   areas. The technologies here are the single source for what I
   work with; nothing is framed as "exploring".
   ============================================================ */

export interface Capability {
  number: string;
  title: string;
  description: string;
  skills: string[];
}

export const about = {
  label: "About / What I build",
  heading: "Building intelligent software from idea to production.",
  intro:
    "I build full-stack applications and AI-powered systems, combining software engineering, data, automation, and modern developer tools.",
  capabilitiesLine: "Software Engineering · AI Engineering · Data Systems · Platform & Automation",
  education:
    "SRM Institute of Science and Technology · B.Tech CSE · CGPA 9.60 / 10 · May 2022 – May 2026 · Chennai",
  capabilities: [
    {
      number: "01",
      title: "AI Engineering",
      description:
        "Building AI-powered applications that use language models, retrieval, tools, structured outputs, and agent workflows.",
      skills: ["LLMs", "RAG", "AI Agents", "Prompt Engineering", "MCP", "OpenAI APIs", "Groq", "Pydantic AI"],
    },
    {
      number: "02",
      title: "Software Engineering",
      description:
        "Designing and building complete applications from user interfaces to backend services and APIs.",
      skills: ["Python", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "REST APIs"],
    },
    {
      number: "03",
      title: "Data Systems",
      description:
        "Working with databases, structured data, backend services, and pipelines that support reliable applications.",
      skills: ["SQL", "MongoDB", "PostgreSQL", "Supabase", "Data Pipelines", "Backend Architecture"],
    },
    {
      number: "04",
      title: "Platform & Automation",
      description:
        "Building and deploying systems with automation, cloud services, containers, and reliable engineering workflows.",
      skills: ["Docker", "Cloud", "CI/CD", "Deployment", "Infrastructure", "Platform Engineering"],
    },
    {
      number: "05",
      title: "AI-Assisted Development",
      description:
        "Using modern AI development environments to design, build, debug, and improve software more effectively.",
      skills: ["Claude Code", "OpenCode", "Git", "GitHub", "MCP", "AI Developer Workflows"],
    },
  ],
} as const;