/* ============================================================
   Portfolio content & configuration.
   Single source of truth for copy that may change over time.
   ============================================================ */

export const site = {
  name: "Varun Prakash",
  firstName: "Varun",
  lastName: "Prakash",
  role: "Software Engineer",
  focus: "Python · Generative AI · Agentic AI",
  location: "Chennai, India",
  email: "prakash.varun.0305@gmail.com",
  phone: "+91 88262 07628",
  links: {
    linkedin: "https://www.linkedin.com/in/varun--prakash/",
    github: "https://github.com/RaoVrn",
  },
  currentRole: {
    company: "HCLTech",
    title: "Agentic AI Developer",
  },
} as const;

/** The portfolio's chapters — anchors for navigation today,
 *  full sections in later phases. */
export const chapters = [
  {
    id: "work",
    n: "01",
    title: "Work",
    note: "Projects and experiments, built to be used",
  },
  {
    id: "journey",
    n: "02",
    title: "Journey",
    note: "Experience, education, milestones",
  },
  {
    id: "now",
    n: "03",
    title: "Now",
    note: "What I'm building and learning today",
  },
  {
    id: "contact",
    n: "04",
    title: "Contact",
    note: "Start a conversation",
  },
] as const;

/** What I'm focused on today — drawn only from known context. */
export const current = [
  {
    title: "Agentic AI",
    note: "Contributing to AI-powered application development at HCLTech",
  },
  {
    title: "Python, deeply",
    note: "DevTrack — a command-line project built to practice the craft",
  },
  {
    title: "LLM applications",
    note: "Fine-tuning, evaluation, and real deployment of language models",
  },
] as const;