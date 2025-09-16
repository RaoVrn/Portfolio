// Project data for the portfolio
export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  githubLink: string;
  liveDemo: string;
  image: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Aura - AI-Powered Desktop Assistant",
    description: "AI desktop assistant with NLP command execution, file management, and offline automation.",
    longDescription: "Developing an AI desktop assistant with NLP command execution, file/app management, and offline automation. Added NLP features for web search, Spotify/YouTube control, and Gmail drafting. Designed high-performance APIs supporting plugins, memory, and real-time AI responses.",
    techStack: ["Python", "AI/ML", "Windows API", "NLP", "Speech Recognition", "Automation"],
    githubLink: "https://github.com/RaoVrn/aura-assistant",
    liveDemo: "#",
    image: "/api/placeholder/600/400",
    featured: true
  },
  {
    id: 2,
    title: "TeamSync - Project Management Tool",
    description: "Full-stack project management tool with real-time collaboration and task management features.",
    longDescription: "Contributed to TeamSync, a full-stack project management tool developed with React.js, Node.js, and MongoDB, enhancing task management, collaboration, and real-time updates. Actively participated in daily agile meetings and strengthened expertise in API development, database design, and frontend-backend integration.",
    techStack: ["React.js", "Node.js", "MongoDB", "Real-time Updates", "API Development"],
    githubLink: "https://github.com/RaoVrn/teamsync",
    liveDemo: "https://teamsync.vercel.app",
    image: "/api/placeholder/600/400",
    featured: true
  },
  {
    id: 3,
    title: "RentEase - Property Management Platform",
    description: "Full-stack rental system with tenant dashboards and AI assistant for smart property management.",
    longDescription: "Built a comprehensive rental system with tenant dashboards and secure REST APIs to manage payments, listings, and maintenance. Integrated an AI assistant for smart search, rent reminders, and support, managing 4.7k+ properties across 6 major Indian cities.",
    techStack: ["Next.js", "Node.js", "MongoDB", "Gemini API", "REST APIs", "AI Assistant"],
    githubLink: "https://github.com/RaoVrn/rentease",
    liveDemo: "https://rentease.vercel.app",
    image: "/api/placeholder/600/400",
    featured: false
  },
  {
    id: 4,
    title: "FurEverHome",
    description: "Helping pets find their forever homes through an intuitive adoption platform.",
    longDescription: "A comprehensive pet adoption platform that connects loving families with pets in need of homes. Features advanced search filters, pet profiles, adoption tracking, and community features to ensure successful matches between pets and families.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "Cloudinary"],
    githubLink: "https://github.com/RaoVrn/fureverhome",
    liveDemo: "#",
    image: "/api/placeholder/600/400",
    featured: true
  },
  {
    id: 5,
    title: "FeedWise",
    description: "Smart content curation and feed management system with AI-powered recommendations.",
    longDescription: "An intelligent content curation platform that uses machine learning algorithms to provide personalized content recommendations. Features real-time content aggregation, user preference learning, and smart filtering capabilities.",
    techStack: ["React.js", "Python", "FastAPI", "PostgreSQL", "ML Algorithms", "Redis"],
    githubLink: "https://github.com/RaoVrn/feedwise",
    liveDemo: "#",
    image: "/api/placeholder/600/400",
    featured: false
  },
  {
    id: 6,
    title: "NetPulse",
    description: "Network monitoring and analytics dashboard for real-time infrastructure insights.",
    longDescription: "A comprehensive network monitoring solution that provides real-time analytics, performance metrics, and automated alerting. Features include bandwidth monitoring, device discovery, and predictive analytics for network optimization.",
    techStack: ["Vue.js", "Python", "Django", "InfluxDB", "Grafana", "Docker"],
    githubLink: "https://github.com/RaoVrn/netpulse",
    liveDemo: "#",
    image: "/api/placeholder/600/400",
    featured: false
  }
];

// Skills data based on resume
export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'cloud' | 'language' | 'tools';
  icon: string;
}

