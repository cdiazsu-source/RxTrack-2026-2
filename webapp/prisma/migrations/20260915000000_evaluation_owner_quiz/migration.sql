-- AlterTable
ALTER TABLE "EvaluationItem" ADD COLUMN "owner" TEXT NOT NULL DEFAULT 'Cesar';

-- CreateIndex
CREATE INDEX "EvaluationItem_subjectId_owner_idx" ON "EvaluationItem"("subjectId", "owner");

-- CreateTable
CREATE TABLE "QuizGrade" (
    "id" TEXT NOT NULL,
    "evaluationItemId" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "grade" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuizGrade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QuizGrade_evaluationItemId_idx" ON "QuizGrade"("evaluationItemId");

-- AddForeignKey
ALTER TABLE "QuizGrade" ADD CONSTRAINT "QuizGrade_evaluationItemId_fkey" FOREIGN KEY ("evaluationItemId") REFERENCES "EvaluationItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
