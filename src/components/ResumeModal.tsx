import { useState } from "react";
import {
  X,
  Download,
  Share2,
  Check,
  Printer,
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  GraduationCap,
  Sparkles,
  FileCheck,
} from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);
  const { personalInfo, experiences, educationList, skillCategories } = usePortfolio();

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.origin);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  const handleDownloadPdf = () => {
    // If a custom uploaded CV data URI exists, download it directly
    if (personalInfo.customCvDataUri) {
      const link = document.createElement("a");
      link.href = personalInfo.customCvDataUri;
      link.download = personalInfo.customCvFileName || "Sakib_Sardar_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // If a custom CV external URL exists
    if (personalInfo.cvUrl && personalInfo.cvUrl.startsWith("http")) {
      window.open(personalInfo.cvUrl, "_blank");
      return;
    }

    // Otherwise print to PDF
    window.print();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-md sm:p-6">
      <div
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col rounded-3xl border border-border/90 bg-card text-card-foreground shadow-2xl transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border/80 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <GraduationCap className="h-5 w-5" />
            </span>
            <div>
              <h2 id="resume-modal-title" className="font-sora text-base font-bold text-foreground">
                {personalInfo.name} — Curriculum Vitae
              </h2>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <span>{personalInfo.title}</span>
                {personalInfo.customCvFileName && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.2 text-[10px] font-bold text-emerald-500">
                    <FileCheck className="h-3 w-3" />
                    Custom CV
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              className="btn-shine inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90"
              title="Download CV (PDF)"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:border-accent hover:text-accent"
              title="Share portfolio link"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-emerald-500">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div className="printable-resume overflow-y-auto p-6 sm:p-10">
          {/* Resume Top Header */}
          <div className="border-b border-border/80 pb-6 text-center sm:text-left">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-0.5 font-sora text-xs font-bold uppercase tracking-widest text-accent">
                  <Sparkles className="h-3 w-3" />
                  Curriculum Vitae
                </span>
                <h1 className="mt-2 font-sora text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                  {personalInfo.name}
                </h1>
                <p className="mt-1 font-sora text-base font-bold text-accent">
                  {personalInfo.title}
                </p>
              </div>

              <div className="flex flex-col gap-1 text-xs text-muted-foreground sm:text-right">
                <span className="flex items-center justify-center gap-1.5 sm:justify-end">
                  <MapPin className="h-3.5 w-3.5 text-accent" />
                  {personalInfo.location}
                </span>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center justify-center gap-1.5 hover:text-accent sm:justify-end"
                >
                  <Phone className="h-3.5 w-3.5 text-accent" />
                  {personalInfo.phoneDisplay}
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center justify-center gap-1.5 hover:text-accent sm:justify-end"
                >
                  <Mail className="h-3.5 w-3.5 text-accent" />
                  {personalInfo.email}
                </a>
                <span className="flex items-center justify-center gap-1.5 text-emerald-500 font-semibold sm:justify-end">
                  <Globe className="h-3.5 w-3.5" />
                  {personalInfo.availability}
                </span>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {personalInfo.extendedBio}
            </p>
          </div>

          {/* Professional Experience */}
          <div className="mt-8">
            <h3 className="flex items-center gap-2 font-sora text-base font-bold uppercase tracking-wider text-foreground">
              <Briefcase className="h-4 w-4 text-accent" />
              Professional Experience
            </h3>
            <div className="mt-4 space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="rounded-2xl border border-border/80 bg-muted/20 p-5">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                    <div>
                      <h4 className="font-sora text-base font-bold text-foreground">{exp.title}</h4>
                      <p className="text-xs font-semibold text-accent">
                        {exp.company} · {exp.location} ({exp.type})
                      </p>
                    </div>
                    <span className="w-fit rounded-full bg-primary/10 px-3 py-1 font-sora text-xs font-bold text-primary">
                      {exp.period}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {exp.roleSummary}
                  </p>

                  <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                    {exp.highlights.slice(0, 3).map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 flex flex-wrap gap-1.5 pt-2">
                    {exp.techs.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border/70 bg-card px-2 py-0.5 text-[11px] font-semibold text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Academic Credentials */}
          <div className="mt-8">
            <h3 className="flex items-center gap-2 font-sora text-base font-bold uppercase tracking-wider text-foreground">
              <GraduationCap className="h-4 w-4 text-accent" />
              Education & Academic Credentials
            </h3>
            <div className="mt-4 space-y-4">
              {educationList.map((edu, idx) => (
                <div key={idx} className="rounded-2xl border border-border/80 bg-muted/20 p-5">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                    <div>
                      <h4 className="font-sora text-sm font-bold text-foreground">{edu.degree}</h4>
                      <p className="text-xs font-semibold text-muted-foreground">
                        {edu.institution} · {edu.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-accent/15 px-2.5 py-0.5 font-sora text-xs font-bold text-accent">
                        {edu.detail}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Technical Matrix */}
          <div className="mt-8">
            <h3 className="font-sora text-base font-bold uppercase tracking-wider text-foreground">
              Core Technical Competencies
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="rounded-2xl border border-border/80 bg-muted/20 p-4">
                  <h5 className="font-sora text-xs font-bold uppercase tracking-wider text-accent">
                    {cat.name}
                  </h5>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {cat.skills.map((s) => s.name).join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between border-t border-border/80 px-6 py-4 bg-card/60 rounded-b-3xl">
          <p className="text-xs text-muted-foreground hidden sm:block">
            Designed for sub-second performance & clean delivery.
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={handlePrint}
              className="btn-shine inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-muted"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
