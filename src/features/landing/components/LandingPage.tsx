import { Shell } from "@/shared/components/Shell";
import { WhatsappIcon } from "@/shared/components/WhatsappIcon";
import { getProfessionalWhatsappUrl } from "@/shared/lib/whatsapp/getProfessionalWhatsappUrl";
import { useAssessmentStore } from "@/store/assessmentStore";

export function LandingPage() {
  const setStep = useAssessmentStore((state) => state.setStep);
  const brandImageSrc = `${import.meta.env.BASE_URL}favicon.png`;
  const whatsappUrl = getProfessionalWhatsappUrl();

  return (
    <Shell>
      <div className="space-y-8">
        <section className="rounded-[2rem] bg-slate-950 px-6 py-8 text-white shadow-xl sm:px-8 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <img
                  alt="Orienta"
                  className="h-24 w-24 rounded-3xl bg-white/10 object-contain p-2.5 ring-1 ring-white/10 sm:h-28 sm:w-28"
                  src={brandImageSrc}
                />
                <p className="text-xl font-bold uppercase tracking-[0.18em] text-emerald-300 sm:text-2xl">
                  Orienta
                </p>
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Conoce tu perfil y empeza a pensar tu futuro con mas claridad.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Una experiencia breve para entender mejor tus intereses, fortalezas y posibles caminos.
              </p>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                  onClick={() => setStep("consent")}
                  type="button"
                >
                  Empezar ahora
                </button>
                {whatsappUrl ? (
                  <a
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                    href={whatsappUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <WhatsappIcon className="h-5 w-5 shrink-0" />
                    Solicitar orientacion profesional
                  </a>
                ) : null}
              </div>
              {!whatsappUrl ? (
                <p className="text-xs leading-6 text-slate-400">
                  Para mostrar el acceso directo al profesional, configura `VITE_WHATSAPP_NUMBER` y reinicia el servidor de desarrollo.
                </p>
              ) : null}
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-sm font-medium text-emerald-200">Con Orienta podras obtener</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
                <li>Un informe simple sobre tu perfil.</li>
                <li>Fortalezas y areas afines.</li>
                <li>Sugerencias para empezar a explorar carreras.</li>
                <li>Un CV inicial para descargar.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <ValueCard title="Simple" description="Avanzas paso a paso, sin vueltas." />
          <ValueCard title="Orientativo" description="Te ayuda a pensar opciones, no a cerrarlas." />
          <ValueCard title="Accionable" description="Te llevas un informe, un CV y un punto de partida." />
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Como funciona
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Un recorrido breve para transformar autoconocimiento en direccion.
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <JourneyStep number="1" title="Completa tu perfil" description="Dejas tus datos para personalizar el informe." />
              <JourneyStep number="2" title="Responde la evaluacion" description="Nos contas como pensas, que te interesa y que se te da bien." />
              <JourneyStep number="3" title="Recibe tu orientacion" description="Obtenes un informe, un CV y opciones para seguir explorando." />
            </div>
          </div>

          <div className="rounded-[2rem] bg-emerald-50 p-6 shadow-sm ring-1 ring-emerald-100 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Lo importante
            </p>
            <div className="mt-4 space-y-4 text-sm leading-7 text-emerald-950 sm:text-base">
              <p>
                Esto es una primera orientacion para conocerte mejor.
              </p>
              <p>
                Si queres profundizar, podes conversar los resultados con un profesional.
              </p>
            </div>
          </div>
        </section>

        
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

function JourneyStep({
  description,
  number,
  title,
}: {
  description: string;
  number: string;
  title: string;
}) {
  return (
    <div className="rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-200">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
        {number}
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
