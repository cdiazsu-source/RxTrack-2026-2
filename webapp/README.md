# RxTrack 2026-2s — webapp

Next.js 14 (App Router) + TypeScript + Tailwind + Prisma sobre PostgreSQL (Neon).
Este directorio es el **Root Directory** en Vercel.

## Requisitos

- Node.js 18.18+ ([nodejs.org](https://nodejs.org))
- Una base PostgreSQL. Recomendado: proyecto gratuito en [neon.tech](https://neon.tech).

## Puesta en marcha

```bash
cd webapp
npm install

cp .env.example .env
# edita .env: pega DATABASE_URL de Neon y define SITE_PASSWORD / SITE_PASSWORD_READ / AUTH_SECRET

npm run db:migrate    # crea las tablas
npm run db:seed       # siembra las 7 asignaturas + temario de FT2 y AIF desde ../content
npm run dev
```

Abre <http://localhost:3000>. Usuario por defecto: `quimica`, contraseña `RX2026`
(perfil que edita) o `LEER` (solo lectura).

## Volver a sincronizar el temario

Cuando edites cualquier `../content/<code>.ts`:

```bash
npm run db:seed
```

Es idempotente: actualiza el contenido y agrega lo nuevo, pero **nunca** borra ni
sobrescribe avance (estado de módulo, checklist marcado, apuntes, fechas puestas a
mano, notas, notas de evaluación, ni nada creado dentro de la app).

## Scripts

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` / `npm run start` | Build y servidor de producción |
| `npm run db:migrate` | Crea/actualiza tablas en desarrollo (`prisma migrate dev`) |
| `npm run db:deploy` | Aplica migraciones existentes sin generar nuevas (producción/CI) |
| `npm run db:seed` | Sincroniza el temario desde `../content` |
| `npm run db:studio` | Explorador visual de la base |
| `npm run db:backup` | Exporta todas las tablas a `webapp/backups/backup-<fecha>.json` |

## Despliegue en Vercel

1. Sube el repo a GitHub.
2. Vercel → *Add New Project* → el repo → **Root Directory = `webapp`**.
3. Variables de entorno: `DATABASE_URL`, `SITE_USER`, `SITE_PASSWORD`, `SITE_PASSWORD_READ`, `AUTH_SECRET`.
4. Deploy. Después del primer deploy y de cada migración nueva, apuntando al `DATABASE_URL` de producción:

```bash
npm run db:deploy
npm run db:seed
```

Los datos viven en Neon, no en Vercel: un `git push` publica código y no toca la base.
