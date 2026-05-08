import { careerCatalog } from "@/features/assessment/data/careerCatalog";
import { questionBank } from "@/features/assessment/data/questionBank";
import {
  AssessmentAnswer,
  AssessmentQuestion,
  AssessmentResult,
  ProductTraitKey,
  TraitScore,
} from "@/shared/types/assessment";

type TraitAggregate = {
  total: number;
  count: number;
};

const traitLabels: Record<ProductTraitKey, string> = {
  socialOrientation: "vinculo social",
  analyticalOrientation: "pensamiento analitico",
  creativeOrientation: "creatividad",
  structureOrientation: "organizacion",
  leadershipOrientation: "iniciativa y liderazgo",
  careOrientation: "acompanamiento y cuidado",
  practicalOrientation: "resolucion practica",
};

const productTraitSources: Record<ProductTraitKey, string[]> = {
  socialOrientation: ["sanguine", "extraversion", "social", "adaptability", "teaching"],
  analyticalOrientation: [
    "melancholic",
    "openness",
    "caution",
    "scientificCuriosity",
    "investigative",
  ],
  creativeOrientation: ["openness", "creativeExpression", "artistic"],
  structureOrientation: ["phlegmatic", "responsibility", "structureNeed"],
  leadershipOrientation: ["choleric", "achievementDrive"],
  careOrientation: ["care", "social", "teaching", "adaptability"],
  practicalOrientation: ["realistic", "structureNeed", "investigative"],
};

const temperamentLabels: Record<string, string> = {
  sanguine: "Sanguineo",
  choleric: "Colerico",
  melancholic: "Melancolico",
  phlegmatic: "Flematico",
};

const hollandLetters: Record<string, string> = {
  realistic: "R",
  investigative: "I",
  artistic: "A",
  social: "S",
  enterprising: "E",
  conventional: "C",
};

export function evaluateAssessment(answersByQuestionId: Record<string, number>): AssessmentResult {
  const answers = questionBank
    .map<AssessmentAnswer | null>((question) => {
      const value = answersByQuestionId[question.id];

      if (!value || value < 1 || value > 5) {
        return null;
      }

      return {
        questionId: question.id,
        value: value as 1 | 2 | 3 | 4 | 5,
      };
    })
    .filter((answer): answer is AssessmentAnswer => Boolean(answer));

  const questionMap = new Map(questionBank.map((question) => [question.id, question]));
  const traitAggregates = new Map<string, TraitAggregate>();

  for (const answer of answers) {
    const question = questionMap.get(answer.questionId);

    if (!question) {
      continue;
    }

    const normalizedValue = normalizeAnswer(answer.value, question);
    const current = traitAggregates.get(question.traitKey) ?? { total: 0, count: 0 };

    traitAggregates.set(question.traitKey, {
      total: current.total + normalizedValue,
      count: current.count + 1,
    });
  }

  const traitScores = Object.fromEntries(
    Array.from(traitAggregates.entries()).map(([traitKey, aggregate]) => [
      traitKey,
      {
        raw: Number((aggregate.total * 5).toFixed(2)),
        normalized: Number((aggregate.total / aggregate.count).toFixed(2)),
      } satisfies TraitScore,
    ]),
  ) as Record<string, TraitScore>;

  const productTraits = buildProductTraits(traitScores);
  const dominantTemperament = getDominantTemperament(traitScores);
  const hollandCode = getHollandCode(traitScores);
  const strengths = generateStrengths(productTraits);
  const developmentAreas = generateDevelopmentAreas(productTraits);
  const recommendedCareers = recommendCareers(productTraits);
  const summary = generateSummary({
    dominantTemperament,
    productTraits,
    recommendedCareers,
  });

  return {
    analytics: {
      sectionScores: traitScores,
      dominantTemperament,
      hollandCode,
      productTraits,
    },
    summary,
    strengths,
    developmentAreas,
    recommendedCareers,
  };
}

function normalizeAnswer(value: number, question: AssessmentQuestion) {
  const adjusted = question.reverse ? 6 - value : value;

  return ((adjusted - 1) / 4) * question.weight;
}

function buildProductTraits(traitScores: Record<string, TraitScore>) {
  return Object.fromEntries(
    Object.entries(productTraitSources).map(([traitKey, sourceKeys]) => {
      const values = sourceKeys
        .map((sourceKey) => traitScores[sourceKey]?.normalized)
        .filter((value): value is number => typeof value === "number");

      const normalized = values.length
        ? Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(2))
        : 0;

      return [traitKey, normalized];
    }),
  ) as Record<ProductTraitKey, number>;
}

