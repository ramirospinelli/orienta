# Backlog inicial — Orienta MVP

## 1. Objetivo del backlog

Traducir el PRD y la arquitectura en tareas concretas para empezar desarrollo con orden y sin improvisación.

---

## 2. Épicas

1. Base técnica del proyecto
2. Dominio del assessment
3. Flujo de usuario
4. Resultados y recomendaciones
5. Demo/dev mode
6. Integraciones externas
7. QA y hardening

---

## 3. Tareas priorizadas

## Épica 1 — Base técnica del proyecto

### 1.1 Bootstrap frontend
- Crear proyecto con React + TypeScript + Vite.
- Instalar Tailwind.
- Configurar aliases y estructura base.

**Criterio de aceptación**
- La app corre localmente.
- Existe estructura inicial de carpetas coherente con la arquitectura.

### 1.2 Configuración central
- Crear `env.ts` para validar variables.
- Crear `appConfig.ts` para toggles de demo/dev mode.

**Criterio de aceptación**
- La app detecta configuración faltante sin romper runtime.

### 1.3 Estado global
- Implementar `assessmentStore` con Zustand.
- Persistir slices relevantes.

**Criterio de aceptación**
- Se puede guardar/restaurar progreso.
- Se puede resetear estado completo.

---

## Épica 2 — Dominio del assessment

### 2.1 Definir tipos definitivos
- Modelar `Question`, `Answer`, `UserProfile`, `AssessmentResult`, `CareerSuggestion`.
- Separar capa analítica y capa de producto.

**Criterio de aceptación**
- Los tipos cubren scoring, narrativa, carreras y persistencia.

### 2.2 Diseñar banco de preguntas propio
- Crear `questionBank.ts`.
- Definir bloques, traits, peso y reverse scoring cuando corresponda.

**Criterio de aceptación**
- Todas las preguntas tienen metadata completa.
- El banco permite iteración sin tocar UI.

### 2.3 Implementar scoring por sección
- Crear funciones puras por bloque.
- Cubrir temperamento, personalidad/estilos, intereses y Holland.

**Criterio de aceptación**
- Cada bloque devuelve scores consistentes y testeables.

### 2.4 Implementar normalización transversal
- Traducir resultados de bloques a traits comunes del producto.

**Criterio de aceptación**
- El sistema no depende directamente de traits heterogéneos para recomendar carreras.

### 2.5 Generar output de producto
- `generateStrengths`
- `generateDevelopmentAreas`
- `generateSummary`

**Criterio de aceptación**
- El resultado final es claro, coherente y determinístico.

---

## Épica 3 — Flujo de usuario

### 3.1 Landing page
- Construir pantalla inicial con CTA principal y demo.

### 3.2 Consentimiento
- Agregar aclaración de uso orientativo.

### 3.3 Formulario de datos personales
- Crear formulario con validaciones mínimas.

### 3.4 Flujo del test
- Una pregunta por pantalla.
- Barra de progreso.
- Validación obligatoria.
- Navegación siguiente/anterior si se decide habilitar.

**Criterio de aceptación**
- El usuario puede completar el flujo completo en mobile.

---

## Épica 4 — Resultados y recomendaciones

### 4.1 Vista de resultados
- Construir pantalla con resumen, fortalezas, áreas a desarrollar e intereses.

### 4.2 Catálogo de carreras
- Crear `careerCatalog.ts` basado en reglas explícitas.

### 4.3 Matching de carreras
- Implementar `recommendCareers` con scoring por afinidad.

### 4.4 Generación de informe
- Crear modelo final del informe y render UI.

### 4.5 Generación de CV
- Crear modelo mínimo de CV automático.

**Criterio de aceptación**
- Los resultados muestran contenido consistente y útil para usuario y psicóloga.

---

## Épica 5 — Demo mode y dev mode

### 5.1 Demo mode
- Crear 2–3 perfiles mockeados.
- Permitir entrar desde landing.

### 5.2 Dev mode
- Precarga de respuestas.
- Salto directo a resultados.
- Dataset corto opcional.

### 5.3 Herramientas de depuración
- Mostrar estado actual y scores en desarrollo si hace falta.

**Criterio de aceptación**
- El equipo puede validar resultados en segundos sin completar todo el test.

---

## Épica 6 — Integraciones externas

### 6.1 WhatsApp
- Botón a número fijo con mensaje prearmado.

### 6.2 EmailJS
- Envío automático a la psicóloga al generar resultado.
- Manejo elegante de error.

### 6.3 PDF
- Exportar informe.
- Exportar CV.
- Fallback print.

**Criterio de aceptación**
- Ninguna falla externa rompe el flujo principal.

---

## Épica 7 — QA y hardening

### 7.1 Persistencia
- Recuperar progreso tras refresh.

### 7.2 Reset
- Limpiar storage y reiniciar flujo.

### 7.3 Testing unitario del motor
- Cubrir scoring, normalización, texto y carreras.

### 7.4 QA manual
- Checklist de flujos reales, demo y dev.

**Criterio de aceptación**
- El MVP es estable y demoable.

---

## 4. Orden de ejecución recomendado

### Fase A — Fundaciones
1. Bootstrap frontend
2. Estructura de carpetas
3. Store global
4. Configuración de entorno

### Fase B — Dominio
5. Tipos definitivos
6. Question bank
7. Engine de scoring
8. Normalización transversal
9. Generación de strengths / development areas / summary
10. Matching de carreras

### Fase C — UX principal
11. Landing
12. Consentimiento
13. Formulario
14. Test multi-step
15. Resultados
16. CV

### Fase D — Velocidad de iteración
17. Demo mode
18. Dev mode

### Fase E — Integraciones y cierre
19. EmailJS
20. WhatsApp
21. PDF
22. QA final

---

## 5. Definition of Done del MVP

El MVP está listo cuando:
- el flujo real funciona de punta a punta,
- el engine entrega resultados determinísticos,
- la psicóloga recibe email,
- los PDFs se descargan,
- demo mode funciona,
- dev mode acelera pruebas,
- el sistema resiste refresh/reset sin inconsistencias.
