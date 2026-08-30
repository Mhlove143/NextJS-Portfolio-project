import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Layers,
  Check,
  ArrowRight,
  Server,
  ShoppingBag,
  Globe,
  Zap,
  Star,
  Palette,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { usePortfolio } from "@/context/PortfolioContext";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Engineering Services & Solutions — Sakib Sardar" },
      {
        name: "description",
        content:
          "Full-Stack Django & React development, custom Shopify themes & apps, CMS engineering, API integrations, and speed optimization by Sakib Sardar.",
      },
      { property: "og:title", content: "Services — Sakib Sardar" },
    ],
  }),
  component: ServicesPage,
});

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "full-stack": Server,
  shopify: ShoppingBag,
  "cms-headless": Globe,
  "api-automation": Zap,
  performance: Star,
  "ui-ux": Palette,
};

function ServicesPage() {
  const { services } = usePortfolio();
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
              <Layers className="h-4 w-4 text-accent" />
              Core Competencies
            </div>
            <h1 className="mt-4 font-sora text-4xl font-extrabold tracking-tight sm:text-6xl">
              Specialized <span className="text-accent">Services</span>
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
              From enterprise full-stack web platforms and bespoke Shopify Liquid ecosystems to Core
              Web Vitals performance tuning, every service is executed for tangible business impact.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services Grid */}
      <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-14">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.id] || Server;
            const cardGlowClass =
              service.color === "emerald"
                ? "card-glow-emerald"
                : service.color === "sky"
                  ? "card-glow-sky"
                  : service.color === "purple"
                    ? "card-glow-purple"
                    : "card-glow-amber";

            return (
              <Reveal key={service.id} delay={i * 80}>
                <div
                  className={`flex h-full flex-col justify-between rounded-3xl border border-border/80 bg-card p-8 shadow-sm transition-all duration-300 ${cardGlowClass}`}
                >
                  <div>
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 hover:scale-110">
                      <Icon className="h-7 w-7" />
                    </div>

                    <span className="font-sora text-xs font-bold uppercase tracking-wider text-accent">
                      {service.tagline}
                    </span>

                    <h2 className="mt-2 font-sora text-2xl font-bold tracking-tight text-foreground">
                      {service.title}
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>

                    {/* Business Value Highlight */}
                    <div className="mt-4 rounded-xl border border-accent/20 bg-accent/5 p-3.5">
                      <span className="font-sora text-[11px] font-bold text-accent uppercase tracking-wider">
                        Business Impact:
                      </span>
                      <p className="mt-0.5 text-xs text-foreground/90 font-medium leading-relaxed">
                        {service.businessValue}
                      </p>
                    </div>

                    {/* Deliverables */}
                    <div className="mt-6 border-t border-border/70 pt-5">
                      <p className="mb-3 font-sora text-xs font-bold uppercase tracking-wider text-foreground">
                        Included Deliverables:
                      </p>
                      <ul className="space-y-2">
                        {service.deliverables.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs font-medium text-muted-foreground"
                          >
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="mt-6 border-t border-border/70 pt-4">
                      <p className="mb-2 font-sora text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Tech Stack:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {service.technologies.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-border/70 bg-muted/40 px-2 py-0.5 text-[11px] font-semibold text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-border/60">
                    <Link
                      to="/contact"
                      className="group inline-flex items-center gap-2 font-sora text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:text-accent"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
