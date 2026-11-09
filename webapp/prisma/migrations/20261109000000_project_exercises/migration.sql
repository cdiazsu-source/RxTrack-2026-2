-- CreateTable
CREATE TABLE "ProjectExercise" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "workshop" TEXT,
    "title" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectExercise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProjectExercise_projectId_idx" ON "ProjectExercise"("projectId");

-- AddForeignKey
ALTER TABLE "ProjectExercise" ADD CONSTRAINT "ProjectExercise_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
