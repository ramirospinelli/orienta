import { Shell } from "@/shared/components/Shell";
import { useAssessmentStore } from "@/store/assessmentStore";

export function ConsentPage() {
  const acceptConsent = useAssessmentStore((state) => state.acceptConsent);
  const setStep = useAssessmentStore((state) => state.setStep);

  return (
    <Shell>
      <div className="mx-auto max-w-3xl space-y-6">
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Antes de empezar
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Esto es orientativo, no una respuesta definitiva.
          </h1>

          <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
            <p>
              Orienta te ayuda a conocerte mejor y a pensar opciones.
            </p>
            <p>
              Al final vas a ver tu informe, tu CV inicial y, si queres, vas a poder hablar con un profesional.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              onClick={() => setStep("landing")}
              type="button"
            >
              Volver al inicio
            </button>
            <button
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              onClick={acceptConsent}
              type="button"
            >
              Continuar
            </button>
          </div>
        </section>
      </div>
    </Shell>
  );
}
