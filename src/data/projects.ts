/* ============================================================
   Work — project data, verified against the repositories.
   Descriptions answer "what was built and why it matters".
   ============================================================ */

export interface Project {
  id: string;
  name: string;
  category: string;
  year: string;
  description: string;
  tags?: string[];
  github?: string;
  live?: string;
  image?: { src: string; alt: string };
}

export const featuredProject: Project = {
  id: "panda",
  name: "Panda",
  category: "Featured project",
  year: "2026",
  description:
    "A hands-on platform for learning Git through guided lessons, interactive practice, and AI-assisted help.",
  tags: ["React", "TypeScript", "Vite", "Tailwind", "Supabase", "AI"],
  github: "https://github.com/RaoVrn/panda",
  live: "https://panda-indol-theta.vercel.app/dashboard",
  image: { src: "/images/panda-hero.png", alt: "Panda, the live learning platform" },
};

export const selectedProjects: Project[] = [
  {
    id: "predictive-risk",
    name: "Predictive Risk Assessment",
    category: "AI · Computer Vision",
    year: "2025–26",
    description:
      "An AI system that monitors drivers and assesses risk from visual data through role-based dashboards.",
    github: "https://github.com/RaoVrn/predictive-risk-assessment",
  },
  {
    id: "rentease",
    name: "RentEase",
    category: "Full Stack · AI",
    year: "2025",
    description:
      "A property management platform for listings, tenants, payments, and maintenance.",
    github: "https://github.com/RaoVrn/RentEase",
  },
  {
    id: "aura",
    name: "Aura",
    category: "AI · Automation",
    year: "2025",
    description:
      "An AI-powered desktop assistant that turns natural-language commands into actions.",
    github: "https://github.com/RaoVrn/Aura",
  },
  {
    id: "fureverhome",
    name: "FurEverHome",
    category: "Full Stack · Product",
    year: "2025",
    description:
      "A pet adoption platform connecting people with pets through structured listings.",
    github: "https://github.com/RaoVrn/FurEverHome",
  },
  {
    id: "teamsync",
    name: "TeamSync",
    category: "Full Stack · Collaboration",
    year: "2024",
    description:
      "A real-time project management platform for teams. Built during the Infosys Springboard internship.",
    github: "https://github.com/RaoVrn/teamsync_Infosys_Internship_Oct2024",
  },
];