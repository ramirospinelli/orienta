# PRD — Orienta MVP

## 1. Resumen ejecutivo

Orienta es una web app responsive, mobile-first, orientada principalmente a adolescentes de secundaria en Argentina. Permite completar un test vocacional de autoconocimiento y obtener un informe orientativo con fortalezas, áreas a desarrollar, intereses, aptitudes, sugerencias de carreras/oficios/tecnicaturas y un CV base de una hoja.

El producto está pensado como herramienta de apoyo para una psicóloga, no como diagnóstico clínico. En esta primera versión no habrá backend: la experiencia se resolverá en frontend con persistencia local y envío automático de resultados por email a la profesional.

---

## 2. Objetivo del producto

### 2.1 Objetivo principal

Ayudar a adolescentes de secundaria a obtener una primera orientación vocacional clara, amigable y accionable.

### 2.2 Objetivos por actor

#### Usuario (adolescente)
- Entender mejor su perfil personal e intereses.
- Recibir orientación vocacional inicial.
- Obtener un CV base descargable.
- Contar con una vía simple para contactar a una profesional.

#### Psicóloga
- Recibir resultados automáticamente por email.
- Usar el informe como insumo previo o complementario a la sesión.
- Validar rápidamente el valor del producto sin depender de backend.

---

## 3. Alcance del MVP

### Incluye
- Landing page con CTA principal y demo.
- Formulario de datos personales.
- Test multi-step de aproximadamente 40 preguntas.
- Motor de evaluación 100% rule-based.
- Informe orientativo con secciones amigables.
- CV automático no editable.
- Descarga de PDF separado para informe y CV.
- Envío automático de email a la psicóloga.
- Botón de WhatsApp a número fijo profesional.
- Persistencia en localStorage.
- Reinicio completo del flujo.
- Demo mode con 2 o 3 perfiles mockeados.
- Modo de desarrollo/testing rápido para iterar sin completar el test entero.

### No incluye
- Backend.
- Login / autenticación.
- Dashboard de psicóloga.
- Historial multiusuario.
- Edición manual del CV.
- IA generativa para redacción.
- Uso multi-profesional.

---

## 4. Posicionamiento y framing

### Nombre funcional del flujo
Por ahora el producto se comunica hacia afuera como **test vocacional**.

### Aclaración obligatoria
Aunque se use el término “test vocacional”, el sistema debe aclarar explícitamente que:
- no constituye diagnóstico psicológico ni clínico,
- no reemplaza una entrevista profesional,
- funciona como herramienta orientativa de apoyo.

---

## 5. Público objetivo

### Segmento principal
- Adolescentes de secundaria.
- Contexto argentino.

### Segmento secundario implícito
- Jóvenes que están terminando o finalizaron recientemente la escuela y necesitan una primera orientación.

---

## 6. Modelo operativo del MVP

- Una sola psicóloga como receptora de resultados.
- Un número fijo de WhatsApp configurado por variable de entorno.
- Un email receptor configurado por variable de entorno.
- La fuente de sugerencias de carreras se define internamente en el proyecto.

---

## 7. Flujo de usuario

1. Landing.
2. Inicio del test.
3. Consentimiento / aclaración de uso.
4. Carga de datos personales.
5. Resolución del test pregunta por pregunta.
6. Procesamiento de respuestas.
7. Visualización de resultados:
   - informe,
   - CV,
   - descarga PDF,
   - envío automático por email a la psicóloga,
   - botón de WhatsApp.
8. Opción de reiniciar.

### Flujo alternativo
- Desde landing, el usuario puede entrar a **Ver demo** y cargar uno de 2–3 perfiles mockeados sin hacer el test completo.

---

## 8. Requerimientos funcionales

### 8.1 Landing

#### Requerimientos
- Mostrar propuesta de valor breve.
- CTA principal: **Comenzar test**.
- CTA secundario: **Ver demo**.
- Mensaje de uso orientativo y no diagnóstico.

### 8.2 Consentimiento / disclaimer previo

#### Requerimientos
- Antes de iniciar el test, el usuario debe aceptar una aclaración de uso.
- Debe informarse que los datos quedarán en el navegador y que se enviará un resumen a la psicóloga.

### 8.3 Datos personales

#### Campos requeridos
- Nombre.
- Edad.
- Fecha de nacimiento.
- Escolaridad.
- Año actual.
- Institución.
- ¿Ya estudia algo? (opcional).

#### Reglas
- Persistir en estado global y localStorage.
- Validar obligatoriedad en todos los campos salvo el opcional.

### 8.4 Test vocacional

#### Estructura inicial prevista
- 5 bloques.
- Aproximadamente 8 preguntas por bloque.
- Total estimado: ~40 preguntas.

