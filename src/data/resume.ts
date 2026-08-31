/* ============================================================
   Resume — content for the dedicated /resume page. This is the
   user's professional resume (not a copy of the portfolio), so it
   uses the original resume details, including its achievement
   metrics, and does not mirror homepage sections.
   ============================================================ */

export const resumePdfUrl =
  "https://drive.google.com/file/d/1jeSpJVRzaCz6poIIy9x6_JugcH61h01_/view?usp=sharing";

export const resume = {
  name: "Varun Prakash",
  title: "Software Engineer | Python | Generative AI & Agentic AI",
  location: "Bharat",
  contacts: {
    phone: {
      label: "8826207628",
      href: "tel:+918826207628",
    },
    email: {
      label: "prakash.varun.0305@gmail.com",
      href: "mailto:prakash.varun.0305@gmail.com",
    },
    linkedin: {
      label: "linkedin.com/in/varun--prakash",
      href: "https://www.linkedin.com/in/varun--prakash/",
    },
    github: {
      label: "github.com/RaoVrn",
      href: "https://github.com/RaoVrn",
    },
  },
  experience: [
    {
      role: "Academic Trainee – Agentic AI Developer",
      company: "HCLTech",
      period: "May 2026 – Aug 2026",
      bullets: [
        "Gained practical exposure to Agentic AI and Generative AI concepts while contributing to Python-based AI processes.",
        "Contributed to development, testing, and validation activities for AI-powered applications, requirement processing, and AI-assisted automation.",
      ],
    },
    {
      role: "Full Stack Developer Intern",
      company: "Infosys Springboard",
      period: "Oct 2024 – Dec 2024",
      bullets: [
        "Co-developed TeamSync, a full-stack project-management tool using React.js and MongoDB that reduced task completion time by 30%, improved on-time delivery by 25%, and increased sprint velocity by 15%.",
        "Streamlined frontend-backend integration and MongoDB data handling in an Agile Scrum environment.",
      ],
    },
    {
      role: "Research and Development Intern",
      company: "Samsung R&D Institute India",
      period: "Jan 2024 – Aug 2024",
      bullets: [
        "Contributed to an AI-powered web interface for image generation and Visual Question Answering (VQA), reducing task execution time by 25%.",
        "Contributed to image inpainting, outpainting, and dynamic prompt handling, expanding supported use cases by 40%.",
      ],
    },
  ],
  projects: [
    {
      name: "Predictive Driver Risk Assessment",
      meta: "Dec 2025 – Mar 2026",
      bullets: [
        "Built a driver risk assessment system with dashboards for passenger, driver, and admin monitoring.",
        "Added AI-based analysis for fatigue, distraction, and emotion detection; achieved 82% accuracy.",
      ],
    },
    {
      name: "NLP2SQL",
      meta: "NLP / AI · SQL",
      bullets: [
        "Built an NLP/AI application that converts natural-language questions into SQL queries, making database querying easier.",
        "Fine-tuned GPT-4o Mini and reported 95.66% accuracy; deployed the application on Streamlit.",
      ],
    },
    {
      name: "Aura – AI-Powered Desktop Assistant",
      meta: "Jan 2025 – May 2025",
      bullets: [
        "Built an AI-powered desktop assistant using natural-language commands for application control, file management, and simple automation.",
        "Added web search, media control, and email drafting through natural-language interactions.",
      ],
    },
  ],
  skillGroups: [
    { label: "Languages", items: "Python, Java, JavaScript" },
    { label: "AI / Generative AI", items: "Generative AI, Agentic AI, NLP, LLM Applications" },
    { label: "Web", items: "HTML, CSS, React.js" },
    { label: "Databases", items: "MySQL, MongoDB, SQL" },
    { label: "Tools", items: "Git, GitHub, Streamlit" },
  ],
  education: {
    school: "SRM Institute of Science and Technology",
    degree: "B.Tech in Computer Science Engineering",
    period: "May 2022 – May 2026",
    cgpa: "9.60 / 10",
    location: "Bharat",
  },
  achievements: [
    { event: "GDG on Campus Solution Challenge 2025", result: "Top 105 of 57,000+ Developers", date: "Jul 2025" },
    { event: "Guidewire DevTrails University Hackathon", result: "1st Runner-Up", date: "May 2025" },
    { event: "Genesis Mini-Hack by TPH SRM", result: "1st Runner-Up", date: "Apr 2025" },
    { event: "SEED Global Hackathon", result: "2nd Runner-Up", date: "Nov 2024" },
    { event: "HackStreet 2.0 by Bajaj Finserv", result: "1st Runner-Up", date: "Feb 2024" },
  ],
  certifications: [
    { title: "GitHub Foundations", issuer: "GitHub" },
    { title: "Oracle Cloud Infrastructure Foundations", issuer: "Oracle" },
    { title: "Programming in Modern C++", issuer: "NPTEL" },
    { title: "Introduction to Machine Learning", issuer: "NPTEL" },
    { title: "Database Management System", issuer: "NPTEL" },
    { title: "AWS Academy Graduate — AWS Machine Learning Foundations", issuer: "AWS Academy" },
    { title: "Introduction to Front-End Development", issuer: "Meta" },
    { title: "Programming with JavaScript", issuer: "Meta" },
  ],
};