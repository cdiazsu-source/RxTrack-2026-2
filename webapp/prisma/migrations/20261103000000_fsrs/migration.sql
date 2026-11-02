-- AlterTable: estado FSRS de cada tarjeta (aditivo; las columnas SM-2 se conservan)
ALTER TABLE "Flashcard"
    ADD COLUMN "stability" DOUBLE PRECISION NOT NULL DEFAULT 0,
    ADD COLUMN "difficulty" DOUBLE PRECISION NOT NULL DEFAULT 0,
    ADD COLUMN "fsrsState" INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN "learningSteps" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "FlashcardReviewLog" (
    "id" TEXT NOT NULL,
    "flashcardId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "state" INTEGER NOT NULL,
    "scheduledDays" INTEGER NOT NULL DEFAULT 0,
    "stability" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "difficulty" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reviewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FlashcardReviewLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FlashcardReviewLog_reviewedAt_idx" ON "FlashcardReviewLog"("reviewedAt");

-- CreateIndex
CREATE INDEX "FlashcardReviewLog_subjectId_idx" ON "FlashcardReviewLog"("subjectId");

-- CreateIndex
CREATE INDEX "FlashcardReviewLog_flashcardId_idx" ON "FlashcardReviewLog"("flashcardId");

-- AddForeignKey
ALTER TABLE "FlashcardReviewLog" ADD CONSTRAINT "FlashcardReviewLog_flashcardId_fkey" FOREIGN KEY ("flashcardId") REFERENCES "Flashcard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Pasa lo ya repasado al modelo FSRS (aproximación desde el SM-2 anterior):
--   estabilidad ≈ intervalo vigente; dificultad: facilidad 2.5 → 5, cada 0.3 de facilidad ≈ 1 punto (1..10).
-- Tarjetas con intervalo >= 1 día: en repaso.
UPDATE "Flashcard"
SET "fsrsState" = 2,
    "stability" = GREATEST("intervalDays", 1),
    "difficulty" = LEAST(10, GREATEST(1, 5 - ("easeFactor" - 2.5) * 3.33))
WHERE "reps" > 0 AND "intervalDays" >= 1;

-- Tarjetas respondidas "otra vez" (el SM-2 las dejó con reps = 0): en aprendizaje.
UPDATE "Flashcard"
SET "fsrsState" = 1,
    "reps" = 1,
    "stability" = 0.4,
    "difficulty" = LEAST(10, GREATEST(1, 5 - ("easeFactor" - 2.5) * 3.33))
WHERE "reps" = 0 AND "lastReviewedAt" IS NOT NULL;
