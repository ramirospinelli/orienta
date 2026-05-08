import { AssessmentResult, ReportModel, UserProfile } from "@/shared/types/assessment";

export function generateReportModel(user: UserProfile, result: AssessmentResult): ReportModel {
  return {
    title: `Informe de orientacion vocacional`,
    subtitle: `Perfil generado para ${user.name}`,
    personalData: [
      { label: "Fecha de nacimiento", value: user.birthDate },
      { label: "Escolaridad", value: user.educationLevel },
      { label: "Ano actual", value: user.currentYear },
      { label: "Institucion", value: user.institution },
      { label: "Estudios actuales", value: user.currentStudies || "No informado" },
    ],
    sections: [
      {
        title: "Como sos",
        body: result.summary,
      },
      {
        title: "Temperamento dominante",
        body: `Tu tendencia predominante aparece cercana a un perfil ${result.analytics.dominantTemperament.toLowerCase()}, lo que sugiere una forma particular de vincularte, organizarte y actuar frente a desafios.`,
      },
      {
        title: "Fortalezas",
        items: result.strengths,
      },
      {
        title: "Areas a desarrollar",
        items: result.developmentAreas,
      },
      {
        title: "Intereses y aptitudes",
        body: "Tus respuestas muestran afinidades que pueden ayudarte a explorar mejor entornos academicos y laborales donde te sientas comodo, motivado y con ganas de crecer.",
      },
      {
        title: "Carreras sugeridas",
        items: result.recommendedCareers.map(
          (career) => `${career.title}: ${career.reason}`,
        ),
      },
    ],
    disclaimer:
      "Este informe es orientativo y no reemplaza una evaluacion profesional. Sirve como punto de partida para pensar opciones, conversar con una psicologa y seguir explorando tu camino.",
  };
}
