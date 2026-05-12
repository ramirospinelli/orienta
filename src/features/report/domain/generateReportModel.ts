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
        body: `Tu tendencia predominante se acerca a un perfil ${result.analytics.dominantTemperament.toLowerCase()}.`,
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
        body: "Tus respuestas marcan afinidades para seguir explorando opciones de estudio y trabajo.",
      },
      {
        title: "Carreras y areas para empezar a explorar",
        items: result.recommendedCareers.map(
          (career) => `${career.title}: ${career.reason}`,
        ),
      },
    ],
    disclaimer:
      "Este informe es orientativo y puede ayudarte a pensar opciones con mas claridad.",
  };
}
