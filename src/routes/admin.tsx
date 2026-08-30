import { useState, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  User,
  FileText,
  Briefcase,
  Layers,
  Code2,
  FolderKanban,
  GraduationCap,
  Plus,
  Trash2,
  Edit,
  Upload,
  Download,
  RotateCcw,
  ExternalLink,
  Save,
  CheckCircle2,
  X,
  FileCheck,
  Building,
  MapPin,
  Mail,
  Phone,
  Globe,
  Award,
  Search,
  Sparkles,
  ShieldCheck,
  Lock,
  LogOut,
  Eye,
  EyeOff,
  MessageSquarePlus,
} from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { toast } from "sonner";
import {
  type Service,
  type Experience,
  type Project,
  type SkillItem,
  type EducationItem,
  type CertificationItem,
  type LanguageItem,
} from "@/data/portfolio";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Portfolio Admin CMS — Dynamic Data Management" },
      { name: "description", content: "Manage and update portfolio content, CV, and credentials." },
    ],
  }),
  component: AdminPage,
});

type TabType =
  | "profile"
  | "cv"
  | "topics"
  | "experience"
  | "skills"
  | "projects"
  | "services"
  | "education";

const ADMIN_STORAGE_AUTH_KEY = "sakib_portfolio_admin_auth_v1";

