import prisma from '@/libs/db';

export async function GET(_, { params }) {
  const curso = await prisma.curso.findUnique({
    where: { id: parseInt(params.id) },
    include: { inscripciones: true }
  });

  if (!curso) return new Response('No encontrado', { status: 404 });
  return Response.json(curso);
}

export async function PUT(request, { params }) {
  const body = await request.json();
  console.log(body)
  try {
    const updated = await prisma.curso.update({
      where: { id: body.id },
      data: {
        nombre: body.nombre,
        descripcion: body.descripcion,
        creditos: parseInt(body.creditos),
        nivel: body.nivel,
        horasSemanales: parseInt(body.horasSemanales),
        activo: body.activo
      }
    });

    return Response.json(updated);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await prisma.curso.delete({
      where: { id: parseInt(params.id) },
    });

    return new Response('Curso eliminado');
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
