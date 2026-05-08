import { FormEvent, useState } from "react";

import { Shell } from "@/shared/components/Shell";
import { UserProfile } from "@/shared/types/assessment";
import { useAssessmentStore } from "@/store/assessmentStore";

type IntakeFormState = {
  name: string;
  birthDate: string;
  educationLevel: string;
  currentYear: string;
  institution: string;
  currentStudies: string;
};

const educationLevelOptions = [
  "Secundario en curso",
  "Secundario completo",
  "Terciario en curso",
  "Terciario completo",
  "Universitario en curso",
  "Universitario completo",
] as const;

export function IntakePage() {
  const storedProfile = useAssessmentStore((state) => state.userProfile);
  const setUserProfile = useAssessmentStore((state) => state.setUserProfile);
  const setStep = useAssessmentStore((state) => state.setStep);
  const startAssessment = useAssessmentStore((state) => state.startAssessment);
  const [error, setError] = useState("");
  const [form, setForm] = useState<IntakeFormState>({
    name: storedProfile?.name ?? "",
    birthDate: storedProfile?.birthDate ?? "",
    educationLevel: storedProfile?.educationLevel ?? "",
    currentYear: storedProfile?.currentYear ?? "",
    institution: storedProfile?.institution ?? "",
    currentStudies: storedProfile?.currentStudies ?? "",
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.birthDate ||
      !form.educationLevel.trim() ||
      !form.currentYear.trim() ||
      !form.institution.trim()
    ) {
      setError("Completa todos los campos obligatorios antes de seguir.");
      return;
    }

    const profile: UserProfile = {
      name: form.name.trim(),
      birthDate: form.birthDate,
      educationLevel: form.educationLevel.trim(),
      currentYear: form.currentYear.trim(),
      institution: form.institution.trim(),
      currentStudies: form.currentStudies.trim() || undefined,
    };

    setUserProfile(profile);
    setError("");
    startAssessment();
  }

  return (
    <Shell>
      <div className="mx-auto max-w-4xl space-y-6">
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Paso 1
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Contame un poco de vos antes de arrancar.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Estos datos nos sirven para personalizar el informe y dejar lista la informacion base del CV automatico.
          </p>

          <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
            <Field label="Nombre y apellido" required>
              <input
                className={inputClassName}
                onChange={(event) => setForm((state) => ({ ...state, name: event.target.value }))}
                placeholder="Ej: Martin Gomez"
                value={form.name}
              />
            </Field>

            <Field label="Fecha de nacimiento" required>
              <input
                className={inputClassName}
                onChange={(event) => setForm((state) => ({ ...state, birthDate: event.target.value }))}
                type="date"
                value={form.birthDate}
              />
            </Field>

            <Field label="Escolaridad" required>
              <select
                className={inputClassName}
                onChange={(event) => setForm((state) => ({ ...state, educationLevel: event.target.value }))}
                value={form.educationLevel}
              >
                <option value="">Selecciona una opcion</option>
                {educationLevelOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Año actual" required>
              <input
                className={inputClassName}
                onChange={(event) => setForm((state) => ({ ...state, currentYear: event.target.value }))}
                placeholder="Ej: 5to año"
                value={form.currentYear}
              />
            </Field>

            <Field label="Institucion" required>
              <input
                className={inputClassName}
                onChange={(event) => setForm((state) => ({ ...state, institution: event.target.value }))}
                placeholder="Ej: Instituto General San Martin"
                value={form.institution}
              />
            </Field>

            <div className="sm:col-span-2">
              <Field label="Ya estudias algo?" helper="Opcional. Puede ser una carrera, curso u oficio que ya estes explorando.">
                <input
                  className={inputClassName}
                  onChange={(event) =>
                    setForm((state) => ({ ...state, currentStudies: event.target.value }))
                  }
                  placeholder="Ej: Curso de programacion"
                  value={form.currentStudies}
                />
              </Field>
            </div>

            {error ? (
              <div className="sm:col-span-2 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700 ring-1 ring-rose-200">
                {error}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 pt-2 sm:col-span-2 sm:flex-row sm:justify-between">
              <button
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                onClick={() => setStep("consent")}
                type="button"
              >
                Volver
              </button>
              <button
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                type="submit"
              >
                Guardar y seguir
              </button>
            </div>
          </form>
        </section>
      </div>
    </Shell>
  );
}

function Field({
  children,
  helper,
  label,
  required,
}: {
  children: React.ReactNode;
  helper?: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-800">
        {label} {required ? <span className="text-rose-500">*</span> : null}
      </span>
      {children}
      {helper ? <span className="block text-xs leading-5 text-slate-500">{helper}</span> : null}
    </label>
  );
}

const inputClassName =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100";
