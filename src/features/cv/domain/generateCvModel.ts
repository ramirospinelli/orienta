import { AssessmentResult, CvModel, UserProfile } from "@/shared/types/assessment";

export function generateCvModel(user: UserProfile, result: AssessmentResult): CvModel {
  return {
    name: user.name,
    headline: "Perfil vocacional inicial",
    educationLine: `${user.educationLevel} · ${user.currentYear} · ${user.institution}`,
    profile: result.summary,
    strengths: result.strengths,
  };
}
