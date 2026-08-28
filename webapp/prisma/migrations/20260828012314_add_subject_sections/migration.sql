-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "sections" TEXT[] DEFAULT ARRAY[]::TEXT[];
