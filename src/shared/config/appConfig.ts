import { envStatus } from "@/shared/config/env";

export const appConfig = {
  enableDemoMode: true,
  enableDevMode: true,
  totalQuestionsTarget: 40,
  envStatus,
} as const;
