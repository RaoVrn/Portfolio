/* ============================================================
   Site content and configuration.
   ============================================================ */

export const site = {
  name: "Varun Prakash",
  role: "Software Engineer",
  location: "Chennai, India",
  email: "prakash.varun.0305@gmail.com",
  phone: "+91 88262 07628",
  links: {
    linkedin: "https://www.linkedin.com/in/varun--prakash/",
    github: "https://github.com/RaoVrn",
  },
  currentRole: {
    company: "HCLTech",
    title: "Academic Trainee, Agentic AI Developer",
  },
} as const;

/** Prebuilt mailto link used across the contact experience. */
export const contactMailto = `mailto:${site.email}?subject=${encodeURIComponent("Let's connect")}`;