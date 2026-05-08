# Arquitectura técnica — Orienta MVP

## 1. Objetivo

Definir una arquitectura simple, escalable y testeable para lanzar el MVP de Orienta sin backend, priorizando:

- claridad de dominio,
- velocidad de iteración,
- motor rule-based auditable,
- testing rápido durante desarrollo.

---

## 2. Principios arquitectónicos

### 2.1 Separación de responsabilidades
- **UI**: renderiza pantallas y captura interacción.
- **Estado**: conserva progreso, datos de usuario, respuestas y resultado.
- **Dominio**: calcula scores, traits, fortalezas, áreas de desarrollo y carreras.
- **Infraestructura**: localStorage, EmailJS, PDF y WhatsApp.

### 2.2 Rule-based explícito
Nada de magia. Cada resultado debe poder rastrearse a:
- respuestas,
- reglas,
- pesos,
- normalización,
- catálogos de texto.

### 2.3 Configuración por datos
Preguntas, perfiles demo, copy y mapeos no deben vivir hardcodeados dentro de componentes.

### 2.4 Desarrollo rápido
El sistema debe poder probarse sin recorrer siempre el flujo completo.

---

## 3. Decisiones principales

### 3.1 Stack
- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- EmailJS
- html2pdf

### 3.2 Estado global
Se recomienda **Zustand** sobre Context porque:
- simplifica slices por feature,
- facilita persistencia parcial,
- hace más trivial el reseteo,
- mejora el testing del store.

### 3.3 Persistencia
Persistencia local en `localStorage` para:
- datos personales,
- respuestas,
- resultado,
- estado de progreso.

---

## 4. Estructura sugerida del proyecto

```txt
src/
  app/
    router/
    providers/

  pages/
    LandingPage.tsx
    IntakePage.tsx
    AssessmentPage.tsx
    ResultsPage.tsx
    DemoPage.tsx

  features/
    intake/
      components/
      schemas/

    assessment/
      components/
      data/
        questionBank.ts
      domain/
        scoreAssessment.ts
        normalizeProfile.ts
        buildNarrative.ts
        recommendCareers.ts
        generateDevelopmentAreas.ts
        generateStrengths.ts
      utils/

    report/
      components/
      domain/
        generateReport.ts

    cv/
      components/
      domain/
        generateCvModel.ts

    demo/
      data/
        demoProfiles.ts
        demoAnswers.ts

  shared/
    components/
    config/
      env.ts
      appConfig.ts
    lib/
      email/
      pdf/
      storage/
    types/
    constants/

  store/
    assessmentStore.ts
```

---

## 5. Modelo de dominio recomendado

## 5.1 Entidades base

### UserProfile
Datos personales capturados antes del assessment.

### Question
Debe incluir:
- `id`
- `section`
- `prompt`
- `traitKey`
- `weight`
- `reverse`
- `devOnly?`

### Answer
- `questionId`
- `value`

### AssessmentSection
- `temperament`
- `bigFive`
- `styles`
- `interests`
- `holland`

> Nota: recomiendo renombrar `millon` a `styles` en la implementación real. Y sabés por qué? Porque si decidimos adaptación propia, conviene evitar semántica que sugiera uso formal de un instrumento específico.

### TraitScore
```ts
type TraitScore = {
  raw: number
  normalized: number
}
```

### AssessmentResult
Debe tener dos capas:

#### Capa analítica
- scores por sección
- traits dominantes
- top interests
- holland code

#### Capa de producto
- summary
- strengths
- developmentAreas
- recommendedCareers
- report blocks

---

## 6. Pipeline del motor de evaluación

## 6.1 Paso 1 — Validar input
- verificar que todas las respuestas requeridas existan,
- ignorar respuestas inválidas,
- aplicar reverse scoring si corresponde.

## 6.2 Paso 2 — Agregar por trait
Cada pregunta suma al trait definido por metadata.

```ts
traitTotals[traitKey] += weightedValue
```

## 6.3 Paso 3 — Calcular por sección
Obtener score bruto y score normalizado por bloque.

## 6.4 Paso 4 — Normalizar a perfil transversal
Acá está la clave arquitectónica. No mezclar marcos directamente.

Primero se calcula cada bloque por separado.

Después se traduce a un set transversal de traits del producto, por ejemplo:
- `socialOrientation`
- `analyticalOrientation`
- `creativeOrientation`
- `structureOrientation`
- `leadershipOrientation`
- `careOrientation`
- `practicalOrientation`

Esto evita que el catálogo de carreras dependa directamente de nombres heterogéneos de distintos marcos.

