import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  FolderGit2,
  ExternalLink,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Project } from "@/data/portfolio";
import { usePortfolio } from "@/context/PortfolioContext";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Featured Projects & Case Studies — Sakib Sardar" },
      {
        name: "description",
        content:
          "Production portfolio of Sakib Sardar featuring Enterprise ERP systems, custom Shopify themes, webhook automation apps, and CMS portals.",
      },
      { property: "og:title", content: "Projects — Sakib Sardar" },
    ],
  }),
  component: ProjectsPage,
});

const filterCategories = ["All", "Full-Stack", "Shopify", "CMS", "SaaS"] as const;
type FilterCategory = (typeof filterCategories)[number];

function ProjectsPage() {
  const { projects } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient py-20 text-primary-foreground sm:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <div className="animate-float-soft absolute -left-20 -top-20 h-96 w-96 rounded-full bg-accent/40 blur-3xl" />
          <div className="animate-float-slow absolute bottom-0 right-0 h-96 w-96 rounded-full bg-teal-400/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-14">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <FolderGit2 className="h-4 w-4 text-accent" />
              Verified Case Studies
            </div>
            <h1 className="mt-4 font-sora text-4xl font-extrabold tracking-tight sm:text-6xl">
              Featured <span className="text-accent">Projects</span>
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
              Explore real-world software platforms, bespoke Shopify e-commerce engines, and custom
              automation tools engineered for resilience, speed, and business growth.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="mx-auto max-w-[1500px] px-5 pt-12 sm:px-8 lg:px-14">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2 border-b border-border/80 pb-6">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`rounded-full px-5 py-2 font-sora text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeFilter === cat
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "border border-border/80 bg-card text-muted-foreground hover:border-accent hover:text-foreground"
                }`}
              >
                {cat} {cat !== "All" && `(${projects.filter((p) => p.category === cat).length})`}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Projects Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 60}>
              <div
                className={`flex h-full flex-col justify-between rounded-3xl border border-border/80 bg-card p-7 shadow-sm transition-all duration-300 ${project.cardGlow}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-accent/15 px-3 py-1 font-sora text-[11px] font-bold uppercase tracking-wider text-accent">
                      {project.badge}
                    </span>
                    <span className="font-sora text-xs font-semibold text-muted-foreground">
                      {project.category}
                    </span>
                  </div>

                  <h2 className="mt-4 font-sora text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    {project.title}
                  </h2>

                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {project.description}
                  </p>

                  {/* Challenge & Solution */}
                  <div className="mt-5 space-y-3 rounded-2xl border border-border/70 bg-muted/20 p-4 text-xs">
                    <div>
                      <span className="font-sora font-bold text-foreground">Challenge: </span>
                      <span className="text-muted-foreground">{project.challenge}</span>
                    </div>
                    <div>
                      <span className="font-sora font-bold text-accent">Solution: </span>
                      <span className="text-muted-foreground">{project.solution}</span>
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="mt-4 flex items-start gap-2 text-xs font-semibold text-emerald-500">
                    <TrendingUp className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{project.impact}</span>
                  </div>

                  {/* Metrics */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.metrics.map((m) => (
                      <span
                        key={m}
                        className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400"
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="mt-5 border-t border-border/60 pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-border/60 bg-muted/30 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-border/60 pt-4">
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2 font-sora text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:text-accent"
                  >
                    <span>Request Code / Architecture Walkthrough</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <section className="my-24">
          <Reveal>
            <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-border/80 bg-section-alt p-8 sm:p-12 lg:flex-row">
              <div>
                <h3 className="font-sora text-2xl font-black text-foreground">
                  Have a similar project in mind?
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Let's engineer a solution tailored to your performance benchmarks and business
                  goals.
                </p>
              </div>
              <Link
                to="/contact"
                className="btn-shine inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-sora text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90"
              >
                <span>Start Your Project</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </section>
      </div>

      <Footer />
    </div>
  );
}