function getDominantTemperament(traitScores: Record<string, TraitScore>) {
  const temperamentKey = Object.keys(temperamentLabels).sort((left, right) => {
    return (traitScores[right]?.normalized ?? 0) - (traitScores[left]?.normalized ?? 0);
  })[0];

  return temperamentLabels[temperamentKey] ?? "Equilibrado";
}

function getHollandCode(traitScores: Record<string, TraitScore>) {
  return Object.keys(hollandLetters)
    .sort((left, right) => (traitScores[right]?.normalized ?? 0) - (traitScores[left]?.normalized ?? 0))
    .slice(0, 3)
    .map((key) => hollandLetters[key])
    .join("");
}

function generateStrengths(productTraits: Record<ProductTraitKey, number>) {
  return getSortedTraits(productTraits)
    .slice(0, 3)
    .map(([traitKey]) => {
      switch (traitKey) {
        case "socialOrientation":
          return "Facilidad para vincularte y participar con otras personas";
        case "analyticalOrientation":
          return "Capacidad para analizar, entender y profundizar ideas";
        case "creativeOrientation":
          return "Creatividad para imaginar alternativas y expresarte";
        case "structureOrientation":
          return "Organizacion para sostener tareas y procesos";
        case "leadershipOrientation":
          return "Iniciativa para mover decisiones y encarar desafios";
        case "careOrientation":
          return "Disposicion para acompanar, escuchar y cuidar";
        case "practicalOrientation":
          return "Mirada practica para resolver situaciones concretas";
      }
    });
}

function generateDevelopmentAreas(productTraits: Record<ProductTraitKey, number>) {
  return getSortedTraits(productTraits)
    .slice(-2)
    .reverse()
    .map(([traitKey]) => {
      switch (traitKey) {
        case "socialOrientation":
          return "Entrenar mas confianza para exponerte o compartir ideas cuando hace falta";
        case "analyticalOrientation":
          return "Dedicar mas tiempo a profundizar antes de cerrar algunas decisiones";
        case "creativeOrientation":
          return "Darte mas espacio para explorar ideas nuevas sin ir siempre a lo conocido";
        case "structureOrientation":
          return "Ordenar mejor tus tiempos y sostener rutina cuando hay varias demandas";
        case "leadershipOrientation":
          return "Animarte a tomar mas iniciativa cuando una situacion lo necesita";
        case "careOrientation":
          return "Escuchar mas lo que necesitan otras personas sin perder tus propios limites";
        case "practicalOrientation":
          return "Bajar mas ideas a acciones concretas y resultados visibles";
      }
    });
}

function recommendCareers(productTraits: Record<ProductTraitKey, number>) {
  return careerCatalog
    .map((career) => {
      const weights = Object.entries(career.rules) as Array<[ProductTraitKey, number]>;
      const totalWeight = weights.reduce((sum, [, weight]) => sum + weight, 0);
      const weightedScore = weights.reduce((sum, [traitKey, weight]) => {
        return sum + productTraits[traitKey] * weight;
      }, 0);

      return {
        title: career.title,
        category: career.category,
        matchScore: Number((weightedScore / totalWeight).toFixed(2)),
        reason: career.reason,
      };
    })
    .sort((left, right) => right.matchScore - left.matchScore)
    .slice(0, 3);
}

function generateSummary({
  dominantTemperament,
  productTraits,
  recommendedCareers,
}: {
  dominantTemperament: string;
  productTraits: Record<ProductTraitKey, number>;
  recommendedCareers: AssessmentResult["recommendedCareers"];
}) {
  const topTraits = getSortedTraits(productTraits)
    .slice(0, 2)
    .map(([traitKey]) => traitLabels[traitKey]);

  const leadCareer = recommendedCareers[0]?.title;
  const traitSentence = topTraits.length === 2 ? `${topTraits[0]} y ${topTraits[1]}` : topTraits[0];

  return `Tu perfil muestra una base ${dominantTemperament.toLowerCase()} con una tendencia marcada hacia ${traitSentence}. Eso sugiere que podes sentirte comodo en entornos donde haya espacio para desplegar esas fortalezas${leadCareer ? `, con opciones como ${leadCareer} para seguir explorando` : ""}.`;
}

function getSortedTraits(productTraits: Record<ProductTraitKey, number>) {
  return (Object.entries(productTraits) as Array<[ProductTraitKey, number]>).sort(
    (left, right) => right[1] - left[1],
  );
}
