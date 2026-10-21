-- CreateTable
CREATE TABLE "AccountActivity" (
    "username" TEXT NOT NULL,
    "lastLoginAt" TIMESTAMP(3),
    "lastSeenAt" TIMESTAMP(3),
    "loginCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AccountActivity_pkey" PRIMARY KEY ("username")
);
