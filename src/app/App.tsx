import { AssessmentPage } from "@/features/assessment/components/AssessmentPage";
import { ConsentPage } from "@/features/intake/components/ConsentPage";
import { IntakePage } from "@/features/intake/components/IntakePage";
import { LandingPage } from "@/features/landing/components/LandingPage";
import { ResultsPlaceholderPage } from "@/features/report/components/ResultsPlaceholderPage";
import { useAssessmentStore } from "@/store/assessmentStore";

export function App() {
  const step = useAssessmentStore((state) => state.step);

  if (step === "consent") {
    return <ConsentPage />;
  }

  if (step === "intake") {
    return <IntakePage />;
  }

  if (step === "assessment") {
    return <AssessmentPage />;
  }

  if (step === "results") {
    return <ResultsPlaceholderPage />;
  }

  return <LandingPage />;
}
