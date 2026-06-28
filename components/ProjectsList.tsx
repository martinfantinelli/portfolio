import { projects } from "@/data/projects";

export default function ProjectsList() {
  return (
    <ul className="w-full">
      {projects.map((p) => (
        <li key={p.name} className="border-t border-hairline py-8 last:border-b">
          <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between md:gap-8">
            <div className="md:max-w-md">
              <h3 className="text-lg font-semibold tracking-[-0.01em] text-foreground">
                {p.name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-secondary">
                {p.description}
              </p>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-label text-primary">
                {p.tech.join(" · ")}
              </p>
            </div>
            <div className="flex shrink-0 gap-4 text-[11px] font-medium uppercase tracking-label">
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                  className="text-secondary transition-colors duration-200 hover:text-foreground"
                >
                  Live
                </a>
              )}
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-secondary transition-colors duration-200 hover:text-foreground"
                >
                  Code
                </a>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
