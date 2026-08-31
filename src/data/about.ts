/* ============================================================
   About — one consolidated profile section. Answers, in order:
   what I build, primary focus areas, technologies, engineering
   journey, and education. No duplication with any other section.
   ============================================================ */

export const about = {
  label: "About / What I build",
  heading: "Building intelligent software from idea to production.",
  intro:
    "I build full-stack applications and AI-powered systems, combining software engineering, data, automation, and modern developer tools.",
  focus: [
    {
      number: "01",
      title: "AI Engineering",
      description: "AI-powered applications, agents, and intelligent workflows.",
    },
    {
      number: "02",
      title: "Software Engineering",
      description: "Reliable full-stack applications and backend systems.",
    },
    {
      number: "03",
      title: "Data Systems",
      description: "Structured data, databases, and application pipelines.",
    },
    {
      number: "04",
      title: "Platform & Automation",
      description: "Developer workflows, deployment, and automation.",
    },
  ],
  techStack: [
    { group: "Languages", items: ["Python", "JavaScript", "TypeScript"] },
    { group: "Applications", items: ["React", "Next.js", "Node.js", "Tailwind CSS"] },
    { group: "Data", items: ["SQL", "PostgreSQL", "Supabase"] },
    { group: "AI & Systems", items: ["LLMs", "RAG", "AI Agents", "OpenAI APIs", "Docker", "Cloud", "CI/CD"] },
  ],
  journey: [
    { year: "2024", title: "Internships", detail: "Samsung R&D · Infosys Springboard" },
    { year: "2025", title: "Projects & AI", detail: "NLP2SQL · Aura · Panda" },
    { year: "2026", title: "Agentic AI", detail: "HCLTech · Building in public" },
  ],
  education: {
    school: "SRM Institute of Science and Technology",
    degree: "B.Tech · Computer Science Engineering",
    cgpa: "9.60",
    cgpaUnit: "CGPA / 10",
    years: "2022 – 2026",
    location: "Bharat",
  },
} as const;