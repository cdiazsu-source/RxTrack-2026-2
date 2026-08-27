# RxTrack 2026-2s

Tracker web de las **siete asignaturas** del semestre 2026-2 del pregrado de
Química Farmacéutica (Universidad Nacional de Colombia): temario, apuntes de
clase (método Cornell), checklist, proyectos y bitácora, fechas, fórmulas,
glosario y bibliografía — con backend y desplegado en Vercel.

- **AIF** — Análisis Instrumental Farmacéutico
- **FT2** — Farmacotecnia 2
- **FG** — Farmacología General
- **AF** — Administración Farmacéutica
- **SPF** — Salud Pública y Farmacia
- **FQ2** — Farmacia Química 2
- **BFC** — Biofarmacia y Farmacocinética

## Estructura del repo

```
rxtrack-2026-2s/
├── content/        FUENTE DE VERDAD del temario — 1 archivo .ts por asignatura,
│                   editado por personas, versionado en git, fuera del bundler.
└── webapp/         La app Next.js (este es el "Root Directory" en Vercel).
```

`content/` lo lee `webapp/prisma/seed.ts` y lo **sincroniza** hacia la base de
datos sin pisar avances (checklist marcado, apuntes, estado, notas, fechas
puestas a mano nunca se sobrescriben).

## Puesta en marcha

Ver [`webapp/README.md`](webapp/README.md). En corto:

```bash
cd webapp
npm install
cp .env.example .env      # pega tu DATABASE_URL de Neon y define las contraseñas
npm run db:migrate
npm run db:seed
npm run dev
```

## Contexto para agentes

Ver [`CLAUDE.md`](CLAUDE.md) antes de proponer cambios.
