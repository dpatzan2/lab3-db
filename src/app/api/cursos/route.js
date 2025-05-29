import prisma from '@/libs/db';

export async function GET() {
  const cursos = await prisma.curso.findMany({
    include: { inscripciones: true }
  });
  return Response.json(cursos);
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.codigo || !body.nombre || !body.creditos || !body.nivel || !body.horasSemanales) {
      return new Response(JSON.stringify({ error: 'Campos requeridos faltantes' }), { status: 400 });
    }

    const curso = await prisma.curso.create({
      data: {
        codigo: body.codigo,
        nombre: body.nombre,
        descripcion: body.descripcion || null,
        creditos: parseInt(body.creditos),
        nivel: body.nivel,
        horasSemanales: parseInt(body.horasSemanales),
        activo: body.activo ?? true
      }
    });

    return Response.json(curso);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