## 6.5 Paso 5 — Derivar output
- temperamento dominante,
- rasgos de personalidad destacados,
- áreas de interés,
- código Holland,
- fortalezas,
- áreas a desarrollar,
- carreras sugeridas,
- resumen narrativo.

---

## 7. Estrategia de recomendaciones de carrera

## 7.1 Regla
Las carreras NO deben mapearse contra raw traits mezclados. Deben mapearse contra traits transversales ya normalizados.

## 7.2 Ejemplo conceptual

```ts
career.rules = {
  socialOrientation: 0.8,
  careOrientation: 0.7,
  analyticalOrientation: 0.4,
}
```

Luego se calcula un `matchScore` por carrera.

## 7.3 Beneficios
- más consistencia,
- menos acoplamiento,
- más fácil ajustar reglas,
- más transparente para testing.

---

## 8. Narrativa y generación de texto

El resumen no debe generarse libremente. Debe componerse desde bloques de copy.

### Enfoque sugerido
- detectar 2–3 rasgos dominantes,
- detectar 1 interés fuerte,
- detectar 1 área de desarrollo,
- ensamblar el texto desde templates.

### Ejemplo
```ts
summary = buildSummary({
  dominantTemperament,
  topProfileTraits,
  topInterestAreas,
  developmentAreas,
})
```

Así evitás textos inconsistentes y mantenés control editorial.

---

## 9. Store y estado de aplicación

## 9.1 Estado mínimo
```ts
type AssessmentStore = {
  step: 'landing' | 'intake' | 'assessment' | 'results'
  currentQuestionIndex: number
  userProfile: UserProfile | null
  answers: Record<string, LikertValue>
  result: AssessmentResult | null
  mode: 'real' | 'demo' | 'dev'
}
```

## 9.2 Acciones mínimas
- `setUserProfile`
- `answerQuestion`
- `goToNextQuestion`
- `goToPreviousQuestion`
- `completeAssessment`
- `loadDemoProfile`
- `loadDevAnswers`
- `resetAssessment`
- `hydrateFromStorage`

---

## 10. Estrategia de desarrollo y testing rápido

Este proyecto NECESITA un modo de iteración rápido. No es opcional.

## 10.1 Modos del sistema

### Real mode
Flujo completo del usuario.

### Demo mode
Resultados mock para mostrar producto.

### Dev mode
Uso interno del equipo para probar rápido.

## 10.2 Capacidades mínimas de dev mode
- botón o ruta oculta para precargar respuestas,
- salto directo a resultados,
- selección de perfiles de prueba,
- dataset corto opcional por bloque,
- regeneración de resultado sin recargar toda la app.

## 10.3 Casos que deben poder probarse en menos de 30 segundos
- landing,
- formulario,
- progreso,
- resultados,
- PDF,
- envío de mail,
- reset,
- restauración desde storage.

---

## 11. Testing técnico recomendado

## 11.1 Unit tests
Para dominio puro:
- scoring por sección,
- reverse scoring,
- normalización,
- generación de strengths,
- generación de development areas,
- matching de carreras,
- narrative builder.

## 11.2 Integration tests
- store + flujo de respuestas,
- persistencia e hidratación,
- transición a resultados.

## 11.3 Manual QA checklist
- completar flujo real,
- usar demo,
- usar dev mode,
- recargar navegador a mitad del test,
- resetear,
- simular fallo de email,
- probar descarga PDF.

---

## 12. Configuración y entorno

Variables previstas:

```env
VITE_OWNER_EMAIL=
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
VITE_WHATSAPP_NUMBER=
```

## Reglas
- Validar variables al iniciar la app.
- Si falta configuración de email o WhatsApp, degradar con mensaje claro y no romper la UI.

---

## 13. Riesgos y mitigaciones

### Riesgo: mezcla arbitraria de marcos
**Mitigación**: capa de normalización transversal antes del matching.

### Riesgo: textos demasiado genéricos
**Mitigación**: sistema de templates con combinaciones explícitas.

### Riesgo: testing lento
**Mitigación**: dev mode desde día 1.

### Riesgo: estado inconsistente tras refresh
**Mitigación**: persistencia controlada + versión de storage.

---

## 14. Orden recomendado de implementación

1. Tipos y dominio base.
2. Store global.
3. Question bank y metadata.
4. Engine de scoring.
5. Normalización transversal.
6. Generación de reporte y carreras.
7. Flujo UI del assessment.
8. Demo mode.
9. Dev mode.
10. Email, PDF y QA final.
