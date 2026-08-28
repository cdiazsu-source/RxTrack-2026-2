-- CreateEnum
CREATE TYPE "FlashcardSource" AS ENUM ('GLOSARIO', 'FORMULA', 'MANUAL');

-- AlterTable
ALTER TABLE "KeyDate" ADD COLUMN     "moduleIds" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "slidesUrl" TEXT,
ADD COLUMN     "transcript" TEXT;

-- CreateTable
CREATE TABLE "Flashcard" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "moduleId" TEXT,
    "front" TEXT NOT NULL,
    "back" TEXT NOT NULL,
    "source" "FlashcardSource" NOT NULL DEFAULT 'MANUAL',
    "sourceId" TEXT,
    "suspended" BOOLEAN NOT NULL DEFAULT false,
    "dueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "intervalDays" INTEGER NOT NULL DEFAULT 0,
    "easeFactor" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    "reps" INTEGER NOT NULL DEFAULT 0,
    "lapses" INTEGER NOT NULL DEFAULT 0,
    "lastReviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Flashcard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalEvent" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "subjectId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PersonalEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Flashcard_subjectId_idx" ON "Flashcard"("subjectId");

-- CreateIndex
CREATE INDEX "Flashcard_dueDate_idx" ON "Flashcard"("dueDate");

-- CreateIndex
CREATE UNIQUE INDEX "Flashcard_source_sourceId_key" ON "Flashcard"("source", "sourceId");

-- CreateIndex
CREATE INDEX "PersonalEvent_date_idx" ON "PersonalEvent"("date");

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
