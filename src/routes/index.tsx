import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Layers,
  ShoppingBag,
  Server,
  Zap,
  CheckCircle2,
  Download,
  FileText,
  Briefcase,
  GraduationCap,
  Languages,
  TrendingUp,
  Award,
  Clock,
  Code2,
  Globe,
  Github,
  Linkedin,
  Mail,
  Phone,
  MessageSquare,
  ExternalLink,
  Cpu,
  ShieldCheck,
  Database,
  Layout,
  Terminal,
  ChevronRight,
  Filter,
} from "lucide-react";

import portraitAsset from "@/assets/sakib-portrait.png.asset.json";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Typewriter } from "@/components/Typewriter";
import { ContactForm } from "@/components/ContactForm";
import { HeroContactCard } from "@/components/HeroContactCard";
import { ResumeModal } from "@/components/ResumeModal";
import { usePortfolio } from "@/context/PortfolioContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sakib Sardar — Full-Stack Developer & Shopify Specialist" },
      {
        name: "description",
        content:
          "Portfolio of Sakib Sardar, Senior Shopify Executive & Full-Stack Developer specializing in Django, React.js, Shopify Apps/Themes, and CMS engineering.",
      },
      { property: "og:title", content: "Sakib Sardar — Full-Stack Developer & Shopify Specialist" },
      {
        property: "og:description",
        content:
          "Full-Stack Developer with 2+ years of experience in Django, React.js, JavaScript, Shopify ecosystem, and CMS development.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const marqueeItems = [
  "Django (Python)",
  "React.js (Hooks & SPA)",
  "Shopify Liquid & Theme Kit",
  "Shopify App CLI & APIs",
  "Django REST Framework",
  "Tailwind CSS & Webflow Motion",
  "PostgreSQL & SQLite",
  "WordPress & WooCommerce",
  "Wix Studio & Velo",
  "Core Web Vitals & Speed Optimization",
];

const metricIcons = [Clock, Layers, ShoppingBag, Award];

