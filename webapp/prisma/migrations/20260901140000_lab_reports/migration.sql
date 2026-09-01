-- AlterTable
ALTER TABLE "ChecklistItem" ADD COLUMN     "labReportId" TEXT;

-- CreateTable
CREATE TABLE "LabReport" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "number" INTEGER,
    "title" TEXT NOT NULL,
    "status" "LabReportStatus" NOT NULL DEFAULT 'PENDIENTE',
    "grade" DOUBLE PRECISION,
    "dueDate" TIMESTAMP(3),
    "driveUrl" TEXT,
    "content" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChecklistItem_labReportId_idx" ON "ChecklistItem"("labReportId");

-- CreateIndex
CREATE INDEX "LabReport_subjectId_idx" ON "LabReport"("subjectId");

-- AddForeignKey
ALTER TABLE "ChecklistItem" ADD CONSTRAINT "ChecklistItem_labReportId_fkey" FOREIGN KEY ("labReportId") REFERENCES "LabReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabReport" ADD CONSTRAINT "LabReport_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
