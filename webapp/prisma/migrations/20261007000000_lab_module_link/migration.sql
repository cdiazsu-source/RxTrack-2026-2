-- CreateTable
CREATE TABLE "LabModuleLink" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabModuleLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LabModuleLink_subjectId_name_key" ON "LabModuleLink"("subjectId", "name");

-- AddForeignKey
ALTER TABLE "LabModuleLink" ADD CONSTRAINT "LabModuleLink_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
