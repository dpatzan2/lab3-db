-- CreateEnum
CREATE TYPE "NivelCurso" AS ENUM ('BASICO', 'INTERMEDIO', 'AVANZADO');

-- CreateEnum
CREATE TYPE "EstadoEstudiante" AS ENUM ('ACTIVO', 'INACTIVO', 'GRADUADO', 'SUSPENDIDO');

-- CreateTable
CREATE TABLE "estudiantes" (
    "id" SERIAL NOT NULL,
    "codigo" VARCHAR(10) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "apellido" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "telefono" VARCHAR(15),
    "fechaNacimiento" DATE NOT NULL,
    "estado" "EstadoEstudiante" NOT NULL DEFAULT 'ACTIVO',
    "fechaIngreso" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "estudiantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cursos" (
    "id" SERIAL NOT NULL,
    "codigo" VARCHAR(10) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,
    "creditos" SMALLINT NOT NULL,
    "nivel" "NivelCurso" NOT NULL DEFAULT 'BASICO',
    "horasSemanales" SMALLINT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cursos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inscripciones" (
    "id" SERIAL NOT NULL,
    "estudianteId" INTEGER NOT NULL,
    "cursoId" INTEGER NOT NULL,
    "fechaInscripcion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notaFinal" DECIMAL(5,2),
    "asistencia" SMALLINT NOT NULL DEFAULT 0,
    "aprobado" BOOLEAN NOT NULL DEFAULT false,
    "periodo" VARCHAR(10) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inscripciones_pkey" PRIMARY KEY ("id")
);

-- CreateView
CREATE OR REPLACE VIEW vista_estudiantes_cursos AS
SELECT
  e.id AS estudiante_id,
  e.codigo AS codigo_estudiante,
  e.nombre || ' ' || e.apellido AS nombre_completo,
  e.email,
  e.estado AS estado_estudiante,
  i.id AS inscripcion_id,
  i.periodo,
  i."notaFinal",
  CASE 
    WHEN i."notaFinal" >= 70 THEN 'Aprobado'
    WHEN i."notaFinal" IS NULL THEN 'En curso'
    ELSE 'Reprobado'
  END AS estado_academico,
  i.asistencia || '%' AS porcentaje_asistencia,
  i.aprobado,
  c.id AS curso_id,
  c.codigo AS codigo_curso,
  c.nombre AS nombre_curso,
  c.creditos,
  c.nivel AS nivel_curso,
  c."horasSemanales",
  c.activo AS curso_activo,
  i."fechaInscripcion",
  e."fechaIngreso" AS fecha_ingreso_estudiante
FROM 
  estudiantes e
  JOIN inscripciones i ON e.id = i."estudianteId"
  JOIN cursos c ON c.id = i."cursoId"
ORDER BY
  e.apellido,
  e.nombre,
  i.periodo DESC,
  c.nombre;

-- CreateIndex
CREATE UNIQUE INDEX "estudiantes_codigo_key" ON "estudiantes"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "estudiantes_email_key" ON "estudiantes"("email");

-- CreateIndex
CREATE INDEX "estudiantes_email_idx" ON "estudiantes"("email");

-- CreateIndex
CREATE INDEX "estudiantes_codigo_idx" ON "estudiantes"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "cursos_codigo_key" ON "cursos"("codigo");

-- CreateIndex
CREATE INDEX "cursos_codigo_idx" ON "cursos"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "inscripciones_estudianteId_cursoId_periodo_key" ON "inscripciones"("estudianteId", "cursoId", "periodo");

-- AddForeignKey
ALTER TABLE "inscripciones" ADD CONSTRAINT "inscripciones_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "estudiantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscripciones" ADD CONSTRAINT "inscripciones_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "cursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
