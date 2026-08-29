/* ============================================================
   Terminal — the automated introduction. Data is separate from
   the animation logic so it stays easy to edit.
   ============================================================ */

import { featuredProject, selectedProjects } from "./projects";
import { site } from "./site";

export interface TermLine {
  kind: "cmd" | "out";
  text: string;
  strong?: boolean;
  href?: string;
}

/** The automatic sequence. Understandable, concise, real. */
export const AUTO_SCRIPT: { cmd: string; out: TermLine[] }[] = [
  {
    cmd: "whoami",
    out: [
      { kind: "out", text: "Varun Prakash", strong: true },
      { kind: "out", text: "Software Engineer" },
    ],
  },
  {
    cmd: "what-i-build",
    out: [
      { kind: "out", text: "Full-stack applications" },
      { kind: "out", text: "AI-powered tools" },
      { kind: "out", text: "Useful developer experiences" },
    ],
  },
  {
    cmd: "featured-work",
    out: [
      { kind: "out", text: "01  Panda", href: featuredProject.live },
      { kind: "out", text: "    Learn Git visually" },
      { kind: "out", text: "02  Predictive Risk Assessment", href: selectedProjects[0].github },
      { kind: "out", text: "    AI and computer vision" },
      { kind: "out", text: "03  RentEase", href: selectedProjects[1].github },
      { kind: "out", text: "    Rental platform" },
    ],
  },
  {
    cmd: "currently",
    out: [
      { kind: "out", text: "Exploring AI systems, automation," },
      { kind: "out", text: "and intelligent applications." },
    ],
  },
];

export const INTERACTIVE_HINT = 'Interactive mode available. Type "help" to explore.';

/** Commands available after the automatic sequence. */
export function runCommand(raw: string): TermLine[] {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case "help":
      return [
        { kind: "out", text: "Available commands:" },
        { kind: "out", text: "about   work   experience   contact   clear" },
      ];
    case "about":
      return [{ kind: "out", text: "Software Engineer focused on AI, automation, and full-stack development." }];
    case "work":
      return [
        { kind: "out", text: "Panda", href: featuredProject.live },
        { kind: "out", text: "Predictive Risk Assessment", href: selectedProjects[0].github },
        { kind: "out", text: "RentEase", href: selectedProjects[1].github },
      ];
case "experience":
      return [
        { kind: "out", text: "HCLTech" },
        { kind: "out", text: "Samsung R&D Institute India" },
        { kind: "out", text: "Infosys Springboard" },
      ];
    case "contact":
      return [
        { kind: "out", text: "GitHub", href: site.links.github },
        { kind: "out", text: "LinkedIn", href: site.links.linkedin },
        { kind: "out", text: "Email", href: `mailto:${site.email}` },
      ];
    default:
      return [
        { kind: "out", text: `command not found: ${cmd}` },
        { kind: "out", text: 'Try typing "help"' },
      ];
  }
}