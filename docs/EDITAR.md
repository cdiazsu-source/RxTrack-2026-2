# Cómo hacer cambios a la página en vivo

Vercel está conectado al repo de GitHub. **Cada push a `main` redespliega producción
automáticamente** (~2 min). No hay que volver a tocar Vercel.

## Circuito normal

```
editar en rxtrack-2026-2s/  →  probar local (npm run dev)  →  git push  →  Vercel redespliega  →  recargar la URL
```

### 1. Probar en local antes de subir

```bash
cd webapp
npm run dev        # http://localhost:3000
```

### 2. Subir

```bash
git add -A
git commit -m "descripción del cambio"
git push
```

Vercel detecta el push y despliega. Ver el estado en el dashboard de Vercel
(pestaña *Deployments*).

## Si el cambio toca la base de datos

Cuando cambias `webapp/prisma/schema.prisma` (tabla/columna nueva), después del push,
apuntando al `DATABASE_URL` de producción (el mismo Neon):

```bash
cd webapp
npx prisma migrate dev --name descripcion-del-cambio   # en local: crea y aplica la migración
git add -A && git commit -m "migración: ..." && git push
npx prisma migrate deploy                               # aplica la migración pendiente en la base
```

Si cambiaste el temario (`content/*.ts`):

```bash
npm run db:seed    # idempotente, no borra avance
```

> Nota: como Vercel y tu `.env` local usan **la misma base de Neon**, las migraciones
> que corres en local ya quedan aplicadas para producción. `migrate deploy` solo hace
> falta si corriste `migrate dev` en otra base.

## Cambios grandes sin arriesgar producción

```bash
git checkout -b nombre-rama
# ...cambios...
git push -u origin nombre-rama
```

Vercel genera una **URL de preview** solo para esa rama. Cuando esté lista:

```bash
git checkout main
git merge nombre-rama
git push
```

## Variables de entorno

Se editan en **Vercel → Project → Settings → Environment Variables**. Tras cambiarlas
hay que **volver a desplegar** (Deployments → … → Redeploy) para que tomen efecto.

## Dónde vive cada cosa

| Quieres cambiar… | Archivo(s) |
|---|---|
| Temario de una asignatura | `content/<código>.ts` + `npm run db:seed` |
| Textos de ayuda (ⓘ) | `webapp/src/lib/help.ts` |
| Colores / tipografía | `webapp/src/app/globals.css` (variables `--*`) + `webapp/tailwind.config.ts` |
| Secciones visibles por asignatura | `content/<código>.ts` campo `sections` + `npm run db:seed` |
| Prompts de IA | `webapp/src/lib/prompts.ts` |
| Una página | `webapp/src/app/**/page.tsx` |
| Un componente | `webapp/src/components/*.tsx` |
| Lógica de datos (mutaciones) | `webapp/src/lib/actions/*.ts` |
