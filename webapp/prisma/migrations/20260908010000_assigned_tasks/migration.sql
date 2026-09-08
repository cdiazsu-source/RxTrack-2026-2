-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDIENTE', 'EN_CURSO', 'HECHA');

-- CreateTable
CREATE TABLE "AssignedTask" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "detail" TEXT,
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDIENTE',
    "assignee" TEXT NOT NULL DEFAULT 'Diana',
    "subjectId" TEXT,
    "moduleId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "doneAt" TIMESTAMP(3),

    CONSTRAINT "AssignedTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AssignedTask_status_idx" ON "AssignedTask"("status");
