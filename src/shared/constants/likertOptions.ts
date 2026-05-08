import { LikertValue } from "@/shared/types/assessment";

export const likertOptions: ReadonlyArray<{ emoji: string; label: string; value: LikertValue }> = [
  { emoji: "🙅", label: "Muy en desacuerdo", value: 1 },
  { emoji: "🤔", label: "En desacuerdo", value: 2 },
  { emoji: "😐", label: "Neutral", value: 3 },
  { emoji: "🙂", label: "De acuerdo", value: 4 },
  { emoji: "🚀", label: "Muy de acuerdo", value: 5 },
];
