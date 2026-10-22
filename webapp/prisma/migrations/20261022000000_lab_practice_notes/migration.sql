-- CreateTable
CREATE TABLE "LabPracticeNote" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "practiceKey" TEXT NOT NULL,
    "kind" TEXT NOT NULL DEFAULT 'OBSERVACION',
    "body" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "authorRole" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabPracticeNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LabPracticeNote_subjectId_practiceKey_idx" ON "LabPracticeNote"("subjectId", "practiceKey");

-- AddForeignKey
ALTER TABLE "LabPracticeNote" ADD CONSTRAINT "LabPracticeNote_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
