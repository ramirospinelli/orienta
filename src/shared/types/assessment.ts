export type AssessmentStep = "landing" | "consent" | "intake" | "assessment" | "results";

export type AssessmentMode = "real" | "demo" | "dev";

export type AssessmentSection =
  | "temperament"
  | "bigFive"
  | "styles"
  | "interests"
  | "holland";

export type LikertValue = 1 | 2 | 3 | 4 | 5;

export type ProductTraitKey =
  | "socialOrientation"
  | "analyticalOrientation"
  | "creativeOrientation"
  | "structureOrientation"
  | "leadershipOrientation"
  | "careOrientation"
  | "practicalOrientation";

export interface AssessmentQuestion {
  id: string;
  section: AssessmentSection;
  prompt: string;
  traitKey: string;
  weight: number;
  reverse?: boolean;
  devOnly?: boolean;
}

export interface AssessmentAnswer {
  questionId: string;
  value: LikertValue;
}

export interface UserProfile {
  name: string;
  birthDate: string;
  educationLevel: string;
  currentYear: string;
  institution: string;
  currentStudies?: string;
}

export interface TraitScore {
  raw: number;
  normalized: number;
}

export interface CareerSuggestion {
  title: string;
  category: string;
  matchScore: number;
  reason: string;
}

export interface ReportSection {
  title: string;
  body?: string;
  items?: string[];
}

export interface ReportModel {
  title: string;
  subtitle: string;
  personalData: Array<{ label: string; value: string }>;
  sections: ReportSection[];
  disclaimer: string;
}

export interface CvModel {
  name: string;
  headline: string;
  educationLine: string;
  profile: string;
  strengths: string[];
}

export interface AssessmentAnalytics {
  sectionScores: Record<string, TraitScore>;
  dominantTemperament: string;
  hollandCode: string;
  productTraits: Record<ProductTraitKey, number>;
}

export interface AssessmentResult {
  analytics: AssessmentAnalytics;
  summary: string;
  strengths: string[];
  developmentAreas: string[];
  recommendedCareers: CareerSuggestion[];
}

export interface DemoProfile {
  id: string;
  label: string;
  description: string;
  userProfile: UserProfile;
  result: AssessmentResult;
}
