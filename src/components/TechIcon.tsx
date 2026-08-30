import {
  Boxes,
  Wind,
  BrainCircuit,
  Code2,
  Cpu,
  Eye,
  Bot,
  Cloud,
  Database,
  GitBranch,
  Layers,
  Network,
  Plug,
  Rocket,
  Search,
  Server,
  Sparkles,
  SquareTerminal,
  TextCursorInput,
  Workflow,
  Zap,
} from "lucide-react";
import {
  siClaudecode,
  siCplusplus,
  siDocker,
  siGit,
  siGithub,
  siJavascript,
  siCss,
  siHtml5,
  siLinux,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siOpencode,
  siPostgresql,
  siPydantic,
  siPython,
  siReact,
  siSupabase,
  siTypescript,
  siVite,
} from "simple-icons";

type IconKind =
  | { kind: "brand"; path: string }
  | { kind: "ui"; component: typeof Bot };

const ICONS: Record<string, IconKind> = {
  "LLMs": { kind: "ui", component: BrainCircuit },
  "AI": { kind: "ui", component: BrainCircuit },
  "AI / ML": { kind: "ui", component: BrainCircuit },
  "MySQL": { kind: "brand", path: siMysql.path },
  "HTML": { kind: "brand", path: siHtml5.path },
  "CSS": { kind: "brand", path: siCss.path },
  "Linux": { kind: "brand", path: siLinux.path },
  "Machine Learning": { kind: "ui", component: Cpu },
  "Computer Vision": { kind: "ui", component: Eye },
  "HTML · CSS": { kind: "ui", component: Code2 },
  "RAG": { kind: "ui", component: Search },
  "AI Agents": { kind: "ui", component: Bot },
  "Prompt Engineering": { kind: "ui", component: TextCursorInput },
  "MCP": { kind: "ui", component: Plug },
  "OpenAI APIs": { kind: "ui", component: Sparkles },
  "Groq": { kind: "ui", component: Zap },
  "Pydantic AI": { kind: "brand", path: siPydantic.path },
  "Python": { kind: "brand", path: siPython.path },
  "JavaScript": { kind: "brand", path: siJavascript.path },
  "TypeScript": { kind: "brand", path: siTypescript.path },
  "React": { kind: "brand", path: siReact.path },
  "Next.js": { kind: "brand", path: siNextdotjs.path },
  "Tailwind CSS": { kind: "ui", component: Wind },
  "C++": { kind: "brand", path: siCplusplus.path },
  "Vite": { kind: "brand", path: siVite.path },
  "Node.js": { kind: "brand", path: siNodedotjs.path },
  "REST APIs": { kind: "ui", component: Server },
  "SQL": { kind: "ui", component: Database },
  "MongoDB": { kind: "brand", path: siMongodb.path },
  "PostgreSQL": { kind: "brand", path: siPostgresql.path },
  "Supabase": { kind: "brand", path: siSupabase.path },
  "Data Pipelines": { kind: "ui", component: Workflow },
  "Backend Architecture": { kind: "ui", component: Network },
  "Docker": { kind: "brand", path: siDocker.path },
  "Cloud": { kind: "ui", component: Cloud },
  "CI/CD": { kind: "ui", component: GitBranch },
  "Deployment": { kind: "ui", component: Rocket },
  "Infrastructure": { kind: "ui", component: Layers },
  "Platform Engineering": { kind: "ui", component: Boxes },
  "Claude Code": { kind: "brand", path: siClaudecode.path },
  "OpenCode": { kind: "brand", path: siOpencode.path },
  "Git": { kind: "brand", path: siGit.path },
  "GitHub": { kind: "brand", path: siGithub.path },
  "AI Developer Workflows": { kind: "ui", component: Workflow },
};

/** A consistent monochrome icon for a technology or concept. */
export function TechIcon({ name, className }: { name: string; className?: string }) {
  const icon = ICONS[name] ?? { kind: "ui", component: SquareTerminal };
  if (icon.kind === "brand") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
        <path d={icon.path} />
      </svg>
    );
  }
  const IconComponent = icon.component;
  return <IconComponent className={className} aria-hidden="true" />;
}