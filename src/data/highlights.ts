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
  title: string;
  issuer: string;
  year?: string;
  url: string;
}

export const certifications: Certification[] = [
  {
    title: "GitHub Foundations",
    issuer: "GitHub",
    url: "https://drive.google.com/file/d/16De0M_Lj-9lITfZ8oDRHdzh5_FvgVYf5/view",
  },
  {
    title: "Oracle Cloud Infrastructure Foundations",
    issuer: "Oracle",
    url: "https://drive.google.com/file/d/1s-7L6G3D99YQnzHpQL6glo4C5R9Evcbc/view",
  },
  {
    title: "Programming in Modern C++",
    issuer: "NPTEL",
    url: "https://drive.google.com/file/d/1jXdCe7YTqCexdq3EwUnMVPCi7GqCm8A0/view",
  },
  {
    title: "Introduction to Machine Learning",
    issuer: "NPTEL",
    url: "https://drive.google.com/file/d/1CrrDV97BEL2pt_CmirMwgXHqxB2DQscl/view",
  },
  {
    title: "Database Management System",
    issuer: "NPTEL",
    url: "https://drive.google.com/file/d/10sZDLpbb-KWbKzh-fSbxmun6JIqcIksO/view",
  },
  {
    title: "AWS Academy Graduate — AWS Machine Learning Foundations",
    issuer: "AWS Academy",
    url: "https://drive.google.com/file/d/10Uv_jL5z_m_irfd07qZKNKNM5ByWF0FK/view",
  },
  {
    title: "Introduction to Front-End Development",
    issuer: "Meta",
    year: "2024",
    url: "https://drive.google.com/file/d/1_NaBPaBcz7fr-vs3sHPe8eqKw5eKQSyU/view?usp=drive_link",
  },
  {
    title: "Programming with JavaScript",
    issuer: "Meta",
    year: "2024",
    url: "https://drive.google.com/file/d/1pQHRcg97pieLYWEs8r_yh6VPTmA6gPGE/view",
  },
];