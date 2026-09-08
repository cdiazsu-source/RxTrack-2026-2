-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('CRUDA', 'TRANSCRITA', 'CORNELL_IA', 'REVISADA');

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "status" "SessionStatus" NOT NULL DEFAULT 'CRUDA';

-- CreateIndex
CREATE INDEX "Session_updatedAt_idx" ON "Session"("updatedAt");

-- Backfill: deducir la etapa de las sesiones existentes por su contenido.
UPDATE "Session" SET "status" = CASE
  WHEN length(btrim(coalesce("content", ''))) > 0 THEN 'CORNELL_IA'::"SessionStatus"
  WHEN length(btrim(coalesce("transcript", ''))) > 0 THEN 'TRANSCRITA'::"SessionStatus"
  ELSE 'CRUDA'::"SessionStatus"
END;
