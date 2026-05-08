import { AssessmentQuestion } from "@/shared/types/assessment";

export const questionBank: AssessmentQuestion[] = [
  {
    id: "temperament_sanguine_01",
    section: "temperament",
    prompt: "Me resulta natural acercarme a personas nuevas y romper el hielo.",
    traitKey: "sanguine",
    weight: 1,
  },
  {
    id: "bigfive_responsibility_01",
    section: "bigFive",
    prompt: "Cuando tengo tareas o responsabilidades, prefiero organizarme antes de empezar.",
    traitKey: "responsibility",
    weight: 1,
  },
  {
    id: "styles_caution_01",
    section: "styles",
    prompt: "Suelo pensar bastante una decision importante antes de actuar.",
    traitKey: "caution",
    weight: 1,
  },
  {
    id: "interests_helping_01",
    section: "interests",
    prompt: "Me interesa ayudar a otras personas a resolver problemas o sentirse mejor.",
    traitKey: "care",
    weight: 1,
  },
  {
    id: "holland_investigative_01",
    section: "holland",
    prompt: "Disfruto analizar informacion y entender por que pasan las cosas.",
    traitKey: "investigative",
    weight: 1,
  },
  {
    id: "holland_social_01",
    section: "holland",
    prompt: "Me siento bien en actividades donde puedo acompanar, escuchar o colaborar con otras personas.",
    traitKey: "social",
    weight: 1,
  },
];