export const skills: Skill[] = [
  // Frontend
  { name: "HTML", level: 95, category: 'frontend', icon: '🌐' },
  { name: "CSS", level: 90, category: 'frontend', icon: '🎨' },
  { name: "JavaScript", level: 88, category: 'frontend', icon: '🟨' },
  { name: "React.js", level: 85, category: 'frontend', icon: '⚛️' },
  { name: "Tailwind CSS", level: 90, category: 'frontend', icon: '💨' },
  { name: "Next.js", level: 80, category: 'frontend', icon: '⬛' },
  
  // Backend
  { name: "Node.js", level: 85, category: 'backend', icon: '🟢' },
  { name: "Python", level: 90, category: 'backend', icon: '🐍' },
  { name: "Flask", level: 75, category: 'backend', icon: '🌶️' },
  { name: "FastAPI", level: 80, category: 'backend', icon: '⚡' },
  { name: "MongoDB", level: 85, category: 'backend', icon: '🍃' },
  { name: "MySQL", level: 80, category: 'backend', icon: '�' },
  
  // Cloud & DevOps
  { name: "Vercel", level: 85, category: 'cloud', icon: '▲' },
  { name: "Render", level: 75, category: 'cloud', icon: '☁️' },
  { name: "GitHub Pages", level: 90, category: 'cloud', icon: '📄' },
  { name: "Oracle Cloud", level: 70, category: 'cloud', icon: '🔴' },
  { name: "AWS", level: 70, category: 'cloud', icon: '🟠' },
  { name: "Docker", level: 65, category: 'cloud', icon: '🐳' },
  
  // Languages
  { name: "C++", level: 85, category: 'language', icon: '🔵' },
  { name: "Java", level: 80, category: 'language', icon: '☕' },
  { name: "Python", level: 90, category: 'language', icon: '🐍' },
  { name: "JavaScript", level: 88, category: 'language', icon: '🟨' },
  
  // Tools
  { name: "Git", level: 90, category: 'tools', icon: '📝' },
  { name: "GitHub", level: 95, category: 'tools', icon: '🐙' },
  { name: "VS Code", level: 95, category: 'tools', icon: '💙' },
  { name: "Streamlit", level: 75, category: 'tools', icon: '📈' }
];

// Achievements data based on resume
export interface Achievement {
  id: number;
  title: string;
  organization: string;
  date: string;
  description: string;
  prize?: string;
  category: 'hackathon' | 'competition' | 'certification' | 'award';
  icon: string;
}

export const achievements: Achievement[] = [
  {
    id: 1,
    title: "GDG on Campus Solution Challenge 2025",
    organization: "Google Developer Groups",
    date: "July 2025",
    description: "Built NLP2SQL, converting natural language to SQL; selected among top 105 teams nationally out of 57,000+ developers.",
    prize: "Top 105",
    category: 'hackathon',
    icon: '🏆'
  },
  {
    id: 2,
    title: "Guidewire DevTrails Hackathon",
    organization: "Guidewire",
    date: "May 2025",
    description: "Developed KubeWise, a CLI-based Kubernetes SRE assistant using Pydantic-AI and agentic ML.",
    prize: "1st Runner-Up",
    category: 'hackathon',
    icon: '🥈'
  },
  {
    id: 3,
    title: "Genesis Mini-Hack by TPH SRM",
    organization: "The Programming Hub SRM",
    date: "April 2025",
    description: "Proposed LLM-driven schema mapping to extract structured data from unstructured inputs.",
    prize: "1st Runner-Up",
    category: 'hackathon',
    icon: '🥈'
  },
  {
    id: 4,
    title: "SEED Global Hackathon",
    organization: "SEED Global",
    date: "November 2024",
    description: "Fine-tuned GPT-4o Mini for NLP2SQL; achieved 95.66% accuracy and deployed on Streamlit.",
    prize: "2nd Runner-Up",
    category: 'hackathon',
    icon: '🥉'
  },
  {
    id: 5,
    title: "HackStreet 2.0",
    organization: "Bajaj Finserv",
    date: "February 2024",
    description: "Built a pneumonia detection model using ML/DL; achieved 98% accuracy, ranked top among 40+ teams.",
    prize: "1st Runner-Up",
    category: 'hackathon',
    icon: '🥈'
  },
  {
    id: 6,
    title: "GitHub Foundations",
    organization: "GitHub",
    date: "2024",
    description: "Professional certification in Git, GitHub, and collaborative software development practices.",
    category: 'certification',
    icon: '📜'
  },
  {
    id: 7,
    title: "Oracle Cloud Infrastructure Foundations",
    organization: "Oracle",
    date: "2024",
    description: "Certified in Oracle Cloud Infrastructure fundamentals and cloud computing concepts.",
    category: 'certification',
    icon: '☁️'
  },
  {
    id: 8,
    title: "Programming in Modern C++",
    organization: "NPTEL",
    date: "2024",
    description: "Advanced certification in modern C++ programming concepts and best practices.",
    category: 'certification',
    icon: '⚡'
  },
  {
    id: 9,
    title: "Introduction to Machine Learning",
    organization: "NPTEL",
    date: "2024",
    description: "Foundational concepts in supervised and unsupervised learning, model evaluation, and feature engineering.",
    category: 'certification',
    icon: '🧠'
  },
  {
    id: 10,
    title: "Database Management System",
    organization: "NPTEL",
    date: "2024",
    description: "Core DBMS principles: relational modeling, SQL, transactions, indexing, and normalization.",
    category: 'certification',
    icon: '🗄️'
  },
  {
    id: 11,
    title: "Top 2% Academic Performance",
    organization: "SRM Institute of Science and Technology",
    date: "2024-2025",
    description: "Achieved top 2% academic ranking in the college with consistent excellence in Computer Science and Engineering.",
    category: 'award',
    icon: '🎓'
  }
];
