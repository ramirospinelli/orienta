# Orienta

Orienta es una web app de orientacion vocacional (mobile-first) enfocada en adolescentes de secundaria.

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- Zustand
- jsPDF

## Scripts

- `npm run dev` - levanta entorno local
- `npm run typecheck` - valida tipos
- `npm run build` - genera `dist/`
- `npm run preview` - previsualiza el build

## Variables de entorno

Crea un archivo `.env` desde `.env.example`.

Variables usadas:

- `VITE_OWNER_EMAIL`
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_WHATSAPP_NUMBER`

## Desarrollo local

1. Instalar dependencias:

```bash
npm install
```

2. Levantar app:

```bash
npm run dev
```

## CI/CD con GitHub Actions

Este repo incluye dos workflows:

- `.github/workflows/ci.yml`
  - ejecuta typecheck en `push` a `main` y en `pull_request`

- `.github/workflows/deploy-pages.yml`
  - construye y despliega a GitHub Pages en cada `push` a `main`

## Configuracion de GitHub Pages

En GitHub:

1. Ir a `Settings` -> `Pages`
2. En `Build and deployment`, seleccionar `GitHub Actions`

El `base` de Vite ya esta configurado para Pages en `vite.config.ts` (`/orienta/` en Actions).

## Estado actual

- Flujo base funcional: landing -> consentimiento -> datos -> assessment -> resultados
- Exportacion PDF de informe y CV con jsPDF
- Demo mode para iterar rapido
