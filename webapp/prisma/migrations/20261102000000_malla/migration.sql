-- CreateTable
CREATE TABLE "MallaSubject" (
    "id" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "credits" INTEGER,
    "area" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "grade" DOUBLE PRECISION,
    "subjectSlug" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MallaSubject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MallaSubject_semester_idx" ON "MallaSubject"("semester");