#### Bloques actuales de referencia
- Temperamento.
- Big Five.
- Millon.
- CHASIDE.
- Holland.

#### Regla metodológica importante
El MVP utilizará una **adaptación propia inspirada en marcos reconocibles** (temperamento, Big Five, estilos, intereses y Holland), pero **no implementará instrumentos clínicos o licenciados de manera formal**.

#### Implicancia de producto
- El foco del producto está en orientación vocacional y autoconocimiento, no en evaluación psicológica formal.
- El banco de preguntas debe ser propio, claro, juvenil y consistente con el lenguaje del producto.
- El motor debe seguir siendo **configurable**, evitando acoplar lógica a textos específicos para facilitar iteración y ajuste metodológico.

#### UX del test
- Una pregunta por pantalla.
- Opciones Likert de 5 puntos:
  - Muy de acuerdo
  - De acuerdo
  - Neutral
  - En desacuerdo
  - Muy en desacuerdo
- Botón **Siguiente**.
- Avance bloqueado si no hay respuesta.
- Barra de progreso global.
- Indicador textual: “Pregunta X de Y”.

### 8.5 Motor de evaluación

#### Input esperado
```ts
type Answer = {
  questionId: string
  value: number // 1 a 5
}
```

#### Enfoque
- 100% rule-based.
- Sin IA generativa en el MVP.
- Determinístico y auditable.

#### Etapas de procesamiento
1. Cálculo de score por bloque o instrumento.
2. Normalización a traits comunes.
3. Detección de dominantes y combinaciones.
4. Generación de output interpretado.

#### Output esperado
```ts
{
  resumen,
  temperamento,
  personalidad,
  intereses,
  aptitudes,
  fortalezas: [],
  debilidades: [],
  carreras: []
}
```

#### Requisitos del motor
- Ser desacoplado de la UI.
- Permitir test unitarios independientes.
- Permitir alimentar resultados mockeados.
- Poder ejecutarse con datasets abreviados para desarrollo.

### 8.6 Informe de resultados

#### Secciones mínimas
- Cómo sos.
- Fortalezas.
- Áreas a desarrollar.
- Intereses y aptitudes.
- Carreras sugeridas (Argentina).
- Disclaimer final.

#### Reglas
- Lenguaje claro y amigable.
- Evitar tono clínico-diagnóstico.
- Incluir valor para la psicóloga en la sección de áreas a desarrollar.

### 8.7 Sugerencias de carreras

#### Alcance
Las sugerencias deben incluir:
- carreras universitarias,
- tecnicaturas,
- profesorados,
- oficios.

#### Fuente
La taxonomía y mapeo de carreras se definirá dentro del proyecto.

#### Requisitos
- Las sugerencias deben basarse en reglas explícitas.
- Deben mostrarse como orientación, no como recomendación definitiva.

### 8.8 CV automático

#### Contenido mínimo
- Nombre.
- Perfil / resumen generado.
- Educación.
- Fortalezas.

#### Restricción
- No editable en MVP.

### 8.9 PDF

#### Requerimientos
- Permitir exportar **dos PDFs separados**:
  - Informe.
  - CV.
- Si la exportación falla, ofrecer fallback de impresión.

### 8.10 Email automático

#### Comportamiento
- Al generarse el resultado, se dispara envío automático a la psicóloga.
- El usuario no recibe email en el MVP.

#### Contenido mínimo
- Datos personales del usuario.
- Resumen del perfil.
- Opcional: adjunto o alternativa descargable según viabilidad técnica.

#### Restricción UX
- Si el email falla, no debe bloquear la visualización de resultados.

### 8.11 WhatsApp profesional

#### Requerimiento
- Mostrar botón: **Hablar con un profesional**.
- Abrir WhatsApp con número fijo y mensaje prellenado.

#### URL base
```txt
https://wa.me/{telefono}?text={mensaje}
```

### 8.12 Persistencia local

#### Claves mínimas
- `userData`
- `answers`
- `result`

#### Reglas
- Si el usuario abandona o refresca, el estado debe restaurarse.
- Si reinicia el flujo, debe limpiarse todo.

### 8.13 Reset

#### Requerimientos
- Botón: **Volver a hacer el test**.
- Limpiar localStorage relevante.
- Volver al inicio del flujo.

### 8.14 Demo mode

#### Requerimientos
- Disponible desde landing.
- Debe ofrecer 2 o 3 perfiles mockeados distintos.
- Debe saltear el test completo.
- Debe renderizar la misma UI de resultados que el flujo real.

### 8.15 Modo de desarrollo / testing rápido

Este punto es CRÍTICO para el proyecto.

#### Objetivo
Permitir iteración y validación rápida sin responder 40+ preguntas en cada prueba.

