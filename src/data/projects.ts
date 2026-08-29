/* ============================================================
   Work — project data.
   Verified against the live repositories. Featured work is the
   flagship (PANDA); the rest are curated into a compact index.
   ============================================================ */

export interface Project {
  id: string;
  name: string;
  category: string;
  year: string;
  shortDescription: string;
  technologies: string[];
  github?: string;
  live?: string;
  /** Future case-study media. */
  image?: { src: string; alt: string };
}

/** The flagship — PANDA, a visual Git-learning platform. */
export const featuredProject: Project = {
  id: "panda",
  name: "PANDA",
  category: "Interactive learning platform",
  year: "2026",
  shortDescription:
    "An interactive platform for learning Git and version control — guided lessons, a simulated terminal you can actually type in, a hands-on playground, and an AI mentor that answers as you learn.",
  technologies: ["React", "TypeScript", "Vite", "Tailwind", "Supabase", "Groq AI"],
  github: "https://github.com/RaoVrn/panda",
  live: "https://panda-indol-theta.vercel.app/dashboard",
  image: { src: "/images/panda-hero.png", alt: "PANDA — the live learning platform" },
};

/** The rest of the collection — compact, curated, real. */
export const selectedProjects: Project[] = [
  {
    id: "predictive-risk",
    name: "Predictive Risk Assessment",
    category: "AI · Computer Vision",
    year: "2025–26",
    shortDescription:
      "Driver monitoring with a scan-to-result analysis pipeline and role-based dashboards for drivers, passengers and admins, including emergency alerting.",
    technologies: ["Next.js", "TypeScript", "shadcn/ui"],
    github: "https://github.com/RaoVrn/predictive-risk-assessment",
  },
  {
    id: "rentease",
    name: "RentEase",
    category: "Full Stack · AI",
    year: "2025",
    shortDescription:
      "A house rental platform — listings, applications, payments and maintenance workflows, with a Gemini-powered assistant for search and support.",
    technologies: ["React", "Node.js", "MongoDB", "Gemini AI"],
    github: "https://github.com/RaoVrn/RentEase",
  },
  {
    id: "aura",
    name: "Aura",
    category: "AI · Automation",
    year: "2025",
    shortDescription:
      "An AI-powered desktop assistant that turns natural-language commands into actions — apps, files, web, media and email.",
    technologies: ["Python", "NLP", "Automation"],
    github: "https://github.com/RaoVrn/Aura",
  },
  {
    id: "fureverhome",
    name: "FurEverHome",
    category: "Full Stack · Product",
    year: "2025",
    shortDescription:
      "A pet adoption platform connecting families with pets — dual listing types for rehoming and rescue, matching and multi-currency support.",
    technologies: ["React", "Express", "MongoDB", "Tailwind"],
    github: "https://github.com/RaoVrn/FurEverHome",
  },
  {
    id: "teamsync",
    name: "TeamSync",
    category: "Full Stack · Collaboration",
    year: "2024",
    shortDescription:
      "A collaborative project management app with real-time updates over WebSockets, task prioritization and role-based teamwork. Built during the Infosys Springboard internship.",
    technologies: ["React", "Node.js", "MongoDB", "WebSockets"],
    github: "https://github.com/RaoVrn/teamsync_Infosys_Internship_Oct2024",
  },
];

/** Smaller experiments and learning artifacts. */
export const experiments: Project[] = [
  {
    id: "pycraft",
    name: "PyCraft",
    category: "Python · Learning",
    year: "2025",
    shortDescription:
      "A command-line program built to practice Python fundamentals — profile, skills, tasks and learning, all in the terminal.",
    technologies: ["Python", "CLI"],
    github: "https://github.com/RaoVrn/pycraft",
  },
];