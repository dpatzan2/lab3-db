-- AlterTable
ALTER TABLE "cursos" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "estudiantes" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "inscripciones" ALTER COLUMN "updatedAt" DROP NOT NULL;
