import { ProductTraitKey } from "@/shared/types/assessment";

type CareerRuleSet = Partial<Record<ProductTraitKey, number>>;

export type CareerCatalogEntry = {
  title: string;
  category: string;
  reason: string;
  rules: CareerRuleSet;
};

export const careerCatalog: CareerCatalogEntry[] = [
  {
    title: "Psicologia",
    category: "Ciencias humanas y salud",
    reason: "Puede hacerte sentido si te interesa comprender personas, acompanar procesos y trabajar con escucha.",
    rules: {
      careOrientation: 1,
      socialOrientation: 0.8,
      analyticalOrientation: 0.45,
    },
  },
  {
    title: "Profesorado o Ciencias de la Educacion",
    category: "Educacion",
    reason: "Combina orientacion, comunicacion y gusto por ensenar o facilitar aprendizajes.",
    rules: {
      careOrientation: 0.85,
      socialOrientation: 0.75,
      structureOrientation: 0.45,
    },
  },
  {
    title: "Tecnicatura en Programacion",
    category: "Tecnologia",
    reason: "Encaja mejor cuando hay afinidad por resolver problemas, pensar con logica y trabajar con sistemas.",
    rules: {
      analyticalOrientation: 1,
      practicalOrientation: 0.7,
      structureOrientation: 0.45,
    },
  },
  {
    title: "Diseno UX/UI",
    category: "Diseno y tecnologia",
    reason: "Puede gustarte si disfrutas crear experiencias, observar personas y convertir ideas en propuestas visuales.",
    rules: {
      creativeOrientation: 1,
      socialOrientation: 0.55,
      analyticalOrientation: 0.35,
    },
  },
  {
    title: "Ingenieria",
    category: "Ciencias aplicadas",
    reason: "Tiene afinidad con perfiles que combinan analisis, practicidad, metodo y resolucion.",
    rules: {
      analyticalOrientation: 0.95,
      practicalOrientation: 0.85,
      structureOrientation: 0.55,
    },
  },
  {
    title: "Comunicacion o Marketing",
    category: "Comunicacion",
    reason: "Puede ser interesante si te motiva expresar ideas, conectar con gente y mover proyectos.",
    rules: {
      socialOrientation: 0.85,
      creativeOrientation: 0.7,
      leadershipOrientation: 0.65,
    },
  },
  {
    title: "Administracion o Contador",
    category: "Administracion y economia",
    reason: "Suele ajustar mejor a perfiles organizados, estructurados y comodos con reglas y recursos.",
    rules: {
      structureOrientation: 1,
      analyticalOrientation: 0.65,
      leadershipOrientation: 0.4,
    },
  },
  {
    title: "Arquitectura",
    category: "Diseno y tecnica",
    reason: "Es una opcion potente si te atraen tanto lo creativo como lo concreto y la planificacion.",
    rules: {
      creativeOrientation: 0.85,
      practicalOrientation: 0.7,
      analyticalOrientation: 0.45,
    },
  },
  {
    title: "Trabajo Social",
    category: "Ciencias humanas",
    reason: "Puede resonar si te interesa acompanar personas y participar en problemas sociales reales.",
    rules: {
      careOrientation: 0.95,
      socialOrientation: 0.8,
      leadershipOrientation: 0.35,
    },
  },
  {
    title: "Oficios tecnicos y produccion",
    category: "Tecnica y oficios",
    reason: "Hace sentido cuando preferis aprender haciendo, resolver cosas concretas y trabajar con herramientas o procesos.",
    rules: {
      practicalOrientation: 1,
      structureOrientation: 0.5,
      analyticalOrientation: 0.35,
    },
  },
];
