/* ============================================================
   Highlights — achievements and certifications. Factual only.
   Certificates are public Google Drive links to the issued
   credentials, attached to each achievement.
   ============================================================ */

export interface Highlight {
  id: string;
  ranking: string;
  event: string;
  project?: string;
  detail?: string;
  date: string;
  certificate?: string;
}

export const highlights: Highlight[] = [
  {
    id: "gdg",
    ranking: "Top 105 of 57,000+ developers",
    event: "GDG on Campus Solution Challenge 2025",
    project: "NLP2SQL",
    detail: "Natural language to SQL",
    date: "Jul 2025",
    certificate: "https://drive.google.com/file/d/16OVuWBPRMQXxP6r_FA3uEUDEg61e0s-1/view",
  },
  {
    id: "devtrails",
    ranking: "1st Runner-Up",
    event: "Guidewire DevTrails University Hackathon",
    project: "KubeWise",
    detail: "CLI Kubernetes SRE assistant built with Pydantic AI",
    date: "May 2025",
    certificate: "https://drive.google.com/file/d/1oAgFCdugdAlgvjWKn6mk0DaOpT_ElFL_/view",
  },
  {
    id: "genesis",
    ranking: "1st Runner-Up",
    event: "Genesis Mini-Hack by TPH SRM",
    project: "LLM-driven schema mapping",
    detail: "Structured data from unstructured inputs",
    date: "Apr 2025",
    certificate: "https://drive.google.com/file/d/1S4Q3yWtVw_xEil3bzP7gZxKB3maOF8Zm/view",
  },
  {
    id: "seed",
    ranking: "2nd Runner-Up",
    event: "SEED Global Hackathon",
    project: "NLP2SQL",
    detail: "Fine-tuned GPT-4o Mini achieving 95.66% accuracy",
    date: "Nov 2024",
    certificate: "https://drive.google.com/file/d/1KYDAXZz_pfVbjh1RYehdvkGwmunkrr1Z/view",
  },
  {
    id: "hackstreet",
    ranking: "1st Runner-Up",
    event: "HackStreet 2.0 by Bajaj Finserv",
    project: "Pneumonia Detection",
    detail: "Machine learning and deep learning model with 98% accuracy",
    date: "Feb 2024",
    certificate: "https://drive.google.com/file/d/1AyiCa9BoS9ZeHUZSXq4EnRoESMPvNIXj/view",
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