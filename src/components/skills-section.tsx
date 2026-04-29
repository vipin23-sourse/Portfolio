import { cn } from "@/lib/utils";

const skillGroups = [
  {
    category: "Frontend",
    color: "from-violet-500 to-purple-600",
    skills: ["React.js", "Next.js", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
  },
  {
    category: "Styling & UI/UX",
    color: "from-indigo-500 to-blue-600",
    skills: ["Tailwind CSS", "SCSS", "Bootstrap", "Responsive Design", "Figma to Code", "BEM", "Accessibility"],
  },
  {
    category: "Performance",
    color: "from-purple-500 to-pink-600",
    skills: ["Code Splitting", "Lazy Loading", "Lighthouse", "SEO", "Bundle Optimization"],
  },
  {
    category: "AI & Modern Tech",
    color: "from-rose-500 to-orange-500",
    skills: ["Claude AI", "Gemini", "GitHub Copilot", "MCP", "Prompt Engineering", "OpenAI APIs"],
  },
  {
    category: "Headless CMS",
    color: "from-green-500 to-teal-600",
    skills: ["Strapi", "REST APIs", "GraphQL", "Content Modelling", "API Integration"],
  },
  {
    category: "Tools",
    color: "from-amber-500 to-yellow-600",
    skills: ["Git", "Webpack", "Gulp", "VS Code", "Jira", "ShadCN"],
  },
];

function SkillBadge({ skill }: { skill: string }) {
  return (
    <span className="inline-flex max-w-full px-2.5 py-1 rounded-lg text-xs sm:text-sm font-medium bg-secondary border border-border text-foreground hover:border-primary/40 hover:bg-accent hover:text-accent-foreground transition-all duration-200 cursor-default break-words">
      {skill}
    </span>
  );
}

export function SkillsSection() {
  return (
    // overflow-x-hidden prevents any badge overflow from causing a horizontal scrollbar
    <section id="skills" className="section-padding overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
            What I Do
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Core <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            A comprehensive toolkit built over 6+ years of crafting modern web experiences.
          </p>
        </div>

        {/* Skill groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className={cn(
                // w-full + min-w-0 prevents cards from ever exceeding the grid cell
                "group relative w-full min-w-0 rounded-2xl p-4 sm:p-6 bg-card border border-border",
                "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              )}
            >
              {/* Gradient accent bar */}
              <div
                className={cn(
                  "absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r",
                  group.color,
                  "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                )}
              />
              <h3 className="font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
                <span
                  className={cn("h-2 w-2 shrink-0 rounded-full bg-gradient-to-r", group.color)}
                />
                {group.category}
              </h3>
              {/* overflow-hidden on the badge container prevents individual badges overflowing the card */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 overflow-hidden">
                {group.skills.map((skill) => (
                  <SkillBadge key={skill} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
