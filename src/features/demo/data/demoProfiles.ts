import { DemoProfile } from "@/shared/types/assessment";

export const demoProfiles: DemoProfile[] = [
  {
    id: "social-guide",
    label: "Perfil social y orientador",
    description: "Pensado para validar flujos con una inclinacion fuerte hacia ayuda, educacion y vinculo humano.",
    userProfile: {
      name: "Martin Gomez",
      birthDate: "2008-04-17",
      educationLevel: "Secundario en curso",
      currentYear: "5to ano",
      institution: "Instituto General San Martin",
      currentStudies: "Taller de acompanamiento escolar",
    },
    result: {
      analytics: {
        sectionScores: {},
        dominantTemperament: "Sanguineo",
        hollandCode: "SAE",
        productTraits: {
          socialOrientation: 0.9,
          analyticalOrientation: 0.45,
          creativeOrientation: 0.55,
          structureOrientation: 0.52,
          leadershipOrientation: 0.63,
          careOrientation: 0.94,
          practicalOrientation: 0.31,
        },
      },
      summary:
        "Mostras una tendencia fuerte a conectar con otras personas, orientar y participar en entornos donde el acompanamiento y la comunicacion tienen peso.",
      strengths: ["Empatia", "Escucha activa", "Facilidad para vincularte"],
      developmentAreas: ["Sostener limites", "Ordenar prioridades cuando hay muchas demandas"],
      recommendedCareers: [
        {
          title: "Profesorado",
          category: "Educacion",
          matchScore: 0.91,
          reason: "Combina comunicacion, acompanamiento y gusto por transmitir conocimiento.",
        },
      ],
    },
  },
  {
    id: "technical-builder",
    label: "Perfil tecnico y resolutivo",
    description: "Sirve para probar recomendaciones vinculadas a tecnologia, sistemas y problemas concretos.",
    userProfile: {
      name: "Mateo Benitez",
      birthDate: "2007-09-02",
      educationLevel: "Secundario completo",
      currentYear: "Ingreso universitario",
      institution: "Colegio Tecnico N°3",
      currentStudies: "Curso de programacion web",
    },
    result: {
      analytics: {
        sectionScores: {},
        dominantTemperament: "Colerico",
        hollandCode: "RIE",
        productTraits: {
          socialOrientation: 0.34,
          analyticalOrientation: 0.88,
          creativeOrientation: 0.49,
          structureOrientation: 0.73,
          leadershipOrientation: 0.67,
          careOrientation: 0.28,
          practicalOrientation: 0.9,
        },
      },
      summary:
        "Tendes a destacarte cuando hay que resolver problemas concretos, entender sistemas y transformar ideas en soluciones aplicables.",
      strengths: ["Pensamiento logico", "Resolucion tecnica", "Iniciativa"],
      developmentAreas: ["Tolerar procesos mas lentos", "Comunicar mejor tus decisiones"],
      recommendedCareers: [
        {
          title: "Tecnicatura en Programacion",
          category: "Tecnologia",
          matchScore: 0.93,
          reason: "Aprovecha tu orientacion analitica, practica y resolutiva.",
        },
      ],
    },
  },
  {
    id: "creative-explorer",
    label: "Perfil creativo y expresivo",
    description: "Permite validar una salida mas ligada a diseno, comunicacion y exploracion de ideas.",
    userProfile: {
      name: "Valentina Ruiz",
      birthDate: "2008-11-24",
      educationLevel: "Secundario en curso",
      currentYear: "6to ano",
      institution: "Escuela de Artes Visuales",
      currentStudies: "Taller de ilustracion digital",
    },
    result: {
      analytics: {
        sectionScores: {},
        dominantTemperament: "Melancolico",
        hollandCode: "ASI",
        productTraits: {
          socialOrientation: 0.61,
          analyticalOrientation: 0.58,
          creativeOrientation: 0.95,
          structureOrientation: 0.42,
          leadershipOrientation: 0.51,
          careOrientation: 0.57,
          practicalOrientation: 0.39,
        },
      },
      summary:
        "Tu perfil muestra mucha sensibilidad para crear, observar matices y darle forma a ideas con impronta propia.",
      strengths: ["Creatividad", "Mirada personal", "Capacidad expresiva"],
      developmentAreas: ["Sostener rutina", "Convertir ideas en planes concretos"],
      recommendedCareers: [
        {
          title: "Diseno UX/UI",
          category: "Diseno y tecnologia",
          matchScore: 0.89,
          reason: "Integra creatividad, observacion y foco en experiencias de personas.",
        },
      ],
    },
  },
];
