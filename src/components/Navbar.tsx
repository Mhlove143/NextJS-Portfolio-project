import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Menu,
  X,
  FileText,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { ResumeModal } from "@/components/ResumeModal";
import { navLinks } from "@/data/portfolio";
import { usePortfolio } from "@/context/PortfolioContext";

export function Navbar() {
  const { personalInfo } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Close mobile drawer and scroll to top on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentPath]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur-2xl transition-all duration-300">
        <nav className="mx-auto flex w-full max-w-[1500px] items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
          {/* Brand Logo with Live Status Dot */}
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-2.5 font-sora text-xl font-extrabold tracking-tight text-foreground transition-transform duration-300 hover:scale-105"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-sm font-black text-primary-foreground shadow-md shadow-accent/25">
              S
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
              </span>
            </div>
            <span>
              Sakib<span className="text-accent">.</span>dev
            </span>
          </Link>

          {/* Desktop Navigation Bar: Direct links to each separate page */}
          <ul className="hidden items-center gap-1 rounded-full border border-border/80 bg-muted/40 p-1.5 backdrop-blur-md lg:flex xl:gap-1.5">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? currentPath === "/"
                  : currentPath === link.href || currentPath.startsWith(`${link.href}/`);

              return (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={`rounded-full px-2.5 py-1.5 font-sora text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 xl:px-3.5 xl:py-2 xl:text-xs ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30 font-bold"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Action CTAs: Resume & Hire Me */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            {/* Admin CMS Button */}
            <Link
              to="/admin"
              className="btn-shine inline-flex items-center gap-1 rounded-full border border-border/80 bg-card px-2.5 py-1.5 text-xs font-semibold text-muted-foreground hover:border-accent hover:text-accent transition-all sm:px-3 sm:py-2"
              title="Open Admin CMS Dashboard to add/edit/delete content & CV"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-accent" />
              <span className="hidden sm:inline">Admin</span>
            </Link>

            {/* Resume Button */}
            <button
              onClick={() => setResumeOpen(true)}
              className="btn-shine inline-flex items-center gap-1.5 rounded-full border border-border/90 bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm transition-all hover:border-accent hover:text-accent sm:px-3.5 sm:py-2"
              title="View and Download Resume"
            >
              <FileText className="h-3.5 w-3.5 text-accent" />
              <span className="hidden md:inline">Resume</span>
            </button>

            {/* WhatsApp Direct */}
            <a
              href={personalInfo.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-shine hidden items-center gap-1.5 rounded-full border border-border/80 bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm transition-all hover:border-accent/50 xl:inline-flex"
            >
              <MessageSquare className="h-3.5 w-3.5 text-accent" />
              <span>WhatsApp</span>
            </a>

            {/* Hire Me CTA (links directly to /contact) */}
            <Link
              to="/contact"
              className="btn-shine group inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/40 active:scale-95 sm:px-4 sm:py-2"
            >
              <span>Hire Me</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/80 text-foreground transition-colors hover:bg-muted lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-border/80 bg-background/95 px-5 py-5 backdrop-blur-2xl lg:hidden animate-in slide-in-from-top-3 duration-200">
            <div className="flex flex-col space-y-1.5">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? currentPath === "/"
                    : currentPath === link.href || currentPath.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 font-sora text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <CheckCircle2 className="h-4 w-4 text-accent" />}
                  </Link>
                );
              })}

              <div className="border-t border-border/70 pt-4 flex flex-col gap-2">
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-accent/40 bg-accent/10 py-2.5 font-sora text-xs font-bold uppercase tracking-wider text-accent"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Admin CMS Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setResumeOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card py-2.5 font-sora text-xs font-bold uppercase tracking-wider text-foreground"
                >
                  <FileText className="h-4 w-4 text-accent" />
                  <span>Download Curriculum Vitae (PDF)</span>
                </button>
                <a
                  href={personalInfo.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card py-2.5 font-sora text-xs font-bold uppercase tracking-wider text-foreground"
                >
                  <MessageSquare className="h-4 w-4 text-accent" />
                  <span>Direct WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
