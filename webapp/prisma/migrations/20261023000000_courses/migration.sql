-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "provider" TEXT,
    "modality" TEXT,
    "status" TEXT NOT NULL DEFAULT 'EN_CURSO',
    "goal" TEXT,
    "instructor" TEXT,
    "schedule" TEXT,
    "location" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "totalSessions" INTEGER,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseSession" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "number" INTEGER,
    "date" TIMESTAMP(3),
    "topic" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',
    "attended" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseTask" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" TIMESTAMP(3),
    "done" BOOLEAN NOT NULL DEFAULT false,
    "doneAt" TIMESTAMP(3),
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseLink" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "sessionId" TEXT,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "kind" TEXT NOT NULL DEFAULT 'OTRO',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseKeep" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "tag" TEXT NOT NULL DEFAULT 'TIP',
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseKeep_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CourseSession_courseId_idx" ON "CourseSession"("courseId");

-- CreateIndex
CREATE INDEX "CourseTask_courseId_idx" ON "CourseTask"("courseId");

-- CreateIndex
CREATE INDEX "CourseLink_courseId_idx" ON "CourseLink"("courseId");

-- CreateIndex
CREATE INDEX "CourseLink_sessionId_idx" ON "CourseLink"("sessionId");

-- CreateIndex
CREATE INDEX "CourseKeep_courseId_idx" ON "CourseKeep"("courseId");

-- AddForeignKey
ALTER TABLE "CourseSession" ADD CONSTRAINT "CourseSession_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseTask" ADD CONSTRAINT "CourseTask_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseLink" ADD CONSTRAINT "CourseLink_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseLink" ADD CONSTRAINT "CourseLink_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "CourseSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseKeep" ADD CONSTRAINT "CourseKeep_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
