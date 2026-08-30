import React, { createContext, useContext, useState, useEffect } from "react";
import {
  personalInfo as defaultPersonalInfo,
  keyMetrics as defaultKeyMetrics,
  services as defaultServices,
  skillCategories as defaultSkillCategories,
  experiences as defaultExperiences,
  projects as defaultProjects,
  educationList as defaultEducationList,
  certifications as defaultCertifications,
  languages as defaultLanguages,
  type Service,
  type SkillCategory,
  type SkillItem,
  type Experience,
  type Project,
  type EducationItem,
  type CertificationItem,
  type LanguageItem,
  type Metric,
} from "@/data/portfolio";

export interface PersonalInfoType {
  name: string;
  shortName: string;
  title: string;
  roles: string[];
  bio: string;
  extendedBio: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  whatsappUrl: string;
  location: string;
  timezone: string;
  availability: string;
  github: string;
  linkedin: string;
  cvUrl?: string;
  customCvFileName?: string;
  customCvDataUri?: string; // Stored base64 PDF or document
}

export interface PortfolioDataType {
  personalInfo: PersonalInfoType;
  keyMetrics: Metric[];
  services: Service[];
  skillCategories: SkillCategory[];
  experiences: Experience[];
  projects: Project[];
  educationList: EducationItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  contactTopics: string[];
}

const STORAGE_KEY = "sakib_portfolio_cms_data_v2";

export interface PortfolioContextType {
  data: PortfolioDataType;
  personalInfo: PersonalInfoType;
  keyMetrics: Metric[];
  services: Service[];
  skillCategories: SkillCategory[];
  experiences: Experience[];
  projects: Project[];
  educationList: EducationItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  contactTopics: string[];

  // Contact Topics CRUD
  addContactTopic: (topic: string) => void;
  removeContactTopic: (topic: string) => void;
  updateContactTopics: (topics: string[]) => void;

  // Personal Info & CV
  updatePersonalInfo: (partial: Partial<PersonalInfoType>) => void;
  uploadCustomCv: (fileBase64: string, fileName: string) => void;
  removeCustomCv: () => void;

  // Services CRUD
  addService: (service: Omit<Service, "id">) => void;
  updateService: (id: string, updated: Partial<Service>) => void;
  deleteService: (id: string) => void;

  // Skills CRUD
  addSkillToCategory: (categoryId: string, skill: SkillItem) => void;
  updateSkillInCategory: (
    categoryId: string,
    skillName: string,
    updated: Partial<SkillItem>,
  ) => void;
  deleteSkillFromCategory: (categoryId: string, skillName: string) => void;
  addSkillCategory: (category: Omit<SkillCategory, "id">) => void;
  deleteSkillCategory: (categoryId: string) => void;

  // Projects CRUD
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Experience CRUD
  addExperience: (exp: Omit<Experience, "id">) => void;
  updateExperience: (id: string, updated: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;

  // Education CRUD
  addEducation: (edu: EducationItem) => void;
  updateEducation: (index: number, updated: Partial<EducationItem>) => void;
  deleteEducation: (index: number) => void;

  // Certifications CRUD
  addCertification: (cert: CertificationItem) => void;
  updateCertification: (index: number, updated: Partial<CertificationItem>) => void;
  deleteCertification: (index: number) => void;

  // Languages CRUD
  addLanguage: (lang: LanguageItem) => void;
  updateLanguage: (index: number, updated: Partial<LanguageItem>) => void;
  deleteLanguage: (index: number) => void;

  // Metrics CRUD
  updateMetric: (index: number, updated: Partial<Metric>) => void;

  // Data reset & export/import
  resetToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonStr: string) => boolean;
}

export const defaultContactTopics = [
  "Shopify Store / App",
  "Full-Stack Django & React",
  "Custom CMS / WordPress",
  "API & Automation",
  "Job Opportunity",
];