#### Requerimientos mínimos
- Cargar respuestas precargadas en entorno de desarrollo.
- Saltar directo a resultados con uno o varios perfiles prearmados.
- Habilitar datasets reducidos o flujos abreviados para pruebas locales.
- Separar claramente modo demo, modo dev y flujo real.

#### Resultado esperado
El equipo debe poder probar:
- navegación,
- UI de resultados,
- PDFs,
- email,
- CV,
- persistencia,
sin ejecutar siempre el recorrido completo.

---

## 9. Requerimientos no funcionales

### UX / UI
- Mobile-first.
- Estética joven, moderna y minimalista.
- Inspiración: Notion, Duolingo y apps de wellbeing.

### Performance
- La app debe cargar rápido en dispositivos móviles medios.
- La persistencia local no debe degradar la experiencia.

### Mantenibilidad
- Arquitectura desacoplada entre UI, estado y motor de evaluación.
- Configuración centralizada para preguntas, reglas y perfiles demo.

### Auditabilidad
- El scoring rule-based debe poder inspeccionarse y testearse.

### Responsabilidad de uso
- Mensajes y textos deben evitar inferencias clínicas fuertes.

---

## 10. Casos borde

- Usuario abandona el test → guardar progreso.
- Usuario refresca página → restaurar estado.
- Usuario no responde una pregunta → bloquear avance.
- Error de email → no bloquear UX.
- Error en PDF → fallback print.
- Variables de entorno faltantes → degradar la funcionalidad afectada con mensaje claro.

---

## 11. Stack propuesto

- React.
- TypeScript.
- Vite.
- Tailwind CSS.
- Zustand o Context para estado global.
- html2pdf para exportación.
- EmailJS para envío automático.

### Decisión sugerida
Para este caso, **Zustand** tiene mejor relación simplicidad/escala que Context porque:
- evita prop drilling,
- facilita persistencia parcial,
- simplifica testing del estado,
- deja mejor preparado el proyecto para crecer.

---

## 12. Arquitectura frontend sugerida

```txt
/src
  /app
  /components
  /pages
  /features
    /assessment
    /report
    /cv
    /demo
  /lib
    evaluationEngine.ts
    questionBank.ts
    careerMappings.ts
  /store
  /utils
  /types
```

### Componentes clave
- Stepper
- ProgressBar
- QuestionCard
- ResultCard
- StrengthBadge
- CareerCard
- PDFLayout

### Archivos núcleo sugeridos

#### `evaluationEngine.ts`
Funciones previstas:
- `calculateTemperament()`
- `calculateBigFive()`
- `calculateMillon()`
- `calculateChaside()`
- `calculateHolland()`
- `generateProfile()`
- `generateStrengths()`
- `generateWeaknesses()`
- `generateCareers()`
- `generateSummary()`

#### `questionBank.ts`
- definición de preguntas,
- bloques,
- escalas,
- metadata para scoring.

#### `careerMappings.ts`
- reglas de mapeo entre traits y sugerencias educativas/laborales.

---

## 13. Supuestos y dependencias

### Supuestos
- El MVP puede validar valor sin backend.
- La psicóloga operará como única profesional en esta etapa.
- El contenido de recomendaciones será suficiente si es consistente y claro, aunque no sea exhaustivo.

### Dependencias críticas
- Definición y revisión final del banco de preguntas propio.
- Validación profesional del wording de resultados.
- Definición interna de reglas de mapeo entre traits, fortalezas y sugerencias de carrera.

### Riesgo principal
Si la adaptación propia queda demasiado ambigua o mezcla marcos sin una normalización explícita, el resultado puede sentirse arbitrario. El riesgo no es legal sino de **coherencia metodológica y confianza del usuario**.

---

## 14. Criterios de éxito del MVP

El MVP se considera exitoso si:
- un adolescente puede completar el flujo en mobile sin fricción grave,
- la psicóloga recibe resultados útiles por email,
- el informe se percibe claro y orientativo,
- el CV se descarga correctamente,
- el equipo puede iterar rápido sin rehacer el test completo en cada prueba.

---

## 15. Roadmap

### Fase 1 — MVP
- Todo lo descrito en este documento.

### Fase 2
- IA para redacción asistida.
- Backend + auth.
- Dashboard para psicóloga.
- Historial de usuarios.
- Edición de CV.

### Fase 3
- Gamificación.
- Seguimiento de evolución.
- Integraciones educativas.

---

## 16. Próximos pasos inmediatos

1. Diseñar el banco inicial de preguntas propio.
2. Definir reglas de scoring, normalización y mapeo a carreras.
3. Convertir este PRD en:
   - arquitectura técnica,
   - mapa de entidades/types,
   - backlog inicial,
   - diseño del evaluation engine,
   - estrategia de testing y modo dev.
