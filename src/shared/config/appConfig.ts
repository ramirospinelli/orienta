import { envStatus } from "@/shared/config/env";

export const appConfig = {
  enableDevMode: true,
  totalQuestionsTarget: 40,
  envStatus,
} as const;
