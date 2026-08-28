-- CreateEnum
CREATE TYPE "ModuleStatus" AS ENUM ('NO_VISTO', 'EN_PROGRESO', 'DOMINADO');

-- CreateEnum
CREATE TYPE "LabReportStatus" AS ENUM ('PENDIENTE', 'ENTREGADO', 'CALIFICADO');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('POR_INICIAR', 'EN_CURSO', 'COMPLETADO');

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "credits" TEXT,
    "professors" TEXT[],
    "scheduleTheory" TEXT,
    "scheduleLab" TEXT,
    "descriptionSummary" TEXT,
    "objectiveGeneral" TEXT,
    "objectivesSpecific" TEXT[],
    "hasLab" BOOLEAN NOT NULL DEFAULT false,
    "totalClasses" INTEGER NOT NULL DEFAULT 32,
    "attendanceMissed" INTEGER NOT NULL DEFAULT 0,
    "weeklyGoal" TEXT,
    "driveUrl" TEXT,
    "order" INTEGER NOT NULL,
    "syncedAt" TIMESTAMP(3),
    "lastActivityAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "hasLab" BOOLEAN NOT NULL DEFAULT false,
    "status" "ModuleStatus" NOT NULL DEFAULT 'NO_VISTO',
    "order" INTEGER NOT NULL,
    "driveUrl" TEXT,
    "notesUrl" TEXT,
    "labProtocol" TEXT,
    "labReportStatus" "LabReportStatus",
    "fromContent" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "number" INTEGER,
    "date" TIMESTAMP(3),
    "topic" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChecklistItem" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT,
    "projectId" TEXT,
    "text" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChecklistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabMaterial" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "LabMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT,
    "status" "ProjectStatus" NOT NULL DEFAULT 'POR_INICIAR',
    "driveUrl" TEXT,
    "order" INTEGER NOT NULL,
    "isManual" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectNote" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "authorRole" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GlossaryTerm" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "moduleId" TEXT,
    "term" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "fromContent" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GlossaryTerm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Formula" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "moduleId" TEXT,
    "name" TEXT NOT NULL,
    "expression" TEXT NOT NULL,
    "variables" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "derivation" TEXT NOT NULL DEFAULT '',
    "fromContent" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Formula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeyDate" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "weight" TEXT,
    "note" TEXT,
    "fromContent" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KeyDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvaluationItem" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "grade" DOUBLE PRECISION,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EvaluationItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BibliographyItem" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "moduleId" TEXT,
    "kind" TEXT NOT NULL DEFAULT 'libro',
    "reference" TEXT NOT NULL,
    "url" TEXT,
    "fromContent" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BibliographyItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PastMaterial" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "moduleId" TEXT,
    "kind" TEXT NOT NULL DEFAULT 'taller',
    "title" TEXT NOT NULL,
    "semester" TEXT NOT NULL DEFAULT '',
    "url" TEXT,
    "patterns" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PastMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SemesterMeta" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "streakDays" INTEGER NOT NULL DEFAULT 0,
    "streakLastDate" TIMESTAMP(3),
    "streakGraceUsedOn" TIMESTAMP(3),
    "globalGoal" TEXT,
    "theme" TEXT NOT NULL DEFAULT 'auto',
    "resumeRoute" TEXT,
    "resumeLabel" TEXT,
    "resumeNote" TEXT,
    "resumeAt" TIMESTAMP(3),
    "focusItemCount" INTEGER NOT NULL DEFAULT 3,
    "showStreak" BOOLEAN NOT NULL DEFAULT true,
    "gentleMotion" BOOLEAN NOT NULL DEFAULT true,
    "dailyReminder" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SemesterMeta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InboxItem" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "url" TEXT,
    "subjectId" TEXT,
    "triagedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InboxItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subject_code_key" ON "Subject"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_order_key" ON "Subject"("order");

-- CreateIndex
CREATE INDEX "Module_subjectId_idx" ON "Module"("subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "Module_subjectId_slug_key" ON "Module"("subjectId", "slug");

-- CreateIndex
CREATE INDEX "Session_moduleId_idx" ON "Session"("moduleId");

-- CreateIndex
CREATE INDEX "ChecklistItem_moduleId_idx" ON "ChecklistItem"("moduleId");

-- CreateIndex
CREATE INDEX "ChecklistItem_projectId_idx" ON "ChecklistItem"("projectId");

-- CreateIndex
CREATE INDEX "Resource_moduleId_idx" ON "Resource"("moduleId");

-- CreateIndex
CREATE INDEX "LabMaterial_moduleId_idx" ON "LabMaterial"("moduleId");

-- CreateIndex
CREATE INDEX "Project_subjectId_idx" ON "Project"("subjectId");

-- CreateIndex
CREATE INDEX "ProjectNote_projectId_idx" ON "ProjectNote"("projectId");

-- CreateIndex
CREATE INDEX "ProjectNote_createdAt_idx" ON "ProjectNote"("createdAt");

-- CreateIndex
CREATE INDEX "GlossaryTerm_subjectId_idx" ON "GlossaryTerm"("subjectId");

-- CreateIndex
CREATE INDEX "Formula_subjectId_idx" ON "Formula"("subjectId");

-- CreateIndex
CREATE INDEX "KeyDate_subjectId_idx" ON "KeyDate"("subjectId");

-- CreateIndex
CREATE INDEX "EvaluationItem_subjectId_idx" ON "EvaluationItem"("subjectId");

-- CreateIndex
CREATE INDEX "BibliographyItem_subjectId_idx" ON "BibliographyItem"("subjectId");

-- CreateIndex
CREATE INDEX "PastMaterial_subjectId_idx" ON "PastMaterial"("subjectId");

-- CreateIndex
CREATE INDEX "InboxItem_triagedAt_idx" ON "InboxItem"("triagedAt");

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistItem" ADD CONSTRAINT "ChecklistItem_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistItem" ADD CONSTRAINT "ChecklistItem_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabMaterial" ADD CONSTRAINT "LabMaterial_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectNote" ADD CONSTRAINT "ProjectNote_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GlossaryTerm" ADD CONSTRAINT "GlossaryTerm_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Formula" ADD CONSTRAINT "Formula_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeyDate" ADD CONSTRAINT "KeyDate_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationItem" ADD CONSTRAINT "EvaluationItem_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BibliographyItem" ADD CONSTRAINT "BibliographyItem_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastMaterial" ADD CONSTRAINT "PastMaterial_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
