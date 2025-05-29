import {PrismaClient} from '../generated/prisma';


export const obtenerVistaEstudiantesCursos = async () => {
  const datos = await prisma.$queryRaw`
    SELECT * FROM vista_estudiantes_cursos;
  `;
  return datos;
};

const prismaClient = () => {
    return new PrismaClient();
};

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? prismaClient();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;