export function HomePage() {
  const {
    personalInfo,
    keyMetrics,
    services,
    skillCategories,
    projects,
    experiences,
    educationList,
    certifications,
    languages,
  } = usePortfolio();

  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedServiceFilter, setSelectedServiceFilter] = useState<string>("all");
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>("all");
  const [selectedProjectCategory, setSelectedProjectCategory] = useState<string>("All");

  // Filter services if needed
  const filteredServices =
    selectedServiceFilter === "all"
      ? services
      : selectedServiceFilter === "fullstack"
        ? services.filter((s) => s.id === "fullstack-web" || s.id === "django-backend")
        : selectedServiceFilter === "shopify"
          ? services.filter((s) => s.id === "shopify-development" || s.id === "cms-development")
          : services.filter(
              (s) => s.id === "performance-optimization" || s.id === "team-leadership",
            );

  // Filter skills
  const filteredSkillCategories =
    selectedSkillCategory === "all"
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === selectedSkillCategory);

  // Filter projects
  const filteredProjects =
    selectedProjectCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedProjectCategory);

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground scroll-smooth">
      <Navbar />

      {/* =========================================================================
          HERO SECTION (Webflow-Style Polish, Animated Glowing Orbs, Direct Links)
      ========================================================================== */}
      <section
        id="hero"
        className="relative overflow-hidden bg-hero-gradient pt-16 pb-20 text-primary-foreground sm:pt-20 sm:pb-28"
      >
        {/* Ambient atmospheric glows and grid lines */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-35">
          <div className="grid-lines absolute inset-0 opacity-40" />
          <div className="animate-float-soft absolute -left-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-accent/45 blur-3xl" />
          <div className="animate-float-slow absolute right-0 top-1/4 h-[32rem] w-[32rem] rounded-full bg-teal-400/25 blur-3xl" />
          <div className="animate-float-soft absolute -bottom-10 left-1/3 h-96 w-96 rounded-full bg-primary/45 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-14">
          <div className="grid items-center gap-12 lg:grid-cols-12 xl:gap-16">
            {/* Left Column: Hero Content */}
            <div className="space-y-6 lg:col-span-7">
              {/* Status Badge */}
              <Reveal>
                <div className="inline-flex items-center gap-2.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                  </span>
                  <span>{personalInfo.availability}</span>
                </div>
              </Reveal>

              {/* Headline */}
              <Reveal delay={60}>
                <h1 className="font-sora text-4xl font-extrabold tracking-tight text-primary-foreground sm:text-6xl lg:text-7xl leading-[1.08]">
                  Hi, I'm <span className="text-accent">{personalInfo.name}</span>
                </h1>
              </Reveal>

              {/* Dynamic Typewriter Roles */}
              <Reveal delay={120}>
                <div className="min-h-[2.6rem] font-sora text-lg font-bold text-accent sm:text-2xl lg:text-3xl flex items-center">
                  <Typewriter words={personalInfo.roles} typingSpeed={75} pauseTime={2200} />
                </div>
              </Reveal>

              {/* Narrative Bio */}
              <Reveal delay={180}>
                <p className="max-w-2xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
                  {personalInfo.bio}
                </p>
              </Reveal>

              {/* Hero Feature Lines / Key Value Bullets (Restored as requested!) */}
              <Reveal delay={220}>
                <div className="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary-foreground/90 sm:text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                    <span>Full-Stack Architecture (Django + React)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary-foreground/90 sm:text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                    <span>Bespoke Shopify Themes & Custom Apps</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary-foreground/90 sm:text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                    <span>Sub-Second Latency & Core Web Vitals (95+)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary-foreground/90 sm:text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                    <span>Senior Executive & Team Leader (ScaleUP Ads)</span>
                  </div>
                </div>
              </Reveal>

              {/* Action Buttons: Let's Build + Download Resume */}
              <Reveal delay={260}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#contact"
                    className="btn-shine group inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-4 font-sora text-xs font-bold uppercase tracking-wider text-accent-foreground shadow-xl shadow-accent/30 transition-all duration-300 hover:bg-accent/90 hover:shadow-2xl hover:shadow-accent/50 active:scale-95 sm:px-8"
                  >
                    <span>Let's Build Together</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </a>

                  <button
                    onClick={() => setResumeOpen(true)}
                    className="btn-shine inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-6 py-4 font-sora text-xs font-bold uppercase tracking-wider text-primary-foreground backdrop-blur-md transition-all duration-300 hover:bg-primary-foreground/20 hover:border-accent"
                  >
                    <Download className="h-4 w-4 text-accent" />
                    <span>Download Resume (CV)</span>
                  </button>
                </div>
              </Reveal>

              {/* Hero Social & Direct Channel Links Bar (Restored as requested!) */}
              <Reveal delay={300}>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <span className="font-sora text-xs font-bold uppercase tracking-wider text-primary-foreground/60">
                    Connect:
                  </span>

                  {/* GitHub */}
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-shine inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3.5 py-1.5 text-xs font-semibold text-primary-foreground backdrop-blur-md transition-all hover:bg-primary-foreground/20 hover:border-accent"
                    title="View GitHub Profile"
                  >
                    <Github className="h-3.5 w-3.5 text-accent" />
                    <span>GitHub</span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-shine inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3.5 py-1.5 text-xs font-semibold text-primary-foreground backdrop-blur-md transition-all hover:bg-primary-foreground/20 hover:border-accent"
                    title="View LinkedIn Profile"
                  >
                    <Linkedin className="h-3.5 w-3.5 text-sky-400" />
                    <span>LinkedIn</span>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={personalInfo.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-shine inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3.5 py-1.5 text-xs font-semibold text-primary-foreground backdrop-blur-md transition-all hover:bg-primary-foreground/20 hover:border-accent"
                    title="Chat on WhatsApp"
                  >
                    <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>

                  {/* Email Direct */}
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="btn-shine inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3.5 py-1.5 text-xs font-semibold text-primary-foreground backdrop-blur-md transition-all hover:bg-primary-foreground/20 hover:border-accent"
                    title="Send Email"
                  >
                    <Mail className="h-3.5 w-3.5 text-teal-300" />
                    <span>Email</span>
                  </a>

                  {/* Phone Direct */}
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="btn-shine inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3.5 py-1.5 text-xs font-semibold text-primary-foreground backdrop-blur-md transition-all hover:bg-primary-foreground/20 hover:border-accent"
                    title="Call Sakib Sardar"
                  >
                    <Phone className="h-3.5 w-3.5 text-accent" />
                    <span>Call</span>
                  </a>
                </div>
              </Reveal>

              {/* Animated Quick-Contact Card (Dhaka, Bangladesh · Phone · Email) */}
              <Reveal delay={340}>
                <div className="pt-2">
                  <HeroContactCard />
                </div>
              </Reveal>
            </div>

            {/* Right Column: Hero Portrait with Animated Glow Auras */}
            <div className="flex justify-center lg:col-span-5">
              <Reveal delay={150}>
                <div className="group relative">
                  {/* Subtle animated neon border frame */}
                  <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-accent via-teal-400 to-primary opacity-70 blur-xl transition-all duration-700 group-hover:opacity-100 group-hover:blur-2xl" />

                  <div className="relative overflow-hidden rounded-[2.2rem] border-4 border-primary-foreground/30 bg-primary/30 shadow-2xl backdrop-blur-sm transition-all duration-500 group-hover:scale-[1.02]">
                    <img
                      src={portraitAsset.url}
                      alt="Sakib Sardar — Full-Stack Developer & Team Leader"
                      className="h-80 w-72 object-cover object-top transition-transform duration-700 group-hover:scale-105 sm:h-[28rem] sm:w-[24rem]"
                    />

                    {/* Floating Role Badge */}
                    <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-primary-foreground/20 bg-black/65 p-3.5 backdrop-blur-md">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent">
                          <Briefcase className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="font-sora text-xs font-bold text-primary-foreground">
                            ScaleUP Ads Agency
                          </p>
                          <p className="text-[11px] text-accent">
                            Senior Executive & Team Leader (Shopify & CMS)
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Floating Experience Badge (Top Right) */}
                    <div className="animate-float-soft absolute top-4 right-4 rounded-xl border border-primary-foreground/20 bg-black/60 px-3 py-1.5 backdrop-blur-md">
                      <p className="font-sora text-[10px] font-bold uppercase tracking-wider text-accent">
                        2+ Years Pro Dev
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MARQUEE STRIP (Smooth Webflow Ticker)
      ========================================================================== */}
      <section className="relative z-10 w-full overflow-hidden border-y border-border/80 bg-section-alt py-5">
        <div className="flex w-max items-center gap-8 animate-marquee">
          {[...marqueeItems, ...marqueeItems].map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-3 font-sora text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              <Sparkles className="h-3 w-3 text-accent" />
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          KEY METRICS SECTION (4 Glowing Cards, Quantified Track Record)
      ========================================================================== */}
      <section id="metrics" className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-14">
          <Reveal>
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-10 card-glow-emerald">
              <div className="mb-6 flex flex-col justify-between gap-2 border-b border-border/60 pb-5 sm:flex-row sm:items-center">
                <div>
                  <span className="font-sora text-xs font-bold uppercase tracking-widest text-accent">
                    Proven Delivery Metrics
                  </span>
                  <h2 className="mt-1 font-sora text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Engineering Quantified
                  </h2>
                </div>
                <span className="rounded-full bg-primary/10 px-4 py-1.5 font-sora text-xs font-bold text-primary w-fit">
                  2+ Years Track Record
                </span>
              </div>

              <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
                {keyMetrics.map((metric, i) => {
                  const Icon = metricIcons[i] || Clock;
                  return (
                    <div
                      key={metric.label}
                      className="flex flex-col justify-between rounded-2xl border border-border/60 bg-muted/20 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-muted/40"
                    >
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="font-sora text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                            {metric.value}
                          </span>
                          <span className="font-sora text-xs font-bold uppercase tracking-wider text-accent">
                            {metric.suffix}
                          </span>
                        </div>
                        <p className="mt-1 font-sora text-sm font-bold text-foreground">
                          {metric.label}
                        </p>
                        <p className="text-xs text-muted-foreground">{metric.subtext}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================================
          ABOUT & ENGINEERING PHILOSOPHY SECTION (#about)
      ========================================================================== */}
      <section id="about" className="py-20 sm:py-24 bg-section-alt border-t border-border/80">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-14">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Narrative */}
            <div className="space-y-5 lg:col-span-6">
              <Reveal>
                <span className="font-sora text-xs font-bold uppercase tracking-widest text-accent">
                  About Sakib Sardar
                </span>
                <h2 className="mt-2 font-sora text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  Engineering Software That Drives Measurable Growth
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {personalInfo.extendedBio}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  My approach fuses foundational Computer Science principles with agile commercial
                  urgency. Whether configuring scalable relational databases or fine-tuning Shopify
                  checkout flows, every deliverable is built for extreme reliability and speed.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-3">
                  <Link
                    to="/about"
                    className="btn-shine inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-sora text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90"
                  >
                    <span>Read Full Story & Bio</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <button
                    onClick={() => setResumeOpen(true)}
                    className="btn-shine inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 font-sora text-xs font-bold uppercase tracking-wider text-foreground hover:border-accent hover:text-accent"
                  >
                    <Download className="h-3.5 w-3.5 text-accent" />
                    <span>Download CV</span>
                  </button>
                </div>
              </Reveal>
            </div>

            {/* Right Pillars Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
              <Reveal delay={60}>
                <div className="h-full rounded-2xl border border-border/80 bg-card p-6 shadow-sm card-glow-emerald">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500">
                    <Database className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-sora text-base font-bold text-foreground">
                    Architecture First
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Designing normalized database schemas, clean Django REST APIs, and modular React
                    state trees that resist technical debt.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div className="h-full rounded-2xl border border-border/80 bg-card p-6 shadow-sm card-glow-sky">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 text-sky-500">
                    <Zap className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-sora text-base font-bold text-foreground">
                    Sub-Second Performance
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Optimizing critical rendering paths, tree-shaking assets, and tuning server
                    queries to achieve 90+ Lighthouse ratings.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={180}>
                <div className="h-full rounded-2xl border border-border/80 bg-card p-6 shadow-sm card-glow-purple">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-500">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-sora text-base font-bold text-foreground">
                    High-Converting Commerce
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Bespoke Shopify Liquid storefronts, Ajax drawers, seamless upsells, and custom
                    apps designed to elevate conversion rates.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={240}>
                <div className="h-full rounded-2xl border border-border/80 bg-card p-6 shadow-sm card-glow-amber">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-500">
                    <Award className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-sora text-base font-bold text-foreground">
                    Team & Agile Leadership
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Guiding sprint roadmaps, reviewing pull requests, and standardizing Git
                    workflows for engineering teams.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SPECIALIZED SERVICES SECTION (#services — ALL 6 Services Restored!)
      ========================================================================== */}
      <section id="services" className="py-20 sm:py-28 border-t border-border/80">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-14">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <Reveal>
              <span className="font-sora text-xs font-bold uppercase tracking-widest text-accent">
                Core Offerings
              </span>
              <h2 className="mt-2 font-sora text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Specialized Services
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                Delivering complete end-to-end software solutions — from robust Python backends to
                high-speed storefronts and team management.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <Link
                to="/services"
                className="group inline-flex items-center gap-2 font-sora text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:text-accent"
              >
                <span>View Full Specifications</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          {/* Webflow Interactive Category Tabs */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Services (6)" },
              { id: "fullstack", label: "Web & Backend" },
              { id: "shopify", label: "Shopify & CMS" },
              { id: "team", label: "Speed & Leadership" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedServiceFilter(tab.id)}
                className={`rounded-full px-4 py-1.5 font-sora text-xs font-bold transition-all duration-200 ${
                  selectedServiceFilter === tab.id
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "border border-border/80 bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Services Grid (3 Featured Services for clean lightweight home layout) */}
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredServices.slice(0, 3).map((service, idx) => (
              <Reveal key={service.id} delay={idx * 60}>
                <div
                  className={`flex h-full flex-col justify-between rounded-3xl border border-border/80 bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 ${
                    service.color === "emerald"
                      ? "card-glow-emerald"
                      : service.color === "sky"
                        ? "card-glow-sky"
                        : service.color === "purple"
                          ? "card-glow-purple"
                          : "card-glow-amber"
                  }`}
                >
                  <div>
                    <span className="font-sora text-xs font-bold uppercase tracking-wider text-accent">
                      {service.tagline}
                    </span>
                    <h3 className="mt-2 font-sora text-2xl font-bold tracking-tight text-foreground">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>

                    {/* Key Deliverables */}
                    <div className="mt-6 border-t border-border/60 pt-5">
                      <p className="mb-2.5 font-sora text-xs font-bold uppercase tracking-wider text-foreground">
                        Key Deliverables:
                      </p>
                      <ul className="space-y-2">
                        {service.deliverables.slice(0, 3).map((del, dIdx) => (
                          <li
                            key={dIdx}
                            className="flex items-start gap-2 text-xs font-medium text-muted-foreground"
                          >
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="mt-6 border-t border-border/60 pt-4">
                      <p className="mb-2 font-sora text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Tech Stack:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {service.technologies.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-border/70 bg-muted/40 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-border/60 bg-muted/20 p-3.5">
                    <span className="font-sora text-[10px] font-bold uppercase tracking-wider text-accent">
                      Business Value:
                    </span>
                    <p className="mt-0.5 text-xs font-medium text-foreground">
                      {service.businessValue}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* View All Services Callout */}
          <div className="mt-12 flex justify-center">
            <Link
              to="/services"
              className="btn-shine inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-sora text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
            >
              <span>Explore All {services.length} Services in Detail</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TECHNICAL SKILLS MATRIX SECTION (#skills — Full Matrix Restored!)
      ========================================================================== */}
      <section id="skills" className="py-20 sm:py-28 bg-section-alt border-t border-border/80">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-14">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <Reveal>
              <span className="font-sora text-xs font-bold uppercase tracking-widest text-accent">
                Technical Toolset
              </span>
              <h2 className="mt-2 font-sora text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Skills & Proficiency Matrix
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                Battle-tested skills honed through 2+ years of production deployments, client
                storefronts, and enterprise web applications.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <Link
                to="/skills"
                className="group inline-flex items-center gap-2 font-sora text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:text-accent"
              >
                <span>Full Skills Matrix & Breakdown</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          {/* Webflow Skill Category Tabs */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedSkillCategory("all")}
              className={`rounded-full px-4 py-1.5 font-sora text-xs font-bold transition-all duration-200 ${
                selectedSkillCategory === "all"
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "border border-border/80 bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              All Categories
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedSkillCategory(cat.id)}
                className={`rounded-full px-4 py-1.5 font-sora text-xs font-bold transition-all duration-200 ${
                  selectedSkillCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "border border-border/80 bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Skills Grid (2 Core Categories shown on homepage for clean lightweight feel) */}
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {filteredSkillCategories.slice(0, 2).map((cat, catIdx) => (
              <Reveal key={cat.id} delay={catIdx * 80}>
                <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-8 card-glow-emerald">
                  <div className="mb-6 flex items-center justify-between border-b border-border/70 pb-4">
                    <div>
                      <span className="font-sora text-xs font-bold uppercase tracking-wider text-accent">
                        {cat.highlight}
                      </span>
                      <h3 className="font-sora text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                        {cat.name}
                      </h3>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 font-sora text-xs font-bold text-primary">
                      {cat.skills.length} Competencies
                    </span>
                  </div>

                  <div className="space-y-4">
                    {cat.skills.map((skill) => {
                      const levelPercent =
                        skill.level === "Expert" ? 95 : skill.level === "Advanced" ? 85 : 75;

                      return (
                        <div
                          key={skill.name}
                          className="group rounded-xl border border-border/50 bg-muted/20 p-3.5 transition-colors hover:bg-muted/40"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-sora text-sm font-bold text-foreground">
                              {skill.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <span
                                className={`rounded-full px-2.5 py-0.5 font-sora text-[10px] font-bold uppercase tracking-wider ${
                                  skill.level === "Expert"
                                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                                    : skill.level === "Advanced"
                                      ? "bg-sky-500/15 text-sky-600 dark:text-sky-400"
                                      : "bg-purple-500/15 text-purple-600 dark:text-purple-400"
                                }`}
                              >
                                {skill.level}
                              </span>
                              <span className="font-sora text-[11px] font-semibold text-muted-foreground">
                                {skill.experience}
                              </span>
                            </div>
                          </div>

                          {/* Animated Progress Meter */}
                          <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700"
                              style={{ width: `${levelPercent}%` }}
                            />
                          </div>

                          {skill.description && (
                            <p className="mt-2 text-xs text-muted-foreground">
                              {skill.description}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* View All Skills Callout */}
          <div className="mt-12 flex justify-center">
            <Link
              to="/skills"
              className="btn-shine inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-sora text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
            >
              <span>Explore Complete Technical Skills Directory</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED PROJECTS SECTION (#projects — All 6 Case Studies)
      ========================================================================== */}
      <section id="projects" className="py-20 sm:py-28 border-t border-border/80">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-14">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <Reveal>
              <span className="font-sora text-xs font-bold uppercase tracking-widest text-accent">
                Case Studies
              </span>
              <h2 className="mt-2 font-sora text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Featured Work & Applications
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                Real software platforms and commercial storefronts delivering tangible revenue and
                speed benchmarks.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 font-sora text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:text-accent"
              >
                <span>Browse All Case Studies</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          {/* Webflow Project Category Tabs */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {["All", "Full-Stack", "Shopify", "CMS", "SaaS"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedProjectCategory(cat)}
                className={`rounded-full px-4 py-1.5 font-sora text-xs font-bold transition-all duration-200 ${
                  selectedProjectCategory === cat
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "border border-border/80 bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid (3 Featured Projects shown on homepage for clean lightweight feel) */}
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.slice(0, 3).map((proj, idx) => (
              <Reveal key={proj.id} delay={idx * 60}>
                <div
                  className={`flex h-full flex-col justify-between rounded-3xl border border-border/80 bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 ${proj.cardGlow}`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-accent/15 px-3 py-1 font-sora text-[11px] font-bold uppercase tracking-wider text-accent">
                        {proj.badge}
                      </span>
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                        {proj.category}
                      </span>
                    </div>

                    <h3 className="mt-4 font-sora text-xl font-bold tracking-tight text-foreground">
                      {proj.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {proj.description}
                    </p>

                    {/* Challenge & Solution */}
                    <div className="mt-4 space-y-2 border-t border-border/60 pt-3">
                      <div>
                        <span className="font-sora text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          Challenge:
                        </span>
                        <p className="text-xs text-foreground/80">{proj.challenge}</p>
                      </div>
                      <div>
                        <span className="font-sora text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          Solution:
                        </span>
                        <p className="text-xs text-foreground/80">{proj.solution}</p>
                      </div>
                    </div>

                    {/* Impact Metric */}
                    <div className="mt-4 flex items-start gap-2 text-xs font-semibold text-emerald-500">
                      <TrendingUp className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{proj.impact}</span>
                    </div>

                    {/* Technologies */}
                    <div className="mt-5 border-t border-border/60 pt-4">
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-border/60 pt-4">
                    <Link
                      to="/projects"
                      className="group inline-flex items-center gap-1.5 font-sora text-xs font-bold uppercase tracking-wider text-primary hover:text-accent"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* View All Projects Callout */}
          <div className="mt-12 flex justify-center">
            <Link
              to="/projects"
              className="btn-shine inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-sora text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
            >
              <span>Explore All {projects.length} Case Studies & Apps</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CAREER & LEADERSHIP TIMELINE (#experience — All 3 Roles)
      ========================================================================== */}
      <section id="experience" className="py-20 sm:py-28 bg-section-alt border-t border-border/80">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-14">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <Reveal>
              <span className="font-sora text-xs font-bold uppercase tracking-widest text-accent">
                Career History
              </span>
              <h2 className="mt-2 font-sora text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Experience & Leadership Timeline
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                2+ years progressing from frontend implementation to full-stack architecture and
                agency team leadership.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <Link
                to="/experience"
                className="group inline-flex items-center gap-2 font-sora text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:text-accent"
              >
                <span>Detailed Experience Timeline</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 space-y-8">
            {experiences.slice(0, 2).map((exp, idx) => (
              <Reveal key={exp.id} delay={idx * 80}>
                <div
                  className={`rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-9 ${exp.cardClass}`}
                >
                  <div className="flex flex-col justify-between gap-3 border-b border-border/70 pb-5 sm:flex-row sm:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-3 py-1 font-sora text-xs font-bold uppercase tracking-wider ${
                            exp.badgeColor === "emerald"
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                              : exp.badgeColor === "sky"
                                ? "bg-sky-500/15 text-sky-600 dark:text-sky-400"
                                : "bg-purple-500/15 text-purple-600 dark:text-purple-400"
                          }`}
                        >
                          {exp.badge}
                        </span>
                        <span className="text-xs text-muted-foreground">({exp.type})</span>
                      </div>
                      <h3 className="mt-2 font-sora text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                        {exp.title}
                      </h3>
                      <p className="text-xs font-semibold text-accent">
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                    <span className="w-fit rounded-full bg-primary/10 px-3.5 py-1 font-sora text-xs font-bold text-primary">
                      {exp.period}
                    </span>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {exp.roleSummary}
                  </p>

                  <div className="mt-5 grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="mb-2 font-sora text-xs font-bold uppercase tracking-wider text-foreground">
                        Responsibilities:
                      </p>
                      <ul className="space-y-2">
                        {exp.highlights.map((h, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-muted-foreground"
                          >
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="mb-2 font-sora text-xs font-bold uppercase tracking-wider text-foreground">
                        Key Accomplishments:
                      </p>
                      <ul className="space-y-2">
                        {exp.achievements.map((ach, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400"
                          >
                            <TrendingUp className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-1.5 border-t border-border/60 pt-4">
                    {exp.techs.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* View Full Experience Callout */}
          <div className="mt-12 flex justify-center">
            <Link
              to="/experience"
              className="btn-shine inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-sora text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
            >
              <span>View Full Career & Leadership Timeline ({experiences.length} Roles)</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          EDUCATION & LANGUAGES SECTION (#education — ALL 3 DEGREES RESTORED!)
      ========================================================================== */}
      <section id="education" className="py-20 sm:py-28 border-t border-border/80">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-14">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <Reveal>
              <span className="font-sora text-xs font-bold uppercase tracking-widest text-accent">
                Academic & Linguistic Credentials
              </span>
              <h2 className="mt-2 font-sora text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Education, Certifications & Languages
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                Computer Science degrees, top 5% distinction diploma honors, industry
                certifications, and multilingual capability.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <Link
                to="/education"
                className="group inline-flex items-center gap-2 font-sora text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:text-accent"
              >
                <span>View Full Academic Matrix</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          {/* Academic Degrees (Top 2 Degrees shown on homepage) */}
          <div className="mt-12 space-y-6">
            {educationList.slice(0, 2).map((edu, idx) => (
              <Reveal key={edu.degree} delay={idx * 70}>
                <div
                  className={`rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-8 ${
                    idx === 0
                      ? "card-glow-emerald"
                      : idx === 1
                        ? "card-glow-sky"
                        : "card-glow-purple"
                  }`}
                >
                  <div className="flex flex-col justify-between gap-3 border-b border-border/70 pb-4 sm:flex-row sm:items-center">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <GraduationCap className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-3 py-0.5 font-sora text-[11px] font-bold uppercase tracking-wider ${
                              edu.statusType === "distinction"
                                ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                                : edu.statusType === "active"
                                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                                  : "bg-sky-500/15 text-sky-600 dark:text-sky-400"
                            }`}
                          >
                            {edu.status}
                          </span>
                          {edu.cgpa && (
                            <span className="rounded-full bg-accent/15 px-3 py-0.5 font-sora text-[11px] font-bold text-accent">
                              {edu.cgpa}
                            </span>
                          )}
                        </div>
                        <h3 className="mt-1 font-sora text-lg font-bold text-foreground sm:text-xl">
                          {edu.degree}
                        </h3>
                        <p className="text-xs font-semibold text-accent">
                          {edu.institution} · {edu.location}
                        </p>
                      </div>
                    </div>

                    <span className="w-fit rounded-full bg-primary/10 px-3.5 py-1 font-sora text-xs font-bold text-primary">
                      {edu.period}
                    </span>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {edu.description}
                  </p>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                      <span className="font-sora text-[11px] font-bold uppercase tracking-wider text-foreground">
                        Key Coursework & Competencies:
                      </span>
                      <ul className="mt-2 space-y-1">
                        {edu.coursework.map((c, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-xs text-muted-foreground"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                      <span className="font-sora text-[11px] font-bold uppercase tracking-wider text-foreground">
                        Academic Highlights:
                      </span>
                      <ul className="mt-2 space-y-1">
                        {edu.highlights.map((h, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-xs text-muted-foreground"
                          >
                            <Sparkles className="h-3.5 w-3.5 shrink-0 text-accent" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Certifications & Languages Snapshot */}
          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            {/* Certifications */}
            <div className="lg:col-span-6">
              <Reveal delay={100}>
                <div className="h-full rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-8 card-glow-emerald">
                  <div className="flex items-center gap-3 border-b border-border/70 pb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-sora text-lg font-bold text-foreground">
                        Professional Certifications
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Industry standards & verified credentials
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-4">
                    {certifications.slice(0, 2).map((cert) => (
                      <div
                        key={cert.title}
                        className="rounded-xl border border-border/60 bg-muted/20 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-sora text-sm font-bold text-foreground">
                            {cert.title}
                          </h4>
                          <span className="text-[11px] text-muted-foreground">{cert.date}</span>
                        </div>
                        <p className="text-xs font-semibold text-accent">{cert.issuer}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {cert.skills.map((s) => (
                            <span
                              key={s}
                              className="rounded bg-muted/60 px-2 py-0.5 text-[10px] text-muted-foreground"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Languages Matrix */}
            <div className="lg:col-span-6">
              <Reveal delay={160}>
                <div className="h-full rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-8 card-glow-sky">
                  <div className="flex items-center gap-3 border-b border-border/70 pb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 text-sky-500">
                      <Languages className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-sora text-lg font-bold text-foreground">
                        Linguistic Capabilities
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Global client communication & standup fluency
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-5">
                    {languages.map((lang) => (
                      <div
                        key={lang.name}
                        className="rounded-xl border border-border/60 bg-muted/20 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-sora text-sm font-bold text-foreground">
                            {lang.name}
                          </span>
                          <span className="font-sora text-xs font-bold text-accent">
                            {lang.proficiency}
                          </span>
                        </div>

                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                            style={{ width: `${lang.scorePercent}%` }}
                          />
                        </div>

                        <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                          <span>Reading: {lang.reading}</span>
                          <span>Writing: {lang.writing}</span>
                          <span>Speaking: {lang.speaking}</span>
                        </div>
                        <p className="mt-2 text-[11px] text-muted-foreground italic">
                          {lang.useCase}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CONTACT & LET'S BUILD SECTION (#contact — Interactive Form & Direct Channels)
      ========================================================================== */}
      <section id="contact" className="py-20 sm:py-28 bg-hero-gradient text-primary-foreground">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-14">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Narrative */}
            <div className="space-y-5 lg:col-span-5">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                  <Sparkles className="h-4 w-4 text-accent" />
                  Available for High-Impact Projects
                </div>
                <h2 className="mt-2 font-sora text-3xl font-extrabold tracking-tight sm:text-5xl">
                  Let's Discuss Your Next Initiative
                </h2>
                <p className="text-base leading-relaxed text-primary-foreground/85">
                  Have a challenging software roadmap or an e-commerce platform that needs to scale?
                  Send a message or reach out on WhatsApp directly.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-accent shrink-0" />
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="font-sora text-sm font-bold text-primary-foreground hover:text-accent hover:underline"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-sky-400 shrink-0" />
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="font-sora text-sm font-bold text-primary-foreground hover:text-accent hover:underline"
                    >
                      {personalInfo.phoneDisplay}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-emerald-400 shrink-0" />
                    <a
                      href={personalInfo.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-sora text-sm font-bold text-emerald-400 hover:underline"
                    >
                      Chat on WhatsApp (+880 1572 710013)
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <button
                    onClick={() => setResumeOpen(true)}
                    className="btn-shine inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-5 py-3 font-sora text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary-foreground/20 hover:border-accent"
                  >
                    <Download className="h-4 w-4 text-accent" />
                    <span>Download Full Resume</span>
                  </button>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 font-sora text-xs font-bold uppercase tracking-wider text-accent hover:underline"
                  >
                    <span>Open Dedicated Contact Page</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7">
              <Reveal delay={100}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Interactive Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