function AdminPage() {
  const {
    personalInfo,
    updatePersonalInfo,
    uploadCustomCv,
    removeCustomCv,
    services,
    addService,
    updateService,
    deleteService,
    skillCategories,
    addSkillToCategory,
    updateSkillInCategory,
    deleteSkillFromCategory,
    addSkillCategory,
    deleteSkillCategory,
    experiences,
    addExperience,
    updateExperience,
    deleteExperience,
    projects,
    addProject,
    updateProject,
    deleteProject,
    educationList,
    addEducation,
    updateEducation,
    deleteEducation,
    certifications,
    addCertification,
    deleteCertification,
    languages,
    addLanguage,
    deleteLanguage,
    contactTopics,
    addContactTopic,
    removeContactTopic,
    resetToDefaults,
    exportDataJson,
    importDataJson,
  } = usePortfolio();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_STORAGE_AUTH_KEY) === "true";
    } catch {
      return false;
    }
  });
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [searchQuery, setSearchQuery] = useState("");
  const [newTopicInput, setNewTopicInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const jsonImportRef = useRef<HTMLInputElement | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = loginIdentifier.trim();
    const cleanPass = loginPassword;

    // Allowed credentials: mhlove143 or email and $@kib$@rdar
    if (
      (cleanId === "mhlove143" ||
        cleanId.toLowerCase() === "mhlove143" ||
        cleanId.toLowerCase() === "sakibsardar.official@gmail.com") &&
      cleanPass === "$@kib$@rdar"
    ) {
      setIsAuthenticated(true);
      setAuthError("");
      try {
        localStorage.setItem(ADMIN_STORAGE_AUTH_KEY, "true");
      } catch {
        // ignore
      }
      toast.success("Welcome back, Sakib Sardar!");
    } else {
      setAuthError("Invalid username or password. Please verify your credentials.");
      toast.error("Authentication failed. Invalid username or password.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(ADMIN_STORAGE_AUTH_KEY);
    } catch {
      // ignore
    }
    toast.info("You have been signed out from Admin CMS.");
  };

  // Profile Form State
  const [profileForm, setProfileForm] = useState(personalInfo);

  // Sync profile form if personalInfo changes
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo(profileForm);
    toast.success("Profile information updated successfully!");
  };

  // CV File Upload Handler
  const handleCvFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit. Please upload a compressed PDF.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      uploadCustomCv(result, file.name);
      toast.success(`Successfully uploaded CV: ${file.name}`);
    };
    reader.onerror = () => {
      toast.error("Error reading uploaded file.");
    };
    reader.readAsDataURL(file);
  };

  // Modals for CRUD
  const [serviceModal, setServiceModal] = useState<{
    isOpen: boolean;
    isEdit: boolean;
    id?: string;
    data: Partial<Service>;
  }>({
    isOpen: false,
    isEdit: false,
    data: {
      title: "",
      tagline: "",
      description: "",
      color: "emerald",
      deliverables: [],
      technologies: [],
      businessValue: "",
    },
  });

  const [expModal, setExpModal] = useState<{
    isOpen: boolean;
    isEdit: boolean;
    id?: string;
    data: Partial<Experience>;
  }>({
    isOpen: false,
    isEdit: false,
    data: {
      title: "",
      company: "",
      period: "",
      location: "",
      type: "Full-Time",
      roleSummary: "",
      highlights: [],
      techs: [],
      badge: "ScaleUP Ads",
      badgeColor: "emerald",
    },
  });

  const [projModal, setProjModal] = useState<{
    isOpen: boolean;
    isEdit: boolean;
    id?: string;
    data: Partial<Project>;
  }>({
    isOpen: false,
    isEdit: false,
    data: {
      title: "",
      category: "Full-Stack",
      description: "",
      challenge: "",
      solution: "",
      impact: "",
      metrics: [],
      tech: [],
      badge: "Production SaaS",
    },
  });

  const [skillModal, setSkillModal] = useState<{
    isOpen: boolean;
    categoryId: string;
    skillName?: string;
    isEdit: boolean;
    data: Partial<SkillItem>;
  }>({
    isOpen: false,
    categoryId: skillCategories[0]?.id || "",
    isEdit: false,
    data: {
      name: "",
      level: "Advanced",
      experience: "2+ Years",
      description: "",
    },
  });

  const [eduModal, setEduModal] = useState<{
    isOpen: boolean;
    index?: number;
    isEdit: boolean;
    data: Partial<EducationItem>;
  }>({
    isOpen: false,
    isEdit: false,
    data: {
      degree: "",
      institution: "",
      location: "",
      period: "",
      detail: "",
      status: "In Progress",
      description: "",
      highlights: [],
      coursework: [],
    },
  });

  const [certModal, setCertModal] = useState<{
    isOpen: boolean;
    data: Partial<CertificationItem>;
  }>({
    isOpen: false,
    data: { title: "", issuer: "", date: "", skills: [] },
  });

  const [langModal, setLangModal] = useState<{
    isOpen: boolean;
    data: Partial<LanguageItem>;
  }>({
    isOpen: false,
    data: {
      name: "",
      proficiency: "Fluent",
      scorePercent: 90,
      reading: "Native",
      writing: "Professional",
      speaking: "Fluent",
      useCase: "",
    },
  });

  // Export JSON handler
  const handleExport = () => {
    const jsonStr = exportDataJson();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sakib_portfolio_backup_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Backup downloaded successfully!");
  };

  // Import JSON handler
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      const success = importDataJson(content);
      if (success) {
        toast.success("Backup imported and applied successfully!");
      } else {
        toast.error("Invalid backup JSON file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* AUTHENTICATION GATE */}
      {!isAuthenticated ? (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
          <div className="w-full max-w-md rounded-3xl border border-border/80 bg-card p-8 shadow-2xl backdrop-blur-xl">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-accent/25">
                <Lock className="h-7 w-7" />
              </div>
              <h1 className="mt-5 font-sora text-2xl font-black tracking-tight text-foreground">
                Admin Authentication
              </h1>
              <p className="mt-2 text-xs text-muted-foreground">
                Enter your Sakib Sardar portfolio administrator credentials to access the dynamic CMS dashboard.
              </p>
            </div>

            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              {authError && (
                <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs font-semibold text-destructive">
                  {authError}
                </div>
              )}

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Username or Email
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={loginIdentifier}
                  onChange={(e) => {
                    setLoginIdentifier(e.target.value);
                    setAuthError("");
                  }}
                  placeholder="mhlove143"
                  className="mt-1.5 w-full rounded-xl border border-border/80 bg-muted/30 px-4 py-2.5 text-sm font-medium text-foreground focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] font-medium text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="relative mt-1.5">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      setAuthError("");
                    }}
                    placeholder="••••••••••••"
                    className="w-full rounded-xl border border-border/80 bg-muted/30 px-4 py-2.5 pr-10 text-sm font-medium text-foreground focus:border-accent focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn-shine mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-sora text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-[0.98]"
              >
                <Lock className="h-4 w-4" />
                <span>Unlock CMS Dashboard</span>
              </button>

              <div className="pt-2 text-center">
                <Link
                  to="/"
                  className="text-xs font-semibold text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  ← Return to Public Portfolio
                </Link>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <>
          {/* Top Admin Header */}
          <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-xl">
            <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-8">
              <div className="flex items-center gap-3">
                <Link
                  to="/"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-sm font-black text-primary-foreground shadow-sm shadow-accent/25"
                >
                  S
                </Link>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="font-sora text-base font-extrabold tracking-tight sm:text-lg">
                      Portfolio CMS & Admin
                    </h1>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-500">
                      <ShieldCheck className="h-3 w-3" />
                      Live Sync
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    Update experience, CV, skills, education, contact topics, and services in real-time.
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
                  title="View Public Portfolio"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Live Site</span>
                </Link>

                <button
                  onClick={handleExport}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-accent"
                  title="Download Data Backup"
                >
                  <Download className="h-3.5 w-3.5 text-accent" />
                  <span className="hidden sm:inline">Export</span>
                </button>

                <button
                  onClick={() => jsonImportRef.current?.click()}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-accent"
                  title="Import JSON Backup"
                >
                  <Upload className="h-3.5 w-3.5 text-accent" />
                  <span className="hidden sm:inline">Import</span>
                </button>
                <input
                  type="file"
                  ref={jsonImportRef}
                  onChange={handleImport}
                  accept=".json"
                  className="hidden"
                />

                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to reset all data to default values?")) {
                      resetToDefaults();
                      toast.success("Reset all portfolio data to default!");
                    }
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-500 transition-colors hover:bg-rose-500/20"
                  title="Reset everything to factory defaults"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Reset Defaults</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
                  title="Sign out of Admin CMS"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Log Out</span>
                </button>
              </div>
            </div>

            {/* Tab Navigation Pill Bar */}
            <div className="mx-auto max-w-[1500px] overflow-x-auto px-4 pb-2 sm:px-8">
              <div className="flex items-center gap-1.5 py-1">
                {[
                  { id: "profile", label: "Profile & Info", icon: User },
                  { id: "cv", label: "Curriculum Vitae", icon: FileText },
                  {
                    id: "topics",
                    label: `Contact Topics (${contactTopics?.length || 0})`,
                    icon: MessageSquarePlus,
                  },
                  { id: "experience", label: `Experience (${experiences.length})`, icon: Briefcase },
                  {
                    id: "skills",
                    label: `Skills (${skillCategories.reduce((acc, c) => acc + c.skills.length, 0)})`,
                    icon: Code2,
                  },
                  { id: "projects", label: `Projects (${projects.length})`, icon: FolderKanban },
                  { id: "services", label: `Services (${services.length})`, icon: Layers },
                  {
                    id: "education",
                    label: `Education (${educationList.length})`,
                    icon: GraduationCap,
                  },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 font-sora text-xs font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30 font-bold"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </header>

      {/* Main Admin Content */}
      <main className="mx-auto max-w-[1500px] px-4 py-8 sm:px-8">
        {/* TAB 1: PROFILE & PERSONAL INFO */}
        {activeTab === "profile" && (
          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center justify-between border-b border-border/70 pb-4">
              <div>
                <h2 className="font-sora text-xl font-bold tracking-tight text-foreground">
                  Personal Information & Contact
                </h2>
                <p className="text-xs text-muted-foreground">
                  Update your identity, hero headlines, bio, location, and social links.
                </p>
              </div>
              <button
                onClick={handleProfileSave}
                className="btn-shine inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 font-sora text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md hover:bg-primary/90"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save Changes</span>
              </button>
            </div>

            <form onSubmit={handleProfileSave} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-border/80 bg-muted/30 px-3.5 py-2.5 text-sm font-medium text-foreground focus:border-accent focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Short / Display Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.shortName}
                    onChange={(e) => setProfileForm({ ...profileForm, shortName: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-border/80 bg-muted/30 px-3.5 py-2.5 text-sm font-medium text-foreground focus:border-accent focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Primary Professional Title
                  </label>
                  <input
                    type="text"
                    value={profileForm.title}
                    onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-border/80 bg-muted/30 px-3.5 py-2.5 text-sm font-medium text-foreground focus:border-accent focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-border/80 bg-muted/30 px-3.5 py-2.5 text-sm font-medium text-foreground focus:border-accent focus:outline-none"
                    placeholder="e.g. Dhaka, Bangladesh"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Primary Email
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-border/80 bg-muted/30 px-3.5 py-2.5 text-sm font-medium text-foreground focus:border-accent focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Phone / Display Number
                  </label>
                  <input
                    type="text"
                    value={profileForm.phoneDisplay}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        phone: e.target.value,
                        phoneDisplay: e.target.value,
                      })
                    }
                    className="mt-1.5 w-full rounded-xl border border-border/80 bg-muted/30 px-3.5 py-2.5 text-sm font-medium text-foreground focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    WhatsApp Chat URL
                  </label>
                  <input
                    type="url"
                    value={profileForm.whatsappUrl}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, whatsappUrl: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-xl border border-border/80 bg-muted/30 px-3.5 py-2.5 text-sm font-medium text-foreground focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={profileForm.github}
                    onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-border/80 bg-muted/30 px-3.5 py-2.5 text-sm font-medium text-foreground focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={profileForm.linkedin}
                    onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-border/80 bg-muted/30 px-3.5 py-2.5 text-sm font-medium text-foreground focus:border-accent focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Availability Status (Hero Tag)
                  </label>
                  <input
                    type="text"
                    value={profileForm.availability}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, availability: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-xl border border-border/80 bg-muted/30 px-3.5 py-2.5 text-sm font-medium text-foreground focus:border-accent focus:outline-none"
                    placeholder="e.g. Available for Full-Time Roles & High-Impact Contracts"
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Primary Bio (Hero & Overview)
                  </label>
                  <textarea
                    rows={3}
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-border/80 bg-muted/30 p-3.5 text-sm leading-relaxed text-foreground focus:border-accent focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Extended Professional Bio (About Page & CV Summary)
                  </label>
                  <textarea
                    rows={4}
                    value={profileForm.extendedBio}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, extendedBio: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-xl border border-border/80 bg-muted/30 p-3.5 text-sm leading-relaxed text-foreground focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: CURRICULUM VITAE (CV) */}
        {activeTab === "cv" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-border/70 pb-4">
                <div>
                  <h2 className="font-sora text-xl font-bold tracking-tight text-foreground">
                    Curriculum Vitae (Resume) Upload & Management
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Upload your updated PDF resume so employers and clients can download it directly
                    from any page.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-shine inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 font-sora text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md hover:bg-primary/90"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>Upload New PDF</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleCvFileUpload}
                    accept=".pdf"
                    className="hidden"
                  />
                </div>
              </div>

              {/* Status Card */}
              <div className="mt-6 rounded-2xl border border-border/70 bg-muted/20 p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-sora text-sm font-bold text-foreground">
                          {personalInfo.customCvFileName || "Sakib_Sardar_Curriculum_Vitae.pdf"}
                        </h4>
                        {personalInfo.customCvDataUri && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-500">
                            <CheckCircle2 className="h-3 w-3" />
                            Custom File Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {personalInfo.customCvDataUri
                          ? "Custom uploaded document stored safely in client data store."
                          : "Using standard portfolio resume generator."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {personalInfo.customCvDataUri && (
                      <button
                        onClick={() => {
                          const a = document.createElement("a");
                          a.href = personalInfo.customCvDataUri!;
                          a.download = personalInfo.customCvFileName || "Sakib_Sardar_Resume.pdf";
                          a.click();
                        }}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground hover:border-accent"
                      >
                        <Download className="h-3.5 w-3.5 text-accent" />
                        <span>Test Download</span>
                      </button>
                    )}

                    {personalInfo.customCvDataUri && (
                      <button
                        onClick={() => {
                          if (window.confirm("Remove custom uploaded CV file?")) {
                            removeCustomCv();
                            toast.success("Custom CV file removed.");
                          }
                        }}
                        className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-500 hover:bg-rose-500/20"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Remove File</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* External CV Link */}
              <div className="mt-6">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Or Direct Cloud / Google Drive CV URL (Optional)
                </label>
                <div className="mt-1.5 flex gap-2">
                  <input
                    type="url"
                    value={personalInfo.cvUrl || ""}
                    onChange={(e) => updatePersonalInfo({ cvUrl: e.target.value })}
                    className="w-full rounded-xl border border-border/80 bg-muted/30 px-3.5 py-2.5 text-sm font-medium text-foreground focus:border-accent focus:outline-none"
                    placeholder="https://drive.google.com/your-resume.pdf"
                  />
                  <button
                    onClick={() => toast.success("CV link updated!")}
                    className="rounded-xl bg-muted px-4 py-2 text-xs font-bold text-foreground hover:bg-muted/80"
                  >
                    Save Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROFESSIONAL EXPERIENCE */}
        {activeTab === "experience" && (
          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-border/70 pb-4">
              <div>
                <h2 className="font-sora text-xl font-bold tracking-tight text-foreground">
                  Work Experience & Leadership
                </h2>
                <p className="text-xs text-muted-foreground">
                  Add, update, or remove professional career timeline items.
                </p>
              </div>

              <button
                onClick={() =>
                  setExpModal({
                    isOpen: true,
                    isEdit: false,
                    data: {
                      title: "",
                      company: "",
                      period: "2024 — Present",
                      location: "Dhaka, Bangladesh",
                      type: "Full-Time",
                      roleSummary: "",
                      highlights: [""],
                      techs: ["React", "Django"],
                      badge: "ScaleUP Ads",
                      badgeColor: "emerald",
                    },
                  })
                }
                className="btn-shine inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 font-sora text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md hover:bg-primary/90"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Experience</span>
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="flex flex-col justify-between gap-4 rounded-2xl border border-border/80 bg-muted/20 p-5 sm:flex-row sm:items-start"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-sora text-base font-bold text-foreground">{exp.title}</h3>
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-sora text-xs font-bold text-primary">
                        {exp.period}
                      </span>
                      <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                        {exp.type}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-accent">
                      {exp.company} · {exp.location}
                    </p>

                    <p className="text-xs text-muted-foreground max-w-3xl leading-relaxed">
                      {exp.roleSummary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.techs.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-border/60 bg-card px-2 py-0.5 text-[11px] font-semibold text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() =>
                        setExpModal({
                          isOpen: true,
                          isEdit: true,
                          id: exp.id,
                          data: { ...exp },
                        })
                      }
                      className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:border-accent hover:text-accent"
                    >
                      <Edit className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Delete experience "${exp.title}"?`)) {
                          deleteExperience(exp.id);
                          toast.success("Experience removed.");
                        }
                      }}
                      className="inline-flex items-center gap-1 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-500 hover:bg-rose-500/20"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TECHNICAL SKILLS */}
        {activeTab === "skills" && (
          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-border/70 pb-4">
              <div>
                <h2 className="font-sora text-xl font-bold tracking-tight text-foreground">
                  Technical Skills & Competency Matrix
                </h2>
                <p className="text-xs text-muted-foreground">
                  Add, update, or remove individual technical skills or skill categories.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setSkillModal({
                      isOpen: true,
                      categoryId: skillCategories[0]?.id || "",
                      isEdit: false,
                      data: {
                        name: "",
                        level: "Expert",
                        experience: "2+ Years",
                        description: "",
                      },
                    })
                  }
                  className="btn-shine inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 font-sora text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md hover:bg-primary/90"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Skill</span>
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-8">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="rounded-2xl border border-border/80 bg-muted/10 p-5">
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <div>
                      <span className="font-sora text-xs font-bold uppercase tracking-wider text-accent">
                        {cat.highlight}
                      </span>
                      <h3 className="font-sora text-lg font-bold text-foreground">{cat.name}</h3>
                    </div>
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                      {cat.skills.length} Skills
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center justify-between rounded-xl border border-border/60 bg-card p-3 shadow-sm"
                      >
                        <div>
                          <p className="font-sora text-xs font-bold text-foreground">
                            {skill.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span
                              className={`rounded-full px-2 py-0.2 text-[10px] font-bold ${
                                skill.level === "Expert"
                                  ? "bg-emerald-500/15 text-emerald-500"
                                  : skill.level === "Advanced"
                                    ? "bg-sky-500/15 text-sky-500"
                                    : "bg-purple-500/15 text-purple-500"
                              }`}
                            >
                              {skill.level}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              {skill.experience}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              setSkillModal({
                                isOpen: true,
                                categoryId: cat.id,
                                skillName: skill.name,
                                isEdit: true,
                                data: { ...skill },
                              })
                            }
                            className="p-1 text-muted-foreground hover:text-accent"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete skill "${skill.name}"?`)) {
                                deleteSkillFromCategory(cat.id, skill.name);
                                toast.success("Skill deleted.");
                              }
                            }}
                            className="p-1 text-muted-foreground hover:text-rose-500"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PROJECTS */}
        {activeTab === "projects" && (
          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-border/70 pb-4">
              <div>
                <h2 className="font-sora text-xl font-bold tracking-tight text-foreground">
                  Case Studies & Featured Projects
                </h2>
                <p className="text-xs text-muted-foreground">
                  Manage applications, metrics, and architecture case studies.
                </p>
              </div>

              <button
                onClick={() =>
                  setProjModal({
                    isOpen: true,
                    isEdit: false,
                    data: {
                      title: "",
                      category: "Full-Stack",
                      badge: "Production App",
                      description: "",
                      challenge: "",
                      solution: "",
                      impact: "",
                      metrics: ["99.9% Uptime"],
                      tech: ["Django", "React", "Tailwind CSS"],
                    },
                  })
                }
                className="btn-shine inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 font-sora text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md hover:bg-primary/90"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="flex flex-col justify-between gap-4 rounded-2xl border border-border/80 bg-muted/20 p-5 sm:flex-row sm:items-start"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-sora text-base font-bold text-foreground">
                        {proj.title}
                      </h3>
                      <span className="rounded-full bg-accent/15 px-2.5 py-0.5 font-sora text-xs font-bold text-accent">
                        {proj.category}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground max-w-3xl leading-relaxed">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-border/60 bg-card px-2 py-0.5 text-[11px] font-semibold text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() =>
                        setProjModal({
                          isOpen: true,
                          isEdit: true,
                          id: proj.id,
                          data: { ...proj },
                        })
                      }
                      className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:border-accent hover:text-accent"
                    >
                      <Edit className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Delete project "${proj.title}"?`)) {
                          deleteProject(proj.id);
                          toast.success("Project deleted.");
                        }
                      }}
                      className="inline-flex items-center gap-1 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-500 hover:bg-rose-500/20"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SERVICES */}
        {activeTab === "services" && (
          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-border/70 pb-4">
              <div>
                <h2 className="font-sora text-xl font-bold tracking-tight text-foreground">
                  Specialized Services & Deliverables
                </h2>
                <p className="text-xs text-muted-foreground">
                  Add, update, or remove engineering service packages.
                </p>
              </div>

              <button
                onClick={() =>
                  setServiceModal({
                    isOpen: true,
                    isEdit: false,
                    data: {
                      title: "",
                      tagline: "Architecture & Delivery",
                      description: "",
                      color: "emerald",
                      deliverables: [""],
                      technologies: ["React", "Django"],
                      businessValue: "",
                    },
                  })
                }
                className="btn-shine inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 font-sora text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md hover:bg-primary/90"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Service</span>
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="flex flex-col justify-between gap-4 rounded-2xl border border-border/80 bg-muted/20 p-5 sm:flex-row sm:items-start"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-sora text-base font-bold text-foreground">{srv.title}</h3>
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-sora text-xs font-bold text-primary">
                        {srv.tagline}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground max-w-3xl leading-relaxed">
                      {srv.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {srv.technologies.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-border/60 bg-card px-2 py-0.5 text-[11px] font-semibold text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() =>
                        setServiceModal({
                          isOpen: true,
                          isEdit: true,
                          id: srv.id,
                          data: { ...srv },
                        })
                      }
                      className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:border-accent hover:text-accent"
                    >
                      <Edit className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Delete service "${srv.title}"?`)) {
                          deleteService(srv.id);
                          toast.success("Service removed.");
                        }
                      }}
                      className="inline-flex items-center gap-1 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-500 hover:bg-rose-500/20"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: EDUCATION & CERTIFICATIONS */}
        {activeTab === "education" && (
          <div className="space-y-8">
            {/* Degrees */}
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-border/70 pb-4">
                <div>
                  <h2 className="font-sora text-xl font-bold tracking-tight text-foreground">
                    Academic Degrees & Qualifications
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Add or update your university, diploma, and school credentials.
                  </p>
                </div>

                <button
                  onClick={() =>
                    setEduModal({
                      isOpen: true,
                      isEdit: false,
                      data: {
                        degree: "",
                        institution: "",
                        location: "Dhaka, Bangladesh",
                        period: "2023 — Present",
                        detail: "In Progress",
                        status: "In Progress",
                        statusType: "active",
                        description: "",
                        coursework: [],
                        highlights: [],
                      },
                    })
                  }
                  className="btn-shine inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 font-sora text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md hover:bg-primary/90"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Degree</span>
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {educationList.map((edu, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between gap-4 rounded-2xl border border-border/80 bg-muted/20 p-5 sm:flex-row sm:items-start"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-sora text-base font-bold text-foreground">
                          {edu.degree}
                        </h3>
                        <span className="rounded-full bg-accent/15 px-2.5 py-0.5 font-sora text-xs font-bold text-accent">
                          {edu.detail}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-muted-foreground">
                        {edu.institution} · {edu.location} ({edu.period})
                      </p>
                      <p className="text-xs text-muted-foreground max-w-3xl leading-relaxed">
                        {edu.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() =>
                          setEduModal({
                            isOpen: true,
                            isEdit: true,
                            index: idx,
                            data: { ...edu },
                          })
                        }
                        className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:border-accent hover:text-accent"
                      >
                        <Edit className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${edu.degree}"?`)) {
                            deleteEducation(idx);
                            toast.success("Degree removed.");
                          }
                        }}
                        className="inline-flex items-center gap-1 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-500 hover:bg-rose-500/20"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =========================================================================
          MODALS FOR CREATING / EDITING ENTITIES
      ========================================================================== */}

      {/* SERVICE MODAL */}
      {serviceModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
          <div className="w-full max-w-xl rounded-3xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border/80 pb-4">
              <h3 className="font-sora text-base font-bold text-foreground">
                {serviceModal.isEdit ? "Edit Service" : "Add New Service"}
              </h3>
              <button
                onClick={() => setServiceModal({ ...serviceModal, isOpen: false })}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (serviceModal.isEdit && serviceModal.id) {
                  updateService(serviceModal.id, serviceModal.data);
                  toast.success("Service updated successfully!");
                } else {
                  addService(serviceModal.data as Omit<Service, "id">);
                  toast.success("New service added successfully!");
                }
                setServiceModal({ ...serviceModal, isOpen: false });
              }}
              className="mt-4 space-y-4"
            >
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground">Title</label>
                <input
                  type="text"
                  required
                  value={serviceModal.data.title || ""}
                  onChange={(e) =>
                    setServiceModal({
                      ...serviceModal,
                      data: { ...serviceModal.data, title: e.target.value },
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground">Tagline</label>
                <input
                  type="text"
                  required
                  value={serviceModal.data.tagline || ""}
                  onChange={(e) =>
                    setServiceModal({
                      ...serviceModal,
                      data: { ...serviceModal.data, tagline: e.target.value },
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={serviceModal.data.description || ""}
                  onChange={(e) =>
                    setServiceModal({
                      ...serviceModal,
                      data: { ...serviceModal.data, description: e.target.value },
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-border bg-muted/30 p-3 text-sm text-foreground focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={(serviceModal.data.technologies || []).join(", ")}
                  onChange={(e) =>
                    setServiceModal({
                      ...serviceModal,
                      data: {
                        ...serviceModal.data,
                        technologies: e.target.value.split(",").map((s) => s.trim()),
                      },
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setServiceModal({ ...serviceModal, isOpen: false })}
                  className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-shine rounded-full bg-primary px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
                >
                  {serviceModal.isEdit ? "Save Changes" : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EXPERIENCE MODAL */}
      {expModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border/80 pb-4">
              <h3 className="font-sora text-base font-bold text-foreground">
                {expModal.isEdit ? "Edit Experience" : "Add New Experience"}
              </h3>
              <button
                onClick={() => setExpModal({ ...expModal, isOpen: false })}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (expModal.isEdit && expModal.id) {
                  updateExperience(expModal.id, expModal.data);
                  toast.success("Experience updated!");
                } else {
                  addExperience(expModal.data as Omit<Experience, "id">);
                  toast.success("Experience added!");
                }
                setExpModal({ ...expModal, isOpen: false });
              }}
              className="mt-4 space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    Job Title / Role
                  </label>
                  <input
                    type="text"
                    required
                    value={expModal.data.title || ""}
                    onChange={(e) =>
                      setExpModal({
                        ...expModal,
                        data: { ...expModal.data, title: e.target.value },
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    required
                    value={expModal.data.company || ""}
                    onChange={(e) =>
                      setExpModal({
                        ...expModal,
                        data: { ...expModal.data, company: e.target.value },
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    Period
                  </label>
                  <input
                    type="text"
                    required
                    value={expModal.data.period || ""}
                    onChange={(e) =>
                      setExpModal({
                        ...expModal,
                        data: { ...expModal.data, period: e.target.value },
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:outline-none"
                    placeholder="e.g. 2024 — Present"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    Location & Type
                  </label>
                  <input
                    type="text"
                    required
                    value={expModal.data.location || ""}
                    onChange={(e) =>
                      setExpModal({
                        ...expModal,
                        data: { ...expModal.data, location: e.target.value },
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  Role Summary
                </label>
                <textarea
                  rows={3}
                  required
                  value={expModal.data.roleSummary || ""}
                  onChange={(e) =>
                    setExpModal({
                      ...expModal,
                      data: { ...expModal.data, roleSummary: e.target.value },
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-border bg-muted/30 p-3 text-sm text-foreground focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  Technologies Used (comma separated)
                </label>
                <input
                  type="text"
                  value={(expModal.data.techs || []).join(", ")}
                  onChange={(e) =>
                    setExpModal({
                      ...expModal,
                      data: {
                        ...expModal.data,
                        techs: e.target.value.split(",").map((s) => s.trim()),
                      },
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setExpModal({ ...expModal, isOpen: false })}
                  className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-shine rounded-full bg-primary px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
                >
                  {expModal.isEdit ? "Save Changes" : "Add Experience"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SKILL MODAL */}
      {skillModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border/80 pb-4">
              <h3 className="font-sora text-base font-bold text-foreground">
                {skillModal.isEdit ? "Edit Skill" : "Add New Skill"}
              </h3>
              <button
                onClick={() => setSkillModal({ ...skillModal, isOpen: false })}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (skillModal.isEdit && skillModal.skillName) {
                  updateSkillInCategory(
                    skillModal.categoryId,
                    skillModal.skillName,
                    skillModal.data,
                  );
                  toast.success("Skill updated!");
                } else {
                  addSkillToCategory(skillModal.categoryId, skillModal.data as SkillItem);
                  toast.success("Skill added!");
                }
                setSkillModal({ ...skillModal, isOpen: false });
              }}
              className="mt-4 space-y-4"
            >
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  Category
                </label>
                <select
                  value={skillModal.categoryId}
                  onChange={(e) => setSkillModal({ ...skillModal, categoryId: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:outline-none"
                >
                  {skillCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  Skill Name
                </label>
                <input
                  type="text"
                  required
                  value={skillModal.data.name || ""}
                  onChange={(e) =>
                    setSkillModal({
                      ...skillModal,
                      data: { ...skillModal.data, name: e.target.value },
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    Proficiency Level
                  </label>
                  <select
                    value={skillModal.data.level || "Expert"}
                    onChange={(e) =>
                      setSkillModal({
                        ...skillModal,
                        data: {
                          ...skillModal.data,
                          level: e.target.value as "Expert" | "Advanced" | "Proficient",
                        },
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:outline-none"
                  >
                    <option value="Expert">Expert</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Proficient">Proficient</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    Experience
                  </label>
                  <input
                    type="text"
                    value={skillModal.data.experience || "2+ Years"}
                    onChange={(e) =>
                      setSkillModal({
                        ...skillModal,
                        data: { ...skillModal.data, experience: e.target.value },
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setSkillModal({ ...skillModal, isOpen: false })}
                  className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-shine rounded-full bg-primary px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
                >
                  {skillModal.isEdit ? "Save Changes" : "Add Skill"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROJECT MODAL */}
      {projModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border/80 pb-4">
              <h3 className="font-sora text-base font-bold text-foreground">
                {projModal.isEdit ? "Edit Project" : "Add New Project"}
              </h3>
              <button
                onClick={() => setProjModal({ ...projModal, isOpen: false })}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (projModal.isEdit && projModal.id) {
                  updateProject(projModal.id, projModal.data);
                  toast.success("Project updated!");
                } else {
                  addProject(projModal.data as Omit<Project, "id">);
                  toast.success("Project added!");
                }
                setProjModal({ ...projModal, isOpen: false });
              }}
              className="mt-4 space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={projModal.data.title || ""}
                    onChange={(e) =>
                      setProjModal({
                        ...projModal,
                        data: { ...projModal.data, title: e.target.value },
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    Category
                  </label>
                  <select
                    value={projModal.data.category || "Full-Stack"}
                    onChange={(e) =>
                      setProjModal({
                        ...projModal,
                        data: {
                          ...projModal.data,
                          category: e.target.value as "Full-Stack" | "Shopify" | "CMS" | "SaaS",
                        },
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:outline-none"
                  >
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="Shopify">Shopify</option>
                    <option value="CMS">CMS</option>
                    <option value="SaaS">SaaS</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={projModal.data.description || ""}
                  onChange={(e) =>
                    setProjModal({
                      ...projModal,
                      data: { ...projModal.data, description: e.target.value },
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-border bg-muted/30 p-3 text-sm text-foreground focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={(projModal.data.tech || []).join(", ")}
                  onChange={(e) =>
                    setProjModal({
                      ...projModal,
                      data: {
                        ...projModal.data,
                        tech: e.target.value.split(",").map((s) => s.trim()),
                      },
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setProjModal({ ...projModal, isOpen: false })}
                  className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-shine rounded-full bg-primary px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
                >
                  {projModal.isEdit ? "Save Changes" : "Add Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDUCATION MODAL */}
      {eduModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border/80 pb-4">
              <h3 className="font-sora text-base font-bold text-foreground">
                {eduModal.isEdit ? "Edit Academic Degree" : "Add Academic Degree"}
              </h3>
              <button
                onClick={() => setEduModal({ ...eduModal, isOpen: false })}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (eduModal.isEdit && eduModal.index !== undefined) {
                  updateEducation(eduModal.index, eduModal.data);
                  toast.success("Degree updated!");
                } else {
                  addEducation(eduModal.data as EducationItem);
                  toast.success("Degree added!");
                }
                setEduModal({ ...eduModal, isOpen: false });
              }}
              className="mt-4 space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    Degree Name
                  </label>
                  <input
                    type="text"
                    required
                    value={eduModal.data.degree || ""}
                    onChange={(e) =>
                      setEduModal({
                        ...eduModal,
                        data: { ...eduModal.data, degree: e.target.value },
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:outline-none"
                    placeholder="e.g. B.Sc. in Computer Science"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    Institution
                  </label>
                  <input
                    type="text"
                    required
                    value={eduModal.data.institution || ""}
                    onChange={(e) =>
                      setEduModal({
                        ...eduModal,
                        data: { ...eduModal.data, institution: e.target.value },
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:outline-none"
                    placeholder="e.g. Uttara University"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    Period
                  </label>
                  <input
                    type="text"
                    required
                    value={eduModal.data.period || ""}
                    onChange={(e) =>
                      setEduModal({
                        ...eduModal,
                        data: { ...eduModal.data, period: e.target.value },
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:outline-none"
                    placeholder="e.g. 2023 — Present"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    Detail / Grade
                  </label>
                  <input
                    type="text"
                    required
                    value={eduModal.data.detail || ""}
                    onChange={(e) =>
                      setEduModal({
                        ...eduModal,
                        data: { ...eduModal.data, detail: e.target.value },
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:outline-none"
                    placeholder="e.g. Senior Year (In Progress)"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={eduModal.data.description || ""}
                  onChange={(e) =>
                    setEduModal({
                      ...eduModal,
                      data: { ...eduModal.data, description: e.target.value },
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-border bg-muted/30 p-3 text-sm text-foreground focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setEduModal({ ...eduModal, isOpen: false })}
                  className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-shine rounded-full bg-primary px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
                >
                  {eduModal.isEdit ? "Save Changes" : "Add Degree"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
}
