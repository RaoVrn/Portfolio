/* ============================================================
   Highlights — achievements and certifications. Factual only.
   ============================================================ */

export interface Highlight {
  id: string;
  ranking: string;
  event: string;
  project?: string;
  detail?: string;
  date: string;
  /** Slightly stronger visual treatment. */
  featured?: boolean;
}

export const highlights: Highlight[] = [
  {
    id: "gdg",
    ranking: "Top 105 of 57,000+ developers",
    event: "GDG on Campus Solution Challenge 2025",
    project: "NLP2SQL",
    detail: "natural language to SQL",
    date: "Jul 2025",
    featured: true,
  },
  {
    id: "devtrails",
    ranking: "1st Runner-Up",
    event: "Guidewire DevTrails Hackathon",
    project: "KubeWise",
    detail: "CLI Kubernetes SRE assistant with Pydantic AI",
    date: "May 2025",
  },
  {
    id: "genesis",
    ranking: "1st Runner-Up",
    event: "Genesis Mini-Hack by TPH SRM",
    project: "LLM-driven schema mapping",
    detail: "structured data from unstructured inputs",
    date: "Apr 2025",
  },
  {
    id: "seed",
    ranking: "2nd Runner-Up",
    event: "SEED Global Hackathon",
    project: "NLP2SQL",
    detail: "fine-tuned GPT-4o Mini · 95.66% accuracy",
    date: "Nov 2024",
  },
  {
    id: "hackstreet",
    ranking: "1st Runner-Up",
    event: "HackStreet 2.0 by Bajaj Finserv",
    project: "Pneumonia detection",
    detail: "machine learning and deep learning · 98% accuracy",
    date: "Feb 2024",
  },
];

export interface Certification {
  name: string;
  issuer: string;
  courses?: string[];
}

export const certifications: Certification[] = [
  { name: "GitHub Foundations", issuer: "GitHub" },
  { name: "Oracle Cloud Infrastructure Foundations", issuer: "Oracle" },
  {
    name: "NPTEL",
    issuer: "NPTEL",
    courses: ["Programming in Modern C++", "Introduction to Machine Learning", "Database Management System"],
  },
];