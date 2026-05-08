import { evaluateAssessment } from "@/features/assessment/domain/evaluateAssessment";
import { questionBank } from "@/features/assessment/data/questionBank";
import { likertOptions } from "@/shared/constants/likertOptions";
import { Shell } from "@/shared/components/Shell";
import { useAssessmentStore } from "@/store/assessmentStore";

const sectionLabels = {
  temperament: "Temperamento",
  bigFive: "Personalidad",
  styles: "Estilos",
  interests: "Intereses",
  holland: "Orientacion vocacional",
} as const;

export function AssessmentPage() {
  const {
    answers,
    answerQuestion,
    completeAssessment,
    currentQuestionIndex,
    goToNextQuestion,
    goToPreviousQuestion,
    setStep,
    userProfile,
  } = useAssessmentStore();

  const currentQuestion = questionBank[currentQuestionIndex];
  const selectedValue = currentQuestion ? answers[currentQuestion.id] : undefined;
  const isLastQuestion = currentQuestionIndex === questionBank.length - 1;

  if (!userProfile) {
    return (
      <Shell>
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5">
          <h1 className="text-2xl font-semibold text-slate-900">Faltan tus datos personales</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Antes de hacer el test necesitamos completar la ficha inicial para personalizar el informe y el CV.
          </p>
          <button
            className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            onClick={() => setStep("intake")}
            type="button"
          >
            Ir a datos personales
          </button>
        </div>
      </Shell>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  function handleNext() {
    if (!selectedValue) {
      return;
    }

    if (isLastQuestion) {
      const result = evaluateAssessment(answers);
      completeAssessment(result);
      return;
    }

    goToNextQuestion();
  }

  return (
    <Shell>
      <div className="mx-auto max-w-4xl space-y-6">
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
                {sectionLabels[currentQuestion.section]}
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Pregunta {currentQuestionIndex + 1} de {questionBank.length}
              </h1>
            </div>
            <p className="text-sm text-slate-500">Hola, {userProfile.name.split(" ")[0]}.</p>
          </div>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-400 transition-all"
              style={{ width: `${((currentQuestionIndex + 1) / questionBank.length) * 100}%` }}
            />
          </div>

          <div className="mt-8 rounded-[1.75rem] bg-slate-50 p-6 ring-1 ring-slate-200 sm:p-8">
            <p className="text-lg leading-8 text-slate-900 sm:text-2xl sm:leading-10">
              {currentQuestion.prompt}
            </p>
          </div>

          <div className="mt-6 sm:hidden">
            <button
              className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!selectedValue}
              onClick={handleNext}
              type="button"
            >
              {isLastQuestion ? "Finalizar test" : "Siguiente"}
            </button>
          </div>

          <div className="mt-8 space-y-3">
            {likertOptions.map((option) => {
              const selected = selectedValue === option.value;

              return (
                <button
                  className={`flex w-full items-center justify-between rounded-[1.35rem] border px-5 py-4 text-left text-sm transition sm:text-base ${
                    selected
                      ? "border-emerald-400 bg-emerald-50 text-slate-950 ring-4 ring-emerald-100"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                  key={option.value}
                  onClick={() => answerQuestion(currentQuestion.id, option.value)}
                  type="button"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xl" role="img" aria-hidden="true">
                      {option.emoji}
                    </span>
                    <span>{option.label}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              onClick={() => setStep("intake")}
              type="button"
            >
              Volver a datos
            </button>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={currentQuestionIndex === 0}
                onClick={goToPreviousQuestion}
                type="button"
              >
                Anterior
              </button>
              <button
                className="hidden items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 sm:inline-flex"
                disabled={!selectedValue}
                onClick={handleNext}
                type="button"
              >
                {isLastQuestion ? "Finalizar test" : "Siguiente"}
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-[1.35rem] bg-amber-50 p-4 text-sm leading-6 text-amber-900 ring-1 ring-amber-200">
            Responde segun lo que mas te represente hoy. No hay respuestas correctas o incorrectas.
          </div>
        </section>
      </div>
    </Shell>
  );
}
