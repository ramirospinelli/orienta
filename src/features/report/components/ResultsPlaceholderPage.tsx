import { useState } from "react";

import { generateCvModel } from "@/features/cv/domain/generateCvModel";
import { generateReportModel } from "@/features/report/domain/generateReportModel";
import { Shell } from "@/shared/components/Shell";
import { exportCvToPdf, exportReportToPdf } from "@/shared/lib/pdf/exportModelsToPdf";
import { useAssessmentStore } from "@/store/assessmentStore";

export function ResultsPlaceholderPage() {
  const { mode, resetAssessment, result, setStep, userProfile } = useAssessmentStore();
  const [exporting, setExporting] = useState<null | "report" | "cv">(null);
  const [exportError, setExportError] = useState("");

  const report = userProfile && result ? generateReportModel(userProfile, result) : null;
  const cv = userProfile && result ? generateCvModel(userProfile, result) : null;

  async function handleExport(kind: "report" | "cv") {
    if (!userProfile || !report || !cv) {
      return;
    }

    setExportError("");
    setExporting(kind);

    try {
      if (kind === "report") {
        exportReportToPdf(report, `informe-${slugify(userProfile.name)}.pdf`);
      } else {
        exportCvToPdf(cv, `cv-${slugify(userProfile.name)}.pdf`);
      }
    } catch {
      setExportError("No pudimos generar el PDF. Proba nuevamente.");
    } finally {
      setExporting(null);
    }
  }

  return (
    <Shell>
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-xl sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-emerald-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-950">
              {mode === "demo" ? "Demo" : "Resultados"}
            </span>
            <span className="text-sm text-slate-300">Informe y CV listos para exportar.</span>
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            {result ? "Tus resultados ya estan listos." : "Todavia no hay un resultado generado."}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            Esta salida esta pensada para ayudarte a entender mejor tu perfil y para que la psicologa tenga un punto de partida concreto en la conversacion.
          </p>

          {exportError ? (
            <div className="mt-6 rounded-2xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {exportError}
            </div>
          ) : null}
        </section>

        {result && report && cv ? (
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 sm:p-10">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                      Informe vocacional
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                      {report.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{report.subtitle}</p>
                  </div>

                  <button
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={exporting !== null}
                    onClick={() => handleExport("report")}
                    type="button"
                  >
                    {exporting === "report" ? "Generando PDF..." : "Descargar informe PDF"}
                  </button>
                </div>

                <dl className="mt-8 grid gap-3 sm:grid-cols-2">
                  {report.personalData.map((item) => (
                    <div className="rounded-[1.35rem] bg-slate-50 p-4 ring-1 ring-slate-200" key={item.label}>
                      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {item.label}
                      </dt>
                      <dd className="mt-2 text-sm font-medium text-slate-900">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              {report.sections.map((section) => (
                <section className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-black/5 sm:p-8" key={section.title}>
                  <h3 className="text-xl font-semibold text-slate-900">{section.title}</h3>
                  {section.body ? (
                    <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">{section.body}</p>
                  ) : null}
                  {section.items ? (
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700 sm:text-base">
                      {section.items.map((item) => (
                        <li
                          className="rounded-[1.2rem] bg-slate-50 px-4 py-3 ring-1 ring-slate-200"
                          key={item}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              <section className="rounded-[2rem] bg-amber-50 p-6 text-sm leading-7 text-amber-950 ring-1 ring-amber-200 sm:p-8">
                <h3 className="text-lg font-semibold">Aclaracion importante</h3>
                <p className="mt-3">{report.disclaimer}</p>
              </section>
            </div>

            <div className="space-y-6">
              <section className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-black/5 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                      CV automatico
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-900">Vista previa del CV</h3>
                  </div>

                  <button
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={exporting !== null}
                    onClick={() => handleExport("cv")}
                    type="button"
                  >
                    {exporting === "cv" ? "Generando PDF..." : "Descargar CV PDF"}
                  </button>
                </div>

                <div className="mt-5 rounded-[1.75rem] bg-slate-50 p-6 ring-1 ring-slate-200">
                  <h4 className="text-2xl font-semibold tracking-tight text-slate-950">{cv.name}</h4>
                  <p className="mt-1 text-sm font-medium text-emerald-700">{cv.headline}</p>
                  <p className="mt-4 text-sm leading-6 text-slate-700">{cv.educationLine}</p>

                  <div className="mt-6 space-y-4">
                    <CvPreviewSection title="Perfil">
                      <p className="text-sm leading-6 text-slate-700">{cv.profile}</p>
                    </CvPreviewSection>
                    <CvPreviewSection title="Fortalezas destacadas">
                      <ul className="space-y-2 text-sm leading-6 text-slate-700">
                        {cv.strengths.map((strength) => (
                          <li key={strength}>• {strength}</li>
                        ))}
                      </ul>
                    </CvPreviewSection>
                  </div>
                </div>
              </section>

              <section className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-black/5 sm:p-8">
                <h3 className="text-lg font-semibold text-slate-900">Acciones</h3>
                <div className="mt-5 space-y-3">
                  <button
                    className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                    onClick={resetAssessment}
                    type="button"
                  >
                    Volver a hacer el test
                  </button>
                  <button
                    className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    onClick={() => setStep("landing")}
                    type="button"
                  >
                    Volver a landing
                  </button>
                </div>
              </section>

              <section className="rounded-[2rem] bg-slate-950 p-7 text-white shadow-sm sm:p-8">
                <h3 className="text-lg font-semibold">Lectura rapida para la psicologa</h3>
                <div className="mt-5 grid gap-3">
                  <MetricRow label="Temperamento" value={result.analytics.dominantTemperament} />
                  <MetricRow
                    label="Carrera top"
                    value={result.recommendedCareers[0]?.title || "Sin sugerencia"}
                  />
                  <MetricRow label="Fortalezas" value={String(result.strengths.length)} />
                </div>
              </section>
            </div>
          </div>
        ) : (
          <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 sm:p-10">
            <p className="text-sm leading-6 text-slate-600">
              Usa uno de los perfiles demo desde la landing o completa el test para generar un resultado real.
            </p>
          </section>
        )}

      </div>
    </Shell>
  );
}

function CvPreviewSection({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{title}</h4>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
      <span className="text-sm text-slate-300">{label}</span>
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
