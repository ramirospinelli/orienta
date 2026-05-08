import { demoProfiles } from "@/features/demo/data/demoProfiles";
import { Shell } from "@/shared/components/Shell";
import { appConfig } from "@/shared/config/appConfig";
import { useAssessmentStore } from "@/store/assessmentStore";

export function LandingPage() {
  const setStep = useAssessmentStore((state) => state.setStep);
  const loadDemoProfile = useAssessmentStore((state) => state.loadDemoProfile);

  return (
    <Shell>
      <div className="space-y-8">
        <section className="rounded-[2rem] bg-slate-950 px-6 py-8 text-white shadow-xl sm:px-8 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <img
                  alt="Orienta"
                  className="h-14 w-14 rounded-2xl bg-white/10 object-contain p-2 ring-1 ring-white/10"
                  src="/logo.png"
                />
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">
                  Orienta
                </p>
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Un test vocacional orientativo para ayudarte a entender mejor que caminos te pueden hacer sentido.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Pensado para adolescentes de secundaria que necesitan una primera guia clara, amigable y accionable antes de hablar con una profesional.
              </p>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
                  onClick={() => setStep("consent")}
                  type="button"
                >
                  Comenzar test
                </button>
                <button
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
                  type="button"
                >
                  Ver demo
                </button>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-sm font-medium text-emerald-200">Que vas a obtener</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
                <li>Un informe amigable sobre tu perfil.</li>
                <li>Fortalezas y areas a desarrollar.</li>
                <li>Sugerencias de carreras, tecnicaturas y oficios.</li>
                <li>Un CV base para descargar al terminar.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <ValueCard title="Rapido de entender" description="Una pregunta por pantalla para que el recorrido se sienta liviano y claro." />
          <ValueCard title="Orientativo" description="No reemplaza una evaluacion profesional ni hace diagnosticos." />
          <ValueCard title="Listo para conversar" description="Al final queda todo preparado para seguir con una psicologa." />
        </section>

        {appConfig.enableDemoMode ? (
          <section className="space-y-4 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Demo mode
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                Mirar resultados sin hacer todo el test
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-slate-600">
                Esto sirve para validar la experiencia y para iterar rapido durante desarrollo sin contestar las 40 preguntas cada vez.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {demoProfiles.map((profile) => (
                <button
                  className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-emerald-300 hover:bg-emerald-50"
                  key={profile.id}
                  onClick={() => loadDemoProfile(profile.id)}
                  type="button"
                >
                  <p className="text-base font-semibold text-slate-900">{profile.label}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{profile.description}</p>
                </button>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </Shell>
  );
}

function ValueCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