const defaultData: PortfolioDataType = {
  personalInfo: {
    ...defaultPersonalInfo,
    cvUrl: "https://drive.google.com",
    customCvFileName: "Sakib_Sardar_FullStack_Resume.pdf",
    customCvDataUri: "",
  },
  keyMetrics: defaultKeyMetrics,
  services: defaultServices,
  skillCategories: defaultSkillCategories,
  experiences: defaultExperiences,
  projects: defaultProjects,
  educationList: defaultEducationList,
  certifications: defaultCertifications,
  languages: defaultLanguages,
  contactTopics: defaultContactTopics,
};

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioDataType>(defaultData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setData((prev) => ({
          ...prev,
          ...parsed,
          personalInfo: {
            ...prev.personalInfo,
            ...(parsed.personalInfo || {}),
          },
          contactTopics:
            Array.isArray(parsed.contactTopics) && parsed.contactTopics.length > 0
              ? parsed.contactTopics
              : prev.contactTopics,
        }));
      }
    } catch (e) {
      console.error("Failed to load custom portfolio CMS data from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage on changes after initial mount
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Failed to persist portfolio data", e);
    }
  }, [data, isLoaded]);

  // Personal Info
  const updatePersonalInfo = (partial: Partial<PersonalInfoType>) => {
    setData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...partial,
      },
    }));
  };

  const uploadCustomCv = (fileBase64: string, fileName: string) => {
    setData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        customCvDataUri: fileBase64,
        customCvFileName: fileName,
      },
    }));
  };

  const removeCustomCv = () => {
    setData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        customCvDataUri: "",
        customCvFileName: "",
      },
    }));
  };

  // Contact Topics
  const addContactTopic = (topic: string) => {
    const trimmed = topic.trim();
    if (!trimmed) return;
    setData((prev) => ({
      ...prev,
      contactTopics: prev.contactTopics.includes(trimmed)
        ? prev.contactTopics
        : [...prev.contactTopics, trimmed],
    }));
  };

  const removeContactTopic = (topic: string) => {
    setData((prev) => ({
      ...prev,
      contactTopics: prev.contactTopics.filter((t) => t !== topic),
    }));
  };

  const updateContactTopics = (topics: string[]) => {
    setData((prev) => ({
      ...prev,
      contactTopics: topics,
    }));
  };

  // Services
  const addService = (service: Omit<Service, "id">) => {
    const newId = `srv-${Date.now()}`;
    const newService: Service = { ...service, id: newId };
    setData((prev) => ({
      ...prev,
      services: [newService, ...prev.services],
    }));
  };

  const updateService = (id: string, updated: Partial<Service>) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, ...updated } : s)),
    }));
  };

  const deleteService = (id: string) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
  };

  // Skills
  const addSkillToCategory = (categoryId: string, skill: SkillItem) => {
    setData((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            skills: [...cat.skills, skill],
          };
        }
        return cat;
      }),
    }));
  };

  const updateSkillInCategory = (
    categoryId: string,
    skillName: string,
    updated: Partial<SkillItem>,
  ) => {
    setData((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            skills: cat.skills.map((s) => (s.name === skillName ? { ...s, ...updated } : s)),
          };
        }
        return cat;
      }),
    }));
  };

  const deleteSkillFromCategory = (categoryId: string, skillName: string) => {
    setData((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            skills: cat.skills.filter((s) => s.name !== skillName),
          };
        }
        return cat;
      }),
    }));
  };

  const addSkillCategory = (category: Omit<SkillCategory, "id">) => {
    const newId = `cat-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      skillCategories: [...prev.skillCategories, { ...category, id: newId }],
    }));
  };

  const deleteSkillCategory = (categoryId: string) => {
    setData((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.filter((c) => c.id !== categoryId),
    }));
  };

  // Projects
  const addProject = (project: Omit<Project, "id">) => {
    const newId = `proj-${Date.now()}`;
    const newProj: Project = { ...project, id: newId };
    setData((prev) => ({
      ...prev,
      projects: [newProj, ...prev.projects],
    }));
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    }));
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  // Experience
  const addExperience = (exp: Omit<Experience, "id">) => {
    const newId = `exp-${Date.now()}`;
    const newExp: Experience = { ...exp, id: newId };
    setData((prev) => ({
      ...prev,
      experiences: [newExp, ...prev.experiences],
    }));
  };

  const updateExperience = (id: string, updated: Partial<Experience>) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((e) => (e.id === id ? { ...e, ...updated } : e)),
    }));
  };

  const deleteExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id),
    }));
  };

  // Education
  const addEducation = (edu: EducationItem) => {
    setData((prev) => ({
      ...prev,
      educationList: [edu, ...prev.educationList],
    }));
  };

  const updateEducation = (index: number, updated: Partial<EducationItem>) => {
    setData((prev) => ({
      ...prev,
      educationList: prev.educationList.map((item, idx) =>
        idx === index ? { ...item, ...updated } : item,
      ),
    }));
  };

  const deleteEducation = (index: number) => {
    setData((prev) => ({
      ...prev,
      educationList: prev.educationList.filter((_, idx) => idx !== index),
    }));
  };

  // Certifications
  const addCertification = (cert: CertificationItem) => {
    setData((prev) => ({
      ...prev,
      certifications: [cert, ...prev.certifications],
    }));
  };

  const updateCertification = (index: number, updated: Partial<CertificationItem>) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c, idx) =>
        idx === index ? { ...c, ...updated } : c,
      ),
    }));
  };

  const deleteCertification = (index: number) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, idx) => idx !== index),
    }));
  };

  // Languages
  const addLanguage = (lang: LanguageItem) => {
    setData((prev) => ({
      ...prev,
      languages: [...prev.languages, lang],
    }));
  };

  const updateLanguage = (index: number, updated: Partial<LanguageItem>) => {
    setData((prev) => ({
      ...prev,
      languages: prev.languages.map((l, idx) => (idx === index ? { ...l, ...updated } : l)),
    }));
  };

  const deleteLanguage = (index: number) => {
    setData((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, idx) => idx !== index),
    }));
  };

  // Metrics
  const updateMetric = (index: number, updated: Partial<Metric>) => {
    setData((prev) => ({
      ...prev,
      keyMetrics: prev.keyMetrics.map((m, idx) => (idx === index ? { ...m, ...updated } : m)),
    }));
  };

  // Reset to defaults
  const resetToDefaults = () => {
    setData(defaultData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  // Export / Import
  const exportDataJson = () => {
    return JSON.stringify(data, null, 2);
  };

  const importDataJson = (jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.personalInfo && parsed.services && parsed.projects) {
        setData(parsed);
        return true;
      }
      return false;
    } catch (e) {
      console.error("Failed to parse JSON backup", e);
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        personalInfo: data.personalInfo,
        keyMetrics: data.keyMetrics,
        services: data.services,
        skillCategories: data.skillCategories,
        experiences: data.experiences,
        projects: data.projects,
        educationList: data.educationList,
        certifications: data.certifications,
        languages: data.languages,
        contactTopics: data.contactTopics,
        addContactTopic,
        removeContactTopic,
        updateContactTopics,
        updatePersonalInfo,
        uploadCustomCv,
        removeCustomCv,
        addService,
        updateService,
        deleteService,
        addSkillToCategory,
        updateSkillInCategory,
        deleteSkillFromCategory,
        addSkillCategory,
        deleteSkillCategory,
        addProject,
        updateProject,
        deleteProject,
        addExperience,
        updateExperience,
        deleteExperience,
        addEducation,
        updateEducation,
        deleteEducation,
        addCertification,
        updateCertification,
        deleteCertification,
        addLanguage,
        updateLanguage,
        deleteLanguage,
        updateMetric,
        resetToDefaults,
        exportDataJson,
        importDataJson,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
