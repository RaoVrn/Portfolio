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
  tags: string[];
  github?: string;
  live?: string;
  image?: { src: string; alt: string };
  /** Small abstract motif used in the project grid. */
  motif?: "risk" | "rentease" | "aura";
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
      "A computer vision system that monitors drivers and helps assess risk through role-based dashboards.",
    tags: ["Computer Vision", "Driver Monitoring", "Dashboards"],
    github: "https://github.com/RaoVrn/predictive-risk-assessment",
    motif: "risk",
  },
  {
    id: "rentease",
    name: "RentEase",
    category: "Full Stack · AI",
    year: "2025",
    description:
      "A property management platform for listings, tenants, payments, and maintenance.",
    tags: ["Full Stack", "Property Management", "AI Assistance"],
    github: "https://github.com/RaoVrn/RentEase",
    motif: "rentease",
  },
  {
    id: "aura",
    name: "Aura",
    category: "AI · Automation",
    year: "2025",
    description:
      "An AI-powered desktop assistant that turns natural-language commands into actions.",
    tags: ["Automation", "Natural Language", "AI Systems"],
    github: "https://github.com/RaoVrn/Aura",
    motif: "aura",
  },
  {
    id: "fureverhome",
    name: "FurEverHome",
    category: "Full Stack · Product",
    year: "2025",
    description:
      "A pet adoption platform connecting people with pets through structured listings.",
    tags: ["React", "Express", "MongoDB"],
    github: "https://github.com/RaoVrn/FurEverHome",
  },
  {
    id: "teamsync",
    name: "TeamSync",
    category: "Full Stack · Collaboration",
    year: "2024",
    description:
      "A real-time project management platform for teams. Built during the Infosys Springboard internship.",
    tags: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/RaoVrn/teamsync_Infosys_Internship_Oct2024",
  },
